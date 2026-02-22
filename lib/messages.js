/**
 * Messages utilisés dans l'application
 * Préparé pour l'internationalisation future
 */
export const messages = {
  en: {
    subscription: {
      success: "Successfully subscribed",
      emailRequired: "Email is required",
      invalidEmail: "Invalid email format",
      error: "Failed to process subscription. Please try again later.",
      testSuccess: "Test successful",
    },
    googleSheets: {
      idMissing: "Google Sheet ID not configured",
      authFailed: "Authentication failed",
      accessError: "Error accessing Google Sheet",
    },
    troubleshooting: {
      checkEnvVars: "Check that environment variables are correctly configured",
      checkPrivateKey: "Check that the private key is in the correct format with line breaks",
      useJsonCredentials: "Try using the complete JSON credentials file instead",
      checkApiEnabled: "Check that the Google Sheets API is enabled in your Google Cloud project",
      checkSheetId: "Check that the Google Sheet ID is correct",
      checkLogs: "Check your application logs for more details",
    },
  },
  fr: {
    subscription: {
      success: "Inscription réussie",
      emailRequired: "L'email est requis",
      invalidEmail: "Format d'email invalide",
      error: "Échec du traitement de l'inscription. Veuillez réessayer plus tard.",
      testSuccess: "Test réussi",
    },
    googleSheets: {
      idMissing: "ID Google Sheet non configuré",
      authFailed: "Échec de l'authentification",
      accessError: "Erreur d'accès au Google Sheet",
    },
    troubleshooting: {
      checkEnvVars: "Vérifiez que les variables d'environnement sont correctement configurées",
      checkPrivateKey: "Vérifiez que la clé privée est au format correct avec les sauts de ligne",
      useJsonCredentials: "Essayez d'utiliser le fichier JSON complet des credentials à la place",
      checkApiEnabled: "Vérifiez que l'API Google Sheets est activée dans votre projet Google Cloud",
      checkSheetId: "Vérifiez que l'ID du Google Sheet est correct",
      checkLogs: "Vérifiez les logs de votre application pour plus de détails",
    },
  },
}

/**
 * Obtient un message dans la langue spécifiée
 * @param {string} key - La clé du message (format: 'category.subcategory.messageKey')
 * @param {string} locale - La locale à utiliser (par défaut: 'fr')
 * @returns {string} - Le message traduit ou la clé si le message n'est pas trouvé
 */
export function getMessage(key, locale = "fr") {
  const parts = key.split(".")
  let message = messages[locale] || messages.fr

  for (const part of parts) {
    if (message && message[part]) {
      message = message[part]
    } else {
      return key // Retourner la clé si le message n'est pas trouvé
    }
  }

  return typeof message === "string" ? message : key
}
