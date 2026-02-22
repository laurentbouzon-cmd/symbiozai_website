export const defaultLocale = "en"

export const locales = ["en", "fr", "es", "de"] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
}

// Cette structure sera utilisée plus tard pour l'internationalisation
export const getLocaleDirection = (locale: Locale) => {
  return "ltr"
}
