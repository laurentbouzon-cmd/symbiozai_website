export type Locale = "en" | "fr"

export type PrivacySection = {
  heading: string
  content: string
}

export type Dictionary = {
  subtitle: [string, string]
  description: string
  quote: string
  form: {
    placeholder: string
    button: string
    joining: string
    success: string
    error: string
    validation: {
      required: string
      invalid: string
    }
  }
  footer: {
    copyright: string
    manifesto: string
    contact: string
    status: string
  }
  contact: {
    title: string
    description: string
    backToHome: string
  }
  apiTest: {
    title: string
    apiResponse: string
    error: string
    backToHome: string
  }
  status: {
    title: string
    description: string
    generalStatus: string
    systemOperational: string
    lastCheck: string
    systemInfo: string
    environment: string
    connectionStatus: string
    online: string
    offline: string
    platform: string
    resolution: string
    refresh: string
  }
  manifesto: {
    title: string
    backToHome: string
  }
  privacy: {
    title: string
    lastUpdated: string
    backToHome: string
    sections: PrivacySection[]
  }
}

export type FormDictionary = Dictionary["form"]

const dictionaries: Record<Locale, Dictionary> = {
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
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "Last updated:",
      backToHome: "Back to Home",
      sections: [
        {
          heading: "1. Introduction",
          content:
            'SymbiozAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.',
        },
        {
          heading: "2. Information We Collect",
          content:
            "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This information may include your name, email address, and any other information you choose to provide.",
        },
        {
          heading: "3. How We Use Your Information",
          content:
            "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.",
        },
        {
          heading: "4. Contact Us",
          content: "If you have any questions about this Privacy Policy, please contact us at",
        },
      ],
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
    privacy: {
      title: "Politique de confidentialité",
      lastUpdated: "Dernière mise à jour :",
      backToHome: "Retour à l'accueil",
      sections: [
        {
          heading: "1. Introduction",
          content:
            "SymbiozAI (\"nous\", \"notre\", ou \"nos\") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et partageons des informations vous concernant lorsque vous utilisez notre site web et nos services.",
        },
        {
          heading: "2. Informations que nous collectons",
          content:
            "Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous créez un compte, vous abonnez à notre newsletter ou nous contactez pour obtenir de l'aide. Ces informations peuvent inclure votre nom, votre adresse email et toute autre information que vous choisissez de fournir.",
        },
        {
          heading: "3. Comment nous utilisons vos informations",
          content:
            "Nous utilisons les informations collectées pour fournir, maintenir et améliorer nos services, pour communiquer avec vous et pour respecter nos obligations légales.",
        },
        {
          heading: "4. Nous contacter",
          content:
            "Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à",
        },
      ],
    },
  },
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.en
}
