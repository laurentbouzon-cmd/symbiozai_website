import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === "en"

  const title = isEnglish
    ? "SymbiozAI Manifesto | The headless AI CRM vision"
    : "Manifeste SymbiozAI | La vision du CRM headless"
  const description = isEnglish
    ? "SymbiozAI is the headless AI CRM — operated by your AI agent via MCP. This is the long-form thesis behind the product."
    : "SymbiozAI est le CRM headless piloté par votre agent IA via MCP. Voici la thèse long format derrière le produit."

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
