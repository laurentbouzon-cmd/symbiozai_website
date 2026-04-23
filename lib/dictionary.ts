export type Locale = "en" | "fr"

export type PrivacySection = {
  heading: string
  content: string
}

export type Dictionary = {
  title: string
  h1: string
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
      professional: string
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
  blog: {
    title: string
    subtitle: string
    allPosts: string
    categories: {
      produit: string
      comparatifs: string
      guides: string
      "actualites-ia": string
    }
    readingTime: string
    backToBlog: string
    ctaTitle: string
    ctaDescription: string
    previousArticle: string
    nextArticle: string
  }
}

export type FormDictionary = Dictionary["form"]

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    title: "The headless AI CRM | SymbiozAI",
    h1: "SymbiozAI — The headless AI CRM",
    subtitle: [
      "The headless AI CRM.",
      "The MCP-only CRM piloted by your AI agent via Claude Code, Cursor, or any MCP-compatible agent. You supervise, it executes.",
    ],
    description:
      "SymbiozAI is the MCP-only CRM your AI agent operates. Connect Claude Code, Cursor, or any MCP-compatible agent. 35 missions. You supervise, it executes. EU-hosted, AI Act native.",
    quote:
      "A CRM designed for humans, piloted by AI, is a compromise. A CRM designed to be piloted by AI is a product. MCP-retrofitted is not MCP-native. MCP-native is not MCP-only. We are MCP-only. That's the entire difference.",
    form: {
      placeholder: "Enter your email",
      button: "Join the waitlist",
      joining: "Joining...",
      success: "You're on the list!",
      error: "Something went wrong. Please try again.",
      validation: {
        required: "Email is required",
        invalid: "Please enter a valid email address",
        professional: "Please use your work email — personal addresses (Gmail, Yahoo, Outlook…) are not accepted.",
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
    blog: {
      title: "Blog",
      subtitle: "Ideas behind the headless AI CRM.",
      allPosts: "All",
      categories: {
        produit: "Product",
        comparatifs: "Comparisons",
        guides: "Guides",
        "actualites-ia": "AI News",
      },
      readingTime: "min read",
      backToBlog: "Back to blog",
      ctaTitle: "Ready to try?",
      ctaDescription: "Join the beta and connect your AI agent to the headless AI CRM.",
      previousArticle: "Previous article",
      nextArticle: "Next article",
    },
  },
  fr: {
    title: "Le CRM headless pour agents IA | SymbiozAI",
    h1: "SymbiozAI — Le CRM headless piloté par votre agent IA",
    subtitle: [
      "Le CRM headless pour agents IA.",
      "Le CRM MCP-only piloté par votre agent IA via Claude Code, Cursor ou tout agent compatible MCP. Vous supervisez, il exécute.",
    ],
    description:
      "SymbiozAI est le CRM MCP-only piloté par votre agent IA. Connectez Claude Code, Cursor ou tout agent compatible MCP. 35 missions. Vous supervisez, il exécute. Hébergé en EU, AI Act natif.",
    quote:
      "Un CRM conçu pour les humains, piloté par l'IA, c'est un compromis. Un CRM conçu pour être piloté par l'IA, c'est un produit. MCP-retrofitted n'est pas MCP-native. MCP-native n'est pas MCP-only. On est MCP-only. C'est toute la différence.",
    form: {
      placeholder: "Entrez votre email",
      button: "Rejoindre la liste",
      joining: "Inscription...",
      success: "Vous êtes sur la liste !",
      error: "Une erreur s'est produite. Veuillez réessayer.",
      validation: {
        required: "L'email est requis",
        invalid: "Veuillez entrer une adresse email valide",
        professional: "Merci d'utiliser votre email professionnel — les adresses personnelles (Gmail, Yahoo, Outlook…) ne sont pas acceptées.",
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
      title: "Politique de confidentialit\u00e9",
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
    blog: {
      title: "Blog",
      subtitle: "Les id\u00e9es derri\u00e8re le CRM headless pour agents IA.",
      allPosts: "Tous",
      categories: {
        produit: "Produit",
        comparatifs: "Comparatifs",
        guides: "Guides",
        "actualites-ia": "Actualit\u00e9s IA",
      },
      readingTime: "min de lecture",
      backToBlog: "Retour au blog",
      ctaTitle: "Pr\u00eat \u00e0 essayer ?",
      ctaDescription: "Rejoignez la beta et connectez votre agent IA au CRM headless.",
      previousArticle: "Article pr\u00e9c\u00e9dent",
      nextArticle: "Article suivant",
    },
  },
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[locale as Locale] ?? dictionaries.en
}
