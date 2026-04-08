import { Linkedin } from "lucide-react"

interface AuthorCardProps {
  lang: string
}

export function AuthorCard({ lang }: AuthorCardProps) {
  const isFr = lang === "fr"

  const bio = isFr
    ? "Fondateur de SymbiozAI, le premier AI Native CRM europeen. Ingenieur de formation, convaincu que l'IA doit augmenter l'humain, pas le remplacer."
    : "Founder of SymbiozAI, the first European AI Native CRM. Engineer by training, convinced that AI should augment humans, not replace them."

  return (
    <div className="not-prose mt-12 mb-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Author avatar — initials placeholder */}
        <div
          className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#0d47a1] to-[#00e5ff] flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white font-bold text-lg select-none">LB</span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-semibold text-gray-900">
              Laurent Bouzon
            </h4>
            <a
              href="https://www.linkedin.com/in/laurent-bouzon-150237108/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Laurent Bouzon LinkedIn"
              className="text-[#0d47a1] hover:text-[#00e5ff] transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-[#0d47a1] font-medium mt-0.5">
            Founder & CEO, SymbiozAI
          </p>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {bio}
          </p>
        </div>
      </div>
    </div>
  )
}
