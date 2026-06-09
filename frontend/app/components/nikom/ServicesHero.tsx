'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

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

  const eyebrow = block?.eyebrow ?? 'Услуги · 12 системни категории';
  const heading = block?.heading ?? 'Широк кръг от услуги в системите за наблюдение и сигурност.';
  const lead =
    block?.lead ??
    'Екипът на „НИКОМ Системи за Сигурност" е с 20-годишен опит в сферата на системите за сигурност и контрол. Специализираме във всяка област на системи за наблюдение и сигурност и предлагаме услуги с висок стандарт и богат опит.';
  const pills = block?.pills ?? ['Проектиране', 'Разработка и монтаж', 'Управление на проекти', 'Сервизно обслужване'];

  return (
    <section className="services-hero">
      <div className="srv-hero-img-wrap">
        <img
          src="/nikom/services-hero.jpg"
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
