import Link from "next/link"
import { formatDate, type BlogPostMeta } from "@/lib/blog-types"
import type { Dictionary } from "@/lib/dictionary"

interface RelatedArticlesProps {
  articles: BlogPostMeta[]
  lang: string
  dictionary: Dictionary
}

export function RelatedArticles({ articles, lang, dictionary }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  const isFr = lang === "fr"

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
        {isFr ? "Articles similaires" : "Related articles"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const categoryLabel =
            dictionary.blog.categories[article.category as keyof typeof dictionary.blog.categories] || article.category

          return (
            <Link
              key={article.slug}
              href={`/${lang}/blog/${article.slug}`}
              className="group block p-5 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-sm"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-[#0d47a1]/60 group-hover:text-[#0d47a1] transition-colors duration-200">
                {categoryLabel}
              </span>
              <h4 className="text-base font-semibold text-gray-900 group-hover:text-[#0d47a1] transition-colors duration-200 mt-2 mb-2 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-gray-400">
                {formatDate(article.date, lang)}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
