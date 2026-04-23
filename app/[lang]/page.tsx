import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import { SharedFooter } from "@/components/shared-footer"
import Link from "next/link"
import { SharedHeader } from "@/components/shared-header"
import { GlassIcon } from "@/components/ui/glass-icon"
import { Logo } from "@/components/ui/logo"
import { WaitlistForm } from "@/components/waitlist-form"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CodeBlock } from "@/components/site/code-block"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
      logo: "https://symbioz.ai/icon.png",
      description: dictionary.description,
      sameAs: [
        "https://www.linkedin.com/in/laurentbouzon/",
        "https://www.instagram.com/symbiozai/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "contact@symbioz.ai",
        contactType: "customer service",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: dictionary.description,
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
      },
    },
  ]

  const isFr = lang === "fr"

  const painPoints = [
    {
      icon: <GlassIcon type="clock" size={48} />,
      title: isFr ? "Le temps" : "Time",
      stat: isFr ? "3 à 5h / semaine" : "3 to 5h / week",
      description: isFr
        ? "Vos commerciaux passent en moyenne 3 à 5 heures par semaine à saisir des données dans un CRM. Avec un agent IA qui opère via MCP, ce temps disparaît. L'agent journalise. Ils vendent."
        : "Your salespeople spend an average of 3 to 5 hours per week entering data into a CRM. With an AI agent operating via MCP, that time disappears. The agent logs. They sell.",
    },
    {
      icon: <GlassIcon type="trending-down" size={48} />,
      title: isFr ? "Les deals" : "Deals",
      stat: isFr ? "20 à 30% récupérables" : "20 to 30% recoverable",
      description: isFr
        ? "Entre 20 et 30% des deals « perdus » ne sont pas perdus - ils sont juste différés. Votre agent IA surveille les signaux de réactivation en continu et vous remonte le bon deal au bon moment."
        : "20 to 30% of \"lost\" deals aren't actually lost - they're just deferred. Your AI agent monitors reactivation signals continuously and surfaces the right deal at the right moment.",
    },
    {
      icon: <GlassIcon type="bell" size={48} />,
      title: isFr ? "Les relances" : "Follow-ups",
      stat: isFr ? "5 deals oubliés" : "5 deals forgotten",
      description: isFr
        ? "Un commercial gère 25 à 40 deals actifs en même temps. Il en oublie 5. Pas par négligence - par volume. Votre agent IA ne les oublie pas. Il les priorise, les score, et vous alerte."
        : "A sales rep manages 25 to 40 active deals at once. They forget 5. Not out of carelessness - out of volume. Your AI agent doesn't forget. It prioritizes, scores, and alerts you.",
    },
  ]

  const features = [
    {
      icon: <GlassIcon type="refresh" size={48} />,
      title: isFr ? "Zéro saisie" : "Zero data entry",
      subtitle: isFr ? "Votre agent IA opère. Votre CRM se remplit." : "Your AI agent operates. Your CRM fills itself.",
      description: isFr
        ? "Via MCP, Claude Code, Cursor ou tout agent compatible appelle 35 missions verbales pour cibler, enrichir, qualifier, rédiger. Les contacts sont créés. Les deals sont mis à jour. L'historique est complet. Vos commerciaux n'ont plus qu'à vendre."
        : "Via MCP, Claude Code, Cursor, or any compatible agent calls 35 verbal missions to target, enrich, qualify, draft. Contacts are created. Deals are updated. History is complete. Your salespeople just sell.",
    },
    {
      icon: <GlassIcon type="bell" size={48} />,
      title: isFr ? "Pipeline vivant" : "Living pipeline",
      subtitle: isFr ? "Votre agent surveille. Vous supervisez." : "Your agent monitors. You supervise.",
      description: isFr
        ? "L'agent identifie les deals qui stagnent, score chaque opportunité sur plusieurs signaux, et vous remonte ce qui compte dans une console de supervision 5 minutes par jour. Pas de notification parasite - uniquement ce qui compte."
        : "The agent identifies stalling deals, scores every opportunity on multiple signals, and surfaces what matters in a 5-minutes-a-day supervision console. No noise - only what matters.",
    },
    {
      icon: <GlassIcon type="target" size={48} />,
      title: isFr ? "Réserve active" : "Active reserve",
      subtitle: isFr ? "Vos deals perdus deviennent un actif, pas un cimetière" : "Your lost deals become an asset, not a graveyard",
      description: isFr
        ? "L'agent classe automatiquement vos deals perdus et surveille les signaux de réactivation - levée de fonds, nouveau poste, changement de budget. Quand le moment est bon, il vous le dit."
        : "The agent automatically classifies lost deals and monitors reactivation signals - fundraising, new role, budget change. When the time is right, it tells you.",
    },
    {
      icon: <GlassIcon type="chart" size={48} />,
      title: isFr ? "Pilotage en une question" : "Pipeline in one question",
      subtitle: isFr ? "L'état de votre pipeline en 5 secondes" : "Your pipeline status in 5 seconds",
      description: isFr
        ? "Fin de trimestre. Board meeting dans 2 heures. Vous demandez à votre agent IA dans Claude Code ou Cursor. Il appelle get_pipeline_snapshot et assess_deal_health. Vous avez les chiffres, les deals à risque, les opportunités à accélérer. Pas de dashboard à construire. Juste la réponse."
        : "End of quarter. Board meeting in 2 hours. You ask your AI agent in Claude Code or Cursor. It calls get_pipeline_snapshot and assess_deal_health. You get the numbers, at-risk deals, and opportunities to accelerate. No dashboard to build. Just the answer.",
    },
  ]

  const integrations = [
    { name: "WhatsApp", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
    { name: "Gmail", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" },
    { name: "Google Calendar", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" },
    { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
    { name: "Pipedrive", logo: "https://www.pipedrive.com/favicon.ico" },
  ]

  const trustBadges = [
    {
      icon: <GlassIcon type="globe" size={40} />,
      title: isFr ? "Hébergé en EU (Frankfurt)" : "EU-hosted (Frankfurt)",
      description: isFr
        ? "Infrastructure DigitalOcean FRA1. Vos données pipeline restent en EU."
        : "DigitalOcean FRA1 infrastructure. Your pipeline data stays in the EU.",
    },
    {
      icon: <GlassIcon type="shield" size={40} />,
      title: isFr ? "AI Act natif" : "AI Act native",
      description: isFr
        ? "Audit log immuable signé HMAC, rétention 7 ans, politique HITL 3 classes, kill-switch tenant en moins d'1 seconde."
        : "Immutable HMAC-signed audit log, 7-year retention, 3-class HITL policy, tenant kill-switch in under 1 second.",
    },
    {
      icon: <GlassIcon type="cpu" size={40} />,
      title: isFr ? "LLM-agnostic" : "LLM-agnostic",
      description: isFr
        ? "UnifiedLLMClient multi-provider. Pas de fine-tuning sur vos données. Pas de rétention par les providers LLM."
        : "UnifiedLLMClient multi-provider. No fine-tuning on your data. No retention by LLM providers.",
    },
    {
      icon: <GlassIcon type="unlock" size={40} />,
      title: isFr ? "RGPD article 15 natif" : "GDPR article 15 native",
      description: isFr
        ? "Endpoint /audit/my-data, export à la demande, zéro vendor lock-in."
        : "/audit/my-data endpoint, export on demand, zero vendor lock-in.",
    },
  ]

  const productMetrics = [
    { value: "35", label: isFr ? "missions MCP verbales" : "verbal MCP missions", live: true },
    { value: "23", label: isFr ? "fournisseurs de données wrappés" : "data providers wrapped", live: false },
    { value: "< 5 min", label: isFr ? "pour connecter votre agent IA" : "to connect your AI agent", live: false },
    { value: "5 min/j", label: isFr ? "de supervision, pas plus" : "of supervision, nothing more", live: false },
  ]

  // Agents compatibles (text-only pills, R11-safe, zero third-party logo)
  const agents = ["Claude Code", "Cursor", "ChatGPT", "Cline", "Goose", "Continue.dev"]

  // Illustrative agent session mocked for the Solution section — narrative only,
  // not an install command. Shows what a tenant's own agent does when it talks
  // to SymbiozAI through the MCP server. No interactivity, no typing animation.
  const agentSessionTranscript = isFr
    ? `> "Cible 50 fondateurs B2B SaaS, Series A, France."

[agent] calling start_targeting...
✓ 47 prospects retournés en 58s
✓ 3 ajoutés à la file de supervision (Orange)

> "Qualifie le top 10."

[agent] calling qualify_lead × 10...
✓ 7 passent le gate ICP (raisonnement structuré)
✓ 3 rejetés avec motif explicite

> "Brief meeting pour Sophie Durand demain."

[agent] calling get_meeting_prep_brief...
✓ Contexte société, historique, talking points prêts`
    : `> "Target 50 founders in B2B SaaS, Series A, France."

[agent] calling start_targeting...
✓ 47 prospects returned in 58s
✓ 3 added to supervision queue (Orange)

> "Qualify the top 10."

[agent] calling qualify_lead × 10...
✓ 7 pass the ICP gate (structured reasoning)
✓ 3 rejected with explicit motive

> "Meeting brief for Sophie Durand tomorrow."

[agent] calling get_meeting_prep_brief...
✓ Company context, history, talking points ready`

  // Note: dangerouslySetInnerHTML below is safe — jsonLd is built from
  // our own static dictionary strings, not from user input.
  const jsonLdHtml = JSON.stringify(jsonLd)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        <SharedHeader lang={lang} dictionary={dictionary} activePage="home" showLogo={false} />

        {/* Hero Section — above-the-fold on desktop 900px and mobile 700px */}
        <main className="bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
          <section className="flex flex-col px-4 sm:px-6 text-center min-h-screen justify-center relative">
            <div
              className="hero-ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(13,71,161,0.05) 40%, transparent 70%)" }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <h1 className="sr-only">{dictionary.h1}</h1>

              <div
                className="hero-item flex justify-center mb-6 sm:mb-8"
                style={{ animationDelay: "0ms" }}
              >
                <Logo size="lg" />
              </div>

              <h2
                className="hero-item font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-[#0d47a1]"
                style={{ animationDelay: "100ms" }}
              >
                {dictionary.subtitle}
              </h2>

              <p
                className="hero-item mt-5 sm:mt-6 mx-auto max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed"
                style={{ animationDelay: "200ms" }}
              >
                {dictionary.description}
              </p>

              <div className="hero-item mt-8 sm:mt-10" style={{ animationDelay: "300ms" }}>
                <WaitlistForm form={dictionary.form} lang={lang} />
              </div>

              <div className="hero-item mt-4" style={{ animationDelay: "400ms" }}>
                <Link
                  href={`/${lang}/contact`}
                  className="text-sm text-gray-500 hover:text-[#0d47a1] transition-colors underline underline-offset-4"
                >
                  {isFr ? "ou réserver une démo →" : "or book a demo →"}
                </Link>
              </div>
            </div>

            <ScrollIndicator />
          </section>

          {/* Headless AI CRM Banner */}
          <section className="py-8 px-4 sm:px-6 bg-white">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-widest mb-2">
                {isFr ? "Headless AI CRM" : "Headless AI CRM"}
              </p>
              <p className="text-gray-600 text-base md:text-lg">
                {isFr
                  ? "La génération précédente de CRM a ajouté l'IA au-dessus d'une base de données. Nous avons construit le CRM pour être opéré par l'IA. Votre agent opère, vous supervisez."
                  : "The last generation of CRMs added AI on top of a database. We built the CRM to be operated by the AI. Your agent operates, you supervise."}
              </p>
            </ScrollReveal>
          </section>

          {/* Problem Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Le problème" : "The problem"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Ce que vous perdez chaque semaine sans le savoir" : "What you lose every week without knowing"}
                </h2>
              </ScrollReveal>

              <ScrollReveal stagger className="grid md:grid-cols-3 gap-8">
                {painPoints.map((point, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{point.icon}</div>
                    <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider mb-1">{point.title}</p>
                    <p className="text-2xl font-bold mb-3">{point.stat}</p>
                    <p className="text-gray-600 text-sm">{point.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* Solution / Maya Section */}
          <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "La solution" : "The solution"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
                  {isFr ? "Votre agent opère. Vous supervisez." : "Your agent operates. You supervise."}
                </h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                  {isFr
                    ? "SymbiozAI n'est pas un CRM avec une IA ajoutée. C'est un CRM conçu pour qu'un agent IA externe — Claude Code, Cursor, tout agent compatible MCP — soit l'opérateur principal. 35 missions MCP verbales. Un seul endpoint. Installation en moins de 5 minutes."
                    : "SymbiozAI is not a CRM with AI on top. It's a CRM designed so that an external AI agent — Claude Code, Cursor, any MCP-compatible agent — is the primary operator. 35 verbal MCP missions. One endpoint. Install in under 5 minutes."}
                </p>
              </ScrollReveal>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <ScrollReveal stagger className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="refresh" size={48} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {isFr ? "Connecté en 5 minutes" : "Connected in 5 minutes"}
                        </h3>
                        <p className="text-gray-600">
                          {isFr
                            ? "Une commande : npx @symbiozai/mcp-setup. Le CLI auto-configure votre client Claude Code, Cursor, Cline, Goose ou Continue.dev. Pas de clé API à gérer. Pas de JSON à éditer."
                            : "One command: npx @symbiozai/mcp-setup. The CLI auto-configures your Claude Code, Cursor, Cline, Goose, or Continue.dev client. No API key to manage. No JSON to edit."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="chart" size={48} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {isFr ? "35 missions MCP verbales" : "35 verbal MCP missions"}
                        </h3>
                        <p className="text-gray-600">
                          {isFr
                            ? "Votre agent appelle start_targeting, qualify_lead, assess_deal_health, analyze_communication_style — en langage naturel. Acquisition, qualification, engagement, meta. Un seul endpoint."
                            : "Your agent calls start_targeting, qualify_lead, assess_deal_health, analyze_communication_style — in natural language. Acquisition, qualification, engagement, meta. One endpoint."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <GlassIcon type="shield" size={48} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {isFr ? "Supervision 5 min/jour" : "5 min/day supervision"}
                        </h3>
                        <p className="text-gray-600">
                          {isFr
                            ? "Une politique HITL 3 classes : Vert pour exécution automatique, Orange pour dry-run + confirmation, Rouge pour approbation explicite. Audit log immuable signé HMAC, rétention 7 ans, kill-switch tenant en moins d'une seconde."
                            : "A 3-class HITL policy: Green for auto-execution, Orange for dry-run + confirmation, Red for explicit approval. Immutable HMAC-signed audit log, 7-year retention, tenant kill-switch in under a second."}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="max-w-md mx-auto">
                    <CodeBlock
                      code={agentSessionTranscript}
                      language="text"
                      caption={isFr ? "Agent · session illustrative" : "Agent · illustrative session"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section — 4 features */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Concrètement" : "In practice"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Ce qui change avec SymbiozAI" : "What changes with SymbiozAI"}
                </h2>
              </ScrollReveal>

              <ScrollReveal stagger className="grid sm:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm font-medium text-[#0d47a1] mb-3">{feature.subtitle}</p>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </ScrollReveal>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-16 px-4 sm:px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal>
                <p className="text-sm font-medium text-[#0d47a1] uppercase tracking-wider text-center mb-2">
                  {isFr ? "Construit pour durer" : "Built to last"}
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                  {isFr ? "Une infrastructure MCP-only. Pas un chatbot collé sur un CRM." : "An MCP-only infrastructure. Not a chatbot bolted on a CRM."}
                </h2>
              </ScrollReveal>

              {/* Product metrics */}
              <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {productMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-transparent">
                        {metric.value}
                      </p>
                      {metric.live && (
                        <span className="relative flex h-2.5 w-2.5 mt-1">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                  </div>
                ))}
              </ScrollReveal>

              {/* Trust badges */}
              <ScrollReveal stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl shadow-sm text-center">
                    <div className="flex justify-center mb-3">{badge.icon}</div>
                    <h3 className="font-semibold mb-1">{badge.title}</h3>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                ))}
              </ScrollReveal>

              {/* Founder quote */}
              <ScrollReveal className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <blockquote className="italic text-gray-700 text-base md:text-lg leading-relaxed">
                    &ldquo;{dictionary.quote}&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm font-semibold text-gray-900">
                    — Laurent Bouzon, {isFr ? "fondateur de SymbiozAI" : "founder of SymbiozAI"}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Integrations Section — 2 rows : AI agents (text-only) + tools (logos) */}
          <section className="py-16 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
                  {isFr ? "Votre agent IA, vos outils. Un seul endpoint." : "Your AI agent, your tools. One endpoint."}
                </h2>
              </ScrollReveal>

              {/* Row 1 — AI agents (text-only pills, R11-safe) */}
              <ScrollReveal className="mb-10">
                <p className="text-xs font-medium text-[#0d47a1] uppercase tracking-widest text-center mb-4">
                  {isFr ? "Votre agent IA" : "Your AI agent"}
                </p>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {agents.map((agent) => (
                    <div
                      key={agent}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-300 font-mono text-[11px] font-semibold text-gray-700"
                      >
                        {agent.charAt(0)}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{agent}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Row 2 — Tools (existing logo pills, unchanged) */}
              <ScrollReveal>
                <p className="text-xs font-medium text-[#0d47a1] uppercase tracking-widest text-center mb-4">
                  {isFr ? "Vos outils" : "Your tools"}
                </p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {integrations.map((integration) => (
                    <div
                      key={integration.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-5 h-5 relative flex-shrink-0">
                        <Image
                          src={integration.logo || "/placeholder.svg"}
                          alt={`${integration.name} logo`}
                          width={20}
                          height={20}
                          className="object-contain w-5 h-5"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">{integration.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* CTA Final Section */}
          <section id="cta-final" className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white">
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                  {isFr ? "Prêt à connecter votre agent ?" : "Ready to connect your agent?"}
                </h2>
                <p className="text-white/80 text-lg mb-4">
                  {isFr
                    ? "Votre agent IA opère via MCP. Vous supervisez ce qui compte. Vos commerciaux vendent au lieu de saisir."
                    : "Your AI agent operates via MCP. You supervise what matters. Your salespeople sell instead of typing."}
                </p>
                <p className="text-white/60 text-sm mb-8">
                  {isFr
                    ? "Accès bêta. Installation MCP en moins de 5 minutes. Gratuit jusqu'à 500 appels/jour."
                    : "Beta access. MCP install in under 5 minutes. Free up to 500 calls/day."}
                </p>
                <div className="max-w-md mx-auto">
                  <WaitlistForm form={dictionary.form} lang={lang} />
                </div>
                <p className="mt-4">
                  <Link
                    href={`/${lang}/contact`}
                    className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-4"
                  >
                    {isFr ? "ou réserver une démo →" : "or book a demo →"}
                  </Link>
                </p>
                <p className="text-white/40 text-xs mt-4">
                  {isFr
                    ? "Sans engagement. Sans carte bancaire. Sans configuration de 3 semaines."
                    : "No commitment. No credit card. No 3-week setup."}
                </p>
              </ScrollReveal>
            </div>
          </section>
        </main>

        <SharedFooter lang={lang} dictionary={dictionary} />
      </div>
    </>
  )
}
