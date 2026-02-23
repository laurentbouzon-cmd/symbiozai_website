"use client"

import { useEffect, useRef, useState, type ElementType } from "react"
import { throttle } from "lodash"

interface ContinuousLetterFocusProps {
  children: string
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"
  className?: string
  darkColor?: string
  lightColor?: string
  focusZoneHeight?: number
}

export function ContinuousLetterFocus({
  children,
  tag = "p",
  className = "",
  darkColor = "text-gray-900",
  lightColor = "text-gray-400",
  focusZoneHeight = 300, // Hauteur de la zone de focus en pixels
}: ContinuousLetterFocusProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letters, setLetters] = useState<HTMLSpanElement[]>([])
  const [windowHeight, setWindowHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Initialiser les lettres et les mesures de la fenêtre
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight)
      setScrollY(window.scrollY)

      // Créer les éléments span pour chaque lettre
      if (containerRef.current) {
        const text = children
        containerRef.current.innerHTML = "" // Vider le conteneur

        // Créer un élément avec le tag approprié
        const element = document.createElement(tag)
        element.className = "letter-container"

        // Ajouter chaque lettre dans un span
        text.split("").forEach((char, index) => {
          const span = document.createElement("span")
          span.className = "letter-animate inline-block transition-colors duration-300"
          span.textContent = char === " " ? "\u00A0" : char
          span.style.transitionDelay = `${index * 5}ms` // Délai plus court pour un effet plus fluide
          element.appendChild(span)
        })

        containerRef.current.appendChild(element)

        // Collecter toutes les lettres
        const letterElements = Array.from(containerRef.current.querySelectorAll(".letter-animate"))
        setLetters(letterElements as HTMLSpanElement[])
      }

      // Gérer le redimensionnement de la fenêtre
      const handleResize = () => {
        setWindowHeight(window.innerHeight)
      }

      // Gérer le défilement avec throttle pour de meilleures performances
      const handleScroll = throttle(() => {
        setScrollY(window.scrollY)
      }, 10)

      window.addEventListener("resize", handleResize)
      window.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [children, tag])

  // Mettre à jour l'opacité des lettres en fonction du défilement
  useEffect(() => {
    if (letters.length === 0 || typeof window === "undefined") return

    // Calculer la position de la zone de focus
    const focusZoneTop = windowHeight / 2 - focusZoneHeight / 2
    const focusZoneBottom = windowHeight / 2 + focusZoneHeight / 2

    // Mettre à jour chaque lettre
    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect()
      const letterMiddle = rect.top + rect.height / 2

      // Calculer la position relative dans la zone de focus
      let opacity = 0
      if (letterMiddle < focusZoneTop) {
        // Au-dessus de la zone de focus
        opacity = 0
      } else if (letterMiddle > focusZoneBottom) {
        // En-dessous de la zone de focus
        opacity = 0
      } else {
        // Dans la zone de focus
        // Calculer l'opacité en fonction de la position dans la zone
        const relativePosition = (letterMiddle - focusZoneTop) / focusZoneHeight

        // Créer une courbe en cloche pour l'opacité
        opacity = Math.sin(relativePosition * Math.PI)
      }

      // Appliquer l'opacité via les classes
      if (opacity > 0.8) {
        letter.classList.add(darkColor)
        letter.classList.remove(lightColor)
      } else {
        letter.classList.add(lightColor)
        letter.classList.remove(darkColor)
      }
    })
  }, [scrollY, windowHeight, letters, darkColor, lightColor, focusZoneHeight])

  // Créer l'élément avec le tag approprié
  const Tag = tag as ElementType

  return (
    <div ref={containerRef} className={`continuous-letter-focus ${className}`}>
      <Tag>{children}</Tag>
    </div>
  )
}
