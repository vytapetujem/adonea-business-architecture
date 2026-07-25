import { Section, ProvenanceBadge } from '../ui'
import EventTimeline from '../timeline/EventTimeline'
import PriceChart from '../charts/PriceChart'

export default function TimelineSection() {
  return (
    <Section
      id="timeline"
      kicker="Chronológia"
      title="Udalosti, ktoré hýbali trhom"
      intro="Prejdite kurzorom nad udalosť — zvýrazní sa zodpovedajúce obdobie v cenovom grafe. Udalosti sú dokumentované fakty; odhad ich vplyvu na ceny (−5 … +5) a spoľahlivosť odhadu sú analytické hodnotenia vysvetlené v docs/AI_REASONING.md."
      right={<ProvenanceBadge p="measured" title="Udalosti sú dokumentované fakty; odhady vplyvu sú analytické." />}
    >
      <div className="grid xl:grid-cols-2 gap-4">
        <div className="panel p-4 xl:sticky xl:top-32 self-start">
          <div className="panel-title mb-2">Cenový graf s vyznačením zvolenej udalosti</div>
          <PriceChart height={430} />
        </div>
        <div className="max-h-[640px] overflow-y-auto pr-1">
          <EventTimeline />
        </div>
      </div>
    </Section>
  )
}
