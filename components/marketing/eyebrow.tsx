import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type EyebrowProps = ComponentProps<"p"> & {
  /** Gold accent rule before the label. */
  withAccent?: boolean
}

export function Eyebrow({
  className,
  withAccent = true,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    >
      {withAccent ? (
        <span
          aria-hidden
          className="inline-block h-px w-6 shrink-0 bg-accent"
        />
      ) : null}
      {children}
    </p>
  )
}
