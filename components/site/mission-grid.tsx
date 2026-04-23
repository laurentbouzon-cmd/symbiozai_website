interface MissionItem {
  name: string
  description: string
  hitl?: "green" | "orange" | "red" | "varies"
}

interface MissionCategoryProps {
  title: string
  subtitle?: string
  missions: MissionItem[]
}

/**
 * MissionGrid: grid of MCP missions per category.
 * Each mission is a monospace pill + short description.
 * Optional HITL color dot at the end.
 */
export function MissionGrid({ title, subtitle, missions }: MissionCategoryProps) {
  return (
    <div className="mb-12 last:mb-0">
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-gray-200 pb-3">
        <h3 className="text-xl font-semibold text-gray-900 md:text-2xl">{title}</h3>
        {subtitle && (
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500">{subtitle}</span>
        )}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {missions.map((mission) => (
          <li
            key={mission.name}
            className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:bg-gray-50/80"
          >
            <div className="flex-1">
              <code className="inline-block rounded bg-gray-900 px-2 py-0.5 font-mono text-xs text-white">
                {mission.name}
              </code>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{mission.description}</p>
            </div>
            {mission.hitl && <HITLDot hitl={mission.hitl} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

function HITLDot({ hitl }: { hitl: "green" | "orange" | "red" | "varies" }) {
  const config = {
    green: { color: "bg-emerald-500", label: "Green" },
    orange: { color: "bg-amber-500", label: "Orange" },
    red: { color: "bg-rose-500", label: "Red" },
    varies: { color: "bg-gray-400", label: "Varies" },
  }[hitl]

  return (
    <span
      className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-600"
      aria-label={`HITL class: ${config.label}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.color}`} aria-hidden="true" />
      {config.label}
    </span>
  )
}
