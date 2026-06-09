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

const DEFAULT_ITEMS: TickerItem[] = [
  { _key: 'tk1', num: '800+', text: 'завършени обекта' },
  { _key: 'tk2', num: '24/7', text: 'дежурен инженер' },
  { _key: 'tk3', num: '< 30 мин', text: 'критична реакция' },
  { _key: 'tk4', num: '20+ г.', text: 'инженерен опит' },
  { _key: 'tk5', num: 'ISO 27001', text: 'сертифицирано' },
  { _key: 'tk6', num: '98.6%', text: 'SLA точност' },
  { _key: 'tk7', num: '248', text: 'активни нод-а' },
  { _key: 'tk8', num: 'EN 54', text: 'съответствие' },
]

export default function HomeTicker({ block, pageId, pageType }: Props) {
  const items = block?.items ?? DEFAULT_ITEMS
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
