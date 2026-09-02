import { FinalCta } from "@/components/marketing/final-cta"
import { BrandImage, PillarsVisual, Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { PageHero } from "@/components/templates/page-hero"
import type { EditorialPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type EditorialTemplateProps = {
  content: EditorialPageContent
  locale: EnabledLocale
}

export function EditorialTemplate({
  content,
  locale,
}: EditorialTemplateProps) {
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
        primaryCta={content.finalCta.cta}
        visual={
          <PillarsVisual className="min-h-[240px] lg:min-h-[min(42vh,320px)]" />
        }
      />

      {intro ? (
        <Section theme="canvas" id={intro.id}>
          <Reveal luxury>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end lg:gap-12">
              <SectionHeader
                eyebrow={intro.eyebrow ?? content.eyebrow}
                heading={intro.heading}
                className="max-w-xl"
              />
              <p className="text-lead text-muted-foreground lg:pb-1">
                {intro.body}
              </p>
              <BrandImage
                imageKey="editorial-workspace"
                variant="editorial"
                className="lg:justify-self-end"
              />
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

      {content.principles ? (
        <Section
          theme="ink"
          id="werkwijze"
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
                eyebrow={content.principles.eyebrow}
                heading={content.principles.heading}
              />
            </Reveal>
            <Stagger
              luxury
              className="mt-14 grid gap-0 border-t border-border md:grid-cols-3"
            >
              {content.principles.items.map((item, index) => (
                <StaggerItem
                  luxury
                  key={item.id}
                  className="group border-b border-border py-9 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                >
                  <p className="font-mono text-xs tracking-[0.14em] text-accent tabular-nums uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div
                    className="mt-5 h-px w-8 bg-accent transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-quart)] group-hover:scale-x-125 origin-left"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-lg">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{item.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Section>
      ) : null}

      {content.team ? (
        <Section theme="surface" id="team">
          <Reveal luxury>
            <SectionHeader
              eyebrow={content.team.eyebrow}
              heading={content.team.heading}
              description={content.team.body}
            />
          </Reveal>
          <Stagger luxury className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            {content.team.members.map((member) => (
              <StaggerItem
                luxury
                key={member.id}
                className="grid grid-cols-[auto_1fr] gap-5 border-t border-border pt-8"
              >
                <div
                  aria-hidden
                  className="flex size-16 items-center justify-center bg-geniuz-ink text-xs font-medium tracking-[0.14em] text-geniuz-gold-soft uppercase sm:size-20"
                >
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg">{member.name}</h3>
                  <p className="mt-1 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-xs text-muted-foreground">
            {content.team.portraitNote}
          </p>
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
