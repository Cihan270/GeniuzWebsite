"use client"

import { useEffect, useId, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { DiagramShell } from "@/components/marketing/diagram-shell"
import { duration, easeGeniuz, easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: "proces", label: "Proces", short: "Bedrijfsproces" },
  { id: "analyse", label: "Analyse", short: "Onderzoek" },
  { id: "prioriteit", label: "Prioriteit", short: "Keuzes" },
  { id: "oplossing", label: "Oplossing", short: "Bouw" },
  { id: "uitkomst", label: "Uitkomst", short: "Resultaat" },
] as const

/** Node centers along a gentle arc (viewBox 0 0 640 320). */
const NODES: readonly { x: number; y: number }[] = [
  { x: 56, y: 210 },
  { x: 168, y: 118 },
  { x: 320, y: 78 },
  { x: 472, y: 118 },
  { x: 584, y: 210 },
]

const PATH_D =
  "M56 210 C 100 210, 130 118, 168 118 S 260 78, 320 78 S 420 118, 472 118 S 540 210, 584 210"

type HeroProcessVisualProps = {
  className?: string
}

/**
 * Hero visual: bedrijfsproces → analyse → prioritering → oplossing → uitkomst.
 * SVG-only. Respects prefers-reduced-motion.
 */
export function HeroProcessVisual({ className }: HeroProcessVisualProps) {
  const reduceMotion = useReducedMotion()
  const uid = useId()
  const gradId = `${uid}-hero-path`
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length)
    }, 2400)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="Procesvisual: van bedrijfsproces via analyse en prioritering naar AI-oplossing en meetbare uitkomst"
    >
      <svg
        viewBox="0 0 640 320"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--geniuz-gold)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--geniuz-gold)" stopOpacity="0.55" />
            <stop
              offset="100%"
              stopColor="var(--geniuz-gold-soft)"
              stopOpacity="0.2"
            />
          </linearGradient>
        </defs>

        <motion.path
          d={PATH_D}
          stroke="color-mix(in oklch, var(--geniuz-canvas) 18%, transparent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.6,
            ease: easeOutExpo,
          }}
        />
        <motion.path
          d={PATH_D}
          stroke={`url(#${gradId})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.8,
            ease: easeOutExpo,
            delay: reduceMotion ? 0 : 0.15,
          }}
        />
        <motion.path
          d={PATH_D}
          stroke="var(--geniuz-gold)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeDasharray="4 14"
          initial={false}
          animate={
            reduceMotion
              ? { opacity: 0.45 }
              : { strokeDashoffset: [0, -72], opacity: 0.65 }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  strokeDashoffset: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
          }
        />

        {!reduceMotion ? (
          <motion.circle
            r={3.5}
            fill="var(--geniuz-gold-soft)"
            initial={false}
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              offsetPath: `path('${PATH_D}')`,
              offsetRotate: "0deg",
            }}
          />
        ) : null}

        {NODES.map((node, index) => {
          const isActive = index === active
          const isPast = index < active
          return (
            <g key={STEPS[index].id}>
              {isActive && !reduceMotion ? (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill="color-mix(in oklch, var(--geniuz-gold) 16%, transparent)"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.15, 0.55] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: easeGeniuz,
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              ) : null}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 20 : 15}
                fill={
                  isActive || isPast
                    ? "color-mix(in oklch, var(--geniuz-gold) 24%, transparent)"
                    : "color-mix(in oklch, var(--geniuz-canvas) 7%, transparent)"
                }
                stroke={
                  isActive
                    ? "var(--geniuz-gold)"
                    : isPast
                      ? "color-mix(in oklch, var(--geniuz-gold-soft) 75%, transparent)"
                      : "color-mix(in oklch, var(--geniuz-canvas) 24%, transparent)"
                }
                strokeWidth={isActive ? 2 : 1.5}
                animate={
                  reduceMotion
                    ? undefined
                    : isActive
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                }
                transition={
                  isActive && !reduceMotion
                    ? { duration: 2, repeat: Infinity, ease: easeGeniuz }
                    : { duration: duration.base, ease: easeGeniuz }
                }
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={4.5}
                fill={
                  isActive || isPast
                    ? "var(--geniuz-gold)"
                    : "color-mix(in oklch, var(--geniuz-canvas) 55%, transparent)"
                }
              />
              <text
                x={node.x}
                y={node.y + 42}
                textAnchor="middle"
                className="fill-[var(--geniuz-canvas)]"
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "0.02em",
                  opacity: isActive ? 1 : 0.68,
                }}
              >
                {STEPS[index].label}
              </text>
              <text
                x={node.x}
                y={node.y + 58}
                textAnchor="middle"
                className="fill-[var(--geniuz-gold-soft)]"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: isActive ? 0.95 : 0.4,
                }}
              >
                {STEPS[index].short}
              </text>
            </g>
          )
        })}
      </svg>

      <ol className="sr-only">
        {STEPS.map((step) => (
          <li key={step.id}>
            {step.label}: {step.short}
          </li>
        ))}
      </ol>
    </DiagramShell>
  )
}
