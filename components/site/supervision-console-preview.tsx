import type { ReactElement } from "react"

/**
 * SupervisionConsolePreview - native replacement for supervision-console-mockup.png
 *
 * Replaces the raster PNG on /for-sales-teams S2 (demo). Same pattern applied
 * on /mcp (WrapFirstArchitecture, commit f9cc713) and home (AgentActivityFeed,
 * commit f18998a): native SVG + Tailwind, no raster asset.
 *
 * Concept (frontend-design arbitrage 2026-04-23):
 * - Register: Head of Sales / CRO boardroom-ready (Clari / Attio / Linear
 *   inbox), NOT dev-tools. Contrast intentional with /mcp (providers catalog,
 *   code-blocks).
 * - Visual anchor: an inbox-style supervision queue, mirroring the S2 copy
 *   verbatim - "file de 4 a 6 decisions", "Deux emails", "Un changement
 *   d'etape", "Un contact a valider". 5 items rendered, each is a concrete
 *   instance of what the Head of Sales will resolve in the morning queue.
 * - First item rendered EXPANDED with the three actions stated verbatim in
 *   copy: Approve / Edit / Block ("Vous approuvez, vous editez, vous
 *   bloquez"). The other 4 stay collapsed in list form (summary + HITL tone
 *   dot + mono timestamp).
 * - Chrome: window-style header with breadcrumb `supervision / inbox`, live
 *   pulse dot (emerald, subtle), date indicator. Footer summary pill
 *   "5 decisions - 6 min". No fake app chrome (no traffic-lights OSX macOS),
 *   kept close to editorial mockup, not fake product screenshot.
 *
 * Design invariants:
 * - Palette strictly brand blue + neutrals + emerald (live/Green) + amber
 *   (Orange HITL). Red intentionally omitted (copy describes no Red decision
 *   on a typical day).
 * - Typography: font-mono on timestamps, queue counter, metadata chips. Sans
 *   semibold on subjects and actions.
 * - Card chrome aligned with site-wide YC-grade style (rounded-2xl,
 *   border-gray-200, brand-tinted shadow).
 * - Lang-aware (FR / EN).
 * - aria-hidden on decorative icons. semantic list for queue items.
 * - No animation loop (respects reduced-motion); only a single subtle pulse
 *   on the live dot (tailwind animate-pulse scoped to 1 element).
 */

interface SupervisionConsolePreviewProps {
  lang: "fr" | "en"
}

type HITLTone = "orange" | "green"

interface QueueItem {
  id: string
  timestamp: string
  tone: HITLTone
  toneLabel: string
  kind: string
  subject: string
  detail: string
}

interface Copy {
  headerBreadcrumb: string
  headerLive: string
  headerDate: string
  queueCounter: (n: number) => string
  timeToClear: string
  actionApprove: string
  actionEdit: string
  actionBlock: string
  thresholdBadge: string
  items: QueueItem[]
}

const COPY_EN: Copy = {
  headerBreadcrumb: "supervision / inbox",
  headerLive: "Live",
  headerDate: "Tue, Apr 23",
  queueCounter: (n) => `${n} decisions`,
  timeToClear: "~6 min to clear",
  actionApprove: "Approve",
  actionEdit: "Edit",
  actionBlock: "Block",
  thresholdBadge: "Above approval threshold",
  items: [
    {
      id: "msg_0412",
      timestamp: "07:58",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Email draft",
      subject: "Reply to Sarah Chen, VP Sales at Flowstate",
      detail:
        "Follow-up after discovery call. 4 paragraphs. Includes pricing anchor and 2 references. Drafted by agent after her LinkedIn post about Q2 expansion.",
    },
    {
      id: "msg_0413",
      timestamp: "08:02",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Email draft",
      subject: "Reply to Thomas R., CTO at Scalr (warm inbound)",
      detail:
        "Meeting request + 2 open slots. Matches ICP (Series B, 120 reps). Buying signal: demo requested twice in 14 days.",
    },
    {
      id: "stage_2891",
      timestamp: "08:04",
      tone: "green",
      toneLabel: "Green",
      kind: "Stage change",
      subject: "Acme Corp moved Discovery → Negotiation",
      detail: "Triggered by contract email reply. Deal value 48k EUR. Agent notified owner.",
    },
    {
      id: "cnt_7712",
      timestamp: "08:05",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Contact validation",
      subject: "Julien Mercier, Head of RevOps at Notion EU",
      detail: "Enriched from Apollo + LinkedIn. Confidence 0.91. Add to account Notion (ID 882)?",
    },
    {
      id: "enr_4408",
      timestamp: "08:06",
      tone: "green",
      toneLabel: "Green",
      kind: "Enrichment batch",
      subject: "47 contacts enriched overnight",
      detail: "DISC profiles, company data, buying signals. Auto-merged into existing accounts.",
    },
  ],
}

const COPY_FR: Copy = {
  headerBreadcrumb: "supervision / file",
  headerLive: "Live",
  headerDate: "Mar. 23 avr.",
  queueCounter: (n) => `${n} décisions`,
  timeToClear: "≈ 6 min pour tout traiter",
  actionApprove: "Approuver",
  actionEdit: "Éditer",
  actionBlock: "Bloquer",
  thresholdBadge: "Au-dessus du seuil d'approbation",
  items: [
    {
      id: "msg_0412",
      timestamp: "07h58",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Brouillon email",
      subject: "Réponse à Sarah Chen, VP Sales chez Flowstate",
      detail:
        "Relance après call de découverte. 4 paragraphes. Ancre pricing + 2 références. Rédigé après son post LinkedIn sur l'expansion Q2.",
    },
    {
      id: "msg_0413",
      timestamp: "08h02",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Brouillon email",
      subject: "Réponse à Thomas R., CTO chez Scalr (inbound chaud)",
      detail:
        "Demande de rendez-vous + 2 créneaux ouverts. Match ICP (Série B, 120 reps). Signal d'achat : démo demandée deux fois en 14 jours.",
    },
    {
      id: "stage_2891",
      timestamp: "08h04",
      tone: "green",
      toneLabel: "Vert",
      kind: "Changement d'étape",
      subject: "Acme Corp passée de Discovery à Négociation",
      detail: "Déclenché par réponse email contrat. Valeur deal 48k EUR. Propriétaire notifié.",
    },
    {
      id: "cnt_7712",
      timestamp: "08h05",
      tone: "orange",
      toneLabel: "Orange",
      kind: "Validation contact",
      subject: "Julien Mercier, Head of RevOps chez Notion EU",
      detail: "Enrichi via Apollo + LinkedIn. Confiance 0,91. Ajouter au compte Notion (ID 882) ?",
    },
    {
      id: "enr_4408",
      timestamp: "08h06",
      tone: "green",
      toneLabel: "Vert",
      kind: "Batch d'enrichissement",
      subject: "47 contacts enrichis cette nuit",
      detail: "Profils DISC, données société, signaux d'achat. Auto-fusion dans les comptes existants.",
    },
  ],
}

const TONE_STYLES: Record<HITLTone, { dot: string; chip: string; ring: string }> = {
  orange: {
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    ring: "border-amber-200/70",
  },
  green: {
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ring: "border-emerald-200/70",
  },
}

function IconMail(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 5 8 9l5.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconStage(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M3 8h6m0 0-2-2m2 2-2 2M13 4v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconContact(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <circle cx="8" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 13c.8-2.2 2.6-3.3 4.5-3.3s3.7 1.1 4.5 3.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function IconEnrich(): ReactElement {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path d="M8 2v12M3 6l5-4 5 4M4 10l4 3 4-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function kindIcon(kindId: string): ReactElement {
  if (kindId.startsWith("msg_")) return <IconMail />
  if (kindId.startsWith("stage_")) return <IconStage />
  if (kindId.startsWith("cnt_")) return <IconContact />
  return <IconEnrich />
}

export function SupervisionConsolePreview({ lang }: SupervisionConsolePreviewProps) {
  const copy = lang === "fr" ? COPY_FR : COPY_EN
  const [featured, ...rest] = copy.items
  const featuredStyle = TONE_STYLES[featured.tone]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_30px_60px_-30px_rgba(13,71,161,0.25)]">
        {/* Window header */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/70 px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
              {copy.headerBreadcrumb}
            </p>
            <span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-700 sm:inline-flex">
              {copy.headerLive}
            </span>
          </div>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-gray-400 md:block">
            {copy.headerDate}
          </p>
        </div>

        {/* Counter strip */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-5 py-4 md:px-6">
          <p className="text-sm font-semibold tracking-tight text-gray-900">
            {copy.queueCounter(copy.items.length)}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
            {copy.timeToClear}
          </p>
        </div>

        {/* Featured expanded item */}
        <div className="border-b border-gray-100 bg-gradient-to-br from-[#0d47a1]/[0.03] via-white to-white px-5 py-5 md:px-6 md:py-6">
          <div className={`rounded-2xl border bg-white p-5 md:p-6 ${featuredStyle.ring}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${featuredStyle.dot}`} aria-hidden="true" />
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] ${featuredStyle.chip}`}
                >
                  {featured.toneLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-gray-400">
                  {kindIcon(featured.id)}
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
                    {featured.kind}
                  </span>
                </span>
              </div>
              <p className="font-mono text-[11px] tracking-wider text-gray-400">{featured.timestamp}</p>
            </div>

            <h3 className="mt-3 text-base font-semibold leading-snug text-gray-900 md:text-[17px]">
              {featured.subject}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{featured.detail}</p>

            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/60 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
              {copy.thresholdBadge}
            </p>

            {/* Actions - the verbatim triad from copy "Vous approuvez, vous editez, vous bloquez" */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0d47a1] px-3.5 py-2 text-sm font-semibold text-white shadow-sm"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {copy.actionApprove}
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M10.5 2.5 13 5 5 13H2.5v-2.5L10.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                {copy.actionEdit}
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 12 12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {copy.actionBlock}
              </button>
            </div>
          </div>
        </div>

        {/* Rest of queue - collapsed rows */}
        <ul className="divide-y divide-gray-100">
          {rest.map((item) => {
            const style = TONE_STYLES[item.tone]
            return (
              <li
                key={item.id}
                className="flex items-start gap-4 px-5 py-4 transition-colors duration-150 hover:bg-gray-50/70 md:px-6"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-gray-400">
                      {kindIcon(item.id)}
                    </span>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-gray-500">
                      {item.kind}
                    </p>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-gray-900">{item.subject}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">{item.detail}</p>
                </div>
                <p className="shrink-0 pt-1 font-mono text-[11px] tracking-wider text-gray-400">
                  {item.timestamp}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
