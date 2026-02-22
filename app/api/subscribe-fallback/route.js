import { Resend } from "resend"
import { isValidEmail, formatDate } from "@/lib/google-sheets-utils"

// Initialiser Resend si la clé API est disponible
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

/**
 * Route API de secours pour l'inscription à la newsletter
 * Utilisée lorsque l'intégration avec Google Sheets échoue
 */
export async function POST(request) {
  try {
    // Extraire l'email du corps de la requête
    const { email } = await request.json()

    // Validation de base
    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Créer un objet avec les informations d'inscription
    const subscriptionData = {
      email,
      date: formatDate(),
      status: "Subscribed",
    }

    // Si Resend est configuré, envoyer un email de notification
    if (resend && process.env.EMAIL_FROM && process.env.EMAIL_REPLY_TO) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_REPLY_TO,
          subject: "Nouvelle inscription à la liste d'attente",
          html: `
            <h1>Nouvelle inscription</h1>
            <p>Un nouvel utilisateur s'est inscrit à la liste d'attente :</p>
            <ul>
              <li><strong>Email :</strong> ${email}</li>
              <li><strong>Date :</strong> ${formatDate()}</li>
            </ul>
            <p>Cette notification a été envoyée car l'API Google Sheets n'a pas pu être utilisée.</p>
          `,
        })
      } catch (emailError) {
        console.error("Error sending notification email:", emailError)
        // Ne pas échouer si l'email ne peut pas être envoyé
      }
    }

    // Retourner une réponse réussie
    return Response.json({
      success: true,
      message: "Successfully subscribed",
      fallback: true,
      data: subscriptionData,
    })
  } catch (error) {
    console.error("Error in subscribe fallback API:", error)
    return Response.json(
      {
        success: false,
        message: "Failed to process subscription. Please try again later.",
      },
      { status: 500 },
    )
  }
}
