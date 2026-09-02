import type { Transition, Variants } from "motion/react"

/** Shared Motion presets — durations match CSS --duration-* tokens. */
export const easeGeniuz = [0.22, 1, 0.36, 1] as const
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

export const duration = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  cinematic: 1.05,
} as const

export const transitionFast: Transition = {
  duration: duration.fast,
  ease: easeGeniuz,
}

export const transitionBase: Transition = {
  duration: duration.base,
  ease: easeGeniuz,
}

export const transitionSlow: Transition = {
  duration: duration.slow,
  ease: easeGeniuz,
}

export const transitionCinematic: Transition = {
  duration: duration.cinematic,
  ease: easeOutExpo,
}

/** Subtle reveal: opacity + slight y. Reduced-motion handled by MotionConfig. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
}

/** Homepage-grade reveal — slightly larger travel + soft blur. */
export const revealLuxuryVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionCinematic,
  },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

export const staggerLuxuryContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
}

export const staggerLuxuryItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionCinematic,
  },
}

/** Hero entrance choreography (mount once). */
export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionCinematic,
  },
}

export const heroVisualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, x: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      ...transitionCinematic,
      delay: 0.28,
    },
  },
}
