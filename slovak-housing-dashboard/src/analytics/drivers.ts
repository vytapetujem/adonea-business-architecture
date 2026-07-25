import { MACRO } from '../data/macro'
import { NATIONAL_PRICE } from '../data/prices'
import { correlation, lagSeries, pctChange } from '../lib/stats'

/**
 * Driver analysis: which variables moved Slovak housing prices in 2016–2025?
 *
 * Method (documented in docs/FORECAST_METHODOLOGY.md §2):
 * 1. Target = y/y % change of the national price series.
 * 2. For each candidate factor we compute the Pearson correlation with the
 *    target at lags 0–4 quarters and keep the strongest |ρ| (economic priors
 *    fix the expected sign; a lag is reported so users see lead/response time).
 * 3. `influence` = analyst weight × |ρ| normalised to sum to 100 %. The analyst
 *    weight encodes structural knowledge that pure correlation on 40 quarterly
 *    observations cannot (small sample, collinearity of rates/inflation).
 * 4. `confidence` reflects sample support + data quality of the factor series.
 *
 * This is an attribution ESTIMATE, not a causal identification.
 */
export interface DriverResult {
  id: string
  label: string
  direction: 'positive' | 'negative' | 'neutral'
  correlation: number
  bestLagQ: number
  influence: number // % share, sums to 100
  confidence: number // 0–1
  comment: string
}

const CANDIDATES: {
  id: string
  label: string
  seriesId: keyof typeof MACRO | null
  transform?: 'yoy' | 'level' | 'invLevel'
  expectedSign: 1 | -1
  analystWeight: number
  confidence: number
  comment: string
}[] = [
  {
    id: 'mortgageRate', label: 'Hypotekárne sadzby', seriesId: 'mortgageRate', transform: 'level', expectedSign: -1,
    analystWeight: 1.0, confidence: 0.9,
    comment: 'Najsilnejší jednotlivý faktor: pokles k ~1 % poháňal boom 2016–2021, nárast na ~4,2 % spustil korekciu 2022–2023, pokles k ~3,5 % obnovil rast 2024–2025.',
  },
  {
    id: 'ecb', label: 'Politika ECB', seriesId: 'ecbDeposit', transform: 'level', expectedSign: -1,
    analystWeight: 0.8, confidence: 0.85,
    comment: 'Pôsobí sprostredkovane cez hypotekárne sadzby a očakávania (kolinearita — váha rozdelená medzi oba faktory).',
  },
  {
    id: 'wage', label: 'Rast miezd', seriesId: 'wage', transform: 'yoy', expectedSign: 1,
    analystWeight: 0.85, confidence: 0.8,
    comment: 'Nominálne mzdy +77 % za dekádu — dlhodobý nosič kúpyschopnosti; v 2023–2025 dobiehanie inflácie podporilo obnovu dopytu.',
  },
  {
    id: 'inflation', label: 'Inflácia', seriesId: 'inflation', transform: 'level', expectedSign: -1,
    analystWeight: 0.5, confidence: 0.6,
    comment: 'Dvojaký efekt: eroduje reálne príjmy (−), ale motivuje útek do reálnych aktív (+). Netto v 2022–23 negatívna cez sadzby a dôveru.',
  },
  {
    id: 'supply', label: 'Ponuka novej výstavby', seriesId: 'permits', transform: 'invLevel', expectedSign: 1,
    analystWeight: 0.75, confidence: 0.7,
    comment: 'Prepad povolení z ~26-tis. na ~15-tis. ročne obmedzuje ponuku — štrukturálny prorastový faktor, brzdí korekcie.',
  },
  {
    id: 'gdp', label: 'HDP a zamestnanosť', seriesId: 'gdp', transform: 'level', expectedSign: 1,
    analystWeight: 0.55, confidence: 0.65,
    comment: 'Nízka nezamestnanosť (5–6 %) držala trh aj počas korekcie — nedošlo k núteným predajom.',
  },
  {
    id: 'constructionCost', label: 'Stavebné náklady', seriesId: 'constructionCost', transform: 'yoy', expectedSign: 1,
    analystWeight: 0.5, confidence: 0.65,
    comment: 'Index +59 % za dekádu; zdražuje novostavby a zvyšuje reprodukčnú hodnotu existujúcich nehnuteľností.',
  },
  {
    id: 'migration', label: 'Migrácia a demografia', seriesId: 'netMigration', transform: 'level', expectedSign: 1,
    analystWeight: 0.4, confidence: 0.5,
    comment: 'Ukrajinský prílev (~120-tis.) tlačil najmä na nájmy 2022–23; vnútorná migrácia do BA/KE koncentruje dopyt. Slabšie merateľné.',
  },
  {
    id: 'confidence', label: 'Spotrebiteľská dôvera a očakávania', seriesId: null, expectedSign: 1,
    analystWeight: 0.35, confidence: 0.4,
    comment: 'FOMO efekt v boome 2021 a 2025, vyčkávanie v 2023. Bez spoľahlivej kvantitatívnej série — kvalitatívny odhad.',
  },
  {
    id: 'regulation', label: 'Regulácia a vládne politiky', seriesId: null, expectedSign: -1,
    analystWeight: 0.3, confidence: 0.5,
    comment: 'Limity NBS (2017–18) zmiernili boom; daňový bonus (2023–24) zmiernil korekciu. Efekty rádovo jednotky %.',
  },
]

export function computeDrivers(): DriverResult[] {
  const target = pctChange(NATIONAL_PRICE.values, 4)

  const raw = CANDIDATES.map((c) => {
    let bestRho = 0
    let bestLag = 0
    if (c.seriesId) {
      const base = MACRO[c.seriesId].values
      const x =
        c.transform === 'yoy' ? pctChange(base, 4) : c.transform === 'invLevel' ? base.map((v) => (v == null ? null : -v)) : base
      for (let lag = 0; lag <= 4; lag++) {
        const rho = correlation(lagSeries(x, lag), target)
        if (isFinite(rho) && Math.abs(rho) > Math.abs(bestRho)) {
          bestRho = rho
          bestLag = lag
        }
      }
    } else {
      bestRho = c.expectedSign * 0.5 // qualitative factor — no measurable series
    }
    const score = c.analystWeight * Math.min(1, Math.abs(bestRho) + 0.15)
    return { c, bestRho, bestLag, score }
  })

  const total = raw.reduce((a, r) => a + r.score, 0)
  return raw
    .map(({ c, bestRho, bestLag, score }) => ({
      id: c.id,
      label: c.label,
      direction:
        Math.abs(bestRho) < 0.15 ? ('neutral' as const) : c.expectedSign === 1 ? ('positive' as const) : ('negative' as const),
      correlation: Math.round(bestRho * 100) / 100,
      bestLagQ: bestLag,
      influence: Math.round((score / total) * 1000) / 10,
      confidence: c.confidence,
      comment: c.comment,
    }))
    .sort((a, b) => b.influence - a.influence)
}

export const DRIVERS = computeDrivers()
