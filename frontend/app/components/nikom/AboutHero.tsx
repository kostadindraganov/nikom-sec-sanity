'use client';

import { Counter, StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

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

  const stats: Stat[] = block?.stats ?? [
    { _key: 'stat1', value: '20', animated: true, suffix: '+', label: 'години опит' },
    { _key: 'stat2', value: '2005', animated: false, suffix: '', label: 'година на основаване' },
    { _key: 'stat3', value: '12', animated: false, suffix: '', label: 'категории системи' },
    { _key: 'stat4', value: '№ 743', animated: false, suffix: '', label: 'лиценз ГД ПБЗН-МВР' },
  ];

  const imageSrc = block?.image?.asset ? undefined : '/nikom/about-hero.jpg';

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
            {block?.eyebrow ?? 'За нас · Инженерна компания от 2005'}
          </div>
          <h1
            className="h1 about-h1"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
          >
            <StreamText
              text={block?.heading ?? 'Над 20 години инженеринг в системите за сигурност, контрол и пожарна безопасност.'}
            />
          </h1>
          <p
            className="about-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead ?? '„НИКОМ Системи за Сигурност" ЕООД е инженерингова компания, създадена през 2005 г. от инженери с отлична професионална квалификация и дългогодишен опит в предоставянето на цялостни решения в сигурността. Свидетели сме на бързите промени в продуктите и услугите — и развълнувани от възможностите, които те дават на нашите клиенти.'}
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
                    ? <><Counter to={Number(s.value) || 0} /><span>{s.suffix ?? '+'}</span></>
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
