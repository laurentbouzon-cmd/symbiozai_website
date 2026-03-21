import { type Locale } from "./dictionary"

export interface PlaygroundMessage {
  type: "user" | "ai" | "buttons"
  text?: string
  richContent?: "table" | "deals"
  richData?: unknown
  buttons?: ScenarioButton[]
  delay?: number
  autoAdvance?: boolean
}

export interface ScenarioButton {
  id: string
  emoji: string
  label: string
}

export interface Scenario {
  id: string
  messages: PlaygroundMessage[]
}

export interface ProspectRow {
  company: string
  city: string
  size: string
  sector: string
}

export interface DealCard {
  emoji: string
  name: string
  amount: string
  reason: string
  score: number
}

export function getScenarios(locale: string): Scenario[] {
  return scenarios[locale as Locale] ?? scenarios.en
}

const scenarios: Record<Locale, Scenario[]> = {
  fr: [
    {
      id: "prospection",
      messages: [
        {
          type: "user",
          text: "Trouve-moi des ESN en \u00CEle-de-France",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "Je cherche dans nos sources...",
          delay: 1500,
        },
        {
          type: "ai",
          richContent: "table",
          richData: [
            { company: "N\u00e9osoft", city: "Paris", size: "500+", sector: "Conseil IT" },
            { company: "Linkvalue", city: "Nantes", size: "200-500", sector: "Dev & Cloud" },
            { company: "Apside", city: "Boulogne", size: "1000+", sector: "Ing\u00e9nierie IT" },
            { company: "Ippon Tech", city: "Paris", size: "200-500", sector: "Data & Cloud" },
            { company: "Zenika", city: "Paris", size: "200-500", sector: "Conseil & Devops" },
          ] as ProspectRow[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "J'en ai trouv\u00e9 23 au total. Tu veux que je les ajoute \u00e0 une s\u00e9quence d'outreach ?",
          delay: 500,
        },
      ],
    },
    {
      id: "recovery",
      messages: [
        {
          type: "user",
          text: "Montre-moi les deals perdus r\u00e9cup\u00e9rables",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "Analyse en cours...",
          delay: 1500,
        },
        {
          type: "ai",
          richContent: "deals",
          richData: [
            { emoji: "\ud83d\udfe1", name: "TechCorp", amount: "45K\u20ac", reason: "Contrat concurrent expire dans 2 mois", score: 78 },
            { emoji: "\ud83d\udfe0", name: "DataVision", amount: "28K\u20ac", reason: "Nouveau CTO arriv\u00e9", score: 65 },
            { emoji: "\ud83d\udd35", name: "CloudFactory", amount: "18K\u20ac", reason: "Budget d\u00e9bloqu\u00e9 Q2", score: 72 },
          ] as DealCard[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "TechCorp a la meilleure fen\u00eatre. Leur contrat Salesforce expire en mai. Tu veux que je pr\u00e9pare une relance ?",
          delay: 500,
        },
      ],
    },
    {
      id: "crm",
      messages: [
        {
          type: "user",
          text: "Ajoute une note sur le prospect Pennylane",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "Sur quel sujet ?",
          delay: 1500,
        },
        {
          type: "user",
          text: "Call de 30min \u2014 int\u00e9ress\u00e9s par le plan Pro, d\u00e9cision en avril",
          autoAdvance: true,
          delay: 1500,
        },
        {
          type: "ai",
          text: "Note ajout\u00e9e sur Pennylane. J'ai aussi d\u00e9tect\u00e9 une date cl\u00e9 : je te rappellerai d\u00e9but avril pour le follow-up.",
          delay: 1000,
        },
      ],
    },
  ],
  en: [
    {
      id: "prospection",
      messages: [
        {
          type: "user",
          text: "Find me IT consulting firms in Paris area",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "Searching our sources...",
          delay: 1500,
        },
        {
          type: "ai",
          richContent: "table",
          richData: [
            { company: "N\u00e9osoft", city: "Paris", size: "500+", sector: "IT Consulting" },
            { company: "Linkvalue", city: "Nantes", size: "200-500", sector: "Dev & Cloud" },
            { company: "Apside", city: "Boulogne", size: "1000+", sector: "IT Engineering" },
            { company: "Ippon Tech", city: "Paris", size: "200-500", sector: "Data & Cloud" },
            { company: "Zenika", city: "Paris", size: "200-500", sector: "Consulting & Devops" },
          ] as ProspectRow[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "Found 23 in total. Want me to add them to an outreach sequence?",
          delay: 500,
        },
      ],
    },
    {
      id: "recovery",
      messages: [
        {
          type: "user",
          text: "Show me recoverable lost deals",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "Analyzing...",
          delay: 1500,
        },
        {
          type: "ai",
          richContent: "deals",
          richData: [
            { emoji: "\ud83d\udfe1", name: "TechCorp", amount: "$45K", reason: "Competitor contract expires in 2 months", score: 78 },
            { emoji: "\ud83d\udfe0", name: "DataVision", amount: "$28K", reason: "New CTO arrived", score: 65 },
            { emoji: "\ud83d\udd35", name: "CloudFactory", amount: "$18K", reason: "Q2 budget unlocked", score: 72 },
          ] as DealCard[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "TechCorp has the best window. Their Salesforce contract expires in May. Want me to prepare a follow-up?",
          delay: 500,
        },
      ],
    },
    {
      id: "crm",
      messages: [
        {
          type: "user",
          text: "Add a note on the Pennylane prospect",
          autoAdvance: true,
        },
        {
          type: "ai",
          text: "What about?",
          delay: 1500,
        },
        {
          type: "user",
          text: "30min call \u2014 interested in the Pro plan, decision in April",
          autoAdvance: true,
          delay: 1500,
        },
        {
          type: "ai",
          text: "Note added on Pennylane. I also detected a key date: I'll remind you in early April for the follow-up.",
          delay: 1000,
        },
      ],
    },
  ],
}
