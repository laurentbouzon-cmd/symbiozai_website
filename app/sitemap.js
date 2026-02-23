export default function sitemap() {
  const base = "https://symbioz.ai"
  const today = new Date()

  return [
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
  ]
}
