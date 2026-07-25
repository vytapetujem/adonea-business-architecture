/** Small statistics toolkit used by the analytics layer. All formulas documented in docs/FORECAST_METHODOLOGY.md */

export function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN
}

export function std(xs: number[]): number {
  if (xs.length < 2) return NaN
  const m = mean(xs)
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (xs.length - 1))
}

/** Pearson correlation of two equally long series (pairs with nulls dropped). */
export function correlation(a: (number | null)[], b: (number | null)[]): number {
  const xs: number[] = []
  const ys: number[] = []
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] != null && b[i] != null && isFinite(a[i]!) && isFinite(b[i]!)) {
      xs.push(a[i]!)
      ys.push(b[i]!)
    }
  }
  if (xs.length < 3) return NaN
  const mx = mean(xs)
  const my = mean(ys)
  let num = 0
  let dx = 0
  let dy = 0
  for (let i = 0; i < xs.length; i++) {
    num += (xs[i] - mx) * (ys[i] - my)
    dx += (xs[i] - mx) ** 2
    dy += (ys[i] - my) ** 2
  }
  return dx && dy ? num / Math.sqrt(dx * dy) : NaN
}

/** Shift a series by `lag` steps (positive lag = series leads the target). */
export function lagSeries(xs: (number | null)[], lag: number): (number | null)[] {
  if (lag === 0) return xs
  const out: (number | null)[] = new Array(xs.length).fill(null)
  for (let i = 0; i < xs.length; i++) {
    const j = i + lag
    if (j >= 0 && j < xs.length) out[j] = xs[i]
  }
  return out
}

/** Quarter-over-quarter % change series. */
export function pctChange(xs: (number | null)[], periods = 1): (number | null)[] {
  return xs.map((x, i) => {
    const prev = i >= periods ? xs[i - periods] : null
    return x != null && prev != null && prev !== 0 ? ((x - prev) / prev) * 100 : null
  })
}

/** CAGR between two values over n years, in % p.a. */
export function cagr(from: number, to: number, years: number): number {
  return ((to / from) ** (1 / years) - 1) * 100
}

/** Annualised volatility of quarterly % changes (σ_q · √4), in pp. */
export function annualisedVolatility(qoqPct: (number | null)[]): number {
  const xs = qoqPct.filter((x): x is number => x != null && isFinite(x))
  return std(xs) * 2
}

/** Simple OLS y = a + b·x. Returns slope, intercept and R². */
export function ols(x: number[], y: number[]): { a: number; b: number; r2: number } {
  const n = Math.min(x.length, y.length)
  const mx = mean(x.slice(0, n))
  const my = mean(y.slice(0, n))
  let sxy = 0
  let sxx = 0
  let syy = 0
  for (let i = 0; i < n; i++) {
    sxy += (x[i] - mx) * (y[i] - my)
    sxx += (x[i] - mx) ** 2
    syy += (y[i] - my) ** 2
  }
  const b = sxx ? sxy / sxx : 0
  const a = my - b * mx
  const r2 = sxx && syy ? (sxy * sxy) / (sxx * syy) : 0
  return { a, b, r2 }
}

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x))

/** Logistic squash mapping a z-like score to (0,1). */
export const logistic = (x: number, k = 1) => 1 / (1 + Math.exp(-k * x))

/** Annuity payment for principal P, annual rate r (%), n years, monthly payments. */
export function annuityMonthly(principal: number, annualRatePct: number, years: number): number {
  const i = annualRatePct / 100 / 12
  const n = years * 12
  if (i === 0) return principal / n
  return (principal * i) / (1 - (1 + i) ** -n)
}
