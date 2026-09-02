/**
 * Resend mail for contact form leads.
 * Sends internal notification + optional confirmation when RESEND_API_KEY is set.
 * No secrets in client code.
 */

import "server-only"

import type { ContactApiPayload } from "@/lib/validations/contact"
import { ORGANIZATION } from "@/lib/site"

export type ContactMailResult =
  | { sent: true; id?: string; confirmationSent: boolean }
  | { sent: false; reason: "not_configured" | "send_failed"; detail?: string }

const topicLabels: Record<ContactApiPayload["topic"], string> = {
  adviesgesprek: "Adviesgesprek",
  "opportunity-scan": "AI Opportunity Scan",
  consultancy: "AI Consultancy",
  development: "AI Development",
  training: "AI Training",
  overig: "Overig",
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Geniuz <noreply@geniuzaic.com>"
  const to =
    process.env.CONTACT_TO_EMAIL?.trim() || ORGANIZATION.email
  return { apiKey, from, to }
}

export async function sendContactMail(
  payload: ContactApiPayload,
): Promise<ContactMailResult> {
  const { apiKey, from, to } = getResendConfig()
  if (!apiKey) {
    return { sent: false, reason: "not_configured" }
  }

  const company = payload.company?.trim() || "—"
  const topicLabel = topicLabels[payload.topic]

  const internalText = [
    "Nieuw contactformulier",
    "",
    `Naam: ${payload.name}`,
    `E-mail: ${payload.email}`,
    `Organisatie: ${company}`,
    `Onderwerp: ${topicLabel}`,
    "",
    "Bericht:",
    payload.message,
  ].join("\n")

  const confirmationText = [
    `Hallo ${payload.name},`,
    "",
    "Bedankt voor je bericht aan Geniuz. We hebben het ontvangen en nemen zo snel mogelijk contact op.",
    "",
    `Onderwerp: ${topicLabel}`,
    "",
    "Met vriendelijke groet,",
    "Geniuz",
  ].join("\n")

  try {
    const { Resend } = await import("resend")
    const resend = new Resend(apiKey)

    const internal = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `Contact: ${payload.name} — ${topicLabel}`,
      text: internalText,
    })

    if (internal.error) {
      return {
        sent: false,
        reason: "send_failed",
        detail: internal.error.message,
      }
    }

    let confirmationSent = false
    const confirmation = await resend.emails.send({
      from,
      to: [payload.email],
      subject: "We hebben je bericht ontvangen — Geniuz",
      text: confirmationText,
    })

    if (!confirmation.error) {
      confirmationSent = true
    }

    return {
      sent: true,
      id: internal.data?.id,
      confirmationSent,
    }
  } catch (error) {
    return {
      sent: false,
      reason: "send_failed",
      detail: error instanceof Error ? error.message : "unknown",
    }
  }
}
