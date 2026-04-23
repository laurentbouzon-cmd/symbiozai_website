interface HITLClass {
  tone: "green" | "orange" | "red"
  title: string
  behavior: string
  examples: string
}

interface HITLExplainerProps {
  classes: HITLClass[]
  labelBehavior?: string
  labelExamples?: string
}

const TONE_STYLES: Record<
  HITLClass["tone"],
  { ring: string; dot: string; label: string }
> = {
  green: {
    ring: "border-emerald-200/80 bg-emerald-50/50",
    dot: "bg-emerald-500",
    label: "text-emerald-700",
  },
  orange: {
    ring: "border-amber-200/80 bg-amber-50/50",
    dot: "bg-amber-500",
    label: "text-amber-700",
  },
  red: {
    ring: "border-rose-200/80 bg-rose-50/50",
    dot: "bg-rose-500",
    label: "text-rose-700",
  },
}

/**
 * HITLExplainer — 3-column Green/Orange/Red supervision policy.
 * Used on /features and /mcp and /for-sales-teams.
 */
export function HITLExplainer({
  classes,
  labelBehavior = "Behavior",
  labelExamples = "Examples",
}: HITLExplainerProps) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {classes.map((cls) => {
        const styles = TONE_STYLES[cls.tone]
        return (
          <article
            key={cls.tone}
            className={`relative flex h-full flex-col rounded-2xl border p-6 ${styles.ring}`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className={`h-3 w-3 rounded-full ${styles.dot}`} aria-hidden="true" />
              <h3 className={`text-base font-semibold uppercase tracking-[0.12em] ${styles.label}`}>
                {cls.title}
              </h3>
            </div>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {labelBehavior}
                </dt>
                <dd className="mt-1 text-gray-800">{cls.behavior}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {labelExamples}
                </dt>
                <dd className="mt-1 text-gray-600">{cls.examples}</dd>
              </div>
            </dl>
          </article>
        )
      })}
    </div>
  )
}
