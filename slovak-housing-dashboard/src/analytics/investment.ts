import type { RegionId } from '../lib/types'
import { REGION_IDS, regionById } from '../data/regions'
import { ALL_REGION_METRICS } from './metrics'
import { clamp } from '../lib/stats'

/**
 * Regional investment scoring (0–100). Sub-scores are normalised across the 8
 * regions (documented in docs/FORECAST_METHODOLOGY.md §6):
 *  – growth: 3y momentum + catch-up gap vs. BA price level + regional catalysts
 *  – rental: gross rental yield percentile
 *  – liquidity: market size (supply share) + urbanisation proxy (population)
 *  – risk (inverted): volatility + single-industry exposure + affordability stretch
 * Composite = 0.3·growth + 0.25·rental + 0.2·liquidity + 0.25·(100 − risk).
 * Regional inputs are partly 'estimated' — scores are indicative rankings, not
 * investment advice.
 */
export interface RegionScore {
  id: RegionId
  name: string
  growth: number
  rental: number
  liquidity: number
  risk: number // higher = riskier
  total: number
  expectedTrend: 'rast' | 'mierny rast' | 'stagnácia' | 'riziko poklesu'
  explanation: string
}

/** Qualitative adjustments with documented rationale. */
const QUALITATIVE: Record<RegionId, { growthAdj: number; riskAdj: number; note: string }> = {
  BA: { growthAdj: 0, riskAdj: -5, note: 'Najhlbší a najlikvidnejší trh; diverzifikovaná ekonomika, trvalý prílev obyvateľov; najvyššie vstupné ceny stláčajú výnos.' },
  TT: { growthAdj: 2, riskAdj: -2, note: 'Satelit Bratislavy (dochádzka), priemyselná základňa; ťaží z presahu dopytu z BA.' },
  TN: { growthAdj: -2, riskAdj: 4, note: 'Najslabší rast v 2025; starnúca priemyselná štruktúra, slabšia demografia.' },
  NR: { growthAdj: 5, riskAdj: 2, note: 'Najrýchlejší rast 2024–25 z nízkej bázy; Jaguar Land Rover + logistika; nízka vstupná cena.' },
  ZA: { growthAdj: 1, riskAdj: 0, note: 'Stabilný dopyt (Kia, cestovný ruch); diverzifikovanejší než ostatné mimobratislavské kraje.' },
  BB: { growthAdj: 2, riskAdj: 3, note: 'Dobiehanie z nízkej bázy; slabšia demografia a likvidita mimo krajského mesta.' },
  PO: { growthAdj: -3, riskAdj: 5, note: 'Jediný kraj s medziročným poklesom v Q4 2025; najnižšie mzdy, vysoká emigrácia mladých; Poprad výnimkou.' },
  KE: { growthAdj: 4, riskAdj: 1, note: 'Volvo Valaliky + IT sektor; druhý najhlbší trh; riziko koncentrácie do automotive.' },
}

function normalise(values: Record<RegionId, number>, invert = false): Record<RegionId, number> {
  const xs = Object.values(values)
  const lo = Math.min(...xs)
  const hi = Math.max(...xs)
  const out = {} as Record<RegionId, number>
  for (const id of REGION_IDS) {
    const t = hi === lo ? 0.5 : (values[id] - lo) / (hi - lo)
    out[id] = Math.round((invert ? 1 - t : t) * 100)
  }
  return out
}

export function computeRegionScores(): RegionScore[] {
  const g3: Record<RegionId, number> = {} as never
  const yieldR: Record<RegionId, number> = {} as never
  const liq: Record<RegionId, number> = {} as never
  const vol: Record<RegionId, number> = {} as never
  const stretch: Record<RegionId, number> = {} as never

  for (const id of REGION_IDS) {
    const m = ALL_REGION_METRICS[id]
    const info = regionById(id)
    g3[id] = m.growth3y ?? 0
    yieldR[id] = m.rentalYieldGross
    liq[id] = info.supplyShare * 0.7 + (info.population / 823000) * 0.3
    vol[id] = m.volatility
    stretch[id] = m.priceToIncome
  }

  const nG = normalise(g3)
  const nY = normalise(yieldR)
  const nL = normalise(liq)
  const nVol = normalise(vol) // higher vol → higher risk
  const nStretch = normalise(stretch)

  return REGION_IDS.map((id) => {
    const q = QUALITATIVE[id]
    const growth = clamp(nG[id] * 0.7 + 30 + q.growthAdj * 4, 0, 100)
    const rental = clamp(nY[id] * 0.8 + 10, 0, 100)
    const liquidity = clamp(nL[id] * 0.9 + 5, 0, 100)
    const risk = clamp(nVol[id] * 0.35 + nStretch[id] * 0.3 + 20 + q.riskAdj * 4, 0, 100)
    const total = Math.round(0.3 * growth + 0.25 * rental + 0.2 * liquidity + 0.25 * (100 - risk))
    const m = ALL_REGION_METRICS[id]
    const yoy = m.yoy ?? 0
    const expectedTrend: RegionScore['expectedTrend'] =
      yoy > 8 && growth > 55 ? 'rast' : yoy > 3 ? 'mierny rast' : yoy > -1 ? 'stagnácia' : 'riziko poklesu'
    return {
      id,
      name: regionById(id).name,
      growth: Math.round(growth),
      rental: Math.round(rental),
      liquidity: Math.round(liquidity),
      risk: Math.round(risk),
      total,
      expectedTrend,
      explanation: q.note,
    }
  }).sort((a, b) => b.total - a.total)
}

export const REGION_SCORES = computeRegionScores()
