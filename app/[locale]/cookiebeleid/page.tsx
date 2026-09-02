import { LegalTemplate } from "@/components/templates"
import { StructuredData } from "@/components/seo/structured-data"
import { cookiebeleidPage } from "@/content/pages/supporting"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("cookiebeleid")

type PageProps = {
  params: Promise<{ locale: string }>
}

export default async function CookiebeleidPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = cookiebeleidPage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: content.h1, path: content.path },
          ]),
        ]}
      />
      <LegalTemplate content={content} locale={locale} />
    </>
  )
}
