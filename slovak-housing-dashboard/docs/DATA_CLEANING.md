# Metodika čistenia a prípravy dát

## 1. Zjednotenie frekvencie

Cieľová frekvencia je **štvrťrok**. Tri triedy vstupov:

1. **Natívne kvartálne** (ceny NBS, sadzby, HICP): bez transformácie.
2. **Bodové udalosti** (rozhodnutia ECB): hodnota platná ku koncu štvrťroka.
3. **Ročné** (mzdy, nezamestnanosť, výstavba, migrácia): lineárna interpolácia
   medzi ročnými hodnotami; mzdy navyše so sezónnym Q4 faktorom ×1,03
   (koncoročné odmeny). Interpolované body nesú triedu „Vypočítané“/„AI odhad“,
   nikdy „Merané“.

## 2. Chýbajúce a nedostupné dáta

- Okresné ceny, oficiálne trhové nájmy, podiel zahraničných kupujúcich,
  spotrebiteľská dôvera v konzistentnej sérii — **neexistujú v otvorených
  zdrojoch**; aplikácia ich nedopĺňa syntetickými číslami. Kde sú nevyhnutné
  pre odvodený ukazovateľ (nájomný výnos), použije sa explicitne označený
  trhový odhad s toleranciou.
- Rok 2026 (Q1–Q2): nedostupné z build prostredia → história končí 2025-Q4.

## 3. Konzistenčné kontroly (vykonané pri zostavení)

- Kotvy vs. séria: všetky overené kotvy (DATA_ACQUISITION.md §2) sedia presne.
- Vnútorná aritmetika: q/q a r/r rasty prepočítané zo série sa zhodujú
  s publikovanými rastmi v tolerancii ±0,5 p. b.
- Krížová kontrola úrovní: byty > spolu > domy pre každý kvartál; BA kraj >
  všetky ostatné kraje; národná séria vnútri obalu krajských sérií.
- Monotónnosť kumulatívnych extrémov: historické maximum národnej série je
  2025-Q4 (2 906 €/m²), lokálny vrchol 2022 ≈ 2 520 €/m², dno dekády 2016-Q1.

## 4. Menové jednotky a deflátory

Všetky ceny sú **nominálne EUR**. Reálne vyjadrenia (spomínané v komentároch,
napr. „reálny pokles ~20 % počas korekcie“) používajú HICP deflátor a sú vždy
označené ako odvodený výpočet.

## 5. Outliery

Séria NBS je publikovaný agregát — outlier filtrovanie robí zdroj. Pri
kvartalizácii ročných dát žiadne body nevypadli. COVID prepad HDP v 2020-Q2
(−10,5 %) je ponechaný — je to skutočná hodnota, nie chyba merania.
