import { Reveal } from "@/components/motion/reveal"
import { FaqAccordion } from "@/components/marketing/faq-accordion"
import { Section, SectionHeader } from "@/components/marketing"
import type { HomePageContent } from "@/content/pages/types"

type HomeFaqProps = {
  content: HomePageContent["faq"]
}

export function HomeFaq({ content }: HomeFaqProps) {
  return (
    <Section theme="canvas" id="faq" containerSize="narrow">
      <Reveal luxury>
        <SectionHeader
          eyebrow={content.eyebrow}
          heading={content.heading}
          align="center"
          className="mb-10"
        />
      </Reveal>
      <Reveal luxury>
        <FaqAccordion items={content.items} />
      </Reveal>
    </Section>
  )
}
