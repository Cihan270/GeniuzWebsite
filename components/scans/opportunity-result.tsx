"use client"

import Link from "next/link"
import CountUp from "react-countup"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  opportunityImprovementCategoryCopy,
  opportunityNextStepCopy,
  opportunityOutcomeCopy,
} from "@/content/scans/opportunity"
import { navHref } from "@/content/navigation"
import type { OpportunityResult } from "@/lib/scans/opportunity-scoring"
import type { EnabledLocale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type OpportunityResultSummaryProps = {
  result: OpportunityResult
  unlocked: boolean
  locale: EnabledLocale
  className?: string
}

function formatEuroRange(low: number, high: number): string {
  const fmt = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  })
  return `${fmt.format(low)} – ${fmt.format(high)} per jaar`
}

export function OpportunityResultSummary({
  result,
  unlocked,
  locale,
  className,
}: OpportunityResultSummaryProps) {
  const next = opportunityNextStepCopy[result.recommendedNextStep]

  return (
    <div className={cn("space-y-10", className)}>
      <div className="grid gap-8 border-t border-border pt-8 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-sm text-muted-foreground">
            {opportunityOutcomeCopy.scoreLabel}
          </p>
          <p className="mt-2 font-mono text-5xl tabular-nums tracking-tight text-foreground md:text-6xl">
            <CountUp
              end={result.opportunityScore}
              duration={1.2}
              useEasing
              enableScrollSpy={false}
            />
            <span className="text-2xl text-muted-foreground">/100</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {opportunityOutcomeCopy.weeklyHoursLabel}
            </p>
            {unlocked ? (
              <p className="mt-1 text-2xl tabular-nums">
                ± {result.indicativeWeeklyHours.toLocaleString("nl-NL")} uur
              </p>
            ) : (
              <p className="mt-1 text-muted-foreground">
                Ontgrendel om de urenindicatie te zien.
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {opportunityOutcomeCopy.timeValueLabel}
            </p>
            {unlocked ? (
              <>
                <p className="mt-1 text-2xl tabular-nums">
                  {formatEuroRange(
                    result.annualTimeValueEur.low,
                    result.annualTimeValueEur.high,
                  )}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {opportunityOutcomeCopy.timeValueNote} Uurtariefband €
                  {result.assumptions.hourRateEur.low}–
                  {result.assumptions.hourRateEur.high},{" "}
                  {result.assumptions.workingWeeks} werkweken.
                </p>
              </>
            ) : (
              <p className="mt-1 text-muted-foreground">
                Bandbreedte zichtbaar na ontgrendeling — geen besparing of ROI.
              </p>
            )}
          </div>
        </div>
      </div>

      {unlocked ? (
        <>
          <div>
            <h3 className="text-lg">
              {opportunityOutcomeCopy.categoriesLabel}
            </h3>
            <ul className="mt-4 space-y-0 border-t border-border">
              {result.improvementCategories.map((id) => {
                const copy = opportunityImprovementCategoryCopy[id]
                return (
                  <li
                    key={id}
                    className="border-b border-border py-4 first:pt-4"
                  >
                    <p className="font-medium">{copy.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {copy.body}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground">
              {opportunityOutcomeCopy.nextStepLabel}
            </p>
            <h3 className="mt-2 text-xl">{next.title}</h3>
            <p className="mt-2 max-w-xl text-muted-foreground">{next.body}</p>
            <Button
              nativeButton={false}
              render={<Link href={navHref(next.href, locale)} />}
              variant="accent"
              size="lg"
              className="mt-6"
            >
              {next.cta}
              <ArrowUpRightIcon data-icon="inline-end" />
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}
