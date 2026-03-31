"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  q: string
  a: string
}

interface FAQProps {
  items: FAQItem[]
}

/**
 * FAQ accordion component for MDX blog articles.
 *
 * Usage in MDX:
 * <FAQ items={[
 *   { q: "What is an AI CRM?", a: "An AI CRM is..." },
 *   { q: "How does it work?", a: "It works by..." },
 * ]} />
 *
 * Renders:
 * - An accessible accordion UI (click to expand/collapse)
 * - Inline FAQPage JSON-LD schema for Google rich results
 *
 * SECURITY: items come from static MDX files (hardcoded by authors),
 * not from user input. The JSON-LD content is safe — no sanitization
 * needed because there is zero user-controlled data in the pipeline.
 * This follows the same pattern as the existing BlogPosting JSON-LD
 * in app/[lang]/blog/[slug]/page.tsx.
 */
export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }, [])

  const jsonLd = useMemo(() => {
    if (!items || items.length === 0) return null
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    })
  }, [items])

  if (!items || items.length === 0) return null

  return (
    <>
      {/* JSON-LD built from static MDX frontmatter, not user input — safe */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}
      <div className="not-prose my-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Questions frequentes
        </h3>
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
          {items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="bg-white">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d47a1] focus-visible:ring-inset"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
