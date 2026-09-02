import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/marketing/section"
import { navHref } from "@/content/navigation"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type FinalCtaProps = {
  heading: string
  body: string
  cta: { label: string; href: string }
  locale: EnabledLocale
  className?: string
  /** Stronger atmosphere + motion for homepage. */
  premium?: boolean
}

export function FinalCta({
  heading,
  body,
  cta,
  locale,
  className,
  premium = false,
}: FinalCtaProps) {
  return (
    <Section
      theme="ink-deep"
      className={cn("relative overflow-hidden", className)}
    >
      {premium ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,var(--geniuz-gold)_22%,transparent),transparent_55%)]"
          />
          <div aria-hidden className="geniuz-grain absolute inset-0 opacity-30" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--geniuz-gold)_50%,transparent)] to-transparent"
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-2xl text-center">
        {premium ? (
          <Reveal luxury>
            <h2 className="text-balance text-display">{heading}</h2>
            <p className="text-lead mt-6 text-muted-foreground">{body}</p>
            <div className="mt-11">
              <Button
                nativeButton={false}
                render={<Link href={navHref(cta.href, locale)} />}
                variant="accent"
                size="lg"
              >
                {cta.label}
              </Button>
            </div>
          </Reveal>
        ) : (
          <>
            <h2 className="text-balance">{heading}</h2>
            <p className="text-lead mt-5 text-muted-foreground">{body}</p>
            <div className="mt-10">
              <Button
                nativeButton={false}
                render={<Link href={navHref(cta.href, locale)} />}
                variant="accent"
                size="lg"
              >
                {cta.label}
              </Button>
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
