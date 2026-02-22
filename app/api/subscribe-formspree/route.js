export async function POST(request) {
  try {
    // Extraire l'email du corps de la requête
    const { email } = await request.json()

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Vérifier que l'email est valide
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Vérifier si le webhook Formspree est configuré
    if (!process.env.FORMSPREE_WEBHOOK_SECRET) {
      return Response.json(
        {
          success: false,
          message: "Formspree webhook not configured",
        },
        { status: 500 },
      )
    }

    // Envoyer les données à Formspree
    const formspreeResponse = await fetch(process.env.FORMSPREE_WEBHOOK_SECRET, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!formspreeResponse.ok) {
      const errorData = await formspreeResponse.json()
      throw new Error(errorData.message || "Formspree submission failed")
    }

    // Retourner une réponse réussie
    return Response.json({
      success: true,
      message: "Successfully subscribed",
      formspree: true,
    })
  } catch (error) {
    console.error("Error in Formspree API:", error)
    return Response.json(
      {
        success: false,
        message: error.message || "An error occurred",
      },
      { status: 500 },
    )
  }
}
