import { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  DataZoomComponent,
  VisualMapComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

echarts.use([
  LineChart, BarChart, ScatterChart,
  GridComponent, TooltipComponent, LegendComponent,
  MarkAreaComponent, MarkLineComponent, DataZoomComponent, VisualMapComponent,
  CanvasRenderer,
])

export const CHART_BASE: EChartsCoreOption = {
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'Inter, system-ui, sans-serif', color: '#8496b8' },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#0e131e',
    borderColor: '#243047',
    textStyle: { color: '#dde4f0', fontSize: 12 },
    axisPointer: { type: 'line', lineStyle: { color: '#556891' } },
  },
  legend: { textStyle: { color: '#8496b8', fontSize: 11 }, icon: 'roundRect', itemWidth: 10, itemHeight: 4 },
  grid: { left: 48, right: 20, top: 40, bottom: 32, containLabel: false },
}

export const AXIS_STYLE = {
  axisLine: { lineStyle: { color: '#243047' } },
  axisTick: { show: false },
  axisLabel: { color: '#556891', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' },
  splitLine: { lineStyle: { color: '#141b29' } },
}

export default function EChart({
  option,
  height = 320,
  onEvents,
  className = '',
}: {
  option: EChartsCoreOption
  height?: number
  className?: string
  onEvents?: Record<string, (params: unknown) => void>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const chartRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current)
    chartRef.current = chart
    const ro = new ResizeObserver(() => chart.resize())
    ro.observe(ref.current)
    return () => {
      ro.disconnect()
      chart.dispose()
      chartRef.current = null
    }
  }, [])

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return
    chart.setOption(option, { notMerge: true })
    if (onEvents) {
      for (const [ev, handler] of Object.entries(onEvents)) {
        chart.off(ev)
        chart.on(ev, handler as never)
      }
    }
  }, [option, onEvents])

  return <div ref={ref} className={className} style={{ height, width: '100%' }} />
}
