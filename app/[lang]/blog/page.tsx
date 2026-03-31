import type { Metadata } from "next"
import Link from "next/link"
import { getDictionary } from "@/lib/dictionary"
import { getAllPosts } from "@/lib/blog"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BlogList } from "@/components/blog/blog-list"
import { SharedHeader } from "@/components/shared-header"
import { SharedFooter } from "@/components/shared-footer"

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dictionary = getDictionary(lang)

  const isFr = lang === "fr"
  const blogTitle = isFr
    ? "Blog CRM IA & AI-Native : articles et guides | SymbiozAI"
    : "AI CRM Blog: Guides, Comparisons & Insights | SymbiozAI"
  const blogDescription = isFr
    ? "Découvrez nos articles sur le CRM IA, l'AI-Native CRM, le pipeline commercial et l'intelligence artificielle pour la vente. Guides, comparatifs et tendances."
    : "Explore articles on AI CRM, AI-Native CRM, sales pipeline automation and artificial intelligence for sales teams. Guides, comparisons and trends for 2026."

  return {
    title: blogTitle,
    description: blogDescription,
    openGraph: {
      title: blogTitle,
      description: blogDescription,
      url: `https://symbioz.ai/${lang}/blog`,
      siteName: "SymbiozAI",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/blog`,
      languages: {
        en: "https://symbioz.ai/en/blog",
        fr: "https://symbioz.ai/fr/blog",
      },
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dictionary = getDictionary(lang)
  const posts = getAllPosts(lang)
  const currentYear = new Date().getFullYear()
  const isFr = lang === "fr"

  return (
    <div className="min-h-screen bg-white">
      <SharedHeader lang={lang} dictionary={dictionary} activePage="blog" />

      {/* Hero blog */}
      <main className="bg-[radial-gradient(#cceeff_1px,transparent_1px)] bg-[size:10px_10px]">
        <section className="pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(13,71,161,0.04) 40%, transparent 70%)" }}
          />
          <div className="max-w-3xl mx-auto relative z-10">
            <p className="blog-hero-title text-sm font-medium text-[#0d47a1] uppercase tracking-widest mb-4">Blog</p>
            <h1 className="blog-hero-title text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              {isFr ? (
                <>Les idées derrière le{" "}
                  <span className="bg-gradient-to-r from-[#0d47a1] via-[#00e5ff] to-[#0d47a1] bg-clip-text text-transparent blog-gradient-text">
                    CRM AI-Native
                  </span>
                  .
                </>
              ) : (
                <>The ideas behind the{" "}
                  <span className="bg-gradient-to-r from-[#0d47a1] via-[#00e5ff] to-[#0d47a1] bg-clip-text text-transparent blog-gradient-text">
                    AI-Native CRM
                  </span>
                  .
                </>
              )}
            </h1>
            <p className="blog-hero-subtitle text-lg text-gray-500 mb-6">{dictionary.blog.subtitle}</p>
            <div className="blog-accent-line h-1 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full" />
          </div>
        </section>

        {/* Articles */}
        <section className="pb-16 px-4 sm:px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            <BlogList posts={posts} lang={lang} dictionary={dictionary} />
          </div>
        </section>
      </main>

      <SharedFooter lang={lang} dictionary={dictionary} />
    </div>
  )
}
