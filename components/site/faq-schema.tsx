interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

/**
 * FAQSchema — renders JSON-LD FAQPage Schema.org.
 * Content is built from our own static copy (no user input), so it is safe.
 * Next.js allows JSON-LD as a script child without hydration mismatch.
 */
export function FAQSchema({ items }: FAQSchemaProps) {
  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }

  // JSON-LD is metadata; browsers do not execute it. Safe for static content.
  return (
    <script type="application/ld+json">
      {JSON.stringify(payload)}
    </script>
  )
}
