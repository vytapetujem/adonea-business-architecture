import type { RegionId } from '../lib/types'

/**
 * Market rents, €/m²/month (long-term lease, excl. utilities), 2025 level.
 * Slovakia has NO official market-rent statistic; these are indicative market
 * estimates from portal/association reports (Realitná únia barometer, portál
 * inzercie). Provenance: 'estimated' — treat as ±10–15 %.
 * wageRatio: regional avg. gross wage vs. national (ŠÚSR, approx., stable over time).
 */
export const REGION_AUX: Record<RegionId, { rent2025: number; wageRatio: number }> = {
  BA: { rent2025: 12.5, wageRatio: 1.27 },
  TT: { rent2025: 8.5, wageRatio: 0.9 },
  TN: { rent2025: 7.5, wageRatio: 0.88 },
  NR: { rent2025: 7.5, wageRatio: 0.85 },
  ZA: { rent2025: 8.5, wageRatio: 0.9 },
  BB: { rent2025: 7.5, wageRatio: 0.85 },
  PO: { rent2025: 8.0, wageRatio: 0.78 },
  KE: { rent2025: 9.5, wageRatio: 0.9 },
}

/** National average market rent, €/m²/month, 2025 (estimated, market sources). */
export const NATIONAL_RENT_2025 = 9.2

/**
 * Rent evolution proxy: rents broadly tracked inflation + wage growth with a
 * 2022–2023 surge (refugee inflow + mortgage-rate shock pushed demand to rentals).
 * Index 2016 = 1.00 → 2025 ≈ 1.72 (estimated).
 */
export const RENT_INDEX_BY_YEAR: Record<number, number> = {
  2016: 1.0, 2017: 1.04, 2018: 1.09, 2019: 1.15, 2020: 1.14,
  2021: 1.18, 2022: 1.35, 2023: 1.52, 2024: 1.62, 2025: 1.72,
}
