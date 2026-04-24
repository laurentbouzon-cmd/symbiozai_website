import type { ReactElement } from "react"

/**
 * AgentCompatibilityStrip - native replacement for logo-strip-agents.png
 *
 * Replaces the raster logo strip on /for-sales-teams S7 (agents). Same
 * discipline as WrapFirstArchitecture (/mcp) and AgentActivityFeed (home):
 * native, no raster, palette-strict.
 *
 * Concept (frontend-design arbitrage 2026-04-23):
 * - Text-only badges for MCP-compatible agents. Reason: we do not own the
 *   trademarks and a logo strip quickly reads as "fake customer logos". A
 *   mono typography treatment signals "dev registry listing" in the same
 *   register as /mcp WrapFirstArchitecture providers column.
 * - Each badge: mono lowercase agent ID + small MCP dot. Pills on rounded
 *   card ring. Alignment: centered, auto-flow on small screens.
 * - Center anchor: `mcp/stdio` pill as the protocol label. Agents radiate
 *   from this anchor as peer clients.
 *
 * Design invariants:
 * - Palette strictly brand blue + neutrals + emerald (online dot). No new
 *   color token.
 * - Typography: font-mono on everything. No sans on purpose - this component
 *   is a technical listing, not a marketing bar.
 * - Card chrome consistent with site-wide YC style.
 * - Lang-aware (FR / EN) for ARIA labels.
 */

interface AgentCompatibilityStripProps {
  lang: "fr" | "en"
  ariaLabel: string
}

interface AgentBadge {
  id: string
  label: string
  status: "online" | "soon"
}

const AGENTS: readonly AgentBadge[] = [
  { id: "claude-code", label: "claude-code", status: "online" },
  { id: "cursor", label: "cursor", status: "online" },
  { id: "windsurf", label: "windsurf", status: "online" },
  { id: "cline", label: "cline", status: "online" },
  { id: "zed", label: "zed", status: "online" },
  { id: "continue", label: "continue", status: "soon" },
  { id: "custom", label: "custom mcp-client", status: "online" },
] as const

export function AgentCompatibilityStrip({
  lang,
  ariaLabel,
}: AgentCompatibilityStripProps): ReactElement {
  const soonLabel = lang === "fr" ? "bientôt" : "soon"
  const protocolLabel = "mcp/stdio"
  const hintLabel = lang === "fr" ? "clients compatibles" : "compatible clients"

  return (
    <div
      className="mx-auto max-w-4xl rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_20px_50px_-28px_rgba(13,71,161,0.18)] md:p-8"
      aria-label={ariaLabel}
    >
      {/* Protocol anchor */}
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#0d47a1]/20 bg-[#0d47a1]/[0.05] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0d47a1]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0d47a1]" aria-hidden="true" />
          {protocolLabel}
        </span>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-gray-400">
          {hintLabel}
        </p>
      </div>

      {/* Separator */}
      <div className="my-6 flex justify-center" aria-hidden="true">
        <span className="h-6 w-px bg-gradient-to-b from-[#0d47a1]/20 to-transparent" />
      </div>

      {/* Agents grid */}
      <ul className="flex flex-wrap items-center justify-center gap-2.5">
        {AGENTS.map((agent) => (
          <li key={agent.id}>
            <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-1.5 font-mono text-[12px] text-gray-800 transition-colors duration-150 hover:border-[#0d47a1]/30 hover:bg-white">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  agent.status === "online" ? "bg-emerald-500" : "bg-gray-300"
                }`}
                aria-hidden="true"
              />
              <span>{agent.label}</span>
              {agent.status === "soon" && (
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-gray-500">
                  {soonLabel}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
