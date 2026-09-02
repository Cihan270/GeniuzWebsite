import { SectorHubTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { sectorenHubPage } from "@/content/pages/sectors"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("sectoren")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function SectorenHubPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = sectorenHubPage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sectoren", path: content.path },
          ]),
        ]}
      />
      <SectorHubTemplate content={content} locale={locale} />
    </>
  )
}
