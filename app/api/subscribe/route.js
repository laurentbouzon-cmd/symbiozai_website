import { isValidEmail, isProEmail } from "@/lib/utils"
import { notionService } from "@/lib/notion-service"

const BASE_URL = "https://symbioz.ai"

function buildEmailHtml(email, lang) {
  const unsubscribeUrl = `${BASE_URL}/${lang}/unsubscribe?email=${encodeURIComponent(email)}`
  const logoUrl = `${BASE_URL}/logo_symbiozai_email.png`

  const content = {
    fr: {
      preview: "Tu fais partie des premiers. Le CRM tel qu'on le connaît est mort.",
      headline: "C'est noté,<br>tu es dans la boucle.",
      p1: "Tu viens de rejoindre la waitlist de SymbiozAI — le premier CRM europ&eacute;en AI-Native.",
      p2: `Pas un CRM avec une couche d'IA coll&eacute;e par-dessus. Un CRM <span style="color: #ffffff; font-weight: 600;">pens&eacute; depuis le jour 1</span> pour que l'intelligence artificielle fasse le travail que personne ne veut faire&nbsp;: saisir, structurer, relancer, suivre.`,
      p3: "Toi, tu te concentres sur ce qui compte&nbsp;: vendre.",
      earlyLabel: "Early Adopter",
      earlyText: `Tu fais partie des <span style="color: #ffffff; font-weight: 600;">premiers inscrits</span>. Concr&egrave;tement&nbsp;: acc&egrave;s prioritaire au produit, influence directe sur ce qu'on construit, et pricing early adopter au lancement.`,
      nextLabel: "La suite",
      step1: "On build. Tu re&ccedil;ois des updates quand c'est concret, pas du bruit.",
      step2: "Tu acc&egrave;des &agrave; la beta avant tout le monde.",
      step3: "Tu shapes le produit avec nous. Ton feedback = nos features.",
      referralTitle: "Tu connais quelqu'un qui gal&egrave;re avec son CRM&nbsp;?",
      referralText: "Envoie-lui le lien. Plus on est t&ocirc;t, plus on a d'impact sur ce qu'on construit.",
      cta: "Partager SymbiozAI&nbsp;&rarr;",
      bye: "&Agrave; tr&egrave;s vite,",
      founder: "Fondateur, SymbiozAI",
      unsub: "Se d&eacute;sinscrire",
    },
    en: {
      preview: "You're among the first. CRM as we know it is dead.",
      headline: "Noted,<br>you're in the loop.",
      p1: "You just joined the SymbiozAI waitlist — the first European AI-Native CRM.",
      p2: `Not a CRM with an AI layer slapped on top. A CRM <span style="color: #ffffff; font-weight: 600;">designed from day 1</span> so artificial intelligence does the work nobody wants to do: entering, structuring, following up, tracking.`,
      p3: "You focus on what matters: selling.",
      earlyLabel: "Early Adopter",
      earlyText: `You're among the <span style="color: #ffffff; font-weight: 600;">first subscribers</span>. Concretely: priority access to the product, direct influence on what we build, and early adopter pricing at launch.`,
      nextLabel: "What's next",
      step1: "We build. You get updates when it's concrete, not noise.",
      step2: "You access the beta before everyone else.",
      step3: "You shape the product with us. Your feedback = our features.",
      referralTitle: "Know someone struggling with their CRM?",
      referralText: "Send them the link. The earlier we are, the more impact we have on what we build.",
      cta: "Share SymbiozAI&nbsp;&rarr;",
      bye: "See you soon,",
      founder: "Founder, SymbiozAI",
      unsub: "Unsubscribe",
    },
  }

  const c = content[lang] ?? content.fr

  return `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>SymbiozAI</title>
<style type="text/css">
body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}
img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}
body{margin:0;padding:0;width:100%!important;height:100%!important;background-color:#0a0b0f}
:root{color-scheme:dark;supported-color-schemes:dark}
@media only screen and (max-width:620px){
.email-container{width:100%!important}
.mobile-padding{padding-left:20px!important;padding-right:20px!important}
.h1-mobile{font-size:26px!important;line-height:32px!important}
}
</style>
</head>
<body style="margin:0;padding:0;background-color:#0a0b0f;-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#0a0b0f;">${c.preview}&#847;&zwnj;&nbsp;&#8199;&shy;&#847;&zwnj;&nbsp;&#8199;&shy;</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#0a0b0f;">
<tr><td align="center" style="padding:40px 10px;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="560" class="email-container" style="max-width:560px;width:100%;">

<!-- LOGO -->
<tr><td align="left" style="padding:0 0 40px 0;" class="mobile-padding">
<a href="${BASE_URL}" target="_blank" style="text-decoration:none;">
<img src="${logoUrl}" alt="SymbiozAI" width="160" height="54" style="display:block;width:160px;height:auto;border:0;" />
</a></td></tr>

<!-- HEADLINE -->
<tr><td style="padding:0 0 24px 0;" class="mobile-padding">
<h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:32px;line-height:38px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;" class="h1-mobile">${c.headline}</h1>
</td></tr>

<!-- ACCENT LINE -->
<tr><td style="padding:0 0 32px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
<td style="width:48px;height:3px;background-color:#0088C2;border-radius:2px;" width="48" height="3">&nbsp;</td>
</tr></table></td></tr>

<!-- BODY -->
<tr><td style="padding:0 0 24px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#a3a8b8;">${c.p1}</p>
</td></tr>
<tr><td style="padding:0 0 24px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#a3a8b8;">${c.p2}</p>
</td></tr>
<tr><td style="padding:0 0 36px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#a3a8b8;">${c.p3}</p>
</td></tr>

<!-- EARLY ADOPTER -->
<tr><td style="padding:0 0 40px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-collapse:separate;border-radius:8px;">
<tr><td style="padding:24px 28px;background-color:#12131a;border-left:3px solid #0088C2;border-radius:8px;">
<p style="margin:0 0 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#0088C2;">${c.earlyLabel}</p>
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#a3a8b8;">${c.earlyText}</p>
</td></tr></table></td></tr>

<!-- WHAT'S NEXT -->
<tr><td style="padding:0 0 16px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#555a6e;">${c.nextLabel}</p>
</td></tr>

<tr><td style="padding:6px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="28" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#0088C2;font-weight:700;padding-top:2px;">01</td>
<td style="padding-left:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#a3a8b8;">${c.step1}</td>
</tr></table></td></tr>

<tr><td style="padding:6px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="28" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#0088C2;font-weight:700;padding-top:2px;">02</td>
<td style="padding-left:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#a3a8b8;">${c.step2}</td>
</tr></table></td></tr>

<tr><td style="padding:6px 0 44px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="28" valign="top" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:14px;color:#0088C2;font-weight:700;padding-top:2px;">03</td>
<td style="padding-left:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;color:#a3a8b8;">${c.step3}</td>
</tr></table></td></tr>

<!-- REFERRAL -->
<tr><td style="padding:0 0 12px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:16px;line-height:26px;color:#ffffff;font-weight:600;">${c.referralTitle}</p>
</td></tr>
<tr><td style="padding:0 0 24px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#a3a8b8;">${c.referralText}</p>
</td></tr>

<!-- CTA -->
<tr><td style="padding:0 0 48px 0;" class="mobile-padding">
<a href="${BASE_URL}" target="_blank" style="display:inline-block;padding:14px 32px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:6px;background-color:#0088C2;">${c.cta}</a>
</td></tr>

<!-- SEPARATOR -->
<tr><td style="padding:0 0 32px 0;" class="mobile-padding">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
<tr><td style="height:1px;background-color:#1e2030;" height="1">&nbsp;</td></tr>
</table></td></tr>

<!-- SIGNATURE -->
<tr><td style="padding:0 0 4px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:24px;color:#a3a8b8;">${c.bye}</p>
</td></tr>
<tr><td style="padding:0 0 2px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:#ffffff;">Laurent</p>
</td></tr>
<tr><td style="padding:0 0 40px 0;" class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;color:#555a6e;">${c.founder}</p>
</td></tr>

<!-- FOOTER -->
<tr><td class="mobile-padding">
<p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;color:#3a3f52;">SymbiozAI&nbsp;&middot;&nbsp;Lyon, France</p>
<p style="margin:8px 0 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:18px;">
<a href="${unsubscribeUrl}" style="color:#3a3f52;text-decoration:underline;">${c.unsub}</a>
</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`
}

function maskEmail(email) {
  const [local, domain] = email.split("@")
  const masked = local[0] + "*".repeat(Math.max(local.length - 2, 1)) + local[local.length - 1]
  return `${masked}@${domain}`
}

async function sendSlackNotification(email) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `🎉 Nouvelle inscription sur la waitlist : *${maskEmail(email)}*`,
    }),
  })
}

async function sendConfirmationEmail(email, lang) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return

  const subjects = { fr: "C'est noté, tu es dans la boucle — SymbiozAI", en: "Noted, you're in the loop — SymbiozAI" }

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      sender: { name: "Laurent @ SymbiozAI", email: "noreply@symbioz.ai" },
      to: [{ email }],
      subject: subjects[lang] ?? subjects.fr,
      htmlContent: buildEmailHtml(email, lang),
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

    sendConfirmationEmail(email, lang).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    )
    sendSlackNotification(email).catch((err) =>
      console.error("Failed to send Slack notification:", err)
    )

    return Response.json({ success: true, message: "Successfully subscribed" })
  } catch (error) {
    console.error("Error in subscribe API:", error)
    return Response.json({ success: false, message: `Failed to process subscription: ${error.message}` }, { status: 500 })
  }
}
