import { InsightsIndexTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { getPublishedInsights } from "@/content/insights"
import { insightsIndexPage } from "@/content/pages/supporting"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("insights")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function InsightsPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = insightsIndexPage
  const articles = getPublishedInsights()

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
      <InsightsIndexTemplate
        content={content}
        locale={locale}
        articles={articles}
      />
    </>
  )
}
