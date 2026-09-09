/**
 * Fase 9 QA runner — IA invariants, public links, content guards.
 *
 * Run: npm run qa
 * Expects tsx (via npx) and path aliases from tsconfig.
 */

import { assertFase1IaInvariants } from "../lib/seo/assert-fase1-ia"
import {
  assertFase1ContentGuards,
  assertFase1PublicLinks,
} from "../lib/seo/assert-fase1-links"
import { assertLegalPages } from "../lib/seo/assert-legal-pages"

const checks: { name: string; run: () => void }[] = [
  { name: "Fase 1 IA invariants", run: assertFase1IaInvariants },
  { name: "Fase 1 public links", run: assertFase1PublicLinks },
  { name: "Fase 1 content guards", run: assertFase1ContentGuards },
  { name: "Legal pages", run: assertLegalPages },
]

let failed = 0

for (const check of checks) {
  try {
    check.run()
    console.log(`✓ ${check.name}`)
  } catch (error) {
    failed += 1
    const message = error instanceof Error ? error.message : String(error)
    console.error(`✗ ${check.name}\n${message}`)
  }
}

if (failed > 0) {
  console.error(`\nQA failed: ${failed}/${checks.length} checks`)
  process.exit(1)
}

console.log(`\nQA passed: ${checks.length}/${checks.length} checks`)
