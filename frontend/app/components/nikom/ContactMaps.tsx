'use client'

import { useState } from 'react'
import { Icons } from '@/app/components/nikom/icons'
import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'
import { stegaClean } from 'next-sanity'

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    latitude?: string
    longitude?: string
    sector?: string
    objectId?: string
    googleMapsUrl?: string
    wazeUrl?: string
    appleMapsUrl?: string
    embedUrl?: string
  }
  index: number
  pageId: string
  pageType: string
}

/* ── Custom SVG city map ── */
function CityMap() {
  return (
    <svg viewBox="0 0 800 520" className="ctc-map-svg">
      <defs>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".6"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>
      {Array.from({length:21}).map((_,i)=>(
        <line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="520" stroke="rgba(255,255,255,.04)"/>
      ))}
      {Array.from({length:14}).map((_,i)=>(
        <line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="800" stroke="rgba(255,255,255,.04)"/>
      ))}
      <path d="M0 380 C 150 360, 280 420, 420 380 S 700 340, 800 360" fill="none"
            stroke="rgba(100,140,200,.25)" strokeWidth="6"/>
      <path d="M0 380 C 150 360, 280 420, 420 380 S 700 340, 800 360" fill="none"
            stroke="rgba(140,180,230,.18)" strokeWidth="1" strokeDasharray="3 4"/>
      <g stroke="rgba(255,255,255,.18)" strokeWidth="1.4" fill="none">
        <line x1="50" y1="280" x2="780" y2="240"/>
        <path d="M50 100 C 180 80, 320 120, 480 150 S 700 200, 780 180"/>
        <line x1="420" y1="240" x2="540" y2="180"/>
        <line x1="540" y1="180" x2="600" y2="100"/>
        <line x1="480" y1="320" x2="540" y2="180"/>
      </g>
      <g fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.1)" strokeWidth="1">
        <rect x="380" y="80" width="120" height="100" rx="2"/>
        <rect x="500" y="80" width="120" height="100" rx="2"/>
        <rect x="380" y="180" width="120" height="100" rx="2"/>
        <rect x="500" y="180" width="120" height="100" rx="2"/>
      </g>
      <text x="440" y="125" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 1</text>
      <text x="560" y="125" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 2</text>
      <text x="440" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 3</text>
      <text x="560" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" fontWeight="600">MLADOST 4 ★</text>
      <g stroke="rgba(255,255,255,.15)" strokeWidth=".8" strokeDasharray="2 3">
        <line x1="500" y1="200" x2="620" y2="200"/>
        <line x1="500" y1="220" x2="620" y2="220"/>
        <line x1="500" y1="240" x2="620" y2="240"/>
        <line x1="520" y1="180" x2="520" y2="280"/>
        <line x1="540" y1="180" x2="540" y2="280"/>
        <line x1="560" y1="180" x2="560" y2="280"/>
        <line x1="580" y1="180" x2="580" y2="280"/>
        <line x1="600" y1="180" x2="600" y2="280"/>
      </g>
      <g fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.55)">
        <circle cx="180" cy="200" r="3" fill="#8AB4FF" opacity=".8"/>
        <text x="190" y="204">NDK</text>
        <circle cx="700" cy="120" r="3" fill="#9DE2C6" opacity=".8"/>
        <text x="710" y="124">BIZ.PARK</text>
        <circle cx="420" cy="160" r="3" fill="#9DE2C6" opacity=".8"/>
        <text x="430" y="164">M-METRO</text>
        <circle cx="100" cy="100" r="3" fill="#EB9856" opacity=".8"/>
        <text x="110" y="104">CENTER</text>
      </g>
      <g stroke="rgba(247,215,36,.18)" strokeWidth=".8" strokeDasharray="2 4" fill="none">
        <line x1="560" y1="230" x2="700" y2="120"/>
        <line x1="560" y1="230" x2="420" y2="160"/>
        <line x1="560" y1="230" x2="180" y2="200"/>
      </g>
      <g transform="translate(560 230)">
        <circle r="60" fill="url(#pinGlow)">
          <animate attributeName="r" values="44;68;44" dur="2.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".6;.05;.6" dur="2.6s" repeatCount="indefinite"/>
        </circle>
        <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <animate attributeName="r" values="10;28;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle r="9" fill="var(--accent)"/>
        <circle r="3" fill="var(--accent-ink)"/>
        <line x1="9" y1="-9" x2="40" y2="-50" stroke="var(--accent)" strokeWidth="1.2"/>
        <rect x="40" y="-66" width="130" height="32" rx="3" fill="var(--ink-900)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="48" y="-52" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" fontWeight="600">OBJ-NIKOM-HQ</text>
        <text x="48" y="-40" fontFamily="JetBrains Mono" fontSize="7.5" fill="rgba(255,255,255,.7)">Mladost 4 · Blk 477 · Office 1</text>
      </g>
      <g transform="translate(740 460)">
        <circle r="22" fill="none" stroke="rgba(255,255,255,.18)"/>
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="var(--accent)" opacity=".9"/>
        <text y="-26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent)">N</text>
      </g>
      <g transform="translate(30 480)">
        <line x1="0" x2="120" y1="0" y2="0" stroke="rgba(255,255,255,.4)" strokeWidth="1.2"/>
        <line x1="0" x2="0" y1="-4" y2="4" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <line x1="60" x2="60" y1="-2" y2="2" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <line x1="120" x2="120" y1="-4" y2="4" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <text x="0" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.5)">0</text>
        <text x="120" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.5)">2 km</text>
      </g>
    </svg>
  )
}

/* ── Office blueprint SVG ── */
function BlueprintMap() {
  return (
    <svg viewBox="0 0 800 520" className="ctc-map-svg">
      {Array.from({length:21}).map((_,i)=>(
        <line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="520" stroke="rgba(255,255,255,.04)"/>
      ))}
      {Array.from({length:14}).map((_,i)=>(
        <line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="800" stroke="rgba(255,255,255,.04)"/>
      ))}
      <g transform="translate(140 90)">
        <rect x="0" y="0" width="520" height="320" fill="rgba(255,255,255,.025)"
              stroke="rgba(247,215,36,.6)" strokeWidth="2"/>
        <g stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none">
          <line x1="200" y1="0" x2="200" y2="180"/>
          <line x1="200" y1="180" x2="520" y2="180"/>
          <line x1="320" y1="0" x2="320" y2="180"/>
          <line x1="200" y1="240" x2="520" y2="240"/>
          <line x1="380" y1="180" x2="380" y2="320"/>
        </g>
        <g stroke="var(--ink-950)" strokeWidth="3">
          <line x1="200" y1="80" x2="200" y2="110"/>
          <line x1="240" y1="180" x2="270" y2="180"/>
          <line x1="380" y1="280" x2="380" y2="305"/>
          <line x1="320" y1="60" x2="320" y2="90"/>
        </g>
        <g stroke="rgba(255,255,255,.2)" strokeWidth=".5" fill="none">
          <path d="M200 110 A 30 30 0 0 1 230 80"/>
          <path d="M270 180 A 30 30 0 0 1 240 210"/>
        </g>
        <rect x="2" y="2" width="196" height="176" fill="rgba(247,215,36,.08)"/>
        <text x="100" y="80" textAnchor="middle" fontFamily="Geologica" fontSize="16" fontWeight="600" fill="var(--accent)">OFFICE 1</text>
        <text x="100" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.55)">NIKOM Security</text>
        <text x="100" y="118" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8.5" fill="var(--accent)" opacity=".7">★ HEADQUARTERS</text>
        <g stroke="rgba(247,215,36,.45)" strokeWidth="1" fill="rgba(247,215,36,.06)">
          <rect x="20" y="140" width="50" height="20" rx="1"/>
          <rect x="130" y="140" width="50" height="20" rx="1"/>
        </g>
        <circle cx="45" cy="135" r="5" fill="rgba(247,215,36,.3)"/>
        <circle cx="155" cy="135" r="5" fill="rgba(247,215,36,.3)"/>
        <text x="260" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">OFFICE 2</text>
        <text x="420" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">OFFICE 3</text>
        <text x="100" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">CORRIDOR</text>
        <text x="290" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">RECEPTION</text>
        <text x="290" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">STORAGE</text>
        <text x="450" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">TECH ROOM</text>
        <g transform="translate(0 280)">
          <path d="M-30 0 L 0 0" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <text x="-32" y="-6" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" textAnchor="end">ENTR</text>
        </g>
        <g transform="translate(100 60)">
          <circle r="20" fill="var(--accent)" opacity=".2">
            <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".4;0;.4" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle r="6" fill="var(--accent)"/>
          <circle r="2" fill="var(--accent-ink)"/>
        </g>
      </g>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="var(--accent)"/>
        </marker>
      </defs>
      <g stroke="rgba(255,255,255,.3)" strokeWidth=".7" fill="none">
        <line x1="140" y1="80" x2="660" y2="80"/>
        <line x1="140" y1="76" x2="140" y2="84"/>
        <line x1="660" y1="76" x2="660" y2="84"/>
        <line x1="120" y1="90" x2="120" y2="410"/>
        <line x1="116" y1="90" x2="124" y2="90"/>
        <line x1="116" y1="410" x2="124" y2="410"/>
      </g>
      <text x="400" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)">26.4 m</text>
      <text x="110" y="250" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" transform="rotate(-90 110 250)">16.0 m</text>
      <g transform="translate(30 460)">
        <rect x="0" y="0" width="280" height="44" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)"/>
        <text x="10" y="16" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.6)" letterSpacing="0.06em">DWG · NIKOM-HQ-FP-01 · REV 2026.05</text>
        <text x="10" y="30" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.4)">SCALE 1:100 · MLADOST 4 · BLOCK 477</text>
        <text x="10" y="42" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent)">CLASSIFICATION: PUBLIC</text>
      </g>
    </svg>
  )
}

/* ── Google Maps embed ── */
function GoogleMapView({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="ctc-gmap-wrap">
      <div className="ctc-gmap-frame">
        <iframe
          src={embedUrl}
          width="100%" height="100%"
          style={{border:0}}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps — NIKOM Security"
        />
        <div className="ctc-gmap-overlay" aria-hidden="true">
          <div className="ctc-gmap-corner tl"/><div className="ctc-gmap-corner tr"/>
          <div className="ctc-gmap-corner bl"/><div className="ctc-gmap-corner br"/>
        </div>
        <div className="ctc-gmap-badge">
          <span className="status-dot"/>
          <span className="meta">LIVE · Google Maps</span>
        </div>
        <div className="ctc-gmap-pin-info">
          <div className="meta">OBJ-NIKOM-HQ</div>
          <div className="ctc-gmap-pin-name">Ником Системи за Сигурност</div>
          <div className="ctc-gmap-pin-addr">жк. Младост 4, блок 477, офис 1</div>
        </div>
        <a className="ctc-gmap-open" href="https://www.google.com/maps/search/?api=1&query=NIKOM%20%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%A1%D0%B8%D0%B3%D1%83%D1%80%D0%BD%D0%BE%D1%81%D1%82%2C%20%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F" target="_blank" rel="noopener">
          Отвори в Google Maps
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17 17 7M9 7h8v8"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

const DEFAULT_EMBED_URL =
  'https://www.google.com/maps?q=%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&output=embed&hl=bg&z=16'

const DEFAULT_GMAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=NIKOM%20%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%A1%D0%B8%D0%B3%D1%83%D1%80%D0%BD%D0%BE%D1%81%D1%82%2C%20%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F'

export default function ContactMaps({ block, index, pageId, pageType }: Props) {
  const [view, setView] = useState<'city' | 'blueprint' | 'gmaps'>('city')

  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].${field}` }).toString()

  const embedUrl = stegaClean(block?.embedUrl) ?? DEFAULT_EMBED_URL
  const googleMapsUrl = stegaClean(block?.googleMapsUrl) ?? DEFAULT_GMAPS_URL
  const wazeUrl = stegaClean(block?.wazeUrl) ?? 'https://www.waze.com/ul?ll=42.6502%2C23.3796&navigate=yes'
  const appleMapsUrl = stegaClean(block?.appleMapsUrl) ?? 'https://maps.apple.com/?ll=42.6502,23.3796&q=NIKOM%20Security'

  return (
    <section className="section-pad ctc-maps dark-band" id="map">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>
              {block?.eyebrow ?? 'Локация · OBJ-NIKOM-HQ'}
            </div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={block?.heading ?? 'Намерете ни.'} />
            </h2>
          </div>

          <div className="ctc-map-toggle">
            <button className={view === 'city' ? 'active' : ''} onClick={() => setView('city')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></svg>
              <span>Карта на града</span>
            </button>
            <button className={view === 'blueprint' ? 'active' : ''} onClick={() => setView('blueprint')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 9v12M15 9v12"/></svg>
              <span>План на офиса</span>
            </button>
            <button className={view === 'gmaps' ? 'active' : ''} onClick={() => setView('gmaps')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Google Maps</span>
            </button>
          </div>
        </div>

        <div className="ctc-map-wrap">
          <div className="arch-scan" />
          {view === 'city' && <CityMap />}
          {view === 'blueprint' && <BlueprintMap />}
          {view === 'gmaps' && <GoogleMapView embedUrl={embedUrl} />}

          <div className="ctc-map-side">
            <div className="ctc-map-meta">
              <div className="meta">КООРДИНАТИ</div>
              <div className="ctc-coord" data-sanity={path('latitude')}>{block?.latitude ?? '42.6502° N'}</div>
              <div className="ctc-coord" data-sanity={path('longitude')}>{block?.longitude ?? '23.3796° E'}</div>
              <div className="meta" style={{marginTop:16}}>СЕКТОР</div>
              <div className="ctc-coord" data-sanity={path('sector')}>{block?.sector ?? 'Sofia · Mladost 4'}</div>
              <div className="meta" style={{marginTop:16}}>СТАТУС</div>
              <div className="ctc-coord ctc-status-live"><span className="status-dot"/> ACTIVE · TX</div>
              <div className="meta" style={{marginTop:16}}>ОБЕКТ-ID</div>
              <div className="ctc-coord" data-sanity={path('objectId')}>{block?.objectId ?? 'NIKOM-HQ-001'}</div>
            </div>

            <div className="ctc-map-directions">
              <div className="meta">Указания за път</div>
              <a className="ctc-dir-btn" href={googleMapsUrl} target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                Google Maps
                <Icons.Arrow />
              </a>
              <a className="ctc-dir-btn" href={wazeUrl} target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22L3 12l9-10 9 10z"/></svg>
                Waze
                <Icons.Arrow />
              </a>
              <a className="ctc-dir-btn" href={appleMapsUrl} target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="10" r="3"/><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/></svg>
                Apple Maps
                <Icons.Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
