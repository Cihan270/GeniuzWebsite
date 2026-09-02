/**
 * Resend mail preparation for Opportunity Scan leads.
 * Sends only when RESEND_API_KEY is configured; otherwise no-ops safely.
 * No secrets in client code.
 */

import "server-only"

import { calculateOpportunity } from "@/lib/scans/opportunity-scoring"
import type { OpportunityScanApiPayload } from "@/lib/validations/opportunity-scan"
import { ORGANIZATION } from "@/lib/site"

export type OpportunityMailResult =
  | { sent: true; id?: string }
  | { sent: false; reason: "not_configured" | "send_failed"; detail?: string }

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Geniuz <noreply@geniuzaic.com>"
  const to =
    process.env.OPPORTUNITY_SCAN_TO_EMAIL?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    ORGANIZATION.email
  return { apiKey, from, to }
}

export async function sendOpportunityScanLeadMail(
  payload: OpportunityScanApiPayload,
): Promise<OpportunityMailResult> {
  const { apiKey, from, to } = getResendConfig()
  if (!apiKey) {
    return { sent: false, reason: "not_configured" }
  }

  const result = calculateOpportunity(payload.inputs)
  const company = payload.lead.company?.trim() || "—"

  const text = [
    "Nieuwe AI Opportunity Scan lead",
    "",
    `Naam: ${payload.lead.name}`,
    `E-mail: ${payload.lead.email}`,
    `Organisatie: ${company}`,
    "",
    `Opportunity score (herberekend): ${result.opportunityScore}/100`,
    `Indicatieve uren/week: ${result.indicativeWeeklyHours}`,
    `Indicatieve tijdswaarde (jaar): €${result.annualTimeValueEur.low} – €${result.annualTimeValueEur.high}`,
    `Verbeterrichtingen: ${result.improvementCategories.join(", ")}`,
    `Volgende stap: ${result.recommendedNextStep}`,
    "",
    "Invoer:",
    JSON.stringify(payload.inputs, null, 2),
    "",
    "Let op: dit is een indicatie, geen besparing of ROI.",
  ].join("\n")

  try {
    // Dynamic import so the app builds without resend until installed / configured.
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)
    const response = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.lead.email,
      subject: `Opportunity Scan: ${payload.lead.name} (${result.opportunityScore}/100)`,
      text,
    })

    if (response.error) {
      return {
        sent: false,
        reason: "send_failed",
        detail: response.error.message,
      }
    }

    return { sent: true, id: response.data?.id }
  } catch (error) {
    return {
      sent: false,
      reason: "send_failed",
      detail: error instanceof Error ? error.message : "unknown",
    }
  }
}
