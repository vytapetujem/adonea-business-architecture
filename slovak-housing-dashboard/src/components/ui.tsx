import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Provenance } from '../lib/types'

export const PROVENANCE_META: Record<Provenance, { label: string; cls: string; desc: string }> = {
  measured: {
    label: 'Merané',
    cls: 'border-pos/40 text-pos bg-pos/10',
    desc: 'Oficiálne publikovaný údaj (NBS, ŠÚSR, ECB, Eurostat).',
  },
  anchored: {
    label: 'Kompilované',
    cls: 'border-info/40 text-info bg-info/10',
    desc: 'Kompilácia z oficiálnych publikácií; kľúčové kotvy overené proti zdrojom 25. 7. 2026, medziľahlé body s toleranciou ±1–2 %.',
  },
  derived: {
    label: 'Vypočítané',
    cls: 'border-ink-300/40 text-ink-200 bg-ink-600/30',
    desc: 'Deterministicky vypočítané z meraných/kompilovaných sérií (rasty, pomery, interpolácie).',
  },
  estimated: {
    label: 'AI odhad',
    cls: 'border-accent/40 text-accent bg-accent/10',
    desc: 'Modelový odhad kalibrovaný na oficiálne kotvy — orientačná presnosť, pozri metodiku.',
  },
  forecast: {
    label: 'Prognóza',
    cls: 'border-forecast/40 text-forecast bg-forecast/10',
    desc: 'Scenárová projekcia prognostického modelu s intervalmi spoľahlivosti.',
  },
}

export function ProvenanceBadge({ p, title }: { p: Provenance; title?: string }) {
  const meta = PROVENANCE_META[p]
  return (
    <span className={`chip ${meta.cls}`} title={title ?? meta.desc}>
      {meta.label}
    </span>
  )
}

export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`panel p-4 md:p-5 ${className}`}>{children}</div>
}

export function Section({
  id,
  title,
  kicker,
  intro,
  children,
  right,
}: {
  id: string
  title: string
  kicker: string
  intro?: ReactNode
  children: ReactNode
  right?: ReactNode
}) {
  return (
    <motion.section
      id={id}
      className="scroll-mt-20 py-10 border-t border-ink-800 first:border-t-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3 mb-1">
        <div>
          <div className="text-2xs font-semibold uppercase tracking-[0.22em] text-accent">{kicker}</div>
          <h2 className="text-xl md:text-2xl font-semibold text-ink-100 mt-1">{title}</h2>
        </div>
        {right}
      </div>
      {intro && <p className="text-sm text-ink-300 max-w-3xl mb-5">{intro}</p>}
      {children}
    </motion.section>
  )
}

export function StatTile({
  label,
  value,
  sub,
  tone = 'default',
  badge,
}: {
  label: string
  value: ReactNode
  sub?: ReactNode
  tone?: 'default' | 'pos' | 'neg' | 'accent'
  badge?: ReactNode
}) {
  const toneCls =
    tone === 'pos' ? 'text-pos' : tone === 'neg' ? 'text-neg' : tone === 'accent' ? 'text-accent' : 'text-ink-100'
  return (
    <div className="panel px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="panel-title">{label}</div>
        {badge}
      </div>
      <div className={`num text-xl md:text-2xl font-semibold mt-1 ${toneCls}`}>{value}</div>
      {sub && <div className="text-2xs text-ink-300 mt-0.5">{sub}</div>}
    </div>
  )
}

export function MeterBar({
  value,
  max = 100,
  color = '#f5a623',
  height = 6,
}: {
  value: number
  max?: number
  color?: string
  height?: number
}) {
  return (
    <div className="w-full rounded-full bg-ink-700 overflow-hidden" style={{ height }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  )
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 text-2xs leading-relaxed text-ink-400 border border-ink-700 rounded-lg p-3 bg-ink-900/60">
      {children}
    </div>
  )
}
