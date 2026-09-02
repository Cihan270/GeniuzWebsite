import { EditorialTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { overOnsPage } from "@/content/pages/over-ons"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("over-ons")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function OverOnsPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = overOnsPage

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
      <EditorialTemplate content={content} locale={locale} />
    </>
  )
}
