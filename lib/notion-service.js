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
            type: "email",
            email: email,
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
}
