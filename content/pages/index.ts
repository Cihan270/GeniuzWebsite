import { aiConsultancyPage } from "@/content/pages/ai-consultancy"
import { aiDevelopmentPage } from "@/content/pages/ai-development"
import { aiOpportunityScanPage } from "@/content/pages/ai-opportunity-scan"
import { aiTrainingPage } from "@/content/pages/ai-training"
import { homePage } from "@/content/pages/home"
import {
  sectorFinancePage,
  sectorJuridischPage,
  sectorKennisPage,
  sectorenHubPage,
} from "@/content/pages/sectors"
import { contactPage } from "@/content/pages/contact"
import { overOnsPage } from "@/content/pages/over-ons"
import {
  algemeneVoorwaardenPage,
  cookiebeleidPage,
  insightsIndexPage,
  privacyPage,
} from "@/content/pages/supporting"
import type {
  ContactPageContent,
  EditorialPageContent,
  HomePageContent,
  InsightsIndexContent,
  LegalPageContent,
  PageContentSkeleton,
  ScanPageContent,
  SectorHubContent,
  SectorPageContent,
  ServiceHubContent,
  UtilityPageContent,
} from "@/content/pages/types"
import { websiteScanPage } from "@/content/pages/website-scan"
import type { PublishedRouteId } from "@/content/routes"

export type AnyPageContent =
  | HomePageContent
  | ServiceHubContent
  | SectorHubContent
  | SectorPageContent
  | ScanPageContent
  | EditorialPageContent
  | InsightsIndexContent
  | ContactPageContent
  | LegalPageContent
  | UtilityPageContent
  | PageContentSkeleton

const pagesByRouteId = {
  home: homePage,
  "ai-consultancy": aiConsultancyPage,
  "ai-development": aiDevelopmentPage,
  "ai-training": aiTrainingPage,
  sectoren: sectorenHubPage,
  "sectoren-juridische-sector": sectorJuridischPage,
  "sectoren-financiele-sector": sectorFinancePage,
  "sectoren-kennisintensieve-organisaties": sectorKennisPage,
  "ai-opportunity-scan": aiOpportunityScanPage,
  "website-scan": websiteScanPage,
  "over-ons": overOnsPage,
  insights: insightsIndexPage,
  contact: contactPage,
  privacy: privacyPage,
  cookiebeleid: cookiebeleidPage,
  "algemene-voorwaarden": algemeneVoorwaardenPage,
} as const satisfies Record<PublishedRouteId, AnyPageContent>

export function getPageContent(routeId: PublishedRouteId): AnyPageContent {
  return pagesByRouteId[routeId]
}

export function getAllPageContent(): readonly AnyPageContent[] {
  return Object.values(pagesByRouteId)
}

export const serviceHubPages = [
  aiConsultancyPage,
  aiDevelopmentPage,
  aiTrainingPage,
] as const

export const sectorPages = [
  sectorenHubPage,
  sectorJuridischPage,
  sectorFinancePage,
  sectorKennisPage,
] as const

export const scanPages = [aiOpportunityScanPage, websiteScanPage] as const

export {
  aiConsultancyPage,
  aiDevelopmentPage,
  aiOpportunityScanPage,
  aiTrainingPage,
  homePage,
  sectorFinancePage,
  sectorJuridischPage,
  sectorKennisPage,
  sectorenHubPage,
  websiteScanPage,
}
export { contactPage } from "@/content/pages/contact"
export { overOnsPage } from "@/content/pages/over-ons"
export {
  algemeneVoorwaardenPage,
  cookiebeleidPage,
  insightsIndexPage,
  privacyPage,
} from "@/content/pages/supporting"
