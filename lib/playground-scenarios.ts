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
        {
          type: "inline-choices",
          choices: [
            {
              label: "Oui, lance la séquence",
              nextMessages: [
                { type: "user", text: "Oui, ajoute-les à une séquence", autoAdvance: true },
                { type: "ai", text: "C'est fait ! Séquence \"ESN Île-de-France\" créée avec 23 contacts. Envoi programmé demain 9h. Je te ferai un point sur les ouvertures dans 48h.", delay: 1500 },
              ],
            },
            {
              label: "Filtre les +500 employés",
              nextMessages: [
                { type: "user", text: "Filtre uniquement les +500 employés", autoAdvance: true },
                { type: "ai", text: "Filtré ! 8 ESN de +500 employés retenues : Néosoft, Apside, Sopra Steria, Capgemini, Atos, CGI, Alten, Accenture. Séquence \"ESN 500+ IdF\" créée. Départ demain matin.", delay: 1500 },
              ],
            },
          ],
          delay: 300,
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
                { type: "ai", text: "Email de relance prêt ! Objet : \"Votre contrat arrive à échéance — on en parle ?\". Basé sur votre dernière proposition. Tu veux l'envoyer maintenant ?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Envoie-le",
                      nextMessages: [
                        { type: "user", text: "Envoie", autoAdvance: true },
                        { type: "ai", text: "Envoyé ! Email parti à j.martin@techcorp.fr. Rappel automatique programmé dans 3 jours si pas de réponse. Je te notifie dès qu'il ouvre le mail.", delay: 1500 },
                      ],
                    },
                    {
                      label: "Montre-moi le brouillon d'abord",
                      nextMessages: [
                        { type: "user", text: "Montre-moi le brouillon", autoAdvance: true },
                        { type: "ai", text: "Brouillon enregistré dans tes drafts et accessible depuis la fiche TechCorp. Je t'ai aussi ajouté un rappel demain matin pour le relire à tête reposée.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
              ],
            },
            {
              label: "Détails sur DataVision",
              nextMessages: [
                { type: "user", text: "Donne-moi les détails sur DataVision", autoAdvance: true },
                { type: "ai", text: "DataVision — deal perdu il y a 4 mois (budget gelé). Nouveau CTO Thomas Mercier arrivé en février, profil tech/data. Dernier contact : novembre avec l'ancien directeur. Je te prépare un message d'intro pour le nouveau CTO ?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Oui, prépare le message",
                      nextMessages: [
                        { type: "user", text: "Oui, vas-y", autoAdvance: true },
                        { type: "ai", text: "Message LinkedIn prêt pour Thomas Mercier : angle \"IA + data\" adapté à son profil. Programmé pour envoi lundi 9h. Deal DataVision remis en statut \"Réactivation\" dans ton pipeline.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
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
                { type: "ai", text: "Note ajoutée sur Pennylane. J'ai détecté une date clé : décision en avril. Tu veux que je planifie un rappel ?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Oui, rappel début avril",
                      nextMessages: [
                        { type: "user", text: "Oui, rappel le 1er avril", autoAdvance: true },
                        { type: "ai", text: "Rappel créé pour le 1er avril : \"Follow-up Pennylane — décision plan Pro\". Notification le matin. D'ici là, je surveille toute activité sur leur compte.", delay: 1500 },
                      ],
                    },
                    {
                      label: "Non, c'est bon",
                      nextMessages: [
                        { type: "user", text: "Non, c'est tout", autoAdvance: true },
                        { type: "ai", text: "Compris ! Note enregistrée et rappel automatique début avril activé. Si Pennylane interagit d'ici là, je te préviens.", delay: 1500 },
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
                { type: "ai", text: "Note ajoutée sur Pennylane avec le tag \"feedback produit\". Demande d'intégration Notion remontée dans le backlog — c'est la 3ème demande ce mois-ci. Priorité suggérée : haute. Fiche Pennylane mise à jour.", delay: 1500 },
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
        {
          type: "inline-choices",
          choices: [
            {
              label: "Yes, start the sequence",
              nextMessages: [
                { type: "user", text: "Yes, add them to a sequence", autoAdvance: true },
                { type: "ai", text: "Done! Sequence \"IT Firms Paris\" created with 23 contacts. Outreach starts tomorrow 9am. I'll give you an update on opens in 48h.", delay: 1500 },
              ],
            },
            {
              label: "Filter 500+ employees only",
              nextMessages: [
                { type: "user", text: "Filter only 500+ employees", autoAdvance: true },
                { type: "ai", text: "Filtered! 8 firms with 500+ employees retained: Néosoft, Apside, Sopra Steria, Capgemini, Atos, CGI, Alten, Accenture. Sequence \"IT 500+ Paris\" created. Outreach starts tomorrow morning.", delay: 1500 },
              ],
            },
          ],
          delay: 300,
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
                { type: "ai", text: "Follow-up email ready! Subject: \"Your contract is expiring — shall we talk?\". Based on your last proposal. Want me to send it now?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Send it",
                      nextMessages: [
                        { type: "user", text: "Send it", autoAdvance: true },
                        { type: "ai", text: "Sent! Email delivered to j.martin@techcorp.com. Auto-reminder set for 3 days if no reply. I'll notify you as soon as they open it.", delay: 1500 },
                      ],
                    },
                    {
                      label: "Show me the draft",
                      nextMessages: [
                        { type: "user", text: "Show me the draft", autoAdvance: true },
                        { type: "ai", text: "Draft saved and accessible from the TechCorp record. I've also set a reminder for tomorrow morning so you can review it fresh.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
              ],
            },
            {
              label: "Details on DataVision",
              nextMessages: [
                { type: "user", text: "Give me details on DataVision", autoAdvance: true },
                { type: "ai", text: "DataVision — deal lost 4 months ago (frozen budget). New CTO Thomas Mercier arrived in February, tech/data background. Last contact: November with former director. Want me to prepare an intro message for the new CTO?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Yes, prepare the message",
                      nextMessages: [
                        { type: "user", text: "Yes, go ahead", autoAdvance: true },
                        { type: "ai", text: "LinkedIn message ready for Thomas Mercier: \"AI + data\" angle tailored to his profile. Scheduled for Monday 9am. DataVision deal moved to \"Reactivation\" in your pipeline.", delay: 1500 },
                      ],
                    },
                  ],
                  delay: 300,
                },
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
                { type: "ai", text: "Note added on Pennylane. I detected a key date: decision in April. Want me to schedule a reminder?", delay: 1500 },
                {
                  type: "inline-choices",
                  choices: [
                    {
                      label: "Yes, reminder April 1st",
                      nextMessages: [
                        { type: "user", text: "Yes, reminder on April 1st", autoAdvance: true },
                        { type: "ai", text: "Reminder created for April 1st: \"Pennylane follow-up — Pro plan decision\". Morning notification set. Until then, I'll monitor any activity on their account.", delay: 1500 },
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
                { type: "user", text: "Product demo — they want a Notion integration, it's a blocker", autoAdvance: true },
                { type: "ai", text: "Note added on Pennylane with \"product feedback\" tag. Notion integration request escalated to product backlog — 3rd request this month. Suggested priority: high. Pennylane record updated.", delay: 1500 },
              ],
            },
          ],
          delay: 300,
        },
      ],
    },
  ],
}
