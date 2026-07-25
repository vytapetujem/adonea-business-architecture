# SK Housing Monitor

Profesionálny interaktívny dashboard slovenského rezidenčného trhu **2016 → súčasnosť**:
ceny podľa krajov, makroekonomické faktory, trhové cykly, ocenenie trhu, scenárové prognózy,
investičná analýza a rozhodovací asistent „kúpiť či počkať“.

Cieľová skupina: banky, developeri, investičné fondy, verejné inštitúcie, novinári aj kupujúci.

## Rýchly štart

```bash
cd slovak-housing-dashboard
npm install
npm run dev        # vývojový server
npm run build      # produkčný build (tsc + vite)
npm run preview    # náhľad produkčného buildu
```

## Technológie

React 19 · TypeScript · TailwindCSS · Apache ECharts (tree-shaken core) · Framer Motion · Vite.
Mapa je samostatná SVG choropleta (schematické hranice krajov) — bez externých dlaždíc,
aplikácia je plne offline po zbuildovaní.

## Štruktúra projektu

```
slovak-housing-dashboard/
├── docs/                        # metodologické dokumenty (pozri nižšie)
├── scripts/refresh-data.mjs     # pipeline na obnovu dát z oficiálnych zdrojov
├── src/
│   ├── lib/                     # typy, kvartálne utility, štatistika, formátovanie
│   │   ├── types.ts             # doménové typy vrátane tried proveniencie dát
│   │   ├── quarters.ts          # práca s kvartálnou osou 2016-Q1 → 2025-Q4
│   │   └── stats.ts             # korelácie, OLS, volatilita, anuita, CAGR…
│   ├── data/                    # DATA LAYER — všetky vstupné série s provenienciou
│   │   ├── sources.ts           # register zdrojov + overené kotvy (25. 7. 2026)
│   │   ├── prices.ts            # národné a krajské ceny €/m² (NBS)
│   │   ├── macro.ts             # sadzby, inflácia, HDP, mzdy, výstavba, migrácia
│   │   ├── rents.ts             # trhové nájomné (odhad — SR nemá oficiálnu štatistiku)
│   │   ├── events.ts            # 16 udalostí ovplyvňujúcich trh (fakty + odhad vplyvu)
│   │   └── regions.ts           # metadáta krajov + schematická SVG geometria
│   ├── analytics/               # ANALYTICKÝ ENGINE (čisté funkcie nad data layer)
│   │   ├── metrics.ts           # rasty, volatilita, dostupnosť, PTI/PTR na scope
│   │   ├── drivers.ts           # atribúcia faktorov (korelácie + štrukturálne váhy)
│   │   ├── cycles.ts            # klasifikácia fáz cyklu + pravdepodobnosti
│   │   ├── valuation.ts         # kompozitné ocenenie, fér hodnota, pravdepodobnosti
│   │   ├── forecast.ts          # scenárový prognostický model (momentum+fundament+reverzia)
│   │   ├── outlook.ts           # 12M smerové pravdepodobnosti + top 5 dôvodov
│   │   ├── investment.ts        # skóre krajov 0–100 (rast/nájom/likvidita/riziko)
│   │   └── decision.ts          # asistent „kúpiť či počkať“
│   ├── components/              # UI vrstva (sekcie, grafy, mapa, timeline, filtre)
│   └── state/FilterContext.tsx  # globálne filtre (kraj, typ, obdobie, udalosti)
└── README.md
```

## Dokumentácia

| Dokument | Obsah |
| --- | --- |
| [docs/DATA_ACQUISITION.md](docs/DATA_ACQUISITION.md) | Zdroje, overené kotvy, refresh pipeline, ako vznikla kompilácia |
| [docs/DATA_CLEANING.md](docs/DATA_CLEANING.md) | Čistenie, kvartalizácia, zjednotenie časovej osi |
| [docs/FORECAST_METHODOLOGY.md](docs/FORECAST_METHODOLOGY.md) | Matematika všetkých modelov (drivery, cykly, ocenenie, prognóza, skóre) |
| [docs/ASSUMPTIONS.md](docs/ASSUMPTIONS.md) | Všetky číselné predpoklady na jednom mieste |
| [docs/AI_REASONING.md](docs/AI_REASONING.md) | Ako vznikali expertné odhady (vplyvy udalostí, váhy, priory scenárov) |
| [docs/LIMITATIONS.md](docs/LIMITATIONS.md) | Známe obmedzenia a čo dashboard NEVIE povedať |

## Zásady práce s dátami

Aplikácia **nefabrikuje históriu**. Každá séria nesie triedu proveniencie zobrazovanú v UI:

- **Merané** — oficiálne publikované (ECB kalendár sadzieb, udalosti).
- **Kompilované** — prepis z publikácií NBS/ŠÚSR; kľúčové kotvy overené proti živým
  zdrojom 25. 7. 2026 (zoznam v sekcii *Metodika a dáta* aj v `src/data/sources.ts`),
  medziľahlé body s toleranciou ±1–2 %.
- **Vypočítané** — deterministické transformácie (rasty, pomery, interpolácie).
- **AI odhad** — modelové odhady kalibrované na kotvy (krajské série ±5–10 %, nájmy ±10–15 %).
- **Prognóza** — scenárové projekcie s intervalmi spoľahlivosti.

Kde dáta neexistujú (okresné ceny, oficiálne trhové nájmy, podiel zahraničných kupujúcich),
aplikácia to **explicitne priznáva** namiesto dopĺňania čísel.

> **Pred produkčným/regulatórnym použitím** spustite `scripts/refresh-data.mjs`
> (vyžaduje prostredie s prístupom na nbs.sk a data.statistics.sk) a nahraďte
> kompilované série presnými oficiálnymi hodnotami. Build prostredie tohto
> repozitára malo sieťovú politiku blokujúcu tieto domény.

## Licencia a zodpovednosť

Analytický nástroj, nie investičné poradenstvo. Zdrojové dáta patria ich vydavateľom
(NBS, ŠÚSR, ECB, Eurostat).
