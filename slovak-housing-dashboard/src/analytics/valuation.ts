import { MACRO, NET_WAGE_RATIO } from '../data/macro'
import { NATIONAL_PRICE } from '../data/prices'
import { NATIONAL_RENT_2025, RENT_INDEX_BY_YEAR } from '../data/rents'
import { QUARTERS, parseQuarter } from '../lib/quarters'
import { annuityMonthly, clamp, logistic, mean } from '../lib/stats'
import { AFFORDABILITY_ASSUMPTIONS as A } from './metrics'

/**
 * Market valuation model (docs/FORECAST_METHODOLOGY.md §4).
 *
 * Three measurable pillars, each expressed as % deviation from its 2016–2025 mean:
 *  1. Price-to-income (PTI): price of a 70 m² unit / annual net household income.
 *  2. Price-to-rent (PTR): price per m² / annual market rent per m².
 *  3. Affordability (DSTI-based): mortgage payment on 80 % LTV vs. 40 % of net
 *     household income — deviation of payment burden from its decade mean.
 *
 * Composite misvaluation = weighted mean (PTI 40 %, PTR 30 %, burden 30 %).
 * Interpretation bands: <−5 % undervalued · −5…+10 % fairly valued · >+10 % overvalued.
 * Caveats: 10-year mean as "fair" is itself an assumption (the decade contains a
 * boom and a bubble deflation; NBS's own models used richer fundamentals).
 */
export interface ValuationResult {
  quarter: string
  pti: number
  ptiMean: number
  ptr: number
  ptrMean: number
  burden: number // share of net household income for the standard mortgage
  burdenMean: number
  devPti: number // % deviation from mean
  devPtr: number
  devBurden: number
  composite: number // % misvaluation estimate
  verdict: 'undervalued' | 'fair' | 'overvalued'
  fairValue: number // €/m² implied by composite
  currentPrice: number
  bubbleProbability: number // 0–1
  correctionProbability: number // P(nominal decline within 8 quarters)
  recoveryProbability: number // P(growth continues / resumes within 8 quarters)
  history: { quarter: string; pti: number; ptr: number; burden: number }[]
}

export function computeValuation(): ValuationResult {
  const prices = NATIONAL_PRICE.values
  const history = QUARTERS.map((quarter, i) => {
    const price = prices[i]!
    const wage = MACRO.wage.values[i]!
    const rate = MACRO.mortgageRate.values[i]!
    const { year } = parseQuarter(quarter)
    const rent = NATIONAL_RENT_2025 * (RENT_INDEX_BY_YEAR[clamp(year, 2016, 2025)] / RENT_INDEX_BY_YEAR[2025])

    const netHouseholdMonthly = wage * NET_WAGE_RATIO * A.householdEarners
    const unitPrice = price * A.unitM2
    const pti = unitPrice / (netHouseholdMonthly * 12)
    const ptr = price / (rent * 12)
    const burden = annuityMonthly(unitPrice * A.ltv, rate, A.maturityYears) / netHouseholdMonthly
    return { quarter, pti, ptr, burden }
  })

  const last = history[history.length - 1]
  const ptiMean = mean(history.map((h) => h.pti))
  const ptrMean = mean(history.map((h) => h.ptr))
  const burdenMean = mean(history.map((h) => h.burden))

  const devPti = (last.pti / ptiMean - 1) * 100
  const devPtr = (last.ptr / ptrMean - 1) * 100
  const devBurden = (last.burden / burdenMean - 1) * 100
  const composite = 0.4 * devPti + 0.3 * devPtr + 0.3 * devBurden

  const currentPrice = prices[prices.length - 1]!
  const fairValue = Math.round(currentPrice / (1 + composite / 100))

  // Probability mappings (logistic in composite deviation; calibration in docs):
  const bubbleProbability = logistic((composite - 25) / 8) // >25 % dev ≈ bubble territory
  const correctionProbability = clamp(0.15 + logistic((composite - 18) / 7) * 0.55, 0.05, 0.85)
  const recoveryProbability = clamp(1 - correctionProbability + 0.1, 0.1, 0.95)

  return {
    quarter: last.quarter,
    pti: last.pti,
    ptiMean,
    ptr: last.ptr,
    ptrMean,
    burden: last.burden,
    burdenMean,
    devPti,
    devPtr,
    devBurden,
    composite,
    verdict: composite < -5 ? 'undervalued' : composite <= 10 ? 'fair' : 'overvalued',
    fairValue,
    currentPrice,
    bubbleProbability,
    correctionProbability,
    recoveryProbability,
    history,
  }
}

export const VALUATION = computeValuation()
