import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Container } from "@/components/marketing/container"
import { Eyebrow } from "@/components/marketing/eyebrow"
import { Section } from "@/components/marketing/section"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import { notFoundPage } from "@/content/pages"
import { defaultLocale, type EnabledLocale } from "@/lib/i18n/config"

type NotFoundTemplateProps = {
  locale?: EnabledLocale
}

/**
 * Branded 404. Keeps a dead end useful by routing to the pages a lost visitor
 * most likely wanted.
 */
export function NotFoundTemplate({
  locale = defaultLocale,
}: NotFoundTemplateProps) {
  const content = notFoundPage

  return (
    <main className="flex flex-1 flex-col">
      <Container size="default" className="py-20 md:py-28 lg:py-32">
        <Reveal luxury className="max-w-2xl">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance">{content.h1}</h1>
          <p className="text-lead mt-5 text-muted-foreground">{content.lead}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href={navHref(content.primaryCta.href, locale)} />}
              variant="accent"
              size="lg"
            >
              {content.primaryCta.label}
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={navHref(content.secondaryCta.href, locale)} />}
              variant="outline"
              size="lg"
            >
              {content.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>

      <Section theme="surface">
        <Reveal>
          <h2 className="text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {content.destinationsHeading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.destinations.map((destination) => (
            <li key={destination.id}>
              <Reveal className="h-full border-t border-border pt-6">
                <Link
                  href={navHref(destination.href, locale)}
                  className="group focus-visible:ring-ring/50 flex flex-col gap-2 rounded-sm outline-none focus-visible:ring-3"
                >
                  <span className="flex items-center gap-1.5 text-lg">
                    {destination.title}
                    <ArrowUpRightIcon
                      aria-hidden="true"
                      className="text-muted-foreground size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {destination.summary}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </main>
  )
}
