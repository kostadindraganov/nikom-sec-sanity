'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'

type RelatedPost = {
  _id?: string
  title?: string | null
  pathname?: string | null
  categoryLabel?: string | null
  date?: string | null
  readTime?: number | null
  coverImage?: { asset?: { _ref?: string }; alt?: string } | null
  coverImageUrl?: string | null
}

type Props = {
  related?: RelatedPost[] | null
  pageId?: string
}

function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function PostRelated({ related }: Props) {
  const posts = related ?? []
  const heading = 'Прочетете още от блога.'
  const count = String(posts.length).padStart(2, '0')

  return (
    <section className="section-pad post-related">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сходни статии · {count}</div>
            <h2 className="h2"><StreamText text={heading} /></h2>
          </div>
          <a className="btn btn-ghost btn-sm" href="/bg/blog">
            Виж всички <Icons.Arrow />
          </a>
        </div>
        <div className="pr-grid">
          {posts.map((o) => {
            const imgSrc = o?.coverImage?.asset?._ref
              ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${o.coverImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`
              : (o?.coverImageUrl ?? '/nikom/proj-tokuda.jpg')
            const href = o?.pathname ? `/bg${o.pathname}` : '/bg/blog'
            return (
              <a className="pr-card" key={o._id ?? o.pathname} href={href}>
                <div className="pr-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={o?.coverImage?.alt ?? o?.title ?? ''} />
                  <span className="chip solid pr-cat">{o?.categoryLabel ?? 'Блог'}</span>
                </div>
                <div className="pr-body">
                  <span className="meta">{formatBlogDate(o?.date)}{o?.readTime ? ` · ${o.readTime} мин` : ''}</span>
                  <h3 className="h4">{o?.title ?? ''}</h3>
                  <span className="pr-arrow">Прочети <Icons.Arrow /></span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
