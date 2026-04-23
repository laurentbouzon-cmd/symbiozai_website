import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { homeCopy, homeAgents, homeIntegrations } from "@/lib/home-page-copy"
import { SharedFooter } from "@/components/shared-footer"
import { SharedHeader } from "@/components/shared-header"
import { GlassIcon } from "@/components/ui/glass-icon"
import { Logo } from "@/components/ui/logo"
import { WaitlistForm } from "@/components/waitlist-form"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Section } from "@/components/site/section"
import { AgentsStackVisual } from "@/components/site/agents-stack-visual"
import { McpConvergenceDiagram } from "@/components/site/mcp-convergence-diagram"
import { LearningTimeline } from "@/components/site/learning-timeline"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isFr = lang === "fr"
  const copy = homeCopy[isFr ? "fr" : "en"]

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

  // Icons per pillar card (Section 2) - keeps visual consistency with existing GlassIcon library.
  const pillarIcons = [
    <GlassIcon key="ai" type="cpu" size={40} />,
    <GlassIcon key="auto" type="refresh" size={40} />,
    <GlassIcon key="mcp" type="target" size={40} />,
    <GlassIcon key="learn" type="chart" size={40} />,
  ]

  // Icons per pain card (Section 3) - mapped to the 3 pains in order.
  const painIcons = [
    <GlassIcon key="time" type="clock" size={48} />,
    <GlassIcon key="deals" type="trending-down" size={48} />,
    <GlassIcon key="followup" type="bell" size={48} />,
  ]

  // Icons per trust badge (Section 7) - mapped to badges order (EU / AI Act / LLM-agnostic / GDPR).
  const badgeIcons = [
    <GlassIcon key="eu" type="globe" size={40} />,
    <GlassIcon key="aiact" type="shield" size={40} />,
    <GlassIcon key="llm" type="cpu" size={40} />,
    <GlassIcon key="gdpr" type="unlock" size={40} />,
  ]

  // Note: the inline JSON-LD injection below is safe. jsonLd is built from
  // our own static dictionary strings, not from user input.
  const jsonLdHtml = JSON.stringify(jsonLd)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
        <SharedHeader lang={lang} dictionary={dictionary} activePage="home" showLogo={false} />

        {/* =====================================================================
            HERO - LOCKED (verrouillé Laurent). Do not modify copy, layout, CTAs,
            or above-the-fold constraints. Any change requires explicit founder
            override.
            ===================================================================== */}
        <main className="bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
          <section className="flex flex-col px-4 sm:px-6 text-center min-h-screen justify-center relative">
            <div
              className="hero-ambient-glow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(13,71,161,0.05) 40%, transparent 70%)" }}
            />

            <div className="max-w-3xl mx-auto relative z-10">
              <h1 className="sr-only">{dictionary.h1}</h1>

              <div
                className="hero-item flex justify-center mb-4 sm:mb-6 [&_img]:!h-16 sm:[&_img]:!h-20 md:[&_img]:!h-24"
                style={{ animationDelay: "0ms" }}
              >
                <Logo size="xl" />
              </div>

              <h2
                className="hero-item font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.15] text-[#0d47a1]"
                style={{ animationDelay: "100ms" }}
              >
                {/*
                  Line 1 EN must stay single-line on viewports >=375px (design
                  constraint validated 2026-04-23). FR line 1 may wrap naturally
                  on narrow viewports (no constraint). Approach: conditional
                  whitespace-nowrap on EN only, responsive typo scale unchanged.
                */}
                <span className={`block ${isFr ? "" : "whitespace-nowrap"}`}>{dictionary.subtitle[0]}</span>
                <span className="block">{dictionary.subtitle[1]}</span>
              </h2>

              <p
                className="hero-item mt-4 sm:mt-5 mx-auto max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed"
                style={{ animationDelay: "200ms" }}
              >
                {dictionary.description}
              </p>

              <div className="hero-item mt-6 sm:mt-8" style={{ animationDelay: "300ms" }}>
                <WaitlistForm form={dictionary.form} lang={lang} />
              </div>

              <div className="hero-item mt-4" style={{ animationDelay: "400ms" }}>
                <a
                  href="https://calendly.com/laurent-bouzon-symbioz/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-[#0d47a1] transition-colors underline underline-offset-4"
                >
                  {isFr ? "ou prendre rendez-vous →" : "or book a meeting →"}
                </a>
              </div>
            </div>

            <ScrollIndicator />
          </section>

          {/* =====================================================================
              SECTION 1 - Banner rupture (claim doctrinal)
              Copy: L'IA n'est plus dans votre CRM. Votre CRM est dans votre IA.
              ===================================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20">
            <ScrollReveal className="max-w-3xl mx-auto text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.2] text-gray-950">
                {copy.ruptureBanner.claim}
              </p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-gray-600">
                {copy.ruptureBanner.subclaim}
              </p>
            </ScrollReveal>
          </section>

          {/* =====================================================================
              SECTION 2 - Hub 4 piliers (grille 2x2)
              Doctrinal hub: the four architectural choices that change everything.
              ===================================================================== */}
          <Section
            id="pillars"
            tone="gray"
            container="default"
            eyebrow={copy.pillarsHub.eyebrow}
            title={copy.pillarsHub.h2}
            lede={copy.pillarsHub.intro}
          >
            <ScrollReveal stagger className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:gap-6">
              {copy.pillarsHub.cards.map((card, idx) => (
                <article
                  key={card.h3}
                  className="group relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(13,71,161,0.2)] md:p-7"
                >
                  <div className="mb-5">{pillarIcons[idx]}</div>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                    {card.h3}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    {card.body}
                  </p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 3 - Douleur rerouted (3 pain cards + pilier link)
              Each pain card now reroutes to the pillar that resolves it.
              ===================================================================== */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.problem.eyebrow}
            title={copy.problem.h2}
          >
            <ScrollReveal stagger className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {copy.problem.cards.map((pain, idx) => (
                <div
                  key={pain.title}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(13,71,161,0.2)] md:p-7"
                >
                  <div className="mb-5">{painIcons[idx]}</div>
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">
                    {pain.title}
                  </h3>
                  <p className="mt-2 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-2xl font-bold text-transparent">
                    {pain.stat}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{pain.body}</p>
                  <p className="mt-5 border-t border-gray-100 pt-4 text-xs font-medium leading-relaxed text-[#0d47a1]">
                    {pain.pilier}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 4 - Pilier Autonome (Layer 1: internal agents)
              H2 locked: "Your agent operates. You supervise."
              Visual: native React component <AgentsStackVisual /> (supervision
              console mockup in pure Tailwind + inline SVG, 2026-04-23).
              Replaces /images/pivot-mcp/pilier-autonome-<lang>.png.
              ===================================================================== */}
          <Section
            id="autonome"
            tone="gray"
            container="default"
            eyebrow={copy.autonome.eyebrow}
            title={copy.autonome.h2}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <ScrollReveal>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">{copy.autonome.intro}</p>
                <ul className="mt-6 space-y-3">
                  {copy.autonome.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl border border-gray-200 bg-white p-5 text-sm md:text-base font-medium text-gray-900 leading-relaxed">
                  {copy.autonome.closing}
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <AgentsStackVisual lang={isFr ? "fr" : "en"} />
              </ScrollReveal>
            </div>
          </Section>

          {/* =====================================================================
              SECTION 5 - Pilier MCP-first (Layer 2: MCP infrastructure)
              Category rupture: we removed the interface.
              Visual: native React component <McpConvergenceDiagram /> (6 AI
              client pills converging via inline SVG to the MCP endpoint hub,
              2026-04-23). Replaces /images/pivot-mcp/pilier-mcp-first-<lang>.png.
              ===================================================================== */}
          <Section
            id="mcp-first"
            tone="white"
            container="default"
            eyebrow={copy.mcpFirst.eyebrow}
            title={copy.mcpFirst.h2}
          >
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <ScrollReveal>
                <McpConvergenceDiagram lang={isFr ? "fr" : "en"} />
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">{copy.mcpFirst.intro1}</p>
                <p className="mt-4 text-lg md:text-xl font-semibold text-gray-950">{copy.mcpFirst.intro2}</p>
                <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700">{copy.mcpFirst.intro3}</p>
                <ul className="mt-6 space-y-3">
                  {copy.mcpFirst.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm md:text-base italic text-gray-800 leading-relaxed">
                  {copy.mcpFirst.closing}
                </p>
              </ScrollReveal>
            </div>
          </Section>

          {/* =====================================================================
              SECTION 6 - AI-Native + Auto-apprenant (architecture and learning)
              Two sub-sections fused under one pillar.
              Visual: native React component <LearningTimeline /> (Day 1 / 30
              / 180 horizontal timeline with context progression, 2026-04-23).
              Replaces /images/pivot-mcp/auto-apprenant-<lang>.png.
              ===================================================================== */}
          <Section
            id="ai-native-learning"
            tone="gray"
            container="default"
            eyebrow={copy.aiNativeLearn.eyebrow}
            title={copy.aiNativeLearn.h2}
          >
            <ScrollReveal className="mx-auto mb-14 max-w-5xl">
              <LearningTimeline lang={isFr ? "fr" : "en"} />
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal>
                <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-gray-900">{copy.aiNativeLearn.sub1.h3}</h3>
                  <div className="mt-4 space-y-4">
                    {copy.aiNativeLearn.sub1.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-sm md:text-base leading-relaxed text-gray-700">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
              <ScrollReveal>
                <article className="h-full rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-gray-900">{copy.aiNativeLearn.sub2.h3}</h3>
                  <div className="mt-4 space-y-4">
                    {copy.aiNativeLearn.sub2.paragraphs.map((para, idx) => (
                      <p key={idx} className="text-sm md:text-base leading-relaxed text-gray-700">
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            </div>
          </Section>

          {/* =====================================================================
              SECTION 7 - Infrastructure + trust (metrics + badges + quote)
              Quote fondateur locked by Laurent 2026-04-23.
              ===================================================================== */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.infra.eyebrow}
            title={copy.infra.h2}
          >
            {/* Metrics row */}
            <ScrollReveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {copy.infra.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
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
              {copy.infra.badges.map((badge, idx) => (
                <div
                  key={badge.title}
                  className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 text-center transition-colors hover:border-[#0d47a1]/30"
                >
                  <div className="mb-3 flex justify-center">{badgeIcons[idx]}</div>
                  <h3 className="text-sm font-semibold tracking-tight text-gray-900">
                    {badge.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{badge.body}</p>
                </div>
              ))}
            </ScrollReveal>

            {/* Founder quote - locked verbatim */}
            <ScrollReveal className="max-w-3xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <blockquote className="italic text-gray-700 text-base md:text-lg leading-relaxed">
                  &ldquo;{dictionary.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-gray-900">{copy.infra.quoteAuthor}</p>
              </div>
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 8 - Integrations (H2 retitled, 2 rows kept)
              Row 1: AI agents (text-only). Row 2: tools (logos).
              ===================================================================== */}
          <Section tone="gray" container="default" title={copy.integrations.h2}>
            {/* Row 1: AI agents (text-only pills, R11-safe) */}
            <ScrollReveal className="mb-10">
              <p className="text-xs font-medium text-[#0d47a1] uppercase tracking-widest text-center mb-4">
                {copy.integrations.agentsLabel}
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {homeAgents.map((agent) => (
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

            {/* Row 2: Tools (logo pills) */}
            <ScrollReveal>
              <p className="text-xs font-medium text-[#0d47a1] uppercase tracking-widest text-center mb-4">
                {copy.integrations.toolsLabel}
              </p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {homeIntegrations.map((integration) => (
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

            <ScrollReveal>
              <p className="mt-10 text-center text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
                {copy.integrations.microcopy}
              </p>
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 9 - CTA Final (ICP founder-tech sharpened)
              Primary: WaitlistForm. Secondary: Calendly Book a meeting.
              Microcopy link: reroute toward /for-sales-teams.
              ===================================================================== */}
          <section
            id="cta-final"
            className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <ScrollReveal>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">{copy.ctaFinal.h2}</h2>
                {copy.ctaFinal.lede.map((line, idx) => (
                  <p
                    key={idx}
                    className={`${idx === 0 ? "text-white/85 text-lg" : "text-white/70 text-base"} ${
                      idx === 0 ? "mb-2" : "mb-8"
                    }`}
                  >
                    {line}
                  </p>
                ))}

                <div className="max-w-md mx-auto">
                  <WaitlistForm form={dictionary.form} lang={lang} />
                </div>

                <p className="mt-4">
                  <a
                    href={copy.ctaFinal.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors underline underline-offset-4"
                  >
                    {isFr ? "ou " : "or "}
                    {copy.ctaFinal.secondaryCta.label.toLowerCase()} →
                  </a>
                </p>

                <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/70 text-xs md:text-sm">
                  {copy.ctaFinal.reassurance.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-10 text-white/60 text-sm">
                  {copy.ctaFinal.microcopyPrefix}{" "}
                  <Link
                    href={copy.ctaFinal.microcopyLink.href}
                    className="underline underline-offset-4 hover:text-white transition-colors"
                  >
                    {copy.ctaFinal.microcopyLink.label}
                  </Link>
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
