"use client"

import { useState } from "react"
import { CategoryFilter } from "./category-filter"
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

  const filtered = activeCategory ? posts.filter((p) => p.category === activeCategory) : posts

  return (
    <>
      <div className="mb-12">
        <CategoryFilter categories={CATEGORIES} dictionary={dictionary} onFilter={setActiveCategory} />
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
          {lang === "fr" ? "Aucun article dans cette cat\u00e9gorie." : "No articles in this category."}
        </p>
      )}
    </>
  )
}
