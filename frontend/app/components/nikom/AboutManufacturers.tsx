'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Brand = {
  _key: string;
  name?: string;
  sub?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    brands?: Brand[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

const DEFAULT_BRANDS: Brand[] = [
  { _key: 'b1', name: 'Esser', sub: 'by Honeywell' },
  { _key: 'b2', name: 'INIM', sub: 'Electronics' },
  { _key: 'b3', name: 'Panasonic', sub: '' },
  { _key: 'b4', name: 'Securiton', sub: '' },
  { _key: 'b5', name: 'Dahua', sub: '' },
  { _key: 'b6', name: 'Paradox', sub: '' },
  { _key: 'b7', name: 'Soyal', sub: '' },
  { _key: 'b8', name: 'Farfisa', sub: '' },
];

export default function AboutManufacturers({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const brands = block?.brands ?? DEFAULT_BRANDS;

  return (
    <section className="section-pad about-brands">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Партньори · 08 световни производители'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Доказано качество, многообразие и възможности за интеграция.'} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead ?? 'В портфолиото си избираме да присъстват продукти с доказано качество, многообразие в техническите спецификации, възможности за интеграция и икономическа ефективност.'}
          </p>
        </div>
        <div
          className="brand-strip"
          style={{ borderRadius: 'var(--radius-md)' }}
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.brands` }).toString()}
        >
          {brands.map((b) => (
            <div
              className="brand-cell"
              key={b._key}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.brands[_key=="${b._key}"]` }).toString()}
            >
              <div className="brand-logo">{b.name ?? ''}</div>
              {b.sub && <div className="brand-sub">{b.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
