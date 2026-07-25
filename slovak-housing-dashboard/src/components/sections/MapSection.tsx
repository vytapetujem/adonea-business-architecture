import { Section, ProvenanceBadge } from '../ui'
import SlovakiaMap from '../map/SlovakiaMap'

export default function MapSection() {
  return (
    <Section
      id="map"
      kicker="Regionálna analýza"
      title="Interaktívna mapa krajov"
      intro="Prepínajte metriky a porovnávajte kraje cez farebné gradienty. Bratislavský kraj zostáva najdrahší (~1,4-násobok národného priemeru), no v roku 2025 rástli najrýchlejšie Nitriansky, Banskobystrický a Košický kraj — regióny dobiehajú. Prešovský kraj ako jediný v Q4 2025 medziročne mierne klesol."
      right={<ProvenanceBadge p="estimated" title="Krajské série: modelový odhad kalibrovaný na regionálne kotvy NBS (±5–10 %)." />}
    >
      <SlovakiaMap />
    </Section>
  )
}
