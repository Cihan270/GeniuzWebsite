"use client"

import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { useState } from "react"

import { BookingCta } from "@/components/layout/booking-cta"
import { SiteLogo } from "@/components/layout/site-logo"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  navHref,
  type NavItem,
  type SiteNavigation,
} from "@/content/navigation"
import type { Dictionary } from "@/lib/dictionaries"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type MobileNavProps = {
  locale: EnabledLocale
  dict: Dictionary
  navigation: SiteNavigation
  triggerClassName?: string
}

export function MobileNav({
  locale,
  dict,
  navigation,
  triggerClassName,
}: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("lg:hidden", triggerClassName)}
            aria-label={dict.a11y.openMenu}
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
        <SheetHeader className="border-b border-border px-4 py-4">
          <SheetTitle className="sr-only">{dict.a11y.mobileNav}</SheetTitle>
          <SiteLogo locale={locale} dict={dict} />
        </SheetHeader>
        <nav
          className="flex flex-1 flex-col overflow-y-auto px-2 py-2"
          aria-label={dict.a11y.mainNav}
        >
          <Accordion multiple>
            {navigation.primary.map((item) => (
              <MobileNavItem
                key={item.id}
                item={item}
                locale={locale}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </Accordion>
        </nav>
        <div className="mt-auto border-t border-border p-4">
          <BookingCta
            cta={navigation.headerCta}
            locale={locale}
            className="w-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({
  item,
  locale,
  onNavigate,
}: {
  item: NavItem
  locale: EnabledLocale
  onNavigate: () => void
}) {
  if (item.type === "link") {
    return (
      <Link
        href={navHref(item.href, locale)}
        onClick={onNavigate}
        className="hover:bg-muted block rounded-lg px-3 py-3 text-sm font-medium"
      >
        {item.label}
      </Link>
    )
  }

  return (
    <AccordionItem value={item.id} className="border-b-0 px-1">
      <AccordionTrigger className="px-2 text-sm">{item.label}</AccordionTrigger>
      <AccordionContent className="pb-2">
        <ul className="flex flex-col gap-0.5 pl-1">
          {item.items.map((child) => (
            <li key={child.id}>
              <Link
                href={navHref(child.href, locale)}
                onClick={onNavigate}
                className="hover:bg-muted flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <span>{child.label}</span>
                {child.badge ? (
                  <Badge variant="outline">{child.badge}</Badge>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
