'use client'

import { Marquee } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type TickerItem = {
  _key: string
  num?: string
  text?: string
}

type Props = {
  block: {
    _key?: string
    items?: TickerItem[]
    speed?: number
  }
  index: number
  pageId: string
  pageType: string
}

export default function HomeTicker({ block, pageId, pageType }: Props) {
  const items = block?.items ?? []
  const speed = block?.speed ?? 45
  const blockKey = block?._key ?? ''

  return (
    <div
      className="ticker"
      data-sanity={dataAttr({
        id: pageId,
        type: pageType,
        path: `pageBuilder[_key=="${blockKey}"].items`,
      }).toString()}
    >
      <Marquee speed={speed} className="on-dark">
        {items.map((it) => (
          <span key={it._key}>
            <span
              className="ticker-item"
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: `pageBuilder[_key=="${blockKey}"].items[_key=="${it._key}"]`,
              }).toString()}
            >
              <span className="num">{it.num ?? ''}</span>
              <span>{it.text ?? ''}</span>
            </span>
            <span className="ticker-sep" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
