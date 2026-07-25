import { useMemo } from 'react'
import EChart, { CHART_BASE, AXIS_STYLE } from '../EChart'
import { useFilters } from '../../state/FilterContext'
import { priceSeries } from '../../analytics/metrics'
import { EVENTS, EVENT_CATEGORY_META } from '../../data/events'
import { FORECASTS } from '../../analytics/forecast'
import { QUARTERS, quarterLabel, quarterToIndex } from '../../lib/quarters'
import { fmtEur } from '../../lib/format'
import { regionById } from '../../data/regions'
import { NATIONAL_PRICE } from '../../data/prices'

/**
 * Main price chart: history (solid), event bands (markArea), optional forecast
 * fan (base scenario + 80 % interval), driven by global filters.
 */
export default function PriceChart({ withForecast = false, height = 380 }: { withForecast?: boolean; height?: number }) {
  const { scope, propertyType, range, showEvents, highlightedEvent } = useFilters()

  const option = useMemo(() => {
    const series = priceSeries(scope, propertyType)
    const [from, to] = range
    const histQuarters = QUARTERS.slice(from, to + 1)
    const histValues = series.values.slice(from, to + 1)

    const includeForecast = withForecast && to === QUARTERS.length - 1
    const base = FORECASTS.find((f) => f.id === 'base')!
    // The forecast is built on the national all-dwellings series; when another
    // scope/type is selected, rescale the fan to the selected series' last level.
    const nationalLast = NATIONAL_PRICE.values[NATIONAL_PRICE.values.length - 1] ?? 1
    const scale =
      scope === 'SK' && propertyType === 'all' ? 1 : (histValues[histValues.length - 1] ?? nationalLast) / nationalLast

    const fanQuarters = includeForecast ? base.points.map((p) => p.quarter) : []
    const xData = [...histQuarters, ...fanQuarters]

    const events = showEvents
      ? EVENTS.filter((e) => !e.regions || scope === 'SK' || e.regions.includes(scope as never))
      : []

    const markAreas = events.map((e) => {
      const meta = EVENT_CATEGORY_META[e.category]
      const active = highlightedEvent === e.id
      const fromIdx = Math.max(from, quarterToIndex(e.from)) - from
      const toIdx = Math.min(to, quarterToIndex(e.to ?? e.from)) - from
      if (toIdx < 0 || fromIdx > to - from) return null
      return [
        {
          name: e.title,
          xAxis: xData[Math.max(0, fromIdx)],
          itemStyle: { color: meta.color, opacity: active ? 0.28 : 0.07 },
          label: active
            ? { show: true, formatter: e.title, position: 'insideTop', color: '#dde4f0', fontSize: 10 }
            : { show: false },
        },
        { xAxis: xData[Math.min(xData.length - 1, Math.max(0, toIdx))] },
      ]
    }).filter(Boolean)

    const histPad = (arr: (number | null)[]) => [...arr, ...fanQuarters.map(() => null)]
    // connector = repeat the last historical value so the dashed line joins the history
    const fanPad = (get: (i: number) => number | null, connector: boolean) => [
      ...histQuarters.map((_, i) => (connector && i === histQuarters.length - 1 ? histValues[i] : null)),
      ...base.points.map((_, i) => get(i)),
    ]

    return {
      ...CHART_BASE,
      tooltip: {
        ...(CHART_BASE.tooltip as object),
        formatter: (params: { axisValueLabel?: string; axisValue?: string; seriesName: string; value: number | null; marker: string }[]) => {
          const rows = params
            .filter((p) => p.value != null)
            .map((p) => `${p.marker} ${p.seriesName}: <b>${fmtEur(p.value as number)}/m²</b>`)
          return `<div class="font-mono text-xs">${quarterLabel((params[0]?.axisValue as string) ?? '')}</div>` + rows.join('<br/>')
        },
      },
      xAxis: {
        type: 'category',
        data: xData,
        ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: string) => (v.endsWith('Q1') ? v.slice(0, 4) : '') },
      },
      yAxis: {
        type: 'value',
        scale: true,
        ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: number) => `${Math.round(v / 100) / 10}k` },
      },
      series: [
        {
          name: `${scope === 'SK' ? 'Slovensko' : regionById(scope as never).shortName} · ${propertyType === 'all' ? 'spolu' : propertyType === 'flat' ? 'byty' : 'domy'}`,
          type: 'line',
          data: histPad(histValues),
          smooth: 0.15,
          symbol: 'none',
          lineStyle: { width: 2.2, color: '#f5a623' },
          areaStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(245,166,35,0.22)' },
                { offset: 1, color: 'rgba(245,166,35,0)' },
              ],
            },
          },
          markArea: markAreas.length ? { silent: true, data: markAreas } : undefined,
          z: 3,
        },
        ...(includeForecast
          ? [
              {
                name: 'Prognóza (základný scenár)',
                type: 'line',
                data: fanPad((i) => Math.round(base.points[i].value * scale), true),
                symbol: 'none',
                lineStyle: { width: 2, type: 'dashed', color: '#a78bfa' },
                z: 3,
              },
              {
                name: '80 % interval — dolná',
                type: 'line',
                data: fanPad((i) => Math.round(base.points[i].lo * scale), false),
                symbol: 'none',
                lineStyle: { width: 0 },
                stack: 'ci',
                tooltip: { show: false },
                z: 1,
              },
              {
                name: '80 % interval',
                type: 'line',
                data: fanPad((i) => Math.round((base.points[i].hi - base.points[i].lo) * scale), false),
                symbol: 'none',
                lineStyle: { width: 0 },
                stack: 'ci',
                areaStyle: { color: 'rgba(167,139,250,0.14)' },
                tooltip: { show: false },
                z: 1,
              },
            ]
          : []),
      ],
      legend: { ...(CHART_BASE.legend as object), top: 0, data: includeForecast ? [`${scope === 'SK' ? 'Slovensko' : regionById(scope as never).shortName} · ${propertyType === 'all' ? 'spolu' : propertyType === 'flat' ? 'byty' : 'domy'}`, 'Prognóza (základný scenár)', '80 % interval'] : undefined },
    }
  }, [scope, propertyType, range, showEvents, highlightedEvent, withForecast])

  return <EChart option={option as never} height={height} />
}
