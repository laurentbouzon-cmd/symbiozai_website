import type { Metadata } from "next"

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const isEnglish = params.lang === "en"

  return {
    title: isEnglish
      ? "SymbiozAI Manifesto - A new commercial era begins"
      : "Manifeste SymbiozAI - Une nouvelle ère commerciale commence",
    description: isEnglish
      ? "SymbiozAI is the first fully AI-Native CRM. Discover our vision for a sales system that understands, acts, and learns autonomously."
      : "SymbiozAI est le premier CRM entièrement IA-Native. Découvrez notre vision d'un système commercial qui comprend, agit et apprend de manière autonome.",
    openGraph: {
      title: isEnglish
        ? "SymbiozAI Manifesto - A new commercial era begins"
        : "Manifeste SymbiozAI - Une nouvelle ère commerciale commence",
      description: isEnglish
        ? "SymbiozAI is the first fully AI-Native CRM. Discover our vision for a sales system that understands, acts, and learns autonomously."
        : "SymbiozAI est le premier CRM entièrement IA-Native. Découvrez notre vision d'un système commercial qui comprend, agit et apprend de manière autonome.",
      url: `https://symbioz.ai/${params.lang}/manifeste`,
      siteName: "SymbiozAI",
      locale: isEnglish ? "en_US" : "fr_FR",
      type: "article",
    },
  }
}
