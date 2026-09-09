import { NextResponse } from "next/server"

import { sendContactMail } from "@/lib/email/contact"
import { contactApiSchema } from "@/lib/validations/contact"

export const runtime = "nodejs"

/**
 * Contact form lead capture.
 * Zod + honeypot. Resend when configured. Not a production spam control.
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Ongeldige JSON" }, { status: 400 })
  }

  const parsed = contactApiSchema.safeParse(body)
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
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const mail = await sendContactMail(parsed.data)

  if (mail.sent !== true) {
    // The lead only exists in this request — never report success we cannot back up.
    console.error("[contact] mail not delivered:", mail.reason, mail.detail ?? "")
    return NextResponse.json(
      { ok: false, error: "Versturen mislukt", reason: mail.reason },
      { status: 502 },
    )
  }

  return NextResponse.json({
    ok: true,
    mail: { status: "sent" as const, confirmationSent: mail.confirmationSent },
  })
}
