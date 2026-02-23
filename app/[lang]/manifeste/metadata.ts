import type { Metadata } from "next"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const isEnglish = params.lang === "en"

  const title = isEnglish
    ? "SymbiozAI Manifesto - A new commercial era begins"
    : "Manifeste SymbiozAI - Une nouvelle ère commerciale commence"
  const description = isEnglish
    ? "SymbiozAI is the first fully AI-Native CRM. Discover our vision for a sales system that understands, acts, and learns autonomously."
    : "SymbiozAI est le premier CRM entièrement IA-Native. Découvrez notre vision d'un système commercial qui comprend, agit et apprend de manière autonome."

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://symbioz.ai/${params.lang}/manifeste`,
      siteName: "SymbiozAI",
      images: [
        {
          url: `/og?lang=${params.lang}`,
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
      images: [`/og?lang=${params.lang}`],
    },
    alternates: {
      canonical: `https://symbioz.ai/${params.lang}/manifeste`,
      languages: {
        "x-default": "https://symbioz.ai/fr/manifeste",
        en: "https://symbioz.ai/en/manifeste",
        fr: "https://symbioz.ai/fr/manifeste",
      },
    },
  }
}
