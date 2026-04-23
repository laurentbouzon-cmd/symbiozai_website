/**
 * /mcp page copy: post-pivot MCP-only site (2026-04-23).
 * Source of truth: symbiozai-cos/cos-data/content/site-copy/2026-04-23-site-copy-post-pivot-mcp.md
 *   Section "PAGE /mcp YC-grade - v2 bloc par bloc" (appended 2026-04-23).
 *
 * v2 upgrade (YC-grade, dev-tools premium register):
 *   - Sections S2..S13 refreshed block-by-block (hero S1 locked, unchanged).
 *   - Canonical structure per section: eyebrow + H2 + description + content.
 *   - Assertive H2s (Linear / Stripe pattern), specs-inline (Vercel), code-first
 *     (Resend), proof points (Cal.com).
 *
 * R11-compliant: no primacy claims in rendered copy.
 *   Documented exceptions:
 *   - "premier appel" (FR quickstart title): ordinal temporal marker ("your
 *     first call"), same pattern as Stripe "your first payment" / Resend
 *     "send your first email". Not a category primacy claim.
 *   - "no other MCP CRM exposes" (S7 differentiators): factual absence-of-
 *     feature statement about documented competitors, not a category primacy
 *     claim.
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
        { name: "export_my_data", description: "GDPR art. 15 native. Export all your data on demand.", hitl: "green" },
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
        { name: "export_my_data", description: "RGPD art. 15 natif. Exporter toutes vos données à la demande.", hitl: "green" },
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
    // S1 - HERO: LOCKED (do not modify, directive Laurent).
    hero: {
      eyebrow: "MCP Server",
      headline: "The MCP-only CRM.",
      subhead:
        "Headless by design. Operated by your AI agent via MCP. Claude Code, Cursor, GPT. It's all native.",
      primary: { label: "Install the MCP in 5 min", href: "#quickstart" },
      secondary: { label: "Try the live sandbox", href: "#quickstart" },
      tertiary: { label: "Book a meeting", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
    },
    // S2 - QUICKSTART (v2: Stripe pattern, step 3 natural-language prompt).
    quickstart: {
      eyebrow: "QUICKSTART",
      title: "Ship your first CRM call in 5 minutes.",
      lede:
        "One command. The CLI detects your client and configures the connection. No API key gymnastics. No JSON to edit by hand.",
      steps: [
        {
          heading: "Step 1",
          body:
            "Auto-detects Claude Code, Cursor, Cline, Goose, Continue.dev. Writes the config. Done.",
          code: "npx @symbiozai/mcp-setup",
        },
        {
          heading: "Step 2",
          body:
            "Your agent now has 35 SymbiozAI MCP missions available. No plugin. No SDK. Standard MCP spec.",
          code: `"What missions does SymbiozAI expose?"`,
        },
        {
          heading: "Step 3",
          body:
            "Run your opening mission in natural language. Your agent calls start_targeting. Pipeline populated. Under 60 seconds.",
          code: `"Target 50 Series A SaaS founders in France using Claude Code."`,
        },
      ],
    },
    // S3 - AGENT CONFIGS (v2: restart instructions per client).
    agentConfigs: {
      eyebrow: "AGENT CONFIGS",
      title: "Drop-in config for your agent.",
      lede:
        "SymbiozAI implements stdio and HTTP+SSE transports. Copy-paste the snippet for your client. That is all.",
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
          note:
            "Add this to your claude_desktop_config.json. Restart Claude Code. SymbiozAI appears in your tool list.",
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
          note:
            "HTTP+SSE transport. Token from your SymbiozAI dashboard. Cursor picks it up on next launch.",
        },
        {
          name: "Cline · Goose · Continue.dev",
          label: "shell",
          code: `# Auto-detects the client and writes the correct config format
npx @symbiozai/mcp-setup`,
          note:
            "The installer reads your environment, detects which client you run, and writes the correct config format automatically.",
        },
      ],
    },
    // S4 - 35 MISSIONS (v2: unchanged catalog, description refreshed).
    missions: {
      eyebrow: "MISSION CATALOG",
      title: "35 missions. Full sales cycle.",
      lede:
        "Every mission is designed to be called by a language model in natural language. Each has a schema, an example prompt, and an expected output. No guesswork.",
      phase2Note:
        "Phase 2 - 7 missions coming: score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
    },
    // S5 - WRAP-FIRST ARCHITECTURE (v2: "23 providers. One endpoint.").
    wrapFirst: {
      eyebrow: "ARCHITECTURE",
      title: "23 providers. One endpoint.",
      lede:
        "SymbiozAI does not rebuild data sources. It wraps them. Your agent calls one mission. SymbiozAI picks the right provider, aggregates, deduplicates, and returns a structured response.",
      result: "23 providers. 2 enrichment missions. No API key per provider. No aggregation code to maintain.",
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
    // S6 - HITL 3 CLASSES (v2: policy-as-code JSON block).
    hitl: {
      eyebrow: "HUMAN-IN-THE-LOOP",
      title: "Every action has a class. Every class has a behavior.",
      lede:
        "The HITL policy is policy-as-code. Every mission is assigned a class at deploy time. You configure thresholds. The system enforces them. No ad-hoc overrides.",
      classes: [
        {
          tone: "green" as const,
          title: "Green",
          behavior: "Runs automatically. No confirmation needed. The agent reads, enriches, qualifies, and scores without touching your queue.",
          examples: "enrich_contact, qualify_lead, assess_deal_health, get_pipeline_snapshot, analyze_communication_style",
        },
        {
          tone: "orange" as const,
          title: "Orange",
          behavior: "Agent proposes. You confirm. The action runs as dry-run first. You see the proposed output in your queue. One click to approve or reject. Nothing ships until you say so.",
          examples: "draft_email_personalized, update_deal, book_meeting, create_contact",
        },
        {
          tone: "red" as const,
          title: "Red",
          behavior: "Blocked until you approve. The action does not execute until you give explicit approval. No queuing, no it-ran-while-you-slept.",
          examples: "send_email, kill_switch, bulk sequence launch",
        },
      ],
      policyLabel: "Policy-as-code",
      policyCode: `{
  "mission": "draft_email_personalized",
  "hitl_class": "orange",
  "auto_approve_threshold": null,
  "requires_human_id": true
}`,
      footer:
        "Default policy is conservative. Tune per mission category from your tenant config. Every change is logged. AI Act article 14 compliance is structural, not a checkbox. The HITL classes are the article-14 implementation.",
      behaviorLabel: "Behavior",
      examplesLabel: "Examples",
    },
    // S7 - 3 DIFFERENTIATORS (v2: expected outputs added).
    differentiators: {
      eyebrow: "DIFFERENTIATORS",
      title: "Three missions no other MCP CRM exposes.",
      lede:
        "These are not integrations. They are proprietary missions built on top of your contact and deal data, running inside SymbiozAI's reasoning layer.",
      examplePromptLabel: "Example prompt",
      expectedOutputLabel: "Expected output",
      items: [
        {
          code: "analyze_communication_style",
          heading: "DISC profiling",
          body:
            "Your agent reads available data: LinkedIn activity, email history, meeting transcripts. It produces a DISC profile with writing guidance. You write to a Dominant differently than to an Influential. The reasoning is exposed, not hidden in a model.",
          example: `"Analyze Thomas Martin's communication style before my call tomorrow."`,
          expected:
            "DISC profile (D/I/S/C scores), preferred communication style, email tone recommendations, topics to avoid.",
        },
        {
          code: "assess_deal_health",
          heading: "Multi-signal score",
          body:
            "Every deal scored 0-100. Five signal sources: email reply rate, meeting cadence, deal velocity vs stage average, stakeholder engagement breadth, competitive signals. Every factor documented. No blackbox.",
          example: `"Why is the Acme deal at risk? What should I do this week?"`,
          expected:
            "Score 0-100, factor breakdown, recommended next actions, urgency classification.",
        },
        {
          code: "qualify_lead",
          heading: "Composite gatekeeper",
          body:
            "Structured qualification against your ICP criteria with explicit reasoning. Consistent across every rep. Repeatable, auditable, no MQL/SQL committee.",
          example: `"Is Sophie Durand from TechVision worth pursuing for our Series A ICP?"`,
          expected:
            "Qualified / not qualified, ICP match score, blocking factors, recommended next step.",
        },
      ],
    },
    // S8 - SUPERVISION (v2: "5 decisions a day" anchored).
    supervision: {
      eyebrow: "SUPERVISION",
      title: "You don't operate the CRM. You supervise sensitive decisions.",
      lede:
        "5 minutes a day. A queue of Orange and Red actions. You approve, reject, or ask the agent to revise. Everything else runs automatically.",
      items: [
        {
          heading: "What's in the queue",
          body:
            "Every Orange action lands here before execution. Every Red action is blocked here until you act. The queue is sorted by urgency and mission type.",
        },
        {
          heading: "Action detail",
          body:
            "For each queued action: full context, the agent's reasoning, the proposed output, and the impact if approved or rejected. You have what you need to decide.",
        },
        {
          heading: "One click",
          body:
            "Approve. Reject. Ask the agent to revise with a note. The agent acts on your decision within seconds.",
        },
        {
          heading: "Audit trail",
          body:
            "Every human decision is logged: your identity, the timestamp, your reasoning if you left a note. Immutable. Part of your AI Act article 14 compliance record.",
        },
      ],
      footer:
        "The console is not the product. The MCP server is. The console is the control room for the 5 decisions a day that require you.",
    },
    // S9 - COMPLIANCE (v2: "Four facts. All verifiable.").
    compliance: {
      eyebrow: "COMPLIANCE",
      title: "EU-hosted. AI Act native. GDPR built-in.",
      lede: "Four facts. All verifiable. No marketing claims.",
      items: [
        {
          heading: "EU-hosted",
          body:
            "Infrastructure in Frankfurt (DigitalOcean FRA1). Your data does not leave the EU. No exceptions.",
        },
        {
          heading: "AI Act art. 14",
          body:
            "The HITL 3-class policy is the article-14 implementation. Every sensitive action goes through a human gate. Immutable audit log. 7-year retention. Kill-switch propagation under 1 second.",
        },
        {
          heading: "GDPR art. 15",
          body:
            "GET /audit/my-data - export all your data on demand. No locked-in data. No support ticket to file.",
        },
        {
          heading: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-provider. No fine-tuning on your data. No data retention by LLM providers. You can swap the underlying model without migrating your data.",
        },
      ],
    },
    // S10 - AUDIT LOG WORM (v2: curl example + "break-glass" named).
    audit: {
      eyebrow: "AUDIT LOG",
      title: "Every action logged. Nothing editable. Nothing deletable.",
      lede:
        "HMAC-SHA256 chained entries. 7-year retention. Break-glass access via audit_admin. Every MCP call, every human decision, every kill-switch event - in the log.",
      bullets: [
        {
          heading: "Append-only",
          body:
            "No record can be modified after creation. No delete endpoint exists. Audit integrity is structural.",
        },
        {
          heading: "HMAC-chained",
          body:
            "Each log entry contains the HMAC-SHA256 hash of the previous entry. Tampering with any entry breaks the chain. Verification is programmatic.",
        },
        {
          heading: "7-year retention",
          body:
            "Compliant with AI Act article 14 and French commercial accounting law. Log rotation does not delete - it archives.",
        },
        {
          heading: "Queryable",
          body:
            "GET /audit/my-data returns your full export in structured JSON. Filter by contact, deal, agent session, or date range.",
        },
        {
          heading: "Human-attributed",
          body:
            "Every human approval, rejection, or note is stored with the authenticated user's identity and timestamp. You know who approved what, when, and why.",
        },
      ],
      exampleCode: `# Export your audit log
curl -H "Authorization: Bearer $TOKEN" \\
  https://api.symbioz.ai/audit/my-data`,
      exampleCaption: "Export your audit log",
    },
    // S11 - PRICING (v2: "What counts as a call" added).
    pricing: {
      eyebrow: "PRICING",
      title: "Free during beta. Usage-based after.",
      lede:
        "No seat pricing. No annual contract. No per-user lock-in. You pay for what your agent calls.",
      blocks: [
        {
          heading: "Beta - free now",
          body:
            "500 MCP calls/day at no cost. No credit card required to start. The limit resets every 24 hours. Overage: €0.15/credit pay-per-use. Top up from your dashboard when needed.",
        },
        {
          heading: "Post-beta",
          body:
            "Usage-based pricing. The model will be announced 30 days before beta closes. No retroactive changes to calls already made.",
        },
        {
          heading: "What counts as a call",
          body:
            "One MCP mission call = one credit. A start_targeting that returns 50 prospects = 1 credit. An enrich_contact = 1 credit. LLM inference within a mission is included.",
        },
      ],
      footerNote: "Questions about pricing for larger volumes:",
      footerLinkLabel: "Book a meeting",
      footerLinkHref: "https://calendly.com/laurent-bouzon-symbioz/30min",
    },
    // S13 - CTA FINAL (v2: "Connect your agent. Now." injunction).
    ctaFinal: {
      eyebrow: "GET STARTED",
      title: "Connect your agent. Now.",
      lede: "Five minutes. One command. 35 missions available.",
      primary: { label: "Install the MCP in 5 min", href: "#quickstart" },
      secondary: { label: "Try the live sandbox", href: "#quickstart" },
      walkthroughNote: "Or request a live walkthrough:",
      walkthroughLinkLabel: "Book a meeting",
      walkthroughLinkHref: "https://calendly.com/laurent-bouzon-symbioz/30min",
    },
    docsLink: "Full docs at docs.symbioz.ai/mcp",
    // S12 - FAQ (v2: expanded to 10 Q/A, adds data cancel + token rotation).
    faq: [
      {
        question: "How do I connect Claude Code to SymbiozAI?",
        answer:
          "Run npx @symbiozai/mcp-setup. The CLI auto-configures the connection for Claude Code, Cursor, Cline, Goose, or Continue.dev. Setup takes under 5 minutes.",
      },
      {
        question: "How many MCP missions are live today?",
        answer:
          "28 missions are in production as of April 2026. Phase 2 ships 7 more: score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
      },
      {
        question: "Which transports are supported?",
        answer:
          "stdio for local clients (Claude Code, Cursor). HTTP+SSE for remote and hosted agents. Both are part of the official MCP specification.",
      },
      {
        question: "Does it work with Anthropic's MCP SDK?",
        answer:
          "Yes. SymbiozAI implements the official MCP spec. Any MCP-compliant client using stdio or HTTP+SSE connects natively.",
      },
      {
        question: "Can I test before paying?",
        answer:
          "Yes. The public sandbox at /playground gives you a demo tenant with 200 prospects, rate-limited to 20 calls/IP/day. No signup required.",
      },
      {
        question: "How does authentication work?",
        answer:
          "OAuth 2.1 with PKCE for end-users. Service tokens for backend-to-backend. JWT signed by the SymbiozAI auth server. Token rotation is automatic.",
      },
      {
        question: "How is this different from Octolane?",
        answer:
          "Octolane runs an MCP server alongside their standard SaaS UI. SymbiozAI is MCP-only: the MCP server is the primary operating interface. There is no alternative UI for day-to-day CRM operations.",
      },
      {
        question: "Can I self-host the MCP server?",
        answer:
          "The MCP server is a managed service at api.symbioz.ai/mcp. Enterprise self-hosting is on the Phase 3 roadmap.",
      },
      {
        question: "How does AI Act compliance work technically?",
        answer:
          "Every MCP call is logged in an immutable HMAC-chained audit log retained 7 years. The 3-class HITL policy (Green/Orange/Red) implements article 14 human oversight requirements. The kill-switch propagates tenant-wide in under 1 second.",
      },
      {
        question: "What happens to my data if I cancel?",
        answer:
          "Export via GET /audit/my-data or the export_my_data MCP mission at any time. Data is retained 30 days post-cancellation, then deleted. You will receive a deletion confirmation.",
      },
    ] as FAQItem[],
  },
  fr: {
    meta: {
      title: "Le CRM MCP-only | Serveur MCP SymbiozAI",
      description:
        "SymbiozAI expose 35 missions CRM via MCP. Headless par design. Connectez Claude Code, Cursor ou tout agent compatible MCP. Installation en moins de 5 minutes.",
    },
    // S1 - HERO: VERROUILLE (ne pas modifier, directive Laurent).
    hero: {
      eyebrow: "Serveur MCP",
      headline: "Le CRM MCP-only.",
      subhead:
        "Headless par design. Piloté par votre agent IA via MCP. Claude Code, Cursor, GPT. Tout est natif.",
      primary: { label: "Installer le MCP en 5 min", href: "#quickstart" },
      secondary: { label: "Tester la sandbox", href: "#quickstart" },
      tertiary: { label: "Prendre rendez-vous", href: "https://calendly.com/laurent-bouzon-symbioz/30min", external: true },
    },
    // S2 - QUICKSTART (v2: "premier appel" = ordinal temporel Stripe-pattern, exception R11 legitime).
    quickstart: {
      eyebrow: "QUICKSTART",
      title: "Premier appel CRM en 5 minutes.",
      lede:
        "Une commande. Le CLI détecte votre client et configure la connexion. Pas de gestion de clé API. Pas de JSON à éditer à la main.",
      steps: [
        {
          heading: "Etape 1",
          body:
            "Auto-détecte Claude Code, Cursor, Cline, Goose, Continue.dev. Ecrit la config. C'est fait.",
          code: "npx @symbiozai/mcp-setup",
        },
        {
          heading: "Etape 2",
          body:
            "Votre agent a maintenant accès à 35 missions MCP SymbiozAI. Pas de plugin. Pas de SDK. Spec MCP standard.",
          code: `« Quelles missions SymbiozAI expose-t-il ? »`,
        },
        {
          heading: "Etape 3",
          body:
            "Lancez votre opening mission en langage naturel. Votre agent appelle start_targeting. Pipeline alimenté. En moins de 60 secondes.",
          code: `« Cible 50 fondateurs SaaS Series A en France depuis Claude Code. »`,
        },
      ],
    },
    // S3 - CONFIGS AGENTS (v2: instructions de redémarrage par client).
    agentConfigs: {
      eyebrow: "CONFIGS AGENTS",
      title: "Config prête à coller pour votre agent.",
      lede:
        "SymbiozAI implémente les transports stdio et HTTP+SSE. Copiez le snippet pour votre client. C'est tout.",
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
          note:
            "Ajoutez dans votre claude_desktop_config.json. Relancez Claude Code. SymbiozAI apparaît dans votre liste d'outils.",
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
          note:
            "Transport HTTP+SSE. Token depuis votre dashboard SymbiozAI. Cursor le prend au prochain lancement.",
        },
        {
          name: "Cline · Goose · Continue.dev",
          label: "shell",
          code: `# Auto-détecte le client et écrit le format de config correct
npx @symbiozai/mcp-setup`,
          note:
            "L'installeur lit votre environnement, détecte le client que vous utilisez et écrit le format de config correct automatiquement.",
        },
      ],
    },
    // S4 - 35 MISSIONS (v2: catalogue inchangé, description rafraîchie).
    missions: {
      eyebrow: "CATALOGUE DE MISSIONS",
      title: "35 missions. Cycle de vente complet.",
      lede:
        "Chaque mission est conçue pour être appelée par un language model en langage naturel. Chacune a un schéma, un prompt d'exemple et un format de sortie attendu. Pas de devinette.",
      phase2Note:
        "Phase 2 - 7 missions à venir : score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
    },
    // S5 - WRAP-FIRST ARCHITECTURE (v2: "23 fournisseurs. Un seul endpoint.").
    wrapFirst: {
      eyebrow: "ARCHITECTURE",
      title: "23 fournisseurs. Un seul endpoint.",
      lede:
        "SymbiozAI ne reconstruit pas les sources de données. Il les wrappe. Votre agent appelle une mission. SymbiozAI choisit le bon fournisseur, agrège, déduplique et retourne une réponse structurée.",
      result: "23 fournisseurs. 2 missions d'enrichissement. Pas de clé API par fournisseur. Pas de code d'agrégation à maintenir.",
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
    // S6 - HITL 3 CLASSES (v2: policy-as-code JSON block).
    hitl: {
      eyebrow: "SUPERVISION HUMAINE",
      title: "Chaque action a une classe. Chaque classe a un comportement.",
      lede:
        "La politique HITL est du code. Chaque mission se voit attribuer une classe au déploiement. Vous configurez les seuils. Le système les applique. Pas d'overrides ad-hoc.",
      classes: [
        {
          tone: "green" as const,
          title: "Vert",
          behavior: "Exécution automatique. Aucune confirmation requise. L'agent lit, enrichit, qualifie et score sans toucher à votre file.",
          examples: "enrich_contact, qualify_lead, assess_deal_health, get_pipeline_snapshot, analyze_communication_style",
        },
        {
          tone: "orange" as const,
          title: "Orange",
          behavior: "L'agent propose. Vous confirmez. L'action s'exécute d'abord en dry-run. Vous voyez le résultat proposé dans votre file. Un clic pour approuver ou rejeter. Rien n'est envoyé avant votre feu vert.",
          examples: "draft_email_personalized, update_deal, book_meeting, create_contact",
        },
        {
          tone: "red" as const,
          title: "Rouge",
          behavior: "Bloqué jusqu'à votre approbation explicite. L'action ne s'exécute pas jusqu'à ce que vous donniez une approbation explicite. Pas de file, pas de ca-s'est-lancé-pendant-votre-sommeil.",
          examples: "send_email, kill_switch, lancement séquence bulk",
        },
      ],
      policyLabel: "Policy-as-code",
      policyCode: `{
  "mission": "draft_email_personalized",
  "hitl_class": "orange",
  "auto_approve_threshold": null,
  "requires_human_id": true
}`,
      footer:
        "La politique par défaut est conservative. Ajustez par catégorie de mission depuis votre config tenant. Chaque changement est journalisé. La conformité AI Act article 14 est structurelle, pas une case à cocher. Les classes HITL sont l'implémentation de l'article 14.",
      behaviorLabel: "Comportement",
      examplesLabel: "Exemples",
    },
    // S7 - 3 DIFFERENCIATEURS (v2: sorties attendues ajoutées).
    differentiators: {
      eyebrow: "DIFFERENCIATEURS",
      title: "Trois missions qu'aucun autre CRM MCP n'expose.",
      lede:
        "Ce ne sont pas des intégrations. Ce sont des missions propriétaires construites sur vos données de contacts et de deals, exécutées dans la couche de raisonnement de SymbiozAI.",
      examplePromptLabel: "Prompt d'exemple",
      expectedOutputLabel: "Sortie attendue",
      items: [
        {
          code: "analyze_communication_style",
          heading: "Profilage DISC",
          body:
            "Votre agent lit les données disponibles : activité LinkedIn, historique email, transcripts de réunions. Il produit un profil DISC avec guidance de rédaction. On écrit à un Dominant différemment qu'à un Influential. Le raisonnement est exposé, pas caché dans un modèle.",
          example: `« Analyse le style de communication de Thomas Martin avant mon call demain. »`,
          expected:
            "Profil DISC (scores D/I/S/C), style de communication préféré, recommandations de ton email, sujets à éviter.",
        },
        {
          code: "assess_deal_health",
          heading: "Score multi-signal",
          body:
            "Chaque deal scoré 0-100. Cinq sources de signaux : taux de réponse email, cadence de réunions, vélocité deal vs moyenne d'étape, largeur d'engagement des stakeholders, signaux concurrentiels. Chaque facteur documenté. Pas de blackbox.",
          example: `« Pourquoi le deal Acme est-il à risque ? Qu'est-ce que je fais cette semaine ? »`,
          expected:
            "Score 0-100, décomposition des facteurs, actions recommandées, classification d'urgence.",
        },
        {
          code: "qualify_lead",
          heading: "Gatekeeper composite",
          body:
            "Qualification structurée contre vos critères ICP avec raisonnement explicite. Cohérent sur tous les reps. Reproductible, auditable, fini le comité MQL/SQL.",
          example: `« Sophie Durand de TechVision vaut-elle la peine pour notre ICP Series A ? »`,
          expected:
            "Qualifié / non qualifié, score de correspondance ICP, facteurs bloquants, prochaine étape recommandée.",
        },
      ],
    },
    // S8 - SUPERVISION (v2: "5 décisions par jour" ancré).
    supervision: {
      eyebrow: "SUPERVISION",
      title: "Vous n'opérez pas le CRM. Vous supervisez les décisions sensibles.",
      lede:
        "5 minutes par jour. Une file d'actions Orange et Rouge. Vous approuvez, rejetez, ou demandez à l'agent de réviser. Tout le reste s'exécute automatiquement.",
      items: [
        {
          heading: "Ce qui est dans la file",
          body:
            "Chaque action Orange arrive ici avant exécution. Chaque action Rouge est bloquée ici jusqu'à ce que vous agissiez. La file est triée par urgence et type de mission.",
        },
        {
          heading: "Détail d'action",
          body:
            "Pour chaque action en file : contexte complet, raisonnement de l'agent, output proposé, et impact si approuvé ou rejeté. Vous avez ce qu'il faut pour décider.",
        },
        {
          heading: "Un clic",
          body:
            "Approuver. Rejeter. Demander à l'agent de réviser avec une note. L'agent agit sur votre décision en quelques secondes.",
        },
        {
          heading: "Piste d'audit",
          body:
            "Chaque décision humaine est journalisée : votre identité, le timestamp, votre raisonnement si vous avez laissé une note. Immuable. Fait partie de votre dossier de conformité AI Act article 14.",
        },
      ],
      footer:
        "La console n'est pas le produit. Le serveur MCP l'est. La console est la salle de contrôle pour les 5 décisions par jour qui nécessitent votre intervention.",
    },
    // S9 - CONFORMITE (v2: "Quatre faits. Tous vérifiables.").
    compliance: {
      eyebrow: "CONFORMITE",
      title: "Hébergé en EU. Natif AI Act. RGPD intégré.",
      lede: "Quatre faits. Tous vérifiables. Pas de claims marketing.",
      items: [
        {
          heading: "Hébergé en EU",
          body:
            "Infrastructure à Frankfurt (DigitalOcean FRA1). Vos données ne quittent pas l'EU. Pas d'exception.",
        },
        {
          heading: "AI Act art. 14",
          body:
            "La politique HITL à 3 classes est l'implémentation de l'article 14. Chaque action sensible passe par une gate humaine. Audit log immuable. Rétention 7 ans. Propagation du kill-switch en moins d'1 seconde.",
        },
        {
          heading: "RGPD art. 15",
          body:
            "GET /audit/my-data - exportez toutes vos données à la demande. Pas de données verrouillées. Pas de ticket support à ouvrir.",
        },
        {
          heading: "LLM-agnostic",
          body:
            "UnifiedLLMClient multi-providers. Pas de fine-tuning sur vos données. Pas de rétention de données par les providers LLM. Vous pouvez changer de modèle sous-jacent sans migrer vos données.",
        },
      ],
    },
    // S10 - AUDIT LOG WORM (v2: exemple curl + "break-glass" nommé).
    audit: {
      eyebrow: "AUDIT LOG",
      title: "Chaque action journalisée. Rien de modifiable. Rien de supprimable.",
      lede:
        "Entrées chaînées HMAC-SHA256. Rétention 7 ans. Accès break-glass via audit_admin. Chaque appel MCP, chaque décision humaine, chaque événement kill-switch - dans le log.",
      bullets: [
        {
          heading: "Append-only",
          body:
            "Aucun enregistrement ne peut être modifié après création. Pas d'endpoint de suppression. L'intégrité de l'audit est structurelle.",
        },
        {
          heading: "Chaîné HMAC",
          body:
            "Chaque entrée du log contient le hash HMAC-SHA256 de l'entrée précédente. Toute modification d'une entrée casse la chaîne. La vérification est programmatique.",
        },
        {
          heading: "Rétention 7 ans",
          body:
            "Conforme AI Act article 14 et droit comptable commercial français. La rotation de logs ne supprime pas - elle archive.",
        },
        {
          heading: "Requêtable",
          body:
            "GET /audit/my-data retourne votre export complet en JSON structuré. Filtrez par contact, deal, session agent ou plage de dates.",
        },
        {
          heading: "Attribution humaine",
          body:
            "Chaque approbation, rejet ou note humaine est stocké avec l'identité authentifiée de l'utilisateur et le timestamp. Vous savez qui a approuvé quoi, quand, et pourquoi.",
        },
      ],
      exampleCode: `# Exporter votre audit log
curl -H "Authorization: Bearer $TOKEN" \\
  https://api.symbioz.ai/audit/my-data`,
      exampleCaption: "Exporter votre audit log",
    },
    // S11 - PRICING (v2: "Ce qui compte comme un appel" ajouté).
    pricing: {
      eyebrow: "PRICING",
      title: "Gratuit pendant la beta. Usage-based ensuite.",
      lede:
        "Pas de prix par siège. Pas de contrat annuel. Pas de lock-in par utilisateur. Vous payez pour ce que votre agent appelle.",
      blocks: [
        {
          heading: "Beta - gratuit maintenant",
          body:
            "500 appels MCP/jour sans frais. Pas de carte bancaire pour démarrer. La limite se remet à zéro toutes les 24 heures. Dépassement : 0,15 €/crédit pay-per-use. Rechargez depuis votre dashboard quand nécessaire.",
        },
        {
          heading: "Post-beta",
          body:
            "Pricing usage-based. Le modèle sera annoncé 30 jours avant la fermeture de la beta. Pas de changements rétroactifs sur les appels déjà effectués.",
        },
        {
          heading: "Ce qui compte comme un appel",
          body:
            "Un appel de mission MCP = un crédit. Un start_targeting qui retourne 50 prospects = 1 crédit. Un enrich_contact = 1 crédit. L'inférence LLM dans une mission est incluse.",
        },
      ],
      footerNote: "Questions sur le pricing pour des volumes plus importants :",
      footerLinkLabel: "Prendre rendez-vous",
      footerLinkHref: "https://calendly.com/laurent-bouzon-symbioz/30min",
    },
    // S13 - CTA FINAL (v2: "Connectez votre agent. Maintenant." injonction).
    ctaFinal: {
      eyebrow: "DEMARRER",
      title: "Connectez votre agent. Maintenant.",
      lede: "Cinq minutes. Une commande. 35 missions disponibles.",
      primary: { label: "Installer le MCP en 5 min", href: "#quickstart" },
      secondary: { label: "Tester la sandbox", href: "#quickstart" },
      walkthroughNote: "Ou demandez une présentation en live :",
      walkthroughLinkLabel: "Prendre rendez-vous",
      walkthroughLinkHref: "https://calendly.com/laurent-bouzon-symbioz/30min",
    },
    docsLink: "Documentation complète sur docs.symbioz.ai/mcp",
    // S12 - FAQ (v2: 10 Q/A, ajoute data cancel + token rotation).
    faq: [
      {
        question: "Comment connecter Claude Code à SymbiozAI ?",
        answer:
          "Lancez npx @symbiozai/mcp-setup. Le CLI auto-configure la connexion pour Claude Code, Cursor, Cline, Goose ou Continue.dev. Installation en moins de 5 minutes.",
      },
      {
        question: "Combien de missions MCP sont en production aujourd'hui ?",
        answer:
          "28 missions sont en production depuis avril 2026. La Phase 2 en ajoute 7 : score_company, map_stakeholders, detect_competitor_displacement, analyze_win_loss, forecast_pipeline, create_sequence, push_to_outbound.",
      },
      {
        question: "Quels transports sont supportés ?",
        answer:
          "stdio pour les clients locaux (Claude Code, Cursor). HTTP+SSE pour les agents remote et hébergés. Les deux font partie de la spécification MCP officielle.",
      },
      {
        question: "Ca fonctionne avec le SDK MCP d'Anthropic ?",
        answer:
          "Oui. SymbiozAI implémente la spec MCP officielle. Tout client MCP-compliant en stdio ou HTTP+SSE se connecte nativement.",
      },
      {
        question: "Puis-je tester avant de payer ?",
        answer:
          "Oui. La sandbox publique sur /playground vous donne un tenant démo avec 200 prospects, limité à 20 appels/IP/jour. Pas d'inscription requise.",
      },
      {
        question: "Comment fonctionne l'authentification ?",
        answer:
          "OAuth 2.1 avec PKCE pour les end-users. Service tokens pour backend-to-backend. JWT signé par le serveur auth SymbiozAI. La rotation de tokens est automatique.",
      },
      {
        question: "Quelle différence avec Octolane ?",
        answer:
          "Octolane fait tourner un serveur MCP en parallèle de leur UI SaaS standard. SymbiozAI est MCP-only : le serveur MCP est l'interface principale d'opération. Il n'existe pas d'UI alternative pour les opérations CRM quotidiennes.",
      },
      {
        question: "Puis-je self-hoster le serveur MCP ?",
        answer:
          "Le serveur MCP est un service managé sur api.symbioz.ai/mcp. Le self-hosting entreprise est sur la roadmap Phase 3.",
      },
      {
        question: "Comment fonctionne la conformité AI Act techniquement ?",
        answer:
          "Chaque appel MCP est journalisé dans un audit log immuable chaîné HMAC, rétention 7 ans. La politique HITL à 3 classes (Vert/Orange/Rouge) implémente les exigences de supervision humaine de l'article 14. Le kill-switch se propage au tenant en moins d'1 seconde.",
      },
      {
        question: "Qu'arrive-t-il à mes données si j'annule ?",
        answer:
          "Exportez via GET /audit/my-data ou la mission MCP export_my_data à tout moment. Les données sont conservées 30 jours après annulation puis supprimées. Vous recevez une confirmation de suppression.",
      },
    ] as FAQItem[],
  },
}
