import { google } from "googleapis"

// Configuration pour l'API Google Sheets
export const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID
export const SHEET_NAME = "Subscribers" // Nom de l'onglet dans votre Google Sheet
export const RANGE = "A:C" // Colonnes A à C (Email, Date, Status)

/**
 * Formate une date selon le format spécifié et la locale
 * @param {Date} date - La date à formater (par défaut: date actuelle)
 * @param {string} format - Le format de date (par défaut: 'MM/DD/YYYY')
 * @param {string} locale - La locale à utiliser (par défaut: 'en-US')
 * @returns {string} - La date formatée
 */
export function formatDate(date = new Date(), format = "MM/DD/YYYY", locale = "en-US") {
  // S'assurer que nous avons un objet Date
  const dateObj = typeof date === "string" ? new Date(date) : date

  // Format MM/DD/YYYY (format par défaut pour Google Sheets)
  if (!format || format === "MM/DD/YYYY") {
    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const day = String(dateObj.getDate()).padStart(2, "0")
    const year = dateObj.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Format DD/MM/YYYY (conservé pour compatibilité)
  if (format === "DD/MM/YYYY") {
    const day = String(dateObj.getDate()).padStart(2, "0")
    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const year = dateObj.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Format ISO pour les cas où nous avons besoin du format complet
  if (format === "ISO") {
    return dateObj.toISOString()
  }

  // Utiliser toLocaleDateString comme fallback
  return dateObj.toLocaleDateString(locale)
}

/**
 * Prépare la clé privée dans le bon format
 * @param {string} key - La clé privée à formater
 * @returns {string|undefined} - La clé formatée ou undefined si non fournie
 */
export function preparePrivateKey(key) {
  if (!key) return undefined

  // Si la clé est déjà au format PEM correct, la retourner telle quelle
  if (key.includes("-----BEGIN PRIVATE KEY-----") && key.includes("-----END PRIVATE KEY-----")) {
    return key
  }

  // Remplacer les littéraux \n par de vrais sauts de ligne
  let formattedKey = key.replace(/\\n/g, "\n")

  // Si la clé ne commence pas par l'en-tête PEM, l'ajouter
  if (!formattedKey.includes("-----BEGIN PRIVATE KEY-----")) {
    formattedKey = `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----\n`
  }

  return formattedKey
}

/**
 * Obtient un client d'authentification Google à partir des credentials JSON
 * @returns {Promise<google.auth.GoogleAuth>} - Le client d'authentification
 * @throws {Error} - Si les credentials ne sont pas disponibles ou invalides
 */
export async function getAuthClientFromJson() {
  try {
    if (!process.env.GOOGLE_CREDENTIALS_JSON) {
      throw new Error("GOOGLE_CREDENTIALS_JSON not available")
    }

    try {
      const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
      return new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })
    } catch (jsonError) {
      console.error("Error parsing GOOGLE_CREDENTIALS_JSON:", jsonError)
      throw new Error(`Invalid JSON credentials: ${jsonError.message}`)
    }
  } catch (error) {
    console.error("Error in getAuthClientFromJson:", error)
    throw error
  }
}

/**
 * Obtient un client d'authentification Google à partir des variables individuelles
 * @returns {Promise<google.auth.GoogleAuth>} - Le client d'authentification
 * @throws {Error} - Si les variables nécessaires ne sont pas disponibles
 */
export async function getAuthClientFromVars() {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("Required environment variables missing (GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY)")
    }

    // Récupérer et formater la clé privée
    const privateKey = preparePrivateKey(process.env.GOOGLE_PRIVATE_KEY)

    // Créer le client d'authentification
    return new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID || "unknown-project",
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID || "unknown-key-id",
        private_key: privateKey,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID || "unknown-client-id",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL || undefined,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })
  } catch (error) {
    console.error("Error in getAuthClientFromVars:", error)
    throw error
  }
}

/**
 * Obtient un client d'authentification Google en essayant différentes méthodes
 * @returns {Promise<{auth: google.auth.GoogleAuth, method: string}>} - Le client d'authentification et la méthode utilisée
 * @throws {Error} - Si aucune méthode d'authentification ne fonctionne
 */
export async function getGoogleAuthClient() {
  // Essayer d'abord avec les informations JSON complètes
  try {
    const auth = await getAuthClientFromJson()
    return { auth, method: "json" }
  } catch (jsonAuthError) {
    console.log("JSON authentication failed:", jsonAuthError.message)

    // Ensuite, essayer avec les variables individuelles
    try {
      const auth = await getAuthClientFromVars()
      return { auth, method: "vars" }
    } catch (varsAuthError) {
      console.error("Variables authentication failed:", varsAuthError.message)
      throw new Error(`Authentication failed: ${varsAuthError.message}`)
    }
  }
}

/**
 * Valide un email
 * @param {string} email - L'email à valider
 * @returns {boolean} - true si l'email est valide, false sinon
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Améliorer la fonction addEntryToSheet avec plus de logs et une meilleure gestion des erreurs

// Modifier la fonction addEntryToSheet pour s'assurer qu'elle utilise le format MM/DD/YYYY
export async function addEntryToSheet(auth, email, status = "Subscribed") {
  try {
    console.log(`Adding entry to sheet: ${email}, status: ${status}`)
    console.log(`Using spreadsheet ID: ${SPREADSHEET_ID}`)
    console.log(`Using sheet name: ${SHEET_NAME}`)
    console.log(`Using range: ${RANGE}`)

    const sheets = google.sheets("v4")
    // Explicitement utiliser le format MM/DD/YYYY
    const currentDate = formatDate(new Date(), "MM/DD/YYYY")

    console.log(`Formatted date: ${currentDate}`)
    console.log("Preparing to append values to sheet...")

    const response = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!${RANGE}`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[email, currentDate, status]],
      },
    })

    console.log("Successfully added entry to sheet")
    console.log(`Updated range: ${response.data.updates?.updatedRange}`)
    console.log(`Updated cells: ${response.data.updates?.updatedCells}`)

    return response
  } catch (error) {
    console.error("Error in addEntryToSheet:", error)
    console.error("Error details:", error.response?.data || error.message)
    throw error
  }
}

/**
 * Génère des suggestions de dépannage basées sur l'erreur
 * @param {Error} error - L'erreur rencontrée
 * @returns {string[]} - Les suggestions de dépannage
 */
export function generateTroubleshooting(error) {
  const message = error.message || ""

  if (message.includes("not found")) {
    return [
      "Le Google Sheet spécifié n'a pas été trouvé. Vérifiez l'ID du Sheet.",
      "Assurez-vous que le Google Sheet existe et qu'il n'a pas été supprimé.",
    ]
  }

  if (message.includes("permission") || message.includes("access")) {
    return [
      `Assurez-vous que le compte de service (${process.env.GOOGLE_CLIENT_EMAIL}) a été ajouté comme éditeur dans votre Google Sheet`,
      "Vérifiez que vous avez partagé le Google Sheet avec le bon compte de service",
      "Attendez quelques minutes pour que les permissions prennent effet",
    ]
  }

  if (message.includes("Requested entity was not found")) {
    return [
      `L'onglet "${SHEET_NAME}" n'a pas été trouvé dans votre Google Sheet`,
      "Créez un onglet nommé 'Subscribers' dans votre Google Sheet",
      "Ou modifiez la variable SHEET_NAME dans le code pour correspondre à votre onglet",
    ]
  }

  // Suggestions par défaut
  return [
    "Vérifiez que l'API Google Sheets est activée dans votre projet Google Cloud",
    "Vérifiez que l'ID du Google Sheet est correct",
    "Vérifiez les logs de votre application pour plus de détails",
  ]
}
