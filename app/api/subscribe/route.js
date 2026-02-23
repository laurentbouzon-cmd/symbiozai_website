import { isValidEmail, isProEmail } from "@/lib/utils"
import { notionService } from "@/lib/notion-service"

const emailContent = {
  fr: {
    subject: "Vous êtes sur la liste — SymbiozAI",
    html: (email) => `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a237e,#00e5ff);padding:40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">SymbiozAI</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">Le premier CRM 100% IA-Native</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 40px;">
            <h2 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:600;">Vous êtes sur la liste ✓</h2>
            <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
              Merci pour votre intérêt. Votre adresse <strong>${email}</strong> a bien été enregistrée.
            </p>
            <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
              Nous vous contacterons en priorité dès l'ouverture de l'accès anticipé à SymbiozAI — le CRM qui travaille à votre place, piloté depuis WhatsApp et Slack.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
              <tr>
                <td style="background:linear-gradient(135deg,#1a237e,#00e5ff);border-radius:8px;padding:14px 28px;">
                  <a href="https://symbioz.ai" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;">Découvrir SymbiozAI →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
              Vous recevez cet email car vous vous êtes inscrit sur symbioz.ai.<br>
              Pour vous désinscrire, répondez à cet email avec "désinscription".
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} SymbiozAI · <a href="https://symbioz.ai" style="color:#6b7280;text-decoration:none;">symbioz.ai</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
  en: {
    subject: "You're on the list — SymbiozAI",
    html: (email) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1a237e,#00e5ff);padding:40px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">SymbiozAI</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">The first 100% AI-Native CRM</p>
          </td>
        </tr>
        <tr>
          <td style="padding:48px 40px;">
            <h2 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:600;">You're on the list ✓</h2>
            <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
              Thank you for your interest. Your address <strong>${email}</strong> has been registered.
            </p>
            <p style="margin:0 0 24px;color:#4b5563;font-size:16px;line-height:1.6;">
              We'll reach out to you first when early access to SymbiozAI opens — the CRM that works for you, powered from WhatsApp and Slack.
            </p>
            <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
              <tr>
                <td style="background:linear-gradient(135deg,#1a237e,#00e5ff);border-radius:8px;padding:14px 28px;">
                  <a href="https://symbioz.ai" style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;">Discover SymbiozAI →</a>
                </td>
              </tr>
            </table>
            <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
              You received this email because you signed up at symbioz.ai.<br>
              To unsubscribe, reply to this email with "unsubscribe".
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">© ${new Date().getFullYear()} SymbiozAI · <a href="https://symbioz.ai" style="color:#6b7280;text-decoration:none;">symbioz.ai</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
}

async function sendConfirmationEmail(email, lang) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return

  const content = emailContent[lang] ?? emailContent.fr

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: "SymbiozAI", email: "noreply@symbioz.ai" },
      to: [{ email }],
      subject: content.subject,
      htmlContent: content.html(email),
    }),
  })
}

export async function POST(request) {
  try {
    const { email, lang = "fr" } = await request.json()

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    if (!isProEmail(email)) {
      return Response.json({ success: false, message: "Please use a professional email address" }, { status: 400 })
    }

    if (!process.env.NOTION_DATABASE_ID) {
      return Response.json({ success: false, message: "Notion database ID not configured" }, { status: 500 })
    }

    const result = await notionService.addEmail(email)

    if (!result.success) {
      return Response.json({ success: false, message: result.error }, { status: 500 })
    }

    // Envoi de l'email de confirmation (non bloquant)
    sendConfirmationEmail(email, lang).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    )

    return Response.json({ success: true, message: "Successfully subscribed" })
  } catch (error) {
    console.error("Error in subscribe API:", error)
    return Response.json({ success: false, message: `Failed to process subscription: ${error.message}` }, { status: 500 })
  }
}
