'use client'

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

const DEFAULT_OFFICES: OfficeCard[] = [
  {
    _key: 'card01',
    num: '01',
    city: 'Адрес офис и склад',
    address: 'жк. Младост 4, блок 477, вх. 1, офис 1\nСофия, 1715\nБългария',
    linkLabel: 'Виж на картата',
    linkHref: '#map',
  },
  {
    _key: 'card02',
    num: '02',
    city: 'Работно време',
    hours: 'Пн – Пт · 09:00 — 18:00\nСб & Нд — неработни\nСервиз — 24 / 7 / 365',
    linkLabel: 'Активен статус ⓘ',
  },
  {
    _key: 'card03',
    num: '03',
    city: 'Данни на фирмата',
    address: '„Ником Системи за Сигурност" ЕООД\nЕИК 131294795\nЛиценз ГД ПБЗН-МВР № 743/07.07.2017 г.',
    linkLabel: 'Документи на запитване ⓘ',
  },
  { _key: 'card04', num: '04', city: 'Време за реакция' },
]

function renderAddress(text: string) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>
  ))
}

export default function ContactInfo({ block, index, pageId, pageType }: Props) {
  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].${field}` }).toString()

  const offices = block?.offices ?? DEFAULT_OFFICES

  return (
    <section className="section-pad ctc-info">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>
              {block?.eyebrow ?? 'Координати · 04 канала за връзка'}
            </div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={block?.heading ?? 'Как можем да Ви бъдем полезни.'} />
            </h2>
          </div>
          <p className="section-lead" data-sanity={path('lead')}>
            {block?.lead ?? 'Ако желаете да направим среща или консултация, изпратете запитване чрез формата по-долу или ни звъннете директно.'}
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
                  {card.num ?? '01'}
                </div>
                <h3 className="h4" data-sanity={cardAttr('city')}>
                  {card.city ?? 'Офис'}
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
                    {card.linkLabel ?? 'Виж'} <Icons.Arrow />
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
