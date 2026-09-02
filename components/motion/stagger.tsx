"use client"

import { motion, type HTMLMotionProps } from "motion/react"

import {
  staggerContainerVariants,
  staggerItemVariants,
  staggerLuxuryContainerVariants,
  staggerLuxuryItemVariants,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

type StaggerProps = HTMLMotionProps<"div"> & {
  once?: boolean
  amount?: number
  luxury?: boolean
}

export function Stagger({
  className,
  once = true,
  amount = 0.15,
  luxury = false,
  children,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={
        luxury ? staggerLuxuryContainerVariants : staggerContainerVariants
      }
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  luxury?: boolean
}

export function StaggerItem({
  className,
  luxury = false,
  children,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={luxury ? staggerLuxuryItemVariants : staggerItemVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
