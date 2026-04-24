import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogCategory, BlogPostMeta, BlogPost } from "./blog-types"

export type { BlogCategory, BlogPostMeta, BlogPost } from "./blog-types"
export { CATEGORIES, formatDate } from "./blog-types"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function getBlogDir(lang: string): string {
  return path.join(BLOG_DIR, lang)
}

export function getAllPosts(lang: string): BlogPostMeta[] {
  const dir = getBlogDir(lang)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))

  const posts = files
    .map((filename) => {
      const filePath = path.join(dir, filename)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)

      // Support both `date` (original editorial articles) and `publishedAt`
      // (Content Engine generated articles). Skip articles with neither so
      // they do not silently land at the bottom due to NaN sort.
      const rawDate = (data.date as string | undefined) ?? (data.publishedAt as string | undefined)
      if (!rawDate) {
        return null
      }

      return {
        title: data.title as string,
        description: data.description as string,
        date: rawDate,
        category: data.category as BlogCategory,
        author: (data.author as string) || "SymbiozAI",
        readingTime: (data.readingTime as number) || 5,
        slug: filename.replace(/\.mdx$/, ""),
        featured: (data.featured as boolean) || false,
      }
    })
    .filter((p): p is BlogPostMeta => p !== null)

  return posts.sort((a, b) => {
    // Pure date desc (most recent first). The `featured` flag only drives
    // visual treatment in article-card.tsx (badge + larger title), not order.
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getPostsByCategory(lang: string, category: BlogCategory): BlogPostMeta[] {
  return getAllPosts(lang).filter((p) => p.category === category)
}

export function getPostBySlug(lang: string, slug: string): BlogPost | null {
  const filePath = path.join(getBlogDir(lang), `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  const rawDate = (data.date as string | undefined) ?? (data.publishedAt as string | undefined) ?? ""

  return {
    meta: {
      title: data.title as string,
      description: data.description as string,
      date: rawDate,
      category: data.category as BlogCategory,
      author: (data.author as string) || "SymbiozAI",
      readingTime: (data.readingTime as number) || 5,
      slug,
      featured: (data.featured as boolean) || false,
    },
    content,
  }
}

export function getAdjacentPosts(
  lang: string,
  currentSlug: string
): { previous: BlogPostMeta | null; next: BlogPostMeta | null } {
  const posts = getAllPosts(lang)
  const index = posts.findIndex((p) => p.slug === currentSlug)

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}

export function getAllSlugs(lang: string): string[] {
  const dir = getBlogDir(lang)

  if (!fs.existsSync(dir)) {
    return []
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

