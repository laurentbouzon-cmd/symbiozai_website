export async function POST(request) {
  try {
    const { action } = await request.json()

    if (action === "diagnose") {
      // Vérifier si les variables nécessaires sont définies
      const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY
      const hasCredentialsJson = !!process.env.GOOGLE_CREDENTIALS_JSON

      // Analyser la clé privée
      let keyDiagnostic = { available: false }
      let fixedKey = null

      if (hasPrivateKey) {
        const key = process.env.GOOGLE_PRIVATE_KEY
        const hasPemHeader = key.includes("-----BEGIN PRIVATE KEY-----")
        const hasPemFooter = key.includes("-----END PRIVATE KEY-----")
        const hasLiteralNewlines = key.includes("\\n")
        const hasRealNewlines = key.includes("\n")

        keyDiagnostic = {
          available: true,
          length: key.length,
          hasPemHeader,
          hasPemFooter,
          hasLiteralNewlines,
          hasRealNewlines,
          firstChars: key.substring(0, 20).replace(/\n/g, "[LF]").replace(/\\n/g, "[\\n]") + "...",
          lastChars:
            "..." +
            key
              .substring(key.length - 20)
              .replace(/\n/g, "[LF]")
              .replace(/\\n/g, "[\\n]"),
          problems: [],
        }

        // Identifier les problèmes potentiels
        if (!hasPemHeader) {
          keyDiagnostic.problems.push("L'en-tête PEM est manquant (-----BEGIN PRIVATE KEY-----)")
        }

        if (!hasPemFooter) {
          keyDiagnostic.problems.push("Le pied de page PEM est manquant (-----END PRIVATE KEY-----)")
        }

        if (!hasRealNewlines && !hasLiteralNewlines) {
          keyDiagnostic.problems.push("Aucun saut de ligne détecté (ni réel ni littéral)")
        }

        if (key.includes("\\\\n")) {
          keyDiagnostic.problems.push("Double échappement détecté (\\\\n au lieu de \\n)")
        }

        // Essayer de corriger la clé
        let fixedKeyValue = key

        // Remplacer les doubles échappements par des simples
        if (key.includes("\\\\n")) {
          fixedKeyValue = fixedKeyValue.replace(/\\\\n/g, "\\n")
        }

        // Remplacer les littéraux \n par de vrais sauts de ligne
        if (hasLiteralNewlines) {
          fixedKeyValue = fixedKeyValue.replace(/\\n/g, "\n")
        }

        // Ajouter l'en-tête et le pied de page PEM s'ils sont manquants
        if (!hasPemHeader && !fixedKeyValue.includes("-----BEGIN PRIVATE KEY-----")) {
          fixedKeyValue = "-----BEGIN PRIVATE KEY-----\n" + fixedKeyValue
        }

        if (!hasPemFooter && !fixedKeyValue.includes("-----END PRIVATE KEY-----")) {
          fixedKeyValue = fixedKeyValue + "\n-----END PRIVATE KEY-----"
        }

        // Vérifier si la clé a été modifiée
        if (fixedKeyValue !== key) {
          fixedKey = {
            original: key,
            fixed: fixedKeyValue,
            changes: [],
          }

          if (key.includes("\\\\n") && fixedKeyValue.includes("\\n")) {
            fixedKey.changes.push("Remplacé les doubles échappements \\\\n par \\n")
          }

          if (hasLiteralNewlines && fixedKeyValue.includes("\n")) {
            fixedKey.changes.push("Converti les \\n littéraux en vrais sauts de ligne")
          }

          if (!hasPemHeader && fixedKeyValue.includes("-----BEGIN PRIVATE KEY-----")) {
            fixedKey.changes.push("Ajouté l'en-tête PEM manquant")
          }

          if (!hasPemFooter && fixedKeyValue.includes("-----END PRIVATE KEY-----")) {
            fixedKey.changes.push("Ajouté le pied de page PEM manquant")
          }
        }
      }

      // Analyser les credentials JSON
      let jsonDiagnostic = { available: false }

      if (hasCredentialsJson) {
        try {
          const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
          jsonDiagnostic = {
            available: true,
            valid: true,
            hasPrivateKey: !!credentials.private_key,
            hasClientEmail: !!credentials.client_email,
            fields: Object.keys(credentials),
            problems: [],
          }

          if (!credentials.private_key) {
            jsonDiagnostic.problems.push("La clé privée est manquante dans le JSON")
          }

          if (!credentials.client_email) {
            jsonDiagnostic.problems.push("L'email client est manquant dans le JSON")
          }

          if (!credentials.project_id) {
            jsonDiagnostic.problems.push("L'ID du projet est manquant dans le JSON")
          }
        } catch (error) {
          jsonDiagnostic = {
            available: true,
            valid: false,
            error: error.message,
            length: process.env.GOOGLE_CREDENTIALS_JSON.length,
            preview: process.env.GOOGLE_CREDENTIALS_JSON.substring(0, 50) + "...",
            problems: ["Le JSON n'est pas valide: " + error.message],
          }
        }
      }

      // Vérifier les autres variables nécessaires
      const otherVars = {
        GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
        GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
        GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
        GOOGLE_PRIVATE_KEY_ID: !!process.env.GOOGLE_PRIVATE_KEY_ID,
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_CERT_URL: !!process.env.GOOGLE_CLIENT_CERT_URL,
      }

      // Identifier les problèmes avec les variables
      const missingVars = Object.entries(otherVars)
        .filter(([_, value]) => !value)
        .map(([key]) => key)

      return Response.json({
        success: true,
        diagnostics: {
          privateKey: keyDiagnostic,
          fixedKey: fixedKey,
          credentialsJson: jsonDiagnostic,
          otherVars,
          missingVars,
          recommendations: generateRecommendations(keyDiagnostic, jsonDiagnostic, missingVars),
        },
      })
    }

    return Response.json(
      {
        success: false,
        error: "Action non reconnue",
      },
      { status: 400 },
    )
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

function generateRecommendations(keyDiagnostic, jsonDiagnostic, missingVars) {
  const recommendations = []

  // Vérifier si les credentials JSON sont disponibles et valides
  if (jsonDiagnostic.available && jsonDiagnostic.valid && !jsonDiagnostic.problems.length) {
    recommendations.push({
      priority: "high",
      title: "Utiliser les credentials JSON",
      description: "Vos credentials JSON semblent valides. C'est la méthode recommandée pour l'authentification.",
    })
  }
  // Si les credentials JSON ont des problèmes
  else if (jsonDiagnostic.available && (jsonDiagnostic.problems.length > 0 || !jsonDiagnostic.valid)) {
    recommendations.push({
      priority: "high",
      title: "Corriger les credentials JSON",
      description:
        "Téléchargez à nouveau le fichier JSON des credentials depuis la console Google Cloud et ajoutez-le comme variable d'environnement GOOGLE_CREDENTIALS_JSON.",
    })
  }
  // Si les credentials JSON ne sont pas disponibles mais que la clé privée a des problèmes
  else if (keyDiagnostic.available && keyDiagnostic.problems.length > 0) {
    recommendations.push({
      priority: "high",
      title: "Corriger le format de la clé privée",
      description:
        "Votre clé privée présente des problèmes de format. Utilisez l'outil de diagnostic pour obtenir une version corrigée.",
    })
  }

  // Si des variables essentielles sont manquantes
  if (missingVars.length > 0) {
    recommendations.push({
      priority: "medium",
      title: "Ajouter les variables manquantes",
      description: `Les variables suivantes sont manquantes : ${missingVars.join(", ")}. Elles sont nécessaires pour l'authentification.`,
    })
  }

  // Recommandation générale
  recommendations.push({
    priority: "low",
    title: "Utiliser le fichier JSON complet",
    description:
      "La méthode la plus fiable est d'utiliser le fichier JSON complet des credentials. Téléchargez-le depuis la console Google Cloud et ajoutez-le comme variable d'environnement GOOGLE_CREDENTIALS_JSON.",
  })

  return recommendations
}
