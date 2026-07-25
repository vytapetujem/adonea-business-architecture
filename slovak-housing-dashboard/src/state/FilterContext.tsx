import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { GeoScope, PropertyType } from '../lib/types'
import { QUARTERS } from '../lib/quarters'

interface FilterState {
  scope: GeoScope
  setScope: (s: GeoScope) => void
  propertyType: PropertyType
  setPropertyType: (t: PropertyType) => void
  /** inclusive quarter-index range into QUARTERS */
  range: [number, number]
  setRange: (r: [number, number]) => void
  showEvents: boolean
  setShowEvents: (b: boolean) => void
  highlightedEvent: string | null
  setHighlightedEvent: (id: string | null) => void
}

const Ctx = createContext<FilterState | null>(null)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState<GeoScope>('SK')
  const [propertyType, setPropertyType] = useState<PropertyType>('all')
  const [range, setRange] = useState<[number, number]>([0, QUARTERS.length - 1])
  const [showEvents, setShowEvents] = useState(true)
  const [highlightedEvent, setHighlightedEvent] = useState<string | null>(null)

  const value = useMemo(
    () => ({
      scope, setScope, propertyType, setPropertyType, range, setRange,
      showEvents, setShowEvents, highlightedEvent, setHighlightedEvent,
    }),
    [scope, propertyType, range, showEvents, highlightedEvent],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useFilters(): FilterState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useFilters must be used inside FilterProvider')
  return ctx
}
