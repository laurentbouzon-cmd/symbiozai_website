import { Client } from "@notionhq/client"

// Initialiser le client Notion avec la clé API
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID

export const notionService = {
  /**
   * Ajoute un email à la base de données Notion
   * @param {string} email - L'adresse email à ajouter
   * @returns {Promise<Object>} - L'objet de réponse de Notion
   */
  async addEmail(email) {
    try {
      // Vérifier que l'email est valide
      if (!email || !email.includes("@")) {
        throw new Error("Email invalide")
      }

      // Créer une nouvelle entrée dans la base de données Notion
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          Email: {
            type: "title",
            title: [{ text: { content: email } }],
          },
          Date: {
            type: "date",
            date: {
              start: new Date().toISOString(),
            },
          },
          Source: {
            type: "select",
            select: {
              name: "Waitlist",
            },
          },
        },
      })

      return {
        success: true,
        id: response.id,
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'email à Notion:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  },

  async removeEmail(email) {
    try {
      const apiKey = process.env.NOTION_API_KEY
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      }

      const queryRes = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          filter: { property: "Email", title: { equals: email } },
        }),
      })

      const data = await queryRes.json()

      if (!data.results || data.results.length === 0) {
        return { success: true, notFound: true }
      }

      await Promise.all(
        data.results.map((page) =>
          fetch(`https://api.notion.com/v1/pages/${page.id}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify({ archived: true }),
          })
        )
      )

      return { success: true }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'email:", error)
      return { success: false, error: error.message }
    }
  },
}
