import type { CyclePhase } from '../lib/types'
import { NATIONAL_PRICE } from '../data/prices'
import { QUARTERS } from '../lib/quarters'
import { pctChange } from '../lib/stats'

/**
 * Market-cycle identification (rule-based, documented in docs/FORECAST_METHODOLOGY.md §3).
 * Inputs: y/y growth g and its 2-quarter momentum Δg of the national series.
 * Rules (evaluated in order):
 *   correction:    g < −0.5 %
 *   boom:          g ≥ 10 %
 *   acceleration:  g ≥ 3 % and Δg > 0.75 pp
 *   stagnation:    |g| < 2.5 % and |Δg| small
 *   recovery:      everything else with g ≥ 0 after a trough / mild positive growth
 */
export interface CyclePoint {
  quarter: string
  phase: CyclePhase
  yoy: number | null
}

export const PHASE_META: Record<CyclePhase, { label: string; color: string; desc: string }> = {
  boom: { label: 'Boom', color: '#2fbf71', desc: 'Medziročný rast ≥ 10 % — dopyt výrazne prevyšuje ponuku.' },
  acceleration: { label: 'Akcelerácia', color: '#8ee6b8', desc: 'Rast ≥ 3 % so zrýchľujúcou dynamikou.' },
  recovery: { label: 'Oživenie', color: '#4c9aff', desc: 'Návrat k rastu po korekcii/stagnácii.' },
  stagnation: { label: 'Stagnácia', color: '#8b9bb4', desc: 'Ceny sa pohybujú do ±2,5 % medziročne.' },
  correction: { label: 'Korekcia', color: '#e5484d', desc: 'Medziročný pokles cien.' },
}

export function classifyCycle(): CyclePoint[] {
  const yoy = pctChange(NATIONAL_PRICE.values, 4)
  return QUARTERS.map((quarter, i) => {
    const g = yoy[i]
    if (g == null) return { quarter, phase: 'stagnation' as CyclePhase, yoy: g }
    const gPrev = i >= 2 ? yoy[i - 2] : null
    const dg = gPrev != null ? g - gPrev : 0
    let phase: CyclePhase
    if (g < -0.5) phase = 'correction'
    else if (g >= 10) phase = 'boom'
    else if (g >= 3 && dg > 0.75) phase = 'acceleration'
    else if (Math.abs(g) < 2.5) phase = 'stagnation'
    else phase = 'recovery'
    return { quarter, phase, yoy: g }
  })
}

export const CYCLE_POINTS = classifyCycle()

/**
 * Probability distribution over the CURRENT phase. Base = deterministic rule
 * classification; probabilities express distance from rule thresholds and the
 * measurement noise of the underlying series (offer prices, ±1–2 %).
 */
export function currentPhaseProbabilities(): { phase: CyclePhase; p: number }[] {
  const yoy = pctChange(NATIONAL_PRICE.values, 4)
  const g = yoy[yoy.length - 1] ?? 0
  const gPrev = yoy[yoy.length - 3] ?? g
  const dg = g - gPrev

  // triangular kernels around thresholds
  const pBoom = Math.max(0, Math.min(1, (g - 7) / 6))
  const pCorr = Math.max(0, Math.min(1, (-g + 1) / 4))
  const pStag = Math.max(0, 1 - Math.abs(g) / 4)
  const pAccel = Math.max(0, Math.min(1, (dg + 1) / 5)) * Math.max(0, Math.min(1, (g - 1) / 6))
  const pRecov = Math.max(0.05, 1 - pBoom - pCorr - pStag * 0.5)

  const raw: Record<CyclePhase, number> = {
    boom: pBoom,
    acceleration: pAccel * 0.8,
    recovery: pRecov * 0.35,
    stagnation: pStag * 0.6,
    correction: pCorr,
  }
  const total = Object.values(raw).reduce((a, b) => a + b, 0)
  return (Object.entries(raw) as [CyclePhase, number][])
    .map(([phase, p]) => ({ phase, p: Math.round((p / total) * 100) }))
    .sort((a, b) => b.p - a.p)
}

export const CURRENT_PHASE_PROBS = currentPhaseProbabilities()
