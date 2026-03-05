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
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const isEnglish = lang === "en"

  return {
    title: dictionary.title,
    description: dictionary.description,
    keywords: isEnglish
      ? "AI-Native CRM, AI CRM, sales automation, pipeline management, European CRM, AI agents, scaleup"
      : "CRM IA, CRM AI-Native, automatisation commerciale, pipeline commercial, CRM européen, agents IA, scaleup",
    openGraph: {
      title: dictionary.title,
      description: dictionary.description,
      url: `https://symbioz.ai/${lang}`,
      siteName: "SymbiozAI",
      images: [
        {
          url: `/og?lang=${lang}`,
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
      images: [`/og?lang=${lang}`],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}`,
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
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  return <>{children}</>
}
