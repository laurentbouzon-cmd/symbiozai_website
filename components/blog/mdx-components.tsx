import { Info, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react"
import type { ReactNode } from "react"
import { FAQ } from "./faq"

const CALLOUT_STYLES = {
  info: {
    bg: "bg-blue-50 border-blue-200",
    icon: <Info className="w-5 h-5 text-[#0d47a1]" />,
    title: "text-[#0d47a1]",
  },
  warning: {
    bg: "bg-orange-50 border-orange-200",
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    title: "text-orange-700",
  },
  tip: {
    bg: "bg-green-50 border-green-200",
    icon: <Lightbulb className="w-5 h-5 text-green-600" />,
    title: "text-green-700",
  },
  stat: {
    bg: "bg-violet-50 border-violet-200",
    icon: <BarChart3 className="w-5 h-5 text-violet-600" />,
    title: "text-violet-700",
  },
} as const

interface CalloutProps {
  type?: keyof typeof CALLOUT_STYLES
  children: ReactNode
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = CALLOUT_STYLES[type]

  return (
    <div className={`${styles.bg} border rounded-lg p-4 my-6 flex gap-3 not-prose`}>
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <div className={`text-sm leading-relaxed ${styles.title}`}>{children}</div>
    </div>
  )
}

interface StatHighlightProps {
  value: string
  label: string
}

export function StatHighlight({ value, label }: StatHighlightProps) {
  return (
    <div className="not-prose my-8 text-center">
      <div className="text-5xl font-bold bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

export const mdxComponents = {
  Callout,
  StatHighlight,
  FAQ,
}
