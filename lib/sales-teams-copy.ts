/**
 * /for-sales-teams page copy: post-pivot MCP-only v2 YC-grade (2026-04-23).
 *
 * Source: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 * section "Page /for-sales-teams YC-grade -- v2 bloc par bloc 2026-04-23".
 *
 * Registre ICP Head of Sales / CRO boardroom-ready (Clari / Gong / Linear / Stripe).
 * Hero S1 VERROUILLE (directive Laurent). Sections S2-S10 livrees par content-creator.
 *
 * Signature copy:
 *  - S4 "Vous n'avez pas ouvert HubSpot."
 *  - S8 "Construit en Europe. Vos donnees ne bougent pas." (+ "Five facts" Stripe)
 *  - S10 "Votre pipeline est soit exact, soit inutile. Le choix est fait."
 *  - S3 card 3 proof point Clari 2025 : 67 % no pipeline confidence.
 *
 * R11-compliant.
 */

import type { FAQItem } from "./site-types"

export const salesTeamsCopy = {
  en: {
    meta: {
      title: "Your team sells. The agents do everything else. | SymbiozAI",
      description:
        "SymbiozAI gives your sales team an AI agent that targets, qualifies, and follows up, while they focus on closing. Built on MCP. You approve what matters.",
    },
    hero: {
      eyebrow: "For sales teams",
      headline: "Your team sells. The agents do everything else.",
      subhead:
        "Your AI agents handle targeting, enrichment, qualification, and follow-up while you sleep. Every morning, a 5-minute queue of what needs your call. Nothing ships without your approval.",
      primary: { label: "Book a meeting", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
      secondary: { label: "See the supervision console", href: "#demo" },
      tertiary: { label: "Read the MCP docs", href: "/en/mcp" },
    },
    demo: {
      eyebrow: "Supervision console",
      title: "What your pipeline looks like when the agent runs it.",
      lede:
        "Every morning, a queue of 4 to 6 decisions. Not a dashboard to scroll. Not a report to interpret. Two email drafts above your approval threshold. One deal stage change. One contact to validate. You approve, edit, block. Everything else ships without you touching it.",
      caption:
        "SymbiozAI supervision console. Book a meeting to walk through it on your own pipeline.",
    },
    pains: {
      eyebrow: "Why your pipeline lies",
      title: "Four reasons your pipeline lies to you.",
      items: [
        {
          heading: "Your reps do not fill the CRM. That is not their fault.",
          body:
            "They were hired to sell, not to log calls. Every minute updating a stage or writing a contact note is a minute not selling. SymbiozAI does not fix CRM adoption. It makes the question irrelevant: the CRM fills itself.",
        },
        {
          heading: "You have 5 tools where you need one.",
          body:
            "Apollo for prospecting. Clay for enrichment. Outreach for sequences. HubSpot for pipeline. Gong for call intelligence. Five contracts. Five onboardings. Five points of friction. SymbiozAI connects 23 data providers and covers the full sales cycle in one agent.",
        },
        {
          heading: "Your end-of-quarter forecast is always wrong.",
          body:
            "Because it relies on what reps remembered to update, not on what actually happened. 67% of companies do not trust their own pipeline data (Clari, 2025). SymbiozAI scores every deal in real time. No surprises at the QBR.",
        },
        {
          heading: "Your new AEs take 4 months to ramp. That is too long.",
          body:
            "A new AE inherits an empty CRM and a methodology PDF. With SymbiozAI, they have DISC profiles, deal history, and buying signals from day one, surfaced automatically by the agent.",
        },
      ],
    },
    day: {
      eyebrow: "A typical day",
      title: "How your team works after install.",
      timeline: [
        {
          time: "7:55 AM",
          body:
            "The agent processed overnight events: email replies, LinkedIn activity, funding rounds, job changes. Your pipeline is up to date. Your reps do not know they have a warm signal yet.",
        },
        {
          time: "8:00 AM",
          body:
            "You open the console. 5 items in the queue. Two email drafts ready to send. One deal that changed stage without anyone touching the CRM. Two contacts to validate.",
        },
        {
          time: "8:06 AM",
          body:
            "Done. The agent ships what you approved. Holds the rest for tomorrow's queue. You did not open HubSpot.",
        },
        {
          time: "During the day",
          body:
            "You sell. You take calls. You negotiate. The agent logs what happened, enriches new contacts, and preps your next meeting brief: DISC, history, recent signals.",
        },
        {
          time: "5:00 PM",
          body: "Your pipeline reflects the day. No rep touched the CRM. The CRM is exact.",
        },
      ],
    },
    pillars: {
      eyebrow: "3 pillars",
      title: "Built for the teams that close.",
      items: [
        {
          heading: "Your agent runs the motion. You run the deals.",
          body:
            "Targeting, qualification, enrichment, email sequences, meeting prep. The agent handles everything before the call. Your reps will arrive better prepared than the competition at every conversation.",
        },
        {
          heading: "35 missions. No blind spots.",
          body:
            "From targeting an ICP list to scoring a deal's health at end of quarter. 35 missions cover the full sales cycle. Nothing falls through the cracks, even when nobody is watching.",
        },
        {
          heading: "Supervised. Audited. AI Act-ready.",
          body:
            "Every action logged. Every sensitive decision in your approval queue. A kill-switch that stops everything in under one second. Your legal team will find exactly what they are looking for.",
        },
      ],
    },
    whatStays: {
      eyebrow: "Human vs agent",
      title: "Your reps keep the calls and the closes. The agent takes everything else.",
      humanLabel: "What stays human",
      agentLabel: "What the agent handles",
      human: [
        "The call where you build trust",
        "The negotiation where you read the room",
        "The closing decision that requires judgment",
        "The ICP definition that guides the agent",
      ],
      agent: [
        "Prospecting and enrichment (23 sources)",
        "ICP qualification scoring",
        "Follow-up sequences and tracking",
        "Automatic pipeline updates",
        "Meeting briefs (DISC + deal history)",
      ],
      outcome:
        "Your AEs spend more time with qualified buyers. Your SDRs focus on high-value outreach. Your Head of Sales finally sees a pipeline they can trust.",
    },
    compliance: {
      eyebrow: "Compliance",
      title: "Built in the EU. Your data does not move.",
      description: "Five facts. Verifiable. Not marketing.",
      items: [
        {
          label: "Fact 1",
          body: "Frankfurt datacenter, DigitalOcean FRA1. Your data stays in Europe.",
        },
        {
          label: "Fact 2",
          body: "AI Act article 14-compliant. Human oversight built into the architecture, not bolted on.",
        },
        {
          label: "Fact 3",
          body: "GDPR article 15 endpoint. Export all your data on demand.",
        },
        {
          label: "Fact 4",
          body: "Immutable audit log. 7-year retention. Nothing edits. Nothing deletes.",
        },
        {
          label: "Fact 5",
          body: "Kill-switch. Stops every agent in under one second.",
        },
      ],
    },
    agents: {
      eyebrow: "Agent compatibility",
      title: "Built on MCP. Works with the agent your team already uses.",
      alt: "Claude Code, Cursor, and other MCP-compatible AI agents supported by SymbiozAI",
      caption:
        "SymbiozAI exposes 35 sales missions through an MCP server. Your AI agent connects with one CLI command. No SDK. No lock-in.",
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Before you book a meeting.",
    },
    ctaFinal: {
      title: "Your pipeline is either accurate or useless. Make your choice.",
      lede: "Walk through a live agent-operated pipeline on your own data.",
      primary: { label: "Book a meeting", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
      linkedinLabel: "Reach Laurent directly on LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
    faq: [
      {
        question: "How long until my team is up and running?",
        answer:
          "Operator onboarding takes under one hour. You configure your ICP, connect your agent (one CLI command), and the first mission runs the same day. Your reps have nothing to learn and nothing to install.",
      },
      {
        question: "How do I measure ROI in the first 30 days?",
        answer:
          "Three metrics to track: CRM entry time per rep (target: near zero), real-time pipeline accuracy (target: 100%), number of follow-ups executed without human intervention. Most teams see the first two in week one.",
      },
      {
        question: "What happens if the agent makes a mistake?",
        answer:
          "Every sensitive action is Orange (dry-run with confirmation) or Red (explicit approval required). Mistakes get caught in the supervision console before they ship. The kill-switch stops everything in under one second.",
      },
    ] as FAQItem[],
  },
  fr: {
    meta: {
      title: "Votre équipe vend. Les agents font tout le reste. | SymbiozAI",
      description:
        "SymbiozAI donne à votre équipe commerciale un agent IA qui cible, qualifie et relance, pendant qu'ils se concentrent sur le closing. Basé sur MCP. Vous approuvez ce qui compte.",
    },
    hero: {
      eyebrow: "Pour les équipes commerciales",
      headline: "Votre équipe vend. Les agents font tout le reste.",
      subhead:
        "Vos agents IA gèrent le ciblage, l'enrichissement, la qualification et les relances pendant que vous dormez. Chaque matin, 5 minutes de décisions qui demandent votre jugement. Rien ne part sans votre validation.",
      primary: { label: "Prendre rendez-vous", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
      secondary: { label: "Voir la console de supervision", href: "#demo" },
      tertiary: { label: "Lire la documentation MCP", href: "/fr/mcp" },
    },
    demo: {
      eyebrow: "Console de supervision",
      title: "Ce que votre pipeline ressemble quand c'est l'agent qui le tient.",
      lede:
        "Chaque matin, une file de 4 à 6 décisions. Pas un dashboard à parcourir. Pas un rapport à interpréter. Deux emails au-dessus du seuil d'approbation. Un changement d'étape. Un contact à valider. Vous approuvez, vous éditez, vous bloquez. Le reste part sans que vous y touchiez.",
      caption:
        "Console de supervision SymbiozAI. Prenez rendez-vous pour la parcourir sur votre pipeline.",
    },
    pains: {
      eyebrow: "Pourquoi votre pipeline vous ment",
      title: "Quatre raisons pour lesquelles votre pipeline vous ment.",
      items: [
        {
          heading: "Vos reps ne remplissent pas le CRM. Ce n'est pas leur faute.",
          body:
            "On les a recrutés pour vendre, pas pour journaliser des appels. Chaque minute sur une fiche contact est une minute hors cycle. SymbiozAI ne résout pas l'adoption CRM. Il rend la question non pertinente : le CRM se remplit seul.",
        },
        {
          heading: "Vous avez 5 outils là où il en faudrait un.",
          body:
            "Apollo pour la prospection. Clay pour l'enrichissement. Outreach pour les séquences. HubSpot pour le pipeline. Gong pour les appels. Cinq contrats. Cinq onboardings. Cinq points de friction. SymbiozAI connecte 23 sources de données et couvre le cycle Sales complet dans un seul agent.",
        },
        {
          heading: "Vos prévisions de fin de trimestre sont systématiquement fausses.",
          body:
            "Parce qu'elles reposent sur ce que les reps ont pensé à saisir, pas sur ce qui s'est passé. 67 % des entreprises n'ont pas confiance dans leurs données de pipeline (Clari, 2025). SymbiozAI score chaque deal en temps réel. Plus de surprise au QBR.",
        },
        {
          heading: "Vos nouveaux AE mettent 4 mois à être productifs. C'est trop long.",
          body:
            "Un nouvel AE hérite d'un CRM vide et d'une méthodologie dans un PDF. Avec SymbiozAI, il dispose dès le jour 1 des profils DISC des prospects, de l'historique des deals et des signaux d'achat, remontés automatiquement par l'agent.",
        },
      ],
    },
    day: {
      eyebrow: "Une journée type",
      title: "Comment votre équipe travaille après l'install.",
      timeline: [
        {
          time: "7h55",
          body:
            "L'agent a traité les événements de nuit : réponses email, activité LinkedIn, levées de fonds, changements de poste. Votre pipeline est à jour. Vos reps ne savent pas encore qu'ils ont un nouveau signal chaud.",
        },
        {
          time: "8h00",
          body:
            "Vous ouvrez la console. 5 items dans la file. Deux brouillons d'email prêts à partir. Un deal qui vient de changer d'étape sans que personne n'ait touché au CRM. Deux contacts enrichis à valider.",
        },
        {
          time: "8h06",
          body:
            "Done. L'agent envoie ce que vous avez approuvé. Bloque le reste pour la file de demain. Vous n'avez pas ouvert HubSpot.",
        },
        {
          time: "Dans la journée",
          body:
            "Vous vendez. Vous prenez des appels. Vous négociez. L'agent journalise, enrichit les nouveaux contacts et prépare votre prochain brief de réunion : DISC, historique, signaux récents.",
        },
        {
          time: "17h00",
          body: "Votre pipeline reflète la journée. Vos reps n'ont pas touché au CRM. Le CRM est pourtant exact.",
        },
      ],
    },
    pillars: {
      eyebrow: "3 piliers",
      title: "Pour les équipes qui closent.",
      items: [
        {
          heading: "Votre agent pilote le motion. Vous pilotez les deals.",
          body:
            "Ciblage, qualification, enrichissement, séquences email, prep de réunions. L'agent gère tout ce qui précède l'appel. Vos reps arriveront mieux préparés que la concurrence à chaque conversation.",
        },
        {
          heading: "35 missions. Zéro angle mort.",
          body:
            "Du targeting d'une liste ICP au scoring de santé d'un deal en fin de trimestre. 35 missions couvrent le cycle Sales complet. Rien ne passe entre les mailles, même quand personne n'y pense.",
        },
        {
          heading: "Supervisé. Audité. Conforme AI Act.",
          body:
            "Chaque action journalisée. Chaque décision sensible dans votre file d'approbation. Un kill-switch qui stoppe tout en moins d'une seconde. Votre équipe juridique va trouver ce qu'elle cherche.",
        },
      ],
    },
    whatStays: {
      eyebrow: "Humain vs agent",
      title: "Vos reps gardent les appels et les closes. L'agent prend tout le reste.",
      humanLabel: "Ce qui reste humain",
      agentLabel: "Ce que gère l'agent",
      human: [
        "L'appel où vous construisez la confiance",
        "La négociation où vous lisez la pièce",
        "La décision de closing qui demande du jugement",
        "La définition d'ICP qui oriente l'agent",
      ],
      agent: [
        "Prospection et enrichissement (23 sources)",
        "Scoring de qualification ICP",
        "Séquences de relance et suivi",
        "Mises à jour pipeline automatiques",
        "Briefs de réunion (DISC + historique)",
      ],
      outcome:
        "Vos AE passent plus de temps avec des buyers qualifiés. Vos SDR se concentrent sur l'outreach à haute valeur. Votre Head of Sales voit enfin un pipeline en qui avoir confiance.",
    },
    compliance: {
      eyebrow: "Conformité",
      title: "Construit en Europe. Vos données ne bougent pas.",
      description: "Cinq faits. Vérifiables. Pas de marketing.",
      items: [
        {
          label: "Fait 1",
          body: "Datacenter Frankfurt, DigitalOcean FRA1. Vos données restent en Europe.",
        },
        {
          label: "Fait 2",
          body: "Conforme AI Act article 14. Supervision humaine intégrée dans l'architecture, pas ajoutée après coup.",
        },
        {
          label: "Fait 3",
          body: "Endpoint RGPD article 15. Exportez l'intégralité de vos données à la demande.",
        },
        {
          label: "Fait 4",
          body: "Audit log immuable. Rétention 7 ans. Rien ne s'édite. Rien ne se supprime.",
        },
        {
          label: "Fait 5",
          body: "Kill-switch. Stoppe tous les agents en moins d'une seconde.",
        },
      ],
    },
    agents: {
      eyebrow: "Compatibilité agents",
      title: "Basé sur MCP. Compatible avec l'agent que votre équipe utilise déjà.",
      alt: "Claude Code, Cursor et autres agents IA compatibles MCP supportés par SymbiozAI",
      caption:
        "SymbiozAI expose 35 missions commerciales via un serveur MCP. Votre agent IA se connecte avec une seule commande CLI. Aucun SDK. Aucun lock-in.",
    },
    faqSection: {
      eyebrow: "FAQ",
      title: "Avant de prendre rendez-vous.",
    },
    ctaFinal: {
      title: "Votre pipeline est soit exact, soit inutile. Le choix est fait.",
      lede: "Parcourez un pipeline agent-operated sur vos propres données, en live.",
      primary: { label: "Prendre rendez-vous", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
      linkedinLabel: "Contactez Laurent directement sur LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
    faq: [
      {
        question: "Combien de temps pour que mon équipe soit opérationnelle ?",
        answer:
          "L'onboarding opérateur prend moins d'une heure. Vous configurez votre ICP, connectez votre agent (une commande CLI), et la première mission tourne dans la journée. Vos reps n'ont rien à apprendre ni à installer.",
      },
      {
        question: "Comment mesurer le ROI dans les 30 premiers jours ?",
        answer:
          "Trois métriques à suivre : temps de saisie CRM par rep (cible : proche de zéro), taux de deals à jour en temps réel (cible : 100 %), nombre de relances exécutées sans intervention humaine. La plupart des équipes voient les deux premiers en semaine 1.",
      },
      {
        question: "Que se passe-t-il si l'agent fait une erreur ?",
        answer:
          "Chaque action sensible est Orange (dry-run avec confirmation) ou Rouge (approbation explicite requise). Les erreurs sont interceptées dans la console de supervision avant d'être envoyées. Le kill-switch stoppe tout en moins d'une seconde.",
      },
    ] as FAQItem[],
  },
}
