import { type Locale } from "./dictionary"

export interface PlaygroundMessage {
  type: "user" | "ai" | "buttons" | "inline-choices"
  text?: string
  richContent?: "table" | "deals"
  richData?: unknown
  buttons?: ScenarioButton[]
  choices?: InlineChoice[]
  delay?: number
  autoAdvance?: boolean
}

export interface ScenarioButton {
  id: string
  emoji: string
  label: string
}

export interface InlineChoice {
  label: string
  /** Messages to play after this choice is clicked */
  nextMessages: PlaygroundMessage[]
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
          text: "Trouve-moi des ESN en Île-de-France",
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
            { company: "Néosoft", city: "Paris", size: "500+", sector: "Conseil IT" },
            { company: "Linkvalue", city: "Nantes", size: "200-500", sector: "Dev & Cloud" },
            { company: "Apside", city: "Boulogne", size: "1000+", sector: "Ingénierie IT" },
            { company: "Ippon Tech", city: "Paris", size: "200-500", sector: "Data & Cloud" },
            { company: "Zenika", city: "Paris", size: "200-500", sector: "Conseil & Devops" },
          ] as ProspectRow[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "J'en ai trouvé 23 au total. Tu veux que je les ajoute à une séquence d'outreach ?",
          delay: 500,
        },
      ],
    },
    {
      id: "recovery",
      messages: [
        {
          type: "user",
          text: "Montre-moi les deals perdus récupérables",
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
            { emoji: "🟡", name: "TechCorp", amount: "45K€", reason: "Contrat concurrent expire dans 2 mois", score: 78 },
            { emoji: "🟠", name: "DataVision", amount: "28K€", reason: "Nouveau CTO arrivé", score: 65 },
            { emoji: "🔵", name: "CloudFactory", amount: "18K€", reason: "Budget débloqué Q2", score: 72 },
          ] as DealCard[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "TechCorp a la meilleure fenêtre — leur contrat Salesforce expire en mai. Qu'est-ce que tu veux faire ?",
          delay: 500,
        },
        {
          type: "inline-choices",
          choices: [
            {
              label: "Prépare une relance TechCorp",
              nextMessages: [
                { type: "user", text: "Prépare une relance pour TechCorp", autoAdvance: true },
                { type: "ai", text: "C'est fait ! Email de relance personnalisé prêt, basé sur votre dernière proposition. Objet : \"Votre contrat arrive à échéance — on en parle ?\". Tu veux que je l'envoie ou tu préfères relire avant ?", delay: 1500 },
              ],
            },
            {
              label: "Détails sur DataVision",
              nextMessages: [
                { type: "user", text: "Donne-moi les détails sur DataVision", autoAdvance: true },
                { type: "ai", text: "DataVision — deal perdu il y a 4 mois (budget gelé). Le nouveau CTO Thomas Mercier est arrivé en février. Il a un profil tech/data, potentiellement plus réceptif à notre approche IA. Dernier contact : appel avec l'ancien directeur en novembre. Tu veux que je prépare un message d'intro pour le nouveau CTO ?", delay: 1500 },
              ],
            },
          ],
          delay: 300,
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
          type: "inline-choices",
          choices: [
            {
              label: "Call commercial",
              nextMessages: [
                { type: "user", text: "Call de 30min — intéressés par le plan Pro, décision en avril", autoAdvance: true },
                { type: "ai", text: "Note ajoutée sur Pennylane. J'ai détecté une date clé : je te rappellerai début avril pour le follow-up. Tu veux que je planifie autre chose ?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Planifie un rappel",
                      nextMessages: [
                        { type: "user", text: "Oui, rappel le 1er avril", autoAdvance: true },
                        { type: "ai", text: "Rappel créé pour le 1er avril : \"Follow-up Pennylane — décision plan Pro\". Je t'enverrai une notification le matin. D'ici là, je surveille toute activité sur leur compte.", delay: 1500 },
                      ],
                    },
                    {
                      label: "Non, c'est bon",
                      nextMessages: [
                        { type: "user", text: "Non, c'est tout pour l'instant", autoAdvance: true },
                        { type: "ai", text: "Compris ! La note est enregistrée et le rappel automatique début avril est activé. Si Pennylane interagit d'ici là, je te préviens.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
              ],
            },
            {
              label: "Feedback produit",
              nextMessages: [
                { type: "user", text: "Démo produit — ils veulent une intégration Notion, bloquant pour eux", autoAdvance: true },
                { type: "ai", text: "Note ajoutée sur Pennylane avec le tag \"feedback produit\". J'ai remonté la demande d'intégration Notion dans le backlog produit — c'est la 3ème fois qu'on nous la demande ce mois-ci. Priorité suggérée : haute.", delay: 1500 },
              ],
            },
          ],
          delay: 300,
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
            { company: "Néosoft", city: "Paris", size: "500+", sector: "IT Consulting" },
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
            { emoji: "🟡", name: "TechCorp", amount: "$45K", reason: "Competitor contract expires in 2 months", score: 78 },
            { emoji: "🟠", name: "DataVision", amount: "$28K", reason: "New CTO arrived", score: 65 },
            { emoji: "🔵", name: "CloudFactory", amount: "$18K", reason: "Q2 budget unlocked", score: 72 },
          ] as DealCard[],
          delay: 1500,
        },
        {
          type: "ai",
          text: "TechCorp has the best window — their Salesforce contract expires in May. What do you want to do?",
          delay: 500,
        },
        {
          type: "inline-choices",
          choices: [
            {
              label: "Prepare a TechCorp follow-up",
              nextMessages: [
                { type: "user", text: "Prepare a follow-up for TechCorp", autoAdvance: true },
                { type: "ai", text: "Done! Personalized follow-up email ready, based on your last proposal. Subject: \"Your contract is expiring — shall we talk?\". Want me to send it or would you rather review it first?", delay: 1500 },
              ],
            },
            {
              label: "Details on DataVision",
              nextMessages: [
                { type: "user", text: "Give me details on DataVision", autoAdvance: true },
                { type: "ai", text: "DataVision — deal lost 4 months ago (frozen budget). New CTO Thomas Mercier arrived in February. He has a tech/data background, potentially more receptive to our AI approach. Last contact: call with former director in November. Want me to prepare an intro message for the new CTO?", delay: 1500 },
              ],
            },
          ],
          delay: 300,
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
          type: "inline-choices",
          choices: [
            {
              label: "Sales call",
              nextMessages: [
                { type: "user", text: "30min call — interested in the Pro plan, decision in April", autoAdvance: true },
                { type: "ai", text: "Note added on Pennylane. I detected a key date: I'll remind you in early April for the follow-up. Want me to schedule anything else?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Schedule a reminder",
                      nextMessages: [
                        { type: "user", text: "Yes, reminder on April 1st", autoAdvance: true },
                        { type: "ai", text: "Reminder created for April 1st: \"Pennylane follow-up — Pro plan decision\". I'll send you a notification that morning. Until then, I'll monitor any activity on their account.", delay: 1500 },
                      ],
                    },
                    {
                      label: "No, that's all",
                      nextMessages: [
                        { type: "user", text: "No, that's all for now", autoAdvance: true },
                        { type: "ai", text: "Got it! Note saved and automatic early April reminder is set. If Pennylane interacts before then, I'll let you know.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
              ],
            },
            {
              label: "Product feedback",
              nextMessages: [
                { type: "user", text: "Product demo — they want a Notion integration, it's a blocker for them", autoAdvance: true },
                { type: "ai", text: "Note added on Pennylane with the \"product feedback\" tag. I've escalated the Notion integration request to the product backlog — that's the 3rd time it's been requested this month. Suggested priority: high.", delay: 1500 },
              ],
            },
          ],
          delay: 300,
        },
      ],
    },
  ],
}
