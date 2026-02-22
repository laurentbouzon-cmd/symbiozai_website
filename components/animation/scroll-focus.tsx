"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollFocusProps {
  children: ReactNode
  className?: string
  darkColor?: string
  lightColor?: string
  threshold?: number
}

export function ScrollFocus({
  children,
  className = "",
  darkColor = "text-gray-900",
  lightColor = "text-gray-400",
  threshold = 0.5,
}: ScrollFocusProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Quand l'élément est visible à plus de X% (threshold)
          if (entry.isIntersecting) {
            entry.target.classList.add(darkColor)
            entry.target.classList.remove(lightColor)
          } else {
            entry.target.classList.add(lightColor)
            entry.target.classList.remove(darkColor)
          }
        })
      },
      {
        threshold: threshold,
        rootMargin: "-100px 0px -100px 0px", // Ajuste la zone de "focus"
      },
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [darkColor, lightColor, threshold])

  return (
    <div ref={ref} className={`transition-colors duration-500 ${lightColor} ${className}`}>
      {children}
    </div>
  )
}
