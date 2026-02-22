"use client"

import type { ReactNode } from "react"
import Link from "next/link"

interface DiagnosticLayoutProps {
  title: string
  description: string
  loading: boolean
  error: string | null
  backLink: string
  backLinkText: string
  refreshAction?: () => void
  children: ReactNode
}

export function DiagnosticLayout({
  title,
  description,
  loading,
  error,
  backLink,
  backLinkText,
  refreshAction,
  children,
}: DiagnosticLayoutProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          <span className="ml-3 text-lg">Loading diagnostic information...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">{children}</div>
      )}

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={backLink} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {backLinkText}
        </Link>
        {refreshAction && (
          <button onClick={refreshAction} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            Refresh
          </button>
        )}
      </div>
    </div>
  )
}
