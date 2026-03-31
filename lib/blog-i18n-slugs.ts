/**
 * FR <-> EN slug mapping for blog articles.
 *
 * Each pair is matched by shared `date` + `category` in the MDX frontmatter.
 * When adding a new bilingual article, add an entry here so that hreflang
 * alternates and sitemap point to the correct URL in each language.
 */

type SlugPair = { fr: string; en: string }

const SLUG_PAIRS: SlugPair[] = [
  { fr: "10-meilleurs-crm-ia-comparatif", en: "10-best-ai-crm-comparison" },
  { fr: "ai-native-crm-pourquoi-architecture-compte", en: "ai-native-crm-why-architecture-matters" },
  { fr: "comment-ia-transforme-relation-client", en: "how-ai-transforms-customer-relationships" },
  { fr: "crm-ia-automatiser-sans-deshumaniser", en: "ai-crm-automate-without-dehumanizing" },
  { fr: "crm-ia-native-vs-crm-traditionnel", en: "ai-native-crm-vs-traditional-crm" },
  { fr: "crm-ia-pour-pme-guide-pratique", en: "ai-crm-for-smbs-practical-guide" },
  { fr: "crm-intelligence-artificielle-etat-des-lieux", en: "crm-artificial-intelligence-state-of-play" },
  { fr: "de-salesforce-a-ai-native-crm-revolution", en: "from-salesforce-to-ai-native-crm-revolution" },
  { fr: "intelligence-artificielle-crm-roi-chiffres", en: "artificial-intelligence-crm-roi-numbers" },
  { fr: "modern-crm-5-fonctionnalites-indispensables", en: "modern-crm-5-must-have-features" },
  { fr: "pourquoi-les-crm-traditionnels-echouent", en: "why-traditional-crms-fail" },
  { fr: "quest-ce-quun-crm-ia-guide-complet", en: "what-is-an-ai-crm-complete-guide" },
  { fr: "saaspocalypse-crm-prix-par-siege-obsolete", en: "saaspocalypse-per-seat-crm-obsolete" },
  { fr: "crm-gratuit-ia-comparatif", en: "free-ai-crm-comparison" },
  { fr: "crm-agentique-definition-tendances", en: "agentic-crm-definition-trends" },
  { fr: "alternative-salesforce-europe-crm", en: "salesforce-alternative-europe-crm" },
  { fr: "crm-pour-startups-guide", en: "crm-for-startups-guide" },
]

/** Given a slug and its language, return the corresponding slug in the other language. */
export function getAlternateSlug(slug: string, fromLang: string): string | null {
  for (const pair of SLUG_PAIRS) {
    if (fromLang === "fr" && pair.fr === slug) return pair.en
    if (fromLang === "en" && pair.en === slug) return pair.fr
  }
  return null
}

/**
 * Given a slug (from either language), return both FR and EN slugs.
 * Falls back to the same slug for both if no mapping exists.
 */
export function getSlugPair(slug: string, lang: string): { fr: string; en: string } {
  for (const pair of SLUG_PAIRS) {
    if ((lang === "fr" && pair.fr === slug) || (lang === "en" && pair.en === slug)) {
      return pair
    }
  }
  // Fallback: same slug for both languages (unmapped article)
  return { fr: slug, en: slug }
}
