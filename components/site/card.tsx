/**
 * Card - canonical card chrome used across home, /mcp, /for-sales-teams.
 *
 * Consolidates the exact chrome that was duplicated inline 14+ times:
 *   rounded-2xl border border-gray-200 bg-white p-6 [hover lift + border
 *   tint + shadow] transition-all duration-200
 *
 * Variants:
 *   - hoverable (default true): lift -translate-y-0.5, border #0d47a1/30,
 *     two-layer shadow on hover. Used for clickable/interactive cards.
 *   - hoverable=false: static chrome for display-only cards (e.g. compliance
 *     "Five facts" blocks, testimonial cards).
 *
 * Consumers pass their own layout classes via className (flex/grid/padding
 * overrides). Default padding is p-6; override with p-7, md:p-8 etc.
 */

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type CardProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * When true, apply the hover treatment (lift + border tint + shadow).
   * Default true. Set to false for non-interactive, display-only cards.
   */
  hoverable?: boolean
  /**
   * HTML element to render. Default "div". Use "article" for semantic
   * article cards (e.g. blog post cards, pain-point cards).
   */
  as?: "div" | "article"
}

const BASE_CHROME = "rounded-2xl border border-gray-200 bg-white p-6"
const HOVER_CHROME =
  "transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0d47a1]/30 hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)]"

export function Card({
  children,
  hoverable = true,
  as = "div",
  className,
  ...props
}: CardProps) {
  const Component = as
  return (
    <Component
      className={cn(BASE_CHROME, hoverable && HOVER_CHROME, className)}
      {...props}
    >
      {children}
    </Component>
  )
}
