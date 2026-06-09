'use client'

import { Counter } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type HeadingPart = {
  _key: string
  text?: string
  highlight?: boolean
}

type TrustItem = {
  _key: string
  value?: string
  suffix?: string
  label?: string
  isCounter?: boolean
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    headingParts?: HeadingPart[]
    sub?: string
    ctaPrimary?: { label?: string; href?: string }
    ctaSecondary?: { label?: string; href?: string }
    trustItems?: TrustItem[]
    stripLive?: string
    stripLocations?: string
    stripLicense?: string
  }
  index: number
  pageId: string
  pageType: string
}

const DEFAULT_HEADING_PARTS: HeadingPart[] = [
  { _key: 'hp1', text: 'Системи за ', highlight: false },
  { _key: 'hp2', text: 'сигурност', highlight: true },
  { _key: 'hp3', text: ', ', highlight: false },
  { _key: 'hp4', text: 'пожарна безопасност', highlight: true },
  { _key: 'hp5', text: ' и ', highlight: false },
  { _key: 'hp6', text: 'контрол на достъп', highlight: true },
]

const DEFAULT_TRUST_ITEMS: TrustItem[] = [
  { _key: 'ti1', value: '20', suffix: '+', label: 'години инженерен опит', isCounter: true },
  { _key: 'ti2', value: '800', suffix: '+', label: 'завършени обекта', isCounter: true },
  { _key: 'ti3', value: '24/7', suffix: '', label: 'сервизна поддръжка', isCounter: false },
  { _key: 'ti4', value: 'ISO', suffix: '', label: '9001 / 14001 / 27001', isCounter: false },
]

export default function HomeHero({ block, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow ?? 'Инженерни системи • Сертифицирано'
  const headingParts = block?.headingParts ?? DEFAULT_HEADING_PARTS
  const sub =
    block?.sub ??
    'Проектиране, доставка, монтаж и поддръжка на сертифицирани решения за бизнес, обществени и индустриални обекти. Над две десетилетия инженерен опит, без компромис към сигурността.'
  const ctaPrimary = block?.ctaPrimary ?? { label: 'Заявете консултация', href: '#contact' }
  const ctaSecondary = block?.ctaSecondary ?? { label: 'Вижте проекти', href: '#projects' }
  const trustItems = block?.trustItems ?? DEFAULT_TRUST_ITEMS
  const stripLive = block?.stripLive ?? 'LIVE — Дежурен инженер на линия'
  const stripLocations = block?.stripLocations ?? 'Sofia · Plovdiv · Varna · Burgas'
  const stripLicense = block?.stripLicense ?? 'Лиценз № 2436-2017 · МВР'

  const blockKey = block?._key ?? ''
  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].${field}` }).toString()

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
      </div>
      <div className="container hero-inner">
        <div className="eyebrow" data-sanity={path('eyebrow')}>{eyebrow}</div>
        <h1 className="h1 hero-h1" data-sanity={path('headingParts')}>
          {headingParts.map((part) =>
            part.highlight ? (
              <span key={part._key} className="hl">{part.text}</span>
            ) : (
              <span key={part._key}>{part.text}</span>
            )
          )}
        </h1>
        <p className="hero-sub" data-sanity={path('sub')}>{sub}</p>

        <div className="hero-cta">
          <a className="btn btn-primary btn-lg" href={ctaPrimary.href ?? '#contact'}>
            {ctaPrimary.label ?? 'Заявете консултация'} <Icons.Arrow />
          </a>
          <a className="btn btn-ghost btn-lg" href={ctaSecondary.href ?? '#projects'}>
            {ctaSecondary.label ?? 'Вижте проекти'}
          </a>
        </div>

        <div className="trust-bar" data-sanity={path('trustItems')}>
          {trustItems.map((item) => (
            <div
              key={item._key}
              className="trust-item"
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: `pageBuilder[_key=="${blockKey}"].trustItems[_key=="${item._key}"]`,
              }).toString()}
            >
              <div className="trust-n">
                {item.isCounter && item.value && !isNaN(Number(item.value)) ? (
                  <>
                    <Counter to={Number(item.value)} />
                    {item.suffix && <span>{item.suffix}</span>}
                  </>
                ) : (
                  <>{item.value}{item.suffix}</>
                )}
              </div>
              <div className="trust-l">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-strip">
        <div className="container hero-strip-inner">
          <span className="meta" data-sanity={path('stripLive')}>
            <span className="status-dot" />&nbsp;&nbsp;{stripLive}
          </span>
          <span className="meta" data-sanity={path('stripLocations')}>{stripLocations}</span>
          <span className="meta" data-sanity={path('stripLicense')}>{stripLicense}</span>
        </div>
      </div>
    </section>
  )
}
