"use client"

import { useState } from "react"
import Link from "next/link"
import { FooterLanguageSwitcher } from "@/components/footer-language-switcher"
import { Logo } from "@/components/ui/logo"
import type { Dictionary } from "@/lib/dictionary"

interface MobileMenuProps {
  lang: string
  dictionary: Dictionary
}

export function MobileMenu({ lang, dictionary }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* Bouton hamburger */}
      <button
        onClick={toggleMenu}
        className="flex items-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Fermer le menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between h-[calc(100%-80px)] py-8 px-6">
          {/* Logo en haut du menu */}
          <div className="text-center mb-8">
            <Link href={`/${lang}`} onClick={closeMenu} className="inline-block">
              <Logo size="lg" />
            </Link>

            <p className="text-gray-600 mt-3 max-w-xs mx-auto">
              {lang === "fr" ? "Le premier CRM 100% IA-Native." : "The first 100% AI-Native CRM."}
            </p>
          </div>

          {/* Séparateur visuel */}
          <div className="w-16 h-0.5 bg-gray-200 my-6"></div>

          {/* Navigation principale */}
          <nav className="flex flex-col items-center space-y-8 flex-grow justify-center">
            <Link
              href={`/${lang}`}
              className="text-xl font-medium text-gray-800 hover:text-gray-900 transition-colors"
              onClick={closeMenu}
            >
              {lang === "fr" ? "Accueil" : "Home"}
            </Link>
            <Link
              href={`/${lang}/manifeste`}
              className="text-xl font-medium text-gray-800 hover:text-gray-900 transition-colors"
              onClick={closeMenu}
            >
              {lang === "fr" ? "Manifeste" : "Manifesto"}
            </Link>
          </nav>

          {/* Séparateur visuel */}
          <div className="w-16 h-0.5 bg-gray-200 my-6"></div>

          {/* Sélecteur de langue */}
          <div className="mt-auto">
            <FooterLanguageSwitcher currentLocale={lang} dictionary={dictionary} />
          </div>
        </div>
      </div>
    </div>
  )
}
