import type { ReactElement } from "react"

/**
 * WrapFirstArchitecture - native replacement for /mcp Section 04 (wrap-first)
 *
 * Replaces /images/pivot-mcp/architecture-diagram-wrap-first.png. Same pattern
 * applied on home (commit f18998a) by frontend-design skill: native SVG +
 * Tailwind, no raster, dev-tools premium register.
 *
 * Concept (frontend-design arbitrage 2026-04-23):
 * - Left column (lg+): a compact "providers catalog" grouped by the 6 layers
 *   already listed in copy. Register: a dependency/registry listing familiar
 *   to the technical ICP (Clay providers page, Stripe integrations catalog,
 *   Vercel integrations). Every provider is a mono pill. Breadth visible at
 *   a glance, depth scannable by layer.
 * - Right column (lg+): a single MCP endpoint hub card stating "1 endpoint -
 *   2 MCP calls - 23 providers" - the inversion of cognitive load that the
 *   copy claims verbatim.
 * - SVG connector layer converges the 6 layers to the hub. Calm brand
 *   gradient, no animation - dev-tool register (Linear / Vercel): considered,
 *   no dopamine motion.
 * - Mobile: stacked layout (providers block over endpoint card), connectors
 *   hidden via lg:block on the SVG.
 *
 * Design invariants:
 * - Palette strictly brand blue + neutrals + emerald (live dot only). No new
 *   accent introduced.
 * - Typography: font-mono on layer codes, provider pills, endpoint stats.
 *   Sans semibold on hub name.
 * - Card chrome aligned with site-wide YC-grade style
 *   (rounded-2xl border-gray-200 + subtle brand-tinted shadow).
 * - Lang-aware (FR / EN).
 * - aria-hidden on decorative SVG; semantic <ul> for providers preserved.
 */

interface WrapFirstArchitectureProps {
  lang: "fr" | "en"
}

type LayerCode = "enrich_contact" | "enrich_company" | "intent" | "comms" | "social" | "registry"

interface Layer {
  code: LayerCode
  tag: string
  providers: readonly string[]
}

const LAYERS_EN: readonly Layer[] = [
  {
    code: "enrich_contact",
    tag: "Contact enrichment",
    providers: ["Apollo", "BrightData", "Hunter", "Clearbit", "Lusha"],
  },
  {
    code: "enrich_company",
    tag: "Company enrichment",
    providers: ["Crunchbase", "Pappers", "INSEE", "Clearbit", "BrightData"],
  },
  {
    code: "intent",
    tag: "Intent signals",
    providers: ["6sense", "Bombora", "Funding data"],
  },
  {
    code: "comms",
    tag: "Communication",
    providers: ["Unipile"],
  },
  {
    code: "social",
    tag: "Social",
    providers: ["LinkedIn"],
  },
  {
    code: "registry",
    tag: "Registry",
    providers: ["Pappers (FR)", "INSEE (FR)", "Crunchbase"],
  },
] as const

const LAYERS_FR: readonly Layer[] = [
  {
    code: "enrich_contact",
    tag: "Enrichissement contact",
    providers: ["Apollo", "BrightData", "Hunter", "Clearbit", "Lusha"],
  },
  {
    code: "enrich_company",
    tag: "Enrichissement société",
    providers: ["Crunchbase", "Pappers", "INSEE", "Clearbit", "BrightData"],
  },
  {
    code: "intent",
    tag: "Signaux d'intention",
    providers: ["6sense", "Bombora", "Données levées"],
  },
  {
    code: "comms",
    tag: "Communication",
    providers: ["Unipile"],
  },
  {
    code: "social",
    tag: "Social",
    providers: ["LinkedIn"],
  },
  {
    code: "registry",
    tag: "Registre",
    providers: ["Pappers (FR)", "INSEE (FR)", "Crunchbase"],
  },
] as const

const LAYER_ICON: Record<LayerCode, ReactElement> = {
  enrich_contact: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 13c.8-2.2 2.8-3.5 5-3.5s4.2 1.3 5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  enrich_company: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 13V5l5-2.5L13 5v8M3 13h10M6 13V9h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  intent: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M2 8c2-4 4-4 6 0s4 4 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  comms: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 4h10v7H6l-3 2.5V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="5" cy="5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="11" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 6.5 7.5 9.5M9.5 6.5 8.5 9.5M6.5 5h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  registry: (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 3h10v10H3z M3 7h10 M3 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
}

export function WrapFirstArchitecture({ lang }: WrapFirstArchitectureProps) {
  const isFr = lang === "fr"
  const layers = isFr ? LAYERS_FR : LAYERS_EN

  const sourceLabel = isFr ? "SOURCES DE DONNEES" : "DATA SOURCES"
  const mcpLabel = isFr ? "ENDPOINT MCP" : "MCP ENDPOINT"
  const hubName = isFr ? "SymbiozAI MCP server" : "SymbiozAI MCP server"
  const endpointSubtitle = isFr ? "api.symbioz.ai/mcp" : "api.symbioz.ai/mcp"
  const statsLabels = {
    endpoint: isFr ? "endpoint" : "endpoint",
    calls: isFr ? "missions enrich." : "enrich. missions",
    providers: isFr ? "providers" : "providers",
  }
  const calloutLabel = isFr
    ? "enrich_contact · enrich_company"
    : "enrich_contact · enrich_company"

  return (
    <div className="w-full">
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-stretch lg:gap-0">
        {/* LEFT - providers catalog */}
        <div className="relative z-10 lg:pr-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
            {sourceLabel}
          </p>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <ul className="divide-y divide-gray-100">
              {layers.map((layer) => (
                <li key={layer.code} className="px-4 py-3.5 sm:px-5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
                    <span
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-50 text-[#0d47a1] ring-1 ring-inset ring-gray-200/80"
                      aria-hidden="true"
                    >
                      {LAYER_ICON[layer.code]}
                    </span>
                    <code className="inline-block rounded bg-gray-900 px-2 py-0.5 font-mono text-[10.5px] text-white">
                      {layer.code}
                    </code>
                    <span className="text-[12.5px] font-medium text-gray-700">
                      {layer.tag}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-8">
                    {layer.providers.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-white px-2 py-0.5 font-mono text-[10.5px] text-gray-700"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SVG connector layer - lg+ only, behind cards. preserveAspectRatio=
            "none" is required: curve endpoints must land at the left-card and
            hub x-coordinates regardless of grid ratio. Keeping halos in SVG
            would turn them into stretched ellipses; they are rendered below
            as absolute rounded CSS divs so they stay pixel-perfect circles. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <defs>
            <linearGradient id="wrap-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0d47a1" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* 6 curves from approximated layer y-positions to hub center (330, 200). */}
          {[42, 100, 160, 220, 280, 340].map((y, i) => (
            <path
              key={i}
              d={`M 210 ${y} C 260 ${y}, 280 200, 330 200`}
              fill="none"
              stroke="url(#wrap-line-gradient)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {/* RIGHT - MCP endpoint hub */}
        <div className="relative z-10 flex lg:pl-12">
          <div className="relative mx-auto flex w-full max-w-sm flex-col gap-4 self-center">
            {/* Halos - absolute CSS circles pinned behind the hub card so they
                stay perfectly round regardless of grid ratio (the SVG layer
                uses preserveAspectRatio="none" for correct curve endpoints). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d47a1]/[0.06] lg:block"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d47a1]/[0.12] lg:block"
            />
            <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
              {mcpLabel}
            </p>

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04),0_16px_40px_-18px_rgba(13,71,161,0.22)]">
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
                <p className="mt-2 text-base font-semibold leading-tight">{hubName}</p>
                <p className="mt-1 font-mono text-[11px] text-white/60">{endpointSubtitle}</p>
              </div>

              <dl className="grid grid-cols-3 divide-x divide-gray-100">
                <div className="px-2 py-4 text-center">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                    {statsLabels.endpoint}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-950">1</dd>
                </div>
                <div className="px-2 py-4 text-center">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                    {statsLabels.calls}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-950">2</dd>
                </div>
                <div className="px-2 py-4 text-center">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
                    {statsLabels.providers}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-950">23</dd>
                </div>
              </dl>

              <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-3">
                <p className="font-mono text-[10.5px] text-gray-600">
                  <span className="text-[#0d47a1]">{"> "}</span>
                  {calloutLabel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
