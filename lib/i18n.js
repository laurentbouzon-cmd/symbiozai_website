/**
 * Get translations for the specified locale
 * @param {string} locale - The locale code (e.g., 'en', 'fr')
 * @returns {Object} - Translations for the specified locale
 */
export function getTranslations(locale) {
  const translations = {
    en: {
      title: "SymbiozAI - The first 100% AI-Native CRM. Designed to work for you.",
      subtitle: "The first 100% AI-Native CRM. Designed to work for you.",
      description:
        "Your prospecting, customer follow-up and CRM updates are fully automated, driven from WhatsApp and Slack, with an integrated AI agent. SymbiozAI transforms every exchange into concrete actions: qualification, follow-ups, documentation, reporting... Your sales cycle runs on its own, continuously.",
      quote:
        "We believe the next generation of companies won't just use AI, they'll be built with it. Natively. Structurally. Intelligently.",
      form: {
        placeholder: "Enter your email",
        button: "Join the waitlist",
        joining: "Joining...",
        success: "You're on the list!",
        error: "Something went wrong. Please try again.",
        validation: {
          required: "Email is required",
          invalid: "Please enter a valid email address",
        },
      },
      footer: {
        copyright: "All rights reserved.",
      },
      apiTest: {
        title: "API Test",
        apiResponse: "API Response:",
        error: "Error:",
        backToHome: "Back to Home",
      },
    },
    fr: {
      title: "SymbiozAI - Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.",
      subtitle: "Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.",
      description:
        "Votre prospection, votre suivi client et vos mises à jour CRM sont complètement automatisés, pilotés depuis WhatsApp et Slack, avec un agent IA intégré. SymbiozAI transforme chaque échange en actions concrètes : qualification, relances, documentation, reporting… Votre cycle commercial s'opère seul, en continu.",
      quote:
        "Nous croyons que la prochaine génération d'entreprises n'utilisera pas seulement l'IA, elles seront construites avec elle. Nativement. Structurellement. Intelligemment.",
      form: {
        placeholder: "Entrez votre email",
        button: "Rejoindre la liste d'attente",
        joining: "Inscription...",
        success: "Vous êtes sur la liste !",
        error: "Une erreur s'est produite. Veuillez réessayer.",
        validation: {
          required: "L'email est requis",
          invalid: "Veuillez entrer une adresse email valide",
        },
      },
      footer: {
        copyright: "Tous droits réservés.",
      },
      apiTest: {
        title: "Test d'API",
        apiResponse: "Réponse de l'API :",
        error: "Erreur :",
        backToHome: "Retour à l'accueil",
      },
    },
  }

  return translations[locale] || translations.en
}
