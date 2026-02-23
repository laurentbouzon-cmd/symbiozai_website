"use client"

import { createElement, useEffect, useRef, useState } from "react"

interface LetterFocusProps {
  children: string
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"
  className?: string
  darkColor?: string
  lightColor?: string
}

export function LetterFocusOptimized({
  children,
  tag = "p",
  className = "",
  darkColor = "rgb(17, 24, 39)", // text-gray-900
  lightColor = "rgb(156, 163, 175)", // text-gray-400
}: LetterFocusProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)

          if (entry.isIntersecting) {
            // Quand l'élément est visible, ajouter la classe pour déclencher l'animation
            containerRef.current?.classList.add("is-visible")
          } else {
            // Quand l'élément n'est plus visible, retirer la classe
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

  // Diviser le texte en caractères et créer des spans
  const letters = children.split("").map((char, index) => (
    <span
      key={index}
      className="letter-animate inline-block transition-colors duration-300"
      style={{
        transitionDelay: `${index * 15}ms`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))

  return (
    <div ref={containerRef} className={`letter-focus-container ${className} ${isVisible ? "is-visible" : ""}`}>
      {createElement(tag, {}, letters)}
    </div>
  )
}
