import type { Metadata } from "next"
import Image from "next/image"
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
import { ScrollReveal } from "@/components/scroll-reveal"

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
          <HeroSection
            eyebrow={copy.hero.eyebrow}
            headline={copy.hero.headline}
            subhead={copy.hero.subhead}
            primary={copy.hero.primary}
            secondary={copy.hero.secondary}
            tertiary={copy.hero.tertiary}
          />

          {/* QUICKSTART */}
          <Section
            id="quickstart"
            tone="white"
            container="default"
            eyebrow={copy.quickstart.eyebrow}
            title={copy.quickstart.title}
          >
            <ScrollReveal stagger className="grid gap-5 lg:grid-cols-3">
              {copy.quickstart.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0d47a1] to-[#00e5ff] text-sm font-semibold text-white">
                    {idx + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{step.body}</p>
                  {step.code && (
                    <div className="mt-5">
                      <CodeBlock code={step.code} language="bash" />
                    </div>
                  )}
                </div>
              ))}
            </ScrollReveal>
          </Section>

          {/* AGENT CONFIGS */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={copy.agentConfigs.eyebrow}
            title={copy.agentConfigs.title}
            lede={copy.agentConfigs.lede}
          >
            <ScrollReveal stagger className="grid gap-6 lg:grid-cols-3">
              {copy.agentConfigs.clients.map((client) => (
                <article
                  key={client.name}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#6ddcff]">
                    {client.name}
                  </h3>
                  <CodeBlock code={client.code} language="json" caption={client.label} />
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* 35 MISSIONS */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.missions.eyebrow}
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
            <p className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-sm text-gray-600">
              {copy.missions.phase2Note}
            </p>
          </Section>

          {/* WRAP-FIRST ARCHITECTURE (migrated from /features) */}
          <Section
            tone="gray"
            container="default"
            eyebrow={copy.wrapFirst.eyebrow}
            title={copy.wrapFirst.title}
            lede={copy.wrapFirst.lede}
          >
            <ScrollReveal>
              <div className="mx-auto mb-10 max-w-3xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-4">
                <Image
                  src="/images/pivot-mcp/architecture-diagram-wrap-first.png"
                  alt="Wrap-first architecture: 23 data providers through SymbiozAI MCP server to your AI agent"
                  width={1200}
                  height={720}
                  className="w-full rounded-2xl"
                  sizes="(min-width: 1024px) 48rem, 100vw"
                />
              </div>
              <p className="mx-auto mb-8 max-w-3xl text-center text-lg font-semibold text-gray-900">
                {copy.wrapFirst.result}
              </p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div className="hidden grid-cols-[0.4fr_1fr] gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 md:grid">
                  <div>{copy.wrapFirst.layerLabel}</div>
                  <div>{copy.wrapFirst.providersLabel}</div>
                </div>
                <ul className="divide-y divide-gray-200">
                  {copy.wrapFirst.layers.map((row) => (
                    <li key={row.layer} className="px-4 py-4 md:grid md:grid-cols-[0.4fr_1fr] md:gap-4 md:px-5">
                      <div className="text-sm font-semibold text-gray-900">{row.layer}</div>
                      <div className="mt-1 text-sm text-gray-600 md:mt-0">{row.providers}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </Section>

          {/* HITL 3-CLASS POLICY (migrated from /features) */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.hitl.eyebrow}
            title={copy.hitl.title}
          >
            <ScrollReveal>
              <HITLExplainer
                classes={copy.hitl.classes}
                labelBehavior={copy.hitl.behaviorLabel}
                labelExamples={copy.hitl.examplesLabel}
              />
              <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-gray-700">
                {copy.hitl.footer}
              </p>
            </ScrollReveal>
          </Section>

          {/* THREE DIFFERENTIATORS */}
          <Section
            tone="gray"
            container="default"
            eyebrow={copy.differentiators.eyebrow}
            title={copy.differentiators.title}
          >
            <ScrollReveal stagger className="grid gap-5 lg:grid-cols-3">
              {copy.differentiators.items.map((item) => (
                <article
                  key={item.code}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6"
                >
                  <code className="inline-block w-fit rounded bg-gray-900 px-2 py-0.5 font-mono text-xs text-white">
                    {item.code}
                  </code>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{item.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.body}</p>
                  <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs italic leading-relaxed text-gray-700">
                    {item.example}
                  </div>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* SUPERVISION CONSOLE */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.supervision.eyebrow}
            title={copy.supervision.title}
            lede={copy.supervision.lede}
          >
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.supervision.items.map((item) => (
                <article
                  key={item.heading}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <h3 className="text-sm font-semibold text-gray-900">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
            <p className="mt-10 text-center text-lg font-semibold text-gray-900">
              {copy.supervision.footer}
            </p>
          </Section>

          {/* COMPLIANCE */}
          <Section
            tone="gray"
            container="default"
            eyebrow={copy.compliance.eyebrow}
            title={undefined}
          >
            <ScrollReveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {copy.compliance.items.map((item) => (
                <article
                  key={item.heading}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5"
                >
                  <h3 className="text-sm font-semibold text-gray-900">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* AUDIT LOG WORM (migrated from /features) */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={copy.audit.eyebrow}
            title={copy.audit.title}
          >
            <ScrollReveal stagger className="grid gap-4 md:grid-cols-5">
              {copy.audit.bullets.map((item) => (
                <article
                  key={item.heading}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <h3 className="text-sm font-semibold text-white">{item.heading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* PRICING */}
          <Section
            tone="white"
            container="narrow"
            eyebrow={copy.pricing.eyebrow}
            title={copy.pricing.title}
            titleAlign="center"
          >
            <ScrollReveal>
              <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-600 md:text-lg">
                {copy.pricing.body}
              </p>
            </ScrollReveal>
          </Section>

          {/* CTA FINAL */}
          <section className="relative overflow-hidden bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white">
            <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-24">
              <ScrollReveal>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  {copy.ctaFinal.title}
                </h2>
                <p className="mt-4 text-base text-white/80 md:text-lg">{copy.ctaFinal.lede}</p>
                <div className="mt-8">
                  <CTABlock
                    primary={copy.ctaFinal.primary}
                    secondary={copy.ctaFinal.secondary}
                    align="center"
                    size="lg"
                  />
                </div>
                <p className="mt-6 text-sm text-white/70">
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
