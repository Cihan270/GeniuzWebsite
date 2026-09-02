import {
  HomeAbout,
  HomeConsultancy,
  HomeDevelopment,
  HomeFaq,
  HomeHero,
  HomeInsights,
  HomeOpportunityScan,
  HomePillars,
  HomePositioning,
  HomeSectors,
} from "@/components/home"
import { FinalCta } from "@/components/marketing"
import { StructuredData } from "@/components/seo/structured-data"
import { homePage } from "@/content/pages/home"
import type { EnabledLocale } from "@/lib/i18n/config"
import { buildPageMetadata } from "@/lib/seo/metadata"
import {
  faqJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo/schemas"

export const metadata = buildPageMetadata("home")

type HomePageProps = {
  params: Promise<{ locale: string }>
}

/**
 * Fase 4 homepage — vereenvoudigde wireframe.
 * Website Scan alleen compact in Development + oplossingen (geen aparte sectie).
 */
export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as EnabledLocale
  const content = homePage

  return (
    <>
      <StructuredData
        data={[
          organizationJsonLd(),
          webSiteJsonLd(),
          faqJsonLd(content.faq.items),
        ]}
      />

      <main className="flex flex-1 flex-col">
        <HomeHero hero={content.hero} locale={locale} />
        <HomePositioning content={content.positioning} />
        <HomePillars content={content.pillars} locale={locale} />
        <HomeConsultancy content={content.consultancy} locale={locale} />
        <HomeDevelopment content={content.development} locale={locale} />
        <HomeSectors content={content.sectors} locale={locale} />
        <HomeOpportunityScan
          content={content.opportunityScan}
          locale={locale}
        />
        <HomeAbout content={content.about} locale={locale} />
        <HomeInsights content={content.insights} locale={locale} />
        <HomeFaq content={content.faq} />
        <FinalCta
          heading={content.finalCta.heading}
          body={content.finalCta.body}
          cta={content.finalCta.cta}
          locale={locale}
          premium
        />
      </main>
    </>
  )
}
