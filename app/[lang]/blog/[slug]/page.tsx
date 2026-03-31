import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getDictionary } from "@/lib/dictionary"
import { getPostBySlug, getAdjacentPosts, getAllSlugs, getPostsByCategory } from "@/lib/blog"
import { getSlugPair } from "@/lib/blog-i18n-slugs"
import { ArticleLayout } from "@/components/blog/article-layout"
import { mdxComponents } from "@/components/blog/mdx-components"

export async function generateStaticParams() {
  const langs = ["en", "fr"]
  const params: Array<{ lang: string; slug: string }> = []

  for (const lang of langs) {
    const slugs = getAllSlugs(lang)
    for (const slug of slugs) {
      params.push({ lang, slug })
    }
  }

  return params
}

/** Rough word count from MDX content (strips markdown syntax). */
function countWords(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#*_`~\[\]()>|\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text.split(" ").filter(Boolean).length
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const post = getPostBySlug(lang, slug)

  if (!post) {
    return { title: "Not Found" }
  }

  const slugPair = getSlugPair(slug, lang)
  const ogImageUrl = `/og?title=${encodeURIComponent(post.meta.title)}&lang=${lang}`
  const pageUrl = `https://symbioz.ai/${lang}/blog/${slug}`
  const wordCount = countWords(post.content)

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.meta.title,
      description: post.meta.description,
      datePublished: post.meta.date,
      dateModified: post.meta.date,
      wordCount,
      inLanguage: lang === "fr" ? "fr-FR" : "en-US",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      image: {
        "@type": "ImageObject",
        url: `https://symbioz.ai${ogImageUrl}`,
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Person",
        name: "Laurent Bouzon",
        url: "https://symbioz.ai",
        jobTitle: "Founder & CEO",
        sameAs: ["https://www.linkedin.com/in/laurentbouzon/"],
      },
      publisher: {
        "@type": "Organization",
        name: "SymbiozAI",
        url: "https://symbioz.ai",
        logo: {
          "@type": "ImageObject",
          url: "https://symbioz.ai/icon.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "fr" ? "Accueil" : "Home",
          item: `https://symbioz.ai/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `https://symbioz.ai/${lang}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.meta.title,
        },
      ],
    },
  ]

  return {
    title: `${post.meta.title} | SymbiozAI`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: pageUrl,
      siteName: "SymbiozAI",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.meta.date,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `https://symbioz.ai/en/blog/${slugPair.en}`,
        fr: `https://symbioz.ai/fr/blog/${slugPair.fr}`,
      },
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const post = getPostBySlug(lang, slug)

  if (!post) {
    notFound()
  }

  const dictionary = getDictionary(lang)
  const { previous, next } = getAdjacentPosts(lang, slug)

  // Get related articles from same category (max 3, exclude current)
  const relatedArticles = getPostsByCategory(lang, post.meta.category)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  const ogImageUrl = `/og?title=${encodeURIComponent(post.meta.title)}&lang=${lang}`
  const pageUrl = `https://symbioz.ai/${lang}/blog/${slug}`
  const wordCount = countWords(post.content)

  // Schema.org structured data — built entirely from our own static MDX
  // frontmatter, not from user input. Safe for script injection.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.meta.title,
      description: post.meta.description,
      datePublished: post.meta.date,
      dateModified: post.meta.date,
      wordCount,
      inLanguage: lang === "fr" ? "fr-FR" : "en-US",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": pageUrl,
      },
      image: {
        "@type": "ImageObject",
        url: `https://symbioz.ai${ogImageUrl}`,
        width: 1200,
        height: 630,
      },
      author: {
        "@type": "Person",
        name: "Laurent Bouzon",
        url: "https://symbioz.ai",
        jobTitle: "Founder & CEO",
        sameAs: ["https://www.linkedin.com/in/laurentbouzon/"],
      },
      publisher: {
        "@type": "Organization",
        name: "SymbiozAI",
        url: "https://symbioz.ai",
        logo: {
          "@type": "ImageObject",
          url: "https://symbioz.ai/icon.png",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "fr" ? "Accueil" : "Home",
          item: `https://symbioz.ai/${lang}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `https://symbioz.ai/${lang}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.meta.title,
        },
      ],
    },
  ]

  const jsonLdHtml = JSON.stringify(jsonLd)

  return (
    <>
      {/* eslint-disable-next-line -- JSON-LD from static MDX frontmatter, no user input */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <ArticleLayout
        meta={post.meta}
        lang={lang}
        dictionary={dictionary}
        previous={previous}
        next={next}
        relatedArticles={relatedArticles}
      >
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </ArticleLayout>
    </>
  )
}
