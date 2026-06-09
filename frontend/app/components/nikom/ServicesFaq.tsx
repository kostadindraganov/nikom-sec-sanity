'use client';

import { useState } from 'react';
import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type FaqItem = {
  _key?: string;
  q?: string;
  a?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    items?: FaqItem[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function ServicesFaq({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const [open, setOpen] = useState<number>(0);

  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const items = block?.items ?? [];

  return (
    <section className="section-pad services-faq">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
            >
              {eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading') }).toString()}
            >
              <StreamText text={heading} />
            </h2>
          </div>
        </div>
        <div
          className="faq-list"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('items') }).toString()}
        >
          {items.map((f, i) => (
            <div
              className={'faq-item ' + (open === i ? 'open' : '')}
              key={f._key ?? i}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: path(`items[_key=="${f._key}"]`),
              }).toString()}
            >
              <div className="faq-q">
                <span className="faq-num meta">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-q-text">{f.q ?? ''}</span>
                <span className="faq-plus" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </div>
              <div className="faq-a" dangerouslySetInnerHTML={{ __html: f.a ?? '' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
