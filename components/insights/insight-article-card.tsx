import Link from "next/link"

import { BrandImage } from "@/components/marketing"
import { InsightCategoryBadge } from "@/components/insights/insights-category-filter"
import { estimateReadingTime } from "@/content/insights/helpers"
import type { Insight } from "@/content/insights/types"
import type { EnabledLocale } from "@/lib/i18n/config"
import { localePath } from "@/lib/i18n/paths"
import { cn } from "@/lib/utils"

type InsightArticleCardProps = {
  insight: Insight
  locale: EnabledLocale
  featured?: boolean
  className?: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function InsightArticleCard({
  insight,
  locale,
  featured = false,
  className,
}: InsightArticleCardProps) {
  const href = localePath(`/insights/${insight.slug}`, locale)
  const readingTime = estimateReadingTime(insight)

  if (featured) {
    return (
      <article
        className={cn(
          "group grid overflow-hidden border border-border bg-card lg:grid-cols-[1.1fr_1fr]",
          className,
        )}
      >
        <Link
          href={href}
          className="relative block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
          <BrandImage
            imageKey={insight.imageKey}
            variant="banner"
            className="aspect-[16/9] max-h-none h-full min-h-[220px] w-full"
            priority
          />
        </Link>
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Uitgelicht
          </p>
          <InsightCategoryBadge category={insight.category} className="mt-4" />
          <h2 className="mt-3 text-balance text-2xl md:text-3xl">
            <Link
              href={href}
              className="font-editorial italic outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {insight.title}
            </Link>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {insight.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {insight.publishedAt ? (
              <time dateTime={insight.publishedAt}>
                {formatDate(insight.publishedAt)}
              </time>
            ) : null}
            <span>{readingTime} min leestijd</span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors hover:border-accent/30",
        className,
      )}
    >
      <Link
        href={href}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        <BrandImage
          imageKey={insight.imageKey}
          variant="thumbnail"
          className="aspect-[16/10] w-full sm:w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <InsightCategoryBadge category={insight.category} />
        <h2 className="mt-3 text-lg leading-snug md:text-xl">
          <Link
            href={href}
            className="font-editorial italic outline-none hover:underline hover:underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {insight.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {insight.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {insight.publishedAt ? (
            <time dateTime={insight.publishedAt}>
              {formatDate(insight.publishedAt)}
            </time>
          ) : null}
          <span aria-hidden>·</span>
          <span>{readingTime} min</span>
        </div>
      </div>
    </article>
  )
}
