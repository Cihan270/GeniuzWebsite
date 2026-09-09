import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ConsentBanner } from "@/components/consent/consent-banner"
import { CookieConsentProvider } from "@/components/consent/cookie-consent-provider"
import { AnalyticsScripts } from "@/components/consent/analytics-scripts"
import { MarketingScripts } from "@/components/consent/marketing-scripts"
import {
  SiteFooter,
  SiteHeader,
  SkipLink,
} from "@/components/layout"
import { getDictionary, hasDictionary } from "@/lib/dictionaries"
import { enabledLocales, type EnabledLocale } from "@/lib/i18n/config"
import { getSiteUrl, SITE_NAME } from "@/lib/site"

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasDictionary(locale)) {
    return {}
  }

  const dict = await getDictionary(locale)

  // Layout-level defaults only. Page-level SEO (canonical, robots, per-page
  // title/description) comes from each page's own buildPageMetadata — spreading
  // the homepage's metadata here would give every page without its own
  // metadata, including the 404, a canonical pointing at the homepage and a
  // conflicting "index, follow".
  return {
    title: {
      default: dict.meta.defaultTitle,
      template: dict.meta.titleTemplate,
    },
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      siteName: SITE_NAME,
      locale: "nl_NL",
      type: "website",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params

  if (!hasDictionary(localeParam)) {
    notFound()
  }

  const locale = localeParam as EnabledLocale
  const dict = await getDictionary(locale)

  return (
    <CookieConsentProvider locale={locale} dict={dict}>
      <SkipLink dict={dict} />
      <SiteHeader locale={locale} dict={dict} />
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <SiteFooter locale={locale} dict={dict} />
      <ConsentBanner />
      <AnalyticsScripts />
      <MarketingScripts />
    </CookieConsentProvider>
  )
}
