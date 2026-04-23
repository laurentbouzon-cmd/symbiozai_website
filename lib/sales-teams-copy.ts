/**
 * /for-sales-teams page copy — post-pivot MCP-only (2026-04-23).
 * Source: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 * R11-compliant.
 */

import type { FAQItem } from "./site-types"

export const salesTeamsCopy = {
  en: {
    meta: {
      title: "Your sales team's AI workforce | SymbiozAI",
      description:
        "SymbiozAI gives your sales team an AI agent that targets, qualifies, and follows up — while they focus on closing. Built on MCP. You approve what matters.",
    },
    hero: {
      eyebrow: "For sales teams",
      headline: "Your sales team's AI workforce.",
      subhead:
        "Your AI agent runs the sales motion. You approve what matters. Built on MCP. AI-native by design.",
      primary: { label: "Book a demo", href: "/en/contact" },
      secondary: { label: "Watch the 3-minute demo", href: "#demo" },
      tertiary: { label: "Try the live sandbox", href: "/en/mcp#quickstart" },
    },
    demo: {
      eyebrow: "The 3-minute demo",
      title: "See the motion run while nobody opens a browser tab.",
      lede:
        "See your AI agent target 50 prospects by ICP, score the top 20, draft 10 personalized emails, and surface the 3 deals at risk in your pipeline — without anyone opening a browser tab. Then see the supervision console: 5 minutes. One queue. Your approvals.",
      placeholder:
        "Video walkthrough coming soon. Book a live demo to see it on your ICP.",
    },
    pains: {
      eyebrow: "The pains we solve",
      items: [
        {
          heading: "Your reps don't fill the CRM. And it's not their fault.",
          body:
            "They were hired to sell, not to log calls. Every minute spent updating a pipeline stage or writing a contact note is a minute not selling. SymbiozAI doesn't fix CRM adoption. It makes the question irrelevant.",
        },
        {
          heading: "You have 5 tools where you should have one.",
          body:
            "Apollo for prospecting. Clay for enrichment. Outreach for sequences. HubSpot for pipeline. Gong for call intelligence. Five contracts. Five integrations. Five onboardings. SymbiozAI wraps 23 data providers and the full sales cycle into one MCP endpoint.",
        },
        {
          heading: "Your pipeline forecast is always wrong.",
          body:
            "Because it relies on what reps remembered to update, not on what actually happened. Every deal scored in real time. Every signal surfaced. No end-of-quarter surprises.",
        },
        {
          heading: "Ramp time is killing your velocity.",
          body:
            "A new AE takes 3-6 months to reach full productivity. With SymbiozAI, they inherit the agent's institutional knowledge from day one — DISC profiles, deal history, buying signals, all surfaced automatically.",
        },
      ],
    },
    day: {
      eyebrow: "How your team works post-install",
      title: "A typical day.",
      timeline: [
        {
          time: "7:55 AM",
          body:
            "The agent has processed overnight events: email replies, LinkedIn activity, funding announcements, job changes. Your pipeline is up to date.",
        },
        {
          time: "8:00 AM",
          body:
            "You open the supervision console. 4 items in your queue. Two email drafts above your approval threshold. One deal stage change. One new contact to validate.",
        },
        {
          time: "8:05 AM",
          body:
            "Done. The agent sends what you approved. Holds the rest until tomorrow's queue.",
        },
        {
          time: "During the day",
          body:
            "You sell. You take calls. You negotiate. The agent logs what happened, enriches new contacts, and preps your next meeting brief automatically.",
        },
        {
          time: "5:00 PM",
          body: "Your pipeline reflects the day. No rep had to touch it.",
        },
      ],
    },
    pillars: {
      eyebrow: "3 pillars",
      title: "Built for the people who close.",
      items: [
        {
          heading: "Your agent runs the motion. You run the deals.",
          body:
            "Acquisition, qualification, enrichment, email drafting, meeting prep — all handled by your AI agent. You focus on the calls and the closes that require human judgment.",
        },
        {
          heading: "Full pipeline. Zero blind spots.",
          body:
            "35 missions cover the full sales cycle — from targeting an ICP list to scoring a deal's health. Nothing falls through the cracks.",
        },
        {
          heading: "Supervised. Audited. AI Act-ready.",
          body:
            "Every action logged. Every sensitive decision in your queue. A kill-switch that stops everything in under a second. Your legal team will like what they find.",
        },
      ],
    },
    whatStays: {
      eyebrow: "What your team keeps doing",
      title: "SymbiozAI does not replace your sales team. It removes the parts they hate.",
      humanLabel: "What stays human",
      agentLabel: "What the agent handles",
      human: [
        "The strategic call where you build trust",
        "The negotiation where you read the room",
        "The closing decision that requires judgment",
        "The ICP definition that guides the agent",
      ],
      agent: [
        "Prospecting and enrichment",
        "Qualification scoring",
        "Follow-up sequences",
        "Pipeline updates",
        "Meeting briefs",
      ],
      outcome:
        "Your AEs spend more time with buyers. Your SDRs focus on human-led outreach. Your Head of Sales sees a pipeline they can trust.",
    },
    compliance: {
      eyebrow: "Compliance",
      title: "Built in the EU. Your data stays where it belongs.",
      items: [
        "Frankfurt datacenter (DigitalOcean FRA1)",
        "AI Act article 14 compliant — human oversight by design",
        "GDPR article 15 endpoint — export your data on demand",
        "Immutable audit log — 7-year retention",
        "Kill-switch — stop everything in under 1 second",
      ],
    },
    ctaFinal: {
      title: "Ready to run a leaner, faster sales motion?",
      lede: "Walk through a live agent-operated pipeline on your data.",
      primary: { label: "Book a demo", href: "/en/contact" },
      linkedinLabel: "Reach Laurent directly on LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
    faq: [
      {
        question: "Does my team need to learn to prompt an AI agent?",
        answer:
          "No. Your ICP lead, Head of Sales, or RevOps talks to the agent in natural language. Reps only interact with buyers. They do not touch the CRM.",
      },
      {
        question: "What happens if the agent makes a mistake?",
        answer:
          "Every sensitive action is Orange (dry-run with confirmation) or Red (explicit approval). Mistakes get caught in the supervision console before they ship. Kill-switch halts the agent in under 1 second.",
      },
      {
        question: "Do we need developer onboarding?",
        answer:
          "No. The operator tier is any person running their sales motion through Claude Code, Cursor, or a comparable agent. The MCP install is a single CLI command.",
      },
    ] as FAQItem[],
  },
  fr: {
    meta: {
      title: "La workforce IA de votre équipe commerciale | SymbiozAI",
      description:
        "SymbiozAI donne à votre équipe commerciale un agent IA qui cible, qualifie et relance — pendant qu'ils se concentrent sur le closing. Basé sur MCP. Vous approuvez ce qui compte.",
    },
    hero: {
      eyebrow: "Pour les équipes commerciales",
      headline: "La workforce IA de votre équipe commerciale.",
      subhead:
        "Votre agent IA pilote le motion commerciale. Vous approuvez ce qui compte. Basé sur MCP. IA-native par design.",
      primary: { label: "Réserver une démo", href: "/fr/contact" },
      secondary: { label: "Voir la démo de 3 minutes", href: "#demo" },
      tertiary: { label: "Tester la sandbox", href: "/fr/mcp#quickstart" },
    },
    demo: {
      eyebrow: "La démo de 3 minutes",
      title: "Le motion tourne sans que personne n'ouvre un onglet.",
      lede:
        "Voyez votre agent IA cibler 50 prospects par ICP, scorer le top 20, rédiger 10 emails personnalisés et remonter les 3 deals à risque dans votre pipeline — sans que personne n'ouvre un navigateur. Puis voyez la console de supervision : 5 minutes. Une file. Vos approbations.",
      placeholder:
        "Vidéo à venir. Réservez une démo live pour la voir sur votre ICP.",
    },
    pains: {
      eyebrow: "Les douleurs qu'on résout",
      items: [
        {
          heading: "Vos commerciaux ne remplissent pas le CRM. Et ce n'est pas leur faute.",
          body:
            "On les a recrutés pour vendre, pas pour saisir des appels. Chaque minute à mettre à jour une étape ou écrire une note est une minute non vendue. SymbiozAI ne corrige pas l'adoption CRM. Il rend la question non pertinente.",
        },
        {
          heading: "Vous avez 5 outils là où il en faudrait 1.",
          body:
            "Apollo pour la prospection. Clay pour l'enrichissement. Outreach pour les séquences. HubSpot pour le pipeline. Gong pour l'intelligence d'appels. Cinq contrats. Cinq intégrations. Cinq onboardings. SymbiozAI wrappe 23 fournisseurs de données et le cycle Sales complet dans un seul endpoint MCP.",
        },
        {
          heading: "Vos prévisions de pipeline sont toujours fausses.",
          body:
            "Parce qu'elles reposent sur ce que les reps ont pensé à saisir, pas sur ce qui s'est vraiment passé. Chaque deal scoré en temps réel. Chaque signal remonté. Plus de surprises en fin de trimestre.",
        },
        {
          heading: "Le ramp tue votre vélocité.",
          body:
            "Un nouvel AE met 3-6 mois à atteindre sa pleine productivité. Avec SymbiozAI, il hérite de la connaissance institutionnelle de l'agent dès le départ — profils DISC, historique deals, signaux d'achat, tout remonté automatiquement.",
        },
      ],
    },
    day: {
      eyebrow: "Comment votre équipe travaille post-install",
      title: "Une journée type.",
      timeline: [
        {
          time: "7h55",
          body:
            "L'agent a traité les événements de nuit : réponses email, activité LinkedIn, levées, changements de poste. Votre pipeline est à jour.",
        },
        {
          time: "8h00",
          body:
            "Vous ouvrez la console de supervision. 4 items en attente. Deux brouillons d'email au-dessus de votre seuil d'approbation. Un changement d'étape de deal. Un nouveau contact à valider.",
        },
        {
          time: "8h05",
          body:
            "Terminé. L'agent envoie ce que vous avez approuvé. Garde le reste pour la file du lendemain.",
        },
        {
          time: "Dans la journée",
          body:
            "Vous vendez. Vous prenez des appels. Vous négociez. L'agent journalise, enrichit les nouveaux contacts et prépare automatiquement votre prochain brief de réunion.",
        },
        {
          time: "17h00",
          body: "Votre pipeline reflète la journée. Aucun rep n'a eu à le toucher.",
        },
      ],
    },
    pillars: {
      eyebrow: "3 piliers",
      title: "Pensé pour ceux qui closent.",
      items: [
        {
          heading: "Votre agent pilote le motion. Vous pilotez les deals.",
          body:
            "Acquisition, qualification, enrichissement, rédaction email, préparation de réunions — tout géré par votre agent IA. Vous vous concentrez sur les calls et les closes qui demandent un jugement humain.",
        },
        {
          heading: "Pipeline complet. Aucun angle mort.",
          body:
            "35 missions couvrent le cycle Sales complet — du targeting d'une liste ICP au scoring de santé d'un deal. Rien ne passe à travers les mailles.",
        },
        {
          heading: "Supervisé. Audité. Prêt pour l'AI Act.",
          body:
            "Chaque action journalisée. Chaque décision sensible dans votre file. Un kill-switch qui arrête tout en moins d'une seconde. Votre équipe juridique va aimer.",
        },
      ],
    },
    whatStays: {
      eyebrow: "Ce que votre équipe continue de faire",
      title: "SymbiozAI ne remplace pas votre équipe commerciale. Il retire les parties qu'ils détestent.",
      humanLabel: "Ce qui reste humain",
      agentLabel: "Ce que gère l'agent",
      human: [
        "Le call stratégique où vous construisez la confiance",
        "La négociation où vous lisez la pièce",
        "La décision de closing qui demande du jugement",
        "La définition d'ICP qui guide l'agent",
      ],
      agent: [
        "Prospection et enrichissement",
        "Scoring de qualification",
        "Séquences de relance",
        "Mises à jour pipeline",
        "Briefs de réunion",
      ],
      outcome:
        "Vos AE passent plus de temps avec les buyers. Vos SDR se concentrent sur l'outreach human-led. Votre Head of Sales voit un pipeline en qui il peut avoir confiance.",
    },
    compliance: {
      eyebrow: "Conformité",
      title: "Construit en EU. Vos données restent où elles doivent.",
      items: [
        "Datacenter Frankfurt (DigitalOcean FRA1)",
        "Conforme AI Act article 14 — supervision humaine by design",
        "Endpoint RGPD article 15 — exportez vos données à la demande",
        "Audit log immuable — rétention 7 ans",
        "Kill-switch — stoppez tout en moins d'une seconde",
      ],
    },
    ctaFinal: {
      title: "Prêt à faire tourner un motion commerciale plus lean, plus rapide ?",
      lede: "Parcourez un pipeline agent-operated sur vos données, en live.",
      primary: { label: "Réserver une démo", href: "/fr/contact" },
      linkedinLabel: "Contactez Laurent directement sur LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
    faq: [
      {
        question: "Mon équipe doit-elle apprendre à prompter un agent IA ?",
        answer:
          "Non. Votre ICP lead, Head of Sales ou RevOps parle à l'agent en langage naturel. Les reps n'interagissent qu'avec les acheteurs. Ils ne touchent pas au CRM.",
      },
      {
        question: "Que se passe-t-il si l'agent fait une erreur ?",
        answer:
          "Chaque action sensible est Orange (dry-run avec confirmation) ou Rouge (approbation explicite). Les erreurs sont interceptées dans la console de supervision avant expédition. Kill-switch arrête l'agent en moins d'1 seconde.",
      },
      {
        question: "Faut-il un onboarding développeur ?",
        answer:
          "Non. Le niveau opérateur est n'importe quelle personne qui fait tourner son motion commerciale via Claude Code, Cursor ou un agent comparable. L'install MCP est une seule commande CLI.",
      },
    ] as FAQItem[],
  },
}
