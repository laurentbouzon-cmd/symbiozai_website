import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getDictionary } from "@/lib/dictionary"
import { getPostBySlug, getAdjacentPosts, getAllSlugs } from "@/lib/blog"
import { ArticleLayout } from "@/components/blog/article-layout"

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Organization",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
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
  }

  return {
    title: `${post.meta.title} | SymbiozAI Blog`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `https://symbioz.ai/${lang}/blog/${slug}`,
      siteName: "SymbiozAI",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
    alternates: {
      canonical: `https://symbioz.ai/${lang}/blog/${slug}`,
      languages: {
        en: `https://symbioz.ai/en/blog/${slug}`,
        fr: `https://symbioz.ai/fr/blog/${slug}`,
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

  // Schema.org structured data - content is from our own static MDX files,
  // not from user input, so this is safe for injection into a script tag.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: {
      "@type": "Organization",
      name: "SymbiozAI",
      url: "https://symbioz.ai",
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
  }

  const jsonLdHtml = JSON.stringify(jsonLd)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <ArticleLayout
        meta={post.meta}
        lang={lang}
        dictionary={dictionary}
        previous={previous}
        next={next}
      >
        <MDXRemote source={post.content} />
      </ArticleLayout>
    </>
  )
}
