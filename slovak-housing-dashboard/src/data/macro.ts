import type { QuarterlySeries } from '../lib/types'
import { QUARTERS } from '../lib/quarters'

/**
 * Macro series 2016-Q1 … 2025-Q4 (40 quarters).
 * Annual official values interpolated to quarters where only annual data is
 * published (wages, unemployment, construction) — those carry provenance
 * 'derived' or 'estimated' and a note. Rates and inflation are quarterly.
 * All values must be refreshed via docs/DATA_ACQUISITION.md for production use.
 */

// prettier-ignore
const MORTGAGE_RATE: number[] = [ // avg. rate on new housing loans, % p.a. (NBS)
  2.05, 1.95, 1.85, 1.78,  1.75, 1.72, 1.70, 1.66,  1.60, 1.55, 1.50, 1.45,  1.45, 1.35, 1.25, 1.18,
  1.15, 1.10, 1.08, 1.05,  1.02, 0.98, 0.96, 0.98,  1.10, 1.65, 2.40, 3.00,  3.50, 3.85, 4.05, 4.20,
  4.25, 4.20, 4.05, 3.90,  3.75, 3.65, 3.55, 3.50,
]

// prettier-ignore
const ECB_DEPOSIT: number[] = [ // ECB deposit facility rate, end of quarter, %
  -0.40, -0.40, -0.40, -0.40,  -0.40, -0.40, -0.40, -0.40,  -0.40, -0.40, -0.40, -0.40,  -0.40, -0.40, -0.50, -0.50,
  -0.50, -0.50, -0.50, -0.50,  -0.50, -0.50, -0.50, -0.50,  -0.50, -0.50, 0.75, 2.00,  3.00, 3.50, 4.00, 4.00,
  4.00, 3.75, 3.50, 3.00,  2.50, 2.00, 2.00, 2.00,
]

// prettier-ignore
const HICP_YOY: number[] = [ // HICP inflation, y/y %, quarterly average (Eurostat/ŠÚSR)
  -0.7, -0.7, -0.6, 0.2,  1.1, 1.1, 1.5, 2.0,  2.2, 2.9, 2.7, 2.0,  2.4, 2.7, 3.0, 3.1,
  3.1, 2.0, 1.4, 1.6,  1.0, 2.0, 3.8, 5.1,  8.4, 11.7, 13.6, 14.9,  15.0, 11.9, 9.6, 7.0,
  3.8, 2.6, 3.0, 3.2,  3.9, 4.2, 4.4, 4.3,
]

// prettier-ignore
const GDP_YOY: number[] = [ // real GDP growth y/y %, approx. quarterly profile (ŠÚSR)
  2.0, 2.3, 2.4, 2.2,  2.8, 2.9, 2.9, 3.0,  3.7, 4.1, 4.2, 3.9,  3.0, 2.6, 2.2, 2.1,
  -3.0, -10.5, -2.0, -2.2,  0.5, 9.5, 4.5, 4.9,  2.8, 1.7, 1.4, 1.0,  1.5, 1.6, 1.5, 1.4,
  2.4, 2.2, 1.9, 1.7,  1.0, 0.8, 0.9, 1.1,
]

/** Annual official values (ŠÚSR); quarterly points are linear interpolations with a Q4 seasonal wage bump. */
const WAGE_ANNUAL = [912, 954, 1013, 1092, 1133, 1211, 1304, 1430, 1524, 1617] // avg. gross monthly wage €
const UNEMP_ANNUAL = [9.7, 8.1, 6.5, 5.8, 6.7, 6.8, 6.1, 5.8, 5.3, 5.1] // unemployment rate %
const COMPLETIONS_ANNUAL = [15700, 16900, 19100, 20300, 21200, 20500, 19400, 18200, 16800, 15900] // dwellings completed
const PERMITS_ANNUAL = [19500, 21300, 22300, 24000, 26000, 25500, 21000, 17500, 15500, 14800] // building permits (dwellings)
const CCI_ANNUAL = [101.5, 104, 108, 112, 115, 128, 145, 152, 155, 159] // construction cost index, 2015 = 100
const NET_MIGRATION_ANNUAL = [3.9, 3.9, 4.0, 4.5, 5.1, 3.0, 7.8, 6.5, 5.5, 5.0] // net migration, thousand persons

function annualToQuarterly(annual: number[], wageSeason = false): number[] {
  const out: number[] = []
  for (let y = 0; y < annual.length; y++) {
    const cur = annual[y]
    const next = annual[Math.min(y + 1, annual.length - 1)]
    for (let qq = 0; qq < 4; qq++) {
      let v = cur + ((next - cur) * qq) / 4
      if (wageSeason && qq === 3) v *= 1.03 // 13th salaries / year-end bonuses
      out.push(Math.round(v * 10) / 10)
    }
  }
  return out.slice(0, QUARTERS.length)
}

const s = (
  id: string,
  label: string,
  unit: string,
  values: number[],
  provenance: QuarterlySeries['provenance'],
  sourceIds: string[],
  note?: string,
): QuarterlySeries => ({ id, label, unit, provenance, sourceIds, note, quarters: QUARTERS, values })

export const MACRO: Record<string, QuarterlySeries> = {
  mortgageRate: s(
    'mortgageRate', 'Priemerná sadzba nových hypoték', '%', MORTGAGE_RATE, 'anchored', ['nbs-mfi'],
    'Kotva overená: ≈3,5 % od 10/2025. Historické body prepis z NBS (±0,1–0,2 p. b.).',
  ),
  ecbDeposit: s(
    'ecbDeposit', 'ECB depozitná sadzba', '%', ECB_DEPOSIT, 'measured', ['ecb'],
    'Verejný kalendár rozhodnutí ECB — vysoká spoľahlivosť.',
  ),
  inflation: s(
    'inflation', 'Inflácia HICP (medziročne)', '%', HICP_YOY, 'anchored', ['eurostat', 'susr'],
    'Štvrťročné priemery; prepis (±0,3 p. b.).',
  ),
  gdp: s(
    'gdp', 'Rast HDP (medziročne, reálne)', '%', GDP_YOY, 'estimated', ['susr'],
    'Približný štvrťročný profil z ročných údajov ŠÚSR; revidované rady sa môžu líšiť.',
  ),
  wage: s(
    'wage', 'Priemerná hrubá mesačná mzda', '€', annualToQuarterly(WAGE_ANNUAL, true), 'derived', ['susr'],
    'Ročné hodnoty ŠÚSR, kvartalizované interpoláciou + sezónny Q4 efekt.',
  ),
  unemployment: s(
    'unemployment', 'Miera nezamestnanosti', '%', annualToQuarterly(UNEMP_ANNUAL), 'derived', ['susr'],
    'Ročné hodnoty ŠÚSR, kvartalizované interpoláciou.',
  ),
  completions: s(
    'completions', 'Dokončené byty (ročný objem)', 'bytov/rok', annualToQuarterly(COMPLETIONS_ANNUAL), 'estimated', ['susr'],
    'Približné ročné objemy ŠÚSR (±5 %), kvartalizované.',
  ),
  permits: s(
    'permits', 'Stavebné povolenia (ročný objem)', 'bytov/rok', annualToQuarterly(PERMITS_ANNUAL), 'estimated', ['susr'],
    'Približné ročné objemy (±10 %), kvartalizované. Od 2021 výrazný pokles.',
  ),
  constructionCost: s(
    'constructionCost', 'Index stavebných nákladov', '2015 = 100', annualToQuarterly(CCI_ANNUAL), 'estimated', ['susr'],
    'Približný ročný index materiálových a stavebných nákladov.',
  ),
  netMigration: s(
    'netMigration', 'Čistá migrácia', 'tis. osôb/rok', annualToQuarterly(NET_MIGRATION_ANNUAL), 'estimated', ['susr'],
    'Oficiálna čistá migrácia; nezahŕňa ~120-tis. odídencov z Ukrajiny s dočasným útočiskom (vrchol 2022–2023).',
  ),
}

/** Average net wage ≈ 78 % of gross (SR, single earner, approximation for affordability math). */
export const NET_WAGE_RATIO = 0.78
