import { Section, ProvenanceBadge, PROVENANCE_META } from '../ui'
import { SOURCES, VERIFIED_ANCHORS } from '../../data/sources'
import type { Provenance } from '../../lib/types'

const LIMITATIONS = [
  'Ponukové vs. transakčné ceny: NBS séria vychádza z inzertných (ponukových) cien. Transakčný index ŠÚSR (HPI) sa môže líšiť v úrovni aj dynamike — napr. regionálne ročné rasty Q3 2025 sa medzi datasetmi líšia o jednotky p. b.',
  'Krajské štvrťročné série sú modelové odhady kalibrované na kotvy NBS (±5–10 %) — presné hodnoty vyžadujú načítanie XLSX NBS cez refresh pipeline (docs/DATA_ACQUISITION.md).',
  'Okresné (LAU1) dáta: NBS nepubl. otvorené okresné cenové rady; okresná granularita preto v aplikácii nie je — uvádzame to explicitne namiesto fabrikovania.',
  'Nájomné: SR nemá oficiálnu štatistiku trhových nájmov; hodnoty sú trhové odhady (±10–15 %) — všetky odvodené ukazovatele (výnos, cena/nájom) dedia túto neistotu.',
  'Séria 2026: dáta za Q1–Q2 2026 neboli v čase zostavenia dostupné z build prostredia; história končí 2025-Q4 a prognóza beží od 2026-Q1.',
  'Kvartalizácia ročných údajov (mzdy, nezamestnanosť, výstavba) vyhladzuje skutočný priebeh; korelácie s takými sériami sú optimistickejšie.',
  'Malá vzorka: 40 štvrťrokov a jedna korekcia — pravdepodobnosti (bublina, korekcia) nemožno frekvenčne kalibrovať, sú expertné.',
  'Zahraniční kupujúci a investičné fondy: bez oficiálnej štatistiky — faktor nekvalifikovaný.',
]

const IMPROVEMENTS = [
  'Napojiť refresh pipeline na presné XLSX NBS (regionálne rady, byty/domy podľa izbovosti) a DATAcube API ŠÚSR.',
  'Doplniť transakčný HPI (ŠÚSR/Eurostat) ako druhú cenovú vrstvu s prepínačom ponukové/transakčné.',
  'Okresná granularita z komerčných dát (cenové mapy) s licenciou.',
  'Ekonometrická estimácia driverov (VAR / error-correction model) namiesto korelačno-expertnej atribúcie.',
  'Backtest prognostického modelu na rolling windows 2019–2025 a reportovanie out-of-sample chýb.',
  'Monte Carlo simulácia scenárov namiesto troch diskrétnych trajektórií.',
  'Anglická lokalizácia a export reportov (PDF).',
]

export default function MethodologySection() {
  return (
    <Section
      id="method"
      kicker="Transparentnosť"
      title="Metodika, zdroje a obmedzenia"
      intro="Aplikácia dôsledne rozlišuje triedy dát. Nič nie je „vymyslené“: každá séria má zdroj, vintage a triedu spoľahlivosti; kde dáta chýbajú, hovoríme to otvorene."
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2.5 mb-6">
        {(Object.keys(PROVENANCE_META) as Provenance[]).map((p) => (
          <div key={p} className="panel p-3">
            <ProvenanceBadge p={p} />
            <p className="text-2xs text-ink-300 leading-relaxed mt-2">{PROVENANCE_META[p].desc}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <div className="panel p-4">
          <div className="panel-title mb-3">Zdroje dát</div>
          <div className="space-y-3">
            {SOURCES.map((s) => (
              <div key={s.id} className="text-xs">
                <a href={s.url} target="_blank" rel="noreferrer" className="font-semibold text-info hover:underline">
                  {s.name}
                </a>
                <span className="text-ink-400"> · {s.publisher}</span>
                <div className="text-2xs text-ink-300 mt-0.5">{s.usedFor}</div>
                <div className="text-2xs text-ink-500">vintage: {s.vintage}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-4">
          <div className="panel-title mb-3">Kotvy overené proti živým zdrojom (25. 7. 2026)</div>
          <table className="w-full text-2xs">
            <tbody>
              {VERIFIED_ANCHORS.map((a) => (
                <tr key={a.label} className="border-t border-ink-700 first:border-t-0">
                  <td className="py-1.5 pr-2 text-ink-300">{a.label}</td>
                  <td className="py-1.5 pr-2 num text-ink-100 font-semibold whitespace-nowrap">{a.value}</td>
                  <td className="py-1.5 text-ink-500 text-right">{a.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="panel p-4">
          <div className="panel-title text-neg mb-2">Známe obmedzenia</div>
          <ul className="space-y-1.5">
            {LIMITATIONS.map((x, i) => (
              <li key={i} className="text-2xs text-ink-300 leading-relaxed flex gap-2">
                <span className="text-neg mt-0.5 shrink-0">!</span>{x}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel p-4">
          <div className="panel-title text-pos mb-2">Návrhy budúcich vylepšení</div>
          <ul className="space-y-1.5">
            {IMPROVEMENTS.map((x, i) => (
              <li key={i} className="text-2xs text-ink-300 leading-relaxed flex gap-2">
                <span className="text-pos mt-0.5 shrink-0">+</span>{x}
              </li>
            ))}
          </ul>
          <p className="text-2xs text-ink-400 mt-4">
            Kompletné dokumenty: README.md, docs/DATA_ACQUISITION.md, docs/DATA_CLEANING.md, docs/FORECAST_METHODOLOGY.md,
            docs/ASSUMPTIONS.md, docs/AI_REASONING.md, docs/LIMITATIONS.md v repozitári.
          </p>
        </div>
      </div>
    </Section>
  )
}
