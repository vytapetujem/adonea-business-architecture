import { Section, MeterBar, ProvenanceBadge } from '../ui'
import { OUTLOOK } from '../../analytics/outlook'
import { fmtPct } from '../../lib/format'

const DIR = {
  positive: { label: 'Pozitívny', color: '#2fbf71', cls: 'text-pos' },
  negative: { label: 'Negatívny', color: '#e5484d', cls: 'text-neg' },
  neutral: { label: 'Neutrálny', color: '#8b9bb4', cls: 'text-neutral' },
}

export default function OutlookSection() {
  const o = OUTLOOK
  return (
    <Section
      id="outlook"
      kicker="AI výhľad trhu"
      title="Kam smerujú ceny v najbližších 12 mesiacoch"
      intro="Smerové pravdepodobnosti odvodené zo scenárového modelu (vážené výstupy + hmotnosť intervalov pod/nad prahmi ±2 %) a päť najdôležitejších dôvodov s váhou a spoľahlivosťou."
      right={<ProvenanceBadge p="forecast" />}
    >
      <div className="grid md:grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Ceny vzrastú (> +2 %)', p: o.pIncrease, color: '#2fbf71' },
          { label: 'Ceny stagnujú (±2 %)', p: o.pFlat, color: '#8b9bb4' },
          { label: 'Ceny klesnú (< −2 %)', p: o.pDecrease, color: '#e5484d' },
        ].map((x) => (
          <div key={x.label} className="panel p-5 text-center">
            <div className="num text-4xl font-bold" style={{ color: x.color }}>{x.p} %</div>
            <div className="text-xs text-ink-300 mt-1">{x.label}</div>
            <div className="mt-3"><MeterBar value={x.p} color={x.color} /></div>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink-200 leading-relaxed max-w-4xl mb-6">{o.summary}</p>

      <div className="panel-title mb-3">Päť najdôležitejších dôvodov</div>
      <div className="space-y-2.5">
        {o.reasons.map((r, i) => {
          const d = DIR[r.direction]
          return (
            <div key={i} className="panel p-4">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="num text-ink-500 text-sm font-bold">{i + 1}.</span>
                <span className="text-sm font-semibold text-ink-100">{r.title}</span>
                <span className={`chip border-current ${d.cls}`} style={{ backgroundColor: d.color + '15' }}>{d.label}</span>
                <span className="ml-auto num text-2xs text-ink-400">
                  dôležitosť <b className="text-ink-200">{fmtPct(r.importance, 0, false)}</b> · spoľahlivosť <b className="text-ink-200">{fmtPct(r.confidence, 0, false)}</b>
                </span>
              </div>
              <div className="mb-2"><MeterBar value={r.importance} max={30} color={d.color} /></div>
              <p className="text-xs text-ink-300 leading-relaxed">{r.detail}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
