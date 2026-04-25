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
 *
 * Mobile fix (2026-04-25):
 * - Below lg (1024px), the desktop horizontal grid breaks the convergence
 *   metaphor: pills sit at 176px hugging the left edge while the SVG layer
 *   is hidden, so connections to the hub are lost.
 * - Mobile layout is now an explicit top-to-bottom stack:
 *   eyebrow + pills (centered, narrow max-w) -> vertical convergence
 *   connector (SVG) -> hub card -> KPI grid. Reproduces the L->R reading
 *   order of the desktop layout in vertical form.
 * - Desktop layout (>= lg) is preserved bit-for-bit.
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
      <div className="relative grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-0">
        {/* Left column - client agent pills.
            Mobile: centered column, pills stretched to a readable max-w-xs.
            Desktop (lg+): unchanged - left-aligned pills with min-w 11rem. */}
        <div className="lg:col-span-5">
          <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500 lg:text-left">
            {clientsEyebrow}
          </p>
          <ul className="mx-auto flex max-w-xs flex-col gap-2.5 lg:mx-0 lg:max-w-none">
            {AGENTS.map((agent, idx) => (
              <li
                key={agent}
                className="relative z-10 inline-flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_4px_12px_-4px_rgba(13,71,161,0.18)] lg:w-auto lg:self-start"
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

        {/* Mobile-only vertical convergence connector.
            6 curves fanning from spread-out top points to a single bottom
            point - mirrors the desktop horizontal convergence in vertical
            form. Hidden on lg+ where the absolute SVG layer takes over. */}
        <div
          aria-hidden="true"
          className="relative -my-1 flex h-12 w-full items-center justify-center lg:hidden"
        >
          <svg
            viewBox="0 0 240 48"
            preserveAspectRatio="none"
            className="h-full w-full max-w-xs"
          >
            <defs>
              <linearGradient
                id="mcp-line-gradient-mobile"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0d47a1" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            {/* 6 top x-positions spread across the pill column width,
                converging to (120, 48) - center-bottom of the connector. */}
            {[20, 60, 100, 140, 180, 220].map((x, i) => (
              <path
                key={i}
                d={`M ${x} 0 C ${x} 24, 120 24, 120 48`}
                fill="none"
                stroke="url(#mcp-line-gradient-mobile)"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            ))}
          </svg>
        </div>

        {/* SVG connector layer (desktop) - only on lg+. Sits behind pills and hub.
            preserveAspectRatio="none" is required so curve endpoints land at
            the pill x (165) and hub x (340) regardless of grid ratio. Halos
            are rendered below as absolute CSS circles to stay perfectly round. */}
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
        </svg>

        {/* Right column - MCP endpoint hub */}
        <div className="relative z-10 lg:col-span-7 lg:pl-16">
          <div className="relative mx-auto max-w-sm">
            {/* Halos - absolute CSS circles pinned behind the hub card so they
                stay perfectly round regardless of grid ratio. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[112px] w-[112px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d47a1]/[0.06] lg:block"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d47a1]/[0.12] lg:block"
            />
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_12px_32px_-16px_rgba(13,71,161,0.25)]">
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
    </div>
  )
}
