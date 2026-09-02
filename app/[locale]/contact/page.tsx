import { ContactTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { contactPage } from "@/content/pages/contact"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("contact")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = contactPage

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
      <ContactTemplate content={content} locale={locale} />
    </>
  )
}
