import { ServiceHubTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { aiDevelopmentPage } from "@/content/pages/ai-development"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
} from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("ai-development")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function AiDevelopmentPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = aiDevelopmentPage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: content.eyebrow, path: content.path },
          ]),
          ...(content.faq ? [faqJsonLd(content.faq.items)] : []),
        ]}
      />
      <ServiceHubTemplate content={content} locale={locale} />
    </>
  )
}
