import Image from "next/image"
import Link from "next/link"

import type { Dictionary } from "@/lib/dictionaries"
import { localePath } from "@/lib/i18n/paths"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

const LOGO = {
  default: "/logo/GENIUZ_logo_web_transparant_1200px.webp",
  onDark: "/logo/GENIUZ_logo_web_on-dark_1200px.webp",
} as const

/** Intrinsic size of the source assets (1200×224). */
const LOGO_WIDTH = 180
const LOGO_HEIGHT = 34

type SiteLogoProps = {
  locale: EnabledLocale
  dict: Dictionary
  className?: string
  /** Use the light wordmark on dark surfaces (footer, ink sections). */
  variant?: "default" | "on-dark"
  priority?: boolean
}

export function SiteLogo({
  locale,
  dict,
  className,
  variant = "default",
  priority = false,
}: SiteLogoProps) {
  return (
    <Link
      href={localePath("/", locale)}
      className={cn(
        "inline-flex h-8 shrink-0 items-center transition-opacity hover:opacity-80",
        className
      )}
      aria-label={dict.brand.homeAriaLabel}
    >
      <Image
        src={variant === "on-dark" ? LOGO.onDark : LOGO.default}
        alt={dict.brand.name}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className="h-7 w-[9.375rem] object-contain object-left sm:h-8 sm:w-[11.25rem]"
        priority={priority}
        unoptimized
      />
    </Link>
  )
}
