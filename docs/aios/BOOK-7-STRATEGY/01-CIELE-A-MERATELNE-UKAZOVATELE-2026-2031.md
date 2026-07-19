# Ciele a merateľné ukazovatele 2026–2031

## Metadáta

- **ID:** STRAT-001
- **Typ dokumentu:** Stratégia
- **Verzia:** 1.0
- **Stav:** Proposed
- **Vlastník:** CEO (POS-001)
- **Schvaľovateľ:** vlastník firmy
- **Dátum platnosti:** od schválenia
- **Ďalšia revízia:** štvrťročne, väčšia revízia ročne
- **Súvisiace:** BOOK 0 Constitution, BOOK 1 Organization, BOOK 8 AdoneaTeam

---

## 1. Účel dokumentu

Tento dokument prevádza ambíciu Adoney na konkrétne, merateľné a časovo ukotvené ciele na horizont 1 až 5 rokov. Zároveň ku každému cieľu určuje ukazovateľ (KPI), jeho zdroj dát a v ktorom module AdoneaTeam sa má merať.

Cieľom nie je iba stanoviť čísla obratu. Cieľom je, aby firma rástla spôsobom, ktorý neničí cash-flow, kvalitu ani kultúru — v súlade s ADR-051 (charakter pred výsledkami) a poslaním pozície CEO (POS-001).

Každý cieľ v tomto dokumente musí byť buď merateľný v AdoneaTeam, alebo musí existovať rozhodnutie, ako sa doplní jeho meranie. Ak sa cieľ nedá zmerať v systéme, nie je to spoľahlivo riadený cieľ (ADR-062).

---

## 2. Východisková ambícia

Z prijatého katalógu pozícií a rozhodnutí vlastníka vyplýva:

- obrat nad **1 000 000 €** do dvoch rokov,
- obrat nad **5 000 000 €** do piatich rokov,
- dopyt je poháňaný najmä plateným marketingom,
- firma predáva technické služby aj produkty a rastie cez viacero divízií,
- rast sa má diať presúvaním kariet pozícií, nie chaotickým naberaním ľudí.

Horizont dokumentu: **Q3 2026 → Q3 2031**. Rok 1 končí v polovici 2027, rok 2 (míľnik 1 M €) v polovici 2028, rok 5 (míľnik 5 M €) v polovici 2031.

---

## 3. North Star a strategické princípy

### North Star metrika

> **Zdravý ziskový rast**: rásť v uhradených tržbách pri zachovaní cieľovej hrubej marže a plnení SLA voči zákazníkovi.

North Star sa zámerne neviaže iba na obrat. Obrat bez marže, hotovosti a kvality je rizikový. Preto sa sleduje ako trojica: **uhradené tržby × hrubá marža × dodržané záväzky voči zákazníkovi**.

### Päť strategických princípov

1. **Nestrácať zaplatený dopyt.** Najdrahšia strata je lead, za ktorý sme zaplatili a nechali ho zomrieť (POS-021, SLA prvého kontaktu).
2. **Predať iba to, čo vieme doručiť.** Kapacita realizácie je limit rastu, nie predaj.
3. **Marža pred obratom.** Rast s klesajúcou maržou sa zastaví a prehodnotí.
4. **Systém nesie pamäť.** Každý významný stav žije v AdoneaTeam, nie v hlave (ADR-055, ADR-062).
5. **Rast cez karty, nie cez hrdinstvo.** Nová kapacita sa pridáva podľa splnených spúšťačov z katalógu pozícií.

---

## 4. Strategické témy (5 pilierov)

| Pilier | Otázka, ktorú rieši | Hlavná organizačná oblasť |
|---|---|---|
| P1 – Dopyt a obchod | Máme dosť kvalitných leadov a premieňame ich na maržové zákazky? | ORG-02, ORG-03 |
| P2 – Realizácia a kvalita | Vieme doručiť predané zákazky načas, kvalitne a v pláne? | ORG-04, ORG-10 |
| P3 – Financie a hotovosť | Zarábame reálne a máme hotovosť na rast? | ORG-07 |
| P4 – Zákazník a opakovaný obchod | Zostávajú zákazníci a odporúčajú nás? | ORG-05 |
| P5 – Organizácia a systém | Rastie firma ako riadený systém, nie ako preťaženie zakladateľov? | ORG-08, ORG-09 |

---

## 5. Cieľová trajektória obratu a marže

Hodnoty sú **plánovacie ciele**, nie záväzný rozpočet. Presné čísla potvrdí vlastník (viď otvorené rozhodnutia).

| Ukazovateľ | Rok 1 (2027) | Rok 2 (2028) | Rok 3 (2029) | Rok 4 (2030) | Rok 5 (2031) |
|---|---|---|---|---|---|
| Uhradené tržby (€) | 550 000 | 1 100 000 | 2 000 000 | 3 300 000 | 5 200 000 |
| Medziročný rast | základ | +100 % | +80 % | +65 % | +58 % |
| Cieľová hrubá marža | ≥ 30 % | ≥ 32 % | ≥ 33 % | ≥ 34 % | ≥ 35 % |
| Prevádzkový zisk (EBIT) | ≥ 5 % | ≥ 8 % | ≥ 10 % | ≥ 12 % | ≥ 12 % |
| Aktívne montážne partie | 2 | 3 | 4 | 6 | 8+ |
| Interní + stabilní ľudia | 5–6 | 8–10 | 12–15 | 18–22 | 25–30 |

Míľniky: **1 M € v roku 2**, **5 M € v roku 5**. Rok 5 predpokladá kombináciu služieb, maloobchodu a veľkoobchodu a viacero produktových divízií.

---

## 6. KPI strom podľa pilierov

Ku každému KPI je uvedený zdroj dát a modul AdoneaTeam. Ak je zdroj označený **(chýba v appke)**, jeho meranie je zároveň požiadavkou na vývoj (viď BOOK 8).

### P1 – Dopyt a obchod

| KPI | Definícia | Rok 1 | Rok 3 | Rok 5 | Zdroj / modul |
|---|---|---|---|---|---|
| Kvalifikované leady / mesiac | leady posunuté do obchodného kroku | 120 | 350 | 700 | `crm_leads`, CRM |
| Cena za kvalifikovaný lead (CPQL) | marketingové výdavky / kvalif. leady | ≤ 45 € | ≤ 40 € | ≤ 35 € | `expenses` (marketing) / CRM **(prepojenie chýba)** |
| SLA prvého kontaktu | % leadov kontaktovaných v SLA | ≥ 90 % | ≥ 95 % | ≥ 97 % | `crm_leads` časy **(SLA výpočet chýba)** |
| Konverzia lead → objednávka | podiel pridelených leadov s objednávkou | ≥ 12 % | ≥ 16 % | ≥ 18 % | `crm_leads` → `projects` **(väzba chýba)** |
| Leady bez ďalšieho kroku | otvorené leady bez naplánovanej akcie | 0 | 0 | 0 | CRM (overdue logika existuje) |
| Priemerná hodnota zákazky | tržby / počet objednávok | rastie | rastie | rastie | `revenues`, `projects` |
| Pipeline value | súčet očakávaných hodnôt otvorených prípadov | sleduje sa | — | — | `crm_leads.quote_amount` |

### P2 – Realizácia a kvalita

| KPI | Definícia | Rok 1 | Rok 3 | Rok 5 | Zdroj / modul |
|---|---|---|---|---|---|
| Dodržanie termínu montáže | % montáží dokončených v pláne | ≥ 85 % | ≥ 92 % | ≥ 95 % | `installations` (status, dátumy) |
| Reklamácie | podiel z dokončených zákaziek | ≤ 3 % | ≤ 1,5 % | ≤ 1 % | **(modul reklamácií chýba)** |
| Protokol pri odovzdaní | % zákaziek s podpísaným protokolom | ≥ 90 % | ≥ 98 % | 100 % | `protocols` |
| Odchýlka plán vs. skutočnosť (marža zákazky) | rozdiel kalkulácie a reality | ≤ 8 % | ≤ 6 % | ≤ 5 % | `expenses`/`revenues` na `project_id` |
| Využitie kapacity partií | podiel produktívneho času | sleduje sa | ≥ 75 % | ≥ 80 % | `installations`, HR **(časť chýba)** |

### P3 – Financie a hotovosť

| KPI | Definícia | Rok 1 | Rok 3 | Rok 5 | Zdroj / modul |
|---|---|---|---|---|---|
| Hrubá marža | (tržby − priame náklady) / tržby | ≥ 30 % | ≥ 33 % | ≥ 35 % | CFO dashboard |
| Pohľadávky po splatnosti | podiel po splatnosti | ≤ 8 % | ≤ 5 % | ≤ 3 % | `expenses`/`revenues`, banka |
| Priemerná doba inkasa (DSO) | dni od faktúry po úhradu | ≤ 30 | ≤ 21 | ≤ 18 | `revenues` + banka **(časť chýba)** |
| Presnosť párovania banky | správne spárované transakcie | ≥ 85 % | ≥ 95 % | ≥ 97 % | `bank_transactions` (opraviť DPH) |
| Hotovostná rezerva | mesiace fixných nákladov | ≥ 1,5 | ≥ 2,5 | ≥ 3 | CFO **(forecast chýba)** |

### P4 – Zákazník a opakovaný obchod

| KPI | Definícia | Rok 1 | Rok 3 | Rok 5 | Zdroj / modul |
|---|---|---|---|---|---|
| Podiel opakovaných a odporúčaných zákaziek | z celkových objednávok | ≥ 10 % | ≥ 20 % | ≥ 30 % | `crm_leads` zdroj **(chýba tagging)** |
| Získané recenzie / referencie | počet ročne | 50 | 200 | 500 | **(chýba modul)** |
| Doba odozvy po objednávke | zákazník vie ďalší krok | do 1 dňa | do 1 dňa | do 4 h | customer care **(chýba)** |
| NPS / spokojnosť | prieskum po odovzdaní | zaviesť | ≥ 50 | ≥ 60 | **(chýba modul)** |

### P5 – Organizácia a systém

| KPI | Definícia | Rok 1 | Rok 3 | Rok 5 | Zdroj / modul |
|---|---|---|---|---|---|
| Obsadené kľúčové karty | z kariet fázy 1–3 | fáza 1 | fáza 1–2 | fáza 1–3 | Organization Engine **(chýba)** |
| Disciplína dát | audit prípadov s úplným stavom | ≥ 85 % | ≥ 95 % | ≥ 98 % | CRM/projekty |
| Podiel automatizovanej opakovanej práce | manuálne kroky nahradené | rastie | — | — | Edge Functions, automatizácie |
| Onboarding do samostatnosti | čas nového človeka po samostatnosť | zmerať | −20 % | −35 % | HR **(chýba modul)** |
| Pokrytie procesov L1/L2 | zdokumentované kritické procesy | 5 | 12 | 16 | BOOK 2/3 |

---

## 7. Ciele podľa horizontu

### Rok 1 (do polovice 2027) – Stabilizovať tok a merať pravdu

Téma: **žiadny zaplatený lead sa nestratí a systém hovorí pravdu.**

Ciele:

1. Zaviesť a merať SLA prvého kontaktu (P1, ≥ 90 %).
2. Zjednotiť CRM stavy a zaviesť štruktúrovaný dôvod straty.
3. Sprevádzkovať prevod lead → projekt v AdoneaTeam.
4. Uzavrieť rok nad ~550 000 € uhradených tržieb pri marži ≥ 30 %.
5. Oddeliť karty fázy 1 (POS-021, POS-022, dispečer, vedúci partie, fakturácia).

### Rok 2 (do polovice 2028) – Prekročiť 1 M € s riadenou maržou

Téma: **rast s kapacitou a hotovosťou.**

Ciele:

1. Obrat nad 1 000 000 € uhradených tržieb.
2. Tri montážne partie s jednotným štandardom kvality.
3. Reklamácie pod 2 %, DSO pod 25 dní.
4. Oddeliť vedúceho obchodu a marketing ownera (fáza 2).
5. Funkčný CFO forecast hotovosti v aplikácii.

### Rok 3 (do polovice 2029) – Stredná vrstva vlastníkov

Téma: **firma beží bez zakladateľa v každom rozhodnutí.**

Ciele:

1. Obrat ~2 000 000 €, EBIT ≥ 10 %.
2. Customer care a servisný koordinátor ako aktívne karty.
3. Produktový manažér pre hlavné rady, funkčný sklad zásob.
4. Data & reporting owner: jednotné definície KPI naprieč modulmi.

### Rok 4 (do polovice 2030) – Škálovať divízie

Téma: **viac divízií, jeden systém.**

Ciele:

1. Obrat ~3 300 000 €.
2. 6 montážnych partií, project manager pre väčšie zákazky.
3. B2B / Key Account rast (veľkoobchod fólií, správcovia budov, hotely).
4. Quality manager a asset/fleet owner ako samostatné karty.

### Rok 5 (do polovice 2031) – Prekročiť 5 M €

Téma: **riadená viac-divízna firma s digitálnym dvojčaťom.**

Ciele:

1. Obrat nad 5 000 000 €, marža ≥ 35 %.
2. Plnohodnotný COO a vedenie divízií.
3. Stabilný technologický squad pre AdoneaTeam.
4. Servisná báza z rekuperácií a techniky ako opakovaný výnos.

---

## 8. Riadiaci rytmus a vlastníctvo cieľov

| Rytmus | Kto | Čo sa vyhodnocuje |
|---|---|---|
| Týždenne | vedúci obchodu / CEO | SLA, leady bez kroku, follow-upy po termíne (P1) |
| Mesačne | CEO + CFO | tržby, marža, hotovosť, pohľadávky (P3), realizácia (P2) |
| Štvrťročne | CEO | pokrok na ročných cieľoch, spúšťače oddelenia kariet (P5) |
| Ročne | vlastník | revízia trajektórie, nová verzia dokumentu |

Každý pilier má vlastníka. Cieľ bez vlastníka je iba prianie (ADR-053).

---

## 9. Kľúčové riziká trajektórie

1. **Rast bez kapacity** – predaj prekročí realizáciu → sklzy a reklamácie. Poistka: dispečer a kontrola kapacity (P2).
2. **Rast bez marže** – obrat rastie, zisk nie. Poistka: marža ako North Star zložka (P3).
3. **Cash-flow pri importe a zásobách** – viazaná hotovosť. Poistka: forecast a hotovostná rezerva (P3).
4. **Dáta neodrážajú realitu** – KPI sú nedôveryhodné. Poistka: disciplína dát a digitálne dvojča (P5, ADR-062).
5. **Preťaženie zakladateľov** – firma závisí od Lukáša v každom rozhodnutí. Poistka: oddeľovanie kariet podľa spúšťačov (P5).

---

## 10. Väzba na AdoneaTeam

Väčšina KPI v tomto dokumente sa má merať v AdoneaTeam. Audit z júla 2026 (BOOK 8) ukázal, že časť meraní zatiaľ nie je v aplikácii dostupná. Preto stratégia priamo generuje vývojový backlog:

- SLA výpočet a prevod lead → projekt (P1),
- oprava bankového párovania na sumy s DPH (P3),
- forecast hotovosti (P3),
- modul reklamácií a spokojnosti zákazníka (P2, P4),
- Organization Engine pre karty pozícií (P5).

Presné priority a poradie sú v `BOOK-8-ADONEATEAM/01-ROADMAP-Z-OPERACNEHO-SYSTEMU.md`.

---

## 11. Otvorené rozhodnutia pred stavom Accepted

1. Potvrdiť cieľovú trajektóriu obratu po rokoch (alebo upraviť čísla podľa reálneho plánu).
2. Potvrdiť cieľovú hrubú maržu (návrh ≥ 30 % rastúca na ≥ 35 %).
3. Potvrdiť North Star ako trojicu tržby × marža × dodané záväzky.
4. Určiť vlastníkov jednotlivých pilierov P1–P5.
5. Potvrdiť míľnik 1 M € v roku 2 a 5 M € v roku 5 ako záväzné.
6. Schváliť, ktoré chýbajúce merania sa doplnia do aplikácie v roku 1.

---

## História zmien

| Verzia | Dátum | Zmena |
|---|---|---|
| 1.0 | 2026-07-19 | Prvý návrh cieľov a KPI na 1–5 rokov naviazaný na organizáciu a AdoneaTeam. |
