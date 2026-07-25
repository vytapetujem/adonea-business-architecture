export const fmtEur = (x: number | null | undefined, digits = 0): string =>
  x == null || !isFinite(x)
    ? '–'
    : new Intl.NumberFormat('sk-SK', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(x) + ' €'

export const fmtNum = (x: number | null | undefined, digits = 0): string =>
  x == null || !isFinite(x)
    ? '–'
    : new Intl.NumberFormat('sk-SK', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(x)

export const fmtPct = (x: number | null | undefined, digits = 1, sign = true): string => {
  if (x == null || !isFinite(x)) return '–'
  const s = new Intl.NumberFormat('sk-SK', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    signDisplay: sign ? 'exceptZero' : 'auto',
  }).format(x)
  return `${s} %`
}

export const pctColor = (x: number | null | undefined): string =>
  x == null || !isFinite(x) ? 'text-neutral' : x > 0.05 ? 'text-pos' : x < -0.05 ? 'text-neg' : 'text-neutral'
