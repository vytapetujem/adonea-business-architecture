import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CITY_DOTS, REGIONS } from '../../data/regions'
import { ALL_REGION_METRICS, type ScopeMetrics } from '../../analytics/metrics'
import { REGION_SCORES } from '../../analytics/investment'
import { useFilters } from '../../state/FilterContext'
import type { RegionId } from '../../lib/types'
import { fmtEur, fmtNum, fmtPct } from '../../lib/format'

type MapMetric = {
  id: string
  label: string
  get: (m: ScopeMetrics) => number
  format: (v: number) => string
  /** true when higher = "hotter" */
  higherIsHot: boolean
}

const METRICS: MapMetric[] = [
  { id: 'price', label: 'Cena €/m²', get: (m) => m.price, format: (v) => fmtEur(v), higherIsHot: true },
  { id: 'qoq', label: 'Rast q/q', get: (m) => m.qoq ?? 0, format: (v) => fmtPct(v), higherIsHot: true },
  { id: 'yoy', label: 'Rast r/r', get: (m) => m.yoy ?? 0, format: (v) => fmtPct(v), higherIsHot: true },
  { id: 'g3', label: 'Rast 3 roky', get: (m) => m.growth3y ?? 0, format: (v) => fmtPct(v), higherIsHot: true },
  { id: 'g5', label: 'Rast 5 rokov', get: (m) => m.growth5y ?? 0, format: (v) => fmtPct(v), higherIsHot: true },
  { id: 'g10', label: 'Rast 10 rokov', get: (m) => m.growth10y ?? 0, format: (v) => fmtPct(v), higherIsHot: true },
  { id: 'vol', label: 'Volatilita', get: (m) => m.volatility, format: (v) => `${fmtNum(v, 1)} p. b.`, higherIsHot: true },
  { id: 'wage', label: 'Priemerná mzda', get: (m) => m.grossWage, format: (v) => fmtEur(v), higherIsHot: true },
  { id: 'afford', label: 'Dostupnosť hypotéky', get: (m) => m.affordabilityIndex, format: (v) => fmtNum(v, 2), higherIsHot: false },
  { id: 'payment', label: 'Splátka hypotéky', get: (m) => m.mortgagePayment, format: (v) => `${fmtEur(v)}/mes.`, higherIsHot: true },
  { id: 'rent', label: 'Nájomné €/m²', get: (m) => m.rent, format: (v) => `${fmtNum(v, 1)} €/m²`, higherIsHot: true },
  { id: 'pti', label: 'Cena / príjem', get: (m) => m.priceToIncome, format: (v) => `${fmtNum(v, 1)} r.`, higherIsHot: true },
  { id: 'ptr', label: 'Cena / nájom', get: (m) => m.priceToRent, format: (v) => fmtNum(v, 1), higherIsHot: true },
  { id: 'invest', label: 'Investičná atraktivita', get: (m) => REGION_SCORES.find((s) => s.id === m.scope)!.total, format: (v) => `${fmtNum(v)}/100`, higherIsHot: true },
  { id: 'risk', label: 'Trhové riziko', get: (m) => REGION_SCORES.find((s) => s.id === m.scope)!.risk, format: (v) => `${fmtNum(v)}/100`, higherIsHot: true },
]

/** Interpolate in a cold→hot gradient (deep blue → amber → red). */
function heatColor(t: number): string {
  const stops = [
    [26, 42, 74], // #1a2a4a
    [32, 76, 122], // blue
    [64, 128, 128],
    [200, 150, 40], // amber
    [229, 72, 77], // red
  ]
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(x))
  const f = x - i
  const c = stops[i].map((a, k) => Math.round(a + (stops[i + 1][k] - a) * f))
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

export default function SlovakiaMap() {
  const [metric, setMetric] = useState<MapMetric>(METRICS[0])
  const [hover, setHover] = useState<RegionId | null>(null)
  const { scope, setScope } = useFilters()

  const { values, min, max } = useMemo(() => {
    const values = Object.fromEntries(
      REGIONS.map((r) => [r.id, metric.get(ALL_REGION_METRICS[r.id])]),
    ) as Record<RegionId, number>
    const xs = Object.values(values)
    return { values, min: Math.min(...xs), max: Math.max(...xs) }
  }, [metric])

  const t = (v: number) => {
    const raw = max === min ? 0.5 : (v - min) / (max - min)
    return metric.higherIsHot ? raw : 1 - raw
  }

  const hovered = hover ? ALL_REGION_METRICS[hover] : null

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {METRICS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMetric(m)}
            className={`chip transition-colors ${
              metric.id === m.id
                ? 'border-accent/60 text-accent bg-accent/15'
                : 'border-ink-600 text-ink-300 hover:border-ink-400 hover:text-ink-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_290px] gap-4">
        <div className="relative">
          <svg viewBox="0 0 1010 500" className="w-full h-auto select-none">
            <g transform="translate(4,6)">
              {REGIONS.map((r) => {
                const active = scope === r.id
                const isHover = hover === r.id
                return (
                  <motion.path
                    key={r.id}
                    d={r.path}
                    fill={heatColor(t(values[r.id]))}
                    stroke={active ? '#f5a623' : isHover ? '#8496b8' : '#0a0e16'}
                    strokeWidth={active ? 3 : isHover ? 2 : 1.5}
                    className="cursor-pointer"
                    style={{ filter: isHover || active ? 'brightness(1.25)' : undefined }}
                    onMouseEnter={() => setHover(r.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setScope(scope === r.id ? 'SK' : r.id)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )
              })}
              {REGIONS.map((r) => (
                <g key={`lbl-${r.id}`} pointerEvents="none">
                  <text x={r.labelPos[0]} y={r.labelPos[1]} textAnchor="middle" fontSize="15" fontWeight="600" fill="#dde4f0">
                    {r.id}
                  </text>
                  <text x={r.labelPos[0]} y={r.labelPos[1] + 17} textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono, monospace" fill="#b6c2d9">
                    {metric.format(values[r.id])}
                  </text>
                </g>
              ))}
              {CITY_DOTS.map((c) => (
                <g key={c.name} pointerEvents="none">
                  <circle cx={c.x} cy={c.y} r={2.5} fill="#dde4f0" opacity={0.8} />
                </g>
              ))}
            </g>
          </svg>

          {/* legend */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xs text-ink-400 num">{metric.format(metric.higherIsHot ? min : max)}</span>
            <div className="h-2 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map((x) => heatColor(x)).join(',')})` }} />
            <span className="text-2xs text-ink-400 num">{metric.format(metric.higherIsHot ? max : min)}</span>
          </div>
          <p className="text-2xs text-ink-400 mt-2">
            Schematická mapa (zjednodušené hranice). Klik = výber kraja pre celý dashboard, opätovný klik = návrat na SR.
            Okresné dáta NBS nepublikuje v otvorenej forme — analýza je na úrovni krajov (pozri obmedzenia).
          </p>
        </div>

        {/* hover / selection panel */}
        <RegionMiniPanel metrics={hovered ?? (scope !== 'SK' ? ALL_REGION_METRICS[scope as RegionId] : null)} />
      </div>
    </div>
  )
}

function RegionMiniPanel({ metrics }: { metrics: ScopeMetrics | null }) {
  if (!metrics) {
    return (
      <div className="panel p-4 text-sm text-ink-400 flex items-center justify-center text-center">
        Prejdite kurzorom nad kraj alebo naň kliknite pre detailné metriky.
      </div>
    )
  }
  const r = REGIONS.find((x) => x.id === metrics.scope)!
  const score = REGION_SCORES.find((s) => s.id === metrics.scope)!
  const rows: [string, string][] = [
    ['Cena', `${fmtEur(metrics.price)}/m²`],
    ['Rast q/q · r/r', `${fmtPct(metrics.qoq)} · ${fmtPct(metrics.yoy)}`],
    ['Rast 3 r · 5 r · 10 r', `${fmtPct(metrics.growth3y, 0)} · ${fmtPct(metrics.growth5y, 0)} · ${fmtPct(metrics.growth10y, 0)}`],
    ['Maximum · minimum', `${fmtEur(metrics.maxPrice.value)} (${metrics.maxPrice.quarter}) · ${fmtEur(metrics.minPrice.value)} (${metrics.minPrice.quarter})`],
    ['Volatilita (ann.)', `${fmtNum(metrics.volatility, 1)} p. b.`],
    ['Priemerná hrubá mzda', fmtEur(metrics.grossWage)],
    ['Splátka hypotéky*', `${fmtEur(metrics.mortgagePayment)}/mes.`],
    ['Index dostupnosti', fmtNum(metrics.affordabilityIndex, 2)],
    ['Nájomné (odhad)', `${fmtNum(metrics.rent, 1)} €/m²/mes.`],
    ['Cena/príjem · cena/nájom', `${fmtNum(metrics.priceToIncome, 1)} r. · ${fmtNum(metrics.priceToRent, 1)}`],
    ['Invest. skóre · riziko', `${score.total}/100 · ${score.risk}/100`],
    ['Očakávaný trend', score.expectedTrend],
  ]
  return (
    <div className="panel p-4">
      <div className="text-sm font-semibold text-ink-100">{r.name}</div>
      <div className="text-2xs text-ink-400 mb-3">
        {r.capital} · {fmtNum(r.population)} obyv. · {Math.round(r.supplyShare * 100)} % ponuky SR
      </div>
      <dl className="space-y-1.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-2xs">
            <dt className="text-ink-400">{k}</dt>
            <dd className="num text-ink-200 text-right">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="text-2xs text-ink-400 mt-3 leading-relaxed">
        *70 m², 80 % LTV, 30 rokov, aktuálna priemerná sadzba. Krajské série sú modelové odhady kalibrované na kotvy NBS (±5–10 %).
      </div>
    </div>
  )
}
