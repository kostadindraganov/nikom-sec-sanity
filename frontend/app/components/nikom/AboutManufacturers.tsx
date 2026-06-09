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

export default function AboutManufacturers({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const brands = block?.brands ?? [];

  return (
    <section className="section-pad about-brands">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead}
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
