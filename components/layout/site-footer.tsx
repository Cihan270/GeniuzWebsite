import Link from "next/link"

import { CookiePreferencesTrigger } from "@/components/consent/cookie-preferences-trigger"
import { Container } from "@/components/marketing"
import { SiteLogo } from "@/components/layout/site-logo"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  getNavigation,
  navHref,
  type NavLink,
  type SiteNavigation,
} from "@/content/navigation"
import type { Dictionary } from "@/lib/dictionaries"
import type { EnabledLocale } from "@/lib/i18n/config"
import { ORGANIZATION } from "@/lib/site"

type SiteFooterProps = {
  locale: EnabledLocale
  dict: Dictionary
  navigation?: SiteNavigation
}

export function SiteFooter({
  locale,
  dict,
  navigation = getNavigation(locale),
}: SiteFooterProps) {
  const year = new Date().getFullYear()
  const { footer } = navigation

  return (
    <footer
      data-slot="site-footer"
      className="mt-auto border-t border-border bg-geniuz-ink-deep text-geniuz-white"
    >
      <Container size="wide" className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-sm">
            <SiteLogo
              locale={locale}
              dict={dict}
              variant="on-dark"
              className="hover:opacity-90"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              {dict.footer.tagline}
            </p>
          </div>

          <FooterColumn
            title={dict.footer.diensten}
            links={footer.diensten}
            locale={locale}
          />
          <FooterColumn
            title={dict.footer.oplossingen}
            links={footer.oplossingen}
            locale={locale}
          />
          <FooterColumn
            title={dict.footer.sectoren}
            links={footer.sectoren}
            locale={locale}
          />
          <FooterColumn
            title={dict.footer.bedrijf}
            links={footer.bedrijf}
            locale={locale}
          />
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {year} {ORGANIZATION.name}. {dict.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footer.legal.flatMap((link) => {
              const items = [
                <li key={link.id}>
                  <Link
                    href={navHref(link.href, locale)}
                    className="text-xs text-white/55 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>,
              ]

              if (link.id === "f-cookies") {
                items.push(
                  <li key="cookie-preferences">
                    <CookiePreferencesTrigger />
                  </li>,
                )
              }

              return items
            })}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
  locale,
}: {
  title: string
  links: readonly NavLink[]
  locale: EnabledLocale
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-wide text-white/80 uppercase">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={navHref(link.href, locale)}
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span>{link.label}</span>
              {link.badge ? (
                <Badge
                  variant="outline"
                  className="border-white/25 text-[10px] text-white/70"
                >
                  {link.badge}
                </Badge>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
