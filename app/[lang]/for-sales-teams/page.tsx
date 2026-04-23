import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { salesTeamsCopy } from "@/lib/sales-teams-copy"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { HeroSection } from "@/components/site/hero-section"
import { Section } from "@/components/site/section"
import { CTABlock } from "@/components/site/cta-block"
import { FAQSchema } from "@/components/site/faq-schema"
import { StructuredData } from "@/components/site/structured-data"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SupervisionConsolePreview } from "@/components/site/supervision-console-preview"
import { AgentCompatibilityStrip } from "@/components/site/agent-compatibility-strip"

type SiteLang = "en" | "fr"

function resolveLang(lang: string): SiteLang {
  return lang === "fr" ? "fr" : "en"
}

export const dynamicParams = false

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang: rawLang } = await params
  const lang = resolveLang(rawLang)
  const copy = salesTeamsCopy[lang]
  const isEnglish = lang === "en"

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords:
      "AI sales CRM, autonomous CRM, AI agent sales team, CRM AI workforce, sales automation, MCP sales CRM",
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://symbioz.ai/${lang}/for-sales-teams`,
      siteName: "SymbiozAI",
      images: [
        {
          url: "/images/pivot-mcp/og-image-symbiozai.png",
          width: 1200,
          height: 630,
          alt: copy.meta.title,
        },
      ],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/images/pivot-mcp/og-image-symbiozai.png"],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/for-sales-teams`,
      languages: {
        "x-default": "https://symbioz.ai/en/for-sales-teams",
        en: "https://symbioz.ai/en/for-sales-teams",
        fr: "https://symbioz.ai/fr/for-sales-teams",
      },
    },
  }
}

/**
 * /for-sales-teams - YC-grade copy v2 + design polish (2026-04-23).
 *
 * Same treatment as home (commit f18998a) and /mcp (commits f9cc713 +
 * 106b6d3). Canonical section structure enforced:
 *   - Numbered mono eyebrow (01..09) + H2 + description (lede) + visual
 *   - Typography duale (font-mono eyebrows + sans body)
 *   - Vertical rhythm via Section rhythm="generous" (default)
 *   - Card chrome unified (rounded-2xl border-gray-200 + brand-tinted shadow)
 *   - Palette strictly brand blue + neutrals + emerald (live/green states) +
 *     amber (HITL Orange states). Red reserved for HITL Red class only.
 *   - Alternating backgrounds (white / gray / inverted) for scan rhythm.
 *
 * PNG cleanup:
 *   - supervision-console-mockup.png -> SupervisionConsolePreview (native)
 *   - logo-strip-agents.png -> AgentCompatibilityStrip (native)
 *
 * Hero S1 VERROUILLE - directive Laurent.
 */
export default async function ForSalesTeamsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: rawLang } = await params
  const lang = resolveLang(rawLang)
  const dictionary = getDictionary(lang)
  const copy = salesTeamsCopy[lang]

  const softwareSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SymbiozAI for sales teams",
    applicationCategory: "BusinessApplication",
    operatingSystem: "MCP-compatible AI agents",
    description: copy.meta.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "0",
      description: "Free beta: 500 MCP calls/day.",
    },
  }

  return (
    <>
      <StructuredData data={softwareSchema} />
      <FAQSchema items={copy.faq} />

      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
        <SharedHeader lang={lang} dictionary={dictionary} activePage="for-sales-teams" />

        <main className="flex-1">
          {/* HERO - VERROUILLE (directive Laurent) */}
          <HeroSection
            eyebrow={copy.hero.eyebrow}
            headline={copy.hero.headline}
            subhead={copy.hero.subhead}
            primary={copy.hero.primary}
            secondary={copy.hero.secondary}
            tertiary={copy.hero.tertiary}
          />

          {/* ================================================================
              01 - SUPERVISION CONSOLE PREVIEW
              Native inbox-style mockup replaces supervision-console-mockup.png.
              ================================================================ */}
          <Section
            id="demo"
            tone="gray"
            container="default"
            eyebrow={`01 · ${copy.demo.eyebrow}`}
            title={copy.demo.title}
            lede={copy.demo.lede}
          >
            <ScrollReveal>
              <SupervisionConsolePreview lang={lang} />
              <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-gray-600">
                {copy.demo.caption}
              </p>
            </ScrollReveal>
          </Section>

          {/* ================================================================
              02 - WHY YOUR PIPELINE LIES (pains)
              4-card grid. Card 3 carries Clari 2025 proof point.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`02 · ${copy.pains.eyebrow}`}
            title={copy.pains.title}
            lede={copy.pains.lede}
          >
            <ScrollReveal stagger className="grid gap-5 md:grid-cols-2 md:gap-6">
              {copy.pains.items.map((item, idx) => (
                <article
                  key={idx}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)] md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 max-w-[92%] text-lg font-semibold leading-snug text-gray-900 md:text-xl">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              03 - A TYPICAL DAY (timeline)
              Inverted tone for contrast. Signature line "You did not open
              HubSpot." at 8h06.
              ================================================================ */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={`03 · ${copy.day.eyebrow}`}
            title={copy.day.title}
            lede={copy.day.lede}
          >
            <ScrollReveal stagger className="mx-auto max-w-3xl">
              <ol className="relative space-y-3">
                {copy.day.timeline.map((entry, idx) => (
                  <li
                    key={idx}
                    className="group flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/20 sm:flex-row sm:gap-5 sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:w-28 sm:shrink-0 sm:flex-col sm:items-start">
                      <span
                        className="h-2 w-2 rounded-full bg-[#6ddcff]"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6ddcff]">
                        {entry.time}
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-white/85">{entry.body}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </Section>

          {/* ================================================================
              04 - 3 PILLARS
              H2 "Built for the teams that close." Mono eyebrow numeral inside
              each card.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`04 · ${copy.pillars.eyebrow}`}
            title={copy.pillars.title}
            lede={copy.pillars.lede}
          >
            <ScrollReveal stagger className="grid gap-5 md:grid-cols-3 md:gap-6">
              {copy.pillars.items.map((item, idx) => (
                <article
                  key={idx}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)]"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d47a1]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-gray-900 md:text-xl">
                    {item.heading}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-gray-600">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              05 - HUMAN vs AGENT
              Two-column split. Brand blue for human side, emerald for agent.
              Outcome sentence as anchor.
              ================================================================ */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`05 · ${copy.whatStays.eyebrow}`}
            title={copy.whatStays.title}
            lede={copy.whatStays.lede}
          >
            <ScrollReveal className="grid gap-5 md:grid-cols-2 md:gap-6">
              <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#0d47a1]" aria-hidden="true" />
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d47a1]">
                    {copy.whatStays.humanLabel}
                  </h3>
                </div>
                <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                  {copy.whatStays.human.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7">
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {copy.whatStays.agentLabel}
                  </h3>
                </div>
                <ul className="space-y-3 text-[15px] leading-relaxed text-gray-700">
                  {copy.whatStays.agent.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
            <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-medium leading-relaxed text-gray-900 md:text-xl">
              {copy.whatStays.outcome}
            </p>
          </Section>

          {/* ================================================================
              06 - AGENT COMPATIBILITY
              Native text-only badge strip replaces logo-strip-agents.png.
              Kept at narrow container for airier scan.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`06 · ${copy.agents.eyebrow}`}
            title={copy.agents.title}
            lede={copy.agents.lede}
          >
            <ScrollReveal>
              <AgentCompatibilityStrip lang={lang} ariaLabel={copy.agents.alt} />
              <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-gray-600">
                {copy.agents.caption}
              </p>
            </ScrollReveal>
          </Section>

          {/* ================================================================
              07 - COMPLIANCE - Five facts (Stripe format)
              Upgrade from bullet list to numbered "facts" cards.
              ================================================================ */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`07 · ${copy.compliance.eyebrow}`}
            title={copy.compliance.title}
            lede={copy.compliance.description}
          >
            <ScrollReveal stagger className="mx-auto grid max-w-4xl gap-4 md:gap-5">
              {copy.compliance.items.map((fact, idx) => (
                <article
                  key={fact.label}
                  className="flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-150 hover:border-[#0d47a1]/25 md:p-6"
                >
                  <div className="flex w-16 shrink-0 flex-col items-start">
                    <span
                      className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#0d47a1]"
                    >
                      {fact.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 h-px w-8 bg-[#0d47a1]/30"
                    />
                  </div>
                  <p className="flex-1 text-[15px] leading-relaxed text-gray-800">
                    {fact.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden font-mono text-[11px] tracking-[0.18em] text-gray-300 md:block"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              08 - FAQ (Head of Sales)
              3 questions reformulated for ROI J30 / ramp time / agent errors.
              ================================================================ */}
          <Section
            tone="white"
            container="narrow"
            eyebrow={`08 · ${copy.faqSection.eyebrow}`}
            title={copy.faqSection.title}
            lede={copy.faqSection.lede}
            titleAlign="center"
          >
            <ScrollReveal stagger className="space-y-4">
              {copy.faq.map((item, idx) => (
                <article
                  key={idx}
                  className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-150 hover:border-[#0d47a1]/25 md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="max-w-[90%] text-base font-semibold text-gray-900 md:text-lg">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
                    {item.answer}
                  </p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              09 - CTA FINAL
              Signature line "Your pipeline is either accurate or useless."
              ================================================================ */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0d47a1] via-[#123a8f] to-[#1a237e] text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_top_left,rgba(109,220,255,0.25),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(109,220,255,0.18),transparent_55%)]"
            />
            <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
              <ScrollReveal>
                <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6ddcff]">
                  09 · {lang === "fr" ? "Prendre rendez-vous" : "Book a meeting"}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl md:leading-[1.05]">
                  {copy.ctaFinal.title}
                </h2>
                <p className="mt-5 text-base text-white/80 md:text-lg">{copy.ctaFinal.lede}</p>
                <div className="mt-9">
                  <CTABlock primary={copy.ctaFinal.primary} align="center" size="lg" />
                </div>
                <p className="mt-6 text-sm text-white/70">
                  <Link
                    href={copy.ctaFinal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition hover:text-white"
                  >
                    {copy.ctaFinal.linkedinLabel}
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
