/**
 * /about page copy — post-pivot MCP-only (2026-04-23).
 * Source: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 * Bilingual: EN master + FR is Laurent's voice (founder FR porteur).
 * R11-compliant.
 */

export const aboutCopy = {
  en: {
    meta: {
      title: "About SymbiozAI — The headless AI CRM",
      description:
        "Laurent Bouzon founded SymbiozAI after 15 years watching sales reps fight with CRMs they didn't want to open. The answer wasn't a better CRM. It was a different kind.",
    },
    hero: {
      eyebrow: "About",
      headline: "The headless AI CRM.",
      pullQuote: "Software used to be opened. Now it's invoked.",
    },
    sections: [
      {
        title: "The wound",
        paragraphs: [
          "I spent 15 years asking sales reps to open their CRM. They never wanted to. They had a point.",
          "Every CRM deployment I've seen follows the same arc: executive buy-in, IT rollout, rep training, adoption campaign, three months of nudging, six months of partial use, eighteen months of expensive shelfware.",
          "The sales reps weren't wrong. They were hired to sell, not to log. The CRM was built for managers who needed reports, not for the humans who were supposed to feed it.",
          "That's not a product problem. That's an architectural mistake.",
        ],
      },
      {
        title: "The thesis",
        paragraphs: [
          "In 2026, your AI agent can qualify a lead, draft a DISC-aware email, assess deal health, and prep your next meeting brief — in natural language, in your own toolchain.",
          "It needed a CRM built for that.",
          "Not a CRM with a chatbot added. Not a CRM where you chat with a sidebar assistant that can't actually do anything. A CRM where your agent is the operator, and you are the supervisor.",
        ],
        pullQuote:
          "A CRM designed for humans, piloted by AI, is a compromise. A CRM designed to be piloted by AI is a product.",
      },
      {
        title: "The architecture",
        paragraphs: [
          "SymbiozAI has no primary human-facing interface. The MCP server is the product. The database is the memory. The supervision console — 5 minutes a day — is not where you operate the CRM; it's where you validate sensitive decisions.",
          "35 verbal MCP missions. 23 data providers wrapped behind one endpoint. A 3-class HITL policy that keeps you in control of what matters without bogging you down in what doesn't.",
        ],
      },
      {
        title: "The team",
        paragraphs: [
          "SymbiozAI is built by Laurent Bouzon (founder) and an AI Staff of 17 specialized agents coordinated by a Chief of Staff — a model that mirrors the product it builds.",
          "We eat our own cooking. The AI Staff that builds SymbiozAI uses SymbiozAI. Every sprint, every qualification, every pipeline decision — run through the same MCP server we ship to beta users.",
        ],
      },
      {
        title: "Why Frankfurt, why MCP, why now",
        subsections: [
          {
            heading: "Why Frankfurt",
            body:
              "Your pipeline data doesn't belong in jurisdictions outside your control. EU-hosted, AI Act native, GDPR article 15 endpoint from day one. Not because we had to — because a serious CRM built in 2026 had no excuse not to be.",
          },
          {
            heading: "Why MCP",
            body:
              "The Model Context Protocol is the de facto standard for giving AI agents access to external systems. Every serious AI agent supports it. Every serious infrastructure tool will implement it. We built the CRM around it because that's where the puck is going.",
          },
          {
            heading: "Why now",
            body:
              "Salesforce launched Headless 360 in April 2026. Octolane has been running MCP since 2024. The category just got validated. There's a window to be the radical option — the one that went headless all the way, not halfway.",
          },
        ],
      },
      {
        title: "Compliance",
        list: [
          "EU-hosted (Frankfurt, DigitalOcean FRA1)",
          "AI Act article 14 native — 3-class HITL, kill-switch under 1s",
          "GDPR article 15 endpoint native",
          "LLM-agnostic — no fine-tuning on your data, no retention by LLM providers",
          "Immutable HMAC-signed audit log, 7-year retention",
        ],
      },
    ],
    cta: {
      primary: { label: "Book a demo", href: "/en/contact" },
      linkedinLabel: "Follow Laurent on LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
  },
  fr: {
    meta: {
      title: "À propos de SymbiozAI — Le CRM headless pour agents IA",
      description:
        "Laurent Bouzon a fondé SymbiozAI après 15 ans à voir des commerciaux se battre avec des CRM qu'ils n'ouvraient jamais. La réponse n'était pas un meilleur CRM. C'était un autre type.",
    },
    hero: {
      eyebrow: "À propos",
      headline: "Le CRM conçu pour les agents IA.",
      pullQuote: "Les logiciels ne sont plus faits pour les humains.",
    },
    sections: [
      {
        title: "La blessure",
        paragraphs: [
          "J'ai passé 15 ans à demander aux commerciaux d'ouvrir leur CRM. Ils n'ont jamais voulu. Ils avaient raison.",
          "Chaque déploiement CRM que j'ai vu suit le même arc : buy-in direction, déploiement IT, formation équipes, campagne d'adoption, trois mois de relances, six mois d'usage partiel, dix-huit mois de shelfware coûteux.",
          "Les commerciaux n'avaient pas tort. On les avait recrutés pour vendre, pas pour saisir. Le CRM était construit pour les managers qui avaient besoin de rapports, pas pour les humains censés l'alimenter.",
          "Ce n'est pas un problème de produit. C'est une erreur d'architecture.",
        ],
      },
      {
        title: "La thèse",
        paragraphs: [
          "En 2026, votre agent IA peut qualifier un lead, rédiger un email adapté au profil DISC, évaluer la santé d'un deal et préparer votre prochain brief de réunion — en langage naturel, dans votre propre environnement de travail.",
          "Il lui fallait un CRM conçu pour ça.",
          "Pas un CRM avec un chatbot ajouté. Pas un CRM où vous parlez à un assistant latéral qui ne peut rien faire de concret. Un CRM où votre agent est l'opérateur, et vous, le superviseur.",
        ],
        pullQuote:
          "MCP-retrofitted n'est pas MCP-native. MCP-native n'est pas MCP-only. On est MCP-only. C'est toute la différence.",
      },
      {
        title: "L'architecture",
        paragraphs: [
          "SymbiozAI n'a pas d'interface utilisateur principale. Le serveur MCP est le produit. La base de données est la mémoire. La console de supervision — 5 minutes par jour — n'est pas l'endroit où vous opérez le CRM ; c'est là où vous validez les décisions sensibles.",
          "35 missions MCP verbales. 23 fournisseurs de données accessibles via un seul endpoint. Une politique HITL à 3 classes qui vous garde en contrôle de ce qui compte.",
        ],
      },
      {
        title: "L'équipe",
        paragraphs: [
          "SymbiozAI est construit par Laurent Bouzon (fondateur) et un AI Staff de 17 agents spécialisés coordonnés par un Chief of Staff — un modèle qui reflète le produit qu'il construit.",
          "On mange notre propre cuisine. L'AI Staff qui construit SymbiozAI utilise SymbiozAI. Chaque sprint, chaque qualification, chaque décision pipeline — passée par le même serveur MCP qu'on livre aux utilisateurs bêta.",
        ],
      },
      {
        title: "Pourquoi Frankfurt, pourquoi MCP, pourquoi maintenant",
        subsections: [
          {
            heading: "Pourquoi Frankfurt",
            body:
              "Vos données pipeline n'appartiennent pas à des juridictions hors de votre contrôle. Hébergé en EU, natif AI Act, endpoint RGPD article 15 dès le départ. Pas parce qu'on y était obligés — parce qu'un CRM sérieux construit en 2026 n'avait aucune excuse de ne pas l'être.",
          },
          {
            heading: "Pourquoi MCP",
            body:
              "Le Model Context Protocol est le standard de fait pour donner aux agents IA l'accès aux systèmes externes. Tous les agents sérieux le supportent. On a construit le CRM autour parce que c'est là que le marché va.",
          },
          {
            heading: "Pourquoi maintenant",
            body:
              "Salesforce a lancé Headless 360 en avril 2026. Octolane fait du MCP depuis 2024. La catégorie vient d'être validée. Il y a une fenêtre pour être l'option radicale — celle qui est allée headless jusqu'au bout, pas à moitié.",
          },
        ],
      },
      {
        title: "Conformité",
        list: [
          "Hébergé en EU (Frankfurt, DigitalOcean FRA1)",
          "Conforme AI Act article 14 — HITL 3 classes, kill-switch en moins d'1 seconde",
          "Endpoint RGPD article 15 natif",
          "LLM-agnostic — pas de fine-tuning sur vos données, pas de rétention par les providers LLM",
          "Audit log immuable signé HMAC, rétention 7 ans",
        ],
      },
    ],
    cta: {
      primary: { label: "Réserver une démo", href: "/fr/contact" },
      linkedinLabel: "Suivre Laurent sur LinkedIn",
      linkedinUrl: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    },
  },
}
