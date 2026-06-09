'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Step = {
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
    steps?: Step[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function AboutEngagement({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const steps = block?.steps ?? [];

  return (
    <section className="section-pad about-engagement dark-band">
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
          className="eng-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.steps` }).toString()}
        >
          {steps.map((s) => (
            <div
              className="eng-card"
              key={s._key}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.steps[_key=="${s._key}"]` }).toString()}
            >
              <div className="eng-num">{s.number ?? ''}</div>
              <h3 className="h4">{s.title ?? ''}</h3>
              <p dangerouslySetInnerHTML={{ __html: s.description ?? '' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
