import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import type { Dictionary } from "@/lib/dictionary"

type ActivePage = "home" | "mcp" | "for-sales-teams" | "about" | "blog"

interface SiteHeaderProps {
  lang: string
  dictionary: Dictionary
  activePage?: ActivePage
  showLogo?: boolean
  tone?: "light" | "dark"
}

/**
 * SiteHeader — header for the new post-pivot pages.
 * Keeps the existing mobile-menu component but updates nav items for the new IA.
 */
export function SiteHeader({
  lang,
  dictionary,
  activePage,
  showLogo = true,
  tone = "light",
}: SiteHeaderProps) {
  const isFr = lang === "fr"
  const isDark = tone === "dark"

  const navItems: { key: ActivePage; href: string; label: string }[] = [
    { key: "mcp", href: `/${lang}/mcp`, label: "MCP" },
    {
      key: "for-sales-teams",
      href: `/${lang}/for-sales-teams`,
      label: isFr ? "Équipes commerciales" : "For sales teams",
    },
    { key: "about", href: `/${lang}/about`, label: isFr ? "À propos" : "About" },
    { key: "blog", href: `/${lang}/blog`, label: "Blog" },
  ]

  const inactiveColor = isDark ? "text-white/80 hover:text-white" : "text-gray-800 hover:text-[#0d47a1]"
  const activeColor = isDark ? "text-white font-medium" : "text-[#0d47a1] font-medium"

  return (
    <header className={`absolute left-0 right-0 top-0 z-20 ${isDark ? "bg-gray-950" : ""}`}>
      <div className="container mx-auto px-4 py-4 sm:px-6">
        <div className={`flex items-center ${showLogo ? "justify-between" : "justify-end"}`}>
          {showLogo && (
            <Link href={`/${lang}`} aria-label="SymbiozAI home">
              <Logo size="lg" />
            </Link>
          )}
          <MobileMenu lang={lang} dictionary={dictionary} />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm transition-colors ${
                  activePage === item.key ? activeColor : inactiveColor
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] px-4 text-sm font-medium text-white transition hover:opacity-90"
            >
              {isFr ? "Réserver une démo" : "Book a demo"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
