"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { opportunityOutcomeCopy } from "@/content/scans/opportunity"
import {
  fieldErrorsFromZod,
  opportunityLeadSchema,
  type OpportunityLeadParsed,
} from "@/lib/validations/opportunity-scan"
import type { OpportunityInputs } from "@/lib/scans/opportunity-scoring"
import { cn } from "@/lib/utils"

type OpportunityLeadGateProps = {
  inputs: OpportunityInputs
  clientScore: number
  onUnlocked: (lead: {
    name: string
    email: string
    company?: string
  }) => void
  className?: string
}

type LeadFormValues = {
  name: string
  email: string
  company: string
  website: string
}

export function OpportunityLeadGate({
  inputs,
  clientScore,
  onUnlocked,
  className,
}: OpportunityLeadGateProps) {
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    const parsed = opportunityLeadSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors = fieldErrorsFromZod(parsed.error)
      for (const [key, message] of Object.entries(fieldErrors)) {
        setError(key as keyof LeadFormValues, { message })
      }
      return
    }

    // Honeypot filled → silent fake success for bots; do not unlock or call API
    if (parsed.data.website) {
      setFormError(null)
      setSubmitting(false)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/opportunity-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputs,
          lead: parsed.data,
          clientScore,
        }),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        setFormError(
          body?.error ??
            "Versturen lukte niet. Je indicatie wordt lokaal wel ontgrendeld.",
        )
        // Still unlock locally — soft-gate UX should not brick the scan
      }

      const lead: OpportunityLeadParsed = parsed.data
      onUnlocked({
        name: lead.name,
        email: lead.email,
        company: lead.company || undefined,
      })
    } catch {
      setFormError(
        "Netwerkfout. Je indicatie wordt lokaal ontgrendeld; mail volgt later.",
      )
      onUnlocked({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || undefined,
      })
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <div
      className={cn(
        "border-t border-border pt-8",
        className,
      )}
    >
      <h3 className="text-xl">{opportunityOutcomeCopy.softGateHeading}</h3>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        {opportunityOutcomeCopy.softGateBody}
      </p>

      <form onSubmit={onSubmit} className="mt-6 max-w-md space-y-4" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="opp-lead-name" className="text-sm font-medium">
            Naam
          </label>
          <Input
            id="opp-lead-name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name) || undefined}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="opp-lead-email" className="text-sm font-medium">
            E-mail
          </label>
          <Input
            id="opp-lead-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email) || undefined}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="opp-lead-company" className="text-sm font-medium">
            Organisatie{" "}
            <span className="font-normal text-muted-foreground">(optioneel)</span>
          </label>
          <Input
            id="opp-lead-company"
            autoComplete="organization"
            {...register("company")}
          />
          {errors.company ? (
            <p className="text-sm text-destructive">{errors.company.message}</p>
          ) : null}
        </div>

        {/* Honeypot — visually hidden, not aria-hidden so bots may still fill it */}
        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="opp-lead-website">Website</label>
          <Input
            id="opp-lead-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {formError ? (
          <p className="text-sm text-muted-foreground" role="status">
            {formError}
          </p>
        ) : null}

        <Button type="submit" variant="accent" size="lg" disabled={submitting}>
          {submitting
            ? "Bezig…"
            : opportunityOutcomeCopy.softGateSubmit}
        </Button>
      </form>
    </div>
  )
}
