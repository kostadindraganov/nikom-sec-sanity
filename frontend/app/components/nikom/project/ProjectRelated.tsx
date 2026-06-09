'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type RelatedProject = {
  _key?: string
  _id?: string
  title?: string | null
  sectorLabel?: string | null
  year?: string | null
  slug?: string | null
  heroImage?: { asset?: { _ref?: string }; alt?: string } | null
}

type Props = {
  doc: {
    _id?: string
    related?: RelatedProject[] | null
  }
  pageId: string
}

function getImgSrc(proj: RelatedProject): string {
  if (proj.heroImage?.asset?._ref) {
    const ref = proj.heroImage.asset._ref
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`
  }
  return '/nikom/project1.jpg'
}

export function ProjectRelated({ doc, pageId }: Props) {
  const others = (doc?.related ?? []).slice(0, 3)

  return (
    <section className="section-pad single-related">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сходни проекти · {String(others.length).padStart(2, '0')}</div>
            <h2 className="h2">
              <StreamText text="Други реализации от архива." />
            </h2>
          </div>
          <a className="btn btn-ghost btn-sm" href="/bg/proekti">
            Виж всички <Icons.Arrow />
          </a>
        </div>
        <div
          className="sr-grid"
          data-sanity={dataAttr({ id: pageId, type: 'project', path: 'related' }).toString()}
        >
          {others.map((o) => (
            <a
              className="sr-card"
              key={o._key ?? o._id ?? o.slug ?? o.title}
              href={`/bg/proekti/${o.slug ?? ''}`}
            >
              <div className="sr-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getImgSrc(o)} alt={o.title ?? ''} />
                <span className="chip solid sr-sector">{o.sectorLabel ?? 'Сигурност'}</span>
              </div>
              <div className="sr-body">
                <span className="meta">{o.year ?? ''}</span>
                <h3 className="h4">{o.title ?? 'Проект'}</h3>
                <span className="sr-arrow">
                  Виж <Icons.Arrow />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
