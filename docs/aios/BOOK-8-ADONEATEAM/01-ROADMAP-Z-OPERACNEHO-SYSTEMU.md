# Roadmapa AdoneaTeam odvodená z operačného systému

## Metadáta

- **ID:** APP-ROAD-001
- **Typ dokumentu:** Vývojová roadmapa
- **Verzia:** 1.0
- **Stav:** Proposed
- **Vlastník:** Product owner AdoneaTeam (POS-080)
- **Schvaľovateľ:** CEO (POS-001)
- **Súvisiace:** `00-BASELINE-AUDIT-2026-07.md`, BOOK 7 STRAT-001, POS-021, SLA prvého kontaktu, ADR-051–062

---

## 1. Princíp roadmapy

Aplikácia sa dokončuje tak, aby sa stala digitálnym dvojčaťom firmy (ADR-062). Každá položka má pôvod v operačnom systéme alebo v oprave nesúladu medzi appkou a realitou. Poradie určujú tri kritériá v tomto poradí:

1. **Chráni tržbu a maržu** (nestrácať zaplatený dopyt, chrániť hotovosť).
2. **Robí pravdu merateľnou** (KPI zo stratégie sa dá reálne zmerať).
3. **Znižuje riziko** (bezpečnosť, konzistencia dát).

Roadmapa je rozdelená do štyroch vĺn. Vlny zodpovedajú horizontom stratégie. Neotvára sa ďalšia vlna, kým nie je dokončená a overená predchádzajúca kritická položka (v súlade s pracovným režimom AOM).

---

## 2. Prehľad vĺn

| Vlna | Cieľ | Väzba na stratégiu |
|---|---|---|
| Vlna 0 – Pravda a bezpečnosť | zjednotiť dáta a zabezpečiť funkcie | Rok 1, P5 |
| Vlna 1 – Obchodný tok | nestrácať leady, prevod na zákazku | Rok 1, P1 |
| Vlna 2 – Financie a hotovosť | správne párovanie, marža, forecast | Rok 1–2, P3 |
| Vlna 3 – Realizácia a zákazník | kvalita, reklamácie, opakovaný obchod | Rok 2–3, P2/P4 |
| Vlna 4 – Organization Engine | karty pozícií v systéme | Rok 2–3, P5 |

---

## 3. Vlna 0 – Pravda a bezpečnosť (základ)

Bez tohto sú KPI nedôveryhodné a systém rizikový.

### E0.1 – Zjednotiť CRM stavy do DB enumu

- **Pôvod:** ADR-058, audit riziko #3.
- **Problém:** UI `dohodnute/strateny`, AI `vyhrany/prehrany`, `Leady.tsx` `VYHRA/STRATA`.
- **Riešenie:** kanonický enum/check constraint pre `lead_status` (návrh stavov podľa POS-021, časť „Povinné obchodné stavy"), migračná mapa starých hodnôt, zjednotenie UI + `ai-agent` + `telegram-webhook` + `Leady.tsx`.
- **Hotovo, keď:** všetky moduly čítajú a zapisujú rovnaké hodnoty; migrácia prebehla bez straty dát.

### E0.2 – Štruktúrovaný dôvod straty

- **Pôvod:** POS-021 (zoznam dôvodov straty), ADR-057.
- **Riešenie:** stĺpec `crm_leads.lost_reason` (enum) + voliteľná poznámka; povinný pri prechode do `strateny`; report dôvodov straty.
- **Hotovo, keď:** stratený lead sa nedá uložiť bez dôvodu; `iné` nie je najčastejšia kategória.

### E0.3 – Autorizácia Edge Functions

- **Pôvod:** audit riziko #1, #2.
- **Riešenie:** jednotný server-side auth middleware; zapnúť `verify_jwt` alebo overiť vlastnú kontrolu pri `ai-agent`, `mcp-server`, `scan-expense`, `generate-project-protocol`, `telegram-webhook`; auditný log zápisov AI/MCP; obmedziť povolené operácie a doplniť schvaľovanie citlivých zmien (ADR-051, časť 10 AOM – zakázané rozhodnutia AI).
- **Hotovo, keď:** žiadna citlivá funkcia nemá zápis bez overenej identity a logu.

### E0.4 – Enum pre `projects.status` a jeden model protokolov

- **Pôvod:** audit riziko #6, #7.
- **Riešenie:** `projects.status` ako enum/check; rozhodnutie o cieľovom protokolovom modeli a migrácia druhého; zdokumentovať proces uzatvorenia projektu.
- **Hotovo, keď:** existuje jeden protokolový model; projekt má definované koncové stavy.

### E0.5 – Prevádzková transparentnosť

- **Pôvod:** audit riziko #8.
- **Riešenie:** zdokumentovať Supabase scheduled jobs (email queue, follow-up, push); zdravotný pohľad, či automatizácie bežia; oprava mojibake textov v samostatnej zmene.
- **Hotovo, keď:** vlastník vie, ktoré automatizácie bežia a kedy naposledy prebehli.

---

## 4. Vlna 1 – Obchodný tok (chráni zaplatený dopyt)

Priamo napĺňa POS-021 a SLA prvého kontaktu. Najvyššia obchodná hodnota.

### E1.1 – SLA prvého kontaktu v aplikácii

- **Pôvod:** rozhodnutie „SLA prvého kontaktu", POS-021, KPI-021-01/02.
- **Riešenie:** priorita leadu P1/P2/P3; výpočet termínu SLA podľa pracovných hodín (Po–Pia 08:00–17:00, sviatky mimo); odpočítavanie do prekročenia; zvýraznenie blížiaceho sa prekročenia; automatická eskalácia po prekročení; rozlíšenie ručného a automatického kontaktu.
- **Meria:** SLA prvého kontaktu (P1), medián času do prvého kontaktu.
- **Hotovo, keď:** appka vie zobraziť a reportovať dodržanie SLA podľa obchodníka, zdroja a služby.

### E1.2 – Povinný ďalší krok (žiadny lead bez akcie)

- **Pôvod:** ADR-054, ADR-057, ADR-058, KPI-021-03/04.
- **Riešenie:** lead sa po interakcii nedá uložiť bez ďalšieho kroku a termínu, alebo bez korektného uzavretia; dashboard „leady bez ďalšieho kroku" a „follow-upy po termíne" s cieľom 0.
- **Hotovo, keď:** systém vynúti pravidlo neúplného follow-upu; počet leadov bez kroku je viditeľne 0.

### E1.3 – Prevod lead → projekt/zákazka

- **Pôvod:** audit riziko #4, mapa systému.
- **Riešenie:** `crm_leads.project_id` + akcia „konvertovať na zákazku", ktorá prenesie zákazníka, službu, hodnotu a prílohy do `projects`/`installations`; zachovanie histórie leadu.
- **Meria:** konverzia lead → objednávka (P1).
- **Hotovo, keď:** vyhraný lead vytvorí zákazku bez ručného prepisovania a väzba je dohľadateľná.

### E1.4 – História aktivít leadu a priradenie vlastníka

- **Pôvod:** POS-021 (výstup práce, riadiaci pohľad), ADR-053.
- **Riešenie:** časová os interakcií (kanál, výsledok, kto); jasný vlastník leadu a zástupca; riadiaci pohľad pre vedúceho obchodu (nové leady bez kontaktu, pipeline podľa obchodníka).
- **Hotovo, keď:** každý lead má úplnú stopu a jedného vlastníka.

### E1.5 – Zberač leadov (jednotný príjem) — *implementované 2026-07-19*

- **Pôvod:** POS-021, ADR-062, rozhodnutie `decisions/2026-07-19-LEAD-COLLECTOR.md`.
- **Riešenie:** jedna schránka pre všetky kanály (Meta Ads cez API, Gmail hodinovou kontrolou, telefonát/ručne); `crm_leads` rozšírené o kanál, pôvod a `intake_status`; triáž prijať/spam/duplicita; automatizácia cronom.
- **Hotovo, keď:** nové leady zo všetkých kanálov prídu do appky a spracujú sa podľa stanov. **Stav:** kód hotový a nasadený do vetvy; Meta/Gmail potrebujú produkčné secrets a cron.

---

## 5. Vlna 2 – Financie a hotovosť (chráni maržu)

### E2.1 – Oprava bankového párovania na sumy s DPH

- **Pôvod:** audit riziko #5, KPI presnosť párovania.
- **Riešenie:** párovať podľa `amount_with_vat`, variabilného symbolu a dátumu, s fallbackom; upraviť confidence skóre.
- **Hotovo, keď:** párovanie sedí na reálnych platbách s DPH; presnosť ≥ 85 %.

### E2.2 – Marža a odchýlka na úrovni zákazky

- **Pôvod:** STRAT-001 P2/P3.
- **Riešenie:** pri projekte porovnať plánovanú a skutočnú maržu z `expenses`/`revenues` na `project_id`; upozornenie na prekročenie odchýlky.
- **Hotovo, keď:** CEO vidí ziskovosť jednotlivej zákazky, nielen firmy ako celku.

### E2.3 – Cash-flow forecast a pohľadávky

- **Pôvod:** POS-060 (CFO), STRAT-001 P3.
- **Riešenie:** forecast hotovosti (očakávané inkasá vs. splatné výdavky); DSO a pohľadávky po splatnosti s ďalším krokom.
- **Hotovo, keď:** vlastník vidí hotovostnú rezervu v mesiacoch a rizikové pohľadávky.

---

## 6. Vlna 3 – Realizácia a zákazník

### E3.1 – Modul reklamácií

- **Pôvod:** POS-041, procesy 03.14, STRAT-001 P2.
- **Riešenie:** reklamácia s vlastníkom, príčinou, termínom rozhodnutia a uzavretím; väzba na zákazku a kvalitu.
- **Meria:** reklamácie ako podiel z dokončených zákaziek.

### E3.2 – Customer care a odovzdanie po objednávke

- **Pôvod:** POS-040, procesy 03.11/03.15, STRAT-001 P4.
- **Riešenie:** stav „po objednávke" so zodpovednosťou za komunikáciu; zber referencií a spokojnosti (NPS).
- **Meria:** podiel opakovaných/odporúčaných zákaziek, NPS.

### E3.3 – Kvalita realizácie a kontrola

- **Pôvod:** POS-032/091, procesy 03.10, ADR-051.
- **Riešenie:** kontrolný bod kvality pred odovzdaním; ťaženie zlepšení z protokolov a fotiek.

---

## 7. Vlna 4 – Organization Engine

### E4.1 – Karty pozícií v aplikácii

- **Pôvod:** BOOK 1, ADR-060/061, POS-021 (budúci Organization Engine).
- **Riešenie:** oddeliť štyri vrstvy — osoba, karta pozície, priradenie karty, systémové oprávnenie; evidencia držiteľa, zástupcu, obdobia držania; spúšťače preťaženia.
- **Hotovo, keď:** appka nepracuje iba s rolami `admin/technik/obchodnik`, ale s kartami pozícií a ich priradením.

### E4.2 – KPI kariet a spúšťače kapacity

- **Pôvod:** katalóg pozícií (spúšťače oddelenia), STRAT-001 P5.
- **Riešenie:** vyhodnotenie KPI karty; upozornenie na splnený spúšťač novej kapacity.

---

## 8. Súhrnná tabuľka priorít

| ID | Epika | Vlna | Chráni | Meria KPI | Riziko z auditu |
|---|---|---|---|---|---|
| E0.1 | Zjednotiť CRM stavy | 0 | dáta | disciplína dát | #3 |
| E0.2 | Dôvod straty | 0 | proces | dôvody straty | #6 |
| E0.3 | Auth Edge Functions | 0 | bezpečnosť | — | #1, #2 |
| E0.4 | Enum stavov + protokoly | 0 | dáta | — | #6, #7 |
| E0.5 | Prevádzková transparentnosť | 0 | prevádzka | — | #8, #9 |
| E1.1 | SLA prvého kontaktu | 1 | tržba | SLA, medián | — |
| E1.2 | Povinný ďalší krok | 1 | tržba | leady bez kroku | — |
| E1.3 | Prevod lead → projekt | 1 | tržba | konverzia | #4 |
| E1.4 | História a vlastník leadu | 1 | tržba | pipeline | — |
| E2.1 | Párovanie s DPH | 2 | marža | presnosť párovania | #5 |
| E2.2 | Marža na zákazku | 2 | marža | odchýlka marže | — |
| E2.3 | Cash-flow forecast | 2 | hotovosť | rezerva, DSO | — |
| E3.1 | Reklamácie | 3 | kvalita | reklamácie | — |
| E3.2 | Customer care / NPS | 3 | zákazník | opakovaný obchod | — |
| E3.3 | Kontrola kvality | 3 | kvalita | reklamácie | — |
| E4.1 | Karty pozícií | 4 | organizácia | obsadené karty | — |
| E4.2 | KPI kariet | 4 | organizácia | spúšťače | — |

---

## 9. Spôsob práce pri implementácii

1. Každá epika sa realizuje ako samostatná zmena s jasným „hotovo, keď".
2. Zmena databázy ide vždy cez migráciu; historické dáta sa migrujú, neprepisujú.
3. Neotvára sa ďalšia kritická epika bez dokončenia aktuálnej.
4. Každá dokončená epika sa premietne do baseline (nová verzia `00-BASELINE-AUDIT`).
5. AI a automatizácie konajú iba v rámci pravidiel schválených v OS (AOM časť 10, ADR-056).

---

## 10. Predpoklady mimo repozitára

Roadmapa počíta s tým, že sa v Supabase overia a zdokumentujú: RLS policies, Storage buckety, Edge secrets, cron joby a externé webhooky (SuperFaktúra, Telegram, email provider). Tieto veci nie sú v kóde a musí ich potvrdiť vlastník systému (POS-084).

---

## 11. Otvorené rozhodnutia pred stavom Accepted

1. Potvrdiť kanonické CRM stavy (E0.1) podľa POS-021.
2. Určiť cieľový protokolový model (E0.4).
3. Potvrdiť poradie vĺn a rozsah Vlny 0 a 1 pre prvý implementačný cyklus.
4. Rozhodnúť, či prvý kód dodá interný alebo externý vývojár (POS-082) cez repozitár `vytapetujem/adonea`.

---

## História zmien

| Verzia | Dátum | Zmena |
|---|---|---|
| 1.0 | 2026-07-19 | Prvá roadmapa aplikácie odvodená z OS a auditu. |
