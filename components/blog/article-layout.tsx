import Link from "next/link"
import { formatDate, type BlogPostMeta } from "@/lib/blog-types"
import type { Dictionary } from "@/lib/dictionary"
import { TableOfContents } from "./table-of-contents"
import { ReadingProgress } from "./reading-progress"
import { ShareButtons } from "./share-buttons"
import { RelatedArticles } from "./related-articles"
import { AuthorCard } from "./author-card"
import { WaitlistForm } from "@/components/waitlist-form"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

interface ArticleLayoutProps {
  meta: BlogPostMeta
  lang: string
  dictionary: Dictionary
  previous: BlogPostMeta | null
  next: BlogPostMeta | null
  relatedArticles?: BlogPostMeta[]
  children: React.ReactNode
}

export function ArticleLayout({ meta, lang, dictionary, previous, next, relatedArticles = [], children }: ArticleLayoutProps) {
  const isFr = lang === "fr"
  const categoryLabel =
    dictionary.blog.categories[meta.category as keyof typeof dictionary.blog.categories] || meta.category

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgress />
      <SharedHeader lang={lang} dictionary={dictionary} activePage="blog" />

      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24">
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center text-sm text-gray-400 hover:text-[#0d47a1] transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dictionary.blog.backToBlog}
        </Link>
      </div>

      {/* Article header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8">
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0d47a1]">{categoryLabel}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mt-3 mb-4">{meta.title}</h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-400">
                {formatDate(meta.date, lang)} · {meta.readingTime} {dictionary.blog.readingTime}
              </p>
              <ShareButtons title={meta.title} />
            </div>
            <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full" />
          </div>
        </ScrollReveal>
      </div>

      {/* Content grid: TOC + Article */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12">
          {/* Sidebar TOC */}
          <aside className="order-2 lg:order-1">
            <TableOfContents />
          </aside>

          {/* Article content */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <div
                data-article-content
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#0d47a1] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-[#0d47a1] prose-blockquote:bg-[#0d47a1]/5 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:not-italic prose-blockquote:font-normal [&_blockquote_p]:italic"
              >
                {children}
              </div>
            </ScrollReveal>

            {/* Author card — E-E-A-T signal */}
            <AuthorCard lang={lang} />

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <RelatedArticles articles={relatedArticles} lang={lang} dictionary={dictionary} />
            )}
          </div>
        </div>
      </div>

      {/* CTA Waitlist */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-[#0d47a1] to-[#1a237e] text-white">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{dictionary.blog.ctaTitle}</h3>
            <p className="text-white/80 mb-8">{dictionary.blog.ctaDescription}</p>
            <div className="max-w-md mx-auto">
              <WaitlistForm form={dictionary.form} lang={lang} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Previous / Next navigation */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {previous && (
              <Link
                href={`/${lang}/blog/${previous.slug}`}
                className="group inline-block"
              >
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  {dictionary.blog.previousArticle}
                </span>
                <p className="text-base font-medium text-gray-900 group-hover:text-[#0d47a1] transition-colors duration-200 mt-1">
                  {previous.title}
                </p>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {next && (
              <Link
                href={`/${lang}/blog/${next.slug}`}
                className="group inline-block"
              >
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  {dictionary.blog.nextArticle}
                </span>
                <p className="text-base font-medium text-gray-900 group-hover:text-[#0d47a1] transition-colors duration-200 mt-1">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <SharedFooter lang={lang} dictionary={dictionary} />
    </div>
  )
}
