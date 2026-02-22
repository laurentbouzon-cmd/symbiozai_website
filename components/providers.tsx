"use client"

import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Ici, nous pourrons ajouter des providers comme ThemeProvider, LocaleProvider, etc. */}
      {children}
    </>
  )
}
