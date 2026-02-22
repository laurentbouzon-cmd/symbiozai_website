import { google } from "googleapis"
import {
  getGoogleAuthClient,
  isValidEmail,
  addEntryToSheet,
  SPREADSHEET_ID,
  generateTroubleshooting,
} from "@/lib/google-sheets-utils"

/**
 * Route API pour tester l'intégration avec Google Sheets
 * Vérifie l'accès au Google Sheet et tente d'y ajouter une entrée de test
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

    // Vérifier si l'ID du Google Sheet est configuré
    if (!SPREADSHEET_ID) {
      return Response.json(
        {
          success: false,
          message: "Google Sheet ID not configured",
          troubleshooting: [
            "Ajoutez la variable d'environnement GOOGLE_SHEET_ID dans votre projet Vercel",
            "Vérifiez que l'ID du Google Sheet est correct",
          ],
        },
        { status: 400 },
      )
    }

    // Obtenir le client d'authentification
    let auth, authMethod
    try {
      const result = await getGoogleAuthClient()
      auth = result.auth
      authMethod = result.method
      console.log(`Using authentication method: ${authMethod}`)
    } catch (authError) {
      return Response.json(
        {
          success: false,
          message: `Authentication failed: ${authError.message}`,
          troubleshooting: [
            "Vérifiez que les variables d'environnement GOOGLE_CLIENT_EMAIL et GOOGLE_PRIVATE_KEY sont correctement configurées",
            "Vérifiez que la clé privée est au format correct avec les sauts de ligne",
            "Essayez d'utiliser le fichier JSON complet des credentials à la place",
          ],
        },
        { status: 401 },
      )
    }

    try {
      // Tester l'accès au Google Sheet
      const sheets = google.sheets("v4")
      const testResponse = await sheets.spreadsheets.get({
        auth,
        spreadsheetId: SPREADSHEET_ID,
      })

      // Récupérer le titre du Google Sheet pour confirmation
      const sheetTitle = testResponse.data.properties.title

      // Ajouter l'email à Google Sheets
      const appendResponse = await addEntryToSheet(auth, email, "Test")

      // Retourner une réponse réussie
      return Response.json({
        success: true,
        message: "Test d'écriture réussi",
        details: {
          sheetTitle,
          authMethod,
          updatedRange: appendResponse.data.updates.updatedRange,
          updatedCells: appendResponse.data.updates.updatedCells,
        },
      })
    } catch (sheetError) {
      console.error("Error accessing Google Sheet:", sheetError)

      // Générer des suggestions de dépannage basées sur l'erreur
      const troubleshooting = generateTroubleshooting(sheetError)

      return Response.json(
        {
          success: false,
          message: `Error accessing Google Sheet: ${sheetError.message}`,
          troubleshooting,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in Google Sheet test API:", error)
    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred",
        troubleshooting: [
          "Vérifiez les logs de votre application pour plus de détails",
          "Assurez-vous que toutes les variables d'environnement nécessaires sont configurées",
        ],
      },
      { status: 500 },
    )
  }
}
