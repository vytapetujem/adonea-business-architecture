import { Section, MeterBar, Disclaimer, ProvenanceBadge } from '../ui'
import { REGION_SCORES } from '../../analytics/investment'
import { ALL_REGION_METRICS } from '../../analytics/metrics'
import { fmtEur, fmtNum, fmtPct } from '../../lib/format'
import { useFilters } from '../../state/FilterContext'

export default function InvestmentSection() {
  const { setScope } = useFilters()
  return (
    <Section
      id="invest"
      kicker="Investičná analýza"
      title="Skóre krajov pre investorov (0 – 100)"
      intro="Kompozit: rastový potenciál 30 % · nájomný výnos 25 % · likvidita 20 % · inverzia rizika 25 %. Subskóre sú normalizované naprieč krajmi — skóre je RELATÍVNE poradie v rámci SR, nie absolútne hodnotenie. Klik na kartu prepne celý dashboard na daný kraj."
      right={<ProvenanceBadge p="estimated" />}
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        {REGION_SCORES.map((s, rank) => {
          const m = ALL_REGION_METRICS[s.id]
          return (
            <button
              key={s.id}
              onClick={() => setScope(s.id)}
              className="panel p-4 text-left hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-ink-100">{s.name}</div>
                <span className="num text-2xs text-ink-500">#{rank + 1}</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <div className="num text-3xl font-bold text-accent">{s.total}</div>
                <div className="text-2xs text-ink-400 mb-1">/100 · trend: {s.expectedTrend}</div>
              </div>
              <div className="space-y-2 mb-3">
                {[
                  ['Rastový potenciál', s.growth, '#2fbf71'],
                  ['Nájomný potenciál', s.rental, '#4c9aff'],
                  ['Likvidita', s.liquidity, '#f5a623'],
                  ['Riziko', s.risk, '#e5484d'],
                ].map(([label, val, color]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-2xs mb-0.5">
                      <span className="text-ink-400">{label}</span>
                      <span className="num text-ink-200">{val}</span>
                    </div>
                    <MeterBar value={val as number} color={color as string} height={4} />
                  </div>
                ))}
              </div>
              <div className="text-2xs text-ink-400 num mb-2">
                {fmtEur(m.price)}/m² · výnos {fmtPct(m.rentalYieldGross, 1, false)} · r/r {fmtPct(m.yoy)} · PTI {fmtNum(m.priceToIncome, 1)} r.
              </div>
              <p className="text-2xs text-ink-300 leading-relaxed">{s.explanation}</p>
            </button>
          )
        })}
      </div>
      <Disclaimer>
        Toto nie je investičné odporúčanie. Krajské ceny sú modelové odhady (±5–10 %), nájomné je trhový odhad bez oficiálnej
        štatistiky a skóre nezohľadňuje mikropolohu, stav nehnuteľnosti ani daňové aspekty konkrétneho investora.
      </Disclaimer>
    </Section>
  )
}
