/**
 * Home page copy: post-pivot MCP-only, YC-grade v10 (2026-04-23).
 * Source: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 *   Section "Home YC-grade -- 9 sections v10 2026-04-23" (l.1814-2067).
 * Scope: sections 1-9 post-hero. Hero copy stays in lib/dictionary.ts (locked).
 * R11-compliant (verified grep 0 match by content-creator). Zero em dash.
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
      claim: "Your CRM waited to be opened. Ours executes.",
      subclaim:
        "CRMs were built for humans who fill in fields. Then the industry bolted an AI assistant on the side. We took the opposite bet.",
    },
    pillarsHub: {
      eyebrow: "WHY IT'S DIFFERENT",
      h2: "The architecture that changes everything",
      intro:
        "Four architectural choices. Each one a break from the past, not a feature added to it.",
      cards: [
        {
          h3: "Built to be invoked, not opened.",
          body:
            "Not a classic CRM with a model bolted on. A database, missions, and a data model - all designed to be read and orchestrated by an AI agent. The human interface is the residual layer.",
        },
        {
          h3: "Runs while you're away.",
          body:
            "Internal AI agents handle pipeline management, follow-ups, and weak signals - continuously, not on demand. You check in for 5 minutes a day to approve what needs your attention.",
        },
        {
          h3: "One endpoint. 35 verbal missions.",
          body:
            "Your Claude Code, Cursor, or Cline agent calls SymbiozAI directly from your toolchain in natural language. No plugin, no interface to open, no API patchwork to manage.",
        },
        {
          h3: "Sharpens with every cycle.",
          body:
            "Every call, every deal, every email analyzed - absorbed into the system, not just logged. Sharper scoring, earlier detection of stalled deals, richer prospect profiles before every meeting.",
        },
      ],
      visualAlt:
        "Comparison diagram: MCP-retrofitted CRMs add a server on top of a legacy UI; SymbiozAI is MCP-only by design.",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      h2: "What you lose every week.",
      cards: [
        {
          title: "2 hours a day not spent selling.",
          stat: "2h/day",
          body:
            "Two hours per rep per day filling fields that an agent can handle on its own, continuously, from the end of every call.",
          pilier:
            "Pillar Autonomous - the agent fills, enriches, and updates the pipeline without waiting for input.",
        },
        {
          title: "37% of opportunities slip without warning.",
          stat: "37%",
          body:
            "Stalled deals, cooling accounts, ignored weak signals. The CRM records. It does not watch. It does not learn.",
          pilier:
            "Pillar Self-learning - the system monitors continuously and sharpens its read each cycle.",
        },
        {
          title: "5 missed follow-ups per week.",
          stat: "5/week",
          body:
            "Not from neglect. Because nothing prioritises, nothing alerts, nothing fires automatically. A missed follow-up is a deal waiting for its competitor.",
          pilier:
            "Pillar MCP-first - your agent drives follow-ups from your editor, without opening a single interface.",
        },
      ],
    },
    autonome: {
      eyebrow: "PILLAR AUTONOMOUS",
      h2: "Your agent operates. You supervise.",
      intro:
        "SymbiozAI's agents run in the background - all the time, not on demand. They qualify incoming leads, enrich records across 23 data providers, detect deals with no recent activity, and reactivate dormant prospects when a timing signal appears.",
      bullets: [
        "Pipeline management: automatic qualification of incoming leads, multi-signal scoring, status updates.",
        "Continuous enrichment: 23 data providers orchestrated, no manual intervention.",
        "Automatic follow-ups: detection of deals with no recent activity, prioritised by Momentum Score.",
        "Weak signals: re-activation of dormant prospects as soon as a timing signal appears.",
      ],
      closing:
        "You check in for 5 minutes a day: the queue of actions that need your attention is waiting. Everything else has already moved.",
      visualAlt:
        "Live activity feed showing internal agents at work across a single day: pipeline, signals, follow-ups, enrichment, re-activation.",
    },
    mcpFirst: {
      eyebrow: "PILLAR MCP-FIRST",
      h2: "Not an MCP server added. A CRM built around one.",
      intro1:
        "Other CRMs added an MCP server on top of an existing interface. That is MCP-retrofitted - one more layer on an architecture designed for mouse clicks.",
      intro2: "SymbiozAI is headless by design: the MCP server is not a feature, it is the product.",
      intro3:
        "Your agent calls 35 missions in natural language from your toolchain. No training. No parallel interface. Installation in under 5 minutes via npx @symbiozai/mcp-setup.",
      bullets: [
        "35 missions in natural language - not 100+ CRUD endpoints.",
        "Installation in under 5 minutes via npx @symbiozai/mcp-setup.",
        "Works with Claude Code, Cursor, Cline, Goose, Continue.dev, ChatGPT.",
        "Your agent says \"target 50 ICP-fit leads, qualify the top 10, prep meeting briefs\" - SymbiozAI executes.",
      ],
      closing: "That is the difference between \"your CRM has AI\" and \"your AI has a CRM\".",
      visualAlt:
        "Convergence diagram: six AI agent clients on the left connect through a single MCP endpoint to 23 data providers behind it.",
    },
    aiNativeLearn: {
      eyebrow: "ARCHITECTURE AND LEARNING",
      h2: "Built for AI. Sharpens with every cycle.",
      sub1: {
        h3: "Not a chatbot bolted on. A CRM designed to be invoked.",
        paragraphs: [
          "The difference between AI-native and AI-assisted is not a marketing question - it is a design question.",
          "An AI-assisted CRM starts from a relational database built for humans, then adds AI after: a sidebar assistant, a \"draft with AI\" button. The architecture stays centred on the human interface.",
          "SymbiozAI starts from the opposite premise: the agent is the primary operator. The database, the missions, the data model - all designed to be read, written, and orchestrated by an LLM. The supervision console is the residual layer, not the central one.",
        ],
      },
      sub2: {
        h3: "Your CRM knows what it has already done for you.",
        paragraphs: [
          "Every interaction feeds the system - not as a log, but as a layer of knowledge. Every call remembered, every email analysed, every closed deal with its signals documented.",
          "Across cycles: sharper scoring, earlier detection of stalling deals, richer prospect profiles before every meeting. Not because a rule was programmed in - because it has operated alongside you.",
          "Your CRM never starts from scratch.",
        ],
      },
      visualAlt: "Self-learning timeline: Day 1, Day 30, Day 180 - the system sharpens its reads over time.",
    },
    infra: {
      eyebrow: "INFRASTRUCTURE",
      h2: "Infrastructure that does not cut corners.",
      metrics: [
        { value: "35", label: "verbal MCP missions", live: true },
        { value: "23", label: "integrated data providers" },
        { value: "< 5 min", label: "to connect your agent" },
        { value: "5 min/d", label: "daily supervision" },
      ],
      badges: [
        {
          title: "EU-hosted (Frankfurt)",
          body:
            "DigitalOcean FRA1 infrastructure. Your pipeline data never leaves European jurisdiction.",
        },
        {
          title: "AI Act article 14 native",
          body:
            "Immutable HMAC-signed audit log, 7-year retention. 3-class HITL policy (Green / Orange / Red). Tenant kill-switch in under 1 second.",
        },
        {
          title: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-provider. No fine-tuning on your data. No retention by LLM providers.",
        },
        {
          title: "GDPR article 15 native",
          body: "/audit/my-data endpoint. Export on demand. Zero vendor lock-in.",
        },
      ],
      quoteAuthor: "Laurent Bouzon, founder of SymbiozAI",
    },
    integrations: {
      h2: "Your agent drives. Your tools execute.",
      agentsLabel: "Works with your agent",
      toolsLabel: "Connected to your tools",
      microcopy:
        "SymbiozAI fits into the environment you already use. Nothing to migrate. Nothing to learn. One MCP connection.",
    },
    ctaFinal: {
      h2: "Connect your agent. Now.",
      lede: [
        "No training. No migration. No IT project.",
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
      claim: "Votre CRM attendait qu'on l'ouvre. Le nôtre s'exécute.",
      subclaim:
        "Les CRM ont été construits pour des humains qui saisissent. Puis l'industrie a collé un assistant IA sur le côté. Nous avons pris le problème à l'envers.",
    },
    pillarsHub: {
      eyebrow: "POURQUOI C'EST DIFFERENT",
      h2: "L'architecture qui change tout",
      intro: "Quatre choix d'architecture. Chacun est une rupture, pas une feature.",
      cards: [
        {
          h3: "Conçu pour être invoqué, pas ouvert.",
          body:
            "Pas un CRM classique avec un modèle greffé dessus. Une base de données, des missions, un modèle de données - tout conçu pour être lu et orchestré par un agent IA. L'interface humaine est la couche résiduelle.",
        },
        {
          h3: "Opère quand vous n'êtes pas là.",
          body:
            "Des agents IA internes gèrent pipeline, relances et signaux faibles - en continu, pas à la demande. Vous revenez 5 minutes par jour pour valider ce qui requiert votre attention.",
        },
        {
          h3: "Un seul endpoint. 35 missions verbales.",
          body:
            "Votre agent Claude Code, Cursor ou Cline appelle SymbiozAI directement depuis votre toolchain en langage naturel. Pas de plugin, pas d'interface à ouvrir, pas d'API patchwork à maintenir.",
        },
        {
          h3: "S'affine à chaque cycle.",
          body:
            "Chaque appel, chaque deal, chaque email analysé - intégré au système, pas juste archivé. Scoring plus précis, détection plus précoce des stagnations, profils prospects plus riches avant chaque réunion.",
        },
      ],
      visualAlt:
        "Schéma comparatif : les CRM MCP-retrofitted ajoutent un serveur au-dessus d'une UI existante, SymbiozAI est MCP-only par conception.",
    },
    problem: {
      eyebrow: "LE PROBLEME",
      h2: "Ce que vous perdez chaque semaine.",
      cards: [
        {
          title: "2h/jour qui ne servent pas à vendre.",
          stat: "2h/jour",
          body:
            "Deux heures par commercial par jour à renseigner des champs qu'un agent peut remplir seul, en continu, depuis la fin de chaque appel.",
          pilier:
            "Pilier Autonome - l'agent saisit, enrichit et met à jour le pipeline sans attendre d'instruction.",
        },
        {
          title: "37% des opportunités glissent sans alerte.",
          stat: "37%",
          body:
            "Deals qui stagnent, comptes qui refroidissent, signaux faibles ignorés. Le CRM enregistre. Il ne surveille pas. Il n'apprend pas.",
          pilier:
            "Pilier Auto-apprenant - le système surveille en continu et affine sa lecture à chaque cycle.",
        },
        {
          title: "5 relances oubliées par semaine.",
          stat: "5/sem",
          body:
            "Pas par négligence. Parce que rien ne priorise, rien n'alerte, rien ne déclenche automatiquement. Une relance oubliée, c'est un deal qui attend son concurrent.",
          pilier:
            "Pilier MCP-first - votre agent pilote les relances depuis votre éditeur, sans ouvrir une seule interface.",
        },
      ],
    },
    autonome: {
      eyebrow: "PILIER AUTONOME",
      h2: "Votre agent opère. Vous supervisez.",
      intro:
        "Les agents SymbiozAI tournent en fond - tout le temps, pas sur demande. Ils qualifient les leads entrants, enrichissent les fiches via 23 fournisseurs de données, détectent les deals sans activité récente, et réactivent les prospects dormants dès qu'un signal de timing apparaît.",
      bullets: [
        "Pipeline management : qualification automatique des leads entrants, scoring multi-signaux, mise à jour des statuts.",
        "Enrichissement continu : 23 fournisseurs de données orchestrés, sans intervention manuelle.",
        "Follow-ups automatiques : détection des deals sans activité récente, priorisés selon le Momentum Score.",
        "Signaux faibles : réactivation de prospects dormants dès qu'un signal de timing apparaît.",
      ],
      closing:
        "Vous revenez 5 minutes par jour : la file des actions qui requièrent votre attention vous attend. Tout le reste a déjà avancé.",
      visualAlt:
        "Flux d'activité temps réel : les agents internes au travail sur une journée - pipeline, signaux, relances, enrichissement, réactivation.",
    },
    mcpFirst: {
      eyebrow: "PILIER MCP-FIRST",
      h2: "Pas un serveur MCP ajouté. Un CRM construit autour.",
      intro1:
        "Les autres CRM ont ajouté un serveur MCP à une interface existante. C'est du MCP-retrofitted - une couche de plus sur une architecture conçue pour la souris.",
      intro2:
        "SymbiozAI est headless par conception : le serveur MCP n'est pas une feature, c'est le produit.",
      intro3:
        "Votre agent appelle 35 missions en langage naturel depuis votre toolchain. Pas de formation. Pas d'interface parallèle. Installation en moins de 5 minutes via npx @symbiozai/mcp-setup.",
      bullets: [
        "35 missions en langage naturel - pas 100+ endpoints CRUD.",
        "Installation en moins de 5 minutes via npx @symbiozai/mcp-setup.",
        "Compatible avec Claude Code, Cursor, Cline, Goose, Continue.dev, ChatGPT.",
        "Votre agent dit \"cible 50 leads ICP, qualifie les 10 meilleurs, prépare les briefs réunion\" - SymbiozAI exécute.",
      ],
      closing: "C'est la différence entre \"votre CRM a une IA\" et \"votre IA a un CRM\".",
      visualAlt:
        "Diagramme de convergence : six clients agents IA à gauche, connectés via un seul endpoint MCP à 23 fournisseurs de données derrière.",
    },
    aiNativeLearn: {
      eyebrow: "ARCHITECTURE ET APPRENTISSAGE",
      h2: "Conçu pour l'IA. S'affine à chaque cycle.",
      sub1: {
        h3: "Pas un chatbot greffé. Un CRM conçu pour être invoqué.",
        paragraphs: [
          "La différence entre AI-native et AI-assisted n'est pas marketing - c'est une décision d'architecture.",
          "Un CRM AI-assisted part d'une base relationnelle construite pour des humains et ajoute l'IA après : un assistant sur le côté, un bouton \"rédiger avec IA\". L'architecture reste centrée sur l'interface humaine.",
          "SymbiozAI part du principe inverse : l'agent est l'opérateur principal. La base de données, les missions, le modèle de données - tout conçu pour être lu, écrit et orchestré par un LLM. La console de supervision est la couche résiduelle, pas la couche centrale.",
        ],
      },
      sub2: {
        h3: "Votre CRM sait ce qu'il a déjà fait pour vous.",
        paragraphs: [
          "Chaque interaction alimente le système - pas comme un log, comme une strate de connaissance. Chaque appel mémorisé, chaque email analysé, chaque deal clos avec ses signaux documentés.",
          "Au fil des cycles : scoring plus précis, détection plus précoce des deals qui stagnent, profils prospects plus riches avant chaque réunion. Pas parce qu'une règle a été programmée - parce qu'il a opéré avec vous.",
          "Votre CRM ne repart jamais de zéro.",
        ],
      },
      visualAlt: "Chronologie auto-apprenante : Jour 1, Jour 30, Jour 180 - le système affine ses lectures dans le temps.",
    },
    infra: {
      eyebrow: "INFRASTRUCTURE",
      h2: "Infrastructure qui ne transige pas.",
      metrics: [
        { value: "35", label: "missions MCP verbales", live: true },
        { value: "23", label: "fournisseurs de données" },
        { value: "< 5 min", label: "pour connecter votre agent" },
        { value: "5 min/j", label: "supervision quotidienne" },
      ],
      badges: [
        {
          title: "Hébergé en EU (Francfort)",
          body:
            "Infrastructure DigitalOcean FRA1. Vos données pipeline ne quittent pas la juridiction européenne.",
        },
        {
          title: "Conforme AI Act article 14",
          body:
            "Audit log immuable signé HMAC, rétention 7 ans. Politique HITL 3 classes (Vert / Orange / Rouge). Kill-switch tenant en moins d'1 seconde.",
        },
        {
          title: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-provider. Aucun fine-tuning sur vos données. Aucune rétention par les providers LLM.",
        },
        {
          title: "RGPD article 15 natif",
          body: "Endpoint /audit/my-data. Export à la demande. Zéro vendor lock-in.",
        },
      ],
      quoteAuthor: "Laurent Bouzon, fondateur de SymbiozAI",
    },
    integrations: {
      h2: "Votre agent pilote. Vos outils exécutent.",
      agentsLabel: "Compatible avec votre agent",
      toolsLabel: "Connecté à vos outils",
      microcopy:
        "SymbiozAI s'insère dans l'environnement que vous utilisez déjà. Rien à migrer. Rien à apprendre. Une connexion MCP.",
    },
    ctaFinal: {
      h2: "Connectez votre agent. Maintenant.",
      lede: [
        "Pas de formation. Pas de migration. Pas de projet IT.",
        "Votre Claude Code ou Cursor est opérationnel sur SymbiozAI en moins de 5 minutes.",
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
