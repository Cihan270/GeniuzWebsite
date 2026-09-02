/**
 * Information architecture — published vs reserved routes (Fase 1).
 *
 * Source of truth for sitemap, robots allow-list, and SEO matrix.
 * Must NOT include: `/en`, Cases, or dienst-detail SEO pages.
 */

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"

export type PublishedRouteId =
  | "home"
  | "ai-consultancy"
  | "ai-development"
  | "ai-training"
  | "sectoren"
  | "sectoren-juridische-sector"
  | "sectoren-financiele-sector"
  | "sectoren-kennisintensieve-organisaties"
  | "ai-opportunity-scan"
  | "website-scan"
  | "over-ons"
  | "insights"
  | "contact"
  | "privacy"
  | "cookiebeleid"
  | "algemene-voorwaarden"

export type PublishedRoute = {
  id: PublishedRouteId
  /** App path without locale prefix (e.g. `/ai-consultancy`). */
  path: string
  /** Include in sitemap.xml. Legal concept pages stay listed but may use noindex in metadata. */
  inSitemap: boolean
  changeFrequency: ChangeFrequency
  priority: number
}

/**
 * Fase 1 — gepubliceerde NL-routes (indexeerbaar tenzij page metadata noindex zet).
 * Insights article slugs are added dynamically from published insight content.
 */
export const publishedRoutes: readonly PublishedRoute[] = [
  {
    id: "home",
    path: "/",
    inSitemap: true,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    id: "ai-consultancy",
    path: "/ai-consultancy",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    id: "ai-development",
    path: "/ai-development",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    id: "ai-training",
    path: "/ai-training",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    id: "sectoren",
    path: "/sectoren",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    id: "sectoren-juridische-sector",
    path: "/sectoren/juridische-sector",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    id: "sectoren-financiele-sector",
    path: "/sectoren/financiele-sector",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    id: "sectoren-kennisintensieve-organisaties",
    path: "/sectoren/kennisintensieve-organisaties",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    id: "ai-opportunity-scan",
    path: "/ai-opportunity-scan",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    id: "website-scan",
    path: "/website-scan",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    id: "over-ons",
    path: "/over-ons",
    inSitemap: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    id: "insights",
    path: "/insights",
    inSitemap: true,
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    id: "contact",
    path: "/contact",
    inSitemap: true,
    changeFrequency: "yearly",
    priority: 0.8,
  },
  {
    id: "privacy",
    path: "/privacy",
    // Concept legal: noindex metadata → keep out of sitemap.
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    id: "cookiebeleid",
    path: "/cookiebeleid",
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    id: "algemene-voorwaarden",
    path: "/algemene-voorwaarden",
    inSitemap: false,
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const

export function getPublishedRoute(id: PublishedRouteId): PublishedRoute {
  const route = publishedRoutes.find((r) => r.id === id)
  if (!route) {
    throw new Error(`Unknown published route: ${id}`)
  }
  return route
}

export function getSitemapRoutes(): readonly PublishedRoute[] {
  return publishedRoutes.filter((r) => r.inSitemap)
}

/** Paths that must never appear in public nav, sitemap, or SEO matrix (Fase 1). */
export const excludedFromPublicIa = {
  cases: "/cases",
  locales: ["/en"] as const,
  serviceDetails: true,
} as const
