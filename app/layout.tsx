import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"

export const metadata: Metadata = {
  title: "SymbiozAI - Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.",
  description:
    "Votre prospection, votre suivi client et vos mises à jour CRM sont complètement automatisés, pilotés depuis WhatsApp et Slack, avec un agent IA intégré.",
  keywords: "CRM, IA-Native, intelligence artificielle, automatisation, prospection, suivi client, WhatsApp, Slack",
  openGraph: {
    title: "SymbiozAI - Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.",
    description:
      "Votre prospection, votre suivi client et vos mises à jour CRM sont complètement automatisés, pilotés depuis WhatsApp et Slack.",
    url: "https://symbioz.ai",
    siteName: "SymbiozAI",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "SymbiozAI - Le premier CRM 100% IA-Native.",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SymbiozAI - Le premier CRM 100% IA-Native. Conçu pour travailler à votre place.",
    description: "Votre prospection, votre suivi client et vos mises à jour CRM sont complètement automatisés.",
    images: ["/og"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://symbioz.ai",
    languages: {
      en: "https://symbioz.ai/en",
      fr: "https://symbioz.ai/fr",
    },
  },
  icons: {
    icon: { url: "data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%230A0A0A'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230A0A0A'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23050505'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' fill='%23FFF'/%3E%3Cg transform='translate(0,-3) scale(0.32)'%3E%3Cpath d='M100 50L50 80 50 140 100 170Z' fill='url(%23a)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.7'/%3E%3Cpath d='M100 50L150 80 150 140 100 170Z' fill='url(%23b)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.8'/%3E%3Cpath d='M100 50L50 80 100 110 150 80Z' fill='url(%23c)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.9'/%3E%3Ccircle cx='100' cy='110' r='14' fill='%230088C2'/%3E%3Ccircle cx='100' cy='110' r='8' fill='%2300A8E8'/%3E%3C/g%3E%3C/svg%3E", type: "image/svg+xml" },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23000'/%3E%3Cstop offset='100%25' stop-color='%230A0A0A'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230A0A0A'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%23050505'/%3E%3Cstop offset='100%25' stop-color='%23000'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' fill='%23FFF'/%3E%3Cg transform='translate(0,-3) scale(0.32)'%3E%3Cpath d='M100 50L50 80 50 140 100 170Z' fill='url(%23a)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.7'/%3E%3Cpath d='M100 50L150 80 150 140 100 170Z' fill='url(%23b)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.8'/%3E%3Cpath d='M100 50L50 80 100 110 150 80Z' fill='url(%23c)' stroke='%230088C2' stroke-width='3' stroke-linejoin='round' opacity='1' stroke-opacity='.9'/%3E%3Ccircle cx='100' cy='110' r='14' fill='%230088C2'/%3E%3Ccircle cx='100' cy='110' r='8' fill='%2300A8E8'/%3E%3C/g%3E%3C/svg%3E" />
      </head>
      <body>
        {children}

        {/* Google tag (gtag.js) - Placé à la fin du body pour une meilleure détection */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1P585GSSEQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1P585GSSEQ');
          `}
        </Script>
      </body>
    </html>
  )
}
