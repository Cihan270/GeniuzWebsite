/**
 * Cases content model — draft only in Fase 1.
 * No public listing, no nav, no sitemap, no coming-soon trust page.
 * CaseTemplate exists for contentfase; do not mount via page.tsx until published.
 */

export type CaseStatus = "draft"

export type Case = {
  slug: string
  status: CaseStatus
  workingTitle: string
  /** Always null until a real case is ready to publish. */
  publishedAt: null
  /** Optional draft fields for editors — not public SEO copy. */
  sector?: string
  summary?: string
  challenge?: string
  approach?: string
  outcome?: string
}

/**
 * Shape required by CaseTemplate once a real case is publishable.
 * Fase 1 never produces this from the registry.
 */
export type PublishableCase = {
  slug: string
  status: "published"
  workingTitle: string
  publishedAt: string
  title: string
  sector: string
  summary: string
  challenge: string
  approach: string
  outcome: string
  seo: { title: string; description: string }
}

/** Empty until real cases exist. Do not invent case studies. */
export const cases: readonly Case[] = []

export function getCaseBySlug(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug)
}

/** Fase 1: always false — no public cases. */
export function isPublishableCase(item: Case): item is never {
  void item
  return false
}
