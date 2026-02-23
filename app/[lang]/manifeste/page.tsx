import Link from "next/link"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { Logo } from "@/components/ui/logo"
import { getDictionary } from "@/lib/dictionary"

export { generateMetadata } from "./metadata"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export default function ManifestePage({ params }: { params: { lang: string } }) {
  const dictionary = getDictionary(params.lang)
  const currentYear = new Date().getFullYear()
  const isFr = params.lang === "fr"

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-white">
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-end items-center">
            <MobileMenu lang={params.lang} dictionary={dictionary} />
            <nav className="hidden md:flex items-center space-x-10 mr-6 -ml-20">
              <Link href={`/${params.lang}`} className="text-black hover:text-gray-900 transition-colors">
                {isFr ? "Accueil" : "Home"}
              </Link>
              <Link
                href={`/${params.lang}/manifeste`}
                className="text-black font-medium hover:text-gray-900 transition-colors"
              >
                {isFr ? "Manifeste" : "Manifesto"}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
        <article className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="xl" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            {isFr ? "Une nouvelle ère commerciale commence." : "A new commercial era begins."}
          </h1>

          {/* Bloc 1 */}
          <div className="space-y-3 mb-10 text-base md:text-lg text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {isFr
                ? "Le monde du travail traverse une transformation profonde."
                : "The world of work is undergoing a profound transformation."}
            </p>
            <p>
              {isFr
                ? "Le monde du travail traverse une transformation profonde, souvent invisible, mais aux effets bien réels. Les entreprises investissent massivement dans leurs équipes commerciales, tout en les enfermant, dès le premier jour, dans des outils conçus pour un autre temps."
                : "The world of work is undergoing a profound transformation, often invisible, but with very real effects. Companies invest massively in their sales teams, while locking them in, from day one, in tools designed for another time."}
            </p>
            <p>
              {isFr
                ? "Ces systèmes demandent une attention constante. Ils exigent des mises à jour manuelles, imposent des processus rigides et détournent les talents de ce pour quoi ils ont été recrutés. Jour après jour, l'énergie se perd à documenter l'activité plutôt qu'à créer de la valeur."
                : "These systems demand constant attention. They require manual updates, impose rigid processes and divert talent from what they were hired for. Day after day, energy is lost documenting activity rather than creating value."}
            </p>
            <p>
              {isFr
                ? "Ce constat est largement partagé, mais rarement remis en question. La complexité est devenue la norme. La lenteur, une fatalité. Pendant ce temps, des opportunités disparaissent pour de simples frictions, et l'intelligence artificielle, pourtant omniprésente dans les discours, reste cantonnée à un rôle périphérique."
                : "This observation is widely shared, but rarely questioned. Complexity has become the norm. Slowness, a fatality. Meanwhile, opportunities disappear due to simple frictions, and artificial intelligence, although omnipresent in discourse, remains confined to a peripheral role."}
            </p>
          </div>

          {/* Bloc 2 */}
          <div className="space-y-3 mb-10 text-base md:text-lg text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {isFr ? "Chez SymbiozAI, nous avons fait un choix radical." : "At SymbiozAI, we made a radical choice."}
            </p>
            <p>
              {isFr
                ? "Nous n'avons pas cherché à moderniser un modèle dépassé, ni à l'améliorer à la marge. Nous avons décidé de le remplacer."
                : "We did not seek to modernize an outdated model, nor to improve it at the margin. We decided to replace it."}
            </p>
            <p>
              {isFr
                ? "Nous sommes partis d'une question simple. Et si le cœur du système commercial n'était plus un outil à maintenir, mais une intelligence capable de comprendre les échanges, de décider et d'agir d'elle-même ? Et si la performance ne dépendait plus de la discipline humaine, mais d'un système conçu pour opérer en continu ?"
                : "We started with a simple question. What if the heart of the commercial system was no longer a tool to maintain, but an intelligence capable of understanding exchanges, deciding and acting on its own? What if performance no longer depended on human discipline, but on a system designed to operate continuously?"}
            </p>
            <p>
              {isFr
                ? "C'est cette conviction qui guide SymbiozAI. Un système entièrement IA-native, conçu pour piloter l'activité commerciale plutôt que de l'enregistrer. Il comprend les conversations, capte l'information en temps réel, automatise la qualification, orchestre les relances et maintient la cohérence du pipeline sans intervention manuelle."
                : "This conviction guides SymbiozAI. A fully AI-native system, designed to drive commercial activity rather than record it. It understands conversations, captures information in real time, automates qualification, orchestrates follow-ups and maintains pipeline consistency without manual intervention."}
            </p>
          </div>

          {/* Bloc 3 */}
          <div className="space-y-3 mb-10 text-base md:text-lg text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {isFr ? "Le lieu de travail n'est plus une interface." : "The workplace is no longer an interface."}
            </p>
            <p>
              {isFr
                ? "Ce sont les conversations. Là où les décisions se prennent vraiment. Sur WhatsApp. Sur Slack. Là où le business avance naturellement."
                : "It's conversations. Where decisions are really made. On WhatsApp. On Slack. Where business naturally happens."}
            </p>
            <p>
              {isFr
                ? "L'intelligence artificielle ne s'ajoute pas au système. Elle en devient l'infrastructure. Le modèle traditionnel repose sur l'effort humain permanent. SymbiozAI repose sur l'autonomie, la vitesse et l'adaptation au terrain."
                : "Artificial intelligence is not added to the system. It becomes the infrastructure. The traditional model relies on permanent human effort. SymbiozAI relies on autonomy, speed and adaptation to the field."}
            </p>
          </div>

          {/* Bloc 4 */}
          <div className="space-y-3 mb-10 text-base md:text-lg text-gray-700 leading-relaxed">
            <p className="font-bold text-gray-900 text-lg md:text-xl">
              {isFr
                ? "Nous redéfinissons le fonctionnement même d'un système commercial."
                : "We are redefining the very functioning of a commercial system."}
            </p>
            <p>
              {isFr
                ? "Nous ne construisons pas une fonctionnalité de plus. Nous repensons la manière dont les équipes commerciales opèrent au quotidien."
                : "We are not building one more feature. We are rethinking the way sales teams operate on a daily basis."}
            </p>
            <p>
              {isFr
                ? "Dans les années à venir, les équipes travailleront avec des intelligences capables d'anticiper, d'exécuter et d'apprendre en continu. Un système qui libère les humains de la lourdeur opérationnelle, sans jamais remplacer leur expertise."
                : "In the years to come, teams will work with intelligences capable of anticipating, executing and learning continuously. A system that frees humans from operational burden, without ever replacing their expertise."}
            </p>
            <p>
              {isFr
                ? "Un système qui élimine la friction, la perte d'information et la lenteur, pour laisser place à ce qui compte vraiment."
                : "A system that eliminates friction, loss of information and slowness, to make room for what really matters."}
            </p>
            <p>
              {isFr
                ? "SymbiozAI n'est pas une promesse de futur. C'est une réalité opérationnelle."
                : "SymbiozAI is not a promise of the future. It is an operational reality."}
            </p>
            <p className="font-semibold text-gray-900">
              {isFr ? "La nouvelle ère commerciale a déjà commencé." : "The new commercial era has already begun."}
            </p>
          </div>

          {/* Signature */}
          <p className="text-base md:text-lg text-gray-700 mt-10">
            {isFr ? "L'équipe SymbiozAI" : "The SymbiozAI Team"}
          </p>

          {/* CTA */}
          <div className="mt-12">
            <Link
              href={`/${params.lang}`}
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#1a237e] to-[#00e5ff] text-white font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,229,255,0.4)] overflow-hidden"
            >
              {/* Glass highlight effect */}
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />
              {/* Animated shine on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
              <span className="relative z-10">{isFr ? "Rejoindre la liste d'attente" : "Join the waitlist"}</span>
              <svg className="relative z-10 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        <p>
          &copy; {currentYear} SymbiozAI. {dictionary.footer.copyright}
        </p>
        <div className="mt-3 flex justify-center">
          <FooterLanguageSwitcher currentLocale={params.lang} dictionary={dictionary} />
        </div>
      </footer>
    </div>
  )
}
