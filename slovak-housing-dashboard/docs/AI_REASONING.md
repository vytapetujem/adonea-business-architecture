# AI reasoning — ako vznikali expertné odhady

Tento dokument zaznamenáva úvahy za všetkými „mäkkými” číslami (odhady vplyvov,
váhy, priory), aby boli auditovateľné a spochybniteľné.

## 1. Rekonštrukcia cenovej série

Séria musí súčasne sedieť na: 1 238 (2016-Q1), +11,3 % r/r (2025-Q2), +13,4 % r/r
(2025-Q3), +92 €/m² q/q (2025-Q4), 2 906 (2025-Q4), ročný rast 2025 ≈ +12 % a 2024
< +1 %, a „ceny 2025 nad vrcholom 2022“. Tieto podmienky determinujú 2024-Q2/Q3
(2 458/2 481 = spätný prepočet z overených r/r rastov) a silne zväzujú tvar
2022–2024: vrchol ~2 520 (2022-Q4), plytká korekcia ~−4,6 % do 2023-Q4, stagnácia
2024. Interpretačný konflikt: NBS „+12 % v 2025“ môže byť ročný priemer aj Q4/Q4 —
zvolili sme kalibráciu medzi oboma čítaniami (ročný priemer +11,8 %, Q4/Q4 +14,4 %)
a konflikt priznávame (tolerancia ±1–2 %).

## 2. Odhady vplyvov udalostí (−5…+5)

Zásady: (a) vplyv sa hodnotí na národné ceny počas trvania udalosti, (b) sila sa
opiera o pozorovanú zmenu trendu v dátach, (c) spoľahlivosť klesá, keď sa efekt
nedá oddeliť od súbežných faktorov.

- **ECB hiking 2022–23 = −5, spoľahlivosť 0,95**: jediný faktor s čistou
  identifikáciou — sadzby ↑ 3× → objem nových úverov −50 %, ceny z +25 % r/r do
  poklesu v 4 kvartáloch. Najsilnejší kauzálny signál dekády.
- **Pandemický boom = +5, 0,9**: kombinácia rekordných sadzieb, úspor a preferencií;
  r/r rast akceleroval z ~9 % na ~25 %.
- **Éra záporných sadzieb = +4, 0,9**: dlhé obdobie, konzistentný mechanizmus
  (lacnejúce hypotéky 2 % → 1 %), ale prelína sa s rastom miezd → nie +5.
- **COVID šok = −1, 0,9**: krátke zamrznutie bez cenového poklesu — malá veľkosť
  napriek istote o mechanizme.
- **Vojna/energie = −2, 0,7 a inflácia = −2, 0,75**: pôsobia najmä cez sadzby
  (už započítané v ECB evente) — nižšia samostatná váha aj spoľahlivosť
  (riziko dvojitého započítania priznané).
- **Volvo (KE) = +3 regionálne, 0,7**: v krajských dátach viditeľná akcelerácia KE
  po 2022-H2, ale kauzalita čiastočne zdieľaná s IT sektorom Košíc.
- **Limity NBS = −1, 0,8**: rast úverov sa spomalil merateľne, cenový efekt bol
  slabý (ceny ďalej rástli) → malá negatívna hodnota.

## 3. Štrukturálne váhy driverov

Korelácie na 40 pozorovaniach s kolineárnymi faktormi nedokážu rozdeliť zásluhy —
váhy preto kódujú mechanizmus: sadzby (1,0) a ECB (0,8) dostávajú najviac, lebo
zmena ceny financovania má priamy aritmetický dopad na kúpyschopnosť (pri 80 % LTV
zvýšenie sadzby o 3 p. b. zdvihne splátku ~35 %). Mzdy (0,85) sú pomalší, ale
trvalý mechanizmus. Ponuka (0,75) — deficit je štrukturálny a asymetrický (brzdí
poklesy viac, než ženie rasty). Dôvera (0,35) a regulácia (0,3) — reálne, ale slabo
merateľné; priznaná nízka spoľahlivosť.

## 4. Priory scenárov (25/50/25)

Symetrické priory okolo základného scenára; nie sú to trhovo implikované
pravdepodobnosti. Argumenty pre asymetriu existujú na obe strany (nadhodnotenie →
väčšie riziko poklesu; ponukový deficit → podpora rastu) a približne sa rušia.

## 5. Smerové pravdepodobnosti 12M (68/20/12)

Základ: scenárový vážený výsledok (base +4 %, opt +6 %, pess −2 %) + hmotnosť 80 %
intervalov pod/nad prahmi ±2 %. Zaokrúhlené a upravené o riziko napätého ocenenia
(pravdepodobnosť poklesu 12 % > hmotnosť pesimistického chvosta samotného, lebo
kompozit +11–14 % zvyšuje citlivosť na šok).

## 6. Kvalitatívne korekcie investičných skóre

Dokumentované per kraj v `investment.ts` (QUALITATIVE): napr. KE +4 rast (Volvo,
IT), −? riziko koncentrácie automotive +1; PO −3 rast (jediný klesajúci kraj
Q4 2025, emigrácia mladých), +5 riziko. Korekcie sú v rozsahu ±5 bodov subskóre —
nikdy neprevažujú dátovú zložku, iba ju dolaďujú.
