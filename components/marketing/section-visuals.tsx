"use client"

import { useEffect, useId, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { DiagramShell } from "@/components/marketing/diagram-shell"
import { duration, easeGeniuz, easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

type VisualProps = {
  className?: string
}

function NodePulse({
  x,
  y,
  active,
  reduceMotion,
}: {
  x: number
  y: number
  active: boolean
  reduceMotion: boolean | null
}) {
  return (
    <>
      {active && !reduceMotion ? (
        <motion.circle
          cx={x}
          cy={y}
          r={26}
          fill="color-mix(in oklch, var(--geniuz-gold) 16%, transparent)"
          animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0.12, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: easeGeniuz }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={active ? 18 : 14}
        fill={
          active
            ? "color-mix(in oklch, var(--geniuz-gold) 24%, transparent)"
            : "color-mix(in oklch, var(--geniuz-canvas) 7%, transparent)"
        }
        stroke={
          active
            ? "var(--geniuz-gold)"
            : "color-mix(in oklch, var(--geniuz-canvas) 24%, transparent)"
        }
        strokeWidth={active ? 2 : 1.5}
      />
      <circle
        cx={x}
        cy={y}
        r={4}
        fill={
          active
            ? "var(--geniuz-gold)"
            : "color-mix(in oklch, var(--geniuz-canvas) 55%, transparent)"
        }
      />
    </>
  )
}

function Label({
  x,
  y,
  primary,
  secondary,
  active,
}: {
  x: number
  y: number
  primary: string
  secondary?: string
  active?: boolean
}) {
  return (
    <>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        className="fill-[var(--geniuz-canvas)]"
        style={{
          fontSize: 13,
          fontWeight: active ? 600 : 500,
          letterSpacing: "0.02em",
          opacity: active ? 1 : 0.68,
        }}
      >
        {primary}
      </text>
      {secondary ? (
        <text
          x={x}
          y={y + 16}
          textAnchor="middle"
          className="fill-[var(--geniuz-gold-soft)]"
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: active ? 0.95 : 0.4,
          }}
        >
          {secondary}
        </text>
      ) : null}
    </>
  )
}

/** Three connected pillars: consultancy → development → training. */
export function PillarsVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const uid = useId()
  const gradId = `${uid}-pillars`
  const nodes = [
    { x: 110, y: 150, label: "Consultancy", short: "Richting" },
    { x: 320, y: 110, label: "Development", short: "Bouw" },
    { x: 530, y: 150, label: "Training", short: "Adoptie" },
  ] as const
  const pathD = "M110 150 C 180 150, 250 110, 320 110 S 460 150, 530 150"
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % nodes.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduceMotion, nodes.length])

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="Drie kerngebieden: consultancy, development en training in samenhang"
    >
      <svg
        viewBox="0 0 640 280"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--geniuz-gold)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--geniuz-gold)" stopOpacity="0.6" />
            <stop
              offset="100%"
              stopColor="var(--geniuz-gold-soft)"
              stopOpacity="0.25"
            />
          </linearGradient>
        </defs>
        <motion.path
          d={pathD}
          stroke={`url(#${gradId})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.5,
            ease: easeOutExpo,
          }}
        />
        {nodes.map((node, index) => (
          <g key={node.label}>
            <NodePulse
              x={node.x}
              y={node.y}
              active={index === active}
              reduceMotion={reduceMotion}
            />
            <Label
              x={node.x}
              y={node.y + 40}
              primary={node.label}
              secondary={node.short}
              active={index === active}
            />
          </g>
        ))}
      </svg>
    </DiagramShell>
  )
}

/** Vertical process ladder for consultancy werkwijze. */
export function ConsultancyProcessVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const steps = [
    "Kennismaken",
    "Onderzoeken",
    "Prioriteren",
    "Ontwikkelen",
    "Implementeren",
  ] as const
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 2000)
    return () => window.clearInterval(id)
  }, [reduceMotion, steps.length])

  const startY = 48
  const gap = 48

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="Consultancyproces: kennismaken, onderzoeken, prioriteren, ontwikkelen, implementeren"
    >
      <svg
        viewBox="0 0 420 300"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <motion.line
          x1={56}
          y1={startY}
          x2={56}
          y2={startY + gap * (steps.length - 1)}
          stroke="color-mix(in oklch, var(--geniuz-gold) 45%, transparent)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic,
            ease: easeOutExpo,
          }}
        />
        {steps.map((step, index) => {
          const y = startY + gap * index
          const isActive = index === active
          const isPast = index < active
          return (
            <g key={step}>
              <circle
                cx={56}
                cy={y}
                r={isActive ? 11 : 8}
                fill={
                  isActive || isPast
                    ? "color-mix(in oklch, var(--geniuz-gold) 28%, transparent)"
                    : "color-mix(in oklch, var(--geniuz-canvas) 8%, transparent)"
                }
                stroke={
                  isActive
                    ? "var(--geniuz-gold)"
                    : isPast
                      ? "color-mix(in oklch, var(--geniuz-gold-soft) 70%, transparent)"
                      : "color-mix(in oklch, var(--geniuz-canvas) 22%, transparent)"
                }
                strokeWidth={isActive ? 2 : 1.5}
              />
              <circle
                cx={56}
                cy={y}
                r={3}
                fill={
                  isActive || isPast
                    ? "var(--geniuz-gold)"
                    : "color-mix(in oklch, var(--geniuz-canvas) 50%, transparent)"
                }
              />
              <text
                x={86}
                y={y + 5}
                className="fill-[var(--geniuz-canvas)]"
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  opacity: isActive ? 1 : 0.62,
                }}
              >
                {step}
              </text>
              <text
                x={280}
                y={y + 5}
                className="fill-[var(--geniuz-gold-soft)]"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  fontFamily: "ui-monospace, monospace",
                  opacity: isActive ? 0.9 : 0.35,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          )
        })}
      </svg>
    </DiagramShell>
  )
}

/** Hub of connected solution nodes for development. */
export function DevelopmentSystemsVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const center = { x: 320, y: 145 }
  const satellites = [
    { x: 120, y: 90, label: "Agents" },
    { x: 520, y: 90, label: "Workflows" },
    { x: 140, y: 220, label: "Maatwerk" },
    { x: 500, y: 220, label: "Integraties" },
  ] as const
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % satellites.length)
    }, 2100)
    return () => window.clearInterval(id)
  }, [reduceMotion, satellites.length])

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="AI Development: agents, workflows, maatwerk en integraties rondom het proces"
    >
      <svg
        viewBox="0 0 640 300"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {satellites.map((node, index) => (
          <motion.line
            key={`line-${node.label}`}
            x1={center.x}
            y1={center.y}
            x2={node.x}
            y2={node.y}
            stroke={
              index === active
                ? "var(--geniuz-gold)"
                : "color-mix(in oklch, var(--geniuz-canvas) 18%, transparent)"
            }
            strokeWidth={index === active ? 2 : 1.5}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : duration.cinematic,
              ease: easeOutExpo,
              delay: reduceMotion ? 0 : index * 0.08,
            }}
          />
        ))}
        <NodePulse
          x={center.x}
          y={center.y}
          active
          reduceMotion={reduceMotion}
        />
        <Label x={center.x} y={center.y + 42} primary="Proces" secondary="Kern" active />
        {satellites.map((node, index) => (
          <g key={node.label}>
            <NodePulse
              x={node.x}
              y={node.y}
              active={index === active}
              reduceMotion={reduceMotion}
            />
            <Label
              x={node.x}
              y={node.y + (node.y > center.y ? 38 : -28)}
              primary={node.label}
              active={index === active}
            />
          </g>
        ))}
      </svg>
    </DiagramShell>
  )
}

/** Arc gauge for Opportunity Scan score indication. */
export function OpportunityScanVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const uid = useId()
  const gradId = `${uid}-gauge`
  const arc =
    "M 100 210 A 180 180 0 0 1 540 210"

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="Indicatieve opportunity score als bandbreedte — geen garantie"
    >
      <svg
        viewBox="0 0 640 280"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--geniuz-gold)" stopOpacity="0.25" />
            <stop offset="70%" stopColor="var(--geniuz-gold)" stopOpacity="0.85" />
            <stop
              offset="100%"
              stopColor="var(--geniuz-gold-soft)"
              stopOpacity="0.4"
            />
          </linearGradient>
        </defs>
        <path
          d={arc}
          stroke="color-mix(in oklch, var(--geniuz-canvas) 16%, transparent)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <motion.path
          d={arc}
          stroke={`url(#${gradId})`}
          strokeWidth={14}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: reduceMotion ? 0.72 : 0.72 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.8,
            ease: easeOutExpo,
          }}
        />
        {!reduceMotion ? (
          <motion.circle
            r={7}
            fill="var(--geniuz-gold-soft)"
            initial={false}
            animate={{ offsetDistance: ["0%", "72%"] }}
            transition={{
              duration: duration.cinematic * 1.8,
              ease: easeOutExpo,
            }}
            style={{
              offsetPath: `path('${arc}')`,
              offsetRotate: "0deg",
            }}
          />
        ) : null}
        <text
          x={320}
          y={155}
          textAnchor="middle"
          className="fill-[var(--geniuz-canvas)]"
          style={{ fontSize: 42, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Score
        </text>
        <text
          x={320}
          y={182}
          textAnchor="middle"
          className="fill-[var(--geniuz-gold-soft)]"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Indicatief · bandbreedte
        </text>
        <text
          x={100}
          y={245}
          textAnchor="middle"
          className="fill-[var(--geniuz-canvas)]"
          style={{ fontSize: 11, opacity: 0.45 }}
        >
          Laag
        </text>
        <text
          x={540}
          y={245}
          textAnchor="middle"
          className="fill-[var(--geniuz-canvas)]"
          style={{ fontSize: 11, opacity: 0.45 }}
        >
          Hoog
        </text>
      </svg>
    </DiagramShell>
  )
}

/** Three sector focus nodes. */
export function SectorsVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const nodes = [
    { x: 120, y: 155, label: "Juridisch", short: "Precisie" },
    { x: 320, y: 100, label: "Finance", short: "Controle" },
    { x: 520, y: 155, label: "Kenniswerk", short: "Schaal" },
  ] as const
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % nodes.length)
    }, 2300)
    return () => window.clearInterval(id)
  }, [reduceMotion, nodes.length])

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="Sectorfocus: juridisch, finance en kennisintensieve organisaties"
    >
      <svg
        viewBox="0 0 640 280"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <motion.path
          d="M120 155 L320 100 L520 155"
          stroke="color-mix(in oklch, var(--geniuz-gold) 40%, transparent)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.4,
            ease: easeOutExpo,
          }}
        />
        <motion.path
          d="M120 155 L520 155"
          stroke="color-mix(in oklch, var(--geniuz-canvas) 14%, transparent)"
          strokeWidth={1.5}
          strokeDasharray="4 10"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic,
            ease: easeOutExpo,
            delay: reduceMotion ? 0 : 0.2,
          }}
        />
        {nodes.map((node, index) => (
          <g key={node.label}>
            <NodePulse
              x={node.x}
              y={node.y}
              active={index === active}
              reduceMotion={reduceMotion}
            />
            <Label
              x={node.x}
              y={node.y + 42}
              primary={node.label}
              secondary={node.short}
              active={index === active}
            />
          </g>
        ))}
      </svg>
    </DiagramShell>
  )
}

/** Compact training adoption path. */
export function TrainingAdoptionVisual({ className }: VisualProps) {
  const reduceMotion = useReducedMotion()
  const steps = [
    { x: 90, y: 160, label: "Kader", short: "Beleid" },
    { x: 250, y: 100, label: "Workshop", short: "Skills" },
    { x: 410, y: 100, label: "Praktijk", short: "Toepassing" },
    { x: 550, y: 160, label: "Adoptie", short: "Gedrag" },
  ] as const
  const pathD =
    "M90 160 C 150 160, 200 100, 250 100 S 350 100, 410 100 S 490 160, 550 160"
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 2100)
    return () => window.clearInterval(id)
  }, [reduceMotion, steps.length])

  return (
    <DiagramShell
      className={cn(className)}
      aria-label="AI Training: van kader en workshop via praktijk naar adoptie"
    >
      <svg
        viewBox="0 0 640 280"
        className="relative z-10 h-auto w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <motion.path
          d={pathD}
          stroke="color-mix(in oklch, var(--geniuz-gold) 55%, transparent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduceMotion ? 0 : duration.cinematic * 1.5,
            ease: easeOutExpo,
          }}
        />
        {steps.map((step, index) => (
          <g key={step.label}>
            <NodePulse
              x={step.x}
              y={step.y}
              active={index === active}
              reduceMotion={reduceMotion}
            />
            <Label
              x={step.x}
              y={step.y + 40}
              primary={step.label}
              secondary={step.short}
              active={index === active}
            />
          </g>
        ))}
      </svg>
    </DiagramShell>
  )
}
