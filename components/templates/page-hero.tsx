"use client"

import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

import { Container } from "@/components/marketing/container"
import { Eyebrow } from "@/components/marketing/eyebrow"
import { PageBreadcrumbs, type PageBreadcrumbItem } from "@/components/templates/page-breadcrumbs"
import { Button } from "@/components/ui/button"
import { navHref } from "@/content/navigation"
import type { PageCta } from "@/content/pages/types"
import type { EnabledLocale } from "@/lib/i18n/config"
import {
  heroContainerVariants,
  heroItemVariants,
  heroVisualVariants,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

type PageHeroProps = {
  locale: EnabledLocale
  breadcrumbs: readonly PageBreadcrumbItem[]
  eyebrow: string
  title: string
  /** Phrase within `title` rendered as editorial gold italic (premium). */
  titleAccent?: string
  lead: string
  primaryCta?: PageCta
  secondaryCta?: PageCta
  children?: ReactNode
  /** Optional diagram / process visual — shown beside copy on premium heroes. */
  visual?: ReactNode
  className?: string
  /** Ink-deep atmosphere + cinematic entrance — service hubs & key conversion pages. */
  variant?: "default" | "premium"
}

function splitTitleAccent(title: string, accent?: string) {
  if (!accent) {
    return { lead: title, accent: null as string | null }
  }
  const idx = title.toLowerCase().lastIndexOf(accent.toLowerCase())
  if (idx === -1) {
    return { lead: title, accent: null as string | null }
  }
  return {
    lead: title.slice(0, idx).trimEnd(),
    accent: title.slice(idx),
  }
}

export function PageHero({
  locale,
  breadcrumbs,
  eyebrow,
  title,
  titleAccent,
  lead,
  primaryCta,
  secondaryCta,
  children,
  visual,
  className,
  variant = "default",
}: PageHeroProps) {
  const premium = variant === "premium"
  const reduceMotion = useReducedMotion()
  const { lead: titleLead, accent } = splitTitleAccent(title, titleAccent)

  if (!premium) {
    return (
      <section
        data-slot="page-hero"
        data-section-theme="canvas"
        className={cn(
          "relative isolate overflow-hidden border-b border-border",
          className
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,color-mix(in_oklch,var(--geniuz-gold)_18%,transparent),transparent_45%),linear-gradient(180deg,var(--geniuz-canvas)_0%,color-mix(in_oklch,var(--geniuz-surface)_55%,var(--geniuz-canvas))_100%)]"
        />

        <Container size="default" className="relative py-12 md:py-16 lg:py-20">
          <PageBreadcrumbs items={breadcrumbs} locale={locale} />

          <div className="mt-8 max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance">{title}</h1>
            <p className="text-lead mt-5 text-muted-foreground">{lead}</p>

            {primaryCta || secondaryCta ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta ? (
                  <Button
                    nativeButton={false}
                    render={<Link href={navHref(primaryCta.href, locale)} />}
                    variant="accent"
                    size="lg"
                  >
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button
                    nativeButton={false}
                    render={<Link href={navHref(secondaryCta.href, locale)} />}
                    variant="outline"
                    size="lg"
                  >
                    {secondaryCta.label}
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                ) : null}
              </div>
            ) : null}

            {children}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      data-slot="page-hero"
      data-section-theme="ink-deep"
      className={cn(
        "relative isolate -mt-16 overflow-hidden border-b border-border pt-16",
        className
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_14%_12%,color-mix(in_oklch,var(--geniuz-gold)_24%,transparent),transparent_42%),radial-gradient(ellipse_at_92%_78%,color-mix(in_oklch,var(--geniuz-gold)_10%,transparent),transparent_48%),linear-gradient(165deg,var(--geniuz-ink)_0%,var(--geniuz-ink-deep)_55%,#070b10_100%)]" />
        <div
          className={cn(
            "absolute -left-[18%] top-[-28%] size-[36rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_16%,transparent),transparent_68%)]",
            !reduceMotion && "animate-hero-orb"
          )}
        />
        <div
          className={cn(
            "absolute -right-[12%] bottom-[-30%] size-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--geniuz-gold)_9%,transparent),transparent_70%)]",
            !reduceMotion && "animate-hero-orb-delayed"
          )}
        />
        <div className="geniuz-grain absolute inset-0 opacity-[0.32]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--geniuz-canvas) 1px, transparent 1px), linear-gradient(to bottom, var(--geniuz-canvas) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at 40% 50%, black 8%, transparent 70%)",
          }}
        />
      </div>

      <Container
        size={visual ? "wide" : "default"}
        className="relative py-14 md:py-20 lg:py-24"
      >
        <div
          className={cn(
            visual &&
              "grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14"
          )}
        >
          <motion.div
            variants={heroContainerVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            <motion.div variants={heroItemVariants}>
              <PageBreadcrumbs items={breadcrumbs} locale={locale} />
            </motion.div>

            <div className="mt-10 max-w-3xl md:mt-12">
              <motion.div variants={heroItemVariants}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </motion.div>

              <motion.div
                aria-hidden
                variants={heroItemVariants}
                className="mt-7 h-px w-14 origin-left bg-accent md:mt-8"
              />

              <motion.h1
                variants={heroItemVariants}
                className="text-display mt-6 text-foreground md:mt-7"
              >
                {titleLead}
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
                className="text-lead mt-6 max-w-xl text-muted-foreground md:mt-7"
              >
                {lead}
              </motion.p>

              {primaryCta || secondaryCta ? (
                <motion.div
                  variants={heroItemVariants}
                  className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                >
                  {primaryCta ? (
                    <Button
                      nativeButton={false}
                      render={<Link href={navHref(primaryCta.href, locale)} />}
                      variant="accent"
                      size="lg"
                    >
                      {primaryCta.label}
                    </Button>
                  ) : null}
                  {secondaryCta ? (
                    <Button
                      nativeButton={false}
                      render={
                        <Link href={navHref(secondaryCta.href, locale)} />
                      }
                      variant="outline"
                      size="lg"
                      className="border-white/20 bg-transparent text-foreground hover:bg-white/5 hover:text-foreground"
                    >
                      {secondaryCta.label}
                      <ArrowUpRightIcon data-icon="inline-end" />
                    </Button>
                  ) : null}
                </motion.div>
              ) : null}

              {children ? (
                <motion.div variants={heroItemVariants} className="mt-10">
                  {children}
                </motion.div>
              ) : null}
            </div>
          </motion.div>

          {visual ? (
            <motion.div
              variants={heroVisualVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="relative lg:-mr-4 xl:-mr-10"
            >
              {visual}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
