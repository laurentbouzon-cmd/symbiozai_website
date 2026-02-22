"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"

interface LetterFocusProps {
  text: string
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"
  className?: string
  darkColor?: string
  lightColor?: string
  transitionSpeed?: number
}

export function LetterFocus({
  text,
  tag = "p",
  className = "",
  darkColor = "text-gray-900",
  lightColor = "text-gray-400",
  transitionSpeed = 0.3,
}: LetterFocusProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letters, setLetters] = useState<Array<{ char: string; opacity: number }>>([])

  // Diviser le texte en caractères individuels
  useEffect(() => {
    setLetters(text.split("").map((char) => ({ char, opacity: 0 })))
  }, [text])

  useEffect(() => {
    if (!containerRef.current) return

    // Fonction pour mettre à jour l'opacité des lettres en fonction du défilement
    const updateLetterOpacity = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const containerHeight = containerRect.height
      const windowHeight = window.innerHeight

      // Position relative du conteneur par rapport à la fenêtre
      const containerTop = containerRect.top
      const containerBottom = containerRect.bottom

      // Si le conteneur est complètement hors de l'écran, ne rien faire
      if (containerBottom < 0 || containerTop > windowHeight) return

      // Calculer la position relative de chaque lettre
      const letterElements = container.querySelectorAll(".letter")
      const newLetters = [...letters]

      letterElements.forEach((letter, index) => {
        const letterRect = letter.getBoundingClientRect()
        const letterTop = letterRect.top

        // Calculer l'opacité en fonction de la position
        // Plus la lettre est proche du centre de l'écran, plus elle est opaque
        const viewportCenter = windowHeight / 2
        const distanceFromCenter = Math.abs(letterTop - viewportCenter)
        const maxDistance = windowHeight / 2

        // Opacité entre 0 et 1, inversement proportionnelle à la distance du centre
        let opacity = 1 - distanceFromCenter / maxDistance

        // Limiter l'opacité entre 0.3 et 1 pour que le texte reste toujours un peu visible
        opacity = Math.max(0.3, Math.min(1, opacity))

        newLetters[index] = { ...newLetters[index], opacity }
      })

      setLetters(newLetters)
    }

    // Mettre à jour l'opacité initiale
    updateLetterOpacity()

    // Ajouter un écouteur d'événement pour le défilement
    window.addEventListener("scroll", updateLetterOpacity, { passive: true })
    window.addEventListener("resize", updateLetterOpacity, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateLetterOpacity)
      window.removeEventListener("resize", updateLetterOpacity)
    }
  }, [letters])

  // Créer l'élément avec le tag approprié
  const Tag = tag as keyof React.JSX.IntrinsicElements

  return (
    <div ref={containerRef} className={className}>
      <Tag>
        {letters.map((letter, index) => (
          <span
            key={index}
            className="letter inline-block transition-colors"
            style={{
              transitionDuration: `${transitionSpeed}s`,
              color: `rgba(17, 24, 39, ${letter.opacity})`, // text-gray-900 en rgba
            }}
          >
            {letter.char === " " ? "\u00A0" : letter.char}
          </span>
        ))}
      </Tag>
    </div>
  )
}
