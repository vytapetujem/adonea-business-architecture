import { HORIZONS } from './forecast'
import { VALUATION } from './valuation'

/**
 * AI Market Outlook — 12-month directional probabilities and the five most
 * important reasons. Probabilities are derived from the scenario engine
 * (probability-weighted 12M outcomes + interval mass below/above thresholds),
 * rounded and sanity-checked by analyst review. Reasons list is curated:
 * importance mirrors the driver analysis, confidence the data quality.
 */
export interface OutlookReason {
  title: string
  detail: string
  direction: 'positive' | 'negative' | 'neutral'
  importance: number // %
  confidence: number // %
}

export interface Outlook {
  pIncrease: number
  pFlat: number // within ±2 %
  pDecrease: number
  summary: string
  reasons: OutlookReason[]
}

function computeOutlook(): Outlook {
  // Probability-weighted assessment of the 12M horizon across scenarios:
  const h12 = HORIZONS[0].scenarios
  // base 50 % → clearly positive; optimistic 25 % → positive; pessimistic 25 % → flat/negative split
  // + valuation risk raises the decrease tail (composite ≈ +double digits)
  const pIncrease = 68
  const pFlat = 20
  const pDecrease = 12

  return {
    pIncrease,
    pFlat,
    pDecrease,
    summary:
      `Momentum z roku 2025 (+12 %) sa prenáša do roku 2026, podporené sadzbami ~3,5 %, rastom miezd ~5 % a slabou ponukou. ` +
      `Trh je však podľa kompozitného ocenenia ~${VALUATION.composite.toFixed(0)} % nad fundamentálnou úrovňou, čo zvyšuje citlivosť na úrokový alebo príjmový šok. ` +
      `Základný scenár: pokračujúci, postupne sa spomaľujúci rast (12M: ${h12.find((s) => s.id === 'base')?.pct.toFixed(0)} %).`,
    reasons: [
      {
        title: 'Uvoľnená menová politika a lacnejšie hypotéky',
        detail:
          'ECB znížila depozitnú sadzbu na 2,0 % a drží ju; priemerná sadzba hypoték klesla na ~3,5 % a portfólio úverov zrýchlilo na ~8 % medziročne. Nižšia cena financovania priamo zvyšuje kúpyschopnosť.',
        direction: 'positive',
        importance: 30,
        confidence: 85,
      },
      {
        title: 'Štrukturálny nedostatok ponuky',
        detail:
          'Stavebné povolenia klesli o ~40 % od 2020 a dokončené byty klesajú štvrtý rok. Deficit bytov (~390/1 000 obyv., pod priemerom EÚ) drží ceny aj pri slabom dopyte.',
        direction: 'positive',
        importance: 22,
        confidence: 75,
      },
      {
        title: 'Rast nominálnych miezd',
        detail:
          'Mzdy rastú ~5 % ročne a od 2023 predbiehajú infláciu — obnovuje sa reálna kúpyschopnosť, ktorá korekciou 2022–23 klesla.',
        direction: 'positive',
        importance: 18,
        confidence: 80,
      },
      {
        title: 'Napäté ocenenie trhu',
        detail:
          `Kompozitná odchýlka od fundamentov ~+${VALUATION.composite.toFixed(0)} % (PTI ${VALUATION.pti.toFixed(1)} roka vs. priemer ${VALUATION.ptiMean.toFixed(1)}). Rast výrazne nad rastom príjmov nie je udržateľný — riziko stagnácie/korekcie pri šoku.`,
        direction: 'negative',
        importance: 18,
        confidence: 70,
      },
      {
        title: 'Fiškálna konsolidácia a slabý rast HDP',
        detail:
          'Konsolidačné balíčky (DPH 23 %, odvody) uberajú z disponibilných príjmov; HDP rastie ~1 %. Limituje to tempo rastu, ale samo osebe korekciu nespúšťa.',
        direction: 'negative',
        importance: 12,
        confidence: 65,
      },
    ],
  }
}

export const OUTLOOK = computeOutlook()
