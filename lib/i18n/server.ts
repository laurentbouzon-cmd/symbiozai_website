import { defaultLocale, type Locale } from "./config"

export function getLocaleFromHeaders(): Locale {
  // Cette fonction sera implémentée plus tard pour extraire la locale des en-têtes HTTP
  // Pour l'instant, nous retournons toujours la locale par défaut
  return defaultLocale
}

export function getLocaleFromPath(pathname: string): Locale | undefined {
  // Cette fonction sera implémentée plus tard pour extraire la locale du pathname
  // Pour l'instant, nous retournons toujours la locale par défaut
  return defaultLocale
}
