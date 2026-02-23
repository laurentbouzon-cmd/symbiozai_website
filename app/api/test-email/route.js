export async function GET() {
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    return Response.json({ error: "BREVO_API_KEY not set" }, { status: 500 })
  }

  const body = JSON.stringify({
    sender: { name: "SymbiozAI", email: "noreply@symbioz.ai" },
    to: [{ email: "laurent.bouzon@adm-holding.fr" }],
    subject: "Test Brevo depuis SymbiozAI",
    htmlContent: "<p>Test email depuis le serveur.</p>",
  })

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body,
  })

  const data = await res.json()
  return Response.json({ status: res.status, brevo: data })
}
