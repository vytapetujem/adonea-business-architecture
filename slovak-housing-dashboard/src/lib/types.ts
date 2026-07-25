/**
 * Core domain types. Every displayed number carries a provenance flag so the UI
 * can always distinguish measured history from computed metrics, estimates and forecasts.
 */

/** Data provenance classes — rendered as badges throughout the UI. */
export type Provenance =
  | 'measured' // published by an official source (NBS, ŠÚSR, ECB, Eurostat)
  | 'anchored' // compiled from official publications; endpoints verified against live sources
  | 'derived' // deterministically computed from measured/anchored series (growth, ratios…)
  | 'estimated' // model-based estimate calibrated to official anchors (see methodology)
  | 'forecast' // scenario projection of the forecast engine

export type RegionId = 'BA' | 'TT' | 'TN' | 'NR' | 'ZA' | 'BB' | 'PO' | 'KE'
export type GeoScope = 'SK' | RegionId

export type PropertyType = 'all' | 'flat' | 'house'

/** Quarter key, e.g. "2016-Q1". Ordered lexicographically within the same century. */
export type QuarterKey = string

export interface SeriesMeta {
  id: string
  label: string
  unit: string
  provenance: Provenance
  sourceIds: string[]
  /** free-text caveat displayed in tooltips / methodology */
  note?: string
}

export interface QuarterlySeries extends SeriesMeta {
  quarters: QuarterKey[]
  values: (number | null)[]
}

export interface DataSource {
  id: string
  name: string
  publisher: string
  url: string
  kind: 'official' | 'central-bank' | 'eu' | 'market'
  /** which parts of the dataset rely on it */
  usedFor: string
  vintage: string
}

export type EventCategory =
  | 'monetary'
  | 'regulation'
  | 'crisis'
  | 'demand'
  | 'supply'
  | 'policy'
  | 'investment'
  | 'market'

export interface MarketEvent {
  id: string
  title: string
  category: EventCategory
  /** first quarter affected */
  from: QuarterKey
  /** last quarter affected (inclusive); undefined = single-quarter / ongoing point event */
  to?: QuarterKey
  date: string // human-readable start date
  description: string
  /** estimated impact on national prices, scale −5 (strongly negative) … +5 (strongly positive) */
  impact: number
  /** analyst confidence that the impact assessment is correct, 0–1 */
  confidence: number
  /** regions where the effect concentrates; undefined = country-wide */
  regions?: RegionId[]
  provenance: Provenance
}

export interface RegionInfo {
  id: RegionId
  name: string
  shortName: string
  capital: string
  population: number // approx., ŠÚSR 2024
  /** share of national housing supply listings, approx (NBS commentary) */
  supplyShare: number
  /** SVG path in the 1000×480 schematic viewBox */
  path: string
  labelPos: [number, number]
}

export type CyclePhase = 'boom' | 'acceleration' | 'recovery' | 'stagnation' | 'correction'

export interface ScenarioPoint {
  quarter: QuarterKey
  value: number
  lo: number
  hi: number
}

export interface ForecastScenario {
  id: 'optimistic' | 'base' | 'pessimistic'
  label: string
  probability: number
  assumptions: string[]
  points: ScenarioPoint[]
}
