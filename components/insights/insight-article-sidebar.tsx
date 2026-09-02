import { InsightCategoryBadge } from "@/components/insights/insights-category-filter"
import { slugifyHeading } from "@/components/insights/insight-article-utils"
import type { InsightCategory } from "@/content/insights/types"
import { cn } from "@/lib/utils"

type InsightArticleSidebarProps = {
  category: InsightCategory
  dateLabel: string | null
  publishedAt: string | null
  readingTime: number
  headings: readonly string[]
  className?: string
}

export function InsightArticleSidebar({
  category,
  dateLabel,
  publishedAt,
  readingTime,
  headings,
  className,
}: InsightArticleSidebarProps) {
  return (
    <aside className={cn("hidden lg:block", className)}>
      <div className="sticky top-20 max-h-[calc(100svh-5.5rem)] overflow-y-auto overscroll-contain pr-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="space-y-12 pb-2">
          <div className="space-y-5">
            <InsightCategoryBadge category={category} />
            <dl className="space-y-4">
              {dateLabel && publishedAt ? (
                <div>
                  <dt className="text-[0.6875rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                    Gepubliceerd
                  </dt>
                  <dd className="mt-1.5 text-sm text-foreground/90">
                    <time dateTime={publishedAt}>{dateLabel}</time>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-[0.6875rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  Leestijd
                </dt>
                <dd className="mt-1.5 font-mono text-sm tabular-nums text-foreground/90">
                  {readingTime} min
                </dd>
              </div>
            </dl>
          </div>

          {headings.length > 0 ? (
            <nav aria-label="Inhoudsopgave">
              <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Inhoud
              </p>
              <ol className="mt-5 space-y-1">
                {headings.map((heading, index) => (
                  <li key={heading}>
                    <a
                      href={`#${slugifyHeading(heading)}`}
                      className="group flex gap-3 py-2 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[0.6875rem] tabular-nums tracking-[0.12em] text-accent/70 transition-colors group-hover:text-accent"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">{heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
