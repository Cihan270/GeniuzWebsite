import type { ImageKey } from "@/content/images"

export type InsightCategory =
  | "AI Automatisering"
  | "AI Strategie"
  | "AI Development"
  | "AI voor Finance"
  | "AI voor Legal"
  | "Automation Tools"
  | "AI Agents"

export type InlineSegment =
  | { kind: "text"; value: string }
  | { kind: "link"; label: string; href: string }

export type InsightBlock =
  | { type: "paragraph"; segments: InlineSegment[] }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title?: string; segments: InlineSegment[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }

export type InsightFaqItem = {
  id: string
  question: string
  answer: string
}

export type InsightCta = {
  heading: string
  body: string
  label: string
  href: string
}

export type Insight = {
  slug: string
  locale: "nl"
  title: string
  description: string
  category: InsightCategory
  /** null = draft / not routable / not in sitemap */
  publishedAt: string | null
  imageKey: ImageKey
  intro: string
  sections: InsightBlock[]
  faq?: InsightFaqItem[]
  cta: InsightCta
  /** Slugs of related articles for bottom section */
  relatedSlugs?: string[]
  seo: {
    title: string
    description: string
    ogImage?: string
  }
}

export const INSIGHT_CATEGORIES: readonly InsightCategory[] = [
  "AI Automatisering",
  "AI Strategie",
  "AI Development",
  "AI voor Finance",
  "AI voor Legal",
  "Automation Tools",
  "AI Agents",
] as const
