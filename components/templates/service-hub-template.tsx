import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import type { ReactNode } from "react"

import { FaqAccordion } from "@/components/marketing/faq-accordion"
import { FinalCta } from "@/components/marketing/final-cta"
import {
  ConsultancyProcessVisual,
  DevelopmentSystemsVisual,
  Section,
  SectionHeader,
  TrainingAdoptionVisual,
} from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PageHero } from "@/components/templates/page-hero"
import { Badge } from "@/components/ui/badge"
import { navHref } from "@/content/navigation"
import type { ServiceHubContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type ServiceHubTemplateProps = {
  content: ServiceHubContent
  locale: EnabledLocale
}

function hubVisual(path: string): ReactNode {
  const visualClass = "min-h-[240px] lg:min-h-[min(42vh,320px)]"
  switch (path) {
    case "/ai-consultancy":
      return <ConsultancyProcessVisual className={visualClass} />
    case "/ai-development":
      return <DevelopmentSystemsVisual className={visualClass} />
    case "/ai-training":
      return <TrainingAdoptionVisual className={visualClass} />
    default:
      return <ConsultancyProcessVisual className={visualClass} />
  }
}

export function ServiceHubTemplate({
  content,
  locale,
}: ServiceHubTemplateProps) {
  const [intro, ...restSections] = content.sections

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        variant="premium"
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: content.eyebrow },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        titleAccent={content.h1Accent}
        lead={content.lead}
        primaryCta={content.primaryCta}
        secondaryCta={content.secondaryCta}
        visual={hubVisual(content.path)}
      />

      {intro ? (
        <Section theme="canvas" id={intro.id}>
          <Reveal luxury>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:items-end">
              <SectionHeader
                eyebrow={intro.eyebrow ?? content.eyebrow}
                heading={intro.heading}
                className="max-w-xl"
              />
              <p className="text-lead text-muted-foreground lg:pb-1">
                {intro.body}
              </p>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {restSections.map((section, index) => (
        <Section
          key={section.id}
          theme={index % 2 === 0 ? "surface" : "canvas"}
          id={section.id}
        >
          <Reveal luxury>
            <SectionHeader
              eyebrow={section.eyebrow}
              heading={section.heading}
              description={section.body}
            />
          </Reveal>
        </Section>
      ))}

      <Section
        theme="ink"
        id="aanbod"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 size-[28rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_14%,transparent),transparent_70%)]"
        />
        <div aria-hidden className="geniuz-grain absolute inset-0 opacity-25" />

        <div className="relative">
          <Reveal luxury>
            <SectionHeader
              eyebrow="Aanbod"
              heading={content.offeringsHeading}
              description={content.offeringsDescription}
            />
          </Reveal>

          <Stagger
            luxury
            className="mt-14 grid gap-0 border-t border-border sm:grid-cols-2"
          >
            {content.offerings.map((offering, index) => (
              <StaggerItem
                luxury
                key={offering.id}
                id={offering.anchorId}
                className="group scroll-mt-28 border-b border-border py-9 sm:border-r sm:odd:pr-10 sm:even:border-r-0 sm:even:pl-10 lg:py-11"
              >
                <div className="h-px w-8 bg-accent transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:scale-x-125 origin-left" aria-hidden />
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  {offering.badge ? (
                    <Badge variant="outline">{offering.badge}</Badge>
                  ) : null}
                </div>
                <h3 className="mt-4 text-xl">{offering.title}</h3>
                <p className="mt-3 text-muted-foreground">{offering.summary}</p>
                {offering.body ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {offering.body}
                  </p>
                ) : null}
                {offering.href ? (
                  <Link
                    href={navHref(offering.href, locale)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="home-link-sheen">
                      {offering.badge === "Prototype"
                        ? "Bekijk prototype"
                        : "Meer informatie"}
                    </span>
                    <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ) : null}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {content.process ? (
        <Section theme="surface" id="werkwijze">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal luxury>
              <SectionHeader
                eyebrow={content.process.eyebrow}
                heading={content.process.heading}
                description={content.process.body}
              />
            </Reveal>

            <Reveal luxury>
              <ol className="space-y-0 border-t border-border lg:border-t-0 lg:border-l lg:pl-16">
                {content.process.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className="group grid grid-cols-[auto_1fr] gap-x-5 border-t border-border py-6 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-6"
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
            </Reveal>
          </div>
        </Section>
      ) : null}

      <Section theme="canvas" id="gerelateerd">
        <Reveal luxury>
          <SectionHeader
            eyebrow={content.related.eyebrow}
            heading={content.related.heading}
          />
        </Reveal>
        <Stagger
          luxury
          className="mt-14 grid gap-0 border-t border-border md:grid-cols-3"
        >
          {content.related.items.map((item) => (
            <StaggerItem
              luxury
              key={item.id}
              className="border-b border-border py-8 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <Link
                href={navHref(item.href, locale)}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="h-px w-8 bg-accent" aria-hidden />
                <h3 className="mt-5 text-lg">
                  <span className="home-link-sheen">{item.title}</span>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {item.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium">
                  Bekijk
                  <ArrowUpRightIcon className="size-4 transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {content.faq ? (
        <Section theme="surface" id="faq">
          <Reveal luxury>
            <SectionHeader
              eyebrow={content.faq.eyebrow}
              heading={content.faq.heading}
            />
          </Reveal>
          <div className="mt-10 max-w-3xl">
            <FaqAccordion items={content.faq.items} />
          </div>
        </Section>
      ) : null}

      <FinalCta
        premium
        heading={content.finalCta.heading}
        body={content.finalCta.body}
        cta={content.finalCta.cta}
        locale={locale}
      />
    </main>
  )
}
