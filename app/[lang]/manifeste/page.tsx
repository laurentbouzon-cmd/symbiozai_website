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
  const isFr = lang === "fr"

  // Safe: jsonLd is built from our own static strings, not user input
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isFr
      ? "Manifeste SymbiozAI. L'entreprise de demain sera AI-Native"
      : "SymbiozAI Manifesto. Tomorrow's company will be AI-Native",
    description: isFr
      ? "Notre vision de l'entreprise AI-Native et du CRM MCP-only opéré par votre agent."
      : "Our vision for the AI-Native company and the MCP-only CRM operated by your agent.",
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

          {/* ═══════════════════════════════════════════════════════ */}
          {/* PARTIE 2 — Le CRM MCP-only : le produit pivot           */}
          {/* ═══════════════════════════════════════════════════════ */}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2.1 — Thèse 25 ans                              */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "Pendant 25 ans, on a demandé aux humains d'ouvrir leur CRM. Ils ne devraient plus avoir à l'ouvrir. Ni à l'opérer."
                : "For 25 years, we asked humans to open their CRM. They shouldn't have to open it. Or operate it."}
            </h2>
            <p>
              {isFr
                ? "15 ans à demander aux commerciaux d'ouvrir un CRM. Ils n'ont jamais voulu. Ils avaient raison."
                : "15 years asking sales reps to open a CRM. They never wanted to. They were right."}
            </p>
            <p>
              {isFr
                ? "Le problème n'était pas leur discipline. Le problème, c'est que le CRM a été conçu il y a 25 ans pour enregistrer. Pas pour opérer. Salesforce, 1999 : une base de données derrière un formulaire. Les couches IA ajoutées depuis 2020 n'ont pas changé le fond. Elles ont habillé la contrainte."
                : "The problem was never their discipline. The problem is that the CRM was designed 25 years ago to record. Not to operate. Salesforce, 1999: a database behind a form. The AI layers added since 2020 didn't change the fundamentals. They dressed up the constraint."}
            </p>
            <p>
              {isFr
                ? "Les commerciaux continuent de reconstruire le pipeline à la main chaque lundi. Les managers continuent de courir après des données obsolètes avant d'être saisies. Les opportunités continuent de passer entre les mailles du filet. Pas parce que les équipes sont mauvaises. Parce que personne n'a jamais conçu un CRM qui ne nécessite pas d'être ouvert."
                : "Sales reps still rebuild the pipeline by hand every Monday morning. Managers still chase data that's obsolete before it's entered. Opportunities still slip through the cracks. Not because teams are failing. Because nobody built a CRM that doesn't need to be opened."}
            </p>
            <p className="font-semibold text-gray-900">
              {isFr
                ? "Les logiciels ne sont plus faits pour les humains."
                : "Software is no longer made for humans to operate."}
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2.2 — La bascule 2026                           */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "En 2026, les humains n'opèrent plus les logiciels. Les agents le font."
                : "In 2026, humans don't operate software. Agents do."}
            </h2>
            <blockquote className="border-l-4 border-[#0088C2] pl-4 italic text-gray-600 my-6">
              {isFr
                ? "Nous venons d'écrire la dernière génération de logiciels faits pour être opérés par des humains."
                : "We just wrote the last generation of software made for humans to operate."}
            </blockquote>
            <p>
              {isFr
                ? "Le commerce B2B va passer de human-operated à agent-operated avec supervision humaine. Comme le trading haute fréquence pour la finance il y a 20 ans."
                : "B2B commerce is moving from human-operated to agent-operated with human supervision. The same shift high-frequency trading made for finance 20 years ago."}
            </p>
            <p>
              {isFr
                ? "Ce n'est pas une prophétie. C'est une bascule déjà observable pour ceux qui utilisent Claude Code ou Cursor au quotidien. Un agent IA peut lire un pipeline, qualifier un lead, rédiger un email adapté au profil DISC du destinataire. Il peut faire tout ça pendant que vous êtes en réunion. Il lui manquait seulement un CRM conçu pour qu'il en soit l'opérateur."
                : "This isn't a prophecy. It's a shift already visible to anyone using Claude Code or Cursor daily. An AI agent can read a pipeline, qualify a lead, draft an email calibrated to the recipient's DISC profile. It can do all of this while you're in a meeting. The only thing missing was a CRM built for the agent to operate — not adapted to accommodate it."}
            </p>
            <p>
              {isFr
                ? "Les outils sont là. Le protocole est là — MCP, spécification officielle Anthropic 2025. Ce qui restait à construire, c'est le CRM conçu d'emblée pour ça. Pas pour accommoder ça."
                : "The tools exist. The protocol exists — MCP, Anthropic's official specification, 2025. What remained was a CRM designed for this from the ground up. Not retrofitted for it."}
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2.3 — Headless by design                        */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr
                ? "On n'a pas ajouté un agent sur un CRM. On a construit le CRM autour de l'agent."
                : "We didn't add an agent to a CRM. We built the CRM around the agent."}
            </h2>
            <p>
              {isFr
                ? "En 2026, tous les CRM sérieux exposent un serveur MCP. Octolane, HubSpot, Zoho, Salesforce Headless 360 — chacun a son implémentation. Pour tous, MCP est une couche ajoutée à côté d'une interface humaine historique. L'UI reste le produit principal. MCP est une option."
                : "In 2026, every serious CRM exposes an MCP server. Octolane, HubSpot, Zoho, Salesforce Headless 360 — each has an implementation. For all of them, MCP is a layer added alongside a legacy human interface. The UI remains the main product. MCP is an option."}
            </p>
            <p>
              {isFr
                ? "SymbiozAI a fait le chemin inverse. Zéro interface humaine principale. Le serveur MCP est le produit. La console de supervision — cinq minutes par jour, sur les actions sensibles — est une porte de contrôle, pas une interface d'opération."
                : "SymbiozAI went the other way. No primary human interface. The MCP server is the product. The supervision console — five minutes a day, for sensitive actions — is a control gate, not an operating interface."}
            </p>
            <p>
              {isFr
                ? "Ce n'est pas une nuance technique. C'est une décision architecturale qui détermine ce que le produit peut faire. Quand l'agent est une surcouche, il est contraint par l'interface qu'il surmonte. Quand l'agent est l'opérateur natif, le produit est conçu pour lui depuis le premier octet."
                : "This is not a technical nuance. It's an architectural decision that determines what the product can do. When the agent is a layer on top, it's constrained by the interface it sits above. When the agent is the native operator, the product is designed for it from the first byte."}
            </p>
            <blockquote className="border-l-4 border-[#0088C2] pl-4 italic text-gray-600 my-6">
              {isFr
                ? "Un monde où les CRM ne s'ouvrent plus. Ils s'exécutent."
                : "A world where CRMs are no longer opened. They're executed."}
            </blockquote>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2.4 — Ce que ça change concrètement             */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-4 mb-12 text-base md:text-lg text-gray-700 leading-relaxed">
            <h2 className="font-bold text-gray-900 text-xl md:text-2xl">
              {isFr ? "Ce que ça change concrètement." : "What this changes, concretely."}
            </h2>
            <ul className="space-y-4 list-none pl-0">
              <li>
                {isFr
                  ? "35 missions MCP exposées à l'agent du client — ciblage, enrichissement, qualification, scoring, email DISC-aware, préparation de réunion, état du pipeline."
                  : "35 MCP missions exposed to the client's agent — targeting, enrichment, qualification, scoring, DISC-aware email drafting, meeting preparation, pipeline snapshot."}
              </li>
              <li>
                {isFr
                  ? "23 sources de données wrappées derrière un endpoint unique. L'agent appelle, les données arrivent."
                  : "23 data sources wrapped behind a single endpoint. The agent calls, the data arrives."}
              </li>
              <li>
                {isFr
                  ? "5 minutes de supervision par jour pour l'humain. Sur les actions sensibles uniquement. L'agent exécute. Vous supervisez. C'est le deal."
                  : "5 minutes of human supervision per day. For sensitive actions only. The agent executes. You supervise. That's the deal."}
              </li>
            </ul>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* SECTION 2.5 — Chute doctrinale                          */}
          {/* ═══════════════════════════════════════════════════════ */}

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {isFr
                ? "MCP-retrofitted n'est pas MCP-native. MCP-native n'est pas MCP-only."
                : "MCP-retrofitted is not MCP-native. MCP-native is not MCP-only."}
            </h2>
            <blockquote className="border-l-4 border-[#0088C2] pl-6 py-2 text-lg md:text-xl font-semibold text-gray-900 leading-snug">
              {isFr
                ? "MCP-retrofitted n'est pas MCP-native. MCP-native n'est pas MCP-only. On est MCP-only. C'est toute la différence."
                : "MCP-retrofitted is not MCP-native. MCP-native is not MCP-only. We are MCP-only. That's the entire difference."}
            </blockquote>
          </div>

          {/* Signature */}
          <div className="mt-10 space-y-4">
            <p className="text-base md:text-lg text-gray-700">
              Laurent Bouzon
              <br />
              <span className="text-gray-500">{isFr ? "Fondateur, SymbiozAI" : "Founder, SymbiozAI"}</span>
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
