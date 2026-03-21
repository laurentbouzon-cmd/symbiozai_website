"use client"

import { useState } from "react"
import type { BlogCategory } from "@/lib/blog-types"
import type { Dictionary } from "@/lib/dictionary"

interface CategoryFilterProps {
  categories: BlogCategory[]
  dictionary: Dictionary
  onFilter: (category: BlogCategory | null) => void
  counts: Record<string, number>
  totalCount: number
}

export function CategoryFilter({ categories, dictionary, onFilter, counts, totalCount }: CategoryFilterProps) {
  const [active, setActive] = useState<BlogCategory | null>(null)

  const handleClick = (category: BlogCategory | null) => {
    setActive(category)
    onFilter(category)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleClick(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
          active === null
            ? "bg-[#0d47a1] text-white border-[#0d47a1]"
            : "text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
        }`}
      >
        {dictionary.blog.allPosts} ({totalCount})
      </button>
      {categories.map((cat) => {
        const label = dictionary.blog.categories[cat as keyof typeof dictionary.blog.categories] || cat
        const count = counts[cat] || 0
        return (
          <button
            key={cat}
            onClick={() => handleClick(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 border ${
              active === cat
                ? "bg-[#0d47a1] text-white border-[#0d47a1]"
                : "text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
            }`}
          >
            {label} ({count})
          </button>
        )
      })}
    </div>
  )
}
