# Matematické predpoklady

Všetky číselné predpoklady modelov na jednom mieste (zdroj: `src/analytics/*`, `src/data/*`).

## Domácnosť a hypotéka (dostupnosť, PTI, ocenenie)

| Predpoklad | Hodnota | Odôvodnenie |
| --- | --- | --- |
| Referenčný byt | 70 m² | typický 3-izbový byt v SR |
| LTV | 80 % | limit NBS pre väčšinu nových úverov |
| Splatnosť | 30 rokov | dominantná splatnosť nových hypoték |
| Zárobky domácnosti | 1,6× priemerná mzda | mix 1- a 2-príjmových domácností |
| Čistá / hrubá mzda | 78 % | aproximácia odvodov a dane pri priemernej mzde |
| DSTI strop | 40 % | konzervatívny komfortný limit (regulácia pripúšťa 60 % s výnimkami) |

## Ocenenie (váhy kompozitu)

PTI 40 % · PTR 30 % · hypotekárna záťaž 30 %. Referenčný bod = priemer 2016–2025.
Pásma: <−5 % / −5…+10 % / >+10 %.

## Prognóza

Váhy zložiek: momentum 0,45 · fundament 0,40 · valuačný ťah 0,15.
Polčas momenta 3 kvartály. Dlhodobý nominálny trend 0,8 %/q (≈3,2 % p. a. —
pod očakávaným rastom miezd ~5 %, t. j. predpokladáme postupné zlepšovanie
dostupnosti v dlhom horizonte). Interval ±1,28σ ≈ 80 %.
Priory scenárov 25/50/25 %.

## Regionálne kalibrácie

Relatívne úrovne krajov (2016 → 2025, podiel národnej ceny):
BA 1,42→1,40 (+dynamické korekcie) · TT 0,76→0,75 · TN 0,60→0,63 · NR 0,52→0,60 ·
ZA 0,72→0,76 · BB 0,62→0,68 · PO 0,70→0,72 (−6 p. b. drift 2025) · KE 0,84→0,86 (+Volvo drift).
Mzdové pomery krajov (podiel národnej mzdy): BA 1,27 · TT 0,90 · TN 0,88 · NR 0,85 ·
ZA 0,90 · BB 0,85 · PO 0,78 · KE 0,90.

## Nájomné

Národný priemer 2025: 9,2 €/m²/mes.; BA 12,5; KE 9,5; ostatné 7,5–8,5.
Index vývoja 2016=1,00 → 2025=1,72 (skok 2022–23 +28 % — utečenecká vlna + presun
dopytu z kúpy do nájmu). Trieda: AI odhad ±10–15 %.

## Rasty udalostí (timeline)

Škála vplyvu −5…+5 = expertný odhad príspevku k cenovému trendu počas trvania
udalosti; spoľahlivosť 0,4–0,95 podľa sily evidencie (pozri AI_REASONING.md).
