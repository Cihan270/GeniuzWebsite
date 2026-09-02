import type { Dictionary } from "@/lib/dictionaries"

type SkipLinkProps = {
  dict: Dictionary
}

export function SkipLink({ dict }: SkipLinkProps) {
  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2 focus:ring-3 focus:outline-none"
    >
      {dict.a11y.skipToContent}
    </a>
  )
}
