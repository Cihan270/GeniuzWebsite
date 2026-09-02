import { NextResponse } from "next/server"

import { sendOpportunityScanLeadMail } from "@/lib/email/opportunity-scan"
import { calculateOpportunity } from "@/lib/scans/opportunity-scoring"
import { opportunityScanApiSchema } from "@/lib/validations/opportunity-scan"

export const runtime = "nodejs"

/**
 * Soft-gate lead capture for AI Opportunity Scan.
 * Zod + honeypot. Resend when configured. Not a production spam control.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 })
  }

  const parsed = opportunityScanApiSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validatie mislukt",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    )
  }

  // Honeypot: pretend success
  if (parsed.data.lead.website) {
    return NextResponse.json({ ok: true })
  }

  const result = calculateOpportunity(parsed.data.inputs)
  const mail = await sendOpportunityScanLeadMail(parsed.data)

  return NextResponse.json({
    ok: true,
    score: result.opportunityScore,
    mail:
      mail.sent === true
        ? { status: "sent" as const }
        : { status: mail.reason },
  })
}
