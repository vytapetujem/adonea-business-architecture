import { Section, StatTile, ProvenanceBadge, Disclaimer } from '../ui'
import PriceChart from '../charts/PriceChart'
import MacroChart from '../charts/MacroChart'
import { useFilters } from '../../state/FilterContext'
import { computeScopeMetrics } from '../../analytics/metrics'
import { fmtEur, fmtNum, fmtPct, pctColor } from '../../lib/format'
import { regionById } from '../../data/regions'
import { quarterLabel } from '../../lib/quarters'

export default function OverviewSection() {
  const { scope, propertyType } = useFilters()
  const m = computeScopeMetrics(scope, propertyType)
  const scopeName = scope === 'SK' ? 'Slovensko' : regionById(scope as never).name

  return (
    <Section
      id="overview"
      kicker="Prehľad trhu"
      title={`${scopeName} · ${quarterLabel(m.latestQuarter)}`}
      intro={
        <>
          Priemerné ponukové ceny bývania podľa metodiky NBS (€/m²). Od roku 2016 vzrástli národné ceny z{' '}
          <b className="text-ink-100">1 238 €/m²</b> na <b className="text-ink-100">3 005 €/m²</b> (2026-Q1; +143 %, ~9,1 % ročne) —
          s pandemickým boomom (+25 % r/r v 2022), korekciou 2022–2024 (−4,6 % nominálne) a novým boomom od 2025
          (+12 %; v Q1 2026 rast pokračuje tempom +11,3 % r/r).
        </>
      }
      right={<ProvenanceBadge p={scope === 'SK' ? 'anchored' : 'estimated'} />}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2.5 mb-5">
        <StatTile label="Cena" value={`${fmtNum(m.price)} €/m²`} tone="accent" sub={propertyType === 'all' ? 'byty + domy' : propertyType === 'flat' ? 'byty' : 'domy'} />
        <StatTile label="Štvrťročný rast" value={<span className={pctColor(m.qoq)}>{fmtPct(m.qoq)}</span>} />
        <StatTile label="Medziročný rast" value={<span className={pctColor(m.yoy)}>{fmtPct(m.yoy)}</span>} />
        <StatTile label="Rast 3 roky" value={<span className={pctColor(m.growth3y)}>{fmtPct(m.growth3y, 0)}</span>} />
        <StatTile label="Rast 10 rokov" value={<span className={pctColor(m.growth10y)}>{fmtPct(m.growth10y, 0)}</span>} sub={`CAGR ${fmtPct(m.cagr10y, 1, false)}`} />
        <StatTile label="Historické maximum" value={fmtEur(m.maxPrice.value)} sub={quarterLabel(m.maxPrice.quarter)} />
        <StatTile label="Historické minimum" value={fmtEur(m.minPrice.value)} sub={quarterLabel(m.minPrice.quarter)} />
        <StatTile label="Volatilita (ann.)" value={`${fmtNum(m.volatility, 1)} p. b.`} sub="σ štvrťročných zmien · √4" />
      </div>

      <div className="panel p-4 mb-5">
        <div className="panel-title mb-2">Vývoj cien s vyznačenými udalosťami a prognózou</div>
        <PriceChart withForecast height={400} />
      </div>

      <div className="panel p-4">
        <div className="panel-title mb-2">Makro kontext — porovnajte ľubovoľný indikátor s rastom cien</div>
        <MacroChart />
      </div>

      <Disclaimer>
        <b>Provenience dát:</b> národné cenové série sú kompiláciou publikácií NBS s overenými kotvami (25. 7. 2026); ide o{' '}
        <b>ponukové</b> ceny — transakčné ceny (ŠÚSR HPI) sa môžu líšiť v úrovni aj dynamike. Krajské série sú modelové odhady
        (±5–10 %). Prognózy sú scenárové projekcie, nie garancie. Podrobnosti v sekcii Metodika a dáta.
      </Disclaimer>
    </Section>
  )
}
