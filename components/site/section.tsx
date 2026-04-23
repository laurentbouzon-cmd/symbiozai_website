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
  /** Vertical rhythm: "generous" = py-20 md:py-28 lg:py-32 (YC-grade default),
   *  "default" = py-16 md:py-20 (legacy / auxiliary sections). */
  rhythm?: "default" | "generous"
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
 * Section: consistent page section wrapper.
 *
 * Handles the canonical structure enforced site-wide after YC-grade polish
 * pass (2026-04-23): H2 + description (lede) + visual/content. Every section
 * that uses this wrapper inherits uniform rhythm, typography scale, and
 * tone transitions (white / gray / inverted).
 *
 * Vertical rhythm: py-20 md:py-28 lg:py-32 on keyed sections via
 * `rhythm="generous"`, default keeps py-16 md:py-20 (kept for backwards
 * compat on auxiliary sections).
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
  rhythm = "generous",
}: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || lede)
  const alignment = titleAlign === "center" ? "text-center" : "text-left"
  const inverted = tone === "inverted"
  const eyebrowColor = inverted ? "text-[#6ddcff]" : "text-[#0d47a1]"
  const titleColor = inverted ? "text-white" : "text-gray-950"
  const ledeColor = inverted ? "text-white/75" : "text-gray-600"

  const paddingY =
    rhythm === "generous"
      ? "py-20 sm:py-24 md:py-28 lg:py-32"
      : "py-16 sm:py-20 md:py-20"

  return (
    <section id={id} className={`${TONES[tone]} ${className}`}>
      <div className={`mx-auto ${CONTAINERS[container]} px-4 sm:px-6 ${paddingY}`}>
        {hasHeader && (
          <div
            className={`${alignment} ${
              titleAlign === "center" ? "mx-auto max-w-3xl" : ""
            } mb-12 md:mb-16`}
          >
            {eyebrow && (
              <p
                className={`mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] ${eyebrowColor}`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`${titleColor} text-3xl font-semibold tracking-tight sm:text-4xl md:text-[44px] md:leading-[1.08] lg:text-5xl lg:leading-[1.05]`}
              >
                {title}
              </h2>
            )}
            {lede && (
              <p
                className={`mt-6 text-lg leading-relaxed sm:text-xl sm:leading-[1.55] ${ledeColor}`}
              >
                {lede}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
