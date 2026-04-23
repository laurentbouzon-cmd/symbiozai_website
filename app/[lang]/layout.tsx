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
      ? "headless AI CRM, MCP CRM, AI-native CRM, CRM for AI agents, agent-native CRM, Model Context Protocol CRM, Claude Code CRM, Cursor CRM, EU CRM"
      : "CRM headless, CRM MCP, CRM IA-native, CRM pour agents IA, CRM agent-native, Model Context Protocol, Claude Code, Cursor, CRM européen",
    openGraph: {
      title: dictionary.title,
      description: dictionary.description,
      url: `https://symbioz.ai/${lang}`,
      siteName: "SymbiozAI",
      images: [
        {
          url: "/images/pivot-mcp/og-image-symbiozai.png",
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
      images: ["/images/pivot-mcp/og-image-symbiozai.png"],
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}`,
      languages: {
        "x-default": "https://symbioz.ai/en",
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
