'use client'

import { StreamText, LazyImg } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type Post = {
  _id?: string
  title?: string
  excerpt?: string
  coverImageUrl?: string
  authorName?: string
  date?: string
  readTime?: number
  tags?: string[]
  categoryLabel?: string
  slug?: { current?: string }
  featured?: boolean
}

type Props = {
  block?: {
    _key?: string
    eyebrow?: string
    fallbackTitle?: string
    fallbackExcerpt?: string
    fallbackAuthor?: string
    fallbackDate?: string
    fallbackReadMin?: number
    fallbackTags?: string[]
    fallbackCategory?: string
    fallbackSlug?: string
  }
  index?: number
  pageId?: string
  pageType?: string
  featuredPost?: Post
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['януари','февруари','март','април','май','юни','юли','август','септември','октомври','ноември','декември']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function BlogFeatured({ block, index, pageId, pageType, featuredPost }: Props) {
  const eyebrow = block?.eyebrow ?? 'Избрана статия'

  const title = featuredPost?.title ?? block?.fallbackTitle ?? 'Какво е EN 54 и защо имаме нужда от сертифицирани системи'
  const excerpt = featuredPost?.excerpt ?? block?.fallbackExcerpt ?? 'Подробно обяснение на европейския стандарт за пожароизвестителни системи и какво трябва да знае всеки управител на сграда.'
  const imgSrc = featuredPost?.coverImageUrl ?? '/nikom/proj-tokuda.jpg'
  const author = featuredPost?.authorName ?? block?.fallbackAuthor ?? 'инж. Николай Васев'
  const date = featuredPost?.date ?? block?.fallbackDate ?? '2026-04-12'
  const readMin = featuredPost?.readTime ?? block?.fallbackReadMin ?? 8
  const tags = featuredPost?.tags ?? block?.fallbackTags ?? ['EN 54', 'Пожароизвестяване', 'Сертификати']
  const category = featuredPost?.categoryLabel ?? block?.fallbackCategory ?? 'Стандарти'
  const slug = featuredPost?.slug?.current ?? block?.fallbackSlug ?? 'kakvo-e-en54-i-zashto-imame-nuzhda'
  const href = `/bg/blog/${slug}`

  return (
    <section className="section-pad blog-featured">
      <div className="container">
        <div className="bf-grid">
          <a className="bf-img-wrap" href={href}>
            <LazyImg src={imgSrc} alt={title} />
            <span className="chip solid bf-cat">{category}</span>
            <div className="bf-corners">
              <span className="corn tl" /><span className="corn tr" />
              <span className="corn bl" /><span className="corn br" />
            </div>
            <div className="bf-featured-tag meta">★ ИЗБРАНА</div>
          </a>
          <div className="bf-content">
            <div
              className="eyebrow"
              data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].eyebrow` }).toString() : undefined}
            >
              {eyebrow}
            </div>
            <h2
              className="h2 bf-title"
              data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].fallbackTitle` }).toString() : undefined}
            >
              <StreamText text={title} />
            </h2>
            <p className="bf-excerpt">{excerpt}</p>
            <div className="bf-meta">
              <div className="bf-meta-row">
                <span className="meta">Автор</span>
                <span className="bf-meta-v">{author}</span>
              </div>
              <div className="bf-meta-row">
                <span className="meta">Дата</span>
                <span className="bf-meta-v">{formatDate(date)}</span>
              </div>
              <div className="bf-meta-row">
                <span className="meta">Време за прочит</span>
                <span className="bf-meta-v">{readMin} мин</span>
              </div>
            </div>
            <div className="bf-tags">
              {tags.map(t => <span className="chip" key={t}>#{t}</span>)}
            </div>
            <a className="btn btn-primary" href={href}>Прочети статията <Icons.Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
