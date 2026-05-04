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

  // Baseline title post-pivot Revenue Brain (2026-05-04). Mirror de
  // `app/[lang]/page.tsx`. Cette metadata sert de fallback aux sous-routes
  // de `/[lang]/` qui n'overrident pas leur propre `generateMetadata`.
  const brandTitle = isEnglish
    ? "SymbiozAI — The 1st agentic Revenue Brain. MCP by design."
    : "SymbiozAI — Le 1er Revenue Brain agentique. MCP by design."

  const ogImage = `/og/og-${isEnglish ? "en" : "fr"}.png`

  return {
    title: brandTitle,
    description: dictionary.description,
    keywords: isEnglish
      ? "headless AI CRM, MCP CRM, AI-native CRM, CRM for AI agents, agent-native CRM, Model Context Protocol CRM, Claude Code CRM, Cursor CRM, EU CRM"
      : "CRM headless, CRM MCP, CRM IA-native, CRM pour agents IA, CRM agent-native, Model Context Protocol, Claude Code, Cursor, CRM européen",
    openGraph: {
      title: brandTitle,
      description: dictionary.description,
      url: `https://symbioz.ai/${lang}`,
      siteName: "SymbiozAI",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: brandTitle,
        },
      ],
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandTitle,
      description: dictionary.description,
      images: [ogImage],
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
