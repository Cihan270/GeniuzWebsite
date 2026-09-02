import type { ReactNode } from "react"

/**
 * Light-only theme shell for fase 1 (no user dark-mode).
 * Sonner and other UI use forced light styling directly — no next-themes script
 * injection, which avoids React 19 client hydration warnings.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return children
}
