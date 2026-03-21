import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import type { Dictionary } from "@/lib/dictionary"

interface SharedHeaderProps {
  lang: string
  dictionary: Dictionary
  activePage?: "home" | "manifeste" | "blog" | "contact"
}

export function SharedHeader({ lang, dictionary, activePage }: SharedHeaderProps) {
  const isFr = lang === "fr"

  const navItems = [
    { key: "home", href: `/${lang}`, label: isFr ? "Accueil" : "Home" },
    { key: "manifeste", href: `/${lang}/manifeste`, label: isFr ? "Manifeste" : "Manifesto" },
    { key: "blog", href: `/${lang}/blog`, label: "Blog" },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href={`/${lang}`}>
            <Logo size="lg" />
          </Link>
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
