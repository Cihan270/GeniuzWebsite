import { cn } from "@/lib/utils"

export type ScanStepMeta = {
  id: string
  title: string
}

type ScanStepIndicatorProps = {
  steps: readonly ScanStepMeta[]
  currentIndex: number
  className?: string
}

export function ScanStepIndicator({
  steps,
  currentIndex,
  className,
}: ScanStepIndicatorProps) {
  return (
    <nav
      aria-label="Scanstappen"
      className={cn("w-full", className)}
    >
      <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
        {steps.map((step, index) => {
          const state =
            index < currentIndex
              ? "done"
              : index === currentIndex
                ? "current"
                : "upcoming"
          return (
            <li
              key={step.id}
              className="flex items-center gap-2 sm:after:mx-2 sm:after:block sm:after:h-px sm:after:w-6 sm:after:bg-border sm:last:after:hidden"
            >
              <span
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-full border font-mono text-xs tabular-nums",
                  state === "current" &&
                    "border-accent bg-accent text-accent-foreground",
                  state === "done" &&
                    "border-foreground/30 bg-foreground/5 text-foreground",
                  state === "upcoming" &&
                    "border-border text-muted-foreground",
                )}
                aria-current={state === "current" ? "step" : undefined}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "text-sm",
                  state === "current"
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
