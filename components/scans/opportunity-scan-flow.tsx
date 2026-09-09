"use client"

import { useState, useSyncExternalStore } from "react"
import { Controller, useForm } from "react-hook-form"

import { OpportunityLeadGate } from "@/components/scans/opportunity-lead-gate"
import { OpportunityResultSummary } from "@/components/scans/opportunity-result"
import { ScanStepIndicator } from "@/components/scans/scan-step-indicator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  getOpportunityField,
  opportunityOutcomeCopy,
  opportunityScaleOptions,
  opportunitySteps,
} from "@/content/scans/opportunity"
import {
  calculateOpportunity,
  clearOpportunityScan,
  createEmptyOpportunityPersisted,
  OPPORTUNITY_SCAN_STORAGE_KEY,
  readOpportunityScan,
  writeOpportunityScan,
  type OpportunityInputs,
  type OpportunityScanPersisted,
} from "@/lib/scans"
import type { EnabledLocale } from "@/lib/i18n/config"
import {
  fieldErrorsFromZod,
  opportunityInputsSchema,
  opportunityStepSchemas,
  type OpportunityStepId,
} from "@/lib/validations/opportunity-scan"
import { cn } from "@/lib/utils"

type OpportunityScanFlowProps = {
  locale: EnabledLocale
  className?: string
}

type FormValues = {
  totalProcessHoursPerWeek: string
  involvedEmployees: string
  repetitiveShare: string
  automatableShare: string
  requiredHumanOversight: string
  implementationComplexity: string
}

const emptyForm: FormValues = {
  totalProcessHoursPerWeek: "",
  involvedEmployees: "",
  repetitiveShare: "",
  automatableShare: "",
  requiredHumanOversight: "",
  implementationComplexity: "",
}

const SCAN_STORE_EVENT = "geniuz-opportunity-scan-change"

function subscribeScanStore(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(SCAN_STORE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(SCAN_STORE_EVENT, onStoreChange)
  }
}

/**
 * useSyncExternalStore compares snapshots with Object.is, so the getters must
 * return the same reference until the stored value actually changes. Cache on
 * the raw localStorage string and only re-parse when it differs.
 */
const emptySnapshot: OpportunityScanPersisted = createEmptyOpportunityPersisted()

let cachedRaw: string | null = null
let cachedSnapshot: OpportunityScanPersisted = emptySnapshot

function getScanSnapshot(): OpportunityScanPersisted {
  if (typeof window === "undefined") return emptySnapshot

  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(OPPORTUNITY_SCAN_STORAGE_KEY)
  } catch {
    raw = null
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedSnapshot = readOpportunityScan() ?? emptySnapshot
  }
  return cachedSnapshot
}

function getServerScanSnapshot(): OpportunityScanPersisted {
  return emptySnapshot
}

function notifyScanStore(): void {
  window.dispatchEvent(new Event(SCAN_STORE_EVENT))
}

function persistScan(state: OpportunityScanPersisted): void {
  writeOpportunityScan(state)
  notifyScanStore()
}

function toFormValues(inputs: Partial<OpportunityInputs>): FormValues {
  return {
    totalProcessHoursPerWeek:
      inputs.totalProcessHoursPerWeek?.toString() ?? "",
    involvedEmployees: inputs.involvedEmployees?.toString() ?? "",
    repetitiveShare: inputs.repetitiveShare?.toString() ?? "",
    automatableShare: inputs.automatableShare?.toString() ?? "",
    requiredHumanOversight: inputs.requiredHumanOversight?.toString() ?? "",
    implementationComplexity:
      inputs.implementationComplexity?.toString() ?? "",
  }
}

function parseStepValues(
  stepId: OpportunityStepId,
  values: FormValues,
): Record<string, number> {
  const raw: Record<string, number> = {}
  for (const fieldId of opportunitySteps.find((s) => s.id === stepId)
    ?.fields ?? []) {
    const str = values[fieldId]
    raw[fieldId] = str === "" ? Number.NaN : Number(str)
  }
  return raw
}

function collectInputs(values: FormValues): OpportunityInputs {
  return {
    totalProcessHoursPerWeek: Number(values.totalProcessHoursPerWeek),
    involvedEmployees: Number(values.involvedEmployees),
    repetitiveShare: Number(values.repetitiveShare),
    automatableShare: Number(values.automatableShare),
    requiredHumanOversight: Number(values.requiredHumanOversight),
    implementationComplexity: Number(values.implementationComplexity),
  }
}

function mergeInputs(
  base: Partial<OpportunityInputs>,
  values: FormValues,
): Partial<OpportunityInputs> {
  const partial: Partial<OpportunityInputs> = { ...base }

  const maybeSet = <K extends keyof OpportunityInputs>(
    key: K,
    raw: string,
  ) => {
    if (raw === "") return
    const n = Number(raw)
    if (!Number.isNaN(n)) partial[key] = n as OpportunityInputs[K]
  }

  maybeSet("totalProcessHoursPerWeek", values.totalProcessHoursPerWeek)
  maybeSet("involvedEmployees", values.involvedEmployees)
  maybeSet("repetitiveShare", values.repetitiveShare)
  maybeSet("automatableShare", values.automatableShare)
  maybeSet("requiredHumanOversight", values.requiredHumanOversight)
  maybeSet("implementationComplexity", values.implementationComplexity)
  return partial
}

export function OpportunityScanFlow({
  locale,
  className,
}: OpportunityScanFlowProps) {
  const stored = useSyncExternalStore(
    subscribeScanStore,
    getScanSnapshot,
    getServerScanSnapshot,
  )

  const stepIndex = Math.min(
    Math.max(stored.stepIndex, 0),
    opportunitySteps.length - 1,
  )
  const unlocked = Boolean(stored.lead)
  const currentStep = opportunitySteps[stepIndex]
  const isResultStep = currentStep.id === "result"

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const { control, register, getValues, reset } = useForm<FormValues>({
    values: toFormValues(stored.inputs),
  })

  const derived = isResultStep
    ? (() => {
        const full = opportunityInputsSchema.safeParse(stored.inputs)
        if (!full.success) return null
        return {
          inputs: full.data,
          result: calculateOpportunity(full.data),
        }
      })()
    : null

  const goNext = () => {
    if (currentStep.id === "result") return
    const stepId = currentStep.id as OpportunityStepId
    const schema = opportunityStepSchemas[stepId]
    const values = getValues()
    const parsed = schema.safeParse(parseStepValues(stepId, values))
    if (!parsed.success) {
      setFieldErrors(fieldErrorsFromZod(parsed.error))
      return
    }
    setFieldErrors({})

    const next = stepIndex + 1
    const merged = mergeInputs(stored.inputs, values)

    if (opportunitySteps[next]?.id === "result") {
      const full = opportunityInputsSchema.safeParse(merged)
      if (!full.success) {
        setFieldErrors(fieldErrorsFromZod(full.error))
        return
      }
      persistScan({
        ...stored,
        version: 1,
        inputs: full.data,
        stepIndex: next,
      })
      return
    }

    persistScan({
      ...stored,
      version: 1,
      inputs: merged,
      stepIndex: next,
    })
  }

  const goBack = () => {
    setFieldErrors({})
    persistScan({
      ...stored,
      version: 1,
      inputs: mergeInputs(stored.inputs, getValues()),
      stepIndex: Math.max(0, stepIndex - 1),
    })
  }

  const handleRestart = () => {
    clearOpportunityScan()
    notifyScanStore()
    reset(emptyForm)
    setFieldErrors({})
  }

  const handleUnlocked = (lead: {
    name: string
    email: string
    company?: string
  }) => {
    const inputs = derived?.inputs ?? collectInputs(getValues())
    persistScan({
      ...stored,
      version: 1,
      stepIndex: opportunitySteps.length - 1,
      lead: {
        ...lead,
        unlockedAt: new Date().toISOString(),
      },
      inputs,
    })
  }

  return (
    <div className={cn("space-y-10", className)}>
      <ScanStepIndicator
        steps={opportunitySteps.map((s) => ({ id: s.id, title: s.title }))}
        currentIndex={stepIndex}
      />

      <div>
        <h2 className="text-2xl">{currentStep.title}</h2>
        <p className="mt-2 text-muted-foreground">{currentStep.description}</p>
      </div>

      {!isResultStep ? (
        <div className="max-w-lg space-y-6">
          {currentStep.fields.map((fieldId) => {
            const field = getOpportunityField(fieldId)
            const error = fieldErrors[fieldId]

            if (field.valueKind === "scale") {
              return (
                <fieldset key={fieldId} className="space-y-3">
                  <legend className="text-sm font-medium">{field.label}</legend>
                  <p className="text-sm text-muted-foreground">{field.help}</p>
                  <Controller
                    name={fieldId}
                    control={control}
                    render={({ field: rhf }) => (
                      <div
                        className="flex flex-wrap gap-2"
                        role="radiogroup"
                        aria-label={field.label}
                      >
                        {opportunityScaleOptions.map((opt) => {
                          const selected = rhf.value === String(opt.value)
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              onClick={() => rhf.onChange(String(opt.value))}
                              className={cn(
                                "min-w-16 rounded-lg border px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                                selected
                                  ? "border-accent bg-accent/15 text-foreground"
                                  : "border-border hover:bg-muted/60",
                              )}
                            >
                              <span className="block font-mono text-xs tabular-nums">
                                {opt.value}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {opt.label}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  />
                  {error ? (
                    <p className="text-sm text-destructive">{error}</p>
                  ) : null}
                </fieldset>
              )
            }

            return (
              <div key={fieldId} className="space-y-1.5">
                <label
                  htmlFor={`opp-${fieldId}`}
                  className="text-sm font-medium"
                >
                  {field.label}
                  {field.unit ? (
                    <span className="ml-1 font-normal text-muted-foreground">
                      ({field.unit})
                    </span>
                  ) : null}
                </label>
                <p className="text-sm text-muted-foreground">{field.help}</p>
                <Input
                  id={`opp-${fieldId}`}
                  type="number"
                  inputMode="decimal"
                  min={field.min}
                  max={field.max}
                  step={1}
                  aria-invalid={Boolean(error) || undefined}
                  className="h-10"
                  {...register(fieldId)}
                />
                {error ? (
                  <p className="text-sm text-destructive">{error}</p>
                ) : null}
              </div>
            )
          })}
        </div>
      ) : derived ? (
        <div className="space-y-8">
          <OpportunityResultSummary
            result={derived.result}
            unlocked={unlocked}
            locale={locale}
          />
          {!unlocked ? (
            <OpportunityLeadGate
              inputs={derived.inputs}
              clientScore={derived.result.opportunityScore}
              onUnlocked={handleUnlocked}
            />
          ) : (
            <p className="text-sm text-muted-foreground" role="status">
              {opportunityOutcomeCopy.softGateSuccess}
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-destructive">
          De invoer is onvolledig. Ga een stap terug en controleer de velden.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        {stepIndex > 0 ? (
          <Button type="button" variant="outline" onClick={goBack}>
            Terug
          </Button>
        ) : null}
        {!isResultStep ? (
          <Button type="button" variant="accent" onClick={goNext}>
            Volgende
          </Button>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          onClick={handleRestart}
          className="ml-auto"
        >
          {opportunityOutcomeCopy.restartLabel}
        </Button>
      </div>
    </div>
  )
}
