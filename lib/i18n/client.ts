"use client"

import { usePathname, useRouter } from "next/navigation"
import { defaultLocale, type Locale } from "./config"

export function useLocale() {
  const pathname = usePathname()

  // Cette fonction sera implémentée plus tard pour extraire la locale du pathname
  // Pour l'instant, nous retournons toujours la locale par défaut
  return defaultLocale as Locale
}

export function useChangeLocale() {
  const router = useRouter()
  const pathname = usePathname()

  // Cette fonction sera implémentée plus tard pour changer la locale dans l'URL
  return (locale: Locale) => {
    // Pour l'instant, cette fonction ne fait rien
    console.log(`Changing locale to ${locale}`)
  }
}
