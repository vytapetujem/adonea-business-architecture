# SLA prvého kontaktu obchodného leadu

## Stav

**Proposed**

## Rozhodnutie

Adonea zavádza jednotné pravidlo pre rýchlosť prvého kontaktu nového leadu. Cieľom nie je naháňať obchodníka k bezhlavému telefonovaniu, ale chrániť hodnotu zaplateného dopytu a zabezpečiť, aby každý nový lead dostal včasný, zaznamenaný a zmysluplný prvý krok.

## Základné pravidlo

Každý nový lead musí byť priradený konkrétnemu vlastníkovi a musí dostať prvý kontakt v rámci definovaného SLA podľa času prijatia a priority.

## Pracovné hodiny

Štandardné pracovné okno pre SLA:

- pondelok až piatok,
- 08:00–17:00,
- štátne sviatky sa nepovažujú za pracovný deň,
- mimo pracovného okna sa SLA začne počítať od najbližšieho pracovného dňa o 08:00.

## Navrhované SLA

### Priorita P1 – horúci alebo urgentný lead

Použije sa, ak:

- zákazník výslovne žiada okamžitý termín,
- ide o havarijný alebo časovo kritický problém,
- lead pochádza z kampane alebo formulára označeného ako vysoký zámer,
- zákazník opakovane volal alebo sám požaduje spätný kontakt čo najskôr,
- ide o významnú B2B príležitosť alebo zákazku s vysokým potenciálom.

Pravidlo:

- prvý pokus o kontakt do 15 minút počas pracovných hodín,
- ak sa kontakt nepodarí, druhý pokus najneskôr do 60 minút,
- ak lead zostane bez kontaktu dve hodiny, vzniká eskalácia vedúcemu obchodu alebo určenému zástupcovi.

### Priorita P2 – štandardný nový lead

Použije sa pre bežné B2C a B2B dopyty bez urgentného signálu.

Pravidlo:

- prvý pokus o kontakt do 60 minút počas pracovných hodín,
- absolútne maximum je do konca pracovného dňa,
- lead prijatý po 16:00 musí dostať prvý pokus najneskôr nasledujúci pracovný deň do 09:00.

### Priorita P3 – nízka pripravenosť alebo informačný dopyt

Použije sa, ak:

- zákazník žiada iba všeobecné informácie,
- chýbajú základné kontaktné údaje,
- ide o obsahový alebo partnerský kontakt bez bezprostredného predajného zámeru,
- lead vyžaduje predbežné overenie relevantnosti.

Pravidlo:

- prvý kontakt do 4 pracovných hodín,
- najneskôr do konca nasledujúceho pracovného dňa.

## Čo sa považuje za prvý kontakt

Za splnenie SLA sa považuje iba reálny a zaznamenaný pokus o kontakt cez schválený kanál:

- telefonát,
- e-mail,
- SMS alebo WhatsApp správa,
- odpoveď cez iný schválený komunikačný kanál.

Samotné otvorenie leadu, pridelenie leadu alebo interná poznámka sa za prvý kontakt nepovažujú.

## Povinný výsledok prvého kontaktu

Po prvom kontakte musí byť v AdoneaTeam uložené:

- čas kontaktu,
- použitý kanál,
- výsledok kontaktu,
- aktuálny stav leadu,
- ďalší konkrétny krok,
- dátum a čas ďalšieho kroku,
- meno vlastníka leadu.

Lead nesmie zostať po kontakte bez ďalšieho kroku, pokiaľ nie je uzatvorený ako vyhratý, stratený, nerelevantný alebo duplicitný.

## Minimálny štandard pri nedostupnom zákazníkovi

Ak zákazník nedvíha telefón:

1. uskutoční sa telefonický pokus,
2. odošle sa krátka SMS alebo WhatsApp správa, ak je kanál dostupný a vhodný,
3. vytvorí sa ďalší pokus v kalendári alebo CRM,
4. zaznamená sa dôvod a výsledok kontaktu.

## Eskalačné pravidlá

Eskalácia vzniká, ak:

- P1 lead prekročí SLA o viac než 30 minút,
- P2 lead nemá prvý kontakt do konca pracovného dňa,
- lead zostane bez vlastníka viac než 15 minút počas pracovných hodín,
- obchodník má na konci dňa viac než 3 nové leady bez prvého kontaktu,
- systém zaznamená opakované prekročenie SLA tri pracovné dni v jednom týždni.

## KPI

Sledujú sa minimálne tieto ukazovatele:

- medián času do prvého kontaktu,
- percento leadov kontaktovaných v SLA,
- percento leadov bez priradeného vlastníka,
- počet prekročení SLA podľa obchodníka a zdroja leadu,
- konverzia podľa času prvého kontaktu,
- percento leadov s riadne nastaveným ďalším krokom.

## Cieľové hodnoty

Po stabilizácii procesu:

- aspoň 90 % P1 leadov kontaktovaných v SLA,
- aspoň 95 % P2 leadov kontaktovaných v SLA,
- 100 % leadov s prideleným vlastníkom,
- menej než 1 % leadov bez ďalšieho kroku,
- nulové nové leady bez kontaktu staršie než jeden pracovný deň.

## Dôvod rozhodnutia

Adonea získava významnú časť dopytu cez platený marketing. Každý nový lead preto predstavuje už vynaložené peniaze a obmedzenú časovú príležitosť. Čím dlhšie firma čaká, tým viac rastie pravdepodobnosť, že zákazník osloví konkurenciu, stratí záujem alebo nebude vedieť, kto mu má pomôcť.

Jednotné SLA zároveň zabraňuje tomu, aby sa výkon hodnotil iba podľa počtu telefonátov. Dôležitá je rýchlosť, kvalita záznamu, ďalší krok a konečný obchodný výsledok.

## Dopad na AdoneaTeam

Aplikácia musí vedieť:

- uložiť čas prijatia leadu,
- určiť prioritu P1, P2 alebo P3,
- vypočítať termín SLA podľa pracovných hodín,
- zobraziť odpočítavanie do prekročenia SLA,
- zvýrazniť lead blížiaci sa k prekročeniu,
- automaticky eskalovať lead po prekročení,
- vyžadovať výsledok kontaktu a ďalší krok,
- reportovať KPI podľa obchodníka, služby, kampane a regiónu,
- rozlišovať ručne a automaticky vytvorený kontakt,
- evidovať zástupcu počas neprítomnosti vlastníka.

## Otvorené rozhodnutia

Pred zmenou stavu na **Accepted** treba potvrdiť:

1. či pracovné hodiny 08:00–17:00 zodpovedajú reálnemu režimu obchodného tímu,
2. či má P1 SLA zostať 15 minút alebo byť 30 minút,
3. ktoré zdroje a typy zákaziek sa automaticky označia ako P1,
4. kto je prvý eskalačný vlastník,
5. či sa SMS alebo WhatsApp po nedostupnom telefonáte odošle automaticky alebo manuálne.
