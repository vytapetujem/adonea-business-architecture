import { Section, ProvenanceBadge } from '../ui'
import SlovakiaMap from '../map/SlovakiaMap'

export default function MapSection() {
  return (
    <Section
      id="map"
      kicker="Regionálna analýza"
      title="Interaktívna mapa krajov"
      intro="Prepínajte metriky a porovnávajte kraje cez farebné gradienty. Bratislavský kraj zostáva najdrahší (~1,4-násobok národného priemeru, +19,5 % r/r v Q1 2026). V Q1 2026 rástli medzikvartálne najrýchlejšie Prešovský (+11 % — prudký obrat po poklese v 2025), Banskobystrický (+6,9 %) a Trenčiansky kraj (+5,1 %); príspevok Košíc a Žiliny slabne. Nitriansky kraj má najnižšiu úroveň cien v SR (kotva NBS: 1 522 €/m² v Q3 2025)."
      right={<ProvenanceBadge p="estimated" title="Krajské série: modelový odhad kalibrovaný na regionálne kotvy NBS (±5–10 %)." />}
    >
      <SlovakiaMap />
    </Section>
  )
}
