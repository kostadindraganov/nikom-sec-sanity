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

const DEFAULT_ITEMS: FaqItem[] = [
  {
    _key: 'faq1',
    q: 'Каква апаратура използвате?',
    a: 'Работим изключително със сертифицирана техника от световни производители: Esser by Honeywell, INIM Electronics, Panasonic, Securiton, Dahua, Paradox, Soyal, Farfisa и други.',
  },
  {
    _key: 'faq2',
    q: 'Лицензирани ли сте за пожарни системи?',
    a: 'Да, фирма „НИКОМ" е лицензирана от ГД ПБЗН – МВР с разрешително № 743/07.07.2017 г. за поддържане и обслужване на противопожарни системи и съоръжения.',
  },
  {
    _key: 'faq3',
    q: 'Какъв е срокът от запитване до готов проект?',
    a: 'Срокът зависи от типа и обхвата на обекта. След първоначална консултация Ви предоставяме график за всички етапи — обикновено между 2 и 12 седмици за средно-голям обект.',
  },
  {
    _key: 'faq4',
    q: 'Предлагате ли поддръжка след монтаж?',
    a: 'Да. Всички наши клиенти получават гаранционен сервиз, а след това — абонаментна техническа поддръжка по договорено SLA. Профилактика, резервни части и 24/7 техническа линия.',
  },
  {
    _key: 'faq5',
    q: 'Може ли да интегрирате с вече съществуващи системи?',
    a: 'Да. Имаме опит в развитие и разширяване на съществуващи системи — особено когато са на сертифицирана платформа. Започваме с оглед и техническа оценка на текущата инсталация.',
  },
  {
    _key: 'faq6',
    q: 'Работите ли с държавни и дипломатически обекти?',
    a: 'Да. Имаме опит с посолства, държавни институции и обекти с високо ниво на сигурност. Поверителността и дискретността са стандарт за нас.',
  },
];

export default function ServicesFaq({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const [open, setOpen] = useState<number>(0);

  const eyebrow = block?.eyebrow ?? 'FAQ · Често задавани въпроси';
  const heading = block?.heading ?? 'Отговори преди да говорите с инженер.';
  const items = block?.items?.length ? block.items : DEFAULT_ITEMS;

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
