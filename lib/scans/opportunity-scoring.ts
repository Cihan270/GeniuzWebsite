/**
 * AI Opportunity Scan scoring.
 *
 * indicativeWeeklyHours =
 *   totalProcessHoursPerWeek × repetitiveShare × automatableShare
 *   × (1 − requiredHumanOversightFactor)
 *
 * Annual time-value is always a range (hour-rate band × complexity correction).
 * Language: “indicatieve potentiële tijdswaarde” — never “besparing” / “ROI”.
 */

import {
  opportunityImprovementCategories,
  type OpportunityInputFieldId,
} from "@/content/scans/opportunity"

/** Assumed knowledge-work hour-rate band (EUR). Documented assumption, not a quote. */
export const OPPORTUNITY_HOUR_RATE_EUR = {
  low: 55,
  high: 95,
} as const

/** Working weeks used for annualisation. */
export const OPPORTUNITY_WORKING_WEEKS = 46

export type OpportunityInputs = {
  totalProcessHoursPerWeek: number
  involvedEmployees: number
  /** 0–100 */
  repetitiveShare: number
  /** 0–100 */
  automatableShare: number
  /** 1–5 (low → high oversight) */
  requiredHumanOversight: number
  /** 1–5 (low → high complexity) */
  implementationComplexity: number
}

export type ImprovementCategoryId =
  (typeof opportunityImprovementCategories)[number]

export type OpportunityResult = {
  opportunityScore: number
  indicativeWeeklyHours: number
  /** Annual EUR band — indicative time value only. */
  annualTimeValueEur: {
    low: number
    high: number
  }
  improvementCategories: readonly ImprovementCategoryId[]
  recommendedNextStep: "adviesgesprek" | "procesverdieping" | "website-scan"
  assumptions: {
    hourRateEur: typeof OPPORTUNITY_HOUR_RATE_EUR
    workingWeeks: number
    oversightFactor: number
    complexityCorrection: number
  }
}

/** Map oversight scale 1–5 → fraction of hours that remain human-bound. */
export function oversightFactorFromScale(scale: number): number {
  const clamped = clamp(scale, 1, 5)
  const map = [0.1, 0.25, 0.4, 0.55, 0.7] as const
  return map[Math.round(clamped) - 1] ?? 0.4
}

/**
 * Higher complexity → lower mid estimate (more friction / less of the
 * theoretical hours materialise without further work).
 */
export function complexityCorrectionFromScale(scale: number): number {
  const clamped = clamp(scale, 1, 5)
  const map = [1, 0.9, 0.78, 0.66, 0.55] as const
  return map[Math.round(clamped) - 1] ?? 0.78
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

function roundTo(n: number, decimals = 1): number {
  const f = 10 ** decimals
  return Math.round(n * f) / f
}

function roundEuro(n: number): number {
  if (n < 1000) return Math.round(n / 50) * 50
  if (n < 10_000) return Math.round(n / 100) * 100
  return Math.round(n / 500) * 500
}

function toShare(percent: number): number {
  return clamp(percent, 0, 100) / 100
}

/**
 * Volume context: very small processes score lower even if highly automatable;
 * large processes approach full potential weight.
 */
function volumeFactor(hours: number, employees: number): number {
  const weight = hours * Math.sqrt(Math.max(employees, 1))
  // ~5h·√1 → ~0.45; ~40h·√3 → ~0.9; saturates near 1
  return clamp(0.35 + Math.log10(weight + 1) * 0.35, 0.4, 1)
}

export function selectImprovementCategories(
  inputs: OpportunityInputs,
): ImprovementCategoryId[] {
  const selected: ImprovementCategoryId[] = []
  const repetitive = toShare(inputs.repetitiveShare)
  const automatable = toShare(inputs.automatableShare)
  const oversight = oversightFactorFromScale(inputs.requiredHumanOversight)
  const complexity = inputs.implementationComplexity

  if (repetitive >= 0.55 && automatable >= 0.45) {
    selected.push("automatisering")
  }
  if (automatable >= 0.35 && oversight >= 0.35 && oversight <= 0.6) {
    selected.push("agent-ondersteuning")
  }
  if (complexity >= 3 && automatable >= 0.3) {
    selected.push("integratie")
  }
  if (oversight >= 0.45 || complexity >= 4) {
    selected.push("training-adoptie")
  }
  if (selected.length === 0 || (automatable < 0.35 && complexity >= 3)) {
    selected.push("nader-onderzoek")
  }

  // Stable unique order matching content catalogue
  return opportunityImprovementCategories.filter((id) =>
    selected.includes(id),
  ) as ImprovementCategoryId[]
}

export function recommendNextStep(
  result: Pick<OpportunityResult, "opportunityScore" | "improvementCategories">,
): OpportunityResult["recommendedNextStep"] {
  if (result.opportunityScore >= 55) return "adviesgesprek"
  if (result.improvementCategories.includes("nader-onderzoek")) {
    return "procesverdieping"
  }
  if (result.opportunityScore < 35) return "procesverdieping"
  return "adviesgesprek"
}

export function calculateOpportunity(
  inputs: OpportunityInputs,
): OpportunityResult {
  const repetitiveShare = toShare(inputs.repetitiveShare)
  const automatableShare = toShare(inputs.automatableShare)
  const oversightFactor = oversightFactorFromScale(
    inputs.requiredHumanOversight,
  )
  const complexityCorrection = complexityCorrectionFromScale(
    inputs.implementationComplexity,
  )

  const indicativeWeeklyHours = roundTo(
    inputs.totalProcessHoursPerWeek *
      repetitiveShare *
      automatableShare *
      (1 - oversightFactor),
    1,
  )

  const annualHours =
    indicativeWeeklyHours * OPPORTUNITY_WORKING_WEEKS * complexityCorrection

  // Mild headcount context: more people → slightly wider uncertainty band
  const headcountWiden =
    1 + clamp((inputs.involvedEmployees - 1) * 0.02, 0, 0.15)

  const annualTimeValueEur = {
    low: roundEuro(
      (annualHours * OPPORTUNITY_HOUR_RATE_EUR.low) / headcountWiden,
    ),
    high: roundEuro(
      annualHours * OPPORTUNITY_HOUR_RATE_EUR.high * headcountWiden,
    ),
  }

  const potential =
    repetitiveShare * automatableShare * (1 - oversightFactor)
  const score = Math.round(
    clamp(
      potential *
        complexityCorrection *
        volumeFactor(
          inputs.totalProcessHoursPerWeek,
          inputs.involvedEmployees,
        ) *
        100,
      0,
      100,
    ),
  )

  const improvementCategories = selectImprovementCategories(inputs)
  const recommendedNextStep = recommendNextStep({
    opportunityScore: score,
    improvementCategories,
  })

  return {
    opportunityScore: score,
    indicativeWeeklyHours,
    annualTimeValueEur,
    improvementCategories,
    recommendedNextStep,
    assumptions: {
      hourRateEur: OPPORTUNITY_HOUR_RATE_EUR,
      workingWeeks: OPPORTUNITY_WORKING_WEEKS,
      oversightFactor,
      complexityCorrection,
    },
  }
}

export const opportunityInputKeys = [
  "totalProcessHoursPerWeek",
  "involvedEmployees",
  "repetitiveShare",
  "automatableShare",
  "requiredHumanOversight",
  "implementationComplexity",
] as const satisfies readonly OpportunityInputFieldId[]
