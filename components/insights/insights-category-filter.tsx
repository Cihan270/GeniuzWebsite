"use client"

import { INSIGHT_CATEGORIES, type InsightCategory } from "@/content/insights/types"
import { cn } from "@/lib/utils"

type InsightsCategoryFilterProps = {
  activeCategory: InsightCategory | null
  onCategoryChange: (category: InsightCategory | null) => void
  counts: Record<InsightCategory, number>
  className?: string
}

export function InsightsCategoryFilter({
  activeCategory,
  onCategoryChange,
  counts,
  className,
}: InsightsCategoryFilterProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="group"
      aria-label="Filter op categorie"
    >
      <button
        type="button"
        onClick={() => onCategoryChange(null)}
        className={cn(
          "rounded-full border px-4 py-2 text-sm transition-colors",
          activeCategory === null
            ? "border-accent bg-accent/10 text-foreground"
            : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
        )}
      >
        Alle
      </button>
      {INSIGHT_CATEGORIES.filter((cat) => counts[cat] > 0).map((category) => (
        <button
          key={category}
          type="button"
          onClick={() =>
            onCategoryChange(activeCategory === category ? null : category)
          }
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            activeCategory === category
              ? "border-accent bg-accent/10 text-foreground"
              : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
          )}
        >
          {category}
          <span className="ml-1.5 tabular-nums text-muted-foreground">
            ({counts[category]})
          </span>
        </button>
      ))}
    </div>
  )
}

/** Non-interactive category badge for cards and article headers. */
export function InsightCategoryBadge({
  category,
  className,
}: {
  category: InsightCategory
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex text-xs font-medium tracking-[0.08em] text-accent uppercase",
        className,
      )}
    >
      {category}
    </span>
  )
}

export function InlineSegments({
  segments,
  className,
}: {
  segments: readonly import("@/content/insights/types").InlineSegment[]
  className?: string
}) {
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.kind === "link") {
          return (
            <a
              key={`${segment.href}-${index}`}
              href={segment.href}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {segment.label}
            </a>
          )
        }
        return <span key={index}>{segment.value}</span>
      })}
    </span>
  )
}
