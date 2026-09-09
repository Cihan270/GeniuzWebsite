/**
 * Site-wide constants. No secrets — public marketing config only.
 * Override base URL via NEXT_PUBLIC_SITE_URL in env when deploying.
 */

export const SITE_NAME = "Geniuz"

export const SITE_TAGLINE =
  "Eerst begrijpen wat waarde oplevert. Daarna bouwen wat werkelijk nodig is."

/** Placeholder until client confirms production domain. */
export const DEFAULT_SITE_URL = "https://www.geniuzaic.com"

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "")
  }
  return DEFAULT_SITE_URL
}

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Geniuz VOF",
  /** Placeholder contact until confirmed. */
  email: "info@geniuzaic.com",
  description:
    "AI-consultancy met eigen uitvoeringskracht: onderzoeken, prioriteren, bouwen en implementeren.",
} as const

/**
 * Wettelijk verplichte identificatie (art. 3:15d BW) voor de juridische
 * pagina's. Leeg = nog niet vastgesteld; `assertLegalIdentityComplete` laat de
 * QA-check falen zolang dat zo is, zodat de site niet live gaat zonder.
 */
export const LEGAL_IDENTITY = {
  /** Statutaire naam zoals ingeschreven bij de KvK. */
  legalName: "Geniuz VOF",
  /** KvK-nummer, 8 cijfers. */
  kvk: "",
  /** Vestigingsadres: straat en huisnummer. */
  street: "",
  /** Postcode en plaats. */
  city: "",
  /** Btw-identificatienummer (optioneel op de site, verplicht op facturen). */
  vat: "",
  /** Mailbox die daadwerkelijk gelezen wordt. */
  email: ORGANIZATION.email,
} as const

export type LegalIdentityField = keyof typeof LEGAL_IDENTITY

/** Velden die ingevuld moeten zijn voordat een juridische pagina "published" mag zijn. */
export const REQUIRED_LEGAL_IDENTITY_FIELDS = [
  "legalName",
  "kvk",
  "street",
  "city",
  "email",
] as const satisfies readonly LegalIdentityField[]

export function missingLegalIdentityFields(): LegalIdentityField[] {
  return REQUIRED_LEGAL_IDENTITY_FIELDS.filter(
    (field) => LEGAL_IDENTITY[field].trim() === "",
  )
}

export function isLegalIdentityComplete(): boolean {
  return missingLegalIdentityFields().length === 0
}
