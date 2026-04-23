import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === "en"

  const title = isEnglish
    ? "SymbiozAI Manifesto | Tomorrow's company will be AI-Native. Or it won't be."
    : "Manifeste SymbiozAI | L'entreprise de demain sera AI-Native. Ou ne sera pas."
  const description = isEnglish
    ? "The AI-Native company built from the inside out — and the MCP-only CRM operated by your agent. For 25 years we asked humans to open their CRM. In 2026, the agent operates it."
    : "L'entreprise AI-Native construite de l'intérieur — et le CRM MCP-only opéré par votre agent. Pendant 25 ans on a demandé aux humains d'ouvrir leur CRM. En 2026, l'agent l'opère."

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
