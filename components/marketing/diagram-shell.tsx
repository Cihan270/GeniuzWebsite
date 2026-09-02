import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type DiagramShellProps = {
  children: ReactNode
  className?: string
  /** Accessible name for the decorative diagram. */
  "aria-label": string
}

/**
 * Shared chrome for Geniuz process/system diagrams:
 * ink plane, gold glow, grid, grain, soft frame — matches HeroProcessVisual.
 */
export function DiagramShell({
  children,
  className,
  "aria-label": ariaLabel,
}: DiagramShellProps) {
  return (
    <div
      data-slot="diagram-shell"
      className={cn("relative isolate w-full overflow-hidden", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_35%_15%,color-mix(in_oklch,var(--geniuz-gold)_32%,transparent),transparent_52%),radial-gradient(ellipse_at_85%_80%,color-mix(in_oklch,var(--geniuz-ink)_40%,transparent),transparent_48%),linear-gradient(168deg,color-mix(in_oklch,var(--geniuz-ink)_88%,black)_0%,var(--geniuz-ink-deep)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--geniuz-canvas) 1px, transparent 1px), linear-gradient(to bottom, var(--geniuz-canvas) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 18%, transparent 78%)",
        }}
      />
      <div aria-hidden className="geniuz-grain absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-white/[0.08]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--geniuz-gold)_55%,transparent)] to-transparent"
      />
      {children}
    </div>
  )
}
