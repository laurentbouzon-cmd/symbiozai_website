import fs from "fs"
import path from "path"
import matter from "gray-matter"

/**
 * FR <-> EN slug mapping for blog hreflang alternates.
 * Duplicated here (not imported from TS) because sitemap.js runs as plain JS in Next.js.
 */
const SLUG_PAIRS = [
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
]

function getSlugPair(slug, lang) {
  for (const pair of SLUG_PAIRS) {
    if ((lang === "fr" && pair.fr === slug) || (lang === "en" && pair.en === slug)) {
      return pair
    }
  }
  return { fr: slug, en: slug }
}

function getBlogSlugs(lang) {
  const dir = path.join(process.cwd(), "content", "blog", lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

/** Read the frontmatter `date` field from an MDX file and return it as a Date. */
function getBlogDate(lang, slug) {
  const filePath = path.join(process.cwd(), "content", "blog", lang, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(content)
  if (data.date) return new Date(data.date)
  return null
}

export default function sitemap() {
  const base = "https://symbioz.ai"

  // Use a fixed date for static pages (last known content update)
  const staticLastMod = new Date("2026-04-23")

  const staticPages = [
    {
      url: `${base}/`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    {
      url: `${base}/fr`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    // MCP: P0 priority post-pivot
    {
      url: `${base}/en/mcp`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: { fr: `${base}/fr/mcp`, en: `${base}/en/mcp` } },
    },
    {
      url: `${base}/fr/mcp`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { fr: `${base}/fr/mcp`, en: `${base}/en/mcp` } },
    },
    // For sales teams: secondary ICP page
    {
      url: `${base}/en/for-sales-teams`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          fr: `${base}/fr/for-sales-teams`,
          en: `${base}/en/for-sales-teams`,
        },
      },
    },
    {
      url: `${base}/fr/for-sales-teams`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${base}/fr/for-sales-teams`,
          en: `${base}/en/for-sales-teams`,
        },
      },
    },
    {
      url: `${base}/fr/manifeste`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/manifeste`, en: `${base}/en/manifeste` } },
    },
    {
      url: `${base}/en/manifeste`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/manifeste`, en: `${base}/en/manifeste` } },
    },
    {
      url: `${base}/fr/contact`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { fr: `${base}/fr/contact`, en: `${base}/en/contact` } },
    },
    {
      url: `${base}/en/contact`,
      lastModified: staticLastMod,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { fr: `${base}/fr/contact`, en: `${base}/en/contact` } },
    },
    {
      url: `${base}/fr/blog`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/blog`, en: `${base}/en/blog` } },
    },
    {
      url: `${base}/en/blog`,
      lastModified: staticLastMod,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/blog`, en: `${base}/en/blog` } },
    },
    // Legal pages
    {
      url: `${base}/fr/mentions-legales`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/mentions-legales`, en: `${base}/en/mentions-legales` } },
    },
    {
      url: `${base}/en/mentions-legales`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/mentions-legales`, en: `${base}/en/mentions-legales` } },
    },
    {
      url: `${base}/fr/cgu`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/cgu`, en: `${base}/en/cgu` } },
    },
    {
      url: `${base}/en/cgu`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/cgu`, en: `${base}/en/cgu` } },
    },
    {
      url: `${base}/fr/privacy`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/privacy`, en: `${base}/en/privacy` } },
    },
    {
      url: `${base}/en/privacy`,
      lastModified: staticLastMod,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { fr: `${base}/fr/privacy`, en: `${base}/en/privacy` } },
    },
  ]

  // Blog articles: deduplicate, only emit one entry per article pair, with correct alternates
  const seenPairs = new Set()
  const blogPages = []

  for (const lang of ["fr", "en"]) {
    const slugs = getBlogSlugs(lang)
    for (const slug of slugs) {
      const pair = getSlugPair(slug, lang)
      const pairKey = `${pair.fr}::${pair.en}`

      // Emit FR and EN entries separately (for the sitemap), but with correct cross-language alternates
      if (!seenPairs.has(pairKey)) {
        seenPairs.add(pairKey)

        const frDate = getBlogDate("fr", pair.fr)
        const enDate = getBlogDate("en", pair.en)
        const articleDate = frDate || enDate || staticLastMod

        // FR entry
        blogPages.push({
          url: `${base}/fr/blog/${pair.fr}`,
          lastModified: articleDate,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: {
              fr: `${base}/fr/blog/${pair.fr}`,
              en: `${base}/en/blog/${pair.en}`,
            },
          },
        })

        // EN entry
        blogPages.push({
          url: `${base}/en/blog/${pair.en}`,
          lastModified: articleDate,
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: {
              fr: `${base}/fr/blog/${pair.fr}`,
              en: `${base}/en/blog/${pair.en}`,
            },
          },
        })
      }
    }
  }

  return [...staticPages, ...blogPages]
}
