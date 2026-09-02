/**
 * Insights registry — published articles with publishedAt set.
 * Drafts may exist without publishedAt — not routable / not in sitemap.
 */

import { aiAccountantsAdministratiekantoren } from "./articles/ai-accountants-administratiekantoren"
import { aiAdvocatenJuridischeKantoren } from "./articles/ai-advocaten-juridische-kantoren"
import { aiAgentVsChatbot } from "./articles/ai-agent-vs-chatbot"
import { aiAutomatiseringBedrijven } from "./articles/ai-automatisering-bedrijven"
import { aiImplementerenBedrijf } from "./articles/ai-implementeren-bedrijf"
import { aiWorkflowBouwen } from "./articles/ai-workflow-bouwen"
import { bedrijfsprocessenAutomatiserenAi } from "./articles/bedrijfsprocessen-automatiseren-ai"
import { chatgptZakelijkGebruiken } from "./articles/chatgpt-zakelijk-gebruiken"
import { customAiOplossingBedrijf } from "./articles/custom-ai-oplossing-bedrijf"
import { kostenAiAutomatisering } from "./articles/kosten-ai-automatisering"
import { n8nVsMakeVsZapier } from "./articles/n8n-vs-make-vs-zapier"
import { watIsEenAiAgent } from "./articles/wat-is-een-ai-agent"
import type { Insight, InsightCategory } from "./types"

export type { Insight, InsightCategory } from "./types"
export { INSIGHT_CATEGORIES } from "./types"
export { estimateReadingTime } from "./helpers"

export const insights: readonly Insight[] = [
  aiAutomatiseringBedrijven,
  bedrijfsprocessenAutomatiserenAi,
  kostenAiAutomatisering,
  aiAgentVsChatbot,
  aiAccountantsAdministratiekantoren,
  aiAdvocatenJuridischeKantoren,
  aiWorkflowBouwen,
  customAiOplossingBedrijf,
  chatgptZakelijkGebruiken,
  aiImplementerenBedrijf,
  n8nVsMakeVsZapier,
  watIsEenAiAgent,
]

function sortByPublishedDesc(a: Insight, b: Insight): number {
  if (!a.publishedAt || !b.publishedAt) return 0
  return b.publishedAt.localeCompare(a.publishedAt)
}

export function getPublishedInsights(): readonly Insight[] {
  return insights
    .filter((i) => i.publishedAt !== null)
    .slice()
    .sort(sortByPublishedDesc)
}

/** Latest N published insights — for homepage preview. */
export function getFeaturedInsights(limit = 3): readonly Insight[] {
  return getPublishedInsights().slice(0, limit)
}

export function getPublishedInsightPaths(): string[] {
  return getPublishedInsights().map((i) => `/insights/${i.slug}`)
}

export function getPublishedInsightBySlug(
  slug: string,
): Insight | undefined {
  return getPublishedInsights().find((i) => i.slug === slug)
}

export function getRelatedInsights(
  insight: Insight,
  limit = 3,
): readonly Insight[] {
  const published = getPublishedInsights()
  const bySlug = insight.relatedSlugs ?? []

  const related = bySlug
    .map((s) => published.find((i) => i.slug === s))
    .filter((i): i is Insight => i !== undefined)
    .slice(0, limit)

  if (related.length >= limit) return related

  const sameCategory = published.filter(
    (i) =>
      i.slug !== insight.slug &&
      i.category === insight.category &&
      !related.some((r) => r.slug === i.slug),
  )

  return [...related, ...sameCategory].slice(0, limit)
}

export function getInsightCategoryCounts(): Record<InsightCategory, number> {
  const counts = Object.fromEntries(
    (["AI Automatisering", "AI Strategie", "AI Development", "AI voor Finance", "AI voor Legal", "Automation Tools", "AI Agents"] as InsightCategory[]).map(
      (c) => [c, 0],
    ),
  ) as Record<InsightCategory, number>

  for (const insight of getPublishedInsights()) {
    counts[insight.category] += 1
  }

  return counts
}

export function getFeaturedInsight(): Insight | undefined {
  return getPublishedInsights()[0]
}
