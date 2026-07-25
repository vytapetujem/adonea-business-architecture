import { useFilters } from '../state/FilterContext'
import { REGIONS } from '../data/regions'
import { QUARTERS, quarterLabel } from '../lib/quarters'
import type { PropertyType } from '../lib/types'

const TYPES: { id: PropertyType; label: string }[] = [
  { id: 'all', label: 'Spolu' },
  { id: 'flat', label: 'Byty' },
  { id: 'house', label: 'Domy' },
]

/** Global filters: geography, property type, time range, event overlay. */
export default function FilterBar() {
  const { scope, setScope, propertyType, setPropertyType, range, setRange, showEvents, setShowEvents } = useFilters()

  return (
    <div className="panel px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3 sticky top-14 z-30 backdrop-blur bg-ink-850/90">
      <div className="flex items-center gap-2">
        <span className="panel-title">Územie</span>
        <select
          value={scope}
          onChange={(e) => setScope(e.target.value as never)}
          className="bg-ink-800 border border-ink-600 rounded-md text-xs text-ink-100 px-2 py-1.5 outline-none focus:border-accent/60"
        >
          <option value="SK">Slovensko</option>
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="panel-title">Typ</span>
        <div className="flex rounded-md overflow-hidden border border-ink-600">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setPropertyType(t.id)}
              className={`px-2.5 py-1.5 text-xs transition-colors ${
                propertyType === t.id ? 'bg-accent/20 text-accent' : 'text-ink-300 hover:text-ink-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-[220px]">
        <span className="panel-title whitespace-nowrap">Obdobie</span>
        <span className="num text-2xs text-ink-300 w-14">{quarterLabel(QUARTERS[range[0]])}</span>
        <input
          type="range" min={0} max={QUARTERS.length - 2} value={range[0]}
          onChange={(e) => setRange([Math.min(Number(e.target.value), range[1] - 1), range[1]])}
          className="flex-1 accent-[#f5a623] h-1"
        />
        <input
          type="range" min={1} max={QUARTERS.length - 1} value={range[1]}
          onChange={(e) => setRange([range[0], Math.max(Number(e.target.value), range[0] + 1)])}
          className="flex-1 accent-[#f5a623] h-1"
        />
        <span className="num text-2xs text-ink-300 w-14 text-right">{quarterLabel(QUARTERS[range[1]])}</span>
      </div>

      <label className="flex items-center gap-2 text-xs text-ink-300 cursor-pointer">
        <input
          type="checkbox" checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)}
          className="accent-[#f5a623]"
        />
        Udalosti v grafe
      </label>
    </div>
  )
}
