import Link from "next/link"
import { SharedFooter } from "@/components/shared-footer"
import { SharedHeader } from "@/components/shared-header"
import { Logo } from "@/components/ui/logo"
import { getDictionary } from "@/lib/dictionary"

export { generateMetadata } from "./metadata"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export default async function ManifestePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const currentYear = new Date().getFullYear()
  const isFr = lang === "fr"

  // Safe: jsonLd is built from our own static strings, not user input
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isFr
      ? "Manifeste SymbiozAI. L'entreprise de demain sera AI-Native"
      : "SymbiozAI Manifesto. Tomorrow's company will be AI-Native",
    description: isFr
      ? "Notre vision de l'entreprise AI-Native et du CRM de nouvelle génération."
      : "Our vision for the AI-Native company and next-generation CRM.",
    url: `https://symbioz.ai/${lang}/manifeste`,
    inLanguage: isFr ? "fr-FR" : "en-US",
    publisher: {
      "@type": "Organization",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
      logo: "https://symbioz.ai/icon.png",
    },
  }
  const jsonLdHtml = JSON.stringify(jsonLdData)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
      <SharedHeader lang={lang} dictionary={dictionary} activePage="manifeste" showLogo={false} />

      {/* Contenu */}
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
        <article className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="xl" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 leading-tight">
            {isFr ? "L'entreprise de demain sera AI-Native." : "Tomorrow's company will be AI-Native."}
            <br />
            <span className="text-gray-400">{isFr ? "Ou ne sera pas." : "Or it won't be."}</span>
          </h1>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* PARTIE 1 — L'AI-Native Company : on l'a construite */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "Tout le monde parle de l'entreprise AI-Native. Nous, on l'a construite."
                : "Everyone talks about the AI-Native company. We built one."}
            </h2>
            <p>
              {isFr
                ? "On nous promet depuis des mois l'entreprise d'un fondateur et dix agents IA. L'organisation où l'intelligence artificielle ne se contente pas d'assister. Elle opère. Où chaque processus, chaque décision, chaque livraison est porté par une intelligence qui apprend, s'adapte et exécute."
                : "For months, we've been promised the company of one founder and ten AI agents. The organization where artificial intelligence doesn't just assist. It operates. Where every process, every decision, every delivery is carried by intelligence that learns, adapts, and executes."}
            </p>
            <p className="font-semibold text-gray-900">
              {isFr
                ? "Chez SymbiozAI, ce n'est plus une promesse. C'est le quotidien."
                : "At SymbiozAI, this is no longer a promise. It's daily life."}
            </p>
          </div>

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "L'IA ne remplace pas l'humain. Elle transforme un individu en organisation."
                : "AI doesn't replace humans. It turns one individual into an organization."}
            </h2>
            <p>
              {isFr
                ? "Nos agents IA codent, testent, rédigent, prospectent, analysent. En continu. Ils ont des rôles, des compétences, une mémoire. Ils se coordonnent entre eux. Le fondateur ne code pas. Il dirige. Il décide. Il garde le contrôle sur ce qui compte."
                : "Our AI agents code, test, write, prospect, analyze. Continuously. They have roles, skills, memory. They coordinate with each other. The founder doesn't code. He leads. He decides. He keeps control over what matters."}
            </p>
            <p>
              {isFr
                ? "Sous le capot : des modèles de langage de dernière génération orchestrés en temps réel, une mémoire institutionnelle qui capitalise sur chaque décision passée, et une architecture LLM-agnostique. Toujours la meilleure intelligence disponible."
                : "Under the hood: cutting-edge language models orchestrated in real time, institutional memory that capitalizes on every past decision, and an LLM-agnostic architecture. Always the best available intelligence."}
            </p>
          </div>

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              {isFr
                ? "Les entreprises qui comprendront ça dans les 24 prochains mois prendront une avance irrattrapable. Les autres passeront la décennie suivante à essayer de comprendre ce qui s'est passé."
                : "The companies that understand this in the next 24 months will gain an insurmountable lead. The rest will spend the next decade trying to figure out what happened."}
            </p>
            <p className="font-semibold text-gray-900">
              {isFr
                ? "L'entreprise AI-Native n'est plus une vision. C'est un fait. Et nous en sommes la preuve."
                : "The AI-Native company is no longer a vision. It's a fact. And we are the proof."}
            </p>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* TRANSITION */}
          {/* ═══════════════════════════════════════════ */}

          <div className="my-16 py-10 border-t-2 border-b-2 border-gray-900">
            <p className="text-center text-lg md:text-xl text-gray-600 leading-relaxed mb-4">
              {isFr
                ? "Quand on vit l'AI-Native au quotidien, on voit le monde différemment. On voit les logiciels d'entreprise tels qu'ils sont vraiment : des reliques d'une époque révolue. Et le plus cassé de tous..."
                : "When you live AI-Native every day, you see the world differently. You see enterprise software for what it really is: relics of a bygone era. And the most broken of them all..."}
            </p>
            <p className="text-center text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d47a1] to-[#00e5ff]">
                {isFr
                  ? "...c'est le CRM."
                  : "...is the CRM."}
              </span>
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════ */}
          {/* PARTIE 2 — Le CRM AI-Native : le premier produit */}
          {/* ═══════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "Votre CRM vous coûte des deals. Chaque jour."
                : "Your CRM is costing you deals. Every single day."}
            </h2>
            <p>
              {isFr
                ? "Vos commerciaux passent plus de temps à remplir des champs qu'à parler à des clients. Vos managers reconstruisent le pipeline à la main chaque lundi matin. Vos données sont obsolètes avant d'être saisies. Et pendant ce temps, des opportunités passent entre les mailles du filet."
                : "Your sales reps spend more time filling in fields than talking to clients. Your managers manually rebuild the pipeline every Monday morning. Your data is obsolete before it's entered. And meanwhile, opportunities slip through the cracks."}
            </p>
            <p>
              {isFr
                ? "Le problème n'est pas votre équipe. Le problème, c'est que le CRM a été conçu il y a 25 ans pour enregistrer. Pas pour opérer."
                : "The problem isn't your team. The problem is that the CRM was designed 25 years ago to record. Not to operate."}
            </p>
          </div>

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "Le premier CRM qui travaille pendant que vous vendez."
                : "The first CRM that works while you sell."}
            </h2>
            <p>
              {isFr
                ? "SymbiozAI vit là où vos décisions se prennent vraiment : dans vos conversations. Sur Slack. Par email. En réunion. Il écoute, comprend, et agit. Il capture l'information en temps réel, qualifie vos opportunités, orchestre les relances, met à jour le pipeline. Tout seul."
                : "SymbiozAI lives where your decisions are actually made: in your conversations. On Slack. Via email. In meetings. It listens, understands, and acts. It captures information in real time, qualifies your opportunities, orchestrates follow-ups, updates the pipeline. All by itself."}
            </p>
            <p>
              {isFr
                ? "Zéro formulaire. Zéro saisie manuelle. Zéro friction. Vous vous concentrez sur ce que vous faites le mieux : créer de la relation et closer."
                : "Zero forms. Zero manual data entry. Zero friction. You focus on what you do best: building relationships and closing."}
            </p>
          </div>

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "Pas un prototype. Pas une démo. Un système qui tourne."
                : "Not a prototype. Not a demo. A system that runs."}
            </h2>
            <p>
              {isFr
                ? "38 agents IA coordonnés. Un pipeline commercial piloté par la conversation. Plus de 95% de précision sur nos benchmarks internes. SymbiozAI est en production. Aujourd'hui."
                : "38 coordinated AI agents. A sales pipeline driven by conversation. Over 95% accuracy on our internal benchmarks. SymbiozAI is in production. Today."}
            </p>
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {isFr
                ? "Le CRM tel que vous le connaissez est mort. SymbiozAI est ce qui vient après."
                : "The CRM as you know it is dead. SymbiozAI is what comes next."}
            </p>
          </div>

          {/* Signature */}
          <div className="mt-10 space-y-4">
            <p className="text-base md:text-lg text-gray-700">
              Laurent Bouzon
              <br />
              <span className="text-gray-500">{isFr ? "Fondateur, SymbiozAI" : "Founder, SymbiozAI"}</span>
            </p>
            <p className="text-sm text-gray-400 italic">
              {isFr
                ? "Rédigé par Iris, AI Content Manager, pilotée par Laurent ♡"
                : "Written by Iris, AI Content Manager, directed by Laurent ♡"}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href={`/${lang}`}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] text-white font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,229,255,0.4)] overflow-hidden"
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              <span className="relative z-10">{isFr ? "Découvrir SymbiozAI" : "Discover SymbiozAI"}</span>
              <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </article>
      </main>

      <SharedFooter lang={lang} dictionary={dictionary} />
    </div>
    </>
  )
}
