import type { MarketEvent } from '../lib/types'

/**
 * Major events affecting the Slovak housing market 2016–2026.
 * `impact`: analyst estimate of the effect on national residential prices over
 * the affected period, −5 … +5 (documented reasoning in docs/AI_REASONING.md).
 * `confidence`: confidence in the impact assessment (not in the event itself —
 * the events are documented facts).
 */
export const EVENTS: MarketEvent[] = [
  {
    id: 'nirp-era',
    title: 'Éra záporných sadzieb ECB',
    category: 'monetary',
    from: '2016-Q1',
    to: '2022-Q2',
    date: '2016 – polovica 2022',
    description:
      'Depozitná sadzba ECB na −0,4 % (od 9/2019 −0,5 %). Hypotéky na Slovensku postupne zlacneli až k ~1 % p. a. (2021) — hlavné palivo cenového rastu 2016–2021.',
    impact: 4,
    confidence: 0.9,
    provenance: 'measured',
  },
  {
    id: 'nbs-macroprudential',
    title: 'Makroprudenciálne limity NBS (LTV, DTI, DSTI)',
    category: 'regulation',
    from: '2017-Q1',
    to: '2018-Q4',
    date: '2017 – 2018',
    description:
      'Postupné sprísnenie: strop LTV 90 % → obmedzenie úverov nad 80 % LTV, limit DTI 8-násobok ročného príjmu (7/2018), DSTI 80 %. Cieľ: spomaliť úverový boom; rast cien to zmiernilo, nezastavilo.',
    impact: -1,
    confidence: 0.8,
    provenance: 'measured',
  },
  {
    id: 'mortgage-boom',
    title: 'Hypotekárny boom',
    category: 'demand',
    from: '2017-Q1',
    to: '2019-Q4',
    date: '2017 – 2019',
    description:
      'Najrýchlejší rast hypotekárneho portfólia v EÚ (dvojciferné tempá), silný rast miezd (+4–6 % ročne) a zamestnanosti. Dopyt prevyšoval ponuku najmä v Bratislave.',
    impact: 3,
    confidence: 0.85,
    provenance: 'measured',
  },
  {
    id: 'covid-shock',
    title: 'COVID-19 — prvotný šok',
    category: 'crisis',
    from: '2020-Q1',
    to: '2020-Q2',
    date: 'marec – jún 2020',
    description:
      'Lockdowny, prepad HDP (−10,5 % y/y v Q2 2020), krátke zamrznutie transakcií. Očakávaný pokles cien sa NEDOSTAVIL — trh sa v priebehu mesiacov otočil do boomu.',
    impact: -1,
    confidence: 0.9,
    provenance: 'measured',
  },
  {
    id: 'pandemic-boom',
    title: 'Pandemický realitný boom',
    category: 'demand',
    from: '2020-Q3',
    to: '2022-Q2',
    date: '2020-H2 – 2022-H1',
    description:
      'Rekordne lacné hypotéky (~1 %), nahromadené úspory, home-office dopyt po väčších bytoch a domoch, útek k reálnym aktívam pri rastúcej inflácii. Medziročný rast cien až ~25 % (2022-Q2).',
    impact: 5,
    confidence: 0.9,
    provenance: 'measured',
  },
  {
    id: 'materials-inflation',
    title: 'Inflácia stavebných materiálov',
    category: 'supply',
    from: '2021-Q2',
    to: '2022-Q4',
    date: '2021 – 2022',
    description:
      'Post-pandemické výpadky dodávok: oceľ, drevo, izolácie +30–60 %. Stavebné náklady vzrástli o ~25 % za dva roky — zdraženie novostavieb a odklad projektov.',
    impact: 2,
    confidence: 0.75,
    provenance: 'measured',
  },
  {
    id: 'ukraine-war',
    title: 'Vojna na Ukrajine a energetická kríza',
    category: 'crisis',
    from: '2022-Q1',
    to: '2023-Q4',
    date: 'od 24. 2. 2022',
    description:
      'Neistota, energetický šok, ~120-tis. odídencov s dočasným útočiskom → tlak na nájomný trh (nájmy +15–25 % v 2022–2023). Na predajné ceny pôsobila vojna cez infláciu a sadzby negatívne.',
    impact: -2,
    confidence: 0.7,
    provenance: 'measured',
  },
  {
    id: 'inflation-crisis',
    title: 'Inflačná kríza',
    category: 'crisis',
    from: '2022-Q1',
    to: '2023-Q4',
    date: '2022 – 2023',
    description:
      'HICP inflácia s vrcholom ~15 % (začiatok 2023) — erózia reálnych príjmov a kúpyschopnosti, zároveň motív „úteku do nehnuteľností“ pre hotovostných kupujúcich.',
    impact: -2,
    confidence: 0.75,
    provenance: 'measured',
  },
  {
    id: 'ecb-hiking',
    title: 'Cyklus zvyšovania sadzieb ECB',
    category: 'monetary',
    from: '2022-Q3',
    to: '2023-Q3',
    date: '7/2022 – 9/2023',
    description:
      'Najrýchlejší cyklus v histórii eura: depozitná sadzba z −0,5 % na 4,0 % za 14 mesiacov. Priemerná sadzba nových hypoték v SR vzrástla z ~1 % na ~4,2 % → prepad dopytu a objemu úverov.',
    impact: -5,
    confidence: 0.95,
    provenance: 'measured',
  },
  {
    id: 'correction-2023',
    title: 'Cenová korekcia',
    category: 'market',
    from: '2022-Q4',
    to: '2024-Q1',
    date: '2022-Q4 – 2024-Q1',
    description:
      'Nominálne ceny klesli z vrcholu ~2 520 €/m² (2022) o ~4–5 % (reálne po zohľadnení inflácie o ~20 %). Mäkké pristátie — bez núteného výpredaja vďaka nízkej nezamestnanosti a fixáciám.',
    impact: -3,
    confidence: 0.85,
    provenance: 'measured',
  },
  {
    id: 'volvo-kosice',
    title: 'Volvo Cars — závod Valaliky (Košice)',
    category: 'investment',
    from: '2022-Q3',
    date: 'ohlásené 6/2022, výstavba od 2023',
    description:
      'Investícia ~1,2 mld. € do závodu na elektromobily pri Košiciach (plán ~3 300 pracovných miest + subdodávatelia). Zrýchlenie rastu cien a nájmov v Košickom kraji 2023–2025.',
    impact: 3,
    confidence: 0.7,
    regions: ['KE'],
    provenance: 'measured',
  },
  {
    id: 'mortgage-bonus',
    title: 'Daňový bonus zo zvýšenia splátky hypotéky',
    category: 'policy',
    from: '2023-Q1',
    to: '2024-Q4',
    date: '2023 – 2024',
    description:
      'Štátna kompenzácia časti nárastu splátok (do 150 €/mes.) pre domácnosti po refixácii. Zmiernila riziko núteného predaja; vplyv na ceny okrajový.',
    impact: 1,
    confidence: 0.6,
    provenance: 'measured',
  },
  {
    id: 'ecb-easing',
    title: 'Cyklus znižovania sadzieb ECB',
    category: 'monetary',
    from: '2024-Q2',
    to: '2025-Q2',
    date: '6/2024 – 6/2025',
    description:
      'Depozitná sadzba zo 4,0 % na 2,0 % (od 6/2025 stabilná). Hypotéky zlacneli k ~3,5 % — obnovenie dopytu a štart nového rastového cyklu.',
    impact: 4,
    confidence: 0.9,
    provenance: 'measured',
  },
  {
    id: 'consolidation-2025',
    title: 'Fiškálna konsolidácia (DPH 23 %, daň z transakcií)',
    category: 'policy',
    from: '2025-Q1',
    to: '2025-Q4',
    date: 'od 1/2025',
    description:
      'Zvýšenie DPH 20 → 23 %, daň z finančných transakcií, vyššie odvody — inflácia ~4 % v 2025 a tlak na disponibilné príjmy. Na ceny nehnuteľností krátkodobo neutrálne až mierne negatívne.',
    impact: -1,
    confidence: 0.6,
    provenance: 'measured',
  },
  {
    id: 'regional-boom-2025',
    title: 'Regionálny boom — kraje dobiehajú Bratislavu',
    category: 'market',
    from: '2025-Q1',
    to: '2025-Q4',
    date: '2025',
    description:
      'Národný rast +12 % (NBS); najsilnejšie Nitriansky, Banskobystrický a Košický kraj. Podiel BA kraja na ponuke klesol na 30 %. Prešovský kraj ako jediný v Q4 2025 medziročne mierne klesol (−0,3 %).',
    impact: 4,
    confidence: 0.85,
    provenance: 'measured',
  },
  {
    id: 'supply-shortage',
    title: 'Chronický nedostatok novej výstavby',
    category: 'supply',
    from: '2022-Q1',
    to: '2025-Q4',
    date: '2022 – súčasnosť',
    description:
      'Stavebné povolenia klesli z ~26-tis. (2020) na ~15-tis. bytov ročne; dokončené byty klesajú od 2021. SR má jeden z najnižších počtov bytov na 1 000 obyvateľov v EÚ (~390) — štrukturálna podpora cien.',
    impact: 3,
    confidence: 0.8,
    provenance: 'measured',
  },
]

export const EVENT_CATEGORY_META: Record<
  MarketEvent['category'],
  { label: string; color: string }
> = {
  monetary: { label: 'Menová politika', color: '#4c9aff' },
  regulation: { label: 'Regulácia', color: '#9aa7ff' },
  crisis: { label: 'Kríza / šok', color: '#e5484d' },
  demand: { label: 'Dopyt', color: '#2fbf71' },
  supply: { label: 'Ponuka', color: '#f5a623' },
  policy: { label: 'Vládna politika', color: '#c084fc' },
  investment: { label: 'Investície', color: '#34d399' },
  market: { label: 'Trhová fáza', color: '#f472b6' },
}
