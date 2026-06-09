'use client'

import { stegaClean } from 'next-sanity'
import { Counter, StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type OfficeCard = {
  _key: string
  num?: string
  city?: string
  address?: string
  phone?: string
  email?: string
  hours?: string
  linkLabel?: string
  linkHref?: string
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    offices?: OfficeCard[]
  }
  index: number
  pageId: string
  pageType: string
}

function renderAddress(text: string) {
  // Strip stega before splitting on '\n' — see StreamText note in animations.tsx.
  return stegaClean(text).split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
  ))
}

export default function ContactInfo({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].${field}` }).toString()

  const offices = block?.offices ?? []

  return (
    <section className="section-pad ctc-info">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>
              {block?.eyebrow}
            </div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={block?.heading} />
            </h2>
          </div>
          <p className="section-lead" data-sanity={path('lead')}>
            {block?.lead}
          </p>
        </div>

        <div
          className="ctc-info-grid"
          data-sanity={path('offices')}
        >
          {offices.map((card) => {
            const cardPath = `pageBuilder[_key=="${block._key}"].offices[_key=="${card._key}"]`
            const cardAttr = (field: string) =>
              dataAttr({ id: pageId, type: pageType, path: `${cardPath}.${field}` }).toString()

            /* Card 04 is the reaction-time card with counters */
            const isReactionCard = (card.num ?? '') === '04' || card.city === 'Време за реакция'

            return (
              <div
                key={card._key}
                className="ctc-info-card"
                data-sanity={dataAttr({ id: pageId, type: pageType, path: cardPath }).toString()}
              >
                <div className="ctc-info-num meta" data-sanity={cardAttr('num')}>
                  {card.num}
                </div>
                <h3 className="h4" data-sanity={cardAttr('city')}>
                  {card.city}
                </h3>

                {isReactionCard ? (
                  <div className="ctc-reaction">
                    <div className="ctc-reaction-row">
                      <span className="meta">Запитване</span>
                      <span className="ctc-reaction-v">~ <Counter to={3} />ч <Counter to={12} />мин</span>
                    </div>
                    <div className="ctc-reaction-row">
                      <span className="meta">Спешен сервиз</span>
                      <span className="ctc-reaction-v">&lt; <Counter to={30} /> мин</span>
                    </div>
                  </div>
                ) : (
                  <p data-sanity={cardAttr('address')}>
                    {card.address
                      ? renderAddress(card.address)
                      : card.hours
                      ? renderAddress(card.hours)
                      : null}
                  </p>
                )}

                {card.linkHref ? (
                  <a className="ctc-info-link" href={card.linkHref} data-sanity={cardAttr('linkLabel')}>
                    {card.linkLabel} <Icons.Arrow />
                  </a>
                ) : card.linkLabel ? (
                  <span className="ctc-info-link" data-sanity={cardAttr('linkLabel')}>
                    {card.linkLabel}
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
