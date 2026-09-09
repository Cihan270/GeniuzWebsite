import { Container } from "@/components/marketing/container"
import { Section, SectionHeader } from "@/components/marketing"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/templates/page-hero"
import type { LegalPageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"
import { LEGAL_IDENTITY } from "@/lib/site"

type LegalTemplateProps = {
  content: LegalPageContent
  locale: EnabledLocale
}

const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

function formatLastUpdated(iso: string): string {
  const parsed = new Date(iso)
  return Number.isNaN(parsed.getTime()) ? iso : dateFormatter.format(parsed)
}

/** Statutory identification — art. 3:15d BW requires this on a commercial site. */
function IdentityBlock() {
  const addressLines = [LEGAL_IDENTITY.street, LEGAL_IDENTITY.city].filter(
    (line) => line.trim() !== "",
  )

  return (
    <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-[15rem_1fr]">
      <dt className="text-muted-foreground">Verwerkingsverantwoordelijke</dt>
      <dd>{LEGAL_IDENTITY.legalName}</dd>

      {addressLines.length > 0 ? (
        <>
          <dt className="text-muted-foreground">Vestigingsadres</dt>
          <dd>
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </>
      ) : null}

      {LEGAL_IDENTITY.kvk ? (
        <>
          <dt className="text-muted-foreground">KvK-nummer</dt>
          <dd>{LEGAL_IDENTITY.kvk}</dd>
        </>
      ) : null}

      {LEGAL_IDENTITY.vat ? (
        <>
          <dt className="text-muted-foreground">Btw-nummer</dt>
          <dd>{LEGAL_IDENTITY.vat}</dd>
        </>
      ) : null}

      <dt className="text-muted-foreground">E-mail</dt>
      <dd>
        <a className="underline underline-offset-4" href={`mailto:${LEGAL_IDENTITY.email}`}>
          {LEGAL_IDENTITY.email}
        </a>
      </dd>
    </dl>
  )
}

/**
 * Legal document template. Draft pages surface the concept banner; published
 * pages render the identity block and the last-updated date instead.
 */
export function LegalTemplate({ content, locale }: LegalTemplateProps) {
  const isDraft = content.legalStatus === "draft_legal_review"

  return (
    <main className="flex flex-1 flex-col">
      {isDraft && content.conceptBanner ? (
        <div
          role="status"
          className="border-b border-border bg-[color-mix(in_oklch,var(--geniuz-gold)_12%,var(--geniuz-canvas))]"
        >
          <Container size="default" className="py-3">
            <p className="text-sm font-medium text-foreground">
              {content.conceptBanner}
            </p>
          </Container>
        </div>
      ) : null}

      <PageHero
        locale={locale}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: content.h1 },
        ]}
        eyebrow={content.eyebrow}
        title={content.h1}
        lead={content.lead}
      />

      {content.lastUpdated || content.showIdentity ? (
        <Container size="default" className="pb-4">
          <Reveal className="max-w-3xl border-t border-border pt-8">
            {content.lastUpdated ? (
              <p className="text-xs tracking-[0.12em] text-muted-foreground uppercase">
                Laatst bijgewerkt op{" "}
                <time dateTime={content.lastUpdated}>
                  {formatLastUpdated(content.lastUpdated)}
                </time>
              </p>
            ) : null}
            {content.showIdentity ? (
              <div className="mt-6">
                <IdentityBlock />
              </div>
            ) : null}
          </Reveal>
        </Container>
      ) : null}

      {content.sections.map((section, index) => (
        <Section
          key={section.id}
          theme={index % 2 === 0 ? "canvas" : "surface"}
          id={section.id}
        >
          <Reveal>
            <SectionHeader
              heading={section.heading}
              description={section.body}
            />
            {section.items ? (
              <ul className="text-lead mt-6 max-w-3xl space-y-3 text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-geniuz-gold">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        </Section>
      ))}
    </main>
  )
}
