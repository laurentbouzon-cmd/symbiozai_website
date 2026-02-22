"use client"

import { useEffect, useRef } from "react"

interface ManifestoContentProps {
  sections: {
    title?: string
    content: string | string[]
  }[]
}

export function ManifestoContent({ sections }: ManifestoContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Effet pour ajouter un simple effet de fade-in au défilement
  useEffect(() => {
    if (!contentRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("opacity-50")
          } else {
            entry.target.classList.add("opacity-50")
            entry.target.classList.remove("opacity-100")
          }
        })
      },
      { threshold: 0.1 },
    )

    const paragraphs = contentRef.current.querySelectorAll(".manifesto-paragraph, .manifesto-title")
    paragraphs.forEach((paragraph) => {
      observer.observe(paragraph)
    })

    return () => {
      paragraphs.forEach((paragraph) => {
        observer.unobserve(paragraph)
      })
    }
  }, [])

  return (
    <div ref={contentRef} className="space-y-8 mb-10">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="manifesto-section transition-opacity duration-500">
          {section.title && (
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 manifesto-title transition-opacity duration-500">
              {section.title}
            </h3>
          )}
          <div className="space-y-4">
            {Array.isArray(section.content) ? (
              section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-lg md:text-xl manifesto-paragraph transition-opacity duration-500">
                  {paragraph.split("\n").map((line, lIndex, array) => (
                    <span key={lIndex}>
                      {line}
                      {lIndex < array.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))
            ) : (
              <p className="text-lg md:text-xl manifesto-paragraph transition-opacity duration-500">
                {section.content.split("\n").map((line, lIndex, array) => (
                  <span key={lIndex}>
                    {line}
                    {lIndex < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
