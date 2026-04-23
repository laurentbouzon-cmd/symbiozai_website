import type { ReactNode } from "react"
import { CTABlock } from "./cta-block"

interface CTA {
  label: string
  href: string
  external?: boolean
}

interface HeroSectionProps {
  eyebrow?: string
  headline: string
  subhead: string
  primary: CTA
  secondary?: CTA
  tertiary?: CTA
  visual?: ReactNode
  tone?: "light" | "dark"
}

/**
 * HeroSection — central hero used on /mcp and /for-sales-teams.
 * Editorial aesthetic: tight typography stack, generous negative space,
 * a single subtle radial accent behind the headline, no autoplay video.
 */
export function HeroSection({
  eyebrow,
  headline,
  subhead,
  primary,
  secondary,
  tertiary,
  visual,
  tone = "light",
}: HeroSectionProps) {
  const isDark = tone === "dark"
  const textMain = isDark ? "text-white" : "text-gray-950"
  const textSub = isDark ? "text-white/75" : "text-gray-600"
  const textEyebrow = isDark ? "text-white/60" : "text-[#0d47a1]"
  const bgBase = isDark ? "bg-gray-950" : "bg-white"

  return (
    <section className={`relative overflow-hidden ${bgBase}`}>
      {/* Subtle dotted grid + radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)"
            : "radial-gradient(rgba(13,71,161,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] -z-0 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(0,229,255,0.14) 0%, rgba(13,71,161,0.05) 45%, transparent 75%)"
            : "radial-gradient(circle, rgba(0,229,255,0.14) 0%, rgba(13,71,161,0.04) 45%, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24">
        <div className={`mx-auto ${visual ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14" : "max-w-4xl text-center"}`}>
          <div className={visual ? "text-left" : "text-center"}>
            {eyebrow && (
              <p className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] ${textEyebrow}`}>
                {eyebrow}
              </p>
            )}

            <h1
              className={`${textMain} font-semibold tracking-tight text-4xl leading-[1.05] sm:text-5xl md:text-6xl lg:text-[64px]`}
            >
              {headline}
            </h1>

            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${textSub} ${
                visual ? "" : "mx-auto"
              }`}
            >
              {subhead}
            </p>

            <div className={`mt-10 ${visual ? "" : "flex justify-center"}`}>
              <CTABlock
                primary={primary}
                secondary={secondary}
                tertiary={tertiary}
                align={visual ? "left" : "center"}
                size="lg"
              />
            </div>
          </div>

          {visual && (
            <div className="mt-14 lg:mt-0">
              {visual}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
