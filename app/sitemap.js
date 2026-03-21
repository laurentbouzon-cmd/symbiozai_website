import fs from "fs"
import path from "path"

function getBlogSlugs(lang) {
  const dir = path.join(process.cwd(), "content", "blog", lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export default function sitemap() {
  const base = "https://symbioz.ai"
  const today = new Date()

  const staticPages = [
    {
      url: `${base}/`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    {
      url: `${base}/fr`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    {
      url: `${base}/en`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { fr: `${base}/fr`, en: `${base}/en` } },
    },
    {
      url: `${base}/fr/manifeste`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/manifeste`, en: `${base}/en/manifeste` } },
    },
    {
      url: `${base}/en/manifeste`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/manifeste`, en: `${base}/en/manifeste` } },
    },
    {
      url: `${base}/fr/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { fr: `${base}/fr/contact`, en: `${base}/en/contact` } },
    },
    {
      url: `${base}/en/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { fr: `${base}/fr/contact`, en: `${base}/en/contact` } },
    },
    {
      url: `${base}/fr/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/blog`, en: `${base}/en/blog` } },
    },
    {
      url: `${base}/en/blog`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { fr: `${base}/fr/blog`, en: `${base}/en/blog` } },
    },
  ]

  // Blog articles
  const blogPages = []
  for (const lang of ["fr", "en"]) {
    const slugs = getBlogSlugs(lang)
    for (const slug of slugs) {
      blogPages.push({
        url: `${base}/${lang}/blog/${slug}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            fr: `${base}/fr/blog/${slug}`,
            en: `${base}/en/blog/${slug}`,
          },
        },
      })
    }
  }

  return [...staticPages, ...blogPages]
}
