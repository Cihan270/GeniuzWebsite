import { SectorPageTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { sectorJuridischPage } from "@/content/pages/sectors"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("sectoren-juridische-sector")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function SectorJuridischPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = sectorJuridischPage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sectoren", path: "/sectoren" },
            { name: content.eyebrow, path: content.path },
          ]),
        ]}
      />
      <SectorPageTemplate content={content} locale={locale} />
    </>
  )
}
