"use client"

import { useEffect, useState } from "react"

interface TocItem {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const article = document.querySelector("[data-article-content]")
    if (!article) return

    const elements = article.querySelectorAll("h2, h3")
    const items: TocItem[] = Array.from(elements).map((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || ""
      if (!el.id) {
        el.id = id
      }
      return {
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      }
    })

    setHeadings(items)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0.1 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="hidden lg:block sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Sommaire</p>
      <ul className="space-y-2 border-l border-gray-100">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById(heading.id)
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className={`block text-sm py-1 pl-4 -ml-px border-l-2 transition-colors duration-200 ${
                activeId === heading.id
                  ? "border-[#0d47a1] text-[#0d47a1] font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
