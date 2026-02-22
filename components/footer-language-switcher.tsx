"use client"
import Link from "next/link"

/**
 * Language switcher component specifically for the footer
 * @param {Object} props - Component props
 * @param {string} props.currentLocale - The current locale code (e.g., 'en', 'fr')
 * @param {Object} [props.dictionary] - Dictionary for translations
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} - The language switcher component
 */
export function FooterLanguageSwitcher({ currentLocale, dictionary, className }) {
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ]

  return (
    <div
      className={`flex gap-2 p-1.5 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg ${className || ""}`}
    >
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}`}
          locale={lang.code}
          className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 overflow-hidden ${
            currentLocale === lang.code
              ? "bg-gradient-to-br from-[#00e5ff]/80 to-[#1a237e]/80 text-white shadow-[0_4px_20px_rgba(0,229,255,0.3)]"
              : "bg-white/50 text-gray-700 hover:bg-white/70 hover:shadow-md"
          }`}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none" />
          <span className="relative z-10">{lang.name}</span>
        </Link>
      ))}
    </div>
  )
}
