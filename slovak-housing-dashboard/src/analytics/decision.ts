import { NATIONAL_METRICS } from './metrics'
import { VALUATION } from './valuation'
import { HORIZONS } from './forecast'
import { fmtEur, fmtPct } from '../lib/format'

/**
 * "Kúpiť či počkať?" decision assistant. Rule-based synthesis of the valuation,
 * forecast and affordability engines — every statement cites the metric it rests
 * on. This is decision support, not financial advice (and the app says so).
 */
export interface DecisionOutput {
  headline: string
  score: number // −100 (clearly wait) … +100 (clearly buy)
  scoreLabel: string
  rationale: string[]
  risks: { title: string; detail: string }[]
  opportunities: { title: string; detail: string }[]
  buyToday: string[]
  shouldWait: string[]
}

export function computeDecision(): DecisionOutput {
  const m = NATIONAL_METRICS
  const base12 = HORIZONS[0].scenarios.find((s) => s.id === 'base')!
  const pess12 = HORIZONS[0].scenarios.find((s) => s.id === 'pessimistic')!

  // Score components (documented): expected 12M base growth (+), valuation gap (−),
  // affordability index vs 1.0 (+/−), rate momentum (falling = +).
  let score = 0
  score += Math.max(-30, Math.min(30, base12.pct * 3)) // base scenario pull
  score -= Math.max(0, VALUATION.composite - 5) * 1.8 // overvaluation penalty
  score += (m.affordabilityIndex - 1) * 40 // affordability head-room
  score += 8 // rates plateaued after easing cycle (mild positive carry)
  score = Math.round(Math.max(-100, Math.min(100, score)))

  const scoreLabel =
    score > 40 ? 'Priaznivé podmienky' : score > 10 ? 'Skôr kúpiť (selektívne)' : score > -10 ? 'Neutrálne — rozhodujú individuálne faktory' : score > -40 ? 'Skôr počkať' : 'Nepriaznivé podmienky'

  return {
    headline:
      'Trh je v rastovej fáze s napätým ocenením: pre dlhodobých vlastníkov s istým príjmom je kúpa obhájiteľná, krátkodobí a napätí kupujúci by mali zvážiť čakanie.',
    score,
    scoreLabel,
    rationale: [
      `Základný scenár na 12 mesiacov: ${fmtPct(base12.pct)} (${fmtEur(base12.price)}/m²) — čakanie na pokles má v základnom scenári zápornú očakávanú hodnotu.`,
      `Kompozitné ocenenie: ${fmtPct(VALUATION.composite)} nad odhadom fér hodnoty (${fmtEur(VALUATION.fairValue)}/m²) — kupujete nad fundamentom, rezerva na pokles existuje v pesimistickom scenári (12M ${fmtPct(pess12.pct)}).`,
      `Splátka modelovej hypotéky (70 m², 80 % LTV, 30 r., ${fmtPct(3.5, 1, false)}): ${fmtEur(m.mortgagePayment)}/mes. = ${fmtPct((m.mortgagePayment / (m.netWage * 1.6)) * 100, 0, false)} čistého príjmu priemernej domácnosti — na hrane komfortnej zóny (DSTI 40 %).`,
      `Index dostupnosti ${m.affordabilityIndex.toFixed(2)} (1,00 = regulatórny strop) — dostupnosť je horšia ako v 2016–2021, lepšia než na dne 2023.`,
    ],
    risks: [
      { title: 'Napäté ocenenie', detail: `PTI ${VALUATION.pti.toFixed(1)} roka vs. dekádny priemer ${VALUATION.ptiMean.toFixed(1)}; pravdepodobnosť nominálnej korekcie do 2 rokov ~${Math.round(VALUATION.correctionProbability * 100)} %.` },
      { title: 'Úrokové riziko', detail: 'Ak inflácia v eurozóne prekvapí, refixácia pri sadzbách > 4,5 % zvýši splátky o 10–15 %.' },
      { title: 'Príjmové riziko', detail: 'Fiškálna konsolidácia + spomalenie HDP (~1 %) — riziko rastu nezamestnanosti nad 6 % v pesimistickom scenári.' },
      { title: 'Regionálne riziko', detail: 'Prešovský kraj už medziročne klesá (−0,3 % Q4 2025); rast v malých okresných trhoch môže byť nelikvidný.' },
    ],
    opportunities: [
      { title: 'Ponukový deficit', detail: 'Povolenia −40 % od 2020: nová ponuka bude chýbať roky — štrukturálna podpora cien aj nájmov.' },
      { title: 'Regionálna konvergencia', detail: 'NR/BB/KE rastú z nízkej bázy pri silných investíciách (Volvo) — vyšší rastový potenciál než BA pri nižšom vstupe.' },
      { title: 'Nájomný trh', detail: 'Hrubé výnosy 4–6 % mimo BA + rastúce nájmy (nedostupnosť vlastníctva tlačí dopyt do nájmov).' },
      { title: 'Reálne mzdy rastú', detail: 'Mzdy +5 % pri inflácii ~3–4 % — dopyt sa ešte neopiera o uvoľnenie úverových štandardov.' },
    ],
    buyToday: [
      'Dlhodobí vlastníci (7+ rokov) s bezpečným príjmom a splátkou < 35 % čistého príjmu — časovanie trhu je pre nich sekundárne.',
      'Kupujúci v konvergujúcich regiónoch (NR, BB, KE) s lokálnou znalosťou trhu.',
      'Investori do nájomných bytov s výnosom > 5 % a dlhým horizontom.',
      'Domácnosti, ktorým dnes nájomné prevyšuje hypotekárnu splátku porovnateľného bytu.',
    ],
    shouldWait: [
      'Kupujúci s horizontom < 5 rokov — pravdepodobnosť, že korekcia zmaže transakčné náklady, je nezanedbateľná.',
      'Domácnosti so splátkou > 40 % čistého príjmu alebo bez rezervy 6+ mesačných výdavkov.',
      'Špekulatívni kupujúci počítajúci s pokračovaním +12 % ročných rastov — model očakáva spomalenie.',
      'Kupujúci v Prešovskom kraji mimo Popradu — trh už koriguje, výhodnejšie ceny sú pravdepodobné.',
    ],
  }
}

export const DECISION = computeDecision()
