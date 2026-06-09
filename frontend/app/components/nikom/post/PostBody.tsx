'use client'

import type { PortableTextBlock } from 'next-sanity'
import { CustomPortableText } from '@/app/components/PortableText'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  doc: {
    _id?: string
    content?: PortableTextBlock[] | null
    excerpt?: string | null
    tags?: string[] | null
    authorName?: string | null
    author?: { firstName?: string | null; lastName?: string | null } | null
  }
  pageId: string
}

export function PostBody({ doc, pageId }: Props) {
  const content = doc?.content && doc.content.length > 0 ? doc.content : null
  const tags = doc?.tags ?? []
  const authorName = doc?.author
    ? `${doc.author.firstName ?? ''} ${doc.author.lastName ?? ''}`.trim()
    : (doc?.authorName ?? 'NIKOM Security')
  const authorInitials = authorName
    .split(' ')
    .map((w: string) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Build TOC from portable text h2 blocks
  const h2Items: { key: string; text: string }[] = []
  if (content) {
    content.forEach((block: PortableTextBlock) => {
      if (block.style === 'h2' && block._key) {
        const text = (block.children as Array<{ text?: string }>)
          ?.map((c) => c.text ?? '')
          .join('') ?? ''
        h2Items.push({ key: block._key as string, text })
      }
    })
  }

  return (
    <article className="post-body">
      <div className="container post-container">
        <div className="post-grid">
          <div className="post-main">
            {content ? (
              <CustomPortableText value={content} />
            ) : (
              <>
                <p className="post-lead"
                  data-sanity={dataAttr({ id: pageId, type: 'post', path: 'excerpt' }).toString()}
                >
                  {doc?.excerpt ?? 'Текстът на статията ще бъде зареден след публикуване в Sanity.'}
                </p>
                <h2 className="post-h2">Технически контекст</h2>
                <p className="post-p">Тази статия задълбочено разглежда темата с фокус върху практическо приложение в реални проекти от портфолиото на НИКОМ.</p>
                <h2 className="post-h2">Ключови наблюдения</h2>
                <ul className="post-list">
                  <li>Стандартите се развиват с темпото на технологиите</li>
                  <li>Интеграцията остава ключов фактор за успех</li>
                  <li>Поддръжката определя дългосрочната ефективност</li>
                </ul>
                <p className="post-p">За повече информация или индивидуална консултация по темата, свържете се с екипа на НИКОМ.</p>
              </>
            )}

            <div
              className="post-tags"
              data-sanity={dataAttr({ id: pageId, type: 'post', path: 'tags' }).toString()}
            >
              <span className="meta">Тагове:</span>
              {tags.map((t) => (
                <span className="chip" key={t}>#{t}</span>
              ))}
            </div>

            <div className="post-share">
              <span className="meta">Сподели:</span>
              <button className="post-share-btn" aria-label="Facebook">f</button>
              <button className="post-share-btn" aria-label="LinkedIn">in</button>
              <button className="post-share-btn" aria-label="X">𝕏</button>
              <button className="post-share-btn" aria-label="Copy link">⧉</button>
            </div>
          </div>

          <aside className="post-side">
            {h2Items.length > 0 && (
              <div className="post-toc">
                <div className="eyebrow">Съдържание</div>
                <ol>
                  {h2Items.map((item) => (
                    <li key={item.key}>
                      <a href={`#${item.key}`}>{item.text}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="post-author-card">
              <div className="eyebrow">Автор</div>
              <div className="pa-avatar">{authorInitials || 'NK'}</div>
              <div
                className="pa-name"
                data-sanity={dataAttr({ id: pageId, type: 'post', path: 'authorName' }).toString()}
              >
                {authorName}
              </div>
              <div className="pa-role">Инженер · NIKOM Security</div>
              <p className="pa-bio">Над 15 години опит в&nbsp;проектиране и&nbsp;интеграция на&nbsp;инженерни системи за&nbsp;сигурност и&nbsp;пожарна безопасност.</p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
