'use client'

import React from 'react'
import { StreamText, LazyImg } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type Post = {
  _id: string
  id?: string
  title: string
  excerpt?: string
  coverImageUrl?: string
  authorName?: string
  date?: string
  readTime?: number
  tags?: string[]
  categoryLabel?: string
  category?: string
  slug?: { current?: string } | string
  featured?: boolean
}

type Category = { id: string; label: string }

type Props = {
  block?: {
    _key?: string
    eyebrow?: string
    heading?: string
    initialCount?: number
    categories?: Category[]
  }
  index?: number
  pageId?: string
  pageType?: string
  posts?: Post[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  const months = ['януари','февруари','март','април','май','юни','юли','август','септември','октомври','ноември','декември']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function getPostSlug(post: Post): string {
  if (typeof post.slug === 'string') return post.slug
  return post.slug?.current ?? post.id ?? post._id
}

function BlogCard({ p, index }: { p: Post; index: number }) {
  const ref = React.useRef<HTMLAnchorElement>(null)
  const [phase, setPhase] = React.useState('idle')

  React.useEffect(() => {
    if (!ref.current) return
    let t1: ReturnType<typeof setTimeout> | null = null
    let t2: ReturnType<typeof setTimeout> | null = null
    const trigger = () => {
      const delay = Math.min(index, 6) * 80
      t1 = setTimeout(() => {
        setPhase('scanning')
        t2 = setTimeout(() => setPhase('done'), 1000)
      }, delay)
    }
    const rect = ref.current.getBoundingClientRect()
    const inView = rect.top < (window.innerHeight || 800) + 300
    if (inView) {
      trigger()
      return () => { if (t1) clearTimeout(t1); if (t2) clearTimeout(t2) }
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { trigger(); io.disconnect() }
    }, { threshold: 0, rootMargin: '300px 0px' })
    io.observe(ref.current)
    const fallback = setTimeout(trigger, 3000)
    return () => { io.disconnect(); clearTimeout(fallback); if (t1) clearTimeout(t1); if (t2) clearTimeout(t2) }
  }, [index])

  const href = `/bg/blog/${getPostSlug(p)}`

  return (
    <a ref={ref} className={`bl-card phase-${phase}`} href={href}>
      <div className="bl-scan-overlay" aria-hidden="true">
        <span className="bl-scan-line" />
      </div>
      <div className="bl-card-inner">
        <div className="bl-card-img">
          <LazyImg src={p.coverImageUrl ?? '/nikom/proj-tokuda.jpg'} alt={p.title} />
          <div className="bl-img-veil" />
          <span className="chip solid bl-card-cat">{p.categoryLabel ?? p.category ?? ''}</span>
          <div className="bl-card-corners">
            <span className="corn tl" /><span className="corn tr" />
            <span className="corn bl" /><span className="corn br" />
          </div>
        </div>
        <div className="bl-card-body">
          <div className="bl-card-meta">
            <span className="meta">{p.date ? formatDate(p.date) : ''}</span>
            <span className="meta">·</span>
            <span className="meta">{p.readTime ?? 0} мин</span>
          </div>
          <h3 className="h4 bl-card-title">{p.title}</h3>
          <p className="bl-card-excerpt">{p.excerpt}</p>
          <div className="bl-card-foot">
            <span className="bl-author">{p.authorName ?? ''}</span>
            <span className="bl-arrow">Прочети <Icons.Arrow /></span>
          </div>
        </div>
      </div>
    </a>
  )
}

function NewsletterWidget() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); return }
      setStatus(data.duplicate ? 'duplicate' : 'success')
      if (!data.duplicate) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bl-side-card bl-newsletter">
      <div className="eyebrow">Нюзлетър</div>
      <h4 className="h4">Получавайте нови статии</h4>
      <p>Веднъж месечно, без spam. Може да се отпишете по всяко време.</p>
      {status === 'success' ? (
        <div className="bl-nl-success meta">Успешно се абонирахте!</div>
      ) : status === 'duplicate' ? (
        <div className="bl-nl-success meta">Вече сте абонирани с този имейл.</div>
      ) : (
        <form className="bl-nl-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Вашият имейл"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <button className="btn btn-primary btn-sm" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? '…' : 'Запиши'}
          </button>
          {status === 'error' && <p className="bl-nl-error meta">Грешка. Опитайте отново.</p>}
        </form>
      )}
    </div>
  )
}

export default function BlogList({ block, index, pageId, pageType, posts: postsProp = [] }: Props) {
  // Posts come from the dedicated /blog route (prop) or, when rendered generically,
  // from data injected onto the block. Either way BlogList stays fully editable.
  const posts: Post[] = postsProp.length ? postsProp : ((block as { posts?: Post[] })?.posts ?? [])
  const eyebrow = block?.eyebrow
  const heading = block?.heading
  const initialCount = block?.initialCount ?? 4

  const blockCategories: Category[] = (block as any)?.categories ?? []
  const categories: Category[] = [
    { id: 'all', label: 'Всички' },
    ...blockCategories,
  ]

  const topTags = React.useMemo(() => {
    const freq: Record<string, number> = {}
    posts.forEach(p => (p.tags ?? []).forEach(t => { freq[t] = (freq[t] || 0) + 1 }))
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([t]) => t)
  }, [posts])

  const [filter, setFilter] = React.useState('all')
  const [tagFilter, setTagFilter] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState('')
  const [visible, setVisible] = React.useState(initialCount)

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { all: posts.length }
    posts.forEach(p => {
      const cat = p.category ?? ''
      if (cat) c[cat] = (c[cat] || 0) + 1
    })
    return c
  }, [posts])

  const filtered = React.useMemo(() => {
    let list = posts
    if (filter !== 'all') list = list.filter(p => p.category === filter)
    if (tagFilter) list = list.filter(p => (p.tags ?? []).includes(tagFilter))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? '').toLowerCase().includes(q) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [posts, filter, tagFilter, query])

  React.useEffect(() => { setVisible(initialCount) }, [filter, tagFilter, query, initialCount])

  const sentinelRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (visible >= filtered.length) return
    if (!sentinelRef.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(v => Math.min(v + 4, filtered.length))
    }, { rootMargin: '300px' })
    io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [visible, filtered.length])

  return (
    <section className="section-pad blog-list">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].eyebrow` }).toString() : undefined}
            >
              {eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].heading` }).toString() : undefined}
            >
              <StreamText text={heading} />
            </h2>
          </div>
          <div className="bl-filter-bar">
            <div className="bl-filter-rail">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={'prj-filter-btn ' + (filter === cat.id ? 'active' : '')}
                  onClick={() => setFilter(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="prj-filter-count">{counts[cat.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bl-layout">
          <div className="bl-grid">
            {filtered.length === 0 ? (
              <div className="bl-empty">
                <div className="meta">Няма статии съответстващи на филтрите.</div>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: 12 }}
                  onClick={() => { setFilter('all'); setTagFilter(null); setQuery('') }}
                >
                  Изчисти филтри
                </button>
              </div>
            ) : (
              filtered.slice(0, visible).map((p, i) => <BlogCard key={p._id} p={p} index={i} />)
            )}
          </div>

          <aside className="bl-sidebar">
            <div className="bl-side-card bl-search">
              <div className="eyebrow">Търсене</div>
              <div className="bl-search-wrap">
                <svg className="bl-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.5" y2="16.5" />
                </svg>
                <input
                  type="search"
                  className="bl-search-input"
                  placeholder="Търси статия, ключов термин..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {query && (
                  <button className="bl-search-clear" onClick={() => setQuery('')} aria-label="Изчисти">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                  </button>
                )}
              </div>
              {query && (
                <div className="bl-search-hint meta">
                  Намерени: <strong>{filtered.length}</strong> / {posts.length}
                </div>
              )}
            </div>

            <div className="bl-side-card">
              <div className="eyebrow">Топ тагове</div>
              <div className="bl-tags-cloud">
                {topTags.map(t => (
                  <button
                    key={t}
                    className={'chip ' + (tagFilter === t ? 'solid' : '')}
                    onClick={() => setTagFilter(tagFilter === t ? null : t)}
                  >#{t}</button>
                ))}
              </div>
              {tagFilter && (
                <button className="bl-clear-tag" onClick={() => setTagFilter(null)}>
                  Изчисти филтър за #{tagFilter} ✕
                </button>
              )}
            </div>

            <NewsletterWidget />

            <div className="bl-side-card bl-recent">
              <div className="eyebrow">Последни</div>
              <ul>
                {posts.slice(0, 4).map(p => (
                  <li key={p._id}>
                    <a href={`/bg/blog/${getPostSlug(p)}`}>
                      <span className="bl-rec-date">
                        {p.date ? formatDate(p.date).split(' ').slice(0, 2).join(' ') : ''}
                      </span>
                      <span className="bl-rec-title">{p.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {visible < filtered.length && (
          <div className="bl-sentinel" ref={sentinelRef}>
            <div className="prj-loader"><span /><span /><span /></div>
            <div className="meta">Зареждане още {filtered.length - visible} статии…</div>
          </div>
        )}
        {visible >= filtered.length && filtered.length > initialCount && (
          <div className="prj-end"><div className="meta">— Край на архива —</div></div>
        )}
      </div>
    </section>
  )
}
