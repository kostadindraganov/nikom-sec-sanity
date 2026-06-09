'use client';

import { Counter, StreamText } from '@/app/components/nikom/animations';
import { dataAttr, imageUrl } from '@/sanity/lib/utils';

type Stat = {
  _key: string;
  value?: string;
  animated?: boolean;
  suffix?: string;
  label?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    image?: { asset?: { _ref?: string } };
    stats?: Stat[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function AboutHero({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;

  const stats: Stat[] = block?.stats ?? [];

  const imageSrc = imageUrl(block?.image, '/nikom/about-hero.jpg');

  return (
    <section className="about-hero">
      <div className="about-hero-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc ?? '/nikom/about-hero.jpg'}
          alt="За НИКОМ"
          className="about-hero-img"
        />
        <div className="about-hero-gradient" />
      </div>
      <div className="container about-hero-inner">
        <div className="about-hero-copy">
          <div
            className="eyebrow"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
          >
            {block?.eyebrow}
          </div>
          <h1
            className="h1 about-h1"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
          >
            <StreamText
              text={block?.heading}
            />
          </h1>
          <p
            className="about-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead}
          </p>
          <div
            className="about-stats"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.stats` }).toString()}
          >
            {stats.map((s) => (
              <div
                key={s._key}
                data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.stats[_key=="${s._key}"]` }).toString()}
              >
                <div className="trust-n">
                  {s.animated
                    ? <><Counter to={Number(s.value) || 0} /><span>{s.suffix}</span></>
                    : <>{s.value ?? ''}{s.suffix ? <span>{s.suffix}</span> : null}</>
                  }
                </div>
                <div className="trust-l">{s.label ?? ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
