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

export default function HomeHero({ block, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow
  const headingParts = block?.headingParts ?? []
  const sub = block?.sub
  const ctaPrimary = block?.ctaPrimary
  const ctaSecondary = block?.ctaSecondary
  const trustItems = block?.trustItems ?? []
  const stripLive = block?.stripLive
  const stripLocations = block?.stripLocations
  const stripLicense = block?.stripLicense

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
          <a className="btn btn-primary btn-lg" href={ctaPrimary?.href}>
            {ctaPrimary?.label} <Icons.Arrow />
          </a>
          <a className="btn btn-ghost btn-lg" href={ctaSecondary?.href}>
            {ctaSecondary?.label}
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
