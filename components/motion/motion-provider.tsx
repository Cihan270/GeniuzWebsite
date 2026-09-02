"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/** Respects prefers-reduced-motion via Motion's built-in user setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
