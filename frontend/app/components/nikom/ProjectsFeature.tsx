'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr, imageUrl } from '@/sanity/lib/utils'

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    title?: string
    year?: string
    sectorLabel?: string
    image?: { asset?: { _ref?: string }; alt?: string } | null
    imageFallback?: string
    systems?: string[]
    kpis?: { _key?: string; label?: string; value?: string }[]
    quoteText?: string
    quoteAuthor?: string
    quoteRole?: string
  }
  index: number
  pageId: string
  pageType: string
}

export default function ProjectsFeature({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    `pageBuilder[_key=="${block._key ?? ''}"].${field}`

  const imgSrc = imageUrl(block?.image, block?.imageFallback ?? '')
  const imgAlt = block?.title
  const systems = block?.systems ?? []
  const kpis = block?.kpis ?? []

  return (
    <section className="section-pad projects-feature">
      <div className="container">
        <div className="feat-grid">
          <div className="feat-img-wrap">
            <img
              src={imgSrc}
              alt={imgAlt}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('image') }).toString()}
            />
            <div className="feat-img-tag">
              <span className="chip dark">{block?.year}</span>
              <span className="chip solid">{block?.sectorLabel}</span>
            </div>
            <div className="feat-img-corners">
              <span className="corn tl"/><span className="corn tr"/>
              <span className="corn bl"/><span className="corn br"/>
            </div>
          </div>
          <div className="feat-content">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
            >
              {block?.eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('title') }).toString()}
            >
              <StreamText text={block?.title ?? ''}/>
            </h2>
            <div
              className="feat-systems"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('systems') }).toString()}
            >
              {systems.map((s, i) => <span className="chip" key={i}>{s}</span>)}
            </div>
            <div
              className="feat-kpi"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('kpis') }).toString()}
            >
              {kpis.map((k, i) => (
                <div key={k._key ?? i}>
                  <div className="meta">{k.label}</div>
                  <div className="kpi-v">{k.value}</div>
                </div>
              ))}
              <div>
                <div className="meta">Период</div>
                <div className="kpi-v">{block?.year}</div>
              </div>
            </div>
            <blockquote className="feat-quote">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
                <path d="M0 24V12C0 5.4 5.4 0 12 0v6c-3.3 0-6 2.7-6 6h6v12H0zm18 0V12C18 5.4 23.4 0 30 0v6c-3.3 0-6 2.7-6 6h6v12H18z" opacity=".25"/>
              </svg>
              <p
                data-sanity={dataAttr({ id: pageId, type: pageType, path: path('quoteText') }).toString()}
              >
                {block?.quoteText}
              </p>
              <footer>
                <strong
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: path('quoteAuthor') }).toString()}
                >
                  {block?.quoteAuthor}
                </strong>
                <span
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: path('quoteRole') }).toString()}
                >
                  {block?.quoteRole}
                </span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
