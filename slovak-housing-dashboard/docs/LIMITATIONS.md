# Známe obmedzenia

Čo tento dashboard **nevie** a prečo — v poradí podľa závažnosti.

1. **Ponukové vs. transakčné ceny.** NBS séria vychádza z inzercie. Skutočné
   transakčné ceny (ŠÚSR HPI) sa líšia v úrovni (ponuky bývajú vyššie) aj
   dynamike (ponuky reagujú rýchlejšie hore, pomalšie dole). Regionálne r/r
   rasty za Q3 2025 sa medzi datasetmi líšia o jednotky p. b. (napr. Prešovský:
   ŠÚSR HPI > +20 % vs. NBS ponukové −0,3 % v Q4 — čiastočne odlišné obdobia,
   čiastočne metodika).

2. **Kompilovaný dataset.** Build prostredie nemalo prístup k oficiálnym XLSX/API
   (sieťová politika). Kotvy sú overené (25. 7. 2026), medziľahlé body ±1–2 %,
   krajské série ±5–10 %. Pred rozhodnutiami s finančným dopadom spustiť refresh
   pipeline (DATA_ACQUISITION.md §3).

3. **Žiadna okresná granularita.** NBS nepublikuje otvorené okresné rady;
   komerčné cenové mapy sú licencované. Okresné rozdiely (Poprad vs. zvyšok PO,
   Košice I–IV vs. vidiek KE) sa strácajú v krajskom priemere.

4. **Nájomné bez oficiálnej štatistiky.** Výnosy a PTR dedia neistotu ±10–15 %.

5. **História končí 2026-Q1** (doplnené 25. 7. 2026 z komentára NBS — 3 005 €/m²
   overená kotva; medziľahlé body 2025 rekalibrované, tolerancia r/r rastov
   ±0,5 p. b. voči publikovaným hodnotám). Q2 2026 v čase aktualizácie ešte
   nebol publikovaný; po refreshi sa model automaticky posunie.

6. **Malá vzorka pre pravdepodobnosti.** 40 kvartálov, jedna korekcia, nula
   prasknutých bublín v skúmanom okne → P(bublina), P(korekcia) sú expertné
   logistické mapovania, nie frekvenčné odhady. Chvosty (vojna, regulačný šok)
   model nezachytáva.

7. **Bez backtestu.** Prognostický model nebol validovaný out-of-sample
   (navrhnuté v budúcich vylepšeniach) — používať ako scenárový rámec, nie
   bodovú predpoveď.

8. **Kvartalizácia ročných sérií** (mzdy, výstavba, migrácia) vyhladzuje
   priebeh a mierne nadhodnocuje korelácie s cenami.

9. **Nekvantifikované faktory:** zahraniční kupujúci, inštitucionálni investori,
   airbnb-izácia centier, čierny nájomný trh — bez dát, spomenuté len kvalitatívne.

10. **Schematická mapa.** Hranice krajov sú zjednodušené ručne digitalizované
    polygóny — na vizuálnu orientáciu, nie GIS použitie.
