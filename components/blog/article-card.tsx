import Link from "next/link"
import { formatDate, type BlogPostMeta } from "@/lib/blog-types"
import type { Dictionary } from "@/lib/dictionary"

interface ArticleCardProps {
  post: BlogPostMeta
  lang: string
  dictionary: Dictionary
}

export function ArticleCard({ post, lang, dictionary }: ArticleCardProps) {
  const categoryLabel =
    dictionary.blog.categories[post.category as keyof typeof dictionary.blog.categories] || post.category

  const isFr = lang === "fr"

  return (
    <article className="group relative pl-6 blog-article-card">
      {/* Accent line on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gray-100 group-hover:bg-gradient-to-b group-hover:from-[#0d47a1] group-hover:to-[#00e5ff] transition-all duration-300" />
      <Link href={`/${lang}/blog/${post.slug}`} className="block py-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium uppercase tracking-wider text-[#0d47a1]/70 group-hover:text-[#0d47a1] transition-colors duration-200">
            {categoryLabel}
          </span>
          {post.featured && (
            <>
              <span className="text-xs text-gray-300">·</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] text-white">
                {isFr ? "A la une" : "Featured"}
              </span>
            </>
          )}
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{formatDate(post.date, lang)}</span>
        </div>
        <h2
          className={`font-semibold text-gray-900 group-hover:text-[#0d47a1] transition-colors duration-300 mb-2 ${
            post.featured ? "text-2xl" : "text-xl"
          }`}
        >
          {post.title}
        </h2>
        <p className="text-base text-gray-500 mb-3 line-clamp-2">{post.description}</p>
        <p className="text-sm text-gray-400">
          {post.readingTime} {dictionary.blog.readingTime}
        </p>
      </Link>
    </article>
  )
}
