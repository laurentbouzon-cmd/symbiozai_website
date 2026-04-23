/**
 * /mcp page copy — post-pivot MCP-only site (2026-04-23).
 * Source of truth: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 * R11-compliant: no primacy claims in rendered copy.
 */

import type { FAQItem } from "./site-types"

export type SiteLang = "en" | "fr"

export type HITLClassName = "green" | "orange" | "red" | "varies"

export interface MissionSpec {
  name: string
  description: string
  hitl?: HITLClassName
}

export interface MissionCategory {
  title: string
  subtitle?: string
  missions: MissionSpec[]
}

// =============================================================================
// 35 MCP MISSIONS (shared between /mcp and /features)
// =============================================================================

export const missionsCatalog: Record<SiteLang, MissionCategory[]> = {
  en: [
    {
      title: "Acquisition",
      subtitle: "7 missions",
      missions: [
        { name: "start_targeting", description: "Target ICP-fit prospects from 23 data providers. Company + contact.", hitl: "green" },
        { name: "enrich_contact", description: "Enrich a contact with email, phone, LinkedIn, social data.", hitl: "green" },
        { name: "enrich_company", description: "Enrich a company with firmographic data, funding, headcount, tech stack.", hitl: "green" },
        { name: "get_buying_signals", description: "Detect intent signals: job postings, funding rounds, tech changes.", hitl: "green" },
        { name: "reactivate_dormant_leads", description: "Surface dormant leads with re-engagement signals.", hitl: "orange" },
        { name: "search_contacts", description: "Semantic search across your contact database.", hitl: "green" },
        { name: "get_lead_context", description: "Full 360 view of a lead: history, interactions, enrichment.", hitl: "green" },
      ],
    },
    {
      title: "Qualification",
      subtitle: "6 missions",
      missions: [
        { name: "qualify_lead", description: "Composite qualification with structured reasoning. Replaces manual MQL/SQL scoring.", hitl: "green" },
        { name: "analyze_communication_style", description: "DISC-based profiling from LinkedIn, emails, meeting history.", hitl: "green" },
        { name: "get_meeting_prep_brief", description: "Pre-call brief: company context, contact history, recommended talking points.", hitl: "green" },
        { name: "get_pipeline_snapshot", description: "Real-time pipeline health: by stage, by rep, by deal value.", hitl: "green" },
        { name: "assess_deal_health", description: "0-100 deal score. Every factor explained. No blackbox.", hitl: "green" },
        { name: "poll_events", description: "Monitor pipeline for hot signals: replies, stage moves, silence.", hitl: "green" },
      ],
    },
    {
      title: "Engagement",
      subtitle: "8 missions",
      missions: [
        { name: "draft_email_personalized", description: "DISC-aware email draft. Adapts tone to contact profile.", hitl: "orange" },
        { name: "draft_followup_sequence", description: "Multi-step follow-up sequence, DISC-aware, throttle-controlled.", hitl: "orange" },
        { name: "summarize_meeting_recording", description: "Summarize a meeting transcript and extract action items.", hitl: "green" },
        { name: "update_deal", description: "Update a deal: stage, amount, close date, owner.", hitl: "orange" },
        { name: "book_meeting", description: "Create a meeting in calendar, link to deal.", hitl: "orange" },
        { name: "send_email", description: "Send email via connected mailbox (HITL: Orange class by default).", hitl: "red" },
        { name: "create_contact", description: "Create a new contact with full enrichment.", hitl: "orange" },
        { name: "create_deal", description: "Create a new deal, linked to contact and company.", hitl: "orange" },
      ],
    },
    {
      title: "Meta / Control",
      subtitle: "7 missions",
      missions: [
        { name: "escalate_to_human", description: "Surface a decision to the human supervisor with context.", hitl: "green" },
        { name: "get_audit_log", description: "Retrieve action history for a contact, deal, or tenant.", hitl: "green" },
        { name: "get_supervision_queue", description: "List of Orange/Red actions pending human review.", hitl: "green" },
        { name: "run_playbook", description: "Execute a pre-defined playbook (sequence of missions).", hitl: "varies" },
        { name: "get_agent_status", description: "Current agent state, running missions, pending actions.", hitl: "green" },
        { name: "export_my_data", description: "GDPR art. 15 native — export all your data on demand.", hitl: "green" },
        { name: "kill_switch", description: "Immediately halt all agent activity for the tenant.", hitl: "red" },
      ],
    },
  ],
  fr: [
    {
      title: "Acquisition",
      subtitle: "7 missions",
      missions: [
        { name: "start_targeting", description: "Cibler des prospects ICP-fit depuis 23 fournisseurs de données. Entreprise + contact.", hitl: "green" },
        { name: "enrich_contact", description: "Enrichir un contact avec email, téléphone, LinkedIn, data sociale.", hitl: "green" },
        { name: "enrich_company", description: "Enrichir une entreprise : firmographie, levées, effectif, tech stack.", hitl: "green" },
        { name: "get_buying_signals", description: "Détecter signaux d'intention : offres d'emploi, levées, changements tech.", hitl: "green" },
        { name: "reactivate_dormant_leads", description: "Remonter les leads dormants avec signaux de ré-engagement.", hitl: "orange" },
        { name: "search_contacts", description: "Recherche sémantique dans votre base de contacts.", hitl: "green" },
        { name: "get_lead_context", description: "Vue 360 complète : historique, interactions, enrichissement.", hitl: "green" },
      ],
    },
    {
      title: "Qualification",
      subtitle: "6 missions",
      missions: [
        { name: "qualify_lead", description: "Qualification composite avec raisonnement structuré. Remplace le scoring MQL/SQL manuel.", hitl: "green" },
        { name: "analyze_communication_style", description: "Profilage DISC depuis LinkedIn, emails, historique de réunions.", hitl: "green" },
        { name: "get_meeting_prep_brief", description: "Brief pré-call : contexte société, historique contact, talking points.", hitl: "green" },
        { name: "get_pipeline_snapshot", description: "Santé pipeline temps réel : par étape, par rep, par valeur.", hitl: "green" },
        { name: "assess_deal_health", description: "Score deal 0-100. Chaque facteur expliqué. Pas de blackbox.", hitl: "green" },
        { name: "poll_events", description: "Surveillance pipeline : réponses, mouvements d'étape, silence.", hitl: "green" },
      ],
    },
    {
      title: "Engagement",
      subtitle: "8 missions",
      missions: [
        { name: "draft_email_personalized", description: "Brouillon email DISC-aware. S'adapte au profil du contact.", hitl: "orange" },
        { name: "draft_followup_sequence", description: "Séquence de relances multi-étapes, DISC-aware, throttle contrôlé.", hitl: "orange" },
        { name: "summarize_meeting_recording", description: "Résumer un transcript de réunion et extraire les action items.", hitl: "green" },
        { name: "update_deal", description: "Mettre à jour un deal : étape, montant, close date, owner.", hitl: "orange" },
        { name: "book_meeting", description: "Créer une réunion dans le calendrier, liée au deal.", hitl: "orange" },
        { name: "send_email", description: "Envoyer un email via la boîte connectée (HITL : Orange par défaut).", hitl: "red" },
        { name: "create_contact", description: "Créer un contact avec enrichissement complet.", hitl: "orange" },
        { name: "create_deal", description: "Créer un deal, lié au contact et à la société.", hitl: "orange" },
      ],
    },
    {
      title: "Meta / Contrôle",
      subtitle: "7 missions",
      missions: [
        { name: "escalate_to_human", description: "Faire remonter une décision au superviseur humain avec contexte.", hitl: "green" },
        { name: "get_audit_log", description: "Récupérer l'historique d'actions pour un contact, deal ou tenant.", hitl: "green" },
        { name: "get_supervision_queue", description: "Liste des actions Orange/Rouge en attente de revue humaine.", hitl: "green" },
        { name: "run_playbook", description: "Exécuter un playbook pré-défini (séquence de missions).", hitl: "varies" },
        { name: "get_agent_status", description: "État courant de l'agent, missions en cours, actions pending.", hitl: "green" },
        { name: "export_my_data", description: "RGPD art. 15 natif — exporter toutes vos données à la demande.", hitl: "green" },
        { name: "kill_switch", description: "Stopper immédiatement toute l'activité agent pour le tenant.", hitl: "red" },
      ],
    },
  ],
}

// =============================================================================
// MCP PAGE
// =============================================================================

export const mcpCopy = {
  en: {
    meta: {
      title: "The MCP-only CRM | SymbiozAI MCP Server",
      description:
        "SymbiozAI exposes 35 CRM missions via MCP. Headless by design. Connect Claude Code, Cursor, or any MCP-compatible agent. Setup in under 5 minutes.",
    },
    hero: {
      eyebrow: "MCP Server",
      headline: "The MCP-only CRM.",
      subhead:
        "Headless by design. Operated by your AI agent via MCP. Claude Code, Cursor, GPT — it's all native.",
      primary: { label: "Install the MCP in 5 min", href: "#quickstart" },
      secondary: { label: "Try the live sandbox", href: "#quickstart" },
      tertiary: { label: "Book a demo", href: "/en/contact" },
    },
    quickstart: {
      eyebrow: "5-minute quickstart",
      title: "Three steps. Any MCP-compatible agent.",
      steps: [
        {
          heading: "Step 1 — Run the installer",
          body:
            "The CLI detects your MCP client (Claude Code, Cursor, Cline, Goose, Continue.dev) and auto-configures the connection. No API key management. No JSON to edit manually.",
          code: "npx @symbiozai/mcp-setup",
        },
        {
          heading: "Step 2 — Connect in your agent",
          body:
            "Your agent now has access to 35 SymbiozAI MCP missions. No plugin. No SDK. Standard MCP spec.",
        },
        {
          heading: "Step 3 — Run your opening mission",
          body:
            "Your agent calls start_targeting. Results in your pipeline in under 60 seconds.",
          code: `"Target 50 founders in B2B SaaS, Series A, France, using Claude Code."`,
        },
      ],
    },
    agentConfigs: {
      eyebrow: "Compatible agents",
      title: "Official MCP spec. Any MCP-compatible client connects natively.",
      lede:
        "SymbiozAI implements stdio and HTTP+SSE transports. Below, drop-in snippets for the most common clients.",
      clients: [
        {
          name: "Claude Code",
          label: "claude_desktop_config.json",
          code: `{
  "mcpServers": {
    "symbiozai": {
      "command": "npx",
      "args": ["@symbiozai/mcp-setup", "--mode", "stdio"],
      "env": { "SYMBIOZAI_TOKEN": "your-token" }
    }
  }
}`,
        },
        {
          name: "Cursor",
          label: "~/.cursor/mcp.json",
          code: `{
  "symbiozai": {
    "url": "https://api.symbioz.ai/mcp/sse",
    "headers": { "Authorization": "Bearer your-token" }
  }
}`,
        },
        {
          name: "Cline · Goose · Continue.dev",
          label: "shell",
          code: `# Auto-detects the client and applies the correct config format
npx @symbiozai/mcp-setup`,
        },
      ],
    },
    missions: {
      eyebrow: "35 MCP missions",
      title: "Every mission is designed to be called by a language model.",
      lede:
        "No guesswork — each mission has a schema, an example prompt, and an expected output.",
      phase2Note:
        "7 additional missions in Phase 2: score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
    },
    wrapFirst: {
      eyebrow: "Architecture wrap-first",
      title: "SymbiozAI does not rebuild data providers. It wraps them.",
      lede:
        "Apollo, BrightData, Hunter, Unipile, LinkedIn, Pappers, INSEE, Crunchbase, and 15 others — all available through two MCP enrichment missions. Your agent calls enrich_contact. SymbiozAI decides which provider to query, aggregates the results, deduplicates, and returns a structured response.",
      result: "You get 23 data providers. You manage one endpoint.",
      layers: [
        { layer: "Contact enrichment", providers: "Apollo, BrightData, Hunter, Clearbit, Lusha" },
        { layer: "Company enrichment", providers: "Crunchbase, Pappers, INSEE, Clearbit, BrightData" },
        { layer: "Intent signals", providers: "6sense, Bombora (via BrightData), funding data" },
        { layer: "Communication", providers: "Unipile (LinkedIn DMs, email sync)" },
        { layer: "Social", providers: "LinkedIn (profiles, connections, activity)" },
        { layer: "Registry", providers: "Pappers (France), INSEE (France), Crunchbase (global)" },
      ],
      layerLabel: "Layer",
      providersLabel: "Providers",
    },
    hitl: {
      eyebrow: "HITL 3-class policy",
      title: "Every mission has a class. Every class has a behavior.",
      classes: [
        {
          tone: "green" as const,
          title: "Green",
          behavior: "Runs automatically. No human confirmation needed.",
          examples: "Enrichment, pipeline read, contact search, deal health score",
        },
        {
          tone: "orange" as const,
          title: "Orange",
          behavior: "Runs as dry-run initially. Agent proposes, human confirms in console.",
          examples: "Email drafts, deal updates, meeting bookings, contact creation",
        },
        {
          tone: "red" as const,
          title: "Red",
          behavior: "Blocked until explicit human approval.",
          examples: "Bulk email send, sequence launch, kill-switch",
        },
      ],
      footer:
        "Green actions compound silently and correctly. Orange actions keep you informed without requiring constant attention. Red actions never happen by accident. Default policy is conservative. You can tune thresholds per mission category from your tenant config.",
      behaviorLabel: "Behavior",
      examplesLabel: "Examples",
    },
    audit: {
      eyebrow: "Audit log WORM",
      title: "Every action, every agent call, every human decision — logged.",
      bullets: [
        { heading: "Append-only", body: "No record can be modified or deleted" },
        {
          heading: "HMAC-signed",
          body: "Each entry cryptographically chained to the previous",
        },
        {
          heading: "7-year retention",
          body: "Compliant with AI Act article 14 and French accounting law",
        },
        {
          heading: "Queryable",
          body: "GET /audit/my-data returns full export in structured JSON",
        },
        {
          heading: "Human-attributed",
          body: "Every human decision logged with user identity and timestamp",
        },
      ],
    },
    differentiators: {
      eyebrow: "Three differentiators",
      title: "No other MCP CRM exposes these three missions.",
      items: [
        {
          code: "analyze_communication_style",
          heading: "DISC profiling",
          body:
            "Your agent reads available data (LinkedIn, email history, meeting transcripts) and produces a DISC profile with actionable writing guidance. Write to a D profile differently than to an I. The reasoning is shown, not hidden.",
          example: `"Analyze Thomas Martin's communication style before my call tomorrow."`,
        },
        {
          code: "assess_deal_health",
          heading: "Multi-signal score",
          body:
            "0-100 score built from: email reply rate, meeting cadence, deal velocity vs stage average, stakeholder engagement breadth, competitive signals. Every factor documented.",
          example: `"Why is the Acme deal at risk? What should I do this week?"`,
        },
        {
          code: "qualify_lead",
          heading: "Composite gatekeeper",
          body:
            "Structured qualification against your ICP criteria with explicit reasoning. Consistent, repeatable, auditable. No more MQL/SQL committee.",
          example: `"Is Sophie Durand from TechVision worth pursuing for our Series A ICP?"`,
        },
      ],
    },
    supervision: {
      eyebrow: "Supervision console",
      title: "You don't operate the CRM. You supervise sensitive decisions.",
      lede: "5 minutes a day. Not more.",
      items: [
        { heading: "Queue view", body: "All Orange/Red actions pending your review." },
        { heading: "Action detail", body: "Full context + agent reasoning + proposed action." },
        { heading: "One click", body: "Approve, reject, or ask the agent to revise." },
        {
          heading: "Audit trail",
          body: "Every decision logged with your identity, timestamp, and reasoning.",
        },
      ],
      footer: "The console is not the product. The MCP server is.",
    },
    compliance: {
      eyebrow: "Security & compliance",
      items: [
        { heading: "EU-hosted", body: "Frankfurt, DigitalOcean FRA1" },
        {
          heading: "AI Act art. 14",
          body:
            "Immutable HMAC-signed audit log, 7-year retention, HITL 3-class policy",
        },
        { heading: "GDPR art. 15", body: "/audit/my-data export endpoint, native" },
        {
          heading: "LLM-agnostic",
          body:
            "No fine-tuning on your data. No retention by LLM providers.",
        },
        { heading: "Kill-switch", body: "Tenant-level, propagation under 1 second" },
      ],
    },
    pricing: {
      eyebrow: "Pricing (beta)",
      title: "Free up to 500 MCP calls/day during beta.",
      body:
        "Overage: pay-per-use at €0.15/credit. No seat pricing. No per-user lock-in. Post-beta pricing: usage-based model. Announced 30 days before beta closes.",
    },
    ctaFinal: {
      title: "Ship your agent's opening CRM call.",
      lede: "Install the MCP or request a live walkthrough.",
      primary: { label: "Install the MCP in 5 min", href: "#quickstart" },
      secondary: { label: "Try the live sandbox", href: "#quickstart" },
    },
    docsLink: "Full docs at docs.symbioz.ai/mcp",
    faq: [
      {
        question: "How do I connect my AI agent to SymbiozAI via MCP?",
        answer:
          "Run npx @symbiozai/mcp-setup. The CLI auto-configures your MCP client (Claude Code, Cursor, Cline, Goose, Continue.dev). Connection takes under 5 minutes.",
      },
      {
        question: "How many MCP tools does SymbiozAI expose?",
        answer:
          "35 MCP missions covering the full Sales cycle: acquisition, qualification, enrichment, negotiation, closing. 7 live in production as of April 2026; 28 shipping Phase 2.",
      },
      {
        question: "Does SymbiozAI's MCP server work with Anthropic's MCP SDK?",
        answer:
          "Yes. SymbiozAI implements the official MCP specification and is compatible with any MCP-compliant client using stdio or HTTP+SSE transports.",
      },
      {
        question: "Can I test the MCP integration before paying?",
        answer:
          "Yes. The public sandbox at /playground gives you a demo tenant Acme Corp with 200 prospects, rate-limited at 20 calls/IP/day, no signup.",
      },
      {
        question: "What is the pricing model for MCP calls?",
        answer:
          "Free up to 500 MCP calls/day during beta. Overage pay-per-use at €0.15/credit.",
      },
      {
        question: "Which transports are supported?",
        answer:
          "stdio for local MCP clients (Claude Code, Cursor). HTTP+SSE for remote and hosted agents.",
      },
      {
        question:
          "How is SymbiozAI different from CRMs that have added an MCP server (Octolane, HubSpot, Zoho, Salesforce Headless 360)?",
        answer:
          "Those CRMs added an MCP server as a feature layered on top of their existing human-facing UI. SymbiozAI is MCP-only: the MCP server is the primary interface, there is no alternative UI to operate the CRM. Supervision happens through a lightweight console for sensitive actions — not as a daily operating surface.",
      },
      {
        question: "How does authentication work?",
        answer:
          "OAuth 2.1 with PKCE for end-users. Service tokens for backend-to-backend. JWT signed by SymbiozAI auth server.",
      },
      {
        question: "Can I self-host the SymbiozAI MCP server?",
        answer:
          "The MCP server is a managed service at api.symbioz.ai/mcp. Enterprise self-hosted is on the Phase 3 roadmap.",
      },
      {
        question: "How does SymbiozAI ensure AI Act compliance?",
        answer:
          "All MCP calls are logged in an immutable HMAC-signed audit log retained 7 years. Human-in-the-loop policy classifies actions Green (auto), Orange (review), Red (required approval).",
      },
    ] as FAQItem[],
  },
  fr: {
    meta: {
      title: "Le CRM MCP-only | Serveur MCP SymbiozAI",
      description:
        "SymbiozAI expose 35 missions CRM via MCP. Headless par design. Connectez Claude Code, Cursor ou tout agent compatible MCP. Installation en moins de 5 minutes.",
    },
    hero: {
      eyebrow: "Serveur MCP",
      headline: "Le CRM MCP-only.",
      subhead:
        "Headless par design. Piloté par votre agent IA via MCP. Claude Code, Cursor, GPT — tout est natif.",
      primary: { label: "Installer le MCP en 5 min", href: "#quickstart" },
      secondary: { label: "Tester la sandbox", href: "#quickstart" },
      tertiary: { label: "Réserver une démo", href: "/fr/contact" },
    },
    quickstart: {
      eyebrow: "Quickstart 5 minutes",
      title: "Trois étapes. Tout agent compatible MCP.",
      steps: [
        {
          heading: "Étape 1 — Lancer l'installeur",
          body:
            "Le CLI détecte votre client MCP (Claude Code, Cursor, Cline, Goose, Continue.dev) et auto-configure la connexion. Pas de gestion de clé API. Pas de JSON à éditer manuellement.",
          code: "npx @symbiozai/mcp-setup",
        },
        {
          heading: "Étape 2 — Connecter dans votre agent",
          body:
            "Votre agent a désormais accès à 35 missions MCP SymbiozAI. Pas de plugin. Pas de SDK. Spec MCP standard.",
        },
        {
          heading: "Étape 3 — Lancer votre première mission",
          body:
            "Votre agent appelle start_targeting. Résultats dans votre pipeline en moins de 60 secondes.",
          code: `« Cible 50 fondateurs en SaaS B2B, Series A, France, depuis Claude Code. »`,
        },
      ],
    },
    agentConfigs: {
      eyebrow: "Agents compatibles",
      title: "Spec MCP officielle. Tout client compatible se connecte nativement.",
      lede:
        "SymbiozAI implémente les transports stdio et HTTP+SSE. Ci-dessous, des snippets drop-in pour les clients les plus courants.",
      clients: [
        {
          name: "Claude Code",
          label: "claude_desktop_config.json",
          code: `{
  "mcpServers": {
    "symbiozai": {
      "command": "npx",
      "args": ["@symbiozai/mcp-setup", "--mode", "stdio"],
      "env": { "SYMBIOZAI_TOKEN": "your-token" }
    }
  }
}`,
        },
        {
          name: "Cursor",
          label: "~/.cursor/mcp.json",
          code: `{
  "symbiozai": {
    "url": "https://api.symbioz.ai/mcp/sse",
    "headers": { "Authorization": "Bearer your-token" }
  }
}`,
        },
        {
          name: "Cline · Goose · Continue.dev",
          label: "shell",
          code: `# Auto-détecte le client et applique le format de config
npx @symbiozai/mcp-setup`,
        },
      ],
    },
    missions: {
      eyebrow: "35 missions MCP",
      title: "Chaque mission est conçue pour être appelée par un language model.",
      lede:
        "Pas de devinette — chaque mission a un schéma, un prompt d'exemple et un format de sortie attendu.",
      phase2Note:
        "7 missions supplémentaires en Phase 2 : score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
    },
    wrapFirst: {
      eyebrow: "Architecture wrap-first",
      title: "SymbiozAI ne reconstruit pas les fournisseurs. Il les wrappe.",
      lede:
        "Apollo, BrightData, Hunter, Unipile, LinkedIn, Pappers, INSEE, Crunchbase et 15 autres — tous disponibles via deux missions MCP d'enrichissement. Votre agent appelle enrich_contact. SymbiozAI décide quel fournisseur interroger, agrège les résultats, déduplique et retourne une réponse structurée.",
      result: "Vous obtenez 23 fournisseurs. Vous gérez un seul endpoint.",
      layers: [
        { layer: "Enrichissement contact", providers: "Apollo, BrightData, Hunter, Clearbit, Lusha" },
        { layer: "Enrichissement société", providers: "Crunchbase, Pappers, INSEE, Clearbit, BrightData" },
        { layer: "Signaux d'intention", providers: "6sense, Bombora (via BrightData), données levées" },
        { layer: "Communication", providers: "Unipile (DM LinkedIn, sync email)" },
        { layer: "Social", providers: "LinkedIn (profils, connexions, activité)" },
        { layer: "Registre", providers: "Pappers (France), INSEE (France), Crunchbase (global)" },
      ],
      layerLabel: "Couche",
      providersLabel: "Fournisseurs",
    },
    hitl: {
      eyebrow: "Politique HITL 3 classes",
      title: "Chaque mission a une classe. Chaque classe a un comportement.",
      classes: [
        {
          tone: "green" as const,
          title: "Vert",
          behavior: "Exécution automatique. Aucune confirmation humaine.",
          examples: "Enrichissement, lecture pipeline, recherche contact, score santé deal",
        },
        {
          tone: "orange" as const,
          title: "Orange",
          behavior: "Exécute en dry-run d'abord. L'agent propose, l'humain confirme dans la console.",
          examples: "Brouillons email, updates deal, prises de rendez-vous, création contact",
        },
        {
          tone: "red" as const,
          title: "Rouge",
          behavior: "Bloqué jusqu'à approbation humaine explicite.",
          examples: "Envoi email bulk, lancement séquence, kill-switch",
        },
      ],
      footer:
        "Les actions Vertes s'accumulent silencieusement et correctement. Les Oranges vous gardent informé sans requérir une attention constante. Les Rouges ne se produisent jamais par accident. La politique par défaut est conservative. Vous pouvez ajuster les seuils par catégorie de mission depuis votre config tenant.",
      behaviorLabel: "Comportement",
      examplesLabel: "Exemples",
    },
    audit: {
      eyebrow: "Audit log WORM",
      title: "Chaque action, chaque appel agent, chaque décision humaine — journalisé.",
      bullets: [
        { heading: "Append-only", body: "Aucun enregistrement ne peut être modifié ou supprimé" },
        {
          heading: "Signé HMAC",
          body: "Chaque entrée cryptographiquement chaînée à la précédente",
        },
        {
          heading: "Rétention 7 ans",
          body: "Conforme AI Act article 14 et loi comptable française",
        },
        {
          heading: "Requêtable",
          body: "GET /audit/my-data retourne l'export complet en JSON structuré",
        },
        {
          heading: "Attribution humaine",
          body: "Chaque décision humaine journalisée avec identité user et timestamp",
        },
      ],
    },
    differentiators: {
      eyebrow: "Trois différenciateurs",
      title: "Aucun autre CRM MCP n'expose ces trois missions.",
      items: [
        {
          code: "analyze_communication_style",
          heading: "Profilage DISC",
          body:
            "Votre agent lit les données disponibles (LinkedIn, historique email, transcripts de réunions) et produit un profil DISC avec guidance de rédaction actionnable. Écrit à un profil D différemment qu'à un I. Le raisonnement est montré, pas caché.",
          example: `« Analyse le style de communication de Thomas Martin avant mon call demain. »`,
        },
        {
          code: "assess_deal_health",
          heading: "Score multi-signal",
          body:
            "Score 0-100 construit sur : taux de réponse email, cadence de réunions, vélocité deal vs moyenne d'étape, largeur d'engagement des stakeholders, signaux concurrentiels. Chaque facteur documenté.",
          example: `« Pourquoi le deal Acme est-il à risque ? Qu'est-ce que je fais cette semaine ? »`,
        },
        {
          code: "qualify_lead",
          heading: "Gatekeeper composite",
          body:
            "Qualification structurée contre vos critères ICP avec raisonnement explicite. Cohérent, reproductible, auditable. Fini le comité MQL/SQL.",
          example: `« Sophie Durand de TechVision vaut-elle la peine pour notre ICP Series A ? »`,
        },
      ],
    },
    supervision: {
      eyebrow: "Console de supervision",
      title: "Vous n'opérez pas le CRM. Vous supervisez les décisions sensibles.",
      lede: "5 minutes par jour. Pas plus.",
      items: [
        { heading: "Vue file d'attente", body: "Toutes les actions Orange/Rouge en attente de revue." },
        { heading: "Détail d'action", body: "Contexte complet + raisonnement agent + action proposée." },
        { heading: "Un clic", body: "Approuver, rejeter, ou demander à l'agent de réviser." },
        {
          heading: "Piste d'audit",
          body: "Chaque décision journalisée avec votre identité, timestamp, raisonnement.",
        },
      ],
      footer: "La console n'est pas le produit. Le serveur MCP l'est.",
    },
    compliance: {
      eyebrow: "Sécurité & conformité",
      items: [
        { heading: "Hébergé en EU", body: "Frankfurt, DigitalOcean FRA1" },
        {
          heading: "AI Act art. 14",
          body:
            "Audit log immuable signé HMAC, rétention 7 ans, politique HITL 3 classes",
        },
        { heading: "RGPD art. 15", body: "Endpoint /audit/my-data, natif" },
        {
          heading: "LLM-agnostic",
          body:
            "Pas de fine-tuning sur vos données. Pas de rétention par les providers LLM.",
        },
        { heading: "Kill-switch", body: "Tenant-level, propagation en moins d'1 seconde" },
      ],
    },
    pricing: {
      eyebrow: "Pricing (beta)",
      title: "Gratuit jusqu'à 500 appels MCP/jour pendant la beta.",
      body:
        "Dépassement : pay-per-use à 0,15 €/crédit. Pas de prix par siège. Pas de lock-in par utilisateur. Pricing post-beta : modèle usage-based. Annoncé 30 jours avant la fermeture de la beta.",
    },
    ctaFinal: {
      title: "Livrez l'appel CRM d'ouverture de votre agent.",
      lede: "Installez le MCP ou réservez une démo guidée.",
      primary: { label: "Installer le MCP en 5 min", href: "#quickstart" },
      secondary: { label: "Tester la sandbox", href: "#quickstart" },
    },
    docsLink: "Documentation complète sur docs.symbioz.ai/mcp",
    faq: [
      {
        question: "Comment connecter mon agent IA à SymbiozAI via MCP ?",
        answer:
          "Lancez npx @symbiozai/mcp-setup. Le CLI auto-configure votre client MCP (Claude Code, Cursor, Cline, Goose, Continue.dev). Connexion en moins de 5 minutes.",
      },
      {
        question: "Combien d'outils MCP expose SymbiozAI ?",
        answer:
          "35 missions MCP couvrant le cycle Sales complet : acquisition, qualification, enrichissement, négociation, closing. 7 en production depuis avril 2026 ; 28 en Phase 2.",
      },
      {
        question: "Le serveur MCP SymbiozAI fonctionne-t-il avec le SDK MCP d'Anthropic ?",
        answer:
          "Oui. SymbiozAI implémente la spécification MCP officielle et est compatible avec tout client MCP-compliant en stdio ou HTTP+SSE.",
      },
      {
        question: "Puis-je tester l'intégration MCP avant de payer ?",
        answer:
          "Oui. La sandbox publique sur /playground vous donne un tenant démo Acme Corp avec 200 prospects, rate-limité à 20 appels/IP/jour, sans inscription.",
      },
      {
        question: "Quel est le modèle de pricing pour les appels MCP ?",
        answer:
          "Gratuit jusqu'à 500 appels MCP/jour pendant la beta. Dépassement pay-per-use à 0,15 €/crédit.",
      },
      {
        question: "Quels transports sont supportés ?",
        answer:
          "stdio pour les clients MCP locaux (Claude Code, Cursor). HTTP+SSE pour les agents remote et hébergés.",
      },
      {
        question:
          "Quelle différence avec les CRM qui ont ajouté un serveur MCP (Octolane, HubSpot, Zoho, Salesforce Headless 360) ?",
        answer:
          "Ces CRM ont ajouté un serveur MCP comme feature par-dessus leur UI humaine existante. SymbiozAI est MCP-only : le serveur MCP est l'interface principale, il n'existe pas d'UI alternative pour opérer le CRM. La supervision passe par une console légère pour actions sensibles — pas comme surface opérationnelle quotidienne.",
      },
      {
        question: "Comment fonctionne l'authentification ?",
        answer:
          "OAuth 2.1 avec PKCE pour les end-users. Service tokens pour backend-to-backend. JWT signé par le serveur auth SymbiozAI.",
      },
      {
        question: "Puis-je self-hoster le serveur MCP SymbiozAI ?",
        answer:
          "Le serveur MCP est un service managé sur api.symbioz.ai/mcp. Le self-hosted entreprise est sur la roadmap Phase 3.",
      },
      {
        question: "Comment SymbiozAI garantit-il la conformité AI Act ?",
        answer:
          "Tous les appels MCP sont journalisés dans un audit log immuable signé HMAC, rétention 7 ans. La politique Human-in-the-loop classifie les actions Vert (auto), Orange (revue), Rouge (approbation requise).",
      },
    ] as FAQItem[],
  },
}
