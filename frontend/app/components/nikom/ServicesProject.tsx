'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type ProjectServiceItem = {
  _key?: string;
  n?: string;
  title?: string;
  desc?: string;
  icon?: string;
  bullets?: string[];
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    items?: ProjectServiceItem[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

function ProjIcon({ kind }: { kind: string }) {
  const c = 'var(--accent)';
  const stroke = { fill: 'none' as const, stroke: c, strokeWidth: 1.6 };
  switch (kind) {
    case 'plan':
      return (
        <svg viewBox="0 0 40 40" width="36" height="36" {...stroke}>
          <rect x="6" y="6" width="28" height="28" rx="2" fill={c} fillOpacity=".12" />
          <path d="M10 12 H 30 M 10 17 H 24 M 10 22 H 28 M 10 27 H 18" />
          <circle cx="33" cy="33" r="4" fill={c} />
        </svg>
      );
    case 'build':
      return (
        <svg viewBox="0 0 40 40" width="36" height="36" {...stroke}>
          <path d="M4 36 L 14 26 L 22 34 L 36 20" fill={c} fillOpacity=".15" />
          <circle cx="14" cy="26" r="3" fill={c} />
          <circle cx="22" cy="34" r="3" fill={c} />
          <path d="M28 12 L 36 4 M 32 4 H 36 V 8" />
        </svg>
      );
    case 'pm':
      return (
        <svg viewBox="0 0 40 40" width="36" height="36" {...stroke}>
          <circle cx="20" cy="14" r="6" fill={c} fillOpacity=".15" />
          <path d="M6 34 c0 -8 6 -12 14 -12 s14 4 14 12" />
          <circle cx="32" cy="10" r="3" fill={c} />
        </svg>
      );
    case 'srv':
      return (
        <svg viewBox="0 0 40 40" width="36" height="36" {...stroke}>
          <path d="M20 4 a16 16 0 1 1 -8 30 l4 -7 a8 8 0 0 0 12 -10 z" fill={c} fillOpacity=".15" />
          <circle cx="20" cy="20" r="4" />
        </svg>
      );
    default:
      return <circle r="4" fill={c} />;
  }
}

const DEFAULT_ITEMS: ProjectServiceItem[] = [
  {
    _key: 'plan', n: '01', title: 'Проектиране', icon: 'plan',
    desc: 'Изготвяне на работен проект, технически чертежи и спецификации съгласно действащите норми и стандарти.',
    bullets: ['Концептуален проект', 'Технически чертежи', 'Спецификация на апаратурата', 'Съгласувания с РСПБЗН'],
  },
  {
    _key: 'build', n: '02', title: 'Разработка и монтаж', icon: 'build',
    desc: 'Лицензиран екип за разработка и монтаж — с документиране на всеки етап и 72-часов приемен тест.',
    bullets: ['Структурно окабеляване', 'Монтаж на апаратурата', 'Програмиране', '72-часов приемен тест'],
  },
  {
    _key: 'pm', n: '03', title: 'Управление на проекти', icon: 'pm',
    desc: 'Назначен инженер-ръководител с единствена точка на отговорност за графика, бюджета и качеството.',
    bullets: ['Инженер-ръководител', 'График и milestone', 'Бюджетен контрол', 'Документация и handover'],
  },
  {
    _key: 'srv', n: '04', title: 'Сервизно обслужване', icon: 'srv',
    desc: 'Гаранционен и следгаранционен сервиз с абонаментна поддръжка 24/7 и договорно SLA.',
    bullets: ['Гаранционен сервиз', 'Абонаментна поддръжка', 'SLA реакция', 'Резервни части на склад'],
  },
];

export default function ServicesProject({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow ?? 'Услуги по проекти · 04 типа';
  const heading = block?.heading ?? 'От концепция до дългосрочна поддръжка.';
  const lead =
    block?.lead ??
    'Работим със сертифицирана апаратура и по високи технически стандарти. Всеки проект минава през еднакъв инженерен work-flow.';
  const items = block?.items?.length ? block.items : DEFAULT_ITEMS;

  return (
    <section className="section-pad services-project dark-band">
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
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
          >
            {lead}
          </p>
        </div>
        <div
          className="srv-proj-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('items') }).toString()}
        >
          {items.map((it) => (
            <div
              className="srv-proj-card"
              key={it._key}
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: path(`items[_key=="${it._key}"]`),
              }).toString()}
            >
              <div className="spc-num meta">{it.n ?? ''}</div>
              <ProjIcon kind={it.icon ?? ''} />
              <h3 className="h3">{it.title ?? ''}</h3>
              <p dangerouslySetInnerHTML={{ __html: it.desc ?? '' }} />
              <ul>
                {(it.bullets ?? []).map((b, i) => (
                  <li key={i}>
                    <span className="bullet-dot" />
                    <span dangerouslySetInnerHTML={{ __html: b }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
