export async function GET() {
  try {
    // Vérifier si la clé privée est définie
    const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY
    const hasCredentialsJson = !!process.env.GOOGLE_CREDENTIALS_JSON

    // Analyser le format de la clé privée
    let keyDiagnostic = { available: false }

    if (hasPrivateKey) {
      const key = process.env.GOOGLE_PRIVATE_KEY
      keyDiagnostic = {
        available: true,
        length: key.length,
        hasPemHeader: key.includes("-----BEGIN PRIVATE KEY-----"),
        hasPemFooter: key.includes("-----END PRIVATE KEY-----"),
        hasLiteralNewlines: key.includes("\\n"),
        hasRealNewlines: key.includes("\n"),
        firstChars: key.substring(0, 20).replace(/\n/g, "[LF]").replace(/\\n/g, "[\\n]") + "...",
        lastChars:
          "..." +
          key
            .substring(key.length - 20)
            .replace(/\n/g, "[LF]")
            .replace(/\\n/g, "[\\n]"),
      }
    }

    // Analyser le format des credentials JSON
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
        }
      } catch (error) {
        jsonDiagnostic = {
          available: true,
          valid: false,
          error: error.message,
          length: process.env.GOOGLE_CREDENTIALS_JSON.length,
          preview: process.env.GOOGLE_CREDENTIALS_JSON.substring(0, 50) + "...",
        }
      }
    }

    // Vérifier les autres variables nécessaires
    const diagnostics = {
      privateKey: keyDiagnostic,
      credentialsJson: jsonDiagnostic,
      otherVars: {
        GOOGLE_CLIENT_EMAIL: !!process.env.GOOGLE_CLIENT_EMAIL,
        GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID,
        GOOGLE_PROJECT_ID: !!process.env.GOOGLE_PROJECT_ID,
        GOOGLE_PRIVATE_KEY_ID: !!process.env.GOOGLE_PRIVATE_KEY_ID,
        GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_CERT_URL: !!process.env.GOOGLE_CLIENT_CERT_URL,
      },
    }

    return Response.json({
      success: true,
      diagnostics,
    })
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
