'use client'

import React, { useState, useEffect, useRef } from 'react'
import { StreamText, useCountUp } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

/* ============ HELPERS ============ */
const pad = (n: number) => String(n).padStart(2, '0')
const fmtTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`

function useNow() {
  // Start null so SSR and the first client render agree (no live time on the
  // server). The real clock is set after mount, avoiding a hydration mismatch.
  const [t, setT] = useState<Date | null>(null)
  useEffect(() => {
    setT(new Date())
    const id = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

/* ============ 3D BUILDING ============ */
const BLD: Record<string, { w: number; d: number; h: number; crown: string | null }> = {
  hospital: { w: 50, d: 50, h: 64, crown: 'cross' },
  retail:   { w: 66, d: 46, h: 36, crown: null },
  hotel:    { w: 38, d: 38, h: 78, crown: 'spire' },
  ind:      { w: 68, d: 44, h: 38, crown: 'vent' },
  office:   { w: 44, d: 44, h: 80, crown: null },
  gov:      { w: 60, d: 48, h: 52, crown: 'flag' },
}

function Building3D({ k }: { k: string }) {
  const s = BLD[k] || BLD.office
  const style = {
    '--bw': s.w + 'px',
    '--bd': s.d + 'px',
    '--bh': s.h + 'px',
    '--cy': '-' + Math.round(s.h / 2 + 4) + 'px',
  } as React.CSSProperties
  return (
    <div className="b3d-stage" data-k={k}>
      <div className="b3d-shadow" />
      <div className="b3d" style={style}>
        <div className="b3d-face b3d-front" data-k={k} />
        <div className="b3d-face b3d-back" data-k={k} />
        <div className="b3d-face b3d-left" data-k={k} />
        <div className="b3d-face b3d-right" data-k={k} />
        <div className="b3d-face b3d-top" data-k={k} />
        {s.crown === 'cross' && (
          <div className="b3d-crown b3d-cross">
            <span className="b3d-cv" />
            <span className="b3d-ch" />
          </div>
        )}
        {s.crown === 'spire' && <div className="b3d-crown b3d-spire" />}
        {s.crown === 'vent' && <div className="b3d-crown b3d-vent" />}
        {s.crown === 'flag' && (
          <div className="b3d-crown b3d-flag">
            <span className="b3d-fp" />
            <span className="b3d-fc" />
          </div>
        )}
      </div>
    </div>
  )
}

/* ============ SOC MISSION CARD ============ */
function IndustrySOC({
  k,
  code,
  kpi,
  kpiLabel,
  events,
  seed = 0,
}: {
  k: string
  code: string
  kpi: number
  kpiLabel: string
  events: string[]
  seed?: number
}) {
  const [tick, setTick] = useState(0)
  const now = useNow()
  const [numRef, numStr] = useCountUp(kpi)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200 + (seed % 4) * 230)
    return () => clearInterval(id)
  }, [seed])

  return (
    <div className="soc-card">
      <div className="soc-bg-grid" />
      <div className="soc-top">
        <span className="soc-code-pill">{code}</span>
        <span className="soc-live">
          <i />
          LIVE
        </span>
        <span className="soc-time">{now ? fmtTime(now) : '--:--:--'}</span>
      </div>
      <div className="soc-mid">
        <div className="soc-kpi-wrap">
          <span ref={numRef as React.Ref<HTMLSpanElement>} className="soc-num">
            {parseInt(numStr, 10).toLocaleString('bg-BG')}
          </span>
          <span className="soc-lbl">{kpiLabel}</span>
        </div>
        <div className="soc-bld">
          <Building3D k={k} />
        </div>
      </div>
      <div className="soc-log">
        {[0, 1, 2].map((i) => {
          const ev = events[(tick + i) % events.length]
          return (
            <div
              key={i}
              className={`soc-row ${i === 0 ? 'on' : ''}`}
              style={{ opacity: 1 - i * 0.32 }}
            >
              <span className="soc-dot" />
              <span className="soc-ev">{ev}</span>
              <span className="soc-ts">{pad(((tick + i) * 7 + seed * 11) % 60)}s</span>
            </div>
          )
        })}
      </div>
      <div className="soc-sweep">
        <div />
      </div>
    </div>
  )
}

/* ============ TYPES ============ */
type SectorItem = {
  _key?: string
  name?: string
  k?: string
  code?: string
  kpi?: number
  kpiLabel?: string
  events?: string[]
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    sectors?: SectorItem[]
  }
  index: number
  pageId: string
  pageType: string
}

/* ============ MAIN COMPONENT ============ */
export default function HomeIndustries({ block, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow
  const heading = block?.heading
  const lead = block?.lead
  const sectors = block?.sectors ?? []

  const blockPath = `pageBuilder[_key=="${block?._key}"]`

  return (
    <section className="section-pad industries">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.eyebrow` }).toString()}
            >
              {eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.heading` }).toString()}
            >
              <StreamText text={heading} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.lead` }).toString()}
          >
            {lead}
          </p>
        </div>

        <div
          className="ind-grid ind-grid-soc"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.sectors` }).toString()}
        >
          {sectors.map((it, i) => (
            <a
              className="ind-tile ind-tile-soc"
              key={it._key ?? i}
              href="#"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.sectors[_key=="${it._key}"]` }).toString()}
            >
              <div className="ind-bg" data-k={it.k ?? 'office'}>
                <IndustrySOC
                  k={it.k ?? 'office'}
                  code={it.code ?? '?'}
                  kpi={it.kpi ?? 0}
                  kpiLabel={it.kpiLabel ?? ''}
                  events={it.events ?? ['']}
                  seed={i}
                />
              </div>
              <div className="ind-cap">
                <span>{it.name ?? ''}</span>
                <Icons.Arrow />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
