import { z } from "zod"

import type { OpportunityInputs } from "@/lib/scans/opportunity-scoring"

const percent = z
  .number({ error: "Voer een percentage in" })
  .min(0, "Minimaal 0%")
  .max(100, "Maximaal 100%")

const scale = z
  .number({ error: "Kies een waarde op de schaal" })
  .int()
  .min(1, "Kies minimaal 1")
  .max(5, "Kies maximaal 5")

export const opportunityInputsSchema = z.object({
  totalProcessHoursPerWeek: z
    .number({ error: "Voer het aantal uren in" })
    .min(1, "Minimaal 1 uur per week")
    .max(500, "Maximaal 500 uur per week"),
  involvedEmployees: z
    .number({ error: "Voer het aantal medewerkers in" })
    .int("Geheel getal verwacht")
    .min(1, "Minimaal 1 medewerker")
    .max(500, "Maximaal 500 medewerkers"),
  repetitiveShare: percent,
  automatableShare: percent,
  requiredHumanOversight: scale,
  implementationComplexity: scale,
})

export type OpportunityInputsParsed = z.infer<typeof opportunityInputsSchema>

export const opportunityStepSchemas = {
  process: opportunityInputsSchema.pick({
    totalProcessHoursPerWeek: true,
    involvedEmployees: true,
  }),
  nature: opportunityInputsSchema.pick({
    repetitiveShare: true,
    automatableShare: true,
  }),
  constraints: opportunityInputsSchema.pick({
    requiredHumanOversight: true,
    implementationComplexity: true,
  }),
} as const

export type OpportunityStepId = keyof typeof opportunityStepSchemas

export const opportunityLeadSchema = z.object({
  name: z
    .string({ error: "Vul je naam in" })
    .trim()
    .min(2, "Naam is te kort")
    .max(120, "Naam is te lang"),
  email: z
    .email({ error: "Vul een geldig e-mailadres in" })
    .max(254),
  company: z
    .string()
    .trim()
    .max(160, "Bedrijfsnaam is te lang")
    .optional()
    .or(z.literal("")),
  /**
   * Honeypot — bots often fill it. Accepted as any string so we can
   * silently ignore submissions after parse (do not reject at Zod).
   */
  website: z.string().max(200).optional().default(""),
})

export type OpportunityLeadParsed = z.infer<typeof opportunityLeadSchema>

export const opportunityScanApiSchema = z.object({
  inputs: opportunityInputsSchema,
  lead: opportunityLeadSchema,
  /** Client-computed score echoed for mail context — server recalculates trust. */
  clientScore: z.number().int().min(0).max(100).optional(),
})

export type OpportunityScanApiPayload = z.infer<typeof opportunityScanApiSchema>

export function parseOpportunityInputs(
  data: unknown,
):
  | { success: true; data: OpportunityInputs }
  | { success: false; error: z.ZodError } {
  const result = opportunityInputsSchema.safeParse(data)
  if (!result.success) return { success: false, error: result.error }
  return { success: true, data: result.data }
}

export { fieldErrorsFromZod } from "@/lib/validations/helpers"
