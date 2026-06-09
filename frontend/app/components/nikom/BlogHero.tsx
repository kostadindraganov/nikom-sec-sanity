'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr, imageUrl } from '@/sanity/lib/utils'

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
  const eyebrow = block?.eyebrow
  const heading = block?.heading
  const lead = block?.lead

  const bgSrc = imageUrl(block?.backgroundImage, '/nikom/proj-tokuda.jpg')

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
          dangerouslySetInnerHTML={{ __html: lead ?? '' }}
        />
      </div>
    </section>
  )
}
