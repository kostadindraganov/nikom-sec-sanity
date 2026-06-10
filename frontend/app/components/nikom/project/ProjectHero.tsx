'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  doc: {
    _id?: string
    _key?: string
    title?: string | null
    summary?: string | null
    sector?: string | null
    sectorLabel?: string | null
    year?: string | null
    classified?: boolean | null
    heroImage?: { asset?: { _ref?: string }; alt?: string } | null
    index?: number | null
  }
  pageId: string
}

export function ProjectHero({ doc, pageId }: Props) {
  const title = doc?.title ?? 'Проект НIKOM'
  const sectorLabel = doc?.sectorLabel ?? 'Сигурност'
  const year = doc?.year ?? '2024'
  const heroImgSrc = doc?.heroImage?.asset?._ref
    ? undefined
    : '/nikom/project1.jpg'
  const classified = doc?.classified ?? false
  const projectNum = doc?.index != null ? String(doc.index + 1).padStart(3, '0') : '001'

  return (
    <section className="single-hero">
      <div className="sh-img-wrap">
        {doc?.heroImage?.asset?._ref ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${doc.heroImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}`}
            alt={doc?.heroImage?.alt ?? title}
            data-sanity={dataAttr({ id: pageId, type: 'project', path: 'heroImage' }).toString()}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImgSrc} alt={title} />
        )}
        <div className="sh-gradient" />
        <div className="sh-scan" />
      </div>
      <div className="container sh-inner">
        <div className="sh-breadcrumb">
          <a href="/bg/proekti">Проекти</a>
          <span className="sh-bc-sep">/</span>
          <span
            data-sanity={dataAttr({ id: pageId, type: 'project', path: 'sectorLabel' }).toString()}
          >
            {sectorLabel}
          </span>
        </div>
        <h1
          className="sh-h1"
          data-sanity={dataAttr({ id: pageId, type: 'project', path: 'title' }).toString()}
        >
          <StreamText text={title} />
        </h1>
        {doc?.summary && (
          <p
            className="sh-summary"
            data-sanity={dataAttr({ id: pageId, type: 'project', path: 'summary' }).toString()}
          >
            {doc.summary}
          </p>
        )}
        <div className="sh-meta-row">
          <span
            className="chip solid"
            data-sanity={dataAttr({ id: pageId, type: 'project', path: 'sectorLabel' }).toString()}
          >
            {sectorLabel}
          </span>
          <span
            className="chip dark"
            data-sanity={dataAttr({ id: pageId, type: 'project', path: 'year' }).toString()}
          >
            {year}
          </span>
          {classified && (
            <span
              className="chip"
              style={{ background: 'var(--accent-ink)', color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              CLASSIFIED
            </span>
          )}
          <span className="meta sh-id">ПРОЕКТ № {projectNum}</span>
        </div>
      </div>
    </section>
  )
}
