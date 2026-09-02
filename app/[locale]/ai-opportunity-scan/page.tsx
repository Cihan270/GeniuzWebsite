import { OpportunityScanFlow } from "@/components/scans/opportunity-scan-flow"
import { ScanFlowTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { aiOpportunityScanPage } from "@/content/pages/ai-opportunity-scan"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("ai-opportunity-scan")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function AiOpportunityScanPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = aiOpportunityScanPage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: content.eyebrow, path: content.path },
          ]),
        ]}
      />
      <ScanFlowTemplate
        content={content}
        locale={locale}
        scan={<OpportunityScanFlow locale={locale} />}
      />
    </>
  )
}
