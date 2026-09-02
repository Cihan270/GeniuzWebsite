import { WebsiteScanFlow } from "@/components/scans/website-scan-flow"
import { ScanFlowTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { websiteScanPage } from "@/content/pages/website-scan"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("website-scan")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function WebsiteScanPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = websiteScanPage

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
        scan={<WebsiteScanFlow />}
      />
    </>
  )
}
