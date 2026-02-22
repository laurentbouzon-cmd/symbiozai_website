export async function GET() {
  try {
    // Récupérer les informations de configuration Google Sheets
    const sheetId = process.env.GOOGLE_SHEET_ID || null
    const serviceAccount = process.env.GOOGLE_CLIENT_EMAIL || null
    const hasCredentialsJson = !!process.env.GOOGLE_CREDENTIALS_JSON
    const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY

    // Déterminer la méthode d'authentification
    let authMethod = "Non configurée"
    if (hasCredentialsJson) {
      authMethod = "Fichier JSON complet"
    } else if (hasPrivateKey && serviceAccount) {
      authMethod = "Variables individuelles"
    }

    return Response.json({
      success: true,
      sheetId,
      serviceAccount,
      authMethod,
      hasCredentialsJson,
      hasPrivateKey,
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message || "Une erreur s'est produite",
      },
      { status: 500 },
    )
  }
}
