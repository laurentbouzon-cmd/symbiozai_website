const dictionaries = {
  en: {
    subtitle: ["The 1st European AI-Native CRM.", "It's the ultimate intelligence driving your growth."],
    description:
      "Prospecting, customer follow-ups and opportunity tracking are automated directly from WhatsApp and Slack by an integrated intelligence. SymbiozAI turns every interaction into concrete actions: qualification, follow-ups, documentation, reporting... Your revenue engine runs continuously, without manual input.",
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
      manifesto: "Manifesto",
      contact: "Contact",
      status: "Status",
    },
    contact: {
      title: "Contact Us",
      description: "For inquiries, please email us at:",
      backToHome: "Back to Home",
    },
    apiTest: {
      title: "API Test",
      apiResponse: "API Response:",
      error: "Error:",
      backToHome: "Back to Home",
    },
    status: {
      title: "System Status",
      description: "This page displays the current system status",
      generalStatus: "General Status",
      systemOperational: "System operational",
      lastCheck: "Last check:",
      systemInfo: "System Information",
      environment: "Environment",
      connectionStatus: "Connection Status",
      online: "Online",
      offline: "Offline",
      platform: "Platform",
      resolution: "Resolution",
      refresh: "Refresh",
    },
    manifesto: {
      title: "Manifesto",
      backToHome: "Back to Home",
    },
  },
  fr: {
    subtitle: ["Le 1er CRM AI-Natif Européen.", "L'intelligence ultime qui opère votre croissance."],
    description:
      "La prospection, les relances clients et le suivi des opportunités sont automatisés directement depuis WhatsApp et Slack par une intelligence intégrée. SymbiozAI transforme chaque échange en actions concrètes : qualification, relances, documentation, reporting… Votre dynamique de revenus fonctionne en continu, sans saisie ni pilotage manuel.",
    quote:
      "Nous croyons que la prochaine génération d'entreprises n'utilisera pas seulement l'IA, elles seront construites avec elle. Nativement. Structurellement. Intelligemment.",
    form: {
      placeholder: "Entrez votre email",
      button: "Rejoindre la liste",
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
      manifesto: "Manifeste",
      contact: "Contact",
      status: "Statut",
    },
    contact: {
      title: "Contactez-nous",
      description: "Pour toute demande, veuillez nous envoyer un email à :",
      backToHome: "Retour à l'accueil",
    },
    apiTest: {
      title: "Test d'API",
      apiResponse: "Réponse de l'API :",
      error: "Erreur :",
      backToHome: "Retour à l'accueil",
    },
    status: {
      title: "État du système",
      description: "Cette page affiche l'état actuel du système",
      generalStatus: "État général",
      systemOperational: "Système opérationnel",
      lastCheck: "Dernière vérification :",
      systemInfo: "Informations système",
      environment: "Environnement",
      connectionStatus: "État de la connexion",
      online: "En ligne",
      offline: "Hors ligne",
      platform: "Plateforme",
      resolution: "Résolution",
      refresh: "Actualiser",
    },
    manifesto: {
      title: "Manifeste",
      backToHome: "Retour à l'accueil",
    },
  },
}

/**
 * Get dictionary entries for the specified locale
 * @param {string} locale - The locale code (e.g., 'en', 'fr')
 * @returns {Object} - Dictionary entries for the specified locale
 */
export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.en
}
