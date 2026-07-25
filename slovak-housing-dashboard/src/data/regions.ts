import type { RegionInfo, RegionId } from '../lib/types'

/**
 * Schematic geometry of the 8 Slovak kraje in a 1000×480 viewBox.
 * Boundaries are simplified (hand-digitised approximation of the real shapes) —
 * they are for visual orientation only and are NOT survey-accurate.
 * Population: ŠÚSR, approx. 2024. supplyShare: approximate share of national
 * housing listings (NBS commentary; BA verified at 30 % in 2025).
 */
const P = (pts: [number, number][]) => 'M' + pts.map(([x, y]) => `${x},${y}`).join(' L') + ' Z'

export const REGIONS: RegionInfo[] = [
  {
    id: 'BA',
    name: 'Bratislavský kraj',
    shortName: 'Bratislavský',
    capital: 'Bratislava',
    population: 742000,
    supplyShare: 0.3,
    path: P([
      [25, 420], [10, 388], [20, 338], [38, 298], [52, 268], [78, 264], [100, 288],
      [114, 320], [117, 354], [108, 390], [114, 428], [120, 448], [60, 432],
    ]),
    labelPos: [63, 350],
  },
  {
    id: 'TT',
    name: 'Trnavský kraj',
    shortName: 'Trnavský',
    capital: 'Trnava',
    population: 566000,
    supplyShare: 0.09,
    path: P([
      [52, 268], [60, 225], [66, 198], [85, 182], [112, 212], [140, 236], [168, 254],
      [175, 258], [186, 290], [194, 326], [200, 360], [196, 400], [192, 440], [178, 470],
      [120, 448], [114, 428], [108, 390], [117, 354], [114, 320], [100, 288], [78, 264],
    ]),
    labelPos: [150, 330],
  },
  {
    id: 'TN',
    name: 'Trenčiansky kraj',
    shortName: 'Trenčiansky',
    capital: 'Trenčín',
    population: 582000,
    supplyShare: 0.07,
    path: P([
      [85, 182], [120, 148], [182, 118], [228, 94], [252, 112], [272, 142], [288, 170],
      [300, 190], [318, 200], [322, 224], [312, 244], [300, 254], [262, 258], [224, 258],
      [198, 256], [175, 258], [168, 254], [140, 236], [112, 212],
    ]),
    labelPos: [215, 190],
  },
  {
    id: 'NR',
    name: 'Nitriansky kraj',
    shortName: 'Nitriansky',
    capital: 'Nitra',
    population: 671000,
    supplyShare: 0.1,
    path: P([
      [175, 258], [198, 256], [224, 258], [262, 258], [300, 254], [318, 270], [332, 300],
      [342, 338], [352, 372], [368, 408], [330, 472], [282, 481], [226, 483], [178, 470],
      [192, 440], [196, 400], [200, 360], [194, 326], [186, 290],
    ]),
    labelPos: [265, 360],
  },
  {
    id: 'ZA',
    name: 'Žilinský kraj',
    shortName: 'Žilinský',
    capital: 'Žilina',
    population: 691000,
    supplyShare: 0.11,
    path: P([
      [228, 94], [298, 62], [358, 40], [400, 44], [458, 10], [505, 28], [528, 48],
      [553, 70], [548, 100], [542, 130], [536, 158], [538, 172], [505, 168], [468, 176],
      [430, 186], [395, 196], [360, 202], [336, 206], [318, 200], [300, 190], [288, 170],
      [272, 142], [252, 112],
    ]),
    labelPos: [395, 115],
  },
  {
    id: 'BB',
    name: 'Banskobystrický kraj',
    shortName: 'Banskobystrický',
    capital: 'Banská Bystrica',
    population: 626000,
    supplyShare: 0.08,
    path: P([
      [318, 200], [336, 206], [360, 202], [395, 196], [430, 186], [468, 176], [505, 168],
      [538, 172], [556, 182], [578, 192], [588, 222], [596, 252], [606, 282], [618, 308],
      [640, 330], [560, 338], [478, 362], [420, 382], [368, 408], [352, 372], [342, 338],
      [332, 300], [318, 270], [300, 254], [312, 244], [322, 224],
    ]),
    labelPos: [462, 268],
  },
  {
    id: 'PO',
    name: 'Prešovský kraj',
    shortName: 'Prešovský',
    capital: 'Prešov',
    population: 823000,
    supplyShare: 0.11,
    path: P([
      [553, 70], [600, 58], [650, 60], [700, 72], [748, 58], [808, 62], [860, 78],
      [912, 88], [962, 102], [1000, 140], [982, 172], [952, 192], [940, 208], [900, 202],
      [856, 196], [812, 202], [768, 208], [724, 212], [680, 204], [640, 196], [604, 190],
      [578, 192], [556, 182], [538, 172], [536, 158], [542, 130], [548, 100],
    ]),
    labelPos: [760, 130],
  },
  {
    id: 'KE',
    name: 'Košický kraj',
    shortName: 'Košický',
    capital: 'Košice',
    population: 799000,
    supplyShare: 0.14,
    path: P([
      [578, 192], [604, 190], [640, 196], [680, 204], [724, 212], [768, 208], [812, 202],
      [856, 196], [900, 202], [940, 208], [948, 250], [952, 292], [938, 324], [900, 334],
      [852, 318], [806, 334], [756, 318], [700, 332], [640, 330], [618, 308], [606, 282],
      [596, 252], [588, 222],
    ]),
    labelPos: [770, 265],
  },
]

export const REGION_IDS: RegionId[] = REGIONS.map((r) => r.id)
export const regionById = (id: RegionId): RegionInfo => REGIONS.find((r) => r.id === id)!

/** Orientation dots on the schematic map (approximate positions of regional capitals). */
export const CITY_DOTS: { name: string; x: number; y: number }[] = [
  { name: 'Bratislava', x: 46, y: 377 },
  { name: 'Trnava', x: 130, y: 318 },
  { name: 'Trenčín', x: 209, y: 187 },
  { name: 'Nitra', x: 216, y: 336 },
  { name: 'Žilina', x: 331, y: 102 },
  { name: 'Banská Bystrica', x: 403, y: 226 },
  { name: 'Prešov', x: 770, y: 159 },
  { name: 'Košice', x: 773, y: 232 },
]
