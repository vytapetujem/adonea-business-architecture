import { useMemo } from 'react'
import { Section, ProvenanceBadge } from '../ui'
import EChart, { CHART_BASE, AXIS_STYLE } from '../EChart'
import { CYCLE_POINTS, CURRENT_PHASE_PROBS, PHASE_META } from '../../analytics/cycles'
import { QUARTERS, quarterLabel } from '../../lib/quarters'

export default function CyclesSection() {
  const option = useMemo(() => {
    return {
      ...CHART_BASE,
      tooltip: {
        ...(CHART_BASE.tooltip as object),
        formatter: (ps: { axisValue: string; value: number | null }[]) => {
          const i = QUARTERS.indexOf(ps[0]?.axisValue ?? '')
          const cp = CYCLE_POINTS[i]
          return cp
            ? `<div class="font-mono text-xs">${quarterLabel(cp.quarter)}</div>` +
                `Fáza: <b style="color:${PHASE_META[cp.phase].color}">${PHASE_META[cp.phase].label}</b><br/>` +
                `Rast r/r: <b>${cp.yoy == null ? '–' : cp.yoy.toFixed(1) + ' %'}</b>`
            : ''
        },
      },
      xAxis: {
        type: 'category', data: QUARTERS, ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (v: string) => (v.endsWith('Q1') ? v.slice(0, 4) : '') },
      },
      yAxis: { type: 'value', name: '% r/r', ...AXIS_STYLE, nameTextStyle: { color: '#556891', fontSize: 10 } },
      series: [
        {
          name: 'Rast cien r/r', type: 'bar', barCategoryGap: '18%',
          data: CYCLE_POINTS.map((cp) => ({
            value: cp.yoy == null ? null : Math.round(cp.yoy * 10) / 10,
            itemStyle: { color: PHASE_META[cp.phase].color, opacity: 0.85, borderRadius: [2, 2, 0, 0] },
          })),
        },
      ],
    }
  }, [])

  return (
    <Section
      id="cycles"
      kicker="Trhové cykly"
      title="Fázy trhu a aktuálna pozícia v cykle"
      intro="Automatická klasifikácia podľa medziročného rastu a jeho momenta (pravidlá v metodike): boom ≥ 10 %, akcelerácia ≥ 3 % so zrýchľovaním, korekcia pri poklese, stagnácia do ±2,5 %. Dekáda obsahovala kompletný cyklus: expanzia 2016–2019 → pandemický boom 2020–2022 → korekcia 2022–2024 → stagnácia → nový boom 2025."
      right={<ProvenanceBadge p="derived" />}
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="panel p-4">
          <div className="panel-title mb-2">Medziročný rast zafarbený podľa fázy cyklu</div>
          <EChart option={option as never} height={340} />
          <div className="flex flex-wrap gap-3 mt-3">
            {Object.entries(PHASE_META).map(([id, m]) => (
              <span key={id} className="flex items-center gap-1.5 text-2xs text-ink-300">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: m.color }} />
                {m.label}
              </span>
            ))}
          </div>
        </div>

        <div className="panel p-4">
          <div className="panel-title mb-3">Pravdepodobnosť aktuálnej fázy (2026-Q1)</div>
          <div className="space-y-3">
            {CURRENT_PHASE_PROBS.map(({ phase, p }) => (
              <div key={phase}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink-200">{PHASE_META[phase].label}</span>
                  <span className="num font-semibold" style={{ color: PHASE_META[phase].color }}>{p} %</span>
                </div>
                <div className="h-1.5 rounded-full bg-ink-700 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p}%`, backgroundColor: PHASE_META[phase].color }} />
                </div>
                <p className="text-2xs text-ink-400 mt-0.5">{PHASE_META[phase].desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
