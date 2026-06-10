'use client'

import React from 'react'
import { dataAttr } from '@/sanity/lib/utils'

type GalleryItem = {
  _key: string
  caption?: string | null
  image?: { asset?: { _ref?: string } | null; alt?: string } | null
  fallbackSrc?: string | null
  videoUrl?: string | null
}

type Props = {
  doc: {
    _id?: string
    title?: string | null
    heroImage?: { asset?: { _ref?: string } } | null
    heroImageFallback?: string | null
    gallery?: GalleryItem[] | null
  }
  pageId: string
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/\s]{11})/)
  return match?.[1] ?? null
}

function getImgSrc(item: GalleryItem, fallback: string): string {
  if (item.videoUrl) {
    const ytId = extractYouTubeId(item.videoUrl)
    return ytId
      ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
      : fallback
  }
  if (item.image?.asset?._ref) {
    const ref = item.image.asset._ref
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`
  }
  return item.fallbackSrc ?? fallback
}

type LightboxItem = {
  src: string
  caption: string
  videoUrl?: string | null
}

function Lightbox({
  items,
  startIndex,
  onClose,
}: {
  items: LightboxItem[]
  startIndex: number
  onClose: () => void
}) {
  const [idx, setIdx] = React.useState(startIndex)
  const [direction, setDirection] = React.useState(0)
  const touchRef = React.useRef({ x: 0, y: 0 })

  const go = React.useCallback(
    (dir: number) => {
      setDirection(dir)
      setIdx((i) => (i + dir + items.length) % items.length)
    },
    [items.length]
  )

  React.useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  React.useEffect(() => {
    ;[-1, 1].forEach((d) => {
      const i = (idx + d + items.length) % items.length
      if (!items[i].videoUrl) {
        const im = new window.Image()
        im.src = items[i].src
      }
    })
  }, [idx, items])

  const cur = items[idx]
  const ytId = cur.videoUrl ? extractYouTubeId(cur.videoUrl) : null

  return (
    <div
      className="lb-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => {
        const t = e.touches[0]
        touchRef.current = { x: t.clientX, y: t.clientY }
      }}
      onTouchEnd={(e) => {
        const t = e.changedTouches[0]
        const dx = t.clientX - touchRef.current.x
        const dy = t.clientY - touchRef.current.y
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      }}
    >
      <div className="lb-topbar">
        <div className="lb-counter meta">
          <span className="status-dot" />
          <span>
            {String(idx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '00')}
          </span>
        </div>
        <button className="lb-close" onClick={onClose} aria-label="Затвори">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <button className="lb-nav lb-prev" onClick={() => go(-1)} aria-label="Предишен">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="lb-nav lb-next" onClick={() => go(1)} aria-label="Следващ">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="lb-stage">
        <div key={idx} className={'lb-image-wrap lb-dir-' + (direction >= 0 ? 'next' : 'prev')}>
          {ytId ? (
            <div className="lb-video-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                className="lb-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cur.src} alt={cur.caption} className="lb-image" />
          )}
        </div>
      </div>

      <div className="lb-bottom">
        <div className="lb-caption">
          <span className="meta lb-kadr">KADR-{String(idx + 1).padStart(3, '0')}</span>
          <span className="lb-cap-text">{cur.caption}</span>
        </div>
        <div className="lb-thumbs">
          {items.map((item, i) => (
            <button
              key={i}
              className={'lb-thumb ' + (i === idx ? 'active' : '')}
              onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i) }}
              aria-label={`Кадър ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" />
              {item.videoUrl && (
                <span className="lb-thumb-play">▶</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProjectGallery({ doc, pageId }: Props) {
  const [open, setOpen] = React.useState<number | null>(null)

  const fallbackSrc = doc?.heroImageFallback ?? '/nikom/proj-tokuda.jpg'
  const rawGallery = doc?.gallery ?? []

  const items: LightboxItem[] =
    rawGallery.length > 0
      ? rawGallery.map((item, i) => ({
          src: getImgSrc(item, fallbackSrc),
          caption: item.caption ?? `Кадър ${i + 1}`,
          videoUrl: item.videoUrl,
        }))
      : [
          { src: fallbackSrc, caption: 'Изглед към обекта' },
          { src: fallbackSrc, caption: 'Детектори в основна зона' },
          { src: fallbackSrc, caption: 'Контролен панел' },
          { src: fallbackSrc, caption: 'Сензори в техническо помещение' },
          { src: fallbackSrc, caption: 'Изпитване на системата' },
          { src: fallbackSrc, caption: 'Документация при приемане' },
        ]

  return (
    <section className="section-pad single-gallery">
      <div className="container">
        <div className="sg-eyebrow-row">
          <div className="eyebrow">Галерия · {items.length} кадри</div>
          <p className="sg-nav-hint meta">Кликнете за fullscreen · навигация с ← → или swipe</p>
        </div>
        <div
          className="sg-grid"
          data-sanity={dataAttr({ id: pageId, type: 'project', path: 'gallery' }).toString()}
        >
          {items.map((item, i) => (
            <button
              type="button"
              className={'sg-tile ' + (i === 0 ? 'sg-tile-wide' : '')}
              key={rawGallery[i]?._key ?? i}
              onClick={() => setOpen(i)}
              aria-label={`Отвори кадър ${i + 1}: ${item.caption}`}
              data-sanity={
                rawGallery[i]?._key
                  ? dataAttr({
                      id: pageId,
                      type: 'project',
                      path: `gallery[_key=="${rawGallery[i]._key}"]`,
                    }).toString()
                  : undefined
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.caption} />
              {item.videoUrl && (
                <div className="sg-tile-play" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" />
                    <polygon points="10,8 18,12 10,16" fill="white" />
                  </svg>
                </div>
              )}
              <div className="sg-tile-tag meta">KADR-{String(i + 1).padStart(3, '0')}</div>
              <div className="sg-tile-zoom" aria-hidden="true">
                {item.videoUrl ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="16" y1="16" x2="22" y2="22" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox items={items} startIndex={open} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
