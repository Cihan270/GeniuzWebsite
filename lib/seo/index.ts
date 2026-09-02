export { assertFase1IaInvariants } from "@/lib/seo/assert-fase1-ia"
export {
  assertFase1ContentGuards,
  assertFase1PublicLinks,
} from "@/lib/seo/assert-fase1-links"
export { getSeoForRoute, getSeoMatrix, pageSeoToMeta } from "@/lib/seo/matrix"
export { buildMetadataFromSeo, buildPageMetadata } from "@/lib/seo/metadata"
export {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
  type ArticleJsonLdInput,
  type BreadcrumbItem,
  type FaqItem,
} from "@/lib/seo/schemas"
