import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/lib/dictionary"
import { salesTeamsCopy } from "@/lib/sales-teams-copy"
import { SiteHeader } from "@/components/site/site-header"
import { SharedFooter } from "@/components/shared-footer"
import { HeroSection } from "@/components/site/hero-section"
import { Section } from "@/components/site/section"
import { CTABlock } from "@/components/site/cta-block"
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
        <SiteHeader lang={lang} dictionary={dictionary} activePage="for-sales-teams" />

        <main className="flex-1">
          <HeroSection
            eyebrow={copy.hero.eyebrow}
            headline={copy.hero.headline}
            subhead={copy.hero.subhead}
            primary={copy.hero.primary}
            secondary={copy.hero.secondary}
            tertiary={copy.hero.tertiary}
          />

          {/* DEMO PLACEHOLDER */}
          <Section
            id="demo"
            tone="gray"
            container="default"
            eyebrow={copy.demo.eyebrow}
            title={copy.demo.title}
            lede={copy.demo.lede}
          >
            <ScrollReveal>
              <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_30px_60px_-30px_rgba(13,71,161,0.2)]">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-900">
                  <Image
                    src="/images/pivot-mcp/supervision-console-mockup.png"
                    alt="Supervision console mockup"
                    fill
                    className="object-cover opacity-95"
                    sizes="(min-width: 1024px) 48rem, 100vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
                    <p className="text-sm text-white/90">{copy.demo.placeholder}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </Section>

          {/* THE PAINS WE SOLVE */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.pains.eyebrow}
          >
            <ScrollReveal stagger className="grid gap-6 md:grid-cols-2">
              {copy.pains.items.map((item, idx) => (
                <article
                  key={idx}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 md:p-7"
                >
                  <h3 className="text-lg font-semibold text-gray-900 md:text-xl">{item.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* A DAY IN THE LIFE */}
          <Section
            tone="inverted"
            container="default"
            eyebrow={copy.day.eyebrow}
            title={copy.day.title}
          >
            <ScrollReveal stagger className="mx-auto max-w-3xl space-y-4">
              {copy.day.timeline.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="w-24 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6ddcff]">
                    {entry.time}
                  </div>
                  <p className="text-sm leading-relaxed text-white/85">{entry.body}</p>
                </div>
              ))}
            </ScrollReveal>
          </Section>

          {/* 3 PILLARS */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.pillars.eyebrow}
            title={copy.pillars.title}
          >
            <ScrollReveal stagger className="grid gap-6 md:grid-cols-3">
              {copy.pillars.items.map((item, idx) => (
                <article
                  key={idx}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7"
                >
                  <span className="font-mono text-[11px] tracking-wider text-[#0d47a1]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900 md:text-xl">
                    {item.heading}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{item.body}</p>
                </article>
              ))}
            </ScrollReveal>
          </Section>

          {/* WHAT STAYS HUMAN vs WHAT THE AGENT HANDLES */}
          <Section
            tone="gray"
            container="default"
            eyebrow={copy.whatStays.eyebrow}
            title={copy.whatStays.title}
          >
            <ScrollReveal className="grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0d47a1]">
                  {copy.whatStays.humanLabel}
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {copy.whatStays.human.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  {copy.whatStays.agentLabel}
                </h3>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {copy.whatStays.agent.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-gray-700 md:text-lg">
              {copy.whatStays.outcome}
            </p>
          </Section>

          {/* COMPLIANCE */}
          <Section
            tone="white"
            container="default"
            eyebrow={copy.compliance.eyebrow}
            title={copy.compliance.title}
          >
            <ScrollReveal stagger className="mx-auto max-w-3xl space-y-3">
              {copy.compliance.items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                    ✓
                  </span>
                  <span className="text-sm leading-relaxed text-gray-700">{item}</span>
                </div>
              ))}
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
