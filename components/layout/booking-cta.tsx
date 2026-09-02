import Link from "next/link"

import { Button } from "@/components/ui/button"
import { navHref, type NavLink } from "@/content/navigation"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type BookingCtaProps = {
  cta: NavLink
  locale: EnabledLocale
  className?: string
  size?: "default" | "sm" | "lg"
}

export function BookingCta({
  cta,
  locale,
  className,
  size = "default",
}: BookingCtaProps) {
  return (
    <Button
      nativeButton={false}
      render={<Link href={navHref(cta.href, locale)} />}
      variant="accent"
      size={size}
      className={cn(className)}
    >
      {cta.label}
    </Button>
  )
}
