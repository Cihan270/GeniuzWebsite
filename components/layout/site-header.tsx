"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSyncExternalStore } from "react"

import { BookingCta } from "@/components/layout/booking-cta"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SiteLogo } from "@/components/layout/site-logo"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  getNavigation,
  navHref,
  type NavItem,
  type SiteNavigation,
} from "@/content/navigation"
import type { Dictionary } from "@/lib/dictionaries"
import type { EnabledLocale } from "@/lib/i18n/config"
import { stripLocalePrefix } from "@/lib/i18n/paths"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  locale: EnabledLocale
  dict: Dictionary
  navigation?: SiteNavigation
}

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true })
  return () => window.removeEventListener("scroll", onStoreChange)
}

function getScrollSnapshot() {
  return window.scrollY > 8
}

function getServerScrollSnapshot() {
  return false
}

export function SiteHeader({
  locale,
  dict,
  navigation = getNavigation(locale),
}: SiteHeaderProps) {
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  )
  const isHome = stripLocalePrefix(pathname) === "/"
  const overDarkHero = isHome && !scrolled

  return (
    <header
      data-slot="site-header"
      data-scrolled={scrolled ? "true" : "false"}
      data-over-dark={overDarkHero ? "true" : "false"}
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,color] duration-[var(--duration-base)] ease-[var(--ease-out-quart)]",
        overDarkHero
          ? "border-transparent bg-transparent text-geniuz-canvas"
          : scrolled
            ? "border-border/80 bg-background/95 text-foreground shadow-[0_1px_0_0_var(--border)] backdrop-blur-md"
            : "border-transparent bg-background/80 text-foreground backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <SiteLogo
          locale={locale}
          dict={dict}
          priority
          variant={overDarkHero ? "on-dark" : "default"}
        />

        <nav
          className="ml-2 hidden flex-1 lg:block"
          aria-label={dict.a11y.mainNav}
        >
          <DesktopNav
            items={navigation.primary}
            locale={locale}
            tone={overDarkHero ? "on-dark" : "default"}
          />
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* LanguageSwitcher intentionally not mounted (FEATURE_I18N_UI=false). */}
          <BookingCta
            cta={navigation.headerCta}
            locale={locale}
            className="hidden sm:inline-flex"
            size="sm"
          />
          <MobileNav
            locale={locale}
            dict={dict}
            navigation={navigation}
            triggerClassName={
              overDarkHero
                ? "text-geniuz-canvas hover:bg-white/10 hover:text-geniuz-canvas"
                : undefined
            }
          />
        </div>
      </div>
    </header>
  )
}

function DesktopNav({
  items,
  locale,
  tone = "default",
}: {
  items: readonly NavItem[]
  locale: EnabledLocale
  tone?: "default" | "on-dark"
}) {
  const onDark = tone === "on-dark"

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {items.map((item) =>
          item.type === "link" ? (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink
                render={
                  <Link
                    href={navHref(item.href, locale)}
                    className={cn(
                      "px-2.5 py-1.5",
                      onDark &&
                        "text-geniuz-canvas/85 hover:bg-white/10 hover:text-geniuz-canvas focus:bg-white/10 focus:text-geniuz-canvas"
                    )}
                  />
                }
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger
                className={
                  onDark
                    ? "text-geniuz-canvas/85 hover:bg-white/10 hover:text-geniuz-canvas focus:bg-white/10 data-open:bg-white/10 data-popup-open:bg-white/10"
                    : undefined
                }
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(100vw-2rem,18rem)] gap-0.5 p-1">
                  {item.items.map((child) => (
                    <li key={child.id}>
                      <NavigationMenuLink
                        render={
                          <Link
                            href={navHref(child.href, locale)}
                            className="flex w-full items-center justify-between gap-2"
                          />
                        }
                      >
                        <span>{child.label}</span>
                        {child.badge ? (
                          <Badge variant="outline">{child.badge}</Badge>
                        ) : null}
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
