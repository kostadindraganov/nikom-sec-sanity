'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Pillar = {
  _key: string;
  number?: string;
  title?: string;
  description?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    pillars?: Pillar[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function AboutManifest({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const pillars = block?.pillars ?? [];

  return (
    <section className="section-pad about-manifest">
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
          className="manifest-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.pillars` }).toString()}
        >
          {pillars.map((l) => (
            <div
              className="manifest-card"
              key={l._key}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.pillars[_key=="${l._key}"]` }).toString()}
            >
              <div className="m-num">{l.number ?? ''}</div>
              <h3 className="h3">{l.title ?? ''}</h3>
              <p dangerouslySetInnerHTML={{ __html: l.description ?? '' }} />
              <span className="m-tick" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
