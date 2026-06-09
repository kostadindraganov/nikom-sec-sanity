'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  doc: {
    _id?: string
    title?: string | null
    categoryLabel?: string | null
    authorName?: string | null
    author?: { firstName?: string | null; lastName?: string | null } | null
    date?: string | null
    readTime?: number | null
    coverImage?: { asset?: { _ref?: string }; alt?: string } | null
    coverImageUrl?: string | null
    pathname?: string | null
  }
  pageId: string
}

function formatBlogDate(iso: string | null | undefined): string {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function PostHero({ doc, pageId }: Props) {
  const title = doc?.title ?? 'Заглавие на статия'
  const category = doc?.categoryLabel ?? 'Стандарти'
  const authorName = doc?.author
    ? `${doc.author.firstName ?? ''} ${doc.author.lastName ?? ''}`.trim()
    : (doc?.authorName ?? 'NIKOM Security')
  const dateStr = formatBlogDate(doc?.date)
  const readMin = doc?.readTime ?? 5
  const imgSrc = doc?.coverImage?.asset?._ref
    ? undefined
    : (doc?.coverImageUrl ?? '/nikom/proj-tokuda.jpg')
  const imgAlt = doc?.coverImage?.alt ?? title

  return (
    <section className="post-hero">
      <div className="ph-img-wrap">
        {doc?.coverImage?.asset?._ref ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${doc.coverImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`}
            alt={imgAlt}
            data-sanity={dataAttr({ id: pageId, type: 'post', path: 'coverImage' }).toString()}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgSrc} alt={imgAlt} />
        )}
        <div className="ph-gradient" />
        <div className="ph-scan" />
      </div>
      <div className="container ph-inner">
        <div className="ph-breadcrumb">
          <a href="/bg/blog">Блог</a>
          <span className="ph-bc-sep">/</span>
          <span data-sanity={dataAttr({ id: pageId, type: 'post', path: 'categoryLabel' }).toString()}>
            {category}
          </span>
        </div>
        <h1
          className="ph-h1"
          data-sanity={dataAttr({ id: pageId, type: 'post', path: 'title' }).toString()}
        >
          <StreamText text={title} />
        </h1>
        <div className="ph-meta">
          <span
            className="chip solid"
            data-sanity={dataAttr({ id: pageId, type: 'post', path: 'categoryLabel' }).toString()}
          >
            {category}
          </span>
          <span className="ph-meta-item">
            <span className="meta">Автор:</span>
            <strong data-sanity={dataAttr({ id: pageId, type: 'post', path: 'authorName' }).toString()}>
              {authorName}
            </strong>
          </span>
          <span className="ph-meta-item">
            <span className="meta">Дата:</span>
            <strong data-sanity={dataAttr({ id: pageId, type: 'post', path: 'date' }).toString()}>
              {dateStr}
            </strong>
          </span>
          <span className="ph-meta-item">
            <span className="meta">Прочит:</span>
            <strong data-sanity={dataAttr({ id: pageId, type: 'post', path: 'readTime' }).toString()}>
              {readMin} мин
            </strong>
          </span>
        </div>
      </div>
    </section>
  )
}
