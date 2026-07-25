import { Section, Disclaimer, ProvenanceBadge } from '../ui'
import ForecastChart from '../charts/ForecastChart'
import { FORECASTS, HORIZONS, SCENARIOS } from '../../analytics/forecast'
import { fmtEur, fmtPct } from '../../lib/format'

const SC_COLOR: Record<string, string> = { optimistic: '#2fbf71', base: '#a78bfa', pessimistic: '#e5484d' }

export default function ForecastSection() {
  return (
    <Section
      id="forecast"
      kicker="Prognostický model"
      title="Prognóza cien: 12 mesiacov · 3 roky · 5 rokov"
      intro="Model negeneruje extrapoláciu historickej krivky — štvrťročný rast skladá z troch zložiek: doznievajúce momentum (polčas 3 kvartály), fundamentálny rast zo scenárových predpokladov (sadzby, mzdy, ponuka, demografia, politika ECB a vlády) a ťah k fér hodnote (nadhodnotený trh rastie pod fundamentom). Intervaly: historická disperzia ročných zmien × √horizont. Pravdepodobnosti scenárov sú expertné priory."
      right={<ProvenanceBadge p="forecast" />}
    >
      <div className="panel p-4 mb-4">
        <div className="panel-title mb-2">História + scenárové trajektórie (80 % interval pre základný scenár)</div>
        <ForecastChart />
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-2xs uppercase tracking-wider text-ink-400">
              <th className="text-left py-2 pr-4 font-semibold">Horizont</th>
              {FORECASTS.map((f) => (
                <th key={f.id} className="text-right py-2 px-4 font-semibold" style={{ color: SC_COLOR[f.id] }}>
                  {f.label} ({Math.round(f.probability * 100)} %)
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HORIZONS.map((h) => (
              <tr key={h.horizon} className="border-t border-ink-700">
                <td className="py-2.5 pr-4 text-ink-200 border-t border-ink-700">{h.horizon}</td>
                {h.scenarios.map((s) => (
                  <td key={s.id} className="py-2.5 px-4 text-right border-t border-ink-700">
                    <div className="num font-semibold text-ink-100">{fmtEur(s.price)}/m² <span style={{ color: SC_COLOR[s.id] }}>({fmtPct(s.pct, 0)})</span></div>
                    <div className="num text-2xs text-ink-400">80 % CI: {fmtEur(s.lo)} – {fmtEur(s.hi)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {SCENARIOS.map((sc) => (
          <div key={sc.id} className="panel p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold" style={{ color: SC_COLOR[sc.id] }}>{sc.label} scenár</div>
              <span className="num text-2xs text-ink-400">P = {Math.round(sc.probability * 100)} %</span>
            </div>
            <ul className="space-y-1.5">
              {sc.assumptions.map((a, i) => (
                <li key={i} className="text-xs text-ink-300 leading-relaxed flex gap-2">
                  <span className="text-ink-500 mt-0.5">▸</span>{a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Disclaimer>
        Prognózy sú podmienené scenárovými predpokladmi a nesú zásadnú neistotu — 80 % interval základného scenára na 5 rokov je
        široký desiatky percent. Model nezachytáva šoky mimo scenárov (pandémie, vojnová eskalácia, regulačné zásahy do nájmov).
        Kompletná matematika: docs/FORECAST_METHODOLOGY.md.
      </Disclaimer>
    </Section>
  )
}
