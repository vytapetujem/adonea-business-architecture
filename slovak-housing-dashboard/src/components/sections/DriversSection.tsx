import { Section, MeterBar, Disclaimer, ProvenanceBadge } from '../ui'
import { DRIVERS } from '../../analytics/drivers'
import { fmtPct } from '../../lib/format'

const DIR_META = {
  positive: { label: 'Pozitívny vplyv na ceny', cls: 'text-pos', color: '#2fbf71' },
  negative: { label: 'Negatívny vplyv na ceny', cls: 'text-neg', color: '#e5484d' },
  neutral: { label: 'Neutrálny / zmiešaný', cls: 'text-neutral', color: '#8b9bb4' },
}

export default function DriversSection() {
  return (
    <Section
      id="drivers"
      kicker="Analýza faktorov"
      title="Čo hýbalo cenami 2016 – 2025"
      intro="Odhad relatívnej dôležitosti faktorov: korelačná analýza (y/y rast cien vs. faktor, lag 0–4 kvartály) kombinovaná so štrukturálnymi váhami — čistá korelácia na 40 pozorovaniach nedokáže oddeliť kolineárne faktory (sadzby vs. inflácia). Smer vplyvu vychádza z ekonomickej teórie, sila z dát. Ide o atribučný odhad, nie kauzálnu identifikáciu."
      right={<ProvenanceBadge p="estimated" />}
    >
      <div className="grid md:grid-cols-2 gap-3">
        {DRIVERS.map((d) => {
          const meta = DIR_META[d.direction]
          return (
            <div key={d.id} className="panel p-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-sm font-semibold text-ink-100">{d.label}</div>
                <span className={`text-2xs font-medium ${meta.cls}`}>{meta.label}</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <MeterBar value={d.influence} max={30} color={meta.color} />
                </div>
                <div className="num text-sm font-semibold text-ink-100 w-14 text-right">{fmtPct(d.influence, 1, false)}</div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-2xs text-ink-400 mb-2">
                <span>odhad vplyvu <b className="text-ink-200 num">{fmtPct(d.influence, 1, false)}</b></span>
                <span>spoľahlivosť <b className="text-ink-200 num">{fmtPct(d.confidence * 100, 0, false)}</b></span>
                {Math.abs(d.correlation) > 0.01 && (
                  <span>ρ = <b className="text-ink-200 num">{d.correlation.toFixed(2)}</b>{d.bestLagQ > 0 && <> (lag {d.bestLagQ} q)</>}</span>
                )}
              </div>
              <p className="text-xs text-ink-300 leading-relaxed">{d.comment}</p>
            </div>
          )
        })}
      </div>
      <Disclaimer>
        Faktory „spotrebiteľská dôvera“ a „regulácia“ nemajú spoľahlivú kvantitatívnu sériu — ich váhy sú kvalitatívne odhady
        s nízkou spoľahlivosťou (40 %, resp. 50 %). Zahraniční investori: SR nemá oficiálnu štatistiku podielu zahraničných
        kupujúcich; faktor preto nie je kvantifikovaný — kvalitatívne je relevantný najmä v Bratislave a Košiciach (obmedzenie dát).
      </Disclaimer>
    </Section>
  )
}
