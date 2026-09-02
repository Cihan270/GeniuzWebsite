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

  return NextResponse.json({
    ok: true,
    mail:
      mail.sent === true
        ? {
            status: "sent" as const,
            confirmationSent: mail.confirmationSent,
          }
        : { status: mail.reason },
  })
}
