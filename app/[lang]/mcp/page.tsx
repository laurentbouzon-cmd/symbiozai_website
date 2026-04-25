import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { mcpCopy, missionsCatalog } from "@/lib/mcp-page-copy"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"
import { HeroSection } from "@/components/site/hero-section"
import { Section } from "@/components/site/section"
import { CTABlock } from "@/components/site/cta-block"
import { CodeBlock } from "@/components/site/code-block"
import { MissionGrid } from "@/components/site/mission-grid"
import { HITLExplainer } from "@/components/site/hitl-explainer"
import { FAQSchema } from "@/components/site/faq-schema"
import { StructuredData } from "@/components/site/structured-data"
import { WrapFirstArchitecture } from "@/components/site/wrap-first-architecture"
import { Card } from "@/components/site/card"
import { ScrollReveal } from "@/components/scroll-reveal"

type SiteLang = "en" | "fr"

function resolveLang(lang: string): SiteLang {
  return lang === "fr" ? "fr" : "en"
}

/**
 * /mcp page - YC-grade design pass 2026-04-23.
 *
 * Structure canonique (homogene avec la home restructuree C+):
 *   Hero (verrouille alpha-corr "The MCP-only CRM.")
 *   01 Quickstart
 *   02 Agent configs
 *   03 MCP missions
 *   04 Wrap-first architecture (composant natif WrapFirstArchitecture)
 *   05 HITL policy
 *   06 Differentiators
 *   07 Supervision console
 *   08 Security & compliance
 *   09 Audit log WORM
 *   10 Pricing
 *   11 CTA Final
 *
 * Polish niveau YC:
 *   - Chaque section: eyebrow numerote + H2 + description (lede) + visuel/composant
 *   - Typography duale (font-mono eyebrows + sans body), rythme vertical
 *     genereux (rhythm="generous" via Section)
 *   - Chrome cartes unifie: rounded-2xl + border-gray-200 +
 *     hover:border-[#0d47a1]/30 + translate-y + shadow brand-tinted
 *   - Palette strictement brand + neutrals + emerald states
 *   - Background alterne bg-white / bg-gray-50 / inverted pour rythmer le scroll
 */

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
  const copy = mcpCopy[lang]
  const isEnglish = lang === "en"

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    keywords:
      "MCP CRM, CRM MCP server, Model Context Protocol CRM, CRM for AI agents, headless AI CRM, Claude Code MCP, Cursor MCP",
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://symbioz.ai/${lang}/mcp`,
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
      canonical: `https://symbioz.ai/${lang}/mcp`,
      languages: {
        "x-default": "https://symbioz.ai/en/mcp",
        en: "https://symbioz.ai/en/mcp",
        fr: "https://symbioz.ai/fr/mcp",
      },
    },
  }
}

export default async function MCPPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang = resolveLang(rawLang)
  const dictionary = getDictionary(lang)
  const copy = mcpCopy[lang]
  const missions = missionsCatalog[lang]

  const softwareSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SymbiozAI MCP Server",
    applicationCategory: "BusinessApplication",
    operatingSystem: "MCP-compatible AI agents",
    description: copy.meta.description,
    featureList: [
      "35 MCP missions covering full sales cycle",
      "3-class HITL policy (Green/Orange/Red)",
      "Immutable HMAC-signed WORM audit log",
      "AI Act article 14 compliance",
      "GDPR article 15 endpoint",
      "EU-hosted Frankfurt",
      "LLM-agnostic architecture",
      "DISC-based communication style analysis",
      "Multi-signal deal health scoring",
      "23 data providers via wrap-first architecture",
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "0",
      description: "Free beta: 500 MCP calls/day. Pay-per-use post-beta.",
    },
  }

  return (
    <>
      <StructuredData data={softwareSchema} />
      <FAQSchema items={copy.faq} />

      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
        <SharedHeader lang={lang} dictionary={dictionary} activePage="mcp" />

        <main className="flex-1">
          {/* HERO - verrouille alpha-corr "The MCP-only CRM." (directive Laurent) */}
          <HeroSection
            eyebrow={copy.hero.eyebrow}
            headline={copy.hero.headline}
            subhead={copy.hero.subhead}
            primary={copy.hero.primary}
            secondary={copy.hero.secondary}
            tertiary={copy.hero.tertiary}
          />

          {/* ================================================================
              01 - QUICKSTART
              3 steps cards with mono step numeral + premium code block.
              ================================================================ */}
          <Section
            id="quickstart"
            tone="white"
            container="default"
            eyebrow={`01 · ${copy.quickstart.eyebrow}`}
            title={copy.quickstart.title}
            lede={copy.quickstart.lede}
          >
            <ScrollReveal stagger className="grid gap-5 lg:grid-cols-3 lg:gap-6">
              {copy.quickstart.steps.map((step, idx) => (
                <Card
                  key={idx}
                  className="group relative flex h-full flex-col overflow-hidden md:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-300"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0d47a1] to-[#00e5ff] text-sm font-semibold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-gray-900">
                    {step.heading}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{step.body}</p>
                  {step.code && (
                    <div className="mt-5">
                      <CodeBlock code={step.code} language="bash" />
                    </div>
                  )}
                </Card>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              02 - AGENT CONFIGS (inverted tone)
              Dark section reserved for drop-in config snippets - echoes the
              CodeBlock chrome and signals "this is where devs land".
              ================================================================ */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={`02 · ${copy.agentConfigs.eyebrow}`}
            title={copy.agentConfigs.title}
            lede={copy.agentConfigs.lede}
          >
            <ScrollReveal stagger className="grid gap-6 lg:grid-cols-3">
              {copy.agentConfigs.clients.map((client) => (
                <article
                  key={client.name}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/20"
                >
                  <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6ddcff]">
                    {client.name}
                  </h3>
                  <CodeBlock code={client.code} language="json" caption={client.label} />
                  <p className="mt-4 text-[13px] leading-relaxed text-white/70">
                    {client.note}
                  </p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              03 - 35 MCP MISSIONS
              Catalog grouped by category. MissionGrid already provides
              unified card chrome with HITL dots per mission.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`03 · ${copy.missions.eyebrow}`}
            title={copy.missions.title}
            lede={copy.missions.lede}
          >
            {missions.map((category) => (
              <ScrollReveal key={category.title}>
                <MissionGrid
                  title={category.title}
                  subtitle={category.subtitle}
                  missions={category.missions}
                />
              </ScrollReveal>
            ))}
            <p className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-sm leading-relaxed text-gray-600">
              {copy.missions.phase2Note}
            </p>
          </Section>

          {/* ================================================================
              04 - WRAP-FIRST ARCHITECTURE
              Native SVG+Tailwind component replaces the PNG diagram.
              Providers catalog (left) -> MCP endpoint hub (right).
              ================================================================ */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`04 · ${copy.wrapFirst.eyebrow}`}
            title={copy.wrapFirst.title}
            lede={copy.wrapFirst.lede}
          >
            <ScrollReveal>
              <WrapFirstArchitecture lang={lang} />
              <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
                {copy.wrapFirst.result}
              </p>
            </ScrollReveal>
          </Section>

          {/* ================================================================
              05 - HITL 3-CLASS POLICY
              Shared HITLExplainer component (also used on /for-sales-teams).
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`05 · ${copy.hitl.eyebrow}`}
            title={copy.hitl.title}
            lede={copy.hitl.lede}
          >
            <ScrollReveal>
              <HITLExplainer
                classes={copy.hitl.classes}
                labelBehavior={copy.hitl.behaviorLabel}
                labelExamples={copy.hitl.examplesLabel}
              />
              <div className="mx-auto mt-12 max-w-2xl">
                <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                  {copy.hitl.policyLabel}
                </p>
                <CodeBlock code={copy.hitl.policyCode} language="json" />
              </div>
              <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-gray-700 md:text-[17px]">
                {copy.hitl.footer}
              </p>
            </ScrollReveal>
          </Section>

          {/* ================================================================
              06 - THREE DIFFERENTIATORS
              Cards with mono mission-code badge + example prompt callout.
              ================================================================ */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`06 · ${copy.differentiators.eyebrow}`}
            title={copy.differentiators.title}
            lede={copy.differentiators.lede}
          >
            <ScrollReveal stagger className="grid gap-5 lg:grid-cols-3 lg:gap-6">
              {copy.differentiators.items.map((item) => (
                <Card
                  as="article"
                  key={item.code}
                  className="group relative flex h-full flex-col overflow-hidden md:p-7"
                >
                  <code className="inline-block w-fit rounded bg-gray-900 px-2 py-0.5 font-mono text-xs text-white">
                    {item.code}
                  </code>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-gray-900">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-600">{item.body}</p>
                  <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                      {copy.differentiators.examplePromptLabel}
                    </p>
                    <p className="font-mono text-[12.5px] italic leading-relaxed text-gray-700">
                      {item.example}
                    </p>
                  </div>
                  <div className="mt-3 rounded-xl border border-[#0d47a1]/15 bg-[#0d47a1]/[0.04] px-4 py-3">
                    <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0d47a1]">
                      {copy.differentiators.expectedOutputLabel}
                    </p>
                    <p className="text-[13px] leading-relaxed text-gray-700">
                      {item.expected}
                    </p>
                  </div>
                </Card>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              07 - SUPERVISION CONSOLE
              4 role cards + reinforcing footer quote.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`07 · ${copy.supervision.eyebrow}`}
            title={copy.supervision.title}
            lede={copy.supervision.lede}
          >
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              {copy.supervision.items.map((item) => (
                <Card
                  as="article"
                  key={item.heading}
                  className="group flex h-full flex-col"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight text-gray-900">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-gray-600">{item.body}</p>
                </Card>
              ))}
            </ScrollReveal>
            <p className="mx-auto mt-12 max-w-3xl text-center text-lg font-semibold tracking-tight text-gray-900 md:text-xl">
              {copy.supervision.footer}
            </p>
          </Section>

          {/* ================================================================
              08 - SECURITY & COMPLIANCE
              5 compliance cards. Keep numbered eyebrow even though original
              had no H2 (header block still rendered via eyebrow).
              ================================================================ */}
          <Section
            tone="gray"
            container="default"
            eyebrow={`08 · ${copy.compliance.eyebrow}`}
            title={copy.compliance.title}
            lede={copy.compliance.lede}
          >
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {copy.compliance.items.map((item) => (
                <Card
                  as="article"
                  key={item.heading}
                  className="group flex h-full flex-col"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight text-gray-900">
                    {item.heading}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-gray-600">{item.body}</p>
                </Card>
              ))}
            </ScrollReveal>
          </Section>

          {/* ================================================================
              09 - AUDIT LOG WORM (inverted tone)
              Dark backdrop reserved for the trust & compliance bedrock.
              ================================================================ */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={`09 · ${copy.audit.eyebrow}`}
            title={copy.audit.title}
            lede={copy.audit.lede}
          >
            <ScrollReveal stagger className="grid gap-4 md:grid-cols-5 lg:gap-5">
              {copy.audit.bullets.map((item) => (
                <article
                  key={item.heading}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-200 hover:border-white/25"
                >
                  <h3 className="text-[15px] font-semibold text-white">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
            <div className="mx-auto mt-10 max-w-2xl">
              <CodeBlock
                code={copy.audit.exampleCode}
                language="bash"
                caption={copy.audit.exampleCaption}
              />
            </div>
          </Section>

          {/* ================================================================
              10 - PRICING
              Narrow container, center-aligned title, single paragraph body.
              ================================================================ */}
          <Section
            tone="white"
            container="default"
            eyebrow={`10 · ${copy.pricing.eyebrow}`}
            title={copy.pricing.title}
            lede={copy.pricing.lede}
          >
            <ScrollReveal stagger className="grid gap-5 md:grid-cols-3 lg:gap-6">
              {copy.pricing.blocks.map((block) => (
                <Card
                  as="article"
                  key={block.heading}
                  className="group flex h-full flex-col md:p-7"
                >
                  <h3 className="text-[16px] font-semibold tracking-tight text-gray-900">
                    {block.heading}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-gray-600">
                    {block.body}
                  </p>
                </Card>
              ))}
            </ScrollReveal>
            <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-gray-600 md:text-[15px]">
              {copy.pricing.footerNote}{" "}
              <Link
                href={copy.pricing.footerLinkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0d47a1] underline underline-offset-4 transition hover:text-[#0d47a1]/80"
              >
                {copy.pricing.footerLinkLabel}
              </Link>
            </p>
          </Section>

          {/* ================================================================
              11 - CTA FINAL
              Dark gradient block, keeps tertiary Calendly link verrouille.
              ================================================================ */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white">
            {/* Dotted backdrop. Density + dot size aligned with hero home
                reference (10x10 grid, 1px dot). Color stays rgba white on
                dark gradient for contrast. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
            <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:py-32">
              <ScrollReveal>
                <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  11 · {copy.ctaFinal.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.08] lg:text-5xl lg:leading-[1.05]">
                  {copy.ctaFinal.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl">
                  {copy.ctaFinal.lede}
                </p>
                <div className="mt-10">
                  <CTABlock
                    primary={copy.ctaFinal.primary}
                    secondary={copy.ctaFinal.secondary}
                    align="center"
                    size="lg"
                  />
                </div>
                <p className="mt-8 text-sm text-white/80">
                  {copy.ctaFinal.walkthroughNote}{" "}
                  <Link
                    href={copy.ctaFinal.walkthroughLinkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4 transition hover:text-white"
                  >
                    {copy.ctaFinal.walkthroughLinkLabel}
                  </Link>
                </p>
                <p className="mt-4 text-sm text-white/70">
                  <Link
                    href="https://docs.symbioz.ai/mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 transition hover:text-white"
                  >
                    {copy.docsLink}
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
