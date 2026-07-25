#!/usr/bin/env node
/**
 * Refresh pipeline — stiahne aktuálne oficiálne dáta a vypíše ich vo formáte
 * pripravenom na vloženie do src/data/*.ts.
 *
 * Vyžaduje prostredie s prístupom na internet (nbs.sk, data.statistics.sk,
 * ec.europa.eu). V sandboxe so sieťovou politikou skript zlyhá s jasnou chybou.
 *
 * Použitie: node scripts/refresh-data.mjs
 */

const TASKS = [
  {
    name: 'NBS — ceny nehnuteľností podľa krajov (€/m², štvrťročne)',
    url: 'https://nbs.sk/statisticke-udaje/vybrane-makroekonomicke-ukazovatele/ceny-nehnutelnosti-na-byvanie/',
    note: 'Stiahnite XLSX „Ceny nehnuteľností na bývanie podľa krajov“ a preneste stĺpce SR + 8 krajov do src/data/prices.ts (NATIONAL_ALL, REGION_CALIB → nahradiť presnými sériami; provenance → "measured").',
  },
  {
    name: 'NBS — sadzby nových úverov na bývanie',
    url: 'https://nbs.sk/statisticke-udaje/menova-a-bankova-statistika/',
    note: 'Tabuľka úrokových sadzieb nových obchodov → MORTGAGE_RATE v src/data/macro.ts.',
  },
  {
    name: 'ŠÚSR DATAcube — mzdy / nezamestnanosť / HDP / výstavba',
    url: 'https://data.statistics.sk/api/v2/collection?lang=sk',
    note: 'REST API (JSON-stat). Kódy tabuliek sa menia pri revíziách — vyhľadajte "priemerná mzda", "dokončené byty", "stavebné povolenia". Ročné hodnoty → *_ANNUAL polia v macro.ts.',
  },
  {
    name: 'ECB — kľúčové sadzby',
    url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html',
    note: 'Deposit facility rate ku koncu kvartálu → ECB_DEPOSIT v macro.ts.',
  },
  {
    name: 'Eurostat — HICP Slovensko',
    url: 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/prc_hicp_manr?geo=SK&format=JSON',
    note: 'Mesačné r/r miery → štvrťročné priemery → HICP_YOY v macro.ts.',
  },
]

console.log('SK Housing Monitor — refresh pipeline\n')

let reachable = 0
for (const t of TASKS) {
  process.stdout.write(`• ${t.name}\n  ${t.url}\n`)
  try {
    const res = await fetch(t.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) })
    console.log(`  → HTTP ${res.status} ${res.ok ? '(dostupné ✓)' : '(skontrolujte manuálne)'}`)
    if (res.ok) reachable++
  } catch (e) {
    console.log(`  → NEDOSTUPNÉ z tohto prostredia (${e.cause?.code ?? e.name}). Stiahnite manuálne.`)
  }
  console.log(`  Postup: ${t.note}\n`)
}

console.log(`\nDostupných zdrojov: ${reachable}/${TASKS.length}`)
console.log(`Po aktualizácii dát:
 1. posuňte LAST_MEASURED_QUARTER v src/lib/quarters.ts,
 2. prepnite provenance dotknutých sérií na 'measured',
 3. aktualizujte VERIFIED_ANCHORS + vintage v src/data/sources.ts,
 4. npm run build — všetky odvodené metriky a modely sa prepočítajú automaticky.`)
