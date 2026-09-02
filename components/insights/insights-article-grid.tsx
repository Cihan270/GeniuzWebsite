"use client"

import { useMemo, useState } from "react"

import {
  InsightArticleCard,
  InsightsCategoryFilter,
} from "@/components/insights"
import type { Insight, InsightCategory } from "@/content/insights/types"
import { INSIGHT_CATEGORIES } from "@/content/insights/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type InsightsArticleGridProps = {
  articles: readonly Insight[]
  featuredSlug: string
  locale: EnabledLocale
}

export function InsightsArticleGrid({
  articles,
  featuredSlug,
  locale,
}: InsightsArticleGridProps) {
  const [activeCategory, setActiveCategory] = useState<InsightCategory | null>(
    null,
  )

  const counts = useMemo(() => {
    const result = Object.fromEntries(
      INSIGHT_CATEGORIES.map((c) => [c, 0]),
    ) as Record<InsightCategory, number>
    for (const article of articles) {
      if (article.slug === featuredSlug) continue
      result[article.category] += 1
    }
    return result
  }, [articles, featuredSlug])

  const filtered = useMemo(() => {
    const gridArticles = articles.filter((a) => a.slug !== featuredSlug)
    if (!activeCategory) return gridArticles
    return gridArticles.filter((a) => a.category === activeCategory)
  }, [articles, featuredSlug, activeCategory])

  return (
    <>
      <InsightsCategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        counts={counts}
        className="mt-8"
      />

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Geen artikelen in deze categorie.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((insight) => (
            <li key={insight.slug} className="min-h-0">
              <InsightArticleCard insight={insight} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
