import { cn } from "@/lib/utils"

type ScanDisclaimerProps = {
  children: string
  className?: string
}

export function ScanDisclaimer({ children, className }: ScanDisclaimerProps) {
  return (
    <aside
      role="note"
      className={cn(
        "border-l-2 border-accent/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground",
        className,
      )}
    >
      {children}
    </aside>
  )
}
