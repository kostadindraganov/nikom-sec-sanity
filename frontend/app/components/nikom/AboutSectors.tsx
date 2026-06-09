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

const DEFAULT_SECTORS: Sector[] = [
  { _key: 'sec1', number: '01', name: 'Административни и офис сгради' },
  { _key: 'sec2', number: '02', name: 'Търговски центрове и комплекси' },
  { _key: 'sec3', number: '03', name: 'Болнични и лечебни центрове' },
  { _key: 'sec4', number: '04', name: 'Банкови и финансови институции' },
  { _key: 'sec5', number: '05', name: 'Училища и детски градини' },
  { _key: 'sec6', number: '06', name: 'Производствени бази и складове' },
  { _key: 'sec7', number: '07', name: 'Държавни обекти с високо ниво на сигурност' },
];

export default function AboutSectors({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const sectors = block?.sectors ?? DEFAULT_SECTORS;

  return (
    <section className="section-pad about-sectors">
      <div className="container">
        <div className="sectors-grid">
          <div>
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Сектори · 07 индустрии'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Решения за дома, офиса и големите институционални обекти.'} />
            </h2>
            <p
              className="sectors-lead"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
            >
              {block?.lead ?? 'Покриваме целия спектър — от дома и офиса до големи промишлени, търговски и институционални обекти. За всеки сектор имаме адаптирано техническо решение.'}
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
