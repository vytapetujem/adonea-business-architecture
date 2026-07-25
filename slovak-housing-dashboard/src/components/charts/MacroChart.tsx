import { useMemo, useState } from 'react'
import EChart, { CHART_BASE, AXIS_STYLE } from '../EChart'
import { MACRO } from '../../data/macro'
import { NATIONAL_PRICE } from '../../data/prices'
import { QUARTERS, quarterLabel } from '../../lib/quarters'
import { pctChange } from '../../lib/stats'
import { useFilters } from '../../state/FilterContext'
import { ProvenanceBadge } from '../ui'

const INDICATORS = [
  'mortgageRate', 'ecbDeposit', 'inflation', 'gdp', 'wage',
  'unemployment', 'permits', 'completions', 'constructionCost', 'netMigration',
] as const

/** Macro indicator vs. national y/y price growth — dual axis. */
export default function MacroChart() {
  const [indicator, setIndicator] = useState<(typeof INDICATORS)[number]>('mortgageRate')
  const { range } = useFilters()
  const ser = MACRO[indicator]

  const option = useMemo(() => {
    const [from, to] = range
    const x = QUARTERS.slice(from, to + 1)
    const yoy = pctChange(NATIONAL_PRICE.values, 4).slice(from, to + 1)
    const macroVals = ser.values.slice(from, to + 1)
    return {
      ...CHART_BASE,
      tooltip: {
        ...(CHART_BASE.tooltip as object),
        formatter: (ps: { axisValue: string; seriesName: string; value: number | null; marker: string }[]) =>
          `<div class="font-mono text-xs">${quarterLabel(ps[0]?.axisValue ?? '')}</div>` +
          ps.filter((p) => p.value != null)
            .map((p) => `${p.marker} ${p.seriesName}: <b>${(p.value as number).toLocaleString('sk-SK')}</b>`)
            .join('<br/>'),
      },
      legend: { ...(CHART_BASE.legend as object), top: 0 },
      xAxis: {
        type: 'category', data: x, ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: string) => (v.endsWith('Q1') ? v.slice(0, 4) : '') },
      },
      yAxis: [
        { type: 'value', name: ser.unit, scale: true, ...AXIS_STYLE, nameTextStyle: { color: '#556891', fontSize: 10 } },
        { type: 'value', name: 'rast cien % r/r', scale: true, ...AXIS_STYLE, splitLine: { show: false }, nameTextStyle: { color: '#556891', fontSize: 10 } },
      ],
      series: [
        {
          name: ser.label, type: 'line', data: macroVals, symbol: 'none', smooth: 0.2,
          lineStyle: { width: 2, color: '#4c9aff' }, yAxisIndex: 0,
        },
        {
          name: 'Rast cien bývania (r/r)', type: 'line', data: yoy?.map((v) => (v == null ? null : Math.round(v * 10) / 10)),
          symbol: 'none', smooth: 0.2, lineStyle: { width: 2, color: '#f5a623' }, yAxisIndex: 1,
        },
      ],
    }
  }, [indicator, range, ser])

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {INDICATORS.map((key) => (
          <button
            key={key}
            onClick={() => setIndicator(key)}
            className={`chip transition-colors ${
              indicator === key
                ? 'border-info/60 text-info bg-info/15'
                : 'border-ink-600 text-ink-300 hover:border-ink-400 hover:text-ink-200'
            }`}
          >
            {MACRO[key].label}
          </button>
        ))}
      </div>
      <EChart option={option as never} height={300} />
      <div className="flex items-center gap-2 mt-2 text-2xs text-ink-400">
        <ProvenanceBadge p={ser.provenance} />
        <span>{ser.note}</span>
      </div>
    </div>
  )
}
