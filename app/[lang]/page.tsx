import type { Metadata } from "next"
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
import { AgentActivityFeed } from "@/components/site/agent-activity-feed"
import { McpConvergenceDiagram } from "@/components/site/mcp-convergence-diagram"
import { LearningTimeline } from "@/components/site/learning-timeline"

// Metadata declared at page level (not layout level) to ensure synchronous
// rendering into <head> for HTML-limited bots (Googlebot, Bingbot, Twitterbot,
// LinkedInBot, etc). When root layout is dynamic (x-locale header), layout-
// level metadata defers to streaming and skips <head>. Page-level metadata
// resolves early and lands in <head>. See SEO P0-3.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isEnglish = lang === "en"

  return {
    title: dictionary.title,
    description: dictionary.description,
    keywords: isEnglish
      ? "headless AI CRM, MCP CRM, AI-native CRM, CRM for AI agents, agent-native CRM, Model Context Protocol CRM, Claude Code CRM, Cursor CRM, EU CRM"
      : "CRM headless, CRM MCP, CRM IA-native, CRM pour agents IA, CRM agent-native, Model Context Protocol, Claude Code, Cursor, CRM européen",
    openGraph: {
      title: dictionary.title,
      description: dictionary.description,
      url: `https://symbioz.ai/${lang}`,
      siteName: "SymbiozAI",
      images: [
        {
          url: "/images/pivot-mcp/og-image-symbiozai.png",
          width: 1200,
          height: 630,
          alt: dictionary.title,
        },
      ],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.title,
      description: dictionary.description,
      images: ["/images/pivot-mcp/og-image-symbiozai.png"],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}`,
      languages: {
        "x-default": "https://symbioz.ai/en",
        en: "https://symbioz.ai/en",
        fr: "https://symbioz.ai/fr",
      },
    },
  }
}

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
              Canonical structure: eyebrow + H2 + description.
              Copy: L'IA n'est plus dans votre CRM. Votre CRM est dans votre IA.
              ===================================================================== */}
          <section className="relative overflow-hidden bg-white">
            {/* Subtle radial accent to rhythm the scroll transition from hero */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
            />
            <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
              <ScrollReveal>
                <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0d47a1]">
                  01 {isFr ? "· LA RUPTURE" : "· THE RUPTURE"}
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-gray-950 sm:text-4xl md:text-[44px] md:leading-[1.05] lg:text-5xl">
                  {copy.ruptureBanner.claim}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-gray-600 sm:text-xl sm:leading-[1.55]">
                  {copy.ruptureBanner.subclaim}
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* =====================================================================
              SECTION 2 - Hub 4 piliers (grille 2x2)
              Doctrinal hub: the four architectural choices that change everything.
              ===================================================================== */}
          <Section
            id="pillars"
            tone="gray"
            container="default"
            eyebrow={`02 · ${copy.pillarsHub.eyebrow}`}
            title={copy.pillarsHub.h2}
            lede={copy.pillarsHub.intro}
          >
            <ScrollReveal stagger className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:gap-6">
              {copy.pillarsHub.cards.map((card, idx) => (
                <article
                  key={card.h3}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)] md:p-8"
                >
                  {/* Numeral marker (01..04) - quiet mono eyebrow */}
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="mb-5">{pillarIcons[idx]}</div>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
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
            eyebrow={`03 · ${copy.problem.eyebrow}`}
            title={copy.problem.h2}
            lede={
              isFr
                ? "Pas d'hypothèques sur vos commerciaux. C'est l'architecture qui produit ces résultats - pas les gens."
                : "Not a people problem. An architecture problem - and these are the numbers it produces."
            }
          >
            <ScrollReveal stagger className="grid gap-6 md:grid-cols-3 lg:gap-8">
              {copy.problem.cards.map((pain, idx) => (
                <div
                  key={pain.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)] md:p-8"
                >
                  <div className="mb-5">{painIcons[idx]}</div>
                  <h3 className="text-base font-semibold tracking-tight text-gray-900 md:text-lg">
                    {pain.title}
                  </h3>
                  <p className="mt-3 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-2xl font-bold leading-none text-transparent md:text-[28px]">
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
              SECTION 4 - Pilier Autonome
              Concept rework 2026-04-23 (Laurent feedback): previous "layers/
              stack" framing rejected. New approach is a "day in the operation"
              activity feed rendered by <AgentActivityFeed />. The eyebrow is
              overridden to drop "COUCHE 1 / LAYER 1" phrasing.
              Canonical structure: eyebrow + H2 + lede + visual.
              ===================================================================== */}
          <Section
            id="autonome"
            tone="gray"
            container="default"
            eyebrow={`04 · ${copy.autonome.eyebrow}`}
            title={copy.autonome.h2}
            lede={copy.autonome.intro}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <ScrollReveal>
                <AgentActivityFeed lang={isFr ? "fr" : "en"} />
              </ScrollReveal>
              <ScrollReveal>
                <ul className="space-y-3.5">
                  {copy.autonome.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-gray-700 md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 rounded-xl border border-gray-200 bg-white p-5 text-[15px] font-medium leading-relaxed text-gray-900 md:p-6 md:text-base">
                  {copy.autonome.closing}
                </p>
              </ScrollReveal>
            </div>
          </Section>

          {/* =====================================================================
              SECTION 5 - Pilier MCP-first
              Category rupture: we removed the interface.
              Eyebrow overridden to drop "COUCHE 2 / LAYER 2" phrasing (stack
              concept rejected 2026-04-23). Visual: <McpConvergenceDiagram />.
              ===================================================================== */}
          <Section
            id="mcp-first"
            tone="white"
            container="default"
            eyebrow={`05 · ${copy.mcpFirst.eyebrow}`}
            title={copy.mcpFirst.h2}
            lede={copy.mcpFirst.intro1}
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
              <ScrollReveal>
                <McpConvergenceDiagram lang={isFr ? "fr" : "en"} />
              </ScrollReveal>
              <ScrollReveal>
                <p className="text-xl font-semibold leading-snug text-gray-950 md:text-2xl">
                  {copy.mcpFirst.intro2}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-700 md:text-base">
                  {copy.mcpFirst.intro3}
                </p>
                <ul className="mt-7 space-y-3.5">
                  {copy.mcpFirst.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-gray-700 md:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5 text-[15px] italic leading-relaxed text-gray-800 md:p-6 md:text-base">
                  {copy.mcpFirst.closing}
                </p>
              </ScrollReveal>
            </div>
          </Section>

          {/* =====================================================================
              SECTION 6 - AI-Native + Auto-apprenant (architecture and learning)
              Two sub-sections fused under one pillar.
              Visual: <LearningTimeline /> Day 1 / 30 / 180 progression.
              Canonical structure: eyebrow + H2 + lede + visual + two cards.
              ===================================================================== */}
          <Section
            id="ai-native-learning"
            tone="gray"
            container="default"
            eyebrow={`06 · ${copy.aiNativeLearn.eyebrow}`}
            title={copy.aiNativeLearn.h2}
            lede={
              isFr
                ? "La conception décide de ce qu'un CRM peut faire. L'usage décide de la précision avec laquelle il le fait."
                : "Design decides what a CRM can do. Usage decides how precisely it does it."
            }
          >
            <ScrollReveal className="mx-auto mb-16 max-w-5xl md:mb-20">
              <LearningTimeline lang={isFr ? "fr" : "en"} />
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <ScrollReveal>
                <article className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)] md:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                    {copy.aiNativeLearn.sub1.h3}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {copy.aiNativeLearn.sub1.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] leading-relaxed text-gray-700 md:text-base"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
              <ScrollReveal>
                <article className="group h-full rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)] md:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 md:text-2xl">
                    {copy.aiNativeLearn.sub2.h3}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {copy.aiNativeLearn.sub2.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className="text-[15px] leading-relaxed text-gray-700 md:text-base"
                      >
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
              Canonical structure: eyebrow + H2 + lede + visual grid.
              ===================================================================== */}
          <Section
            tone="white"
            container="default"
            eyebrow={`07 · ${copy.infra.eyebrow}`}
            title={copy.infra.h2}
            lede={
              isFr
                ? "Quatre faits vérifiables. Pas de marketing de conformité."
                : "Four verifiable facts. Not compliance marketing."
            }
          >
            {/* Metrics row */}
            <ScrollReveal stagger className="mb-14 grid grid-cols-2 gap-6 md:mb-16 md:grid-cols-4">
              {copy.infra.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/60 p-5 text-center md:p-6"
                >
                  <div className="flex items-center justify-center gap-2">
                    <p className="bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-3xl font-bold leading-none tracking-tight text-transparent md:text-4xl">
                      {metric.value}
                    </p>
                    {metric.live && (
                      <span className="relative mt-1 flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </ScrollReveal>

            {/* Trust badges */}
            <ScrollReveal
              stagger
              className="mb-14 grid gap-5 sm:grid-cols-2 md:mb-16 lg:grid-cols-4 lg:gap-6"
            >
              {copy.infra.badges.map((badge, idx) => (
                <div
                  key={badge.title}
                  className="flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)]"
                >
                  <div className="mb-4 flex justify-center">{badgeIcons[idx]}</div>
                  <h3 className="text-sm font-semibold tracking-tight text-gray-900">
                    {badge.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600">{badge.body}</p>
                </div>
              ))}
            </ScrollReveal>

            {/* Founder quote - locked verbatim */}
            <ScrollReveal className="mx-auto max-w-3xl">
              <figure className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-8 md:p-10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute left-6 top-6 h-8 w-8 text-[#0d47a1]/15"
                >
                  <path
                    d="M7 7h4v4H8c0 2.2 1.3 3 3 3v3c-3.9 0-6-2.5-6-6V7zm9 0h4v4h-3c0 2.2 1.3 3 3 3v3c-3.9 0-6-2.5-6-6V7z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="relative pl-6 text-base italic leading-relaxed text-gray-700 md:pl-10 md:text-lg">
                  &ldquo;{dictionary.quote}&rdquo;
                </blockquote>
                <figcaption className="relative mt-5 pl-6 text-sm font-semibold text-gray-900 md:pl-10">
                  {copy.infra.quoteAuthor}
                </figcaption>
              </figure>
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 8 - Integrations (H2 retitled, 2 rows kept)
              Row 1: AI agents (text-only). Row 2: tools (logos).
              Canonical structure: eyebrow + H2 + description + visual rows.
              ===================================================================== */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`08 · ${isFr ? "ECOSYSTEME" : "ECOSYSTEM"}`}
            title={copy.integrations.h2}
            lede={copy.integrations.microcopy}
          >
            {/* Row 1: AI agents (text-only pills, R11-safe) */}
            <ScrollReveal className="mb-12">
              <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#0d47a1]">
                {copy.integrations.agentsLabel}
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-3.5">
                {homeAgents.map((agent) => (
                  <div
                    key={agent}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-md"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-200 bg-gray-50 font-mono text-[11px] font-semibold text-gray-700"
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
              <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#0d47a1]">
                {copy.integrations.toolsLabel}
              </p>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {homeIntegrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-md"
                  >
                    <div className="relative h-5 w-5 flex-shrink-0">
                      <Image
                        src={integration.logo || "/placeholder.svg"}
                        alt={`${integration.name} logo`}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">{integration.name}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Section>

          {/* =====================================================================
              SECTION 9 - CTA Final (ICP founder-tech sharpened)
              Primary: WaitlistForm. Secondary: Calendly book a meeting.
              Microcopy link: reroute toward /for-sales-teams.
              Canonical structure: eyebrow + H2 + description + action block.
              ===================================================================== */}
          <section
            id="cta-final"
            className="relative overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#1a237e] px-4 py-24 text-white sm:px-6 md:py-32"
          >
            {/* Subtle grid backdrop for depth (mono, no new accent color) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* Radial glow - mirrors hero visual register */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(13,71,161,0.05) 40%, transparent 70%)",
              }}
            />

            <div className="relative mx-auto max-w-3xl text-center">
              <ScrollReveal>
                <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6ddcff]">
                  09 {isFr ? "· CONNECTEZ-VOUS" : "· CONNECT"}
                </p>
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.05] lg:text-5xl">
                  {copy.ctaFinal.h2}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-[1.55]">
                  {copy.ctaFinal.lede[0]}
                </p>
                {copy.ctaFinal.lede[1] && (
                  <p className="mt-2 text-base leading-relaxed text-white/70">
                    {copy.ctaFinal.lede[1]}
                  </p>
                )}

                <div className="mx-auto mt-10 max-w-md">
                  <WaitlistForm form={dictionary.form} lang={lang} />
                </div>

                <p className="mt-5">
                  <a
                    href={copy.ctaFinal.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {isFr ? "ou " : "or "}
                    {copy.ctaFinal.secondaryCta.label.toLowerCase()} →
                  </a>
                </p>

                <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/70 md:text-sm">
                  {copy.ctaFinal.reassurance.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-12 text-sm text-white/60">
                  {copy.ctaFinal.microcopyPrefix}{" "}
                  <Link
                    href={copy.ctaFinal.microcopyLink.href}
                    className="underline underline-offset-4 transition-colors hover:text-white"
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
