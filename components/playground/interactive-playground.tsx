"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { getDictionary } from "@/lib/dictionary"
import { getScenarios, type PlaygroundMessage, type ScenarioButton, type InlineChoice } from "@/lib/playground-scenarios"
import { PlaygroundHeader } from "./playground-header"
import { MessageBubble } from "./message-bubble"
import { TypingIndicator } from "./typing-indicator"
import { ScenarioButtons } from "./scenario-buttons"

type PlaygroundState = "IDLE" | "WELCOME" | "SCENARIO_PLAYING" | "AWAITING_CHOICE" | "SCENARIO_DONE" | "CTA"

interface DisplayedMessage {
  id: string
  type: "user" | "ai" | "buttons" | "inline-choices"
  text?: string
  richContent?: "table" | "deals"
  richData?: unknown
  buttons?: ScenarioButton[]
  choices?: InlineChoice[]
  streaming?: boolean
}

interface InteractivePlaygroundProps {
  lang: string
}

export function InteractivePlayground({ lang }: InteractivePlaygroundProps) {
  const dictionary = getDictionary(lang)
  const scenarios = getScenarios(lang)

  const [state, setState] = useState<PlaygroundState>("IDLE")
  const [messages, setMessages] = useState<DisplayedMessage[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [playedIds, setPlayedIds] = useState<Set<string>>(new Set())
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false)
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)
  const hasTriggeredRef = useRef(false)
  const cleanupRef = useRef<(() => void) | null>(null)
  const msgCounterRef = useRef(0)

  // Scroll inside the messages container only — never scrollIntoView (which moves the page)
  const scrollContainerToBottom = useCallback((force = false) => {
    const container = containerRef.current
    if (!container) return
    const threshold = 50
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold
    if (force || isNearBottom) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      })
    }
  }, [])

  useEffect(() => {
    scrollContainerToBottom()
  }, [messages, showTyping, scrollContainerToBottom])

  // Intersection Observer to trigger welcome
  useEffect(() => {
    const el = playgroundRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true
          observer.unobserve(el)
          triggerWelcome()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const nextMsgId = useCallback(() => {
    msgCounterRef.current += 1
    return `msg-${msgCounterRef.current}`
  }, [])

  // Build scenario choice buttons from remaining scenarios
  const getChoiceButtons = useCallback((): ScenarioButton[] => {
    return scenarios.map((s) => {
      const labels: Record<string, Record<string, { emoji: string; label: string }>> = {
        fr: {
          prospection: { emoji: "\ud83c\udfaf", label: "Trouve-moi des ESN en \u00cele-de-France" },
          recovery: { emoji: "\ud83d\udd04", label: "Deals perdus r\u00e9cup\u00e9rables" },
          crm: { emoji: "\ud83d\udcac", label: "Ajoute une note sur Pennylane" },
        },
        en: {
          prospection: { emoji: "\ud83c\udfaf", label: "Find IT firms in Paris area" },
          recovery: { emoji: "\ud83d\udd04", label: "Recoverable lost deals" },
          crm: { emoji: "\ud83d\udcac", label: "Add a note on Pennylane" },
        },
      }
      const locale = lang === "fr" ? "fr" : "en"
      const btnLabel = labels[locale]?.[s.id] ?? { emoji: "\u2753", label: s.id }
      return { id: s.id, emoji: btnLabel.emoji, label: btnLabel.label }
    })
  }, [scenarios, lang])

  const triggerWelcome = useCallback(() => {
    setState("WELCOME")
    setShowTyping(true)

    const timer = setTimeout(() => {
      setShowTyping(false)
      const welcomeMsg: DisplayedMessage = {
        id: nextMsgId(),
        type: "ai",
        text: dictionary.playground.welcome,
        streaming: true,
      }
      setMessages([welcomeMsg])

      const welcomeWords = dictionary.playground.welcome.split(" ").length
      const estimatedTime = welcomeWords * 60 + 500
      const btnTimer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: nextMsgId(),
            type: "buttons" as const,
            buttons: getChoiceButtons(),
          },
        ])
        scrollContainerToBottom(true)
      }, estimatedTime)

      cleanupRef.current = () => clearTimeout(btnTimer)
    }, 1200)

    return () => clearTimeout(timer)
  }, [dictionary.playground.welcome, nextMsgId, getChoiceButtons, scrollContainerToBottom])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
    }
  }, [])

  /** Play a sequence of messages, then call onComplete when done */
  const playMessages = useCallback(
    (msgs: PlaygroundMessage[], onComplete: () => void) => {
      const timers: ReturnType<typeof setTimeout>[] = []
      let cumulativeDelay = 0

      for (let idx = 0; idx < msgs.length; idx++) {
        const msg = msgs[idx]

        // If this is an inline-choices, schedule it and stop — user interaction needed
        if (msg.type === "inline-choices") {
          const choiceDelay = cumulativeDelay + (msg.delay ?? 0)
          const choiceTimer = setTimeout(() => {
            setShowTyping(false)
            setState("AWAITING_CHOICE")
            setMessages((prev) => [
              ...prev,
              {
                id: nextMsgId(),
                type: "inline-choices",
                choices: msg.choices,
              },
            ])
            scrollContainerToBottom(true)
          }, choiceDelay)
          timers.push(choiceTimer)

          cleanupRef.current = () => {
            timers.forEach(clearTimeout)
          }
          return // Stop here — onComplete will be called by choice handler
        }

        const msgDelay = msg.delay ?? 0
        cumulativeDelay += msgDelay

        // Show typing before AI messages
        if (msg.type === "ai") {
          const typingStart = cumulativeDelay - msgDelay
          const typingTimer = setTimeout(() => {
            setShowTyping(true)
            scrollContainerToBottom(true)
          }, typingStart)
          timers.push(typingTimer)
        }

        const displayTimer = setTimeout(() => {
          setShowTyping(false)

          const displayMsg: DisplayedMessage = {
            id: nextMsgId(),
            type: msg.type === "buttons" ? "buttons" : msg.type as "user" | "ai",
            text: msg.text,
            richContent: msg.richContent,
            richData: msg.richData,
            buttons: msg.buttons,
            streaming: msg.type === "ai" && !msg.richContent,
          }

          setMessages((prev) => [...prev, displayMsg])
          scrollContainerToBottom(true)
        }, cumulativeDelay)
        timers.push(displayTimer)

        // For streaming AI text, add streaming time to cumulative delay
        if (msg.type === "ai" && !msg.richContent && msg.text) {
          const wordCount = msg.text.split(" ").length
          cumulativeDelay += wordCount * 60 + 300
        }

        // For auto-advance user messages, small pause
        if (msg.type === "user" && msg.autoAdvance && idx > 0) {
          cumulativeDelay += 200
        }
      }

      // All messages scheduled — call onComplete after they finish
      const doneTimer = setTimeout(onComplete, cumulativeDelay + 500)
      timers.push(doneTimer)

      cleanupRef.current = () => {
        timers.forEach(clearTimeout)
      }
    },
    [nextMsgId, scrollContainerToBottom]
  )

  const finishScenario = useCallback(
    (scenarioId: string) => {
      setState("SCENARIO_DONE")
      setIsButtonsDisabled(false)
      setShowTyping(false)

      const newPlayedIds = new Set(playedIds)
      newPlayedIds.add(scenarioId)
      setPlayedIds(newPlayedIds)

      const allPlayed = scenarios.every((s) => newPlayedIds.has(s.id))

      if (allPlayed) {
        // Show CTA
        const timers: ReturnType<typeof setTimeout>[] = []
        const ctaTypingTimer = setTimeout(() => {
          setShowTyping(true)
          scrollContainerToBottom(true)
        }, 500)
        timers.push(ctaTypingTimer)

        const ctaTimer = setTimeout(() => {
          setShowTyping(false)
          setState("CTA")
          setMessages((prev) => [
            ...prev,
            {
              id: nextMsgId(),
              type: "ai",
              text: dictionary.playground.ctaText,
              streaming: true,
            },
          ])
          scrollContainerToBottom(true)

          const ctaWords = dictionary.playground.ctaText.split(" ").length
          const ctaBtnTimer = setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: nextMsgId(),
                type: "buttons",
                buttons: [{ id: "cta", emoji: "\ud83d\ude80", label: dictionary.playground.ctaButton }],
              },
            ])
            scrollContainerToBottom(true)
          }, ctaWords * 60 + 500)
          timers.push(ctaBtnTimer)
        }, 1500)
        timers.push(ctaTimer)

        cleanupRef.current = () => timers.forEach(clearTimeout)
      } else {
        // Show "try another" + remaining buttons
        const timers: ReturnType<typeof setTimeout>[] = []
        const tryTimer = setTimeout(() => {
          setShowTyping(true)
          scrollContainerToBottom(true)
        }, 300)
        timers.push(tryTimer)

        const buttonsTimer = setTimeout(() => {
          setShowTyping(false)
          setMessages((prev) => [
            ...prev,
            {
              id: nextMsgId(),
              type: "ai",
              text: dictionary.playground.tryAnother,
              streaming: true,
            },
          ])
          scrollContainerToBottom(true)

          const tryWords = dictionary.playground.tryAnother.split(" ").length
          const showBtnsTimer = setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                id: nextMsgId(),
                type: "buttons",
                buttons: getChoiceButtons(),
              },
            ])
            scrollContainerToBottom(true)
          }, tryWords * 60 + 500)
          timers.push(showBtnsTimer)
        }, 1200)
        timers.push(buttonsTimer)

        cleanupRef.current = () => timers.forEach(clearTimeout)
      }
    },
    [scenarios, playedIds, dictionary.playground, nextMsgId, getChoiceButtons, scrollContainerToBottom]
  )

  const playScenario = useCallback(
    (scenarioId: string) => {
      const scenario = scenarios.find((s) => s.id === scenarioId)
      if (!scenario) return

      setState("SCENARIO_PLAYING")
      setIsButtonsDisabled(true)
      setCurrentScenarioId(scenarioId)

      playMessages(scenario.messages, () => {
        finishScenario(scenarioId)
      })
    },
    [scenarios, playMessages, finishScenario]
  )

  const handleInlineChoice = useCallback(
    (choice: InlineChoice) => {
      if (state !== "AWAITING_CHOICE") return

      setState("SCENARIO_PLAYING")

      playMessages(choice.nextMessages, () => {
        if (currentScenarioId) {
          finishScenario(currentScenarioId)
        }
      })
    },
    [state, currentScenarioId, playMessages, finishScenario]
  )

  const handleButtonClick = useCallback(
    (id: string) => {
      if (id === "cta") {
        document.getElementById("cta-final")?.scrollIntoView({ behavior: "smooth" })
        return
      }
      if (state === "SCENARIO_PLAYING" || state === "AWAITING_CHOICE") return
      playScenario(id)
    },
    [state, playScenario]
  )

  return (
    <div
      ref={playgroundRef}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden max-w-md mx-auto"
    >
      <PlaygroundHeader
        agentName="Maya AI"
        statusText={lang === "fr" ? "En ligne" : "Online"}
      />

      {/* Messages area */}
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        className="p-4 space-y-3 bg-gray-50 overflow-y-auto"
        style={{ minHeight: "350px", maxHeight: "70vh" }}
      >
        {messages.map((msg) => {
          if (msg.type === "buttons" && msg.buttons) {
            return (
              <ScenarioButtons
                key={msg.id}
                buttons={msg.buttons}
                onSelect={handleButtonClick}
                disabled={isButtonsDisabled}
                playedIds={playedIds}
              />
            )
          }

          if (msg.type === "inline-choices" && msg.choices) {
            return (
              <div key={msg.id} className="flex flex-col gap-2 pl-2">
                {msg.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleInlineChoice(choice)}
                    disabled={state !== "AWAITING_CHOICE"}
                    className={`text-left text-sm px-4 py-2.5 rounded-xl border transition-all duration-200
                      ${
                        state !== "AWAITING_CHOICE"
                          ? "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                          : "border-[#0d47a1]/20 text-[#0d47a1] hover:bg-[#0d47a1]/5 hover:border-[#0d47a1]/40 cursor-pointer"
                      }`}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            )
          }

          return (
            <MessageBubble
              key={msg.id}
              type={msg.type as "user" | "ai"}
              text={msg.text}
              richContent={msg.richContent}
              richData={msg.richData}
              streaming={msg.streaming}
              lang={lang}
            />
          )
        })}

        <TypingIndicator visible={showTyping} />
      </div>

      {/* Input bar (disabled, decorative) */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder={dictionary.playground.inputPlaceholder}
            className="bg-transparent outline-none flex-1 text-sm text-gray-400"
            disabled
          />
          <div className="w-8 h-8 bg-gradient-to-r from-[#0d47a1] to-[#00e5ff] rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
