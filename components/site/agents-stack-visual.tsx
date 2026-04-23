import type { ReactNode } from "react"

/**
 * AgentsStackVisual - Section 4 (Pilier Autonome) replacement for the
 * pilier-autonome-<lang>.png raster image.
 *
 * Renders a minimal "console" panel: 4 internal agents stacked vertically,
 * each with a status dot + role label + current mission line. Below, a
 * supervision summary row mirrors the copy.autonome.closing narrative.
 *
 * Design decisions (frontend-design arbitrage, skill 2026-04-23):
 * - No raster image, pure Tailwind + inline SVG. Retina-safe, SEO-readable.
 * - Restrained palette: brand blue for active states, neutral grays elsewhere.
 * - Status pulse via CSS keyframes (no JS runtime).
 * - Typography: font-mono on agent "role" badges for subtle tech register
 *   (Linear / Vercel dev-tool playbook).
 */

type AgentStatus = "active" | "idle"

type AgentRow = {
  role: string // Short badge text (e.g. "PIPELINE")
  name: string // Agent display name
  mission: string // One-line current mission
  status: AgentStatus
}

interface AgentsStackVisualProps {
  lang: "fr" | "en"
}

function StatusDot({ status }: { status: AgentStatus }) {
  if (status === "active") {
    return (
      <span className="relative flex h-2 w-2 shrink-0" aria-label="active">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
    )
  }
  return (
    <span
      aria-label="idle"
      className="h-2 w-2 shrink-0 rounded-full border border-gray-300 bg-white"
    />
  )
}

function PanelChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.08)]">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/60 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
          supervision.console
        </span>
      </div>
      {children}
    </div>
  )
}

export function AgentsStackVisual({ lang }: AgentsStackVisualProps) {
  const isFr = lang === "fr"

  const rows: AgentRow[] = isFr
    ? [
        {
          role: "PIPELINE",
          name: "Agent Pipeline",
          mission: "Qualification de 14 nouveaux leads entrants",
          status: "active",
        },
        {
          role: "RELANCES",
          name: "Agent Relances",
          mission: "7 deals sans activité depuis 6 jours, priorisés",
          status: "active",
        },
        {
          role: "SIGNAUX",
          name: "Agent Signaux faibles",
          mission: "Surveille 312 comptes, 3 refroidissent",
          status: "active",
        },
        {
          role: "REACTIV.",
          name: "Agent Réactivation",
          mission: "En attente : prochain signal de timing",
          status: "idle",
        },
      ]
    : [
        {
          role: "PIPELINE",
          name: "Pipeline Agent",
          mission: "Qualifying 14 incoming leads",
          status: "active",
        },
        {
          role: "FOLLOW-UP",
          name: "Follow-up Agent",
          mission: "7 deals idle for 6+ days, prioritised",
          status: "active",
        },
        {
          role: "SIGNALS",
          name: "Weak-signal Agent",
          mission: "Watching 312 accounts, 3 cooling",
          status: "active",
        },
        {
          role: "REACTIV.",
          name: "Re-activation Agent",
          mission: "Idle: waiting for next timing signal",
          status: "idle",
        },
      ]

  const supervisionLine = isFr
    ? "5 min/j - vous validez ce qui requiert votre attention"
    : "5 min/day - you validate what needs your attention"

  const approvedLabel = isFr ? "APPROUVÉ" : "APPROVED"
  const pendingLabel = isFr ? "EN ATTENTE" : "PENDING"

  return (
    <div aria-hidden="true" className="w-full">
      <PanelChrome>
        <ul className="divide-y divide-gray-100">
          {rows.map((row) => (
            <li
              key={row.name}
              className="flex items-start gap-4 px-4 py-4 sm:px-5 sm:py-4"
            >
              <div className="mt-1.5">
                <StatusDot status={row.status} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0d47a1]">
                    {row.role}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {row.name}
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
                  {row.mission}
                </p>
              </div>

              <span
                className={`hidden shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:inline-block ${
                  row.status === "active"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-100"
                    : "bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-200"
                }`}
              >
                {row.status === "active" ? approvedLabel : pendingLabel}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-100 bg-gradient-to-br from-[#0d47a1]/[0.03] to-[#00e5ff]/[0.02] px-4 py-3 sm:px-5">
          <p className="flex items-center gap-2 text-[12px] text-gray-600">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 text-[#0d47a1]"
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
            <span className="font-medium text-gray-800">{supervisionLine}</span>
          </p>
        </div>
      </PanelChrome>
    </div>
  )
}
