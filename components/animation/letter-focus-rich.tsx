"use client"

import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react"
import parse from "html-react-parser"

interface LetterFocusRichProps {
  children: string
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"
  className?: string
  preserveFormatting?: boolean
}

export function LetterFocusRich({
  children,
  tag = "p",
  className = "",
  preserveFormatting = true,
}: LetterFocusRichProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)

          if (entry.isIntersecting) {
            containerRef.current?.classList.add("is-visible")
          } else {
            containerRef.current?.classList.remove("is-visible")
          }
        })
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        rootMargin: "-100px 0px -100px 0px",
      },
    )

    observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Traiter le texte pour préserver le formatage
  const processText = () => {
    if (!preserveFormatting) {
      // Version simple - divise simplement le texte en caractères
      return children.split("").map((char, index) => (
        <span
          key={index}
          className="letter-animate inline-block transition-colors duration-300"
          style={{ transitionDelay: `${index * 15}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))
    }

    // Version avec préservation du formatage
    // Remplacer les sauts de ligne par des balises <br>
    const textWithLineBreaks = children.replace(/\n/g, "<br>")

    // Traiter le texte avec html-react-parser pour préserver les balises HTML
    const parsed = parse(textWithLineBreaks, {
      replace: (domNode) => {
        if (domNode.type === "text" && "data" in domNode) {
          const text = domNode.data
          return (
            <>
              {text.split("").map((char, index) => (
                <span
                  key={index}
                  className="letter-animate inline-block transition-colors duration-300"
                  style={{ transitionDelay: `${index * 15}ms` }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </>
          )
        }
        return domNode as ReactNode
      },
    })

    return parsed
  }

  // Créer l'élément avec le tag approprié
  const Tag = tag as ElementType

  return (
    <div ref={containerRef} className={`letter-focus-container ${className} ${isVisible ? "is-visible" : ""}`}>
      <Tag>{processText()}</Tag>
    </div>
  )
}
