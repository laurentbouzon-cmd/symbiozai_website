import { notionService } from "@/lib/notion-service"

export async function POST(request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ success: false, message: "Email requis" }, { status: 400 })
    }

    const result = await notionService.removeEmail(email)

    if (!result.success) {
      return Response.json({ success: false, message: result.error }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 })
  }
}
