import type { MetadataRoute } from "next"
import { getPublishedInsightPaths } from "@/content/insights"
import { getSitemapRoutes } from "@/content/routes"
import { absoluteUrl } from "@/lib/i18n/paths"
import { defaultLocale } from "@/lib/i18n/config"

/**
 * Sitemap — alleen gepubliceerde NL-routes.
 * Geen /en, geen Cases, geen dienst-detailpagina’s.
 * Insights-artikelen alleen als publishedAt is gezet (max 3).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = getSitemapRoutes().map(
    (route) => ({
      url: absoluteUrl(route.path, defaultLocale),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }),
  )

  const insightEntries: MetadataRoute.Sitemap = getPublishedInsightPaths().map(
    (path) => ({
      url: absoluteUrl(path, defaultLocale),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }),
  )

  return [...staticEntries, ...insightEntries]
}
