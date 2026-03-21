"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import type { Dictionary } from "@/lib/dictionary"

interface MobileMenuProps {
  lang: string
  dictionary: Dictionary
}

function MobileMenuPortal({ lang, isOpen, onClose }: { lang: string; isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const isFr = lang === "fr"

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed inset-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 9999, backgroundColor: "#ffffff" }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Fermer le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between h-[calc(100%-80px)] py-8 px-6">
          <div className="text-center mb-8">
            <Link href={`/${lang}`} onClick={onClose} className="inline-block">
              <Logo size="lg" />
            </Link>
            <p className="text-gray-600 mt-3 max-w-xs mx-auto">
              {isFr ? "Le premier CRM 100% IA-Native." : "The first 100% AI-Native CRM."}
            </p>
          </div>

          <div className="w-16 h-0.5 bg-gray-200 my-6" />

          <nav className="flex flex-col items-center space-y-8 flex-grow justify-center">
            <Link href={`/${lang}`} className="text-xl font-medium text-gray-800 hover:text-[#0d47a1] transition-colors" onClick={onClose}>
              {isFr ? "Accueil" : "Home"}
            </Link>
            <Link href={`/${lang}/manifeste`} className="text-xl font-medium text-gray-800 hover:text-[#0d47a1] transition-colors" onClick={onClose}>
              {isFr ? "Manifeste" : "Manifesto"}
            </Link>
            <Link href={`/${lang}/blog`} className="text-xl font-medium text-gray-800 hover:text-[#0d47a1] transition-colors" onClick={onClose}>
              Blog
            </Link>
          </nav>

          <div className="w-16 h-0.5 bg-gray-200 my-6" />

          <div className="mt-auto flex items-center gap-2 text-sm">
            <Link href="/fr" onClick={onClose} className={`px-3 py-1.5 rounded-lg transition-colors ${lang === "fr" ? "bg-[#0d47a1] text-white" : "text-gray-600 hover:text-gray-900"}`}>
              FR
            </Link>
            <Link href="/en" onClick={onClose} className={`px-3 py-1.5 rounded-lg transition-colors ${lang === "en" ? "bg-[#0d47a1] text-white" : "text-gray-600 hover:text-gray-900"}`}>
              EN
            </Link>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export function MobileMenu({ lang, dictionary }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm text-gray-700 hover:text-gray-900 hover:bg-white focus:outline-none transition-colors"
        aria-label="Ouvrir le menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <MobileMenuPortal lang={lang} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
