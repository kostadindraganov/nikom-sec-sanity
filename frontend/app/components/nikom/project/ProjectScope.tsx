'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type ScopeStep = {
  _key: string
  n?: string | null
  t?: string | null
  d?: string | null
}

type Props = {
  doc: {
    _id?: string
    scope?: ScopeStep[] | null
  }
  pageId: string
}

const DEFAULT_STEPS: ScopeStep[] = [
  { _key: 's1', n: '01', t: 'Проектиране', d: 'Работен проект и съгласувания.' },
  { _key: 's2', n: '02', t: 'Доставка', d: 'Сертифицирана техника.' },
  { _key: 's3', n: '03', t: 'Монтаж', d: 'Лицензиран екип.' },
  { _key: 's4', n: '04', t: 'Програмиране', d: 'Конфигурация по обект.' },
  { _key: 's5', n: '05', t: 'Приемен тест', d: '72-часов изпитен.' },
  { _key: 's6', n: '06', t: 'Обучение', d: 'Инструктаж на персонала.' },
  { _key: 's7', n: '07', t: 'Поддръжка', d: 'Абонаментен сервиз.' },
]

export function ProjectScope({ doc, pageId }: Props) {
  const steps = doc?.scope && doc.scope.length > 0 ? doc.scope : DEFAULT_STEPS

  return (
    <section className="section-pad single-scope dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Обхват на работа · End-to-end</div>
            <h2 className="h2">
              <StreamText text="От проектиране до 24/7 поддръжка." />
            </h2>
          </div>
          <p className="section-lead">
            Този обект минава през&nbsp;пълния NIKOM инженерен work-flow. Поддръжката е&nbsp;по&nbsp;абонаментно SLA, в&nbsp;съответствие с&nbsp;EN-54 и&nbsp;Наредба № 8121з-647 от&nbsp;1.10.2014&nbsp;г.
          </p>
        </div>
        <div
          className="sc-grid"
          data-sanity={dataAttr({ id: pageId, type: 'project', path: 'scope' }).toString()}
        >
          {steps.map((s) => (
            <div
              className="sc-card"
              key={s._key}
              data-sanity={dataAttr({ id: pageId, type: 'project', path: `scope[_key=="${s._key}"]` }).toString()}
            >
              <div className="sc-n">{s.n ?? '01'}</div>
              <div className="sc-t">{s.t ?? 'Стъпка'}</div>
              <div className="sc-d">{s.d ?? ''}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
