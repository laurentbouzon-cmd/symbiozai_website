import Link from "next/link"
import type { ReactNode } from "react"

interface CTA {
  label: string
  href: string
  external?: boolean
}

interface CTABlockProps {
  primary: CTA
  secondary?: CTA
  tertiary?: CTA
  align?: "left" | "center"
  size?: "default" | "lg"
  ariaLabel?: string
}

/**
 * CTABlock: shared primary / secondary / tertiary CTA pattern.
 * Primary uses the brand gradient (reserved for the principal action).
 * Secondary is a quiet outlined button. Tertiary is a plain text link with arrow.
 */
export function CTABlock({ primary, secondary, tertiary, align = "center", size = "default", ariaLabel }: CTABlockProps) {
  const wrapperAlignment = align === "center" ? "justify-center" : "justify-start"
  const sizing = size === "lg" ? "h-12 px-7 text-base" : "h-11 px-6 text-sm md:text-base"

  return (
    <div className={`flex flex-wrap items-center gap-3 sm:gap-4 ${wrapperAlignment}`} aria-label={ariaLabel}>
      <CTALink href={primary.href} external={primary.external}>
        <span className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] text-white font-medium shadow-[0_6px_20px_-10px_rgba(0,229,255,0.7)] transition hover:opacity-90 ${sizing}`}>
          {primary.label}
        </span>
      </CTALink>

      {secondary && (
        <CTALink href={secondary.href} external={secondary.external}>
          <span className={`inline-flex items-center justify-center rounded-full border border-gray-900/15 bg-white text-gray-900 font-medium transition hover:border-gray-900/40 hover:bg-gray-50 ${sizing}`}>
            {secondary.label}
          </span>
        </CTALink>
      )}

      {tertiary && (
        <CTALink href={tertiary.href} external={tertiary.external}>
          <span className="group inline-flex min-h-[44px] items-center gap-1.5 px-2 py-2 text-sm font-medium text-gray-700 transition hover:text-[#0d47a1]">
            {tertiary.label}
            <Arrow />
          </span>
        </CTALink>
      )}
    </div>
  )
}

function Arrow() {
  return (
    <svg
      className="transition-transform duration-200 group-hover:translate-x-0.5"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CTALink({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <Link href={href}>{children}</Link>
}
