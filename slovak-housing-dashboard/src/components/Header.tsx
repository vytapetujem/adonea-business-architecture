const NAV = [
  ['overview', 'Prehľad'],
  ['map', 'Mapa'],
  ['timeline', 'Udalosti'],
  ['drivers', 'Faktory'],
  ['cycles', 'Cykly'],
  ['valuation', 'Ocenenie'],
  ['forecast', 'Prognóza'],
  ['outlook', 'Výhľad'],
  ['invest', 'Investície'],
  ['decision', 'Kúpiť či počkať'],
  ['method', 'Metodika a dáta'],
] as const

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-ink-950/85 backdrop-blur border-b border-ink-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <a href="#overview" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-md bg-accent/15 border border-accent/40 grid place-items-center">
            <span className="text-accent font-bold text-sm">SK</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-ink-100 tracking-tight">Housing Monitor</div>
            <div className="text-2xs text-ink-400 -mt-0.5">Rezidenčný trh SR · 2016 → 2026</div>
          </div>
        </a>
        <nav className="ml-auto hidden lg:flex items-center gap-0.5 overflow-x-auto">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-2.5 py-1.5 rounded-md text-xs text-ink-300 hover:text-ink-100 hover:bg-ink-800 whitespace-nowrap transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="hidden md:inline chip border-forecast/40 text-forecast bg-forecast/10 shrink-0">
          dáta k 2025-Q4 · zostavené 07/2026
        </span>
      </div>
    </header>
  )
}
