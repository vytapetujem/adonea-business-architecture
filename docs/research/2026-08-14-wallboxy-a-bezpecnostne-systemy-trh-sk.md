# Prieskum trhu: Wallboxy a bezpečnostné systémy na Slovensku

**Dátum:** 14. 8. 2026 · **Stav:** návrh na review · **Účel:** podklad pre rozhodnutie o vstupe Adonea do dvoch nových oblastí — nabíjacie stanice pre elektromobily (wallboxy) a bezpečnostné systémy (alarmy, kamery, videovrátniky)

> Metodická poznámka: Správa vznikla syntézou webového prieskumu slovenských a českých zdrojov (august 2026). Veľkoobchodné ceny a dealerské rabaty nie sú verejné — kde sú uvedené, ide o kvalifikované odhady označené ako odhad. Ceny s DPH 23 %, pokiaľ nie je uvedené inak. Zdrojové URL sú uvedené pri kapitolách v pôvodných podkladoch; kľúčové zdroje sú zhrnuté na konci.

---

## 1. Zhrnutie pre rozhodovanie

| Ukazovateľ | Wallboxy | Bezpečnostné systémy |
|---|---|---|
| Vstupná bariéra | **žiadna** — elektrikár s osvedčením stačí | **licencia na technickú službu** (zákon 473/2005 Z. z.): ~120 € poplatky, ~30 dní, bez skúšky |
| Typická zákazka (RD) | 1 100–2 200 € komplet | alarm 800–2 500 €; kamery 4 ks 950–1 200 €; videovrátnik 500–900 € |
| Hrubá marža na zákazke | ~300–700 € (40–50 %) | ~35–45 % + marža na materiáli 200–300 € |
| Prácnosť | pol dňa (2,5–5 h) | bezdrôtový alarm 1 deň; kamery 3–8 h |
| Opakovaný príjem | servisný paušál 5–10 €/mes., správa firemných staníc | **PCO monitoring ~15–30 €/mes. + servisné zmluvy 40–120 €/rok** |
| Rast trhu | BEV park +50 %/rok; ~5 000–9 000 inštalácií/rok | stabilný; ťahaný požiadavkami poisťovní a novostavbami |
| Synergia s Adonea | elektrikári, klímy (rovnaké zručnosti), FV budúcnosť | slaboprúdová predpríprava pri elektroinštaláciách takmer zadarmo |

**Odporúčaná sekvencia:** wallboxy spustiť okamžite (nulová bariéra, poldňové zákazky s maržou 300–700 €); pri bezpečnostných systémoch okamžite podať žiadosť o licenciu (kritická cesta ~1–2 mesiace) a súbežne spraviť certifikácie Jablotron + Ajax, prvé montáže na vlastných elektro zákazkách.

---

# ČASŤ A: WALLBOXY (nabíjacie stanice pre elektromobily)

## A1. Trh a dopyt

- Vozový park BEV: 15 476 (koniec 2024) → 21 833 (Q3 2025) → cez 29 000 (Q1 2026); rast ~50 %/rok aj bez štátnej podpory. Nové registrácie 2025: rekordných 11 525 BEV; až 62 % EV je individuálny dovoz (jazdené Tesly).
- Prognóza SEVA: ~150 000 EV do 2030. **80 % nabíjaní prebieha doma alebo v práci.**
- Odvodený trh inštalácií: **~5 000–9 000 AC wallboxov ročne (2026)**, rast na 15–25 tis./rok do 2030; pri hodnote zákazky 1 100–2 200 € trh inštalácií rádovo 10–20 mil. €/rok. (Vlastný odhad — oficiálna štatistika neexistuje.)
- Trh je fragmentovaný: energetiky (ZSE Drive, GreenWay), SK výrobcovia (ejoin Žilina, AgeVolt, ANTIK), e-shopy s montážou a lokálni elektrikári. **Nikto nemá dominanciu v inštaláciách RD.**

## A2. Hardvér: značky a MOC ceny

| Segment | Značky | MOC (11–22 kW AC) |
|---|---|---|
| Low-end | no-name/čínske, Lidl Ultimate Speed | 300–450 € |
| Mainstream smart | go-e (715–749 €), Webasto (503–860 €), **ejoin HomeBox 590 €** (SK výrobca), Zaptec (od 629 €), Schneider Charge (673 €), Teltonika | 500–900 € |
| Prémium | Wallbox Pulsar Plus (od 955 €), Easee, Etrel/GreenWay, Alfen/ZSE | 900–1 200 €+ |

- VOC kanál: Hagard (samostatná kategória), Sonepar, BUČO, IMAO; partnerské rabaty odhadom **10–25 % pod MOC**, viac pri projektových množstvách. SolaX čisto partnerský cenník. Formálne „installer programy" ako v Nemecku na SK zatiaľ nie sú rozvinuté → nízka bariéra pre elektro firmu dohodnúť si VO ceny priamo u 2–3 značiek.
- Odporúčaný mix: ejoin (lacný SK brand, výrobca v Žiline) + go-e/Webasto (mainstream) + Wallbox/Etrel (prémium).

## A3. Technika a legislatíva

- **Samostatný okruh povinný** (STN 33 2000-7-722): 11 kW = 3×16 A, CYKY-J 5×2,5–4; 22 kW = 3×32 A, CYKY-J 5×6 (dlhé trasy 5×10).
- **Prúdový chránič:** RCD ≤30 mA; ak wallbox nemá vstavanú 6 mA DC detekciu (RDC-DD), treba **RCD typ B za ~150–250 €**. Väčšina moderných wallboxov (ejoin, Alfen, AgeVolt) detekciu má → stačí typ A (~25–50 €). Rozdiel ~150–200 € v materiáli — kľúčové pre cenotvorbu.
- **Rezervovaná kapacita:** bežný dom má istič 3×25 A — 11 kW často prejde len s dynamickým riadením záťaže, 22 kW takmer nikdy bez navýšenia. Navýšenie ističa: ~10,3 €/A/fáza bez DPH (napr. 3×25→3×32 A ≈ 200–270 €); od 1.7.2025 sa ale mesačné fixné platby počítajú z ističa (+10 A/3f ≈ +45 €/rok) → **predajný argument: load management namiesto navýšenia šetrí trvalé náklady a my predáme drahšiu smart inštaláciu.**
- Nabíjacia stanica sa **musí uviesť v žiadosti o pripojenie** distribučke (zákon 251/2012).
- Montáž: elektrotechnik §21–23 (máme); **revízna správa povinná** pred uvedením do prevádzky (100–150 € byt/okruh) — bez nej neplatí záruka a poisťovňa kráti plnenie.
- **Tarify:** oficiálna EV sadzba neexistuje; ZSE **D3 Aktiv** (od 1.1.2026) — nárok vzniká už inštaláciou wallboxu; ZSE Drive „domáca tarifa" až **0,092 €/kWh** pri smart wallboxe. **Naša montáž zákazníkovi odomkne lacnú tarifu — wallbox „sa zaplatí sám".**
- **Bytové domy:** novela zákona 182/1993 Z. z. (od 1.1.2025) — vlastník má právo na hlasovanie o nabíjacom bode, súhlas = nadpolovičná väčšina všetkých vlastníkov, náklady znáša žiadateľ. Ceny 1 200–2 500 €/bod, konkurencia riedka → najzaujímavejší otvorený segment.
- Dotácie: pre domácnosti žiadne (ČR má 15 000 Kč — SK predaj stojí na úspore tarify); pre firmy výzvy z Plánu obnovy na verejne prístupné stanice (24 mil. € + 2 mil. €) → subdodávky montáží. BEV v odpisovej skupine 0 (2 roky) ženie firemný dopyt.

## A4. Ekonomika zákazky (štandard RD, 11 kW, 15 m trasa)

| Položka | Náklad |
|---|---|
| Kábel CYKY-J 5×4, 15 m | ~45 € |
| Istič + RCD typ A + SPD + drobný materiál | ~120–180 € |
| Práca 2 technici × 3–5 h (interné) | ~120–200 € |
| Revízna správa | 80–150 € |
| **Náklady spolu** | **~370–570 €** |
| **Fakturácia zákazníkovi (montáž bez hardvéru)** | **700–1 000 €** |
| **Hrubá marža** | **~300–450 €/zákazka (40–50 %)** + marža na hardvéri (10–25 % z VOC) |

- Benchmark ZSE Drive: obhliadka 199 €, základná inštalácia 449 € (do 3 m!), prevádzková služba 9 €/mes. Trhové balíky na kľúč 1 100–2 200 €.
- ČR benchmark: celá zákazka RD typicky 1 200–1 600 €; kábel položený 4–8 €/m.
- **Cenotvorba:** fixné balíky (ŠTART do 10 m / KOMFORT do 25 m / INDIVIDUÁL po obhliadke) fungujú lepšie ako hodinovka; obhliadku započítať do ceny pri objednávke.
- Kapacita: 1–2 inštalácie/deň/dvojica.

## A5. Riziká

- Lacné čínske boxy: chybné OCPP, mŕtvy firmvér → servis na naše náklady; držať sa 2–3 overených značiek.
- Dynamický load management = najčastejší zdroj reklamácií (CT kliešte, WiFi v garáži) — kalkulovať +1–2 h na konfiguráciu.
- Neuvedenie nabíjačky distribučke, poddimenzovaný istič → vypadávanie a reklamácie.
- Wallbox „kúpený z internetu" zákazníkom — zmluvne oddeliť zodpovednosť za zariadenie vs. inštaláciu.

---

# ČASŤ B: BEZPEČNOSTNÉ SYSTÉMY (alarmy/EZS, kamery, videovrátniky)

## B1. Kľúčová vstupná bariéra: licencia na technickú službu

- **Zákon č. 473/2005 Z. z. o súkromnej bezpečnosti (§7):** projektovanie, montáž, údržba a revízie zabezpečovacích/poplachových systémov a zariadení umožňujúcich sledovanie osôb = viazaná činnosť. **Platí pre alarmy AJ kamery AJ videovrátniky s kamerou.** Bežný elektrikár montujúci kamery formálne licenciu potrebuje; samotná kabeláž/predpríprava pod elektro živnosťou licenciu nevyžaduje.
- **Proces:** žiadosť osobne na Krajskom riaditeľstve PZ; poplatky **70 € žiadosť + 50 € vydanie**; lehota **30 dní**; platnosť **10 rokov**.
- **Podmienky:** vek 21+, bezúhonnosť, spoľahlivosť, odborná spôsobilosť **dokladom o vzdelaní + praxou** — **skúška typu S sa NEvyžaduje** (tá je len pre strážne/detektívne služby). Elektro vzdelanie + prax štatutára presne sedí.
- **Sankcie bez licencie:** pokuta 331–33 193 € (pri niektorých skutkoch až 66 387 €) + riziko trestného činu neoprávneného podnikania. Riziko nesie aj objednávateľ — licencia sa vyžaduje pri verejnom obstarávaní aj poistných udalostiach.
- Povinnosti držiteľa: písomná zmluva o poskytovaní technickej služby s klientom, evidencie, mlčanlivosť.

## B2. Značky a distribúcia

**Alarmy:** Jablotron (JA-100+, dominantný, predáva len cez certifikovaných partnerov), Ajax (najrýchlejšie rastúci, bezdrôtový, dizajnový), Satel (drôtové, projekty), Paradox (distribútor Eurosat), DSC; budget EVOLVEO/čínske GSM sety (nezaujímavé).

**Kamery:** Hikvision (+HiWatch) a Dahua (distribútor TSS Group Dubnica) — masový štandard; TP-Link VIGI/Tapo rastie; Reolink (DIY); Ubiquiti UniFi (prémium bez cloud poplatkov).

**Videovrátniky:** 2N (SK/CZ prémium), Hikvision/Dahua sety (najčastejšie montované), consumer zvončeky (Ring, EZVIZ, 50–180 €).

**Distribútori pre montážne firmy:** Eurosat SK Plus (Paradox, B2B e-shop), TSS Group (Dahua), ADI Global/Resideo (DSC, Honeywell), Jablotron Slovakia (len partneri). Dealerské zľavy odhadom **20–40 % z MOC** (Hikvision/Dahua skôr 30–40 %, Jablotron/Ajax 20–30 %) — overiť registráciou.

**Partnerské programy:** Jablotron Akadémia — certifikačné školenie (podmienka montáže, certifikát 2 roky, prístup k VO cenám, leady, predĺžená 5-ročná záruka pre klientov); Ajax Academy — online zdarma, partner portál.

## B3. Ceny (MOC materiál a komplet s montážou)

| Produkt | Materiál (MOC) | Komplet s montážou |
|---|---|---|
| Alarm byt/menší dom (Ajax StarterKit ~490 €) | 500–800 € | **od ~499 €; bežne 800–1 200 €** |
| Alarm rodinný dom (Jablotron/Ajax, 6–8 snímačov) | 1 000–1 300 € | **800–2 500 €** (priemer ~1 250 €) |
| Kamerový systém 4× IP + NVR + HDD | 400–700 € | **950–1 200 €** |
| Videovrátnik RD (Hikvision/Dahua set 358–551 €) | 358–551 € | **500–900 €** (2N prémium 1 200 €+) |
| Videovrátnik bytovka | — | od ~120 €/byt |

- Práca: montáž kamier 35–65 €/ks; kabeláž 0,75–2,85 €/m; alarm na predprípravu 450–750 €, po povrchu 630–1 050 €.
- Bezdrôt (Ajax, JA-100 wireless) = materiál +20–30 %, ale montáž za 1 deň bez sekania → ideál pre retrofity. Drôt pri novostavbách, kde už aj tak ťaháme káble.
- Časy: bezdrôtový alarm RD 4–6 h; kamery RD 3–8 h; videovrátnik RD pol dňa; bytovka 1–2 dni.

## B4. Opakované príjmy (najcennejšia časť biznisu)

- **PCO monitoring:** retail od ~15 €/mes. (RD/byt), firemné 20–60 €/mes.; pripojenie ~200 € jednorazovo. Montážna firma bez licencie na strážnu službu nemôže prevádzkovať vlastný pult — štandard je **provízny model s partnerskou SBS** (Jablotron má vlastné bezpečnostné centrum s províziami pre partnerov).
- **Servisné zmluvy:** 40–120 €/rok (ročná prehliadka, batérie, prednostný výjazd); pri poistných zmluvách je funkčná EZS s revíziou podmienkou plnenia → prirodzený recurring.
- Jablotron bezpečnostná SIM 3,59 €/mes.; Ajax appka + PRO Desktop zdarma (výhoda pri predaji).
- Celkový recurring potenciál ~20–35 €/mes./objekt.

## B5. Dopyt a predajné argumenty

- ~4 100 krádeží vlámaním ročne v SR, škody ~10 mil. €/rok; letná špička.
- **Poisťovne viažu limity plnenia na úroveň zabezpečenia:** nad ~30 000 € obsahu vyžadujú EZS, pri najvyšších sumách EZS + PCO; nefunkčný/nedeklarovaný systém = krátenie plnenia. **Alarm s revíziou = plné poistné plnenie** — najsilnejší predajný argument.
- Normy: STN EN 50131, RD štandardne Grade 2; revízia min. 1× ročne.
- GDPR pri kamerách: domáca výnimka len ak kamera nesníma verejný priestor/susedov; firmy a bytovky = označenie, dokumentácia, retencia štandardne 72 h; bytovka potrebuje súhlas nadpolovičnej väčšiny vlastníkov. **„GDPR balík" (dokumentácia + označenie) sa predáva ako doplnková služba.**
- Novostavby = drôtová predpríprava pri hrubej stavbe — pre firmu, ktorá už robí elektroinštalácie, takmer nulový akvizičný náklad.

## B6. Vstupná cesta pre Adonea (sekvencia)

1. **Mesiac 0–1:** podať žiadosť o licenciu na technickú službu na KR PZ (120 €, doklady o elektro vzdelaní a praxi štatutára). Kritická cesta — začať hneď.
2. **Súbežne:** certifikácia Jablotron (2-dňové školenie) + Ajax Academy online (zdarma).
3. **Mesiac 2–3:** prvé montáže na vlastných elektro zákazkách; vzorová zmluva o technickej službe + GDPR dokumentácia.
4. **Mesiac 3–6:** partnerstvo s PCO/SBS na provízny monitoring; servisné zmluvy.
5. **Do získania licencie:** legálne robiť len kabeláž/prípravu; nefakturovať montáž bezpečnostných systémov vo vlastnom mene.

Vstupné náklady spolu: ~120 € licencia + 0–200 € školenia + demo vzorky ~500–1 500 €. Bariéra je finančne nízka, časovo ~1–2 mesiace.

---

## 2. Porovnanie a odporúčanie

| Kritérium | Wallboxy | Bezpečnostné systémy |
|---|---|---|
| Čas do prvej zákazky | **ihneď** | ~1–2 mesiace (licencia) |
| Marža na zákazke | 300–700 € | 300–600 € + recurring |
| Dlhodobá hodnota zákazníka | stredná (servis, FV upsell) | **vysoká (PCO + servis roky)** |
| Konkurencia | fragmentovaná, rastúci trh | etablovaná, ale synergia s elektrom je výhoda |
| Riziko | technologické (OCPP, load mgmt) | regulačné (licencia, GDPR) — zvládnuteľné |

**Odporúčanie:** robiť obe, v rôznom tempe. Wallboxy spustiť do mesiaca (VO účty u 2–3 značiek + fixné balíky + pilot na 3–5 zákazkách); segment bytoviek si nechať ako druhú vlnu — je najmenej obsadený a novela 182/1993 otvorila dopyt. Pri bezpečnostných systémoch okamžite podať žiadosť o licenciu a spraviť certifikácie — prvé alarmy a kamery montovať na zákazkách, kde už robíme elektro, a od prvej inštalácie viazať servisnú zmluvu a PCO províziu.

## 3. Limity prieskumu

- VOC rabaty (wallboxy 10–25 %, bezpečnostné systémy 20–40 %) sú odhady — presné čísla vyžadujú registráciu u distribútorov (Hagard, Eurosat SK, TSS Group, Jablotron, Ajax).
- Ceny montáží sú trhové rozpätia z cenníkov a dopytových platforiem, nie záväzné ponuky; Bratislava +15–30 %.
- Odhad počtu inštalácií wallboxov je odvodený z registrácií BEV — oficiálna štatistika neexistuje.
- Hraničný prípad videovrátnika bez kamery (či vyžaduje licenciu) odporúčame overiť písomným dopytom na Úrad súkromných bezpečnostných služieb Prezídia PZ.

## 4. Kľúčové zdroje

Wallboxy: zsdis.sk (E-mobilita, pripojovacie poplatky), ssd.sk/vsds.sk (cenníky pripojenia), zse.sk + zsedrive.sk (cenníky, D3 Aktiv), mojelektromobil.sk, seva.sk, voltarea.sk, ejoin.sk, charging-market.sk, heureka.sk, hagard.sk, buco.sk, podnikajte.sk (dotácie, odpisy), uremeselnika.sk, wilio.sk, wattbox.cz/schlieger.cz (ČR benchmark), spravcabudov.sk (novela 182/1993).

Bezpečnostné systémy: slov-lex.sk (473/2005), minv.sk (žiadosti, FAQ), ity.sk, secmont.sk, jablotron.com/sk + skolenia.jablotron.sk, ajax.systems, axsystems.sk, eurosat.sk, tssgroup.sk, vipelektro.sk, standberg.sk, eltrox.sk, wilio.sk, daibau.sk, kasprofsecurity.sk, ochranaobjektov.sk, finsider.sk (poistné podmienky), aksamec.sk/securiapro.sk (GDPR), minv.sk (štatistika kriminality).
