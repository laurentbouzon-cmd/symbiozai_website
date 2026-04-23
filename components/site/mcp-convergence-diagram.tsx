/**
 * McpConvergenceDiagram - Section 5 (Pilier MCP-first) replacement for the
 * pilier-mcp-first-<lang>.png raster image.
 *
 * Renders the category-rupture visual: 6 AI agent clients on the left,
 * inline SVG connectors converging to a central MCP endpoint card on the
 * right. Stats displayed in the hub: 35 missions / 23 providers / 1 endpoint.
 *
 * Design decisions (frontend-design arbitrage, skill 2026-04-23):
 * - Pure SVG + Tailwind. No JS runtime.
 * - SVG is a single absolute-positioned layer behind the DOM pills so
 *   convergence lines stay crisp at any zoom. Pills remain focusable and
 *   screen-reader-friendly for the actual list of agents.
 * - Palette: brand blue gradient for lines converging toward hub, subtle
 *   gray stroke elsewhere. No new accent introduced.
 * - Static (no animated flow). Linear/Vercel register: calm, considered,
 *   no dopamine-chasing motion loops.
 */

interface McpConvergenceDiagramProps {
  lang: "fr" | "en"
}

// The 6 agent clients that can consume SymbiozAI via MCP. Order matters for
// the SVG connector endpoints on the diagram.
const AGENTS: readonly string[] = [
  "Claude Code",
  "Cursor",
  "ChatGPT",
  "Cline",
  "Goose",
  "Continue.dev",
] as const

export function McpConvergenceDiagram({ lang }: McpConvergenceDiagramProps) {
  const isFr = lang === "fr"

  const hubLabel = isFr ? "Endpoint MCP SymbiozAI" : "SymbiozAI MCP Endpoint"
  const missionsLabel = isFr ? "missions verbales" : "verbal missions"
  const providersLabel = isFr ? "sources connectées" : "connected sources"
  const endpointLabel = isFr ? "endpoint" : "endpoint"
  const clientsEyebrow = isFr ? "VOTRE AGENT IA" : "YOUR AI AGENT"

  return (
    <div className="relative w-full">
      {/* Mobile-only: stacked vertical layout. On lg+, grid 12 cols with SVG layer. */}
      <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
        {/* Left column - client agent pills */}
        <div className="lg:col-span-5">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500 lg:text-left">
            {clientsEyebrow}
          </p>
          <ul className="flex flex-col gap-2.5">
            {AGENTS.map((agent, idx) => (
              <li
                key={agent}
                className="relative z-10 inline-flex items-center gap-3 self-start rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,71,161,0.18)]"
                style={{ minWidth: "11rem" }}
                data-idx={idx}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded border border-gray-200 bg-gray-50 font-mono text-[11px] font-semibold text-gray-700"
                >
                  {agent.charAt(0)}
                </span>
                <span className="text-sm font-medium text-gray-800">{agent}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* SVG connector layer - only on lg+. Sits behind pills and hub. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <defs>
            <linearGradient id="mcp-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d47a1" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* 6 curves from 6 pill y-positions (approximate) converging to hub center (340, 200). */}
          {[40, 95, 150, 205, 260, 315].map((y, i) => (
            <path
              key={i}
              d={`M 165 ${y} C 240 ${y}, 270 200, 340 200`}
              fill="none"
              stroke="url(#mcp-line-gradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          ))}
          {/* Hub halo */}
          <circle
            cx="340"
            cy="200"
            r="26"
            fill="#0d47a1"
            fillOpacity="0.06"
          />
          <circle
            cx="340"
            cy="200"
            r="14"
            fill="#0d47a1"
            fillOpacity="0.12"
          />
        </svg>

        {/* Right column - MCP endpoint hub */}
        <div className="relative z-10 lg:col-span-7 lg:pl-16">
          <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(13,71,161,0.25)]">
            <div className="relative bg-gradient-to-br from-[#0d47a1] to-[#1a237e] px-5 py-5 text-white">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 text-[#6ddcff]"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1.5v2.5M8 12v2.5M1.5 8h2.5M12 8h2.5M3.5 3.5l1.8 1.8M10.7 10.7l1.8 1.8M3.5 12.5l1.8-1.8M10.7 5.3l1.8-1.8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="8" r="2" fill="currentColor" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  mcp
                </span>
              </div>
              <p className="mt-2 text-base font-semibold leading-tight">{hubLabel}</p>
              <p className="mt-1 font-mono text-[11px] text-white/60">
                npx @symbiozai/mcp-setup
              </p>
            </div>

            <dl className="grid grid-cols-3 divide-x divide-gray-100">
              <div className="px-3 py-4 text-center">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  {missionsLabel}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-950">35</dd>
              </div>
              <div className="px-3 py-4 text-center">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  {providersLabel}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-950">23</dd>
              </div>
              <div className="px-3 py-4 text-center">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                  {endpointLabel}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-950">1</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
