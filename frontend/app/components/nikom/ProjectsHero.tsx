'use client'

import React, { useEffect, useRef, useState } from 'react'
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
    videoLightUrl?: string | null
    videoDarkUrl?: string | null
    posterUrl?: string | null
  }
  index: number
  pageId: string
  pageType: string
}

// The page <main> renders OUTSIDE SiteChrome's ThemeProvider, so useTheme() is
// not available here. Read the active theme straight off <html data-theme> and
// react to toggles via a MutationObserver — this is the source of truth set by
// ThemeController/ThemeProvider.
function useHtmlTheme(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    const read = () =>
      setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
    read()
    const obs = new MutationObserver(read)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => obs.disconnect()
  }, [])
  return theme
}

// Houdini paint worklet is registered once per document.
let workletLoaded = false

export default function ProjectsHero({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    `pageBuilder[_key=="${block._key ?? ''}"].${field}`

  const theme = useHtmlTheme()
  const videoSrc = theme === 'dark' ? block?.videoDarkUrl : block?.videoLightUrl

  const sectionRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Register the ring-particles paint worklet once per document. Vendored at
  // /houdini/ringparticles.js; the particle colour swaps with the theme via CSS.
  useEffect(() => {
    if (typeof CSS === 'undefined' || !('paintWorklet' in CSS)) return
    if (!workletLoaded) {
      ;(CSS as unknown as { paintWorklet: { addModule: (u: string) => void } }).paintWorklet.addModule(
        '/houdini/ringparticles.js'
      )
      workletLoaded = true
    }
  }, [])

  // Performance: the paint worklet repaints every frame while the dot animation
  // runs, so stop it (and the video) whenever the hero is scrolled out of view.
  // The hero is off-screen for most of this long page, making this the biggest win.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        particlesRef.current?.classList.toggle('is-paused', !visible)
        const v = videoRef.current
        if (v) {
          if (visible) void v.play().catch(() => {})
          else v.pause()
        }
      },
      { threshold: 0 }
    )
    io.observe(section)
    return () => io.disconnect()
  }, [])

  // Pointer-follow ring, rAF-throttled so a burst of pointermove events collapses
  // to a single style write per frame.
  useEffect(() => {
    const section = sectionRef.current
    const particles = particlesRef.current
    if (!section || !particles) return

    let raf = 0
    let nx = 50
    let ny = 50
    const flush = () => {
      raf = 0
      particles.style.setProperty('--ring-x', String(nx))
      particles.style.setProperty('--ring-y', String(ny))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(flush)
    }
    const onMove = (e: PointerEvent) => {
      nx = (e.clientX / window.innerWidth) * 100
      ny = (e.clientY / window.innerHeight) * 100
      schedule()
    }
    const onLeave = () => {
      nx = 50
      ny = 50
      schedule()
    }

    section.addEventListener('pointermove', onMove, { passive: true })
    section.addEventListener('pointerleave', onLeave)
    return () => {
      section.removeEventListener('pointermove', onMove)
      section.removeEventListener('pointerleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="prj-video-hero" ref={sectionRef}>
      {/* Layer 0 — theme video. key forces a clean reload when the theme swaps the source. */}
      {videoSrc ? (
        <video
          key={videoSrc}
          ref={videoRef}
          className="vid-bg-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={block?.posterUrl ?? undefined}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}

      {/* Layer 1 — theme-aware scrim */}
      <div className="vid-overlay" aria-hidden="true" />

      {/* Layer 2 — Houdini dot-ring effect (colour swaps per theme via CSS) */}
      <div className="vid-particles" ref={particlesRef} aria-hidden="true" />

      <div className="container vid-hero-content">
        <div
          className="vid-eyebrow"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
        >
          <span className="status-dot" />
          <span>{block?.eyebrow}</span>
        </div>
        <h1
          className="vid-h1"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading1') }).toString()}
        >
          <StreamText text={block?.heading1 ?? ''} />
          <br />
          <StreamText text={block?.heading2 ?? ''} startDelay={800} />
        </h1>
        <p
          className="vid-lead"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
        >
          {block?.lead}
        </p>
        <div className="vid-cta">
          <a href="#projects" className="vid-btn vid-btn-primary">
            <span className="vid-kbd">⌘</span>
            {block?.ctaPrimaryLabel}
          </a>
          <a href={block?.ctaGhostHref} className="vid-btn vid-btn-ghost">
            {block?.ctaGhostLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
