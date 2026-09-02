import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Section, SectionHeader } from "@/components/marketing"
import type { HomePageContent } from "@/content/pages/types"

type HomePositioningProps = {
  content: HomePageContent["positioning"]
}

export function HomePositioning({ content }: HomePositioningProps) {
  return (
    <Section theme="surface" id="positionering" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--geniuz-gold)_45%,transparent)] to-transparent"
      />

      <Reveal luxury>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="font-editorial text-2xl italic leading-snug text-foreground md:text-3xl lg:text-[2.15rem]">
            {content.strip.map((word, index) => (
              <span key={word}>
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="mx-3 inline-block text-accent md:mx-4"
                  >
                    ·
                  </span>
                ) : null}
                <span className="whitespace-nowrap">{word}</span>
              </span>
            ))}
          </p>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal luxury>
          <SectionHeader
            heading={content.heading}
            description={content.body}
            className="max-w-md"
          />
        </Reveal>

        <Stagger luxury className="grid gap-0 sm:grid-cols-2">
          {content.problems.map((problem, index) => (
            <StaggerItem
              luxury
              key={problem.id}
              className="group border-t border-border py-7 pr-4 transition-colors sm:odd:pr-10 sm:even:pl-10 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(-n+2)]:pt-0"
            >
              <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg transition-colors group-hover:text-[color-mix(in_oklch,var(--foreground),var(--accent)_30%)]">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{problem.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
