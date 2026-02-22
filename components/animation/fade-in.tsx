"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  threshold?: number
  duration?: number
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.1,
  duration = 0.5,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  // Définir les classes de transformation initiale en fonction de la direction
  let transformClass = ""
  switch (direction) {
    case "up":
      transformClass = "translate-y-10"
      break
    case "down":
      transformClass = "-translate-y-10"
      break
    case "left":
      transformClass = "translate-x-10"
      break
    case "right":
      transformClass = "-translate-x-10"
      break
    default:
      transformClass = ""
  }

  return (
    <div
      ref={ref}
      className={`opacity-0 ${transformClass} transition-all ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        transitionDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
