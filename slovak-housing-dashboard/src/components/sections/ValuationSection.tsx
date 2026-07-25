import { useMemo } from 'react'
import { Section, StatTile, Disclaimer, ProvenanceBadge } from '../ui'
import EChart, { CHART_BASE, AXIS_STYLE } from '../EChart'
import { VALUATION } from '../../analytics/valuation'
import { fmtNum, fmtPct } from '../../lib/format'
import { quarterLabel } from '../../lib/quarters'

const VERDICT_META = {
  undervalued: { label: 'PODHODNOTENÝ', cls: 'text-pos' },
  fair: { label: 'FÉROVO OCENENÝ', cls: 'text-info' },
  overvalued: { label: 'NADHODNOTENÝ', cls: 'text-neg' },
}

export default function ValuationSection() {
  const v = VALUATION
  const meta = VERDICT_META[v.verdict]

  const option = useMemo(() => {
    const q = v.history.map((h) => h.quarter)
    return {
      ...CHART_BASE,
      legend: { ...(CHART_BASE.legend as object), top: 0 },
      tooltip: {
        ...(CHART_BASE.tooltip as object),
        formatter: (ps: { axisValue: string; seriesName: string; value: number | null; marker: string }[]) =>
          `<div class="font-mono text-xs">${quarterLabel(ps[0]?.axisValue ?? '')}</div>` +
          ps.filter((p) => p.value != null).map((p) => `${p.marker} ${p.seriesName}: <b>${(p.value as number).toFixed(2)}</b>`).join('<br/>'),
      },
      xAxis: {
        type: 'category', data: q, ...AXIS_STYLE,
        axisLabel: { ...AXIS_STYLE.axisLabel, formatter: (x: string) => (x.endsWith('Q1') ? x.slice(0, 4) : '') },
      },
      yAxis: [
        { type: 'value', name: 'roky príjmu', scale: true, ...AXIS_STYLE, nameTextStyle: { color: '#556891', fontSize: 10 } },
        { type: 'value', name: 'podiel príjmu', scale: true, ...AXIS_STYLE, splitLine: { show: false }, nameTextStyle: { color: '#556891', fontSize: 10 } },
      ],
      series: [
        {
          name: 'Cena / príjem (PTI)', type: 'line', data: v.history.map((h) => Math.round(h.pti * 100) / 100),
          symbol: 'none', smooth: 0.2, lineStyle: { width: 2, color: '#f5a623' },
          markLine: {
            silent: true, symbol: 'none',
            data: [{ yAxis: Math.round(v.ptiMean * 100) / 100, label: { formatter: 'Ø PTI', color: '#8496b8', fontSize: 10 }, lineStyle: { color: '#f5a62366', type: 'dashed' } }],
          },
        },
        {
          name: 'Splátka / príjem (DSTI záťaž)', type: 'line', yAxisIndex: 1,
          data: v.history.map((h) => Math.round(h.burden * 1000) / 1000),
          symbol: 'none', smooth: 0.2, lineStyle: { width: 2, color: '#4c9aff' },
        },
      ],
    }
  }, [v])

  return (
    <Section
      id="valuation"
      kicker="Ocenenie trhu"
      title="Je slovenský trh nadhodnotený?"
      intro={
        <>
          Kompozit troch merateľných pilierov (odchýlka od priemeru 2016–2025): cena/príjem (váha 40 %), cena/nájom (30 %) a
          hypotekárna záťaž (30 %). Interpretačné pásma: pod −5 % podhodnotený · −5 až +10 % férový · nad +10 % nadhodnotený.
          Referenčný „férový“ bod je dekádny priemer — je to konzervatívna, ale spochybniteľná voľba (pozri metodiku).
        </>
      }
      right={<ProvenanceBadge p="derived" />}
    >
      <div className="panel p-5 mb-4 flex flex-wrap items-center gap-6">
        <div>
          <div className="panel-title">Verdikt (2025-Q4)</div>
          <div className={`text-3xl font-bold tracking-tight mt-1 ${meta.cls}`}>{meta.label}</div>
          <div className="text-xs text-ink-300 mt-1">
            kompozitná odchýlka <b className={`num ${meta.cls}`}>{fmtPct(v.composite, 1)}</b> od odhadu fér hodnoty
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2.5 min-w-[280px]">
          <StatTile label="Aktuálna cena" value={`${fmtNum(v.currentPrice)} €/m²`} />
          <StatTile label="Odhad fér hodnoty" value={`${fmtNum(v.fairValue)} €/m²`} tone="accent" sub="implikovaná kompozitom" />
          <StatTile label="PTI dnes vs. Ø" value={`${fmtNum(v.pti, 1)} / ${fmtNum(v.ptiMean, 1)} r.`} sub={fmtPct(v.devPti, 1)} />
          <StatTile label="Splátka/príjem vs. Ø" value={`${fmtPct(v.burden * 100, 0, false)} / ${fmtPct(v.burdenMean * 100, 0, false)}`} sub={fmtPct(v.devBurden, 1)} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-2.5 mb-4">
        <StatTile
          label="Pravdepodobnosť bubliny"
          value={fmtPct(v.bubbleProbability * 100, 0, false)}
          tone={v.bubbleProbability > 0.4 ? 'neg' : 'default'}
          sub="logistické mapovanie kompozitu (prah ~25 %)"
        />
        <StatTile
          label="Pravdepodobnosť korekcie"
          value={fmtPct(v.correctionProbability * 100, 0, false)}
          tone={v.correctionProbability > 0.4 ? 'neg' : 'default'}
          sub="nominálny pokles do 8 kvartálov"
        />
        <StatTile
          label="Pravdepodobnosť pokračovania rastu"
          value={fmtPct(v.recoveryProbability * 100, 0, false)}
          tone="pos"
          sub="rast pokračuje / obnoví sa do 8 kvartálov"
        />
      </div>

      <div className="panel p-4">
        <div className="panel-title mb-2">Vývoj ukazovateľov ocenenia</div>
        <EChart option={option as never} height={320} />
      </div>

      <Disclaimer>
        Predpoklady: 70 m² byt, domácnosť 1,6 zárobku, čistá mzda ≈ 78 % hrubej, 80 % LTV, 30-ročná splatnosť. Pravdepodobnosti
        sú kalibrované expertne (logistická funkcia), nie frekvenčne — SR nemá dosť historických korekcií na štatistickú kalibráciu.
        NBS vo vlastných analýzach odhadovala nadhodnotenie na vrchole 2022 na ~25–35 %; náš kompozit je konzervatívnejší.
      </Disclaimer>
    </Section>
  )
}
