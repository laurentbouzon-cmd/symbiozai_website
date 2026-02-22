export async function POST(request) {
  try {
    const { key } = await request.json()

    if (!key) {
      return Response.json({ success: false, message: "Aucune clé fournie" }, { status: 400 })
    }

    // Vérifier si la clé est au format PEM correct
    const hasPemHeader = key.includes("-----BEGIN PRIVATE KEY-----")
    const hasPemFooter = key.includes("-----END PRIVATE KEY-----")
    const hasNewlines = key.includes("\n") || key.includes("\r\n")

    // Analyser la structure de la clé
    const analysis = {
      hasPemHeader,
      hasPemFooter,
      hasNewlines,
      length: key.length,
      isValid: hasPemHeader && hasPemFooter && hasNewlines,
    }

    return Response.json({
      success: true,
      analysis,
      message: analysis.isValid ? "La clé semble correctement formatée" : "La clé présente des problèmes de format",
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
