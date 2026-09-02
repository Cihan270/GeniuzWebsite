import { ServiceHubTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { aiTrainingPage } from "@/content/pages/ai-training"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
} from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("ai-training")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function AiTrainingPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = aiTrainingPage

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
