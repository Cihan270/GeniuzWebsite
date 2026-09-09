import { NotFoundTemplate } from "@/components/templates/not-found-template"
import { defaultLocale } from "@/lib/i18n/config"

/**
 * 404 within the locale segment — the proxy rewrites every locale-less path to
 * `/nl/…`, so this catches effectively every unmatched URL and renders inside
 * the locale layout (header, footer, consent).
 *
 * not-found.tsx receives no params, so the locale is the default one; Fase 1
 * serves NL only.
 */
export default function LocaleNotFound() {
  return <NotFoundTemplate locale={defaultLocale} />
}
