'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Icons } from '@/app/components/nikom/icons'
import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr, imageUrl } from '@/sanity/lib/utils'

type CardItem = {
  _key?: string
  title?: string
  sector?: string
  sectorLabel?: string
  year?: string
  image?: { asset?: { _ref?: string } } | null
  imageFallback?: string
  href?: string
  systems?: string[]
  kpis?: { _key?: string; label?: string; value?: string }[]
  classified?: boolean
  size?: string
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    items?: CardItem[]
  }
  index: number
  pageId: string
  pageType: string
}

const CATEGORIES = [
  { id: 'all', label: 'Всички' },
  { id: 'healthcare', label: 'Здравеопазване' },
  { id: 'hotel', label: 'Хотели' },
  { id: 'retail', label: 'Ритейл' },
  { id: 'industrial', label: 'Складове' },
  { id: 'government', label: 'Държавни' },
]

function ProjectCard({ p, cardIndex }: { p: CardItem; cardIndex: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle')

  useEffect(() => {
    if (!ref.current) return
    let t1: ReturnType<typeof setTimeout> | null = null
    let t2: ReturnType<typeof setTimeout> | null = null
    const trigger = () => {
      const delay = Math.min(cardIndex, 8) * 70
      t1 = setTimeout(() => {
        setPhase('scanning')
        t2 = setTimeout(() => setPhase('done'), 1100)
      }, delay)
    }
    const rect = ref.current.getBoundingClientRect()
    const inView = rect.top < (window.innerHeight || 800) + 300
    if (inView) {
      trigger()
      return () => { if (t1) clearTimeout(t1); if (t2) clearTimeout(t2) }
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { trigger(); io.disconnect() }
    }, { threshold: 0, rootMargin: '300px 0px 300px 0px' })
    io.observe(ref.current)
    const fallback = setTimeout(trigger, 3000)
    return () => {
      io.disconnect()
      clearTimeout(fallback)
      if (t1) clearTimeout(t1)
      if (t2) clearTimeout(t2)
    }
  }, [cardIndex])

  const imgSrc = imageUrl(p.image, p.imageFallback ?? '')
  const href = p.href ?? '#'

  return (
    <a
      ref={ref}
      href={href}
      className={`prj-card phase-${phase} sector-${p.sector ?? 'other'}`}
    >
      <div className="prj-scan-overlay" aria-hidden="true">
        <span className="prj-scan-line"/>
      </div>
      <div className="prj-corners" aria-hidden="true">
        <span className="corn tl"/><span className="corn tr"/>
        <span className="corn bl"/><span className="corn br"/>
      </div>
      <div className="prj-content">
        <div className="prj-img-wrap">
          <img src={imgSrc} alt={p.title ?? ''} />
          <div className="prj-img-veil" aria-hidden="true"/>
          <div className="prj-img-shade"/>
          <span className="chip solid prj-sector">{p.sectorLabel ?? ''}</span>
          {p.classified && <span className="prj-classified meta">CLASSIFIED</span>}
        </div>
        <div className="prj-body">
          <div className="prj-meta-row">
            <span className="meta">{p.year ?? ''}</span>
            <span className="meta prj-id">№ {String(cardIndex + 1).padStart(3, '0')}</span>
          </div>
          <h3 className="h4 prj-title">{p.title ?? ''}</h3>
          <div className="prj-systems">
            {(p.systems ?? []).map((s, i) => <span className="chip" key={i}>{s}</span>)}
          </div>
          {p.kpis && p.kpis.length > 0 && (
            <div className="prj-kpi">
              {p.kpis.map((k, i) => (
                <div key={k._key ?? i}>
                  <div className="meta">{k.label}</div>
                  <div className="prj-kpi-v">{k.value}</div>
                </div>
              ))}
            </div>
          )}
          <span className="prj-link">
            Виж проекта <Icons.Arrow/>
          </span>
        </div>
      </div>
    </a>
  )
}

export default function ProjectsMasonry({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    `pageBuilder[_key=="${block._key ?? ''}"].${field}`

  const allItems: CardItem[] = block?.items ?? []
  const [filter, setFilter] = useState('all')
  const [visible, setVisible] = useState(6)

  const filtered = useMemo(() => {
    return filter === 'all' ? allItems : allItems.filter(p => p.sector === filter)
  }, [filter, allItems])

  useEffect(() => {
    setVisible(filter === 'all' ? 6 : filtered.length)
  }, [filter, filtered.length])

  const sentinelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (visible >= filtered.length) return
    if (!sentinelRef.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(v => Math.min(v + 4, filtered.length))
      }
    }, { rootMargin: '200px' })
    io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [visible, filtered.length])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allItems.length }
    allItems.forEach(p => { if (p.sector) c[p.sector] = (c[p.sector] || 0) + 1 })
    return c
  }, [allItems])

  return (
    <section className="section-pad projects-grid" id="projects">
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
          {/* Filter bar */}
          <div className="prj-filter-bar">
            <div className="prj-filter-rail">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={'prj-filter-btn ' + (filter === cat.id ? 'active' : '')}
                  onClick={() => setFilter(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="prj-filter-count">{counts[cat.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="prj-masonry"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('items') }).toString()}
        >
          {filtered.slice(0, visible).map((p, i) => (
            <ProjectCard key={p._key ?? i} p={p} cardIndex={i}/>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="prj-sentinel" ref={sentinelRef}>
            <div className="prj-loader">
              <span/><span/><span/>
            </div>
            <div className="meta">Зареждане още {filtered.length - visible} проекта…</div>
          </div>
        )}

        {visible >= filtered.length && filtered.length > 6 && (
          <div className="prj-end">
            <div className="meta">— Край на архива —</div>
          </div>
        )}
      </div>
    </section>
  )
}
