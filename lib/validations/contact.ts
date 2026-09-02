import { z } from "zod"

import { fieldErrorsFromZod } from "@/lib/validations/helpers"

export { fieldErrorsFromZod }

const topicValues = [
  "adviesgesprek",
  "opportunity-scan",
  "consultancy",
  "development",
  "training",
  "overig",
] as const

export const contactFormSchema = z.object({
  name: z
    .string({ error: "Vul je naam in" })
    .trim()
    .min(2, "Naam is te kort")
    .max(120, "Naam is te lang"),
  email: z.email({ error: "Vul een geldig e-mailadres in" }).max(254),
  company: z
    .string()
    .trim()
    .max(160, "Bedrijfsnaam is te lang")
    .optional()
    .or(z.literal("")),
  topic: z.enum(topicValues, { error: "Kies een onderwerp" }),
  message: z
    .string({ error: "Vul een bericht in" })
    .trim()
    .min(10, "Bericht is te kort")
    .max(4000, "Bericht is te lang"),
  /**
   * Honeypot — bots often fill it. Accepted as any string so we can
   * silently ignore submissions after parse (do not reject at Zod).
   */
  website: z.string().max(200).optional().default(""),
})

export type ContactFormParsed = z.infer<typeof contactFormSchema>

export const contactApiSchema = contactFormSchema

export type ContactApiPayload = ContactFormParsed
