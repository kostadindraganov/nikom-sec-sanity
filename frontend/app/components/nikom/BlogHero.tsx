'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  block?: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    backgroundImage?: { asset?: { _ref?: string }; alt?: string }
  }
  index?: number
  pageId?: string
  pageType?: string
}

export default function BlogHero({ block, index, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow ?? 'БЛОГ · NIKOM SECURITY'
  const heading = block?.heading ?? 'Инженерни статии за сигурност, пожарна безопасност и интеграция.'
  const lead = block?.lead ?? 'Технически прегледи, case studies и експертни мнения от екипа на НИКОМ.'

  const bgSrc = '/nikom/proj-tokuda.jpg'

  return (
    <section className="blog-hero">
      <div className="bh-img-wrap">
        <img src={bgSrc} alt="Blog hero background" />
        <div className="bh-gradient" />
        <div className="bh-scan" />
      </div>
      <div className="container bh-inner">
        <div
          className="bh-eyebrow"
          data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].eyebrow` }).toString() : undefined}
        >
          <span className="status-dot" />
          <span>{eyebrow}</span>
        </div>
        <h1
          className="bh-h1"
          data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].heading` }).toString() : undefined}
        >
          <StreamText text={heading} />
        </h1>
        <p
          className="bh-lead"
          data-sanity={pageId && block?._key ? dataAttr({ id: pageId, type: pageType ?? '', path: `pageBuilder[_key=="${block._key}"].lead` }).toString() : undefined}
          dangerouslySetInnerHTML={{ __html: lead }}
        />
      </div>
    </section>
  )
}
