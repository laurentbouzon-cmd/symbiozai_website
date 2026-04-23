import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://symbioz.ai"),
  title: "The headless AI CRM | SymbiozAI",
  description:
    "SymbiozAI is the MCP-only CRM your AI agent operates. Connect Claude Code, Cursor, or any MCP-compatible agent. 35 missions. You supervise, it executes. EU-hosted, AI Act native.",
  keywords:
    "headless AI CRM, MCP CRM, AI-native CRM, CRM for AI agents, agent-native CRM, CRM MCP server, Model Context Protocol CRM, Claude Code CRM, Cursor CRM",
  openGraph: {
    title: "The headless AI CRM | SymbiozAI",
    description:
      "SymbiozAI is the MCP-only CRM your AI agent operates. 35 missions. You supervise, it executes. EU-hosted, AI Act native.",
    url: "https://symbioz.ai",
    siteName: "SymbiozAI",
    images: [
      {
        url: "/images/pivot-mcp/og-image-symbiozai.png",
        width: 1200,
        height: 630,
        alt: "SymbiozAI — the headless AI CRM",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The headless AI CRM | SymbiozAI",
    description:
      "SymbiozAI is the MCP-only CRM your AI agent operates. 35 missions. You supervise, it executes.",
    images: ["/images/pivot-mcp/og-image-symbiozai.png"],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect to third-party origins for faster resource fetching */}
        <link rel="preconnect" href="https://static.axept.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://static.axept.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        {children}

        {/*
          Google Consent Mode v2 defaults — MUST run before GA4 fires.
          This inline script is tiny (~200 bytes) and sets denied defaults
          so GA4 respects consent from the start, even before Axeptio loads.
        */}
        <Script id="consent-mode-defaults" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* Google tag (gtag.js) — Consent Mode v2 gated by defaults above + Axeptio */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1P585GSSEQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1P585GSSEQ');
          `}
        </Script>

        {/* Axeptio — Cookie consent SDK (lazy loaded, updates consent mode when user interacts) */}
        <Script id="axeptio-settings" strategy="lazyOnload">
          {`
            window.axeptioSettings = {
              clientId: "69be06bc1986705da989b48d",
              cookiesVersion: "3ff8725e-4f9c-4f13-914f-87c85336c3e5",
              googleConsentMode: {
                default: {
                  analytics_storage: "denied",
                  ad_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied",
                  wait_for_update: 500
                }
              }
            };
          `}
        </Script>
        <Script src="https://static.axept.io/sdk.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
