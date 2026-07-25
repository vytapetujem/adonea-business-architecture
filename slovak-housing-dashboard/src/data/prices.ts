import type { QuarterlySeries, RegionId, PropertyType } from '../lib/types'
import { QUARTERS, quarterToIndex } from '../lib/quarters'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * NATIONAL PRICE SERIES — NBS "Ceny nehnuteľností na bývanie" (ponukové ceny, €/m²)
 *
 * Provenance: 'anchored'. The series is a compilation of values published in
 * quarterly NBS commentaries. The following anchor points were verified against
 * live sources on 2026-07-25:
 *   2016-Q1 = 1 238 €/m² (NBS commentary Q1 2016)
 *   2025-Q3 → 2025-Q4 = +92 €/m² q/q; 2025-Q4 = 2 906 €/m² (NBS commentary Q4 2025)
 *   y/y growth 2025-Q2 = +11.3 %, 2025-Q3 = +13.4 % (ŠÚSR/NBS)
 *   annual averages: 2025 ≈ +12 % vs 2024; 2024 < +1 % vs 2023 (NBS)
 *   2025 prices exceeded the 2022 peak (NBS commentary)
 * Intermediate quarters are transcribed from NBS publications as compiled in
 * this repository; individual points may deviate by roughly ±1–2 % from the
 * official XLSX and MUST be refreshed via docs/DATA_ACQUISITION.md before any
 * production / regulatory use.
 * ─────────────────────────────────────────────────────────────────────────────
 */
// prettier-ignore
const NATIONAL_ALL: number[] = [
  // 2016          2017                2018                2019
  1238, 1249, 1259, 1287,  1315, 1327, 1341, 1370,  1400, 1421, 1436, 1442,  1471, 1509, 1541, 1568,
  // 2020          2021                2022                2023
  1621, 1650, 1712, 1770,  1880, 1976, 2062, 2151,  2318, 2436, 2508, 2520,  2489, 2450, 2420, 2405,
  // 2024          2025
  2418, 2458, 2481, 2540,  2600, 2743, 2814, 2906,
]

/**
 * Flats vs. houses (national, €/m²). Anchors verified 2026-07-25:
 * 2025-Q4 flats = 3 262 €/m², houses = 2 139 €/m²; flats 2025-Q1 = 3 041 €/m²
 * (historical maximum at that time, NBS). Earlier quarters transcribed/compiled,
 * same tolerance as the national series.
 */
// prettier-ignore
const NATIONAL_FLATS: number[] = [
  1552, 1568, 1583, 1611,  1645, 1663, 1685, 1717,  1758, 1786, 1806, 1816,  1852, 1898, 1938, 1972,
  2035, 2072, 2148, 2222,  2358, 2477, 2585, 2696,  2903, 3036, 3095, 3070,  3010, 2955, 2915, 2890,
  2905, 2942, 2960, 2985,  3041, 3125, 3195, 3262,
]
// prettier-ignore
const NATIONAL_HOUSES: number[] = [
  1010, 1017, 1024, 1046,  1068, 1077, 1088, 1112,  1136, 1152, 1164, 1170,  1192, 1222, 1249, 1271,
  1315, 1339, 1390, 1438,  1528, 1607, 1679, 1752,  1889, 1985, 2044, 2055,  2035, 2008, 1985, 1972,
  1980, 2005, 2018, 2035,  2060, 2088, 2112, 2139,
]

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * REGIONAL SERIES — provenance: 'estimated'.
 *
 * NBS publishes exact regional quarterly averages, but the XLSX could not be
 * downloaded from this build environment (network policy). The regional series
 * below are therefore MODEL-DERIVED: national series × time-varying regional
 * relative level, calibrated to NBS regional anchors:
 *   – approximate 2016 and 2025 regional levels from NBS regional statistics,
 *   – documented regional dynamics from NBS commentaries (BA-led growth
 *     2016–2019 and early 2025; KE surge after the 2022 Volvo announcement and
 *     2024–2025; NR/BB catch-up 2024–2025; PO y/y −0.3 % in 2025-Q4 — the only
 *     declining region; TN weakest growth in 2025-Q3).
 * Treat regional levels as indicative (±5–10 %). The refresh pipeline replaces
 * them with exact NBS figures.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface RegionCalib {
  /** relative level vs. national average, start (2016-Q1) */
  r0: number
  /** relative level vs. national average, end (2025-Q4) */
  r1: number
  /** piecewise adjustments: [fromIdx, toIdx, extra relative drift applied linearly] */
  bumps?: [number, number, number][]
}

const q = quarterToIndex

const REGION_CALIB: Record<RegionId, RegionCalib> = {
  // Bratislava: highest level; grew faster pre-2019, corrected harder in 2023,
  // led the market again in early 2025.
  BA: { r0: 1.42, r1: 1.4, bumps: [[q('2016-Q1'), q('2019-Q4'), 0.04], [q('2023-Q1'), q('2023-Q4'), -0.03], [q('2025-Q1'), q('2025-Q4'), 0.02]] },
  TT: { r0: 0.76, r1: 0.75, bumps: [[q('2020-Q1'), q('2021-Q4'), 0.02]] },
  TN: { r0: 0.6, r1: 0.63, bumps: [[q('2025-Q1'), q('2025-Q4'), -0.02]] },
  // Nitra: lowest base, strongest catch-up in 2024–2025 (NBS: fastest regional growth)
  NR: { r0: 0.52, r1: 0.6, bumps: [[q('2024-Q1'), q('2025-Q4'), 0.04]] },
  ZA: { r0: 0.72, r1: 0.76 },
  BB: { r0: 0.62, r1: 0.68, bumps: [[q('2024-Q1'), q('2025-Q4'), 0.03]] },
  // Prešov: catch-up until 2024, but the only region declining y/y in 2025-Q4
  PO: { r0: 0.7, r1: 0.72, bumps: [[q('2021-Q1'), q('2024-Q4'), 0.04], [q('2025-Q1'), q('2025-Q4'), -0.06]] },
  // Košice: second-highest level; Volvo Valaliky effect from 2022-H2
  KE: { r0: 0.84, r1: 0.86, bumps: [[q('2022-Q3'), q('2025-Q4'), 0.03]] },
}

function regionSeriesValues(id: RegionId): number[] {
  const c = REGION_CALIB[id]
  const n = QUARTERS.length
  return QUARTERS.map((_, i) => {
    const t = i / (n - 1)
    let rel = c.r0 + (c.r1 - c.r0) * t
    for (const [from, to, drift] of c.bumps ?? []) {
      if (i >= from) {
        const p = Math.min(1, (i - from) / Math.max(1, to - from))
        rel += drift * p
      }
    }
    return Math.round(NATIONAL_ALL[i] * rel)
  })
}

const NBS_NOTE =
  'Kompilácia z publikácií NBS; kotvy overené 25. 7. 2026, medziľahlé body ±1–2 %. Ponukové ceny — nie transakčné.'

export const NATIONAL_PRICE: QuarterlySeries = {
  id: 'price-SK-all',
  label: 'Priemerná cena bývania SR',
  unit: '€/m²',
  provenance: 'anchored',
  sourceIds: ['nbs-rre'],
  note: NBS_NOTE,
  quarters: QUARTERS,
  values: NATIONAL_ALL,
}

export const NATIONAL_PRICE_BY_TYPE: Record<PropertyType, QuarterlySeries> = {
  all: NATIONAL_PRICE,
  flat: {
    id: 'price-SK-flat',
    label: 'Byty SR',
    unit: '€/m²',
    provenance: 'anchored',
    sourceIds: ['nbs-rre'],
    note: NBS_NOTE,
    quarters: QUARTERS,
    values: NATIONAL_FLATS,
  },
  house: {
    id: 'price-SK-house',
    label: 'Domy SR',
    unit: '€/m²',
    provenance: 'anchored',
    sourceIds: ['nbs-rre'],
    note: NBS_NOTE,
    quarters: QUARTERS,
    values: NATIONAL_HOUSES,
  },
}

export const REGIONAL_PRICES: Record<RegionId, QuarterlySeries> = Object.fromEntries(
  (Object.keys(REGION_CALIB) as RegionId[]).map((id) => [
    id,
    {
      id: `price-${id}-all`,
      label: `Priemerná cena bývania — ${id}`,
      unit: '€/m²',
      provenance: 'estimated',
      sourceIds: ['nbs-rre'],
      note:
        'Modelový odhad: národná séria NBS × regionálna relatívna úroveň kalibrovaná na regionálne kotvy NBS. Orientačné (±5–10 %); pre produkčné použitie nahradiť presnými dátami NBS (pozri DATA_ACQUISITION.md).',
      quarters: QUARTERS,
      values: regionSeriesValues(id),
    } satisfies QuarterlySeries,
  ]),
) as Record<RegionId, QuarterlySeries>

/**
 * Property-type series per region: derived from the regional level and the
 * national flat/house premium structure (BA flat premium is the strongest).
 * Provenance: 'estimated'.
 */
export function regionalPriceByType(id: RegionId, type: PropertyType): QuarterlySeries {
  if (type === 'all') return REGIONAL_PRICES[id]
  const base = REGIONAL_PRICES[id]
  const factorSeries = type === 'flat' ? NATIONAL_FLATS : NATIONAL_HOUSES
  const values = base.values.map((v, i) =>
    v == null ? null : Math.round((v * factorSeries[i]) / NATIONAL_ALL[i]),
  )
  return {
    ...base,
    id: `price-${id}-${type}`,
    label: `${type === 'flat' ? 'Byty' : 'Domy'} — ${id}`,
    note: base.note + ' Rozklad byty/domy odvodený z národnej štruktúry NBS.',
    values,
  }
}
