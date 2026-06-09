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

const DEFAULT_PILLARS: Pillar[] = [
  { _key: 'p1', number: '01', title: 'Инженерингов подход', description: 'Компания, създадена от инженери с отлична професионална квалификация. Всеки проект минава през квалифициран технически екип.' },
  { _key: 'p2', number: '02', title: 'Сертифицирана техника', description: 'Работим изключително със сертифицирана, висококачествена техника на световни производители — без компромиси.' },
  { _key: 'p3', number: '03', title: 'Цялостни решения', description: 'Проектиране, доставка, монтаж и поддръжка. От дома и офиса до големи промишлени, търговски и институционални обекти.' },
  { _key: 'p4', number: '04', title: 'Дългосрочно партньорство', description: 'Работим в синергия, за да доставим резултати и да изградим дългосрочно партньорство с клиенти и партньори.' },
];

export default function AboutManifest({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const pillars = block?.pillars ?? DEFAULT_PILLARS;

  return (
    <section className="section-pad about-manifest">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Принципи · 04 стълба'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Високи стандарти, сертификати и навременно изпълнение.'} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead ?? 'Нашата цел е да поставим висок стандарт в сферата на системите за сигурност и наблюдение, по критерии по-високи от очакванията.'}
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
