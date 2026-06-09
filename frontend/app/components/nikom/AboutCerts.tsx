'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr } from '@/sanity/lib/utils';

type ScopeItem = {
  _key: string;
  text?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    licenseNumber?: string;
    licenseIssuer?: string;
    scopeLabel?: string;
    scopeItems?: ScopeItem[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

const DEFAULT_SCOPE: ScopeItem[] = [
  { _key: 'sc1', text: 'Пожароизвестителни системи' },
  { _key: 'sc2', text: 'Пожарогасителни системи' },
  { _key: 'sc3', text: 'Системи за управление на дим и топлина' },
  { _key: 'sc4', text: 'Пожарни кранове' },
];

export default function AboutCerts({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const scopeItems = block?.scopeItems ?? DEFAULT_SCOPE;

  return (
    <section className="section-pad about-certs">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Лиценз · Сертификати'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Лицензирани от ГД ПБЗН – МВР.'} />
            </h2>
          </div>
        </div>
        <div className="license-band">
          <div className="lic-left">
            <Icons.Shield />
            <div>
              <div
                className="lic-no"
                data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.licenseNumber` }).toString()}
              >
                {block?.licenseNumber ?? 'Разрешително № 743/07.07.2017 г.'}
              </div>
              <div
                className="lic-issuer"
                data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.licenseIssuer` }).toString()}
              >
                {block?.licenseIssuer ?? 'Главна Дирекция „Пожарна безопасност и защита на населението" — МВР'}
              </div>
            </div>
          </div>
          <div className="lic-right">
            <div
              className="lic-scope"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.scopeLabel` }).toString()}
            >
              {block?.scopeLabel ?? 'Поддържане и обслужване на противопожарни системи и съоръжения:'}
            </div>
            <ul
              className="lic-list"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.scopeItems` }).toString()}
            >
              {scopeItems.map((item) => (
                <li
                  key={item._key}
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.scopeItems[_key=="${item._key}"]` }).toString()}
                >
                  <Icons.Check /> {item.text ?? ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
