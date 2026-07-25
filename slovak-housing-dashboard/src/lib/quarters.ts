import type { QuarterKey } from './types'

export const FIRST_QUARTER: QuarterKey = '2016-Q1'
export const LAST_MEASURED_QUARTER: QuarterKey = '2025-Q4'

export function parseQuarter(q: QuarterKey): { year: number; q: number } {
  const [y, qq] = q.split('-Q')
  return { year: Number(y), q: Number(qq) }
}

export function quarterToIndex(q: QuarterKey): number {
  const { year, q: qq } = parseQuarter(q)
  return (year - 2016) * 4 + (qq - 1)
}

export function indexToQuarter(i: number): QuarterKey {
  const year = 2016 + Math.floor(i / 4)
  const qq = (i % 4) + 1
  return `${year}-Q${qq}`
}

export function addQuarters(q: QuarterKey, n: number): QuarterKey {
  return indexToQuarter(quarterToIndex(q) + n)
}

/** All measured quarters 2016-Q1 … 2025-Q4 (40 points). */
export const QUARTERS: QuarterKey[] = Array.from({ length: quarterToIndex(LAST_MEASURED_QUARTER) + 1 }, (_, i) =>
  indexToQuarter(i),
)

export function quarterLabel(q: QuarterKey): string {
  const { year, q: qq } = parseQuarter(q)
  return `Q${qq} ${year}`
}

/** Decimal representation for axes, e.g. 2016-Q3 → 2016.5 */
export function quarterDecimal(q: QuarterKey): number {
  const { year, q: qq } = parseQuarter(q)
  return year + (qq - 1) / 4
}
