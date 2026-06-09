'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr } from '@/sanity/lib/utils';

type Sector = {
  _key: string;
  number?: string;
  name?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    sectors?: Sector[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function AboutSectors({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const sectors = block?.sectors ?? [];

  return (
    <section className="section-pad about-sectors">
      <div className="container">
        <div className="sectors-grid">
          <div>
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
            <p
              className="sectors-lead"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
            >
              {block?.lead}
            </p>
          </div>
          <div
            className="sectors-list"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.sectors` }).toString()}
          >
            {sectors.map((s) => (
              <div
                className="sector-row"
                key={s._key}
                data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.sectors[_key=="${s._key}"]` }).toString()}
              >
                <span className="meta">{s.number ?? ''}</span>
                <span className="sector-name" dangerouslySetInnerHTML={{ __html: s.name ?? '' }} />
                <span className="sector-dash" />
                <Icons.Arrow />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
