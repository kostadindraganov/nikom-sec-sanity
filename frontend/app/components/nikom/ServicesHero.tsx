'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr, imageUrl } from '@/sanity/lib/utils';

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    pills?: string[];
    image?: { asset?: { _ref?: string } };
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function ServicesHero({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) =>
    `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const lead = block?.lead;
  const pills = block?.pills ?? [];

  return (
    <section className="services-hero">
      <div className="srv-hero-img-wrap">
        <img
          src={imageUrl(block?.image, '/nikom/services-hero.jpg')}
          alt="Услуги — NIKOM"
          className="srv-hero-img"
        />
        <div className="srv-hero-gradient" />
        <div className="srv-hero-scan" />
      </div>
      <div className="container srv-hero-inner">
        <div className="srv-hero-card">
          <div
            className="eyebrow"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
          >
            {eyebrow}
          </div>
          <h1
            className="h1"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading') }).toString()}
          >
            <StreamText text={heading} />
          </h1>
          <p
            className="srv-hero-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
          >
            {lead}
          </p>
          <div
            className="srv-hero-pills"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('pills') }).toString()}
          >
            {pills.map((pill, i) => (
              <span className={'chip' + (i === 0 ? ' solid' : '')} key={pill}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
