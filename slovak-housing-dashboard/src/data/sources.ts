import type { DataSource } from '../lib/types'

/**
 * Registry of all data sources. `vintage` records when the compilation was last
 * reconciled against the source. See docs/DATA_ACQUISITION.md for the refresh pipeline.
 */
export const SOURCES: DataSource[] = [
  {
    id: 'nbs-rre',
    name: 'Ceny nehnuteľností na bývanie (ponukové ceny, €/m²)',
    publisher: 'Národná banka Slovenska',
    url: 'https://nbs.sk/statisticke-udaje/vybrane-makroekonomicke-ukazovatele/ceny-nehnutelnosti-na-byvanie/',
    kind: 'central-bank',
    usedFor: 'Národné a krajské ceny bývania €/m² (štvrťročne), byty vs. domy',
    vintage: '2026-07 (kotvy overené 25. 7. 2026; medziľahlé hodnoty prepis z publikácií NBS)',
  },
  {
    id: 'nbs-mfi',
    name: 'Úrokové sadzby z nových úverov na bývanie',
    publisher: 'Národná banka Slovenska',
    url: 'https://nbs.sk/statisticke-udaje/menova-a-bankova-statistika/',
    kind: 'central-bank',
    usedFor: 'Priemerná sadzba nových hypoték, rast úverového portfólia',
    vintage: '2026-07 (kotva ~3,5 % od 10/2025 overená)',
  },
  {
    id: 'susr',
    name: 'DATAcube / ŠÚSR',
    publisher: 'Štatistický úrad SR',
    url: 'https://datacube.statistics.sk/',
    kind: 'official',
    usedFor: 'Mzdy, nezamestnanosť, HDP, dokončené byty, stavebné povolenia, migrácia',
    vintage: '2026-07 (ročné hodnoty; prepis z publikácií ŠÚSR)',
  },
  {
    id: 'ecb',
    name: 'ECB key interest rates',
    publisher: 'Európska centrálna banka',
    url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html',
    kind: 'eu',
    usedFor: 'Sadzba jednodňových sterilizačných operácií (deposit facility)',
    vintage: '2026-07 (verejne známy kalendár rozhodnutí, vysoká spoľahlivosť)',
  },
  {
    id: 'eurostat',
    name: 'Eurostat HICP / House Price Index',
    publisher: 'Eurostat',
    url: 'https://ec.europa.eu/eurostat/web/housing-price-statistics',
    kind: 'eu',
    usedFor: 'Inflácia HICP, krížová kontrola indexu cien nehnuteľností',
    vintage: '2026-07',
  },
  {
    id: 'market-rent',
    name: 'Trhové reporty nájomného (realitné portály, Realitná únia)',
    publisher: 'Trhové zdroje (nie oficiálna štatistika)',
    url: 'https://www.realitnaunia.sk/realitny-barometer',
    kind: 'market',
    usedFor: 'Priemerné trhové nájomné €/m²/mesiac — orientačné, SR nemá oficiálnu štatistiku trhových nájmov',
    vintage: '2026-07 (odhad, nízka presnosť — pozri obmedzenia)',
  },
]

export const sourceById = (id: string) => SOURCES.find((s) => s.id === id)

/** Anchor values verified against live sources on 2026-07-25 (see docs/DATA_ACQUISITION.md). */
export const VERIFIED_ANCHORS = [
  { label: 'Priemerná cena bývania SR, 2016-Q1', value: '1 238 €/m²', source: 'NBS komentár Q1 2016' },
  { label: 'Priemerná cena bývania SR, 2025-Q4', value: '2 906 €/m² (+92 €/m² q/q)', source: 'NBS komentár Q4 2025' },
  { label: 'Byty SR, 2025-Q4', value: '3 262 €/m²', source: 'NBS' },
  { label: 'Domy SR, 2025-Q4', value: '2 139 €/m²', source: 'NBS' },
  { label: 'Rast cien 2025', value: '+12 % (2024: < 1 %)', source: 'NBS' },
  { label: 'Medziročný rast 2025-Q2 / Q3', value: '+11,3 % / +13,4 %', source: 'ŠÚSR / NBS' },
  { label: 'Priemerná sadzba hypoték od 10/2025', value: '≈ 3,5 %', source: 'NBS makroprudenciálny komentár' },
  { label: 'Podiel Bratislavského kraja na ponuke', value: '36 % (2021) → 30 % (2025)', source: 'NBS' },
  { label: 'Prešovský kraj 2025-Q4 medziročne', value: '−0,3 % (jediný pokles)', source: 'NBS komentár Q4 2025' },
]
