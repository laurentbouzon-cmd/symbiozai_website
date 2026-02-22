"use client"

type StatusType = "success" | "warning" | "error" | "info" | "loading"

interface StatusIndicatorProps {
  status: StatusType
  label: string
  description?: string
}

export function StatusIndicator({ status, label, description }: StatusIndicatorProps) {
  const colors = {
    success: {
      bg: "bg-green-500",
      text: "text-green-600",
    },
    warning: {
      bg: "bg-yellow-500",
      text: "text-yellow-600",
    },
    error: {
      bg: "bg-red-500",
      text: "text-red-600",
    },
    info: {
      bg: "bg-blue-500",
      text: "text-blue-600",
    },
    loading: {
      bg: "bg-gray-300",
      text: "text-gray-600",
    },
  }

  return (
    <div className="flex items-center">
      {status === "loading" ? (
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-700 mr-2"></div>
      ) : (
        <div className={`w-3 h-3 ${colors[status].bg} rounded-full mr-2`}></div>
      )}
      <span className={`font-medium ${colors[status].text}`}>{label}</span>
      {description && <span className="ml-2 text-sm text-gray-500">{description}</span>}
    </div>
  )
}
