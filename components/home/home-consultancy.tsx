import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import {
  ConsultancyProcessVisual,
  Eyebrow,
  Section,
  SectionHeader,
} from "@/components/marketing"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type HomeConsultancyProps = {
  content: HomePageContent["consultancy"]
  locale: EnabledLocale
}

export function HomeConsultancy({ content, locale }: HomeConsultancyProps) {
  return (
    <Section theme="ink" id="consultancy" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_14%,transparent),transparent_70%)]"
      />
      <div aria-hidden className="geniuz-grain absolute inset-0 opacity-25" />

      <div className="relative grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal luxury>
            <SectionHeader
              eyebrow={content.eyebrow}
              heading={content.heading}
              description={content.body}
            />
            <div className="mt-8">
              <Button
                nativeButton={false}
                render={<Link href={navHref(content.href, locale)} />}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent hover:bg-white/5"
              >
                Naar AI Consultancy
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </div>
          </Reveal>

          <Stagger luxury className="mt-14 grid gap-8 sm:grid-cols-2">
            {content.offerings.map((item) => (
              <StaggerItem luxury key={item.id}>
                <div className="h-px w-8 bg-accent" aria-hidden />
                <h3 className="mt-4 text-base font-medium">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.summary}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal luxury>
          <div className="border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
            <Eyebrow>{content.process.eyebrow}</Eyebrow>
            <h3 className="mt-4 text-2xl md:text-3xl">{content.process.heading}</h3>
            <div className="mt-8">
              <ConsultancyProcessVisual className="min-h-[220px]" />
            </div>
            <ol className="mt-10 space-y-0">
              {content.process.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="group grid grid-cols-[auto_1fr] gap-x-5 border-t border-border py-6 first:border-t-0 first:pt-0"
                >
                  <span className="font-mono text-sm text-accent tabular-nums transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
