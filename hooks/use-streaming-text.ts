"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseStreamingTextOptions {
  text: string
  speed?: number
  startDelay?: number
  enabled?: boolean
}

interface UseStreamingTextReturn {
  displayedText: string
  isStreaming: boolean
  isComplete: boolean
}

export function useStreamingText({
  text,
  speed = 50,
  startDelay = 0,
  enabled = false,
}: UseStreamingTextOptions): UseStreamingTextReturn {
  const [displayedText, setDisplayedText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const wordsRef = useRef<string[]>([])
  const indexRef = useRef(0)

  const reset = useCallback(() => {
    setDisplayedText("")
    setIsStreaming(false)
    setIsComplete(false)
    wordsRef.current = []
    indexRef.current = 0
  }, [])

  useEffect(() => {
    if (!enabled || !text) {
      reset()
      return
    }

    const words = text.split(" ")
    wordsRef.current = words
    indexRef.current = 0
    setDisplayedText("")
    setIsComplete(false)

    const delayTimer = setTimeout(() => {
      setIsStreaming(true)

      const tick = () => {
        if (indexRef.current >= wordsRef.current.length) {
          setIsStreaming(false)
          setIsComplete(true)
          return
        }

        indexRef.current += 1
        setDisplayedText(wordsRef.current.slice(0, indexRef.current).join(" "))

        const jitter = speed * (0.8 + Math.random() * 0.4)
        streamTimer = setTimeout(tick, jitter)
      }

      let streamTimer: ReturnType<typeof setTimeout> | undefined
      tick()

      cleanupStream = () => {
        if (streamTimer !== undefined) {
          clearTimeout(streamTimer)
        }
      }
    }, startDelay)

    let cleanupStream: (() => void) | undefined

    return () => {
      clearTimeout(delayTimer)
      if (cleanupStream) {
        cleanupStream()
      }
      reset()
    }
  }, [text, speed, startDelay, enabled, reset])

  return { displayedText, isStreaming, isComplete }
}
