import { isValidEmail } from "@/lib/utils"
import { notionService } from "@/lib/notion-service"

export async function POST(request) {
  try {
    const { email, lang = "fr" } = await request.json()

    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    if (!process.env.NOTION_DATABASE_ID) {
      return Response.json({ success: false, message: "Notion database ID not configured" }, { status: 500 })
    }

    const result = await notionService.addEmail(email)

    if (!result.success) {
      return Response.json({ success: false, message: result.error }, { status: 500 })
    }

    return Response.json({ success: true, message: "Successfully subscribed" })
  } catch (error) {
    console.error("Error in subscribe API:", error)
    return Response.json({ success: false, message: `Failed to process subscription: ${error.message}` }, { status: 500 })
  }
}
