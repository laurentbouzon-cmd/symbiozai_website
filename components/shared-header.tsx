import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import type { Dictionary } from "@/lib/dictionary"

interface SharedHeaderProps {
  lang: string
  dictionary: Dictionary
  activePage?: "home" | "mcp" | "for-sales-teams" | "about" | "manifeste" | "blog" | "contact"
  showLogo?: boolean
}

export function SharedHeader({ lang, dictionary, activePage, showLogo = true }: SharedHeaderProps) {
  const isFr = lang === "fr"

  const navItems = [
    { key: "mcp", href: `/${lang}/mcp`, label: "MCP" },
    { key: "for-sales-teams", href: `/${lang}/for-sales-teams`, label: isFr ? "Équipes commerciales" : "For sales teams" },
    { key: "about", href: `/${lang}/about`, label: isFr ? "À propos" : "About" },
    { key: "manifeste", href: `/${lang}/manifeste`, label: isFr ? "Manifeste" : "Manifesto" },
    { key: "blog", href: `/${lang}/blog`, label: "Blog" },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className={`flex items-center ${showLogo ? "justify-between" : "justify-end"}`}>
          {showLogo && (
            <Link href={`/${lang}`}>
              <Logo size="lg" />
            </Link>
          )}
          <MobileMenu lang={lang} dictionary={dictionary} />
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`transition-colors ${
                  activePage === item.key
                    ? "text-[#0d47a1] font-medium"
                    : "text-black hover:text-[#0d47a1]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
