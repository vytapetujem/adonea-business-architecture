import type { GeoScope, PropertyType, QuarterlySeries, RegionId } from '../lib/types'
import { NATIONAL_PRICE_BY_TYPE, REGIONAL_PRICES, regionalPriceByType } from '../data/prices'
import { MACRO, NET_WAGE_RATIO } from '../data/macro'
import { NATIONAL_RENT_2025, REGION_AUX, RENT_INDEX_BY_YEAR } from '../data/rents'
import { QUARTERS, parseQuarter } from '../lib/quarters'
import { annualisedVolatility, annuityMonthly, cagr, pctChange } from '../lib/stats'

export function priceSeries(scope: GeoScope, type: PropertyType): QuarterlySeries {
  return scope === 'SK' ? NATIONAL_PRICE_BY_TYPE[type] : regionalPriceByType(scope, type)
}

export interface ScopeMetrics {
  scope: GeoScope
  latestQuarter: string
  price: number
  qoq: number | null
  yoy: number | null
  growth3y: number | null // cumulative %
  growth5y: number | null
  growth10y: number | null
  cagr10y: number | null // % p.a.
  maxPrice: { value: number; quarter: string }
  minPrice: { value: number; quarter: string }
  volatility: number // annualised σ of q/q changes, pp
  grossWage: number
  netWage: number
  rent: number // €/m²/month
  rentalYieldGross: number // % p.a.
  priceToIncome: number // years of net household income for a 70 m² flat-equivalent
  priceToRent: number // price / annual rent
  mortgagePayment: number // €/month, 70 m², 80 % LTV, 30 y, current avg rate
  affordabilityIndex: number // net household income / income required at DSTI 40 % (1 = limit)
}

/** Assumptions used across affordability metrics — documented in docs/ASSUMPTIONS.md */
export const AFFORDABILITY_ASSUMPTIONS = {
  unitM2: 70,
  ltv: 0.8,
  maturityYears: 30,
  householdEarners: 1.6,
  dstiCap: 0.4,
}

function latestNonNullIndex(values: (number | null)[]): number {
  for (let i = values.length - 1; i >= 0; i--) if (values[i] != null) return i
  return -1
}

export function computeScopeMetrics(scope: GeoScope, type: PropertyType = 'all'): ScopeMetrics {
  const series = priceSeries(scope, type)
  const v = series.values
  const li = latestNonNullIndex(v)
  const price = v[li]!
  const qoqS = pctChange(v, 1)
  const yoyS = pctChange(v, 4)

  const at = (offset: number) => (li - offset >= 0 ? v[li - offset] : null)
  const cum = (offset: number) => {
    const p = at(offset)
    return p != null ? ((price - p) / p) * 100 : null
  }

  let maxV = -Infinity
  let maxQ = ''
  let minV = Infinity
  let minQ = ''
  v.forEach((x, i) => {
    if (x == null) return
    if (x > maxV) {
      maxV = x
      maxQ = QUARTERS[i]
    }
    if (x < minV) {
      minV = x
      minQ = QUARTERS[i]
    }
  })

  const { year } = parseQuarter(QUARTERS[li])
  const wageNational = MACRO.wage.values[li]!
  const wageRatio = scope === 'SK' ? 1 : REGION_AUX[scope as RegionId].wageRatio
  const grossWage = wageNational * wageRatio
  const netWage = grossWage * NET_WAGE_RATIO

  const rent2025 = scope === 'SK' ? NATIONAL_RENT_2025 : REGION_AUX[scope as RegionId].rent2025
  const rentIdx = RENT_INDEX_BY_YEAR[Math.min(2025, Math.max(2016, year))] / RENT_INDEX_BY_YEAR[2025]
  const rent = rent2025 * rentIdx

  const A = AFFORDABILITY_ASSUMPTIONS
  const unitPrice = price * A.unitM2
  const householdNetMonthly = netWage * A.householdEarners
  const rate = MACRO.mortgageRate.values[li]!
  const mortgagePayment = annuityMonthly(unitPrice * A.ltv, rate, A.maturityYears)
  const affordabilityIndex = (householdNetMonthly * A.dstiCap) / mortgagePayment

  return {
    scope,
    latestQuarter: QUARTERS[li],
    price,
    qoq: qoqS[li],
    yoy: yoyS[li],
    growth3y: cum(12),
    growth5y: cum(20),
    growth10y: cum(li), // since series start (2016-Q1)
    cagr10y: at(li) != null ? cagr(v[0]!, price, li / 4) : null,
    maxPrice: { value: maxV, quarter: maxQ },
    minPrice: { value: minV, quarter: minQ },
    volatility: annualisedVolatility(qoqS),
    grossWage,
    netWage,
    rent,
    rentalYieldGross: ((rent * 12) / price) * 100,
    priceToIncome: unitPrice / (householdNetMonthly * 12),
    priceToRent: price / (rent * 12),
    mortgagePayment,
    affordabilityIndex,
  }
}

export const ALL_REGION_METRICS: Record<RegionId, ScopeMetrics> = Object.fromEntries(
  (Object.keys(REGIONAL_PRICES) as RegionId[]).map((id) => [id, computeScopeMetrics(id)]),
) as Record<RegionId, ScopeMetrics>

export const NATIONAL_METRICS = computeScopeMetrics('SK')
