"use client"

import { useState, useMemo } from "react"
import { CategoryFilter } from "./category-filter"
import { BlogSearch } from "./blog-search"
import { ArticleCard } from "./article-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CATEGORIES, type BlogCategory, type BlogPostMeta } from "@/lib/blog-types"
import type { Dictionary } from "@/lib/dictionary"

interface BlogListProps {
  posts: BlogPostMeta[]
  lang: string
  dictionary: Dictionary
}

export function BlogList({ posts, lang, dictionary }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const counts = useMemo(() => {
    const result: Record<string, number> = {}
    for (const post of posts) {
      result[post.category] = (result[post.category] || 0) + 1
    }
    return result
  }, [posts])

  const filtered = useMemo(() => {
    let result = posts

    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [posts, activeCategory, searchQuery])

  const isFr = lang === "fr"

  return (
    <>
      <div className="mb-8">
        <BlogSearch value={searchQuery} onChange={setSearchQuery} lang={lang} />
      </div>

      <div className="mb-12">
        <CategoryFilter
          categories={CATEGORIES}
          dictionary={dictionary}
          onFilter={setActiveCategory}
          counts={counts}
          totalCount={posts.length}
        />
      </div>

      <div className="space-y-0">
        {filtered.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 50}>
            <div className={index > 0 ? "border-t border-gray-100 pt-8 mt-8" : ""}>
              <ArticleCard post={post} lang={lang} dictionary={dictionary} />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          {searchQuery.trim()
            ? (isFr ? "Aucun article ne correspond a votre recherche." : "No articles match your search.")
            : (isFr ? "Aucun article dans cette categorie." : "No articles in this category.")
          }
        </p>
      )}
    </>
  )
}
