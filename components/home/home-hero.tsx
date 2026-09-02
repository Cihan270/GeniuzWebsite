"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { HeroProcessVisual } from "@/components/marketing/hero-process-visual"
import { Container } from "@/components/marketing/container"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { HomePageContent } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"
import {
  heroContainerVariants,
  heroItemVariants,
  heroVisualVariants,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

type HomeHeroProps = {
  hero: HomePageContent["hero"]
  locale: EnabledLocale
  className?: string
}

function splitHeadline(headline: string) {
  const marker = "meetbaar resultaat"
  const idx = headline.toLowerCase().lastIndexOf(marker)
  if (idx === -1) {
    return { lead: headline, accent: null as string | null }
  }
  return {
    lead: headline.slice(0, idx).trimEnd(),
    accent: headline.slice(idx),
  }
}

export function HomeHero({ hero, locale, className }: HomeHeroProps) {
  const reduceMotion = useReducedMotion()
  const { lead, accent } = splitHeadline(hero.headline)

  return (
    <section
      data-slot="home-hero"
      data-section-theme="ink-deep"
      className={cn(
        "relative isolate -mt-16 min-h-[min(100svh,56rem)] overflow-hidden border-b border-border pt-16",
        className
      )}
    >
      {/* Full-bleed atmospheric plane */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_18%,color-mix(in_oklch,var(--geniuz-gold)_26%,transparent),transparent_42%),radial-gradient(ellipse_at_88%_72%,color-mix(in_oklch,var(--geniuz-gold)_12%,transparent),transparent_48%),linear-gradient(165deg,var(--geniuz-ink)_0%,var(--geniuz-ink-deep)_55%,#070b10_100%)]" />
        <div
          className={cn(
            "absolute -left-[20%] top-[-30%] size-[42rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_18%,transparent),transparent_68%)]",
            !reduceMotion && "animate-hero-orb"
          )}
        />
        <div
          className={cn(
            "absolute -right-[10%] bottom-[-25%] size-[36rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_10%,transparent),transparent_70%)]",
            !reduceMotion && "animate-hero-orb-delayed"
          )}
        />
        <div className="geniuz-grain absolute inset-0 opacity-[0.35]" />
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--geniuz-canvas) 1px, transparent 1px), linear-gradient(to bottom, var(--geniuz-canvas) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at 70% 45%, black 10%, transparent 72%)",
          }}
        />
      </div>

      <Container
        size="wide"
        className="relative flex min-h-[min(100svh,56rem)] flex-col justify-center py-16 md:py-20 lg:py-0"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 xl:gap-14">
          <motion.div
            className="max-w-xl"
            variants={heroContainerVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.div variants={heroItemVariants}>
              <Image
                src="/logo/GENIUZ_logo_web_on-dark_1200px.webp"
                alt={hero.brand}
                width={520}
                height={96}
                className="h-12 w-[16.1rem] object-contain object-left sm:h-14 sm:w-[18.75rem] md:h-16 md:w-[21.5rem] lg:h-[4.5rem] lg:w-[24rem]"
                priority
                unoptimized
              />
            </motion.div>

            <motion.div
              aria-hidden
              variants={heroItemVariants}
              className="mt-8 h-px w-16 origin-left bg-accent md:mt-10"
            />

            <motion.h1
              variants={heroItemVariants}
              className="text-display-hero mt-7 text-foreground md:mt-8"
            >
              {lead}
              {accent ? (
                <>
                  {" "}
                  <span className="font-editorial italic text-[color-mix(in_oklch,var(--geniuz-gold-soft)_92%,white)]">
                    {accent}
                  </span>
                </>
              ) : null}
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-lead mt-6 max-w-md text-muted-foreground md:mt-7"
            >
              {hero.subheadline}
            </motion.p>

            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Button
                nativeButton={false}
                render={<Link href={navHref(hero.primaryCta.href, locale)} />}
                variant="accent"
                size="lg"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                nativeButton={false}
                render={<Link href={navHref(hero.secondaryCta.href, locale)} />}
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent text-foreground hover:bg-white/5 hover:text-foreground"
              >
                {hero.secondaryCta.label}
                <ArrowUpRightIcon data-icon="inline-end" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroVisualVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="relative lg:-mr-8 xl:-mr-16"
          >
            <HeroProcessVisual className="min-h-[260px] rounded-none sm:min-h-[300px] lg:min-h-[min(52vh,420px)]" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
