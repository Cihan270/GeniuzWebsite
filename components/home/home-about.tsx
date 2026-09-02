import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Section, SectionHeader } from "@/components/marketing"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomeAboutProps = {
  content: HomePageContent["about"]
  locale: EnabledLocale
}

export function HomeAbout({ content, locale }: HomeAboutProps) {
  return (
    <Section theme="canvas" id="over-geniuz">
      <Reveal luxury>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow={content.eyebrow}
            heading={content.heading}
            description={content.body}
            className="md:max-w-2xl"
          />
          <Button
            nativeButton={false}
            render={<Link href={navHref(content.href, locale)} />}
            variant="outline"
            className="shrink-0 self-start md:self-auto"
          >
            Meer over Geniuz
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </Reveal>

      <Stagger luxury className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        {content.founders.map((founder) => (
          <StaggerItem
            luxury
            key={founder.id}
            className="grid grid-cols-[auto_1fr] gap-5 border-t border-border pt-8"
          >
            <div
              aria-hidden
              className="flex size-16 items-center justify-center bg-geniuz-ink text-xs font-medium tracking-[0.14em] text-geniuz-gold-soft uppercase sm:size-20"
            >
              {founder.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-lg">{founder.name}</h3>
              <p className="mt-1 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {founder.role}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{founder.bio}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-8 text-xs text-muted-foreground">
        Portretten volgen — placeholder-initialen tot professionele foto’s
        beschikbaar zijn.
      </p>
    </Section>
  )
}
