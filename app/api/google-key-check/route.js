export async function GET() {
  try {
    // Vérifier si la clé privée est définie
    const hasPrivateKey = !!process.env.GOOGLE_PRIVATE_KEY

    // Obtenir les premiers caractères de la clé pour diagnostic (sans exposer la clé complète)
    let keyFormat = "Not available"
    if (hasPrivateKey && process.env.GOOGLE_PRIVATE_KEY.length > 0) {
      // Vérifier si la clé contient "BEGIN PRIVATE KEY" qui est typique d'une clé PEM
      const containsPemHeader = process.env.GOOGLE_PRIVATE_KEY.includes("BEGIN PRIVATE KEY")

      // Vérifier si la clé contient des littéraux \n qui doivent être convertis
      const containsLiteralNewlines = process.env.GOOGLE_PRIVATE_KEY.includes("\\n")

      // Vérifier si la clé contient de vrais sauts de ligne
      const containsRealNewlines = process.env.GOOGLE_PRIVATE_KEY.includes("\n")

      keyFormat = {
        length: process.env.GOOGLE_PRIVATE_KEY.length,
        containsPemHeader,
        containsLiteralNewlines,
        containsRealNewlines,
        firstChars: process.env.GOOGLE_PRIVATE_KEY.substring(0, 15) + "...", // Juste pour voir le début
      }
    }

    // Vérifier si les autres variables nécessaires sont définies
    const hasCredentialsJson = !!process.env.GOOGLE_CREDENTIALS_JSON
    const hasProjectId = !!process.env.GOOGLE_PROJECT_ID
    const hasPrivateKeyId = !!process.env.GOOGLE_PRIVATE_KEY_ID
    const hasClientId = !!process.env.GOOGLE_CLIENT_ID
    const hasClientCertUrl = !!process.env.GOOGLE_CLIENT_CERT_URL

    return Response.json({
      success: true,
      hasPrivateKey,
      keyFormat,
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL ? "Configured" : "Not configured",
      sheetId: process.env.GOOGLE_SHEET_ID ? "Configured" : "Not configured",
      additionalCredentials: {
        hasCredentialsJson,
        hasProjectId,
        hasPrivateKeyId,
        hasClientId,
        hasClientCertUrl,
      },
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
