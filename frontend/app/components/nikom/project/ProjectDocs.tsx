'use client'

import type { PortableTextBlock } from 'next-sanity'
import { StreamText } from '@/app/components/nikom/animations'
import { CustomPortableText } from '@/app/components/PortableText'
import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  doc: {
    _id?: string
    body?: PortableTextBlock[] | null
  }
  pageId: string
}

export function ProjectDocs({ doc, pageId }: Props) {
  const body = doc?.body && doc.body.length > 0 ? doc.body : null

  if (!body) return null

  return (
    <section className="section-pad single-docs">
      <div className="container">
        <div className="sd-inner">
          <header className="sd-header">
            <div className="eyebrow">За обекта</div>
            <h2 className="h2 sd-title">
              <StreamText text="Повече за обекта." />
            </h2>
          </header>

          <div className="sd-quote-card">
            <span className="sd-qmark" aria-hidden="true">&ldquo;</span>
            <div
              className="sd-body"
              data-sanity={dataAttr({ id: pageId, type: 'project', path: 'body' }).toString()}
            >
              <CustomPortableText value={body} />
            </div>
            <span className="sd-qmark sd-qmark-close" aria-hidden="true">&rdquo;</span>
          </div>
        </div>
      </div>
    </section>
  )
}
