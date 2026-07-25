# Metodika modelov

Všetky modely sú deterministické čisté funkcie v `src/analytics/` — každé číslo
v aplikácii je reprodukovateľné zo zdrojového kódu a dát.

## 1. Základné metriky (`metrics.ts`)

- Rasty: `q/q`, `r/r`, kumulatívne 3r/5r/10r, CAGR.
- Volatilita: σ štvrťročných % zmien × √4 (anualizácia), v percentuálnych bodoch.
- Modelová hypotéka: byt 70 m², 80 % LTV, 30 rokov, aktuálna priemerná sadzba;
  anuita `M = P·i / (1 − (1+i)^−n)`.
- Dostupnosť: `(čistý príjem domácnosti × 0,40) / splátka` — 1,00 = strop DSTI.
- PTI: cena 70 m² / ročný čistý príjem domácnosti (1,6 zárobku, netto ≈ 78 % brutto).
- PTR: cena za m² / ročné nájomné za m².

## 2. Atribúcia faktorov (`drivers.ts`)

Cieľová premenná: r/r rast národnej ceny. Pre každý faktor:

1. transformácia (úroveň / r/r zmena / inverzia pre ponuku),
2. Pearsonova korelácia s cieľom pri lagu 0–4 kvartály → najsilnejšie |ρ| a lag,
3. skóre = štrukturálna váha × min(1, |ρ| + 0,15),
4. vplyv % = skóre / Σ skóre × 100.

Štrukturálne váhy (0,3–1,0) kódujú ekonomické priory — 40 kvartálnych pozorovaní
s kolineárnymi faktormi (ECB vs. hypotekárne sadzby vs. inflácia) neunesie čistú
regresnú identifikáciu. Ide o **atribučný odhad, nie kauzalitu**; smer vplyvu je
daný teóriou, spoľahlivosť kvalitou podkladovej série. Faktory bez kvantitatívnej
série (dôvera, regulácia) majú fixné kvalitatívne skóre s nízkou spoľahlivosťou.

## 3. Trhové cykly (`cycles.ts`)

Pravidlová klasifikácia z r/r rastu `g` a 2-kvartálneho momenta `Δg`:

| Fáza | Pravidlo |
| --- | --- |
| Korekcia | g < −0,5 % |
| Boom | g ≥ 10 % |
| Akcelerácia | g ≥ 3 % a Δg > 0,75 p. b. |
| Stagnácia | \|g\| < 2,5 % |
| Oživenie | inak (g ≥ 0 po dne) |

Pravdepodobnosti aktuálnej fázy: trojuholníkové jadrá okolo prahov normalizované
na 100 % — vyjadrujú vzdialenosť od prahov a šum ponukových cien, nie frekvenčnú
pravdepodobnosť.

## 4. Ocenenie trhu (`valuation.ts`)

Kompozitná odchýlka od fundamentu:

```
dev_PTI    = PTI_t    / mean(PTI 2016–2025)    − 1
dev_PTR    = PTR_t    / mean(PTR 2016–2025)    − 1
dev_burden = burden_t / mean(burden 2016–2025) − 1   (burden = splátka/čistý príjem)

composite  = 0,40·dev_PTI + 0,30·dev_PTR + 0,30·dev_burden   [%]
fair_value = cena_t / (1 + composite/100)
```

Pásma: < −5 % podhodnotený · −5…+10 % férový · > +10 % nadhodnotený.

Pravdepodobnosti (logistické mapovanie kompozitu, expertná kalibrácia — SR nemá
dosť historických korekcií na frekvenčnú kalibráciu):

```
P(bublina)  = σ((composite − 25)/8)
P(korekcia) = clip(0,15 + 0,55·σ((composite − 18)/7), 0,05, 0,85)
P(rast)     = clip(1 − P(korekcia) + 0,10, 0,10, 0,95)
```

Známa slabina: referenčný bod „dekádny priemer“ obsahuje boom aj korekciu;
NBS vlastné modely (širšie fundamenty) odhadovali nadhodnotenie na vrchole 2022
na ~25–35 % — náš kompozit je konzervatívnejší.

## 5. Prognostický model (`forecast.ts`)

Štvrťročný rast **nie je** extrapoláciou krivky:

```
g(t) = 0,45·momentum(t) + 0,40·fundamental(t) + 0,15·pull(t)

momentum(t)    = m₀ · momentumFactor_scénar · 0,7943^t        (polčas 3 kvartály)
                 m₀ = priemer posledných 2 q/q rastov
fundamental(t) = 0,8 + (F₀_scénar − 0,8) · decay_scénar^t     (%/q; 0,8 %/q ≈ 3,2 % p.a.)
pull(t)        = −10·reversion_scénar · gap(t)                 (ťah k fér hodnote)
gap(t+1)       = gap(t)·(1 − 4·reversion) + 0,15·(g(t) − 1,2)  (gap rastie, ak rast ≫ trend príjmov)
gap(0)         = composite z §4
```

Parametre scenárov (odôvodnenie v AI_REASONING.md):

| Parameter | Optimistický | Základný | Pesimistický |
| --- | --- | --- | --- |
| P (prior) | 25 % | 50 % | 25 % |
| F₀ (%/q) | 1,9 | 1,5 | −0,8 |
| decay | 0,96 | 0,93 | 0,90 |
| reversion | 0,004 | 0,009 | 0,020 |
| momentumFactor | 1,05 | 0,85 | 0,35 |
| uncertainty | 1,15 | 1,00 | 1,25 |

**Intervaly spoľahlivosti**: σ ročných zmien histórie (≈ 7–8 p. b.) škálovaná
√(h/4) × uncertainty × 0,55; pásmo ±1,28σ ≈ 80 % interval. Ide o aproximáciu
normality — skutočné chvosty realitných trhov sú ťažšie.

**Backtest**: zatiaľ nevykonaný (malá vzorka; navrhnutý v budúcich vylepšeniach) —
preto model deklarujeme ako scenárový nástroj, nie štatisticky validovaný prediktor.

## 6. Investičné skóre (`investment.ts`)

Subskóre normalizované naprieč 8 krajmi (min–max → 0–100):

- rast: 3-ročné momentum + kvalitatívna korekcia (katalyzátory, demografia),
- nájom: hrubý výnos (nájomné×12 / cena),
- likvidita: 0,7·podiel na ponuke + 0,3·populácia,
- riziko: 0,35·volatilita + 0,30·PTI + kvalitatívna korekcia (koncentrácia odvetví).

`total = 0,30·rast + 0,25·nájom + 0,20·likvidita + 0,25·(100 − riziko)`

Skóre je **relatívne poradie v rámci SR** — 80 neznamená „výborná investícia“,
znamená „lepšia než ostatné kraje podľa týchto kritérií“.

## 7. Rozhodovací asistent (`decision.ts`)

```
score = clip( 3·rast_base_12M − 1,8·max(0, composite − 5) + 40·(afford − 1) + 8, −100, 100 )
```

(+8 = plateau sadzieb po uvoľňovacom cykle). Prahy: >40 priaznivé · >10 skôr kúpiť ·
±10 neutrálne · <−10 skôr počkať · <−40 nepriaznivé. Odpoveď je vždy segmentovaná
podľa profilu kupujúceho (horizont, DSTI, región) — univerzálne „kúpte/nekupujte“
model zámerne neposkytuje.
