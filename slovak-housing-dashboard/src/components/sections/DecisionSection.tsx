import { Section, Disclaimer, ProvenanceBadge } from '../ui'
import { DECISION } from '../../analytics/decision'

export default function DecisionSection() {
  const d = DECISION
  const pct = (d.score + 100) / 2 // −100..100 → 0..100 for gauge
  return (
    <Section
      id="decision"
      kicker="Rozhodovací asistent"
      title="Kúpiť či počkať?"
      intro="Syntéza oceňovacieho, prognostického a dostupnostného modelu do praktického rámca. Každé tvrdenie sa opiera o konkrétnu metriku — a odpoveď je zámerne podmienená profilom kupujúceho, nie univerzálna."
      right={<ProvenanceBadge p="forecast" />}
    >
      <div className="panel p-5 mb-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[260px]">
            <div className="panel-title mb-1">Verdikt</div>
            <div className="text-lg font-semibold text-ink-100 leading-snug">{d.headline}</div>
          </div>
          <div className="w-full md:w-72">
            <div className="flex justify-between text-2xs text-ink-400 mb-1">
              <span>Počkať</span><span className="text-ink-200 font-semibold">{d.scoreLabel}</span><span>Kúpiť</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-gradient-to-r from-neg via-ink-500 to-pos">
              <div
                className="absolute -top-1 w-1 h-4.5 rounded bg-ink-100 shadow"
                style={{ left: `calc(${pct}% - 2px)`, height: 18, top: -4 }}
              />
            </div>
            <div className="num text-2xs text-ink-400 mt-1 text-center">skóre {d.score} / −100…+100</div>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5">
          {d.rationale.map((r, i) => (
            <li key={i} className="text-xs text-ink-300 leading-relaxed flex gap-2">
              <span className="text-accent mt-0.5">▸</span>{r}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-3">
        <div className="panel p-4">
          <div className="panel-title text-neg mb-2">Aktuálne riziká</div>
          <div className="space-y-2.5">
            {d.risks.map((r) => (
              <div key={r.title}>
                <div className="text-xs font-semibold text-ink-100">{r.title}</div>
                <p className="text-2xs text-ink-300 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-4">
          <div className="panel-title text-pos mb-2">Aktuálne príležitosti</div>
          <div className="space-y-2.5">
            {d.opportunities.map((r) => (
              <div key={r.title}>
                <div className="text-xs font-semibold text-ink-100">{r.title}</div>
                <p className="text-2xs text-ink-300 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="panel p-4 border-pos/30">
          <div className="panel-title text-pos mb-2">Kto môže kupovať dnes</div>
          <ul className="space-y-1.5">
            {d.buyToday.map((x, i) => (
              <li key={i} className="text-xs text-ink-300 leading-relaxed flex gap-2"><span className="text-pos mt-0.5">✓</span>{x}</li>
            ))}
          </ul>
        </div>
        <div className="panel p-4 border-neg/30">
          <div className="panel-title text-neg mb-2">Kto by mal počkať</div>
          <ul className="space-y-1.5">
            {d.shouldWait.map((x, i) => (
              <li key={i} className="text-xs text-ink-300 leading-relaxed flex gap-2"><span className="text-neg mt-0.5">✗</span>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      <Disclaimer>
        Nie je to finančné poradenstvo. Individuálne rozhodnutie závisí od príjmovej stability, horizontu, lokality a alternatív
        (nájom, iné aktíva). Čísla platia k 2025-Q4 na národnej úrovni — regionálna situácia sa líši (pozri mapu a investičnú sekciu).
      </Disclaimer>
    </Section>
  )
}
