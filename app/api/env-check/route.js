export async function GET() {
  // Vérifier les variables d'environnement côté serveur
  const envStatus = {
    hasNotionApiKey: !!process.env.NOTION_API_KEY,
    hasNotionDatabaseId: !!process.env.NOTION_DATABASE_ID,
    hasResendApiKey: !!process.env.RESEND_API_KEY,
    hasEmailFrom: !!process.env.EMAIL_FROM,
    hasEmailReplyTo: !!process.env.EMAIL_REPLY_TO,
  }

  return Response.json({ status: envStatus })
}
