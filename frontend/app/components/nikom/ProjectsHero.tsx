'use client'

import React, { useMemo } from 'react'
import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading1?: string
    heading2?: string
    lead?: string
    ctaPrimaryLabel?: string
    ctaGhostLabel?: string
    ctaGhostHref?: string
  }
  index: number
  pageId: string
  pageType: string
}

export default function ProjectsHero({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    `pageBuilder[_key=="${block._key ?? ''}"].${field}`

  const dust = useMemo(() => {
    // Deterministic PRNG (mulberry32) so server and client render identical
    // values — Math.random() would differ across the SSR boundary and break
    // hydration. Particles are purely decorative.
    let seed = 0x9e3779b9
    const rand = () => {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
    const items = []
    for (let i = 0; i < 80; i++) {
      items.push({
        x: rand() * 100,
        y: rand() * 100,
        size: rand() * 2.5 + 0.6,
        delay: -rand() * 12,
        dur: 8 + rand() * 10,
        opacity: 0.25 + rand() * 0.55,
      })
    }
    return items
  }, [])

  return (
    <section className="prj-video-hero">
      {/* Particles */}
      <div className="vid-particles" aria-hidden="true">
        {dust.map((d, i) => (
          <span
            key={i}
            className="vid-dust"
            style={{
              left: d.x + '%',
              top: d.y + '%',
              width: d.size + 'px',
              height: d.size + 'px',
              opacity: d.opacity,
              animationDelay: d.delay + 's',
              animationDuration: d.dur + 's',
            }}
          />
        ))}
      </div>

      {/* Center subject — CCTV camera */}
      <div className="vid-stage" aria-hidden="true">
        <div className="vid-glow" />
        <div className="vid-cam">
          <svg viewBox="0 0 360 280" className="vid-cam-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2A2F38"/>
                <stop offset="1" stopColor="#0E1015"/>
              </linearGradient>
              <linearGradient id="camFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1A1D24"/>
                <stop offset="1" stopColor="#080A0E"/>
              </linearGradient>
              <radialGradient id="lens" cx="50%" cy="50%" r="55%">
                <stop offset="0" stopColor="#0A0C12"/>
                <stop offset="0.55" stopColor="#1B2230"/>
                <stop offset="0.78" stopColor="#0C0F14"/>
                <stop offset="1" stopColor="#000"/>
              </radialGradient>
              <radialGradient id="lensHi" cx="35%" cy="32%" r="40%">
                <stop offset="0" stopColor="rgba(255,255,255,.35)"/>
                <stop offset="1" stopColor="rgba(255,255,255,0)"/>
              </radialGradient>
              <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="rgba(247,215,36,.55)"/>
                <stop offset="0.55" stopColor="rgba(247,215,36,0)"/>
              </radialGradient>
            </defs>
            <ellipse cx="180" cy="252" rx="120" ry="10" fill="#000" opacity=".5"/>
            <rect x="80" y="40" width="180" height="180" rx="22" fill="url(#camBody)" stroke="rgba(255,255,255,.06)"/>
            <path d="M260 75 L 290 90 L 290 170 L 260 185 Z" fill="url(#camBody)" stroke="rgba(255,255,255,.04)"/>
            <rect x="92" y="52" width="156" height="156" rx="18" fill="url(#camFace)" stroke="rgba(255,255,255,.08)"/>
            <circle cx="170" cy="130" r="85" fill="url(#lensGlow)" opacity=".7"/>
            <circle cx="170" cy="130" r="62" fill="url(#lens)" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
            <circle cx="170" cy="130" r="50" fill="none" stroke="rgba(255,255,255,.06)"/>
            <circle cx="170" cy="130" r="38" fill="#03050A"/>
            <circle cx="170" cy="130" r="26" fill="url(#lensHi)"/>
            <circle cx="170" cy="130" r="6" fill="var(--accent)" opacity=".85">
              <animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="170" cy="130" r="14" fill="none" stroke="var(--accent)" strokeWidth="1" opacity=".25">
              <animate attributeName="r" values="10;26;10" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".5;0;.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="112" cy="68" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
            <circle cx="112" cy="68" r="1.4" fill="#42C77A">
              <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="228" cy="68" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
            <circle cx="112" cy="192" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
            <rect x="200" y="190" width="36" height="3" rx="1.5" fill="rgba(255,255,255,.1)"/>
            <rect x="135" y="218" width="70" height="3.5" rx="1.5" fill="rgba(255,255,255,.12)"/>
          </svg>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="vid-vignette" />

      <div className="container vid-hero-content">
        <div
          className="vid-eyebrow"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
        >
          <span className="status-dot"/>
          <span>{block?.eyebrow ?? 'NIKOM · АРХИВ ОТ РЕАЛНИ ПРОЕКТИ'}</span>
        </div>
        <h1
          className="vid-h1"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading1') }).toString()}
        >
          <StreamText text={block?.heading1 ?? 'Проектирани с инженерия.'}/>
          <br/>
          <StreamText text={block?.heading2 ?? 'Изпълнени с прецизност.'} startDelay={800}/>
        </h1>
        <p
          className="vid-lead"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
        >
          {block?.lead ?? '11 избрани реализации в здравеопазване, хотелиерство, ритейл и държавни обекти.'}
        </p>
        <div className="vid-cta">
          <a href="#projects" className="vid-btn vid-btn-primary">
            <span className="vid-kbd">⌘</span>
            {block?.ctaPrimaryLabel ?? 'Разгледай проектите'}
          </a>
          <a href={block?.ctaGhostHref ?? '/bg/kontakt'} className="vid-btn vid-btn-ghost">
            {block?.ctaGhostLabel ?? 'Заявете консултация'}
          </a>
        </div>
      </div>
    </section>
  )
}
