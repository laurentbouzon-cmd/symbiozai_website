import Link from "next/link"
import Image from "next/image"
import type { Dictionary } from "@/lib/dictionary"

interface SharedFooterProps {
  lang: string
  dictionary: Dictionary
}

export function SharedFooter({ lang, dictionary }: SharedFooterProps) {
  const isFr = lang === "fr"
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="inline-block mb-4">
              <Image
                src="/images/logo_cube_blanc.svg"
                alt="SymbiozAI"
                width={128}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {isFr
                ? "Le CRM headless piloté par votre agent IA via MCP."
                : "The headless AI CRM. Operated by your AI agent via MCP."}
            </p>
          </div>

          {/* Product column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {isFr ? "Produit" : "Product"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}/mcp`} className="text-sm hover:text-white transition-colors duration-200">
                  MCP
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/for-sales-teams`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "Équipes commerciales" : "For sales teams"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "À propos" : "About"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}#cta-final`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "Rejoindre la beta" : "Join the beta"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/manifeste`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "Manifeste" : "Manifesto"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {isFr ? "Ressources" : "Resources"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}/blog`} className="text-sm hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-sm hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              {isFr ? "Légal" : "Legal"}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${lang}/privacy`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "Politique de confidentialité" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/mentions-legales`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "Mentions légales" : "Legal Notice"}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cgu`} className="text-sm hover:text-white transition-colors duration-200">
                  {isFr ? "CGU" : "Terms of Service"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} SymbiozAI. {dictionary.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs">
              <Link
                href="/fr"
                className={`px-2 py-1 rounded transition-colors duration-200 ${lang === "fr" ? "text-white" : "text-gray-600 hover:text-gray-400"}`}
              >
                FR
              </Link>
              <span className="text-gray-700">/</span>
              <Link
                href="/en"
                className={`px-2 py-1 rounded transition-colors duration-200 ${lang === "en" ? "text-white" : "text-gray-600 hover:text-gray-400"}`}
              >
                EN
              </Link>
            </div>
            <span className="text-gray-800">·</span>
            <a
              href="mailto:contact@symbioz.ai"
              className="text-xs text-gray-600 hover:text-white transition-colors duration-200"
            >
              contact@symbioz.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
