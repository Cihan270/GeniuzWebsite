import type { ComponentProps } from "react"

import { Container } from "@/components/marketing/container"
import { cn } from "@/lib/utils"

export type SectionTheme = "canvas" | "surface" | "ink" | "ink-deep"

type SectionProps = ComponentProps<"section"> & {
  theme?: SectionTheme
  /** Skip the inner Container (for full-bleed children). */
  flush?: boolean
  containerSize?: ComponentProps<typeof Container>["size"]
  containerClassName?: string
}

export function Section({
  className,
  theme = "canvas",
  flush = false,
  containerSize = "default",
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      data-section-theme={theme}
      className={cn("py-16 md:py-24 lg:py-28", className)}
      {...props}
    >
      {flush ? (
        children
      ) : (
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      )}
    </section>
  )
}
