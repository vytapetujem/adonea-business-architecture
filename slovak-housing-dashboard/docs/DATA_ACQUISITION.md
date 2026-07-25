# Metodika získavania dát

## 1. Hierarchia zdrojov

| Priorita | Zdroj | Použitie |
| --- | --- | --- |
| 1 | **NBS** — Ceny nehnuteľností na bývanie (ponukové ceny, €/m²) | národné a krajské ceny, byty vs. domy |
| 1 | **NBS** — menová a banková štatistika | sadzby nových hypoték, rast úverov |
| 2 | **ŠÚSR / DATAcube** | mzdy, nezamestnanosť, HDP, dokončené byty, povolenia, migrácia |
| 2 | **ECB** | kľúčové sadzby (verejný kalendár rozhodnutí) |
| 3 | **Eurostat** | HICP, krížová kontrola HPI |
| 4 | Trhové zdroje (Realitná únia, portály) | nájomné — SR nemá oficiálnu štatistiku trhových nájmov |

## 2. Ako vznikol zabudovaný dataset (vintage 07/2026)

Dataset v `src/data/` je **kompilácia**, nie priamy export, pretože build prostredie
malo sieťovú politiku blokujúcu nbs.sk aj data.statistics.sk (HTTP 403 na proxy).
Postup zostavenia:

1. **Overenie kotiev proti živým zdrojom (25. 7. 2026)** — cez webové vyhľadávanie
   indexovaného obsahu NBS/ŠÚSR/tlačových správ boli overené tieto hodnoty:

   | Kotva | Hodnota | Zdroj |
   | --- | --- | --- |
   | Priemerná cena SR 2016-Q1 | 1 238 €/m² (+0,5 % q/q, +1,0 % r/r) | NBS komentár Q1 2016 |
   | Priemerná cena SR 2025-Q4 | 2 906 €/m² (+92 €/m² q/q) | NBS komentár Q4 2025 |
   | Byty SR 2025-Q4 / 2025-Q1 | 3 262 €/m² / 3 041 €/m² (vtedajšie maximum) | NBS |
   | Domy SR 2025-Q4 | 2 139 €/m² | NBS |
   | Rast 2025 / 2024 | ≈ +12 % / < +1 % | NBS, SME |
   | Medziročný rast 2025-Q2 / Q3 | +11,3 % / +13,4 % | ŠÚSR/NBS |
   | Hypotekárne sadzby od 10/2025 | ≈ 3,5 %; ponuky 2026: 3,38–3,99 % | NBS, trhové porovnávače |
   | Rast hypoportfólia 09/2025→02/2026 | 6,6 % → 8 % | NBS |
   | Podiel BA kraja na ponuke | 36 % (2021) → 30 % (2025) | NBS |
   | Prešovský kraj 2025-Q4 | −0,3 % r/r (jediný pokles) | NBS komentár Q4 2025 |

2. **Prepis medziľahlých hodnôt** z publikácií NBS/ŠÚSR (znalostná kompilácia).
   Séria je konštruovaná tak, aby presne sedela na všetky overené kotvy;
   medziľahlé body majú deklarovanú toleranciu **±1–2 %**.

3. **Krajské série** — NBS presné štvrťročné XLSX nebolo dostupné; série sú
   **modelové** (národná séria × časovo premenlivá regionálna relatívna úroveň
   kalibrovaná na regionálne kotvy a dokumentované regionálne dynamiky z komentárov
   NBS). Tolerancia **±5–10 %**, trieda „AI odhad“ v UI.

4. **Poznámka k interpretácii**: NBS séria = **ponukové** ceny. Transakčný index
   ŠÚSR (HPI) sa líši v úrovni aj dynamike (napr. regionálne rasty Q3 2025 sa medzi
   datasetmi líšia o jednotky p. b.). Dashboard túto odlišnosť priznáva.

## 3. Refresh pipeline (produkčné použitie)

`scripts/refresh-data.mjs` — spustiť v prostredí s prístupom na internet:

```bash
node scripts/refresh-data.mjs   # stiahne a vypíše inštrukcie/CSV na aktualizáciu src/data/
```

Kroky, ktoré skript vykonáva (a ktoré možno spraviť aj ručne):

1. NBS ceny podľa krajov: https://nbs.sk/statisticke-udaje/vybrane-makroekonomicke-ukazovatele/ceny-nehnutelnosti-na-byvanie/ (XLSX, štvrťročne ~45 dní po konci kvartálu).
2. NBS úrokové sadzby: menová a banková štatistika → nové obchody, úvery na bývanie.
3. DATAcube ŠÚSR (REST API, JSON-stat): mzdy `np3106rr`, nezamestnanosť, HDP, dokončené byty `st0007rs` (kódy tabuliek overiť — DATAcube ich reviduje).
4. ECB sadzby: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/
5. Eurostat HICP: dataset `prc_hicp_manr`, geo=SK.

Po stiahnutí nahradiť polia v `src/data/prices.ts` a `src/data/macro.ts` a posunúť
`LAST_MEASURED_QUARTER` v `src/lib/quarters.ts`. Provenience flagy prepnúť na
`measured`. Všetky odvodené metriky a modely sa prepočítajú automaticky.

## 4. Zjednotená časová os

Všetky série sú mapované na kvartálnu os `2016-Q1 … 2025-Q4` (40 bodov, index 0–39,
`src/lib/quarters.ts`). Ročné série sú kvartalizované (pozri DATA_CLEANING.md);
prognóza beží od `2026-Q1` (index 40+) a nikdy sa nemieša s históriou — v UI je
vždy vykreslená odlišným štýlom (čiarkovane + interval).
