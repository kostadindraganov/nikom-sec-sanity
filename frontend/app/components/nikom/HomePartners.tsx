'use client'

import { Marquee, StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type PartnerItem = { _key?: string; name?: string }
type CertItem = { _key?: string; label?: string }

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    partnersRow1?: PartnerItem[]
    partnersRow2?: PartnerItem[]
    certs?: CertItem[]
  }
  index: number
  pageId: string
  pageType: string
}

const DEFAULT_BRANDS = [
  'Honeywell', 'Esser', 'INIM', 'Securiton', 'Panasonic', 'Bosch',
  'Dahua', 'Paradox', 'Soyal', 'Farfisa', 'TOA', 'Suprema',
  'Hikvision', 'Axis', 'Mobotix',
]

const DEFAULT_CERTS = [
  'ISO 9001:2015', 'ISO 14001:2015', 'ISO 27001',
  'ИТ–СТД-001', 'Лиценз МВР № 2436', 'EN 54',
]

export default function HomePartners({ block, index: _index, pageId, pageType }: Props) {
  const basePath = `pageBuilder[_key=="${block?._key}"]`

  const row1Items: PartnerItem[] = block?.partnersRow1 && block.partnersRow1.length > 0
    ? block.partnersRow1
    : DEFAULT_BRANDS.map((name) => ({ name }))

  const row2Items: PartnerItem[] = block?.partnersRow2 && block.partnersRow2.length > 0
    ? block.partnersRow2
    : [...DEFAULT_BRANDS].reverse().map((name) => ({ name }))

  const certItems: CertItem[] = block?.certs && block.certs.length > 0
    ? block.certs
    : DEFAULT_CERTS.map((label) => ({ label }))

  return (
    <section className="section-pad partners">
      <div className="container">
        <div className="partners-head">
          <div
            className="eyebrow"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.eyebrow` }).toString()}
          >
            {block?.eyebrow ?? 'Сертифицирани партньори'}
          </div>
          <h2
            className="h3"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.heading` }).toString()}
          >
            <StreamText text={block?.heading ?? 'Работим със световни производители — без компромиси с качеството.'} />
          </h2>
        </div>

        <div
          className="partners-marquee"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.partnersRow1` }).toString()}
        >
          <Marquee speed={48} className="">
            {row1Items.map((b, i) => (
              <span className="partner-pill" key={b._key ?? b.name ?? i}>
                <span className="dot" /> {b.name}
              </span>
            ))}
          </Marquee>
        </div>

        <div
          className="partners-marquee"
          style={{ marginTop: 12 }}
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.partnersRow2` }).toString()}
        >
          <Marquee speed={56} reverse={true}>
            {row2Items.map((b, i) => (
              <span className="partner-pill" key={b._key ?? ('r-' + (b.name ?? i))}>
                <span className="dot" /> {b.name}
              </span>
            ))}
          </Marquee>
        </div>

        <div
          className="certs"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.certs` }).toString()}
        >
          {certItems.map((c, i) => (
            <span className="cert" key={c._key ?? c.label ?? i}>
              <Icons.Check /> {c.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
