import "server-only"

import {
  defaultLocale,
  type EnabledLocale,
  isEnabledLocale,
} from "@/lib/i18n/config"
import { nlDictionary, type Dictionary } from "@/lib/dictionaries/nl"

const dictionaries: Record<
  EnabledLocale,
  () => Promise<Dictionary>
> = {
  nl: async () => nlDictionary,
}

export type { Dictionary }

export function hasDictionary(locale: string): locale is EnabledLocale {
  return isEnabledLocale(locale)
}

export async function getDictionary(
  locale: EnabledLocale = defaultLocale,
): Promise<Dictionary> {
  const load = dictionaries[locale]
  return load()
}
