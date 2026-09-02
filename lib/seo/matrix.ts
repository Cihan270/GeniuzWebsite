import type { PublishedRouteId } from "@/content/routes"
import type { PageSeo } from "@/content/pages/types"
import { getPageContent } from "@/content/pages"
import { getPublishedRoute } from "@/content/routes"

/**
 * SEO matrix — published Fase 1 routes only.
 * No dienst-details, no /en, no Cases.
 */

export type SeoMatrixEntry = {
  routeId: PublishedRouteId
  path: string
  intent: string
  primaryTopic: string
  title: string
  description: string
  h1: string
  noIndex?: boolean
}

const intents: Record<
  PublishedRouteId,
  { intent: string; primaryTopic: string }
> = {
  home: {
    intent: "commercieel merk",
    primaryTopic: "AI consultancy Nederland",
  },
  "ai-consultancy": {
    intent: "dienst hub",
    primaryTopic: "AI consultancy Nederland/België",
  },
  "ai-development": {
    intent: "dienst hub",
    primaryTopic: "maatwerk AI software",
  },
  "ai-training": {
    intent: "dienst hub",
    primaryTopic: "AI training bedrijven",
  },
  sectoren: {
    intent: "sector hub",
    primaryTopic: "AI per sector",
  },
  "sectoren-juridische-sector": {
    intent: "sector",
    primaryTopic: "AI consultancy juridisch",
  },
  "sectoren-financiele-sector": {
    intent: "sector",
    primaryTopic: "AI consultancy finance",
  },
  "sectoren-kennisintensieve-organisaties": {
    intent: "sector",
    primaryTopic: "AI kennisintensief",
  },
  "ai-opportunity-scan": {
    intent: "tool/lead",
    primaryTopic: "AI automatisering potentieel",
  },
  "website-scan": {
    intent: "tool/lead prototype",
    primaryTopic: "website AI readiness (prototype)",
  },
  "over-ons": {
    intent: "trust",
    primaryTopic: "Geniuz team",
  },
  insights: {
    intent: "editorial",
    primaryTopic: "AI implementatie kennis",
  },
  contact: {
    intent: "conversie",
    primaryTopic: "AI adviesgesprek",
  },
  privacy: {
    intent: "compliance concept",
    primaryTopic: "privacy",
  },
  cookiebeleid: {
    intent: "compliance concept",
    primaryTopic: "cookies",
  },
  "algemene-voorwaarden": {
    intent: "compliance concept",
    primaryTopic: "voorwaarden",
  },
}

export function getSeoMatrix(): readonly SeoMatrixEntry[] {
  return (Object.keys(intents) as PublishedRouteId[]).map((routeId) => {
    const page = getPageContent(routeId)
    const route = getPublishedRoute(routeId)
    const meta = intents[routeId]
    return {
      routeId,
      path: route.path,
      intent: meta.intent,
      primaryTopic: meta.primaryTopic,
      title: page.seo.title,
      description: page.seo.description,
      h1: page.h1,
      noIndex: page.seo.noIndex,
    }
  })
}

export function getSeoForRoute(routeId: PublishedRouteId): SeoMatrixEntry {
  const entry = getSeoMatrix().find((e) => e.routeId === routeId)
  if (!entry) {
    throw new Error(`Missing SEO matrix entry for ${routeId}`)
  }
  return entry
}

export function pageSeoToMeta(seo: PageSeo): {
  title: string
  description: string
  robots?: { index: false; follow: false }
} {
  return {
    title: seo.title,
    description: seo.description,
    ...(seo.noIndex ? { robots: { index: false as const, follow: false as const } } : {}),
  }
}
