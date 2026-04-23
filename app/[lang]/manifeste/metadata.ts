import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === "en"

  const title = isEnglish
    ? "SymbiozAI Manifesto | The MCP-only CRM. Operated by your agent."
    : "Manifeste SymbiozAI | Le CRM MCP-only. Opéré par votre agent."
  const description = isEnglish
    ? "For 25 years, we asked humans to open their CRM. In 2026, the AI agent operates it. SymbiozAI is MCP-only by design. Not by option."
    : "Pendant 25 ans, on a demandé aux humains d'ouvrir leur CRM. En 2026, l'agent IA l'opère. SymbiozAI est MCP-only by design. Pas by option."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://symbioz.ai/${lang}/manifeste`,
      siteName: "SymbiozAI",
      images: [
        {
          url: `/og?lang=${lang}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og?lang=${lang}`],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/manifeste`,
      languages: {
        "x-default": "https://symbioz.ai/fr/manifeste",
        en: "https://symbioz.ai/en/manifeste",
        fr: "https://symbioz.ai/fr/manifeste",
      },
    },
  }
}
