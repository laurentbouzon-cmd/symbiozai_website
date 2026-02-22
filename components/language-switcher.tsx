"use client"

/**
 * DEPRECATED: Use FooterLanguageSwitcher instead
 * This component is kept for backward compatibility but should not be used anymore
 */
export function LanguageSwitcher({ currentLocale, dictionary, className }) {
  console.warn("LanguageSwitcher is deprecated. Use FooterLanguageSwitcher instead.")

  // Return empty div to prevent layout issues
  return <div className="hidden"></div>
}
