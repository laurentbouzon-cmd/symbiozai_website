/**
 * LearningTimeline - Section 6 (AI-Native + Self-learning) replacement for
 * the auto-apprenant-<lang>.png raster image.
 *
 * Renders a horizontal 3-step timeline: Day 1 / Day 30 / Day 180 (EN) or
 * Jour 1 / Jour 30 / Jour 180 (FR). Each step shows the sharpening state
 * of the system (context %, data points, signal precision). A progress
 * rail connects the 3 steps with a gradient fill.
 *
 * Design decisions (frontend-design arbitrage, skill 2026-04-23):
 * - Inline SVG rail, no raster. Retina-safe, theme-compliant.
 * - Gradient progression on the rail mirrors "the system sharpens its
 *   reads over time" - subtle visual metaphor, not literal.
 * - Palette: brand blue gradient + neutral grays. Accent emerald reserved
 *   for the "active / live" marker on the current state.
 * - Vertical stack on mobile (< md), horizontal rail on md+.
 */

interface LearningTimelineProps {
  lang: "fr" | "en"
}

type Stage = {
  dayLabel: string
  dayValue: string
  title: string
  contextPct: number // 0-100, used to size the progress bar within the card
  metrics: { label: string; value: string }[]
}

export function LearningTimeline({ lang }: LearningTimelineProps) {
  const isFr = lang === "fr"

  const stages: Stage[] = isFr
    ? [
        {
          dayLabel: "Jour",
          dayValue: "1",
          title: "Connexion",
          contextPct: 12,
          metrics: [
            { label: "Contacts", value: "0" },
            { label: "Signaux", value: "baseline" },
          ],
        },
        {
          dayLabel: "Jour",
          dayValue: "30",
          title: "Première lecture",
          contextPct: 48,
          metrics: [
            { label: "Contacts", value: "1.2k" },
            { label: "Signaux", value: "calibrés" },
          ],
        },
        {
          dayLabel: "Jour",
          dayValue: "180",
          title: "Lecture affinée",
          contextPct: 92,
          metrics: [
            { label: "Contacts", value: "7.4k" },
            { label: "Signaux", value: "précis" },
          ],
        },
      ]
    : [
        {
          dayLabel: "Day",
          dayValue: "1",
          title: "Connected",
          contextPct: 12,
          metrics: [
            { label: "Contacts", value: "0" },
            { label: "Signals", value: "baseline" },
          ],
        },
        {
          dayLabel: "Day",
          dayValue: "30",
          title: "Early reads",
          contextPct: 48,
          metrics: [
            { label: "Contacts", value: "1.2k" },
            { label: "Signals", value: "calibrated" },
          ],
        },
        {
          dayLabel: "Day",
          dayValue: "180",
          title: "Sharpened reads",
          contextPct: 92,
          metrics: [
            { label: "Contacts", value: "7.4k" },
            { label: "Signals", value: "precise" },
          ],
        },
      ]

  const contextLabel = isFr ? "contexte" : "context"

  return (
    <div className="relative w-full">
      {/* Desktop rail (md+) - absolute behind cards */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[72px] hidden md:block"
      >
        <div className="mx-[16.66%] h-px bg-gradient-to-r from-gray-200 via-[#0d47a1]/40 to-[#00e5ff]/70" />
      </div>

      <ol className="relative grid gap-6 md:grid-cols-3 md:gap-8">
        {stages.map((stage, idx) => {
          const isFinal = idx === stages.length - 1
          return (
            <li key={stage.dayValue} className="relative flex flex-col">
              {/* Step marker */}
              <div className="relative mb-4 flex items-center justify-center md:justify-start">
                <div
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white font-mono text-[11px] font-semibold transition-colors ${
                    isFinal
                      ? "border-[#0d47a1] text-[#0d47a1]"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {stage.dayValue}
                </div>
                {isFinal && (
                  <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-inset ring-emerald-100">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    {isFr ? "en cours" : "live"}
                  </span>
                )}
              </div>

              {/* Card */}
              <article className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
                  {stage.dayLabel} {stage.dayValue}
                </p>
                <h4 className="mt-1 text-base font-semibold text-gray-900">
                  {stage.title}
                </h4>

                {/* Context progress bar */}
                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
                      {contextLabel}
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-gray-900">
                      {stage.contextPct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0d47a1] to-[#00e5ff]"
                      style={{ width: `${stage.contextPct}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                  {stage.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
                        {m.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-semibold text-gray-900">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
