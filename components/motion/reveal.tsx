"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react"

import { revealLuxuryVariants, revealVariants } from "@/lib/motion"
import { cn } from "@/lib/utils"

type RevealProps = HTMLMotionProps<"div"> & {
  /** When true, animates once on enter (default). */
  once?: boolean
  /** Intersection ratio before reveal (0 = any pixel visible). */
  amount?: number
  /** Homepage-grade travel + soft blur. */
  luxury?: boolean
}

export function Reveal({
  className,
  once = true,
  amount = 0,
  luxury = false,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      variants={luxury ? revealLuxuryVariants : revealVariants}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
