/**
 * Persist opportunity-scan progress in localStorage (necessary / functional).
 * Key matches plan: geniuz.opportunity-scan.v1
 */

import type { OpportunityInputs } from "@/lib/scans/opportunity-scoring"

export const OPPORTUNITY_SCAN_STORAGE_KEY = "geniuz.opportunity-scan.v1"

export type OpportunityLead = {
  name: string
  email: string
  company?: string
  unlockedAt: string
}

export type OpportunityScanPersisted = {
  version: 1
  inputs: Partial<OpportunityInputs>
  stepIndex: number
  lead: OpportunityLead | null
  updatedAt: string
}

export function createEmptyOpportunityPersisted(): OpportunityScanPersisted {
  return {
    version: 1,
    inputs: {},
    stepIndex: 0,
    lead: null,
    updatedAt: new Date().toISOString(),
  }
}

export function readOpportunityScan(): OpportunityScanPersisted | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(OPPORTUNITY_SCAN_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as OpportunityScanPersisted
    if (parsed?.version !== 1) return null
    return parsed
  } catch {
    return null
  }
}

export function writeOpportunityScan(
  state: OpportunityScanPersisted,
): void {
  if (typeof window === "undefined") return
  const next = { ...state, updatedAt: new Date().toISOString(), version: 1 as const }
  window.localStorage.setItem(OPPORTUNITY_SCAN_STORAGE_KEY, JSON.stringify(next))
}

export function clearOpportunityScan(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(OPPORTUNITY_SCAN_STORAGE_KEY)
}
