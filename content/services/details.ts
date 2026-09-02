import type { ContentSectionStub, PageSeo } from "@/content/pages/types"

/**
 * Reserved service-detail routes — content schema + path reservation only.
 * No page.tsx, no nav, no sitemap, no SEO matrix until contentfase.
 */

export type ServiceHubId =
  | "ai-consultancy"
  | "ai-development"
  | "ai-training"

export type ServiceDetailStatus = "reserved" | "draft" | "published"

/**
 * Full content shape for ServiceDetailTemplate (contentfase).
 * Fase 1 stubs keep status `"reserved"` and only working metadata.
 */
export type ServiceDetailContent = {
  hub: ServiceHubId
  slug: string
  /** Path without locale: `/ai-consultancy/ai-scan` */
  path: string
  status: ServiceDetailStatus
  /** Working title for editors — not public SEO copy while reserved. */
  workingTitle: string
  /** Populated when draft/published — unused while reserved. */
  h1?: string
  seo?: PageSeo
  eyebrow?: string
  lead?: string
  sections?: readonly ContentSectionStub[]
  outcomes?: readonly {
    id: string
    title: string
    body: string
  }[]
  finalCta?: {
    heading: string
    body: string
    cta: { label: string; href: string }
  }
}

export type ServiceDetailStub = ServiceDetailContent & {
  status: "reserved"
}

export const reservedServiceDetails: readonly ServiceDetailStub[] = [
  // Consultancy
  {
    hub: "ai-consultancy",
    slug: "ai-scan",
    path: "/ai-consultancy/ai-scan",
    workingTitle: "AI-scan",
    status: "reserved",
  },
  {
    hub: "ai-consultancy",
    slug: "procesanalyse",
    path: "/ai-consultancy/procesanalyse",
    workingTitle: "Procesanalyse",
    status: "reserved",
  },
  {
    hub: "ai-consultancy",
    slug: "ai-strategie",
    path: "/ai-consultancy/ai-strategie",
    workingTitle: "AI-strategie",
    status: "reserved",
  },
  {
    hub: "ai-consultancy",
    slug: "roi-roadmap",
    path: "/ai-consultancy/roi-roadmap",
    workingTitle: "ROI-roadmap",
    status: "reserved",
  },
  // Development
  {
    hub: "ai-development",
    slug: "ai-agents",
    path: "/ai-development/ai-agents",
    workingTitle: "AI Agents",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "chatbots",
    path: "/ai-development/chatbots",
    workingTitle: "AI Chatbots",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "voice-agents",
    path: "/ai-development/voice-agents",
    workingTitle: "Voice Agents",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "workflow-automatisering",
    path: "/ai-development/workflow-automatisering",
    workingTitle: "Workflow-automatisering",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "maatwerk-ai-software",
    path: "/ai-development/maatwerk-ai-software",
    workingTitle: "Maatwerk AI-software",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "crm-api-integraties",
    path: "/ai-development/crm-api-integraties",
    workingTitle: "CRM- en API-integraties",
    status: "reserved",
  },
  {
    hub: "ai-development",
    slug: "websites-platforms",
    path: "/ai-development/websites-platforms",
    workingTitle: "Websites & platforms",
    status: "reserved",
  },
  // Training
  {
    hub: "ai-training",
    slug: "workshops",
    path: "/ai-training/workshops",
    workingTitle: "Workshops",
    status: "reserved",
  },
  {
    hub: "ai-training",
    slug: "managementtraining",
    path: "/ai-training/managementtraining",
    workingTitle: "Managementtraining",
    status: "reserved",
  },
  {
    hub: "ai-training",
    slug: "medewerkers",
    path: "/ai-training/medewerkers",
    workingTitle: "Medewerkerstraining",
    status: "reserved",
  },
  {
    hub: "ai-training",
    slug: "ai-beleid-veiligheid",
    path: "/ai-training/ai-beleid-veiligheid",
    workingTitle: "AI-beleid & veiligheid",
    status: "reserved",
  },
] as const

export function isReservedServiceDetailPath(path: string): boolean {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return reservedServiceDetails.some((d) => d.path === normalized)
}

export function getReservedServiceDetail(
  hub: ServiceHubId,
  slug: string,
): ServiceDetailStub | undefined {
  return reservedServiceDetails.find((d) => d.hub === hub && d.slug === slug)
}

export function getReservedServiceDetailsForHub(
  hub: ServiceHubId,
): readonly ServiceDetailStub[] {
  return reservedServiceDetails.filter((d) => d.hub === hub)
}

/**
 * True when content is ready for a public detail route (contentfase).
 * Reserved stubs must never be rendered as indexable pages.
 */
export function isPublishableServiceDetail(
  detail: ServiceDetailContent,
): detail is ServiceDetailContent & {
  status: "published"
  h1: string
  seo: PageSeo
  lead: string
} {
  return (
    detail.status === "published" &&
    Boolean(detail.h1) &&
    Boolean(detail.seo?.title) &&
    Boolean(detail.seo?.description) &&
    Boolean(detail.lead)
  )
}
