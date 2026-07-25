import { useMemo } from 'react'
import EChart, { CHART_BASE, AXIS_STYLE } from '../EChart'
import { NATIONAL_PRICE } from '../../data/prices'
import { FORECASTS } from '../../analytics/forecast'
import { QUARTERS, quarterLabel } from '../../lib/quarters'
import { fmtEur } from '../../lib/format'

const COLORS: Record<string, string> = { optimistic: '#2fbf71', base: '#a78bfa', pessimistic: '#e5484d' }

/** History (from 2020) + three scenario paths, base scenario with 80 % CI band. */
export default function ForecastChart() {
  const option = useMemo(() => {
    const histStart = QUARTERS.indexOf('2020-Q1')
    const histQ = QUARTERS.slice(histStart)
    const histV = NATIONAL_PRICE.values.slice(histStart)
    const base = FORECASTS.find((f) => f.id === 'base')!
    const fanQ = base.points.map((p) => p.quarter)
    const xData = [...histQ, ...fanQ]
    const lastIdx = histQ.length - 1
    const lastVal = histV[lastIdx]

    const scenarioSeries = FORECASTS.map((f) => ({
      name: `${f.label} (${Math.round(f.probability * 100)} %)`,
      type: 'line',
      data: [
        ...histQ.map((_, i) => (i === lastIdx ? lastVal : null)),
        ...f.points.map((p) => p.value),
      ],
      symbol: 'none',
      smooth: 0.2,
      lineStyle: { width: f.id === 'base' ? 2.5 : 1.8, type: 'dashed', color: COLORS[f.id] },
      z: 3,
    }))

    return {
      ...CHART_BASE,
      tooltip: {
        ...(CHART_BASE.tooltip as object),
        formatter: (ps: { axisValue: string; seriesName: string; value: number | null; marker: string }[]) =>
          `<div class="font-mono text-xs">${quarterLabel(ps[0]?.axisValue ?? '')}</div>` +
          ps.filter((p) => p.value != null && !p.seriesName.startsWith('_'))
            .map((p) => `${p.marker} ${p.seriesName}: <b>${fmtEur(p.value as number)}/m²</b>`)
            .join('<br/>'),
      },
      legend: {
        ...(CHART_BASE.legend as object),
        top: 0,
        data: ['História (NBS)', '80 % interval (základný)', ...FORECASTS.map((f) => `${f.label} (${Math.round(f.probability * 100)} %)`)],
      },
      xAxis: {
        type: 'category', data: xData, ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: string) => (v.endsWith('Q1') ? v.slice(0, 4) : '') },
      },
      yAxis: { type: 'value', scale: true, ...AXIS_STYLE, axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: number) => `${Math.round(v / 100) / 10}k` } },
      series: [
        {
          name: 'História (NBS)', type: 'line', data: [...histV, ...fanQ.map(() => null)],
          symbol: 'none', smooth: 0.15, lineStyle: { width: 2.2, color: '#f5a623' }, z: 4,
        },
        {
          name: '_lo', type: 'line', stack: 'ci', showInLegend: false,
          data: [...histQ.map(() => null), ...base.points.map((p) => p.lo)],
          symbol: 'none', lineStyle: { width: 0 }, z: 1, tooltip: { show: false },
        },
        {
          name: '80 % interval (základný)', type: 'line', stack: 'ci',
          data: [...histQ.map(() => null), ...base.points.map((p) => p.hi - p.lo)],
          symbol: 'none', lineStyle: { width: 0 }, areaStyle: { color: 'rgba(167,139,250,0.13)' }, z: 1,
          tooltip: { show: false },
        },
        ...scenarioSeries,
      ],
    }
  }, [])

  return <EChart option={option as never} height={380} />
}
