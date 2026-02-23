import type React from "react"
import "../globals.css"
import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"

// Définir les langues supportées pour la génération statique
export const dynamicParams = false
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

// Générer les métadonnées en fonction de la langue
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dictionary = getDictionary(params.lang)
  const isEnglish = params.lang === "en"

  return {
    title: `SymbiozAI - ${dictionary.subtitle}`,
    description: dictionary.description,
    keywords: isEnglish
      ? "AI, artificial intelligence, AI agents, automation, productivity, business, innovation"
      : "IA, intelligence artificielle, agents IA, automatisation, productivité, entreprise, innovation",
    openGraph: {
      title: `SymbiozAI - ${dictionary.subtitle}`,
      description: dictionary.description,
      url: `https://symbioz.ai/${params.lang}`,
      siteName: "SymbiozAI",
      images: [
        {
          url: `/og?lang=${params.lang}`,
          width: 1200,
          height: 630,
          alt: `SymbiozAI - ${dictionary.subtitle}`,
        },
      ],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `SymbiozAI - ${dictionary.subtitle}`,
      description: dictionary.description,
      images: [`/og?lang=${params.lang}`],
    },
    alternates: {
      canonical: `https://symbioz.ai/${params.lang}`,
      languages: {
        "x-default": "https://symbioz.ai",
        en: "https://symbioz.ai/en",
        fr: "https://symbioz.ai/fr",
      },
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Vérifier que la langue est valide
  const validLang = ["en", "fr"].includes(params.lang) ? params.lang : "en"

  return <>{children}</>

}
