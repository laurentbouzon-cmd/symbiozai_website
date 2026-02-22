"use client"

import {
  Zap,
  MessageSquare,
  BarChart3,
  Database,
  Target,
  RefreshCw,
  Users,
  FileText,
  Calendar,
  Bell,
  Chrome,
  Bot,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

type IconType =
  | "zap"
  | "message"
  | "chart"
  | "database"
  | "target"
  | "refresh"
  | "users"
  | "file"
  | "calendar"
  | "bell"
  | "chrome"
  | "bot"
  | "sparkles"

interface GlassIconProps {
  type: IconType
  size?: number
}

const iconMap: Record<IconType, LucideIcon> = {
  zap: Zap,
  message: MessageSquare,
  chart: BarChart3,
  database: Database,
  target: Target,
  refresh: RefreshCw,
  users: Users,
  file: FileText,
  calendar: Calendar,
  bell: Bell,
  chrome: Chrome,
  bot: Bot,
  sparkles: Sparkles,
}

const colorMap: Record<IconType, { bg: string; icon: string; glow: string }> = {
  zap: { bg: "from-amber-400/80 to-orange-500/80", icon: "#fff", glow: "shadow-orange-400/40" },
  message: { bg: "from-green-400/80 to-emerald-500/80", icon: "#fff", glow: "shadow-emerald-400/40" },
  chart: { bg: "from-violet-400/80 to-purple-500/80", icon: "#fff", glow: "shadow-purple-400/40" },
  database: { bg: "from-blue-400/80 to-indigo-500/80", icon: "#fff", glow: "shadow-indigo-400/40" },
  target: { bg: "from-rose-400/80 to-pink-500/80", icon: "#fff", glow: "shadow-pink-400/40" },
  refresh: { bg: "from-cyan-400/80 to-teal-500/80", icon: "#fff", glow: "shadow-teal-400/40" },
  users: { bg: "from-sky-400/80 to-blue-500/80", icon: "#fff", glow: "shadow-blue-400/40" },
  file: { bg: "from-slate-400/80 to-gray-500/80", icon: "#fff", glow: "shadow-gray-400/40" },
  calendar: { bg: "from-red-400/80 to-rose-500/80", icon: "#fff", glow: "shadow-rose-400/40" },
  bell: { bg: "from-yellow-400/80 to-amber-500/80", icon: "#fff", glow: "shadow-amber-400/40" },
  chrome: { bg: "from-fuchsia-400/80 to-purple-500/80", icon: "#fff", glow: "shadow-purple-400/40" },
  bot: { bg: "from-indigo-400/80 to-blue-500/80", icon: "#fff", glow: "shadow-blue-400/40" },
  sparkles: { bg: "from-pink-400/80 to-rose-500/80", icon: "#fff", glow: "shadow-rose-400/40" },
}

export function GlassIcon({ type, size = 48 }: GlassIconProps) {
  const Icon = iconMap[type]
  const colors = colorMap[type]
  const iconSize = size * 0.5

  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg ${colors.glow}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Effet de reflet en haut - style Apple Liquid Glass */}
      <div
        className="absolute inset-x-2 top-1 h-[40%] rounded-t-xl bg-gradient-to-b from-white/50 to-transparent"
        style={{ borderRadius: "10px 10px 50% 50%" }}
      />

      {/* Bordure intérieure subtile */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Icône */}
      <Icon
        style={{ width: iconSize, height: iconSize }}
        color={colors.icon}
        strokeWidth={2}
        className="relative z-10 drop-shadow-sm"
      />
    </div>
  )
}
