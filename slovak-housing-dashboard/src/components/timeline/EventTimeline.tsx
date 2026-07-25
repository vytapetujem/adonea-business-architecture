import { useState } from 'react'
import { motion } from 'framer-motion'
import { EVENTS, EVENT_CATEGORY_META } from '../../data/events'
import { useFilters } from '../../state/FilterContext'
import { quarterToIndex, QUARTERS, quarterLabel } from '../../lib/quarters'
import type { EventCategory } from '../../lib/types'
import { fmtPct } from '../../lib/format'

/**
 * Interactive event timeline. Hover/click highlights the corresponding period
 * on the price chart (via FilterContext.highlightedEvent).
 */
export default function EventTimeline() {
  const { highlightedEvent, setHighlightedEvent } = useFilters()
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | 'all'>('all')

  const events = EVENTS.filter((e) => categoryFilter === 'all' || e.category === categoryFilter).sort(
    (a, b) => quarterToIndex(a.from) - quarterToIndex(b.from),
  )
  const total = QUARTERS.length

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`chip ${categoryFilter === 'all' ? 'border-accent/60 text-accent bg-accent/15' : 'border-ink-600 text-ink-300 hover:text-ink-200'}`}
        >
          Všetky kategórie
        </button>
        {(Object.entries(EVENT_CATEGORY_META) as [EventCategory, { label: string; color: string }][]).map(([id, meta]) => (
          <button
            key={id}
            onClick={() => setCategoryFilter(id)}
            className={`chip border-ink-600 hover:text-ink-100 ${categoryFilter === id ? 'text-ink-100' : 'text-ink-300'}`}
            style={categoryFilter === id ? { borderColor: meta.color, backgroundColor: meta.color + '22' } : undefined}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
            {meta.label}
          </button>
        ))}
      </div>

      <div className="space-y-2.5">
        {events.map((e, i) => {
          const meta = EVENT_CATEGORY_META[e.category]
          const from = quarterToIndex(e.from)
          const to = quarterToIndex(e.to ?? e.from) + 1
          const active = highlightedEvent === e.id
          return (
            <motion.button
              key={e.id}
              className={`w-full text-left panel px-4 py-3 transition-colors ${active ? 'border-accent/50 bg-ink-800' : 'hover:border-ink-500'}`}
              onMouseEnter={() => setHighlightedEvent(e.id)}
              onMouseLeave={() => setHighlightedEvent(null)}
              onClick={() => setHighlightedEvent(active ? null : e.id)}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.35 }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip" style={{ borderColor: meta.color + '66', color: meta.color, backgroundColor: meta.color + '15' }}>
                  {meta.label}
                </span>
                <span className="text-sm font-semibold text-ink-100">{e.title}</span>
                <span className="text-2xs num text-ink-400 ml-auto">{e.date}</span>
              </div>

              {/* period band on a mini 2016→2026 axis */}
              <div className="relative h-1.5 rounded-full bg-ink-700 my-2.5 overflow-hidden">
                <div
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: `${(from / total) * 100}%`,
                    width: `${Math.max(2, ((to - from) / total) * 100)}%`,
                    backgroundColor: meta.color,
                    opacity: active ? 1 : 0.6,
                  }}
                />
              </div>

              <p className="text-xs text-ink-300 leading-relaxed">{e.description}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-2xs text-ink-400">
                <span>
                  Obdobie: <span className="num text-ink-300">{quarterLabel(e.from)}{e.to ? ` – ${quarterLabel(e.to)}` : ' →'}</span>
                </span>
                <span>
                  Odhad vplyvu na ceny:{' '}
                  <span className={`num font-semibold ${e.impact > 0 ? 'text-pos' : e.impact < 0 ? 'text-neg' : 'text-neutral'}`}>
                    {e.impact > 0 ? '+' : ''}{e.impact}/5
                  </span>
                </span>
                <span>
                  Spoľahlivosť odhadu: <span className="num text-ink-300">{fmtPct(e.confidence * 100, 0, false)}</span>
                </span>
                {e.regions && <span className="text-accent">regionálne: {e.regions.join(', ')}</span>}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
