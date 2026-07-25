import Header from './components/Header'
import FilterBar from './components/FilterBar'
import { FilterProvider } from './state/FilterContext'
import OverviewSection from './components/sections/OverviewSection'
import MapSection from './components/sections/MapSection'
import TimelineSection from './components/sections/TimelineSection'
import DriversSection from './components/sections/DriversSection'
import CyclesSection from './components/sections/CyclesSection'
import ValuationSection from './components/sections/ValuationSection'
import ForecastSection from './components/sections/ForecastSection'
import OutlookSection from './components/sections/OutlookSection'
import InvestmentSection from './components/sections/InvestmentSection'
import DecisionSection from './components/sections/DecisionSection'
import MethodologySection from './components/sections/MethodologySection'

export default function App() {
  return (
    <FilterProvider>
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        <FilterBar />
        <OverviewSection />
        <MapSection />
        <TimelineSection />
        <DriversSection />
        <CyclesSection />
        <ValuationSection />
        <ForecastSection />
        <OutlookSection />
        <InvestmentSection />
        <DecisionSection />
        <MethodologySection />
      </main>
      <footer className="border-t border-ink-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-2xs text-ink-500 leading-relaxed">
          SK Housing Monitor · analytický nástroj, nie finančné poradenstvo. Dáta: NBS, ŠÚSR, ECB, Eurostat, Deloitte + trhové
          odhady — triedy spoľahlivosti a obmedzenia v sekcii Metodika. História končí 2026-Q1; prognózy sú scenárové projekcie s neistotou.
        </div>
      </footer>
    </FilterProvider>
  )
}
