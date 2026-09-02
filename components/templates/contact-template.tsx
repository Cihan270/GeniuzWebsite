import { ContactForm } from "@/components/forms/contact-form"
import {
  BrandImage,
  HeroProcessVisual,
  Section,
  SectionHeader,
} from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/templates/page-hero"
import type { ContactPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"

type ContactTemplateProps = {
  content: ContactPageContent
  locale: EnabledLocale
}

export function ContactTemplate({ content, locale }: ContactTemplateProps) {
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
        visual={
          <HeroProcessVisual className="min-h-[240px] lg:min-h-[min(42vh,320px)]" />
        }
      />

      <Section theme="canvas" id="formulier" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-8 size-[24rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_8%,transparent),transparent_70%)]"
        />

        <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <Reveal luxury>
              <SectionHeader
                eyebrow="Formulier"
                heading={content.sections[0]?.heading ?? "Contact"}
                description={content.sections[0]?.body}
              />
            </Reveal>
            <div className="relative mt-10">
              <ContactForm content={content.form} />
            </div>
          </div>

          {content.aside ? (
            <Reveal luxury>
              <aside className="border-t border-border pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <BrandImage
                  imageKey="contact-meeting"
                  variant="editorial"
                  className="mb-8 lg:max-w-none"
                />
                <div className="h-px w-8 bg-accent" aria-hidden />
                <h2 className="mt-6 text-lg">{content.aside.heading}</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {content.aside.body}
                </p>
                <p className="mt-8">
                  <a
                    href={`mailto:${content.aside.emailLabel}`}
                    className="home-link-sheen text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {content.aside.emailLabel}
                  </a>
                </p>
                <p className="mt-10 font-editorial text-lg italic leading-snug text-muted-foreground">
                  Geen pitchdeck-theater — wel een eerlijke inschatting of we
                  kunnen helpen.
                </p>
              </aside>
            </Reveal>
          ) : null}
        </div>
      </Section>
    </main>
  )
}
