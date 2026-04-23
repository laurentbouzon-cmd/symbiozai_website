import type { ReactNode } from "react"

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  container?: "narrow" | "default" | "wide"
  tone?: "white" | "gray" | "inverted"
  eyebrow?: string
  title?: string
  lede?: string
  titleAlign?: "left" | "center"
}

const CONTAINERS = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
}

const TONES = {
  white: "bg-white text-gray-900",
  gray: "bg-gray-50 text-gray-900",
  inverted: "bg-gray-950 text-white",
}

/**
 * Section — consistent page section wrapper.
 * Handles eyebrow + title + lede stack and background tone.
 */
export function Section({
  id,
  children,
  className = "",
  container = "default",
  tone = "white",
  eyebrow,
  title,
  lede,
  titleAlign = "center",
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || lede)
  const alignment = titleAlign === "center" ? "text-center" : "text-left"
  const inverted = tone === "inverted"
  const eyebrowColor = inverted ? "text-[#6ddcff]" : "text-[#0d47a1]"
  const titleColor = inverted ? "text-white" : "text-gray-950"
  const ledeColor = inverted ? "text-white/75" : "text-gray-600"

  return (
    <section id={id} className={`${TONES[tone]} ${className}`}>
      <div className={`mx-auto ${CONTAINERS[container]} px-4 py-16 sm:px-6 md:py-20`}>
        {hasHeader && (
          <div
            className={`${alignment} ${
              titleAlign === "center" ? "mx-auto max-w-3xl" : ""
            } mb-10 md:mb-14`}
          >
            {eyebrow && (
              <p className={`mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${eyebrowColor}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`${titleColor} text-3xl font-semibold tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.1]`}>
                {title}
              </h2>
            )}
            {lede && <p className={`mt-5 text-lg leading-relaxed ${ledeColor}`}>{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
