export type BlogCategory = "produit" | "comparatifs" | "guides" | "actualites-ia"

export interface BlogPostMeta {
  title: string
  description: string
  date: string
  category: BlogCategory
  author: string
  readingTime: number
  slug: string
  featured: boolean
}

export interface BlogPost {
  meta: BlogPostMeta
  content: string
}

export const CATEGORIES: BlogCategory[] = ["produit", "comparatifs", "guides", "actualites-ia"]

export function formatDate(dateStr: string, lang: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
