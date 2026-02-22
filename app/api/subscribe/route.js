import { getGoogleAuthClient, isValidEmail, addEntryToSheet, SPREADSHEET_ID } from "@/lib/google-sheets-utils"
import { Resend } from "resend"
import { WelcomeEmail } from "@/components/emails/welcome-email"
import { WelcomeEmailEn } from "@/components/emails/welcome-email-en"

// Initialiser Resend si la clé API est disponible
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

/**
 * Route API pour l'inscription à la newsletter
 * Ajoute l'email de l'utilisateur à Google Sheets et envoie un email de bienvenue
 */
export async function POST(request) {
  try {
    // Extraire l'email et la langue du corps de la requête
    const { email, lang = "fr" } = await request.json()
    console.log("Received subscription request for email:", email, "language:", lang)

    // Validation de base
    if (!email) {
      console.log("Email is required but was not provided")
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      console.log("Invalid email format:", email)
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Vérifier si l'ID du Google Sheet est configuré
    if (!SPREADSHEET_ID) {
      console.log("Google Sheet ID not configured")
      return Response.json(
        {
          success: false,
          message: "Google Sheet ID not configured",
        },
        { status: 500 },
      )
    }

    // Obtenir le client d'authentification
    console.log("Getting Google auth client...")
    const { auth, method } = await getGoogleAuthClient()
    console.log(`Using authentication method: ${method}`)

    // Ajouter l'email à Google Sheets
    console.log("Adding email to Google Sheets...")
    const result = await addEntryToSheet(auth, email)
    console.log("Google Sheets API response:", result.data)

    // Envoyer un email de bienvenue si Resend est configuré
    if (resend && process.env.EMAIL_FROM) {
      try {
        console.log("Sending welcome email...")

        // Sélectionner le template d'email en fonction de la langue
        const EmailTemplate = lang === "en" ? WelcomeEmailEn : WelcomeEmail
        const subject = lang === "en" ? "Welcome to SymbiozAI" : "Bienvenue chez SymbiozAI"

        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: subject,
          react: EmailTemplate({ email }),
        })
        console.log("Welcome email sent successfully")
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError)
        // Ne pas échouer si l'email ne peut pas être envoyé
      }
    } else {
      console.log("Resend not configured, skipping welcome email")
    }

    // Retourner une réponse réussie
    return Response.json({
      success: true,
      message: "Successfully subscribed",
      authMethod: method,
      emailSent: !!resend && !!process.env.EMAIL_FROM,
    })
  } catch (error) {
    console.error("Error in subscribe API:", error)

    // Retourner une réponse d'erreur plus détaillée pour le débogage
    return Response.json(
      {
        success: false,
        message: `Failed to process subscription: ${error.message}`,
        error: error.stack,
      },
      { status: 500 },
    )
  }
}
