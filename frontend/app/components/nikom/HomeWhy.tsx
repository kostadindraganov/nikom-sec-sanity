'use client'

import { Counter, StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'

type StatItem = {
  _key?: string
  value?: number
  decimals?: number
  prefix?: string
  suffix?: string
  label?: string
  isCounter?: boolean
}

type PillarItem = {
  _key?: string
  title?: string
  desc?: string
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    stats?: StatItem[]
    pillars?: PillarItem[]
  }
  index: number
  pageId: string
  pageType: string
}

const DEFAULT_PILLARS: PillarItem[] = [
  {
    _key: 'p1',
    title: 'Инженерен подход',
    desc: 'Решения, проектирани от инженери. Всеки проект минава през работно проектиране и съгласуване.',
  },
  {
    _key: 'p2',
    title: 'Сертифицирана апаратура',
    desc: 'Esser, Honeywell, INIM, Securiton, Bosch, Soyal, Paradox — само сертифицирани производители.',
  },
  {
    _key: 'p3',
    title: 'Прецизно изпълнение',
    desc: 'Лицензирани монтажни екипи, доказана методика, документиране и 72-часов приемен тест.',
  },
  {
    _key: 'p4',
    title: 'Дългосрочна поддръжка',
    desc: 'Абонаментен сервиз 24/7, профилактика, резервни части, договорно SLA.',
  },
]

const DEFAULT_STATS: StatItem[] = [
  { _key: 'stat1', value: 98.6, decimals: 1, suffix: '%', label: 'точност на SLA реакции', isCounter: true },
  { _key: 'stat2', value: 30, prefix: '<', label: 'мин средно време за критична реакция', isCounter: true },
]

export default function HomeWhy({ block, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow ?? 'Защо NIKOM'
  const heading = block?.heading ?? 'Инженерен партньор, не доставчик на оборудване.'
  const lead =
    block?.lead ??
    'Над 20 години изграждаме критични системи за болници, посолства, индустрия и търговски вериги. Останалото е въпрос на стандарт.'
  const stats = block?.stats?.length ? block.stats : DEFAULT_STATS
  const pillars = block?.pillars?.length ? block.pillars : DEFAULT_PILLARS

  const blockPath = `pageBuilder[_key=="${block?._key}"]`

  return (
    <section className="section-pad why">
      <div className="container">
        <div className="why-grid">
          <div className="why-head">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.eyebrow` }).toString()}
            >
              {eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.heading` }).toString()}
            >
              <StreamText text={heading} />
            </h2>
            <p
              className="why-lead"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.lead` }).toString()}
            >
              {lead}
            </p>
            <div
              className="why-stats"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.stats` }).toString()}
            >
              {stats.map((s) => (
                <div
                  key={s._key}
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.stats[_key=="${s._key}"]` }).toString()}
                >
                  <div className="why-n">
                    {s.prefix && s.prefix}
                    {s.isCounter !== false ? (
                      <Counter to={s.value ?? 0} decimals={s.decimals ?? 0} suffix={s.suffix ?? ''} />
                    ) : (
                      <>{s.value}{s.suffix ?? ''}</>
                    )}
                    {!s.suffix && s.prefix !== '<' ? '' : ''}
                  </div>
                  <div className="why-l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="why-pillars"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.pillars` }).toString()}
          >
            {pillars.map((p, i) => (
              <div
                className="pillar"
                key={p._key ?? i}
                data-sanity={dataAttr({ id: pageId, type: pageType, path: `${blockPath}.pillars[_key=="${p._key}"]` }).toString()}
              >
                <div className="pillar-n">0{i + 1}</div>
                <div>
                  <h3 className="h4">{p.title ?? ''}</h3>
                  <p>{p.desc ?? ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
