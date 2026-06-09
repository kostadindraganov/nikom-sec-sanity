'use client'

import { Counter, StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type SectorStat = {
  _key?: string
  id?: string
  label?: string
  count?: number
  icon?: string
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    sectors?: SectorStat[]
  }
  index: number
  pageId: string
  pageType: string
}

function SectorIcon({ kind }: { kind: string }) {
  const c = 'var(--accent)'
  const stroke = { fill: 'none' as const, stroke: c, strokeWidth: 1.5 }
  switch (kind) {
    case 'hotel':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" {...stroke}>
          <path d="M4 28V8h10v20M14 28V14h14v14M4 28h24"/>
          <path d="M18 18h2M18 22h2M24 18h2M24 22h2M8 14h2M8 18h2M8 22h2"/>
        </svg>
      )
    case 'health':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" {...stroke}>
          <rect x="5" y="6" width="22" height="22" rx="2"/>
          <path d="M16 12v10M11 17h10"/>
        </svg>
      )
    case 'gov':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" {...stroke}>
          <path d="M4 14L16 6l12 8v2H4z"/>
          <path d="M7 28V16M12 28V16M20 28V16M25 28V16M4 28h24"/>
        </svg>
      )
    case 'retail':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" {...stroke}>
          <path d="M5 10h22l-2 18H7zM10 14V8a6 6 0 0 1 12 0v6"/>
        </svg>
      )
    case 'ind':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32" {...stroke}>
          <path d="M4 28V12l8 6v-6l8 6V12l8 16zM4 28h24"/>
          <path d="M10 24h4M18 24h4"/>
        </svg>
      )
    default:
      return null
  }
}

export default function ProjectsSectorStats({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    `pageBuilder[_key=="${block._key ?? ''}"].${field}`

  const sectors = block?.sectors ?? []

  return (
    <section className="section-pad projects-sector-stats dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
            >
              {block?.eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading') }).toString()}
            >
              <StreamText text={block?.heading ?? ''}/>
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
          >
            {block?.lead}
          </p>
        </div>
        <div
          className="sec-stats-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('sectors') }).toString()}
        >
          {sectors.map((s, i) => (
            <div
              className="sec-stat-card"
              key={s._key ?? s.id ?? i}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path('sectors')}[_key=="${s._key ?? ''}"]` }).toString()}
            >
              <SectorIcon kind={s.icon ?? ''}/>
              <div className="sec-stat-n">
                <Counter to={s.count ?? 0}/>
              </div>
              <div className="sec-stat-l">{s.label ?? ''}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
