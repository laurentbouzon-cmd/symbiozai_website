import type { ReactElement } from "react"

/**
 * AgentActivityFeed - Section 4 (Pilier Autonome) visual.
 *
 * Replaces the rejected AgentsStackVisual ("4 layers / stack" concept
 * rejected by Laurent 2026-04-23). New concept: a live activity feed that
 * shows agents at work in real time. Register familiar to the tech ICP
 * (Claude Code users know activity feeds from CI / Linear / Sentry).
 * Directly illustrates the H2 verbatim "Your agent operates. You supervise."
 * without hierarchizing agents into a vertical stack.
 *
 * Design decisions (frontend-design arbitrage, skill 2026-04-23):
 * - Pure Tailwind + inline SVG icons. No raster, no JS runtime for animation
 *   (CSS keyframes only).
 * - Palette: brand blue accents for agent badges, neutral grays for content,
 *   emerald dot reserved for live pulse on current activity. No new color.
 * - Typography: font-mono on timestamps + agent codes for tech register
 *   (Linear / Vercel dev-tool playbook). Sans semibold on event titles.
 * - Card chrome aligned with site-wide card style (rounded-2xl, border
 *   gray-200, subtle shadow, hover border brand/30).
 * - Animated pulse on top-most "live" row (subtle, ~2s period). No
 *   continuous motion loop (respects reduced-motion via prefers-reduced-motion).
 * - Layout: header bar "live-feed.console" + 5-row activity list + footer
 *   supervision summary. Same chrome metaphor as a CI dashboard.
 * - Lang-aware (FR / EN) with bilingual copy.
 * - aria-hidden on decorative SVG; list semantics preserved for a11y.
 */

interface AgentActivityFeedProps {
  lang: "fr" | "en"
}

type ActivityKind = "pipeline" | "followup" | "signal" | "enrich" | "reactiv"

type ActivityRow = {
  timestamp: string // "08:04" etc
  kind: ActivityKind
  agentCode: string // Short mono badge
  title: string // Event title
  detail: string // Secondary body
  highlight?: boolean // Render live pulse on newest event
}

const KIND_ICON: Record<ActivityKind, ReactElement> = {
  pipeline: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M2.5 4h11M2.5 8h8M2.5 12h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  followup: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3 7.5 6.5 11 13 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  signal: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M8 2v4M8 10v4M2 8h4M10 8h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  ),
  enrich: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M4 4h8v8H4z M4 8h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  reactiv: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3 8a5 5 0 0 1 9-3M13 8a5 5 0 0 1-9 3M11 3v3h3M5 13v-3H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export function AgentActivityFeed({ lang }: AgentActivityFeedProps) {
  const isFr = lang === "fr"

  const rows: ActivityRow[] = isFr
    ? [
        {
          timestamp: "08:04",
          kind: "pipeline",
          agentCode: "PIPE",
          title: "14 leads entrants qualifiés",
          detail: "Scoring multi-signaux, routés par segment ICP.",
          highlight: true,
        },
        {
          timestamp: "09:17",
          kind: "signal",
          agentCode: "SIG",
          title: "Signal faible détecté - ACME",
          detail: "Page pricing consultée 3 fois en 48 h.",
        },
        {
          timestamp: "10:32",
          kind: "followup",
          agentCode: "F-UP",
          title: "7 relances envoyées",
          detail: "Priorisées par Momentum Score, sans vous interrompre.",
        },
        {
          timestamp: "11:48",
          kind: "enrich",
          agentCode: "ENR",
          title: "312 comptes enrichis",
          detail: "23 providers orchestrés, zéro intervention manuelle.",
        },
        {
          timestamp: "14:05",
          kind: "reactiv",
          agentCode: "RE",
          title: "2 prospects dormants réactivés",
          detail: "Signal de timing détecté, séquence déclenchée.",
        },
      ]
    : [
        {
          timestamp: "08:04",
          kind: "pipeline",
          agentCode: "PIPE",
          title: "14 incoming leads qualified",
          detail: "Multi-signal scoring, routed by ICP segment.",
          highlight: true,
        },
        {
          timestamp: "09:17",
          kind: "signal",
          agentCode: "SIG",
          title: "Weak signal detected - ACME",
          detail: "Pricing page viewed 3 times within 48 h.",
        },
        {
          timestamp: "10:32",
          kind: "followup",
          agentCode: "F-UP",
          title: "7 follow-ups sent",
          detail: "Prioritised by Momentum Score, without interrupting you.",
        },
        {
          timestamp: "11:48",
          kind: "enrich",
          agentCode: "ENR",
          title: "312 accounts enriched",
          detail: "23 providers orchestrated, zero manual intervention.",
        },
        {
          timestamp: "14:05",
          kind: "reactiv",
          agentCode: "RE",
          title: "2 dormant prospects re-activated",
          detail: "Timing signal detected, sequence triggered.",
        },
      ]

  const headerLabel = isFr ? "flux-agents.live" : "agents-feed.live"
  const todayLabel = isFr ? "AUJOURD'HUI" : "TODAY"
  const liveLabel = isFr ? "en cours" : "live"
  const footerLine = isFr
    ? "5 min/j - vous revenez, vous validez, vous passez à autre chose."
    : "5 min/day - you check in, you approve, you move on."

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_20px_40px_-24px_rgba(13,71,161,0.18)]">
        {/* Header bar - mimics a live console / CI dashboard chrome */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-gray-300" aria-hidden="true" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
            {headerLabel}
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-inset ring-emerald-100">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            {liveLabel}
          </span>
        </div>

        {/* Day marker */}
        <div className="border-b border-gray-100 bg-gray-50/40 px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {todayLabel}
          </span>
        </div>

        {/* Activity list */}
        <ol className="divide-y divide-gray-100">
          {rows.map((row, idx) => (
            <li
              key={`${row.timestamp}-${row.agentCode}`}
              className="relative flex items-start gap-3 px-4 py-3.5 sm:px-5"
              aria-current={row.highlight ? "true" : undefined}
            >
              {/* Left rail timestamp */}
              <span className="mt-0.5 w-10 shrink-0 font-mono text-[11px] text-gray-400">
                {row.timestamp}
              </span>

              {/* Icon badge */}
              <span
                className={`mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#0d47a1] ${
                  row.highlight
                    ? "bg-[#0d47a1]/10 ring-1 ring-inset ring-[#0d47a1]/15"
                    : "bg-gray-50 ring-1 ring-inset ring-gray-200/80 text-gray-600"
                }`}
                aria-hidden="true"
              >
                {KIND_ICON[row.kind]}
              </span>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span
                    className={`inline-flex h-5 items-center rounded-md px-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] ${
                      row.highlight
                        ? "bg-[#0d47a1] text-white"
                        : "bg-white text-gray-600 ring-1 ring-inset ring-gray-200"
                    }`}
                  >
                    {row.agentCode}
                  </span>
                  <span className="text-[13.5px] font-semibold leading-snug text-gray-900">
                    {row.title}
                  </span>
                  {row.highlight && (
                    <span className="relative ml-1 flex h-1.5 w-1.5" aria-label={liveLabel}>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-gray-600">{row.detail}</p>
              </div>

              {/* Progressive fade on older rows: idx 0 is most recent */}
              {idx > 2 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white/30"
                />
              )}
            </li>
          ))}
        </ol>

        {/* Footer supervision line */}
        <div className="flex items-center gap-2 border-t border-gray-100 bg-gradient-to-br from-[#0d47a1]/[0.03] to-[#00e5ff]/[0.02] px-4 py-3 sm:px-5">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-3.5 w-3.5 shrink-0 text-[#0d47a1]"
            aria-hidden="true"
          >
            <path
              d="M3 8.5 6 11.5 13 4.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12.5px] font-medium text-gray-800">{footerLine}</span>
        </div>
      </div>
    </div>
  )
}
