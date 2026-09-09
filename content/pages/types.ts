import type { PublishedRouteId } from "@/content/routes"

export type PageSeo = {
  title: string
  description: string
  /** Absolute or path; canonical always built as NL locale URL. */
  ogImage?: string
  noIndex?: boolean
}

export type ContentSectionStub = {
  id: string
  eyebrow?: string
  heading: string
  body: string
}

export type PageCta = {
  label: string
  href: string
}

export type PageFinalCta = {
  heading: string
  body: string
  cta: PageCta
}

export type PageFaqItem = {
  id: string
  question: string
  answer: string
}

export type PageContentSkeleton = {
  routeId: PublishedRouteId
  /** Locale of this content module. Fase 1: nl only. */
  locale: "nl"
  /** App path without locale. */
  path: string
  h1: string
  seo: PageSeo
  sections: readonly ContentSectionStub[]
}

export type ServiceHubOffering = {
  id: string
  title: string
  summary: string
  /** Longer body on the hub anchor section — not a detail URL in Fase 1. */
  body?: string
  /** Anchor id on this hub — not a detail URL in Fase 1. */
  anchorId?: string
  badge?: string
  /**
   * Optional link. Prefer hub anchors (`#…`) or published routes (e.g. `/website-scan`).
   * Never point to reserved dienst-detail paths in Fase 1.
   */
  href?: string
}

export type ServiceHubContent = PageContentSkeleton & {
  kind: "service-hub"
  eyebrow: string
  /** Phrase within `h1` rendered as editorial gold italic in the premium hero. */
  h1Accent?: string
  lead: string
  primaryCta: PageCta
  secondaryCta?: PageCta
  offeringsHeading: string
  offeringsDescription: string
  offerings: readonly ServiceHubOffering[]
  process?: {
    eyebrow: string
    heading: string
    body?: string
    steps: readonly {
      id: string
      title: string
      body: string
    }[]
  }
  related: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      title: string
      summary: string
      href: string
    }[]
  }
  faq?: {
    eyebrow: string
    heading: string
    items: readonly PageFaqItem[]
  }
  finalCta: PageFinalCta
}

export type SectorHubContent = PageContentSkeleton & {
  kind: "sector-hub"
  eyebrow: string
  lead: string
  sectorsHeading: string
  sectorsDescription: string
  sectors: readonly {
    id: string
    title: string
    summary: string
    href: string
  }[]
  note?: string
  finalCta: PageFinalCta
}

export type SectorPageContent = PageContentSkeleton & {
  kind: "sector"
  sectorKey: string
  eyebrow: string
  lead: string
  challenges: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      title: string
      body: string
    }[]
  }
  focusAreas: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      title: string
      body: string
    }[]
  }
  approach: {
    eyebrow: string
    heading: string
    body: string
  }
  relatedServices: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      title: string
      summary: string
      href: string
    }[]
  }
  finalCta: PageFinalCta
}

export type ScanPageContent = PageContentSkeleton & {
  kind: "scan"
  scanType: "opportunity" | "website"
  eyebrow: string
  /** Phrase within `h1` rendered as editorial gold italic in the premium hero. */
  h1Accent?: string
  lead: string
  /** Required for website-scan prototype honesty. */
  prototypeLabel?: string
  disclaimer: string
  finalCta: PageFinalCta
}

export type UtilityPageContent = PageContentSkeleton & {
  kind: "utility" | "editorial" | "home"
}

/** Legal concept pages — visible draft banner; no AVG/compliance claims. */
/**
 * 404 content. Not a `PageContentSkeleton`: it has no published route, no
 * canonical and no sitemap entry.
 */
export type NotFoundContent = {
  eyebrow: string
  h1: string
  lead: string
  primaryCta: PageCta
  secondaryCta: PageCta
  destinationsHeading: string
  destinations: readonly {
    id: string
    title: string
    summary: string
    href: string
  }[]
}

export type LegalSection = ContentSectionStub & {
  /** Bullets rendered under `body` — for enumerations like data categories. */
  items?: readonly string[]
}

export type LegalPageContent = Omit<PageContentSkeleton, "sections"> & {
  kind: "legal"
  /**
   * `draft_legal_review` shows the concept banner and requires `conceptBanner`.
   * `published` renders as a normal document and requires the statutory
   * identity block (KvK, adres) to be filled in — enforced by the QA guard.
   */
  legalStatus: "draft_legal_review" | "published"
  eyebrow: string
  lead: string
  /** Visible site-wide concept notice (not a compliance statement). */
  conceptBanner?: string
  /** ISO date shown as "Laatst bijgewerkt". Required once published. */
  lastUpdated?: string
  /** Renders the statutory identity block (naam, KvK, adres, e-mail). */
  showIdentity?: boolean
  sections: readonly LegalSection[]
}

/** Over Geniuz and similar long-form editorial pages. */
export type EditorialPageContent = PageContentSkeleton & {
  kind: "editorial"
  eyebrow: string
  /** Phrase within `h1` rendered as editorial gold italic in the premium hero. */
  h1Accent?: string
  lead: string
  team?: {
    eyebrow: string
    heading: string
    body: string
    portraitNote: string
    members: readonly {
      id: string
      name: string
      role: string
      bio: string
    }[]
  }
  principles?: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      title: string
      body: string
    }[]
  }
  finalCta: PageFinalCta
}

/** Insights index listing page. */
export type InsightsIndexContent = PageContentSkeleton & {
  kind: "editorial"
  eyebrow: string
  /** Phrase within `h1` rendered as editorial gold italic in the premium hero. */
  h1Accent?: string
  lead: string
  emptyLabel: string
  finalCta: PageFinalCta
}

/** Contact utility page + form copy. */
export type ContactPageContent = PageContentSkeleton & {
  kind: "utility"
  eyebrow: string
  /** Phrase within `h1` rendered as editorial gold italic in the premium hero. */
  h1Accent?: string
  lead: string
  form: {
    nameLabel: string
    emailLabel: string
    companyLabel: string
    companyOptional: string
    topicLabel: string
    messageLabel: string
    submitLabel: string
    submittingLabel: string
    successHeading: string
    successBody: string
    errorGeneric: string
    topics: readonly {
      value: string
      label: string
    }[]
  }
  aside?: {
    heading: string
    body: string
    emailLabel: string
  }
}

export type HomeLink = {
  label: string
  href: string
}

export type HomePageContent = PageContentSkeleton & {
  kind: "home"
  hero: {
    brand: string
    headline: string
    subheadline: string
    primaryCta: HomeLink
    secondaryCta: HomeLink
  }
  positioning: {
    strip: readonly string[]
    heading: string
    body: string
    problems: readonly {
      id: string
      title: string
      body: string
    }[]
  }
  pillars: {
    eyebrow: string
    heading: string
    description: string
    items: readonly {
      id: string
      title: string
      summary: string
      href: string
    }[]
  }
  consultancy: {
    eyebrow: string
    heading: string
    body: string
    href: string
    offerings: readonly {
      id: string
      title: string
      summary: string
    }[]
    process: {
      eyebrow: string
      heading: string
      steps: readonly {
        id: string
        title: string
        body: string
      }[]
    }
  }
  development: {
    eyebrow: string
    heading: string
    body: string
    href: string
    solutions: readonly {
      id: string
      title: string
      summary: string
      href: string
      badge?: string
      prototypeNote?: string
    }[]
  }
  sectors: {
    eyebrow: string
    heading: string
    description: string
    href: string
    items: readonly {
      id: string
      title: string
      summary: string
      href: string
    }[]
  }
  opportunityScan: {
    eyebrow: string
    heading: string
    body: string
    disclaimer: string
    cta: HomeLink
  }
  about: {
    eyebrow: string
    heading: string
    body: string
    href: string
    founders: readonly {
      id: string
      name: string
      role: string
      bio: string
    }[]
  }
  insights: {
    eyebrow: string
    heading: string
    body: string
    href: string
    emptyLabel: string
  }
  faq: {
    eyebrow: string
    heading: string
    items: readonly {
      id: string
      question: string
      answer: string
    }[]
  }
  finalCta: {
    heading: string
    body: string
    cta: HomeLink
  }
}
