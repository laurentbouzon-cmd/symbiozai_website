/**
 * Home page copy: post-pivot MCP-only, restructured approach C+ (2026-04-23).
 * Source: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 * Scope: sections 1-9 post-hero. Hero copy stays in lib/dictionary.ts (locked).
 * R11-compliant. Zero em dash (only hyphens "-" used).
 */

type CtaLink = {
  label: string
  href: string
  external?: boolean
}

export type HomePillarCard = {
  h3: string
  body: string
}

export type HomePainCard = {
  title: string
  stat: string
  body: string
  pilier: string
}

export type HomeMetric = {
  value: string
  label: string
  live?: boolean
}

export type HomeTrustBadge = {
  title: string
  body: string
}

export type HomePageCopy = {
  ruptureBanner: {
    claim: string
    subclaim: string
  }
  pillarsHub: {
    eyebrow: string
    h2: string
    intro: string
    cards: [HomePillarCard, HomePillarCard, HomePillarCard, HomePillarCard]
    visualAlt: string
  }
  problem: {
    eyebrow: string
    h2: string
    cards: [HomePainCard, HomePainCard, HomePainCard]
  }
  autonome: {
    eyebrow: string
    h2: string
    intro: string
    bullets: string[]
    closing: string
    visualAlt: string
  }
  mcpFirst: {
    eyebrow: string
    h2: string
    intro1: string
    intro2: string
    intro3: string
    bullets: string[]
    closing: string
    visualAlt: string
  }
  aiNativeLearn: {
    eyebrow: string
    h2: string
    sub1: {
      h3: string
      paragraphs: string[]
    }
    sub2: {
      h3: string
      paragraphs: string[]
    }
    visualAlt: string
  }
  infra: {
    eyebrow: string
    h2: string
    metrics: [HomeMetric, HomeMetric, HomeMetric, HomeMetric]
    badges: [HomeTrustBadge, HomeTrustBadge, HomeTrustBadge, HomeTrustBadge]
    quoteAuthor: string
  }
  integrations: {
    h2: string
    agentsLabel: string
    toolsLabel: string
    microcopy: string
  }
  ctaFinal: {
    h2: string
    lede: string[]
    reassurance: string[]
    secondaryCta: CtaLink
    microcopyPrefix: string
    microcopyLink: CtaLink
  }
}

export const homeCopy: Record<"en" | "fr", HomePageCopy> = {
  en: {
    ruptureBanner: {
      claim: "AI is no longer in your CRM. Your CRM is in your AI.",
      subclaim: "CRMs were built for humans to operate. We took the opposite bet.",
    },
    pillarsHub: {
      eyebrow: "WHY IT'S DIFFERENT",
      h2: "The architecture that changes everything",
      intro: "Four architectural choices. Not four features.",
      cards: [
        {
          h3: "Built for AI",
          body:
            "SymbiozAI was designed from scratch to be operated by an AI agent. Not a classic CRM with a model bolted on - a system where the agent is the primary operator.",
        },
        {
          h3: "Runs 24/7",
          body:
            "Internal AI agents handle pipeline management, follow-ups, weak signals, and re-activation - continuously, even when you're away.",
        },
        {
          h3: "One endpoint",
          body:
            "35 missions in natural language. Your Claude Code, Cursor, or Cline agent calls SymbiozAI directly from your toolchain. Zero friction. Zero UI to learn.",
        },
        {
          h3: "Sharpens over time",
          body:
            "Every interaction enriches what the system knows about your customers, your sales patterns, your signals. The longer it runs, the sharper its reads become.",
        },
      ],
      visualAlt:
        "Comparison diagram: MCP-retrofitted CRMs add a server on top of a legacy UI; SymbiozAI is MCP-only by design.",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      h2: "What you lose every week without knowing",
      cards: [
        {
          title: "Your time goes to data entry",
          stat: "2h/day",
          body:
            "Two hours per rep per day filling a CRM nobody wants to open. This is not a discipline problem - it's an architecture problem.",
          pilier: "Pillar Autonomous - the agent fills in for you, continuously.",
        },
        {
          title: "Deals slip with no warning",
          stat: "37% of opportunities",
          body:
            "Stalled deals, ignored weak signals, cooling accounts. The CRM records. It does not learn. It does not watch.",
          pilier: "Pillar Self-learning - the system monitors signals and sharpens its read each cycle.",
        },
        {
          title: "Follow-ups don't happen",
          stat: "5 missed follow-ups per week",
          body:
            "Not from forgetting - because nothing prioritises, nothing alerts, nothing triggers automatically. An orchestrating agent changes that.",
          pilier: "Pillar MCP-first - your agent drives from your editor, without opening a single interface.",
        },
      ],
    },
    autonome: {
      eyebrow: "LAYER 1 - INTERNAL AGENTS",
      h2: "Your agent operates. You supervise.",
      intro:
        "SymbiozAI's agents run in the background, continuously. Not on demand - all the time.",
      bullets: [
        "Pipeline management: automatic qualification of incoming leads, multi-signal scoring, status updates.",
        "Continuous enrichment: 23 data providers orchestrated, no manual intervention.",
        "Automatic follow-ups: detection of deals with no recent activity, follow-up prioritisation based on Momentum Score.",
        "Weak signals: re-activation of dormant prospects as soon as a timing signal appears.",
      ],
      closing:
        "You check in for 5 minutes a day: you validate what requires your attention. Everything else has already moved.",
      visualAlt: "Supervision console mockup showing the daily queue of items that need your approval.",
    },
    mcpFirst: {
      eyebrow: "LAYER 2 - MCP INFRASTRUCTURE",
      h2: "One endpoint. Every agent. Zero friction.",
      intro1:
        "Other CRMs add an MCP server on top of an existing interface. That is MCP-retrofitted - one more layer on an architecture designed for mouse clicks.",
      intro2: "We removed the interface.",
      intro3:
        "SymbiozAI is headless by design. The MCP server is not a feature - it is the product. Your agent becomes the primary operator. You do not change tools, you do not train your team on new software: your agent calls SymbiozAI from the environment you already use.",
      bullets: [
        "35 missions in natural language - not 100+ CRUD endpoints.",
        "Installation in under 5 minutes via npx @symbiozai/mcp-setup.",
        "Works with Claude Code, Cursor, Cline, Goose, Continue.dev, ChatGPT.",
        "Your agent says \"target 50 ICP-fit leads, qualify the top 10, prep meeting briefs\" - SymbiozAI executes.",
      ],
      closing: "That is the difference between \"your CRM has AI\" and \"your AI has a CRM\".",
      visualAlt: "Wrap-first architecture diagram: 23 data providers through SymbiozAI MCP server to your AI agent.",
    },
    aiNativeLearn: {
      eyebrow: "ARCHITECTURE AND LEARNING",
      h2: "Built for AI. Sharpens with every cycle.",
      sub1: {
        h3: "Not a chatbot bolted on. A CRM designed to be invoked.",
        paragraphs: [
          "The difference between \"AI-native\" and \"AI-assisted\" is not a marketing question - it is a design question.",
          "An AI-assisted CRM starts from a relational database built for humans. AI is added after: a sidebar assistant, a \"draft with AI\" button, an auto-summary. The architecture stays centred on the human interface.",
          "SymbiozAI starts from the opposite premise: the agent is the primary operator. The database, the missions, the data model - everything was designed to be read, written, and orchestrated by a language model. The human interface (the supervision console) is the residual layer, not the central one.",
          "This architectural choice changes everything: missions are verbal, context is structured to be consumed by an LLM, and sensitive actions are exposed as gates, not as forms.",
        ],
      },
      sub2: {
        h3: "Your CRM knows what it has already done for you.",
        paragraphs: [
          "Because SymbiozAI is built AI-native, every interaction feeds the system - not just as a log, but as a layer of knowledge.",
          "Every prospect call remembered. Every email sent, analysed, attached to the profile. Every closed deal, its signals documented. Every follow-up triggered, its response or silence archived.",
          "Across cycles, the system sharpens its reads: more accurate scoring, earlier detection of stalling deals, richer prospect profiles before every meeting. Not because a rule was programmed in - because it has operated alongside you.",
          "Your CRM never starts from scratch. It starts from where you left off.",
        ],
      },
      visualAlt: "Self-learning timeline: Day 1, Day 30, Day 180 - the system sharpens its reads over time.",
    },
    infra: {
      eyebrow: "BUILT TO LAST",
      h2: "An MCP-only infrastructure. Not a chatbot bolted on a CRM.",
      metrics: [
        { value: "35", label: "verbal MCP missions", live: true },
        { value: "23", label: "integrated data sources" },
        { value: "< 5 min", label: "setup" },
        { value: "5 min/d", label: "daily supervision" },
      ],
      badges: [
        {
          title: "EU-hosted (Frankfurt)",
          body: "DigitalOcean FRA1 infrastructure. Your pipeline data stays in the EU.",
        },
        {
          title: "AI Act native",
          body:
            "Immutable HMAC-signed audit log, 7-year retention, 3-class HITL policy, tenant kill-switch in under 1 second.",
        },
        {
          title: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-provider. No fine-tuning on your data. No retention by LLM providers.",
        },
        {
          title: "GDPR article 15 native",
          body: "/audit/my-data endpoint, export on demand, zero vendor lock-in.",
        },
      ],
      quoteAuthor: "Laurent Bouzon, founder of SymbiozAI",
    },
    integrations: {
      h2: "Your AI agent commands. Your tools execute.",
      agentsLabel: "Your AI agent",
      toolsLabel: "Your tools",
      microcopy:
        "35 MCP missions. One connection. Your AI agent orchestrates - tools execute beneath it.",
    },
    ctaFinal: {
      h2: "Ready to connect your agent?",
      lede: [
        "No onboarding. No migration. No 3-month IT project.",
        "Your Claude Code or Cursor agent is live on SymbiozAI in under 5 minutes.",
      ],
      reassurance: [
        "No commitment",
        "No credit card",
        "Free beta - 500 MCP calls per day",
      ],
      secondaryCta: {
        label: "Book a meeting",
        href: "https://calendly.com/laurent-bouzon-symbioz/30min",
        external: true,
      },
      microcopyPrefix: "For teams not yet running their own agent -",
      microcopyLink: {
        label: "For sales teams",
        href: "/en/for-sales-teams",
      },
    },
  },
  fr: {
    ruptureBanner: {
      claim: "L'IA n'est plus dans votre CRM. Votre CRM est dans votre IA.",
      subclaim:
        "Les CRM ont été construits pour que les humains les opèrent. Nous avons pris le pari inverse.",
    },
    pillarsHub: {
      eyebrow: "POURQUOI C'EST DIFFERENT",
      h2: "L'architecture qui change tout",
      intro: "Quatre choix d'architecture. Pas quatre fonctionnalités.",
      cards: [
        {
          h3: "Conçu pour l'IA",
          body:
            "SymbiozAI a été conçu depuis zéro pour être opéré par un agent IA. Pas un CRM classique avec un modèle greffé dessus - un système dont l'agent est l'utilisateur principal.",
        },
        {
          h3: "Opère 24/7",
          body:
            "Des agents IA internes gèrent le pipeline, les relances, les signaux faibles et la réactivation - en continu, même quand vous n'êtes pas là.",
        },
        {
          h3: "Un seul endpoint",
          body:
            "35 missions en langage naturel. Votre agent Claude Code, Cursor ou Cline appelle SymbiozAI directement depuis votre toolchain. Zéro friction. Zéro UI à apprendre.",
        },
        {
          h3: "S'affine avec le temps",
          body:
            "Chaque interaction enrichit ce que le système sait de vos clients, vos patterns de vente, vos signaux. Plus il opère, plus ses lectures deviennent précises.",
        },
      ],
      visualAlt:
        "Schéma comparatif : les CRM MCP-retrofitted ajoutent un serveur au-dessus d'une UI existante, SymbiozAI est MCP-only par conception.",
    },
    problem: {
      eyebrow: "LE PROBLEME",
      h2: "Ce que vous perdez chaque semaine sans le savoir",
      cards: [
        {
          title: "Votre temps part en saisie",
          stat: "2h/jour",
          body:
            "Deux heures par commercial par jour à renseigner un CRM que personne n'a envie d'ouvrir. Ce n'est pas un problème de discipline - c'est un problème d'architecture.",
          pilier: "Pilier Autonome - l'agent saisit à votre place, en continu.",
        },
        {
          title: "Les deals glissent sans alerte",
          stat: "37% des opportunités",
          body:
            "Deals qui stagnent, signaux faibles ignorés, comptes qui refroidissent. Le CRM enregistre. Il n'apprend pas. Il ne surveille pas.",
          pilier:
            "Pilier Auto-apprenant - le système surveille les signaux et affine sa lecture à chaque cycle.",
        },
        {
          title: "Les relances ne se font pas",
          stat: "5 follow-ups oubliés par semaine",
          body:
            "Pas par oubli - parce que rien ne priorise, rien n'alerte, rien ne déclenche automatiquement. Un agent qui orchestre change ça.",
          pilier:
            "Pilier MCP-first - votre agent pilote depuis votre éditeur, sans ouvrir une seule interface.",
        },
      ],
    },
    autonome: {
      eyebrow: "COUCHE 1 - AGENTS INTERNES",
      h2: "Votre agent opère. Vous supervisez.",
      intro:
        "Les agents SymbiozAI opèrent en fond, en permanence. Pas à la demande - en continu.",
      bullets: [
        "Pipeline management : qualification automatique des leads entrants, scoring multi-signaux, mise à jour des statuts.",
        "Enrichissement continu : 23 fournisseurs de données orchestrés, sans intervention manuelle.",
        "Follow-ups automatiques : détection des deals sans activité récente, priorisation des relances selon le Momentum Score.",
        "Signaux faibles : réactivation de prospects dormants dès qu'un signal de timing apparaît.",
      ],
      closing:
        "Vous revenez 5 minutes par jour : vous validez ce qui requiert votre attention. Tout le reste a déjà avancé.",
      visualAlt: "Maquette de la console de supervision : la file quotidienne de ce qui requiert votre approbation.",
    },
    mcpFirst: {
      eyebrow: "COUCHE 2 - INFRASTRUCTURE MCP",
      h2: "Un seul endpoint. Tous vos agents. Zéro friction.",
      intro1:
        "Les autres CRM ajoutent un serveur MCP à une interface existante. C'est du MCP retrofitted - une couche de plus sur une architecture pensée pour la souris.",
      intro2: "Nous avons retiré l'interface.",
      intro3:
        "SymbiozAI est headless par conception. Le serveur MCP n'est pas une feature - c'est le produit. Votre agent devient l'opérateur principal. Vous ne changez pas d'outil, vous ne formez pas votre équipe à un nouveau logiciel : votre agent appelle SymbiozAI depuis l'environnement que vous utilisez déjà.",
      bullets: [
        "35 missions en langage naturel - pas 100+ endpoints CRUD.",
        "Installation en moins de 5 minutes via npx @symbiozai/mcp-setup.",
        "Compatible avec Claude Code, Cursor, Cline, Goose, Continue.dev, ChatGPT.",
        "Votre agent dit \"cible 50 leads ICP, qualifie les 10 meilleurs, prépare les briefs réunion\" - SymbiozAI exécute.",
      ],
      closing: "C'est la différence entre \"votre CRM a une IA\" et \"votre IA a un CRM\".",
      visualAlt: "Schéma d'architecture wrap-first : 23 fournisseurs de données connectés à votre agent via le serveur MCP SymbiozAI.",
    },
    aiNativeLearn: {
      eyebrow: "ARCHITECTURE ET APPRENTISSAGE",
      h2: "Conçu pour l'IA. S'affine à chaque cycle.",
      sub1: {
        h3: "Pas un chatbot greffé. Un CRM conçu pour être invoqué.",
        paragraphs: [
          "La différence entre \"AI-native\" et \"AI-assisted\" n'est pas une question de marketing - c'est une question de conception.",
          "Un CRM AI-assisted part d'une base de données relationnelle pensée pour des humains. L'IA est ajoutée après : un assistant sur le côté, un bouton \"rédiger avec IA\", un résumé automatique. L'architecture reste centrée sur l'interface humaine.",
          "SymbiozAI part du principe inverse : l'agent est l'opérateur principal. La base de données, les missions, le modèle de données - tout a été conçu pour être lu, écrit et orchestré par un modèle de langage. L'interface humaine (la console de supervision) est la couche résiduelle, pas la couche centrale.",
          "Ce choix d'architecture change tout : les missions sont verbales, le contexte est structuré pour être consommé par un LLM, et les actions sensibles sont exposées comme des gates, pas comme des formulaires.",
        ],
      },
      sub2: {
        h3: "Votre CRM sait ce qu'il a déjà fait pour vous.",
        paragraphs: [
          "Parce que SymbiozAI est conçu AI-native, chaque interaction alimente le système - pas seulement comme un log, mais comme une strate de connaissance.",
          "Chaque appel de prospect mémorisé. Chaque email envoyé, analysé, rattaché au profil. Chaque deal clôturé, ses signaux documentés. Chaque relance déclenchée, sa réponse ou son silence archivés.",
          "Au fil des cycles, le système affine ses lectures : meilleure précision sur le scoring, détection plus précoce des deals qui stagnent, profils prospects plus riches avant chaque réunion. Pas parce qu'on lui a appris une règle - parce qu'il a opéré avec vous.",
          "Votre CRM ne repart jamais de zéro. Il repart de là où vous en êtes.",
        ],
      },
      visualAlt: "Chronologie auto-apprenante : Jour 1, Jour 30, Jour 180 - le système affine ses lectures dans le temps.",
    },
    infra: {
      eyebrow: "CONSTRUIT POUR DURER",
      h2: "Une infrastructure MCP-only. Pas un chatbot collé sur un CRM.",
      metrics: [
        { value: "35", label: "missions verbales", live: true },
        { value: "23", label: "sources intégrées" },
        { value: "< 5 min", label: "setup" },
        { value: "5 min/j", label: "supervision quotidienne" },
      ],
      badges: [
        {
          title: "Hébergé en EU (Frankfurt)",
          body: "Infrastructure DigitalOcean FRA1. Vos données pipeline restent en EU.",
        },
        {
          title: "AI Act natif",
          body:
            "Audit log immuable signé HMAC, rétention 7 ans, politique HITL 3 classes, kill-switch tenant en moins d'1 seconde.",
        },
        {
          title: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-provider. Pas de fine-tuning sur vos données. Pas de rétention par les providers LLM.",
        },
        {
          title: "RGPD article 15 natif",
          body: "Endpoint /audit/my-data, export à la demande, zéro vendor lock-in.",
        },
      ],
      quoteAuthor: "Laurent Bouzon, fondateur de SymbiozAI",
    },
    integrations: {
      h2: "Votre agent IA pilote. Vos outils exécutent.",
      agentsLabel: "Votre agent IA",
      toolsLabel: "Vos outils",
      microcopy:
        "35 missions MCP. Une connexion. Votre agent IA orchestre - les outils exécutent en dessous.",
    },
    ctaFinal: {
      h2: "Prêt à connecter votre agent ?",
      lede: [
        "Pas de formation. Pas de migration. Pas de projet IT de 3 mois.",
        "Votre agent Claude Code ou Cursor est opérationnel sur SymbiozAI en moins de 5 minutes.",
      ],
      reassurance: [
        "Sans engagement",
        "Sans carte bancaire",
        "Beta gratuite - 500 appels MCP par jour",
      ],
      secondaryCta: {
        label: "Prendre rendez-vous",
        href: "https://calendly.com/laurent-bouzon-symbioz/30min",
        external: true,
      },
      microcopyPrefix: "Pour les équipes qui n'ont pas encore leur propre agent -",
      microcopyLink: {
        label: "Pour les équipes commerciales",
        href: "/fr/for-sales-teams",
      },
    },
  },
}

export const homeAgents: readonly string[] = [
  "Claude Code",
  "Cursor",
  "ChatGPT",
  "Cline",
  "Goose",
  "Continue.dev",
] as const

export type HomeIntegration = { name: string; logo: string }

export const homeIntegrations: readonly HomeIntegration[] = [
  { name: "WhatsApp", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
  { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
  { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
  { name: "Pipedrive", logo: "https://www.pipedrive.com/favicon.ico" },
] as const
