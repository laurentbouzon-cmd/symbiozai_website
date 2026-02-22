"use client"

import { useState, useEffect } from "react"

type SystemInfoState = {
  timestamp: string
  browser: {
    userAgent: string
    language: string
    platform: string
    cookiesEnabled: boolean
    onLine: boolean
    screenSize: string
    pixelRatio: number
    timeZone: string
  }
  environment: {
    nodeEnv: string
    serverCheckedVars?: {
      hasNotionApiKey: boolean
      hasNotionDatabaseId: boolean
      hasResendApiKey: boolean
      hasEmailFrom: boolean
      hasEmailReplyTo: boolean
    }
  }
  performance?: {
    memory?: {
      jsHeapSizeLimit: string
      totalJSHeapSize: string
      usedJSHeapSize: string
    }
    navigation?: {
      type: string
      redirectCount: number
    }
  }
}

interface UseSystemInfoReturn {
  systemInfo: SystemInfoState | null
  loading: boolean
  error: string | null
}

/**
 * Hook to collect system information
 * @returns {Object} System information state, loading state, and error state
 */
export function useSystemInfo(): UseSystemInfoReturn {
  const [systemInfo, setSystemInfo] = useState<SystemInfoState | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Collect system information
    const collectSystemInfo = async () => {
      try {
        // Format bytes utility function
        const formatBytes = (bytes: number, decimals = 2): string => {
          if (!bytes) return "0 Bytes"
          const k = 1024
          const dm = decimals < 0 ? 0 : decimals
          const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
          const i = Math.floor(Math.log(bytes) / Math.log(k))
          return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        }

        // Get navigation type as text
        const getNavigationType = (type: number): string => {
          const types: Record<number, string> = {
            0: "Normal navigation",
            1: "Reload navigation",
            2: "Back/forward navigation",
            255: "Undefined navigation",
          }
          return types[type] || `Unknown type (${type})`
        }

        // Collect information
        const info: SystemInfoState = {
          timestamp: new Date().toISOString(),
          browser: {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            pixelRatio: window.devicePixelRatio,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          environment: {
            nodeEnv: process.env.NODE_ENV || "unknown",
          },
        }

        // Fetch env vars from server API
        try {
          const response = await fetch("/api/env-check")
          if (response.ok) {
            const data = await response.json()
            info.environment.serverCheckedVars = data.status
          }
        } catch (apiError) {
          console.error("Error fetching env status:", apiError)
        }

        // Add performance info if available
        if (window.performance) {
          info.performance = {}

          // Check for memory info
          if ((window.performance as any).memory) {
            const memory = (window.performance as any).memory
            info.performance.memory = {
              jsHeapSizeLimit: formatBytes(memory.jsHeapSizeLimit),
              totalJSHeapSize: formatBytes(memory.totalJSHeapSize),
              usedJSHeapSize: formatBytes(memory.usedJSHeapSize),
            }
          }

          // Check for navigation info
          if (window.performance.navigation) {
            const navigation = window.performance.navigation
            info.performance.navigation = {
              redirectCount: navigation.redirectCount,
              type: getNavigationType(navigation.type),
            }
          }
        }

        setSystemInfo(info)
      } catch (err) {
        console.error("Error collecting system info:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    // Simulate a delay for a better user experience
    setTimeout(() => {
      collectSystemInfo()
    }, 500)

    // Cleanup function
    return () => {
      // No cleanup needed currently
    }
  }, [])

  return { systemInfo, loading, error }
}
