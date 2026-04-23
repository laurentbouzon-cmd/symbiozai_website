import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { aboutCopy } from "@/lib/about-page-copy"
import { SiteHeader } from "@/components/site/site-header"
import { SharedFooter } from "@/components/shared-footer"
import { Section } from "@/components/site/section"
import { CTABlock } from "@/components/site/cta-block"
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
  const copy = aboutCopy[lang]
  const isEnglish = lang === "en"

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `https://symbioz.ai/${lang}/about`,
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
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/images/pivot-mcp/og-image-symbiozai.png"],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/about`,
      languages: {
        "x-default": "https://symbioz.ai/en/about",
        en: "https://symbioz.ai/en/about",
        fr: "https://symbioz.ai/fr/about",
      },
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang = resolveLang(rawLang)
  const dictionary = getDictionary(lang)
  const copy = aboutCopy[lang]
  const isFr = lang === "fr"

  const orgSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SymbiozAI",
    url: "https://symbioz.ai",
    logo: "https://symbioz.ai/icon.png",
    description: copy.meta.description,
    foundingLocation: "France, EU",
    areaServed: "Worldwide",
    sameAs: [
      "https://www.linkedin.com/company/symbiozai",
      "https://www.linkedin.com/in/laurent-bouzon-150237108",
    ],
  }

  const personSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Laurent Bouzon",
    jobTitle: "Founder, SymbiozAI",
    worksFor: { "@type": "Organization", name: "SymbiozAI" },
    sameAs: "https://www.linkedin.com/in/laurent-bouzon-150237108",
    description:
      "15 years of B2B sales experience. Founder of SymbiozAI, the MCP-only headless AI CRM.",
  }

  return (
    <>
      <StructuredData data={[orgSchema, personSchema]} />

      <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
        <SiteHeader lang={lang} dictionary={dictionary} activePage="about" />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden bg-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(13,71,161,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative z-10 mx-auto max-w-4xl px-4 pt-32 pb-16 sm:px-6 md:pt-40 md:pb-24">
              <ScrollReveal>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0d47a1]">
                  {copy.hero.eyebrow}
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.05]">
                  {copy.hero.headline}
                </h1>
                <p className="mt-8 border-l-2 border-[#0d47a1] pl-5 text-xl italic text-gray-700 md:text-2xl">
                  &ldquo;{copy.hero.pullQuote}&rdquo;
                </p>
                <p className="mt-10 text-sm text-gray-500">
                  {isFr ? "Version anglaise :" : "French version:"}{" "}
                  <Link
                    href={`/${isFr ? "en" : "fr"}/about`}
                    className="font-medium text-[#0d47a1] underline-offset-4 hover:underline"
                  >
                    /{isFr ? "en" : "fr"}/about
                  </Link>
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* LONG-FORM */}
          <Section tone="white" container="narrow">
            <div className="space-y-14">
              {copy.sections.map((section) => (
                <ScrollReveal key={section.title}>
                  <article>
                    <h2 className="mb-6 text-2xl font-semibold tracking-tight text-gray-950 md:text-3xl">
                      {section.title}
                    </h2>
                    {"paragraphs" in section && section.paragraphs && (
                      <div className="space-y-5 text-base leading-relaxed text-gray-700 md:text-lg">
                        {section.paragraphs.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>
                    )}
                    {"pullQuote" in section && section.pullQuote && (
                      <blockquote className="mt-8 border-l-2 border-[#0d47a1] pl-5 text-xl italic text-gray-900 md:text-2xl">
                        &ldquo;{section.pullQuote}&rdquo;
                      </blockquote>
                    )}
                    {"subsections" in section && section.subsections && (
                      <div className="mt-2 grid gap-5 md:grid-cols-3">
                        {section.subsections.map((sub) => (
                          <div
                            key={sub.heading}
                            className="rounded-2xl border border-gray-200 bg-white p-5"
                          >
                            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#0d47a1]">
                              {sub.heading}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600">{sub.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {"list" in section && section.list && (
                      <ul className="mt-2 space-y-2.5 text-base text-gray-700">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span
                              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d47a1]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA */}
            <ScrollReveal>
              <div className="mt-16 flex flex-col items-center gap-4 border-t border-gray-200 pt-10 text-center">
                <CTABlock primary={copy.cta.primary} align="center" size="lg" />
                <Link
                  href={copy.cta.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#0d47a1] underline-offset-4 hover:underline"
                >
                  {copy.cta.linkedinLabel}
                </Link>
              </div>
            </ScrollReveal>
          </Section>
        </main>

        <SharedFooter lang={lang} dictionary={dictionary} />
      </div>
    </>
  )
}
