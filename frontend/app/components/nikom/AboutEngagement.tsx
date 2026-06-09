'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Step = {
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
    steps?: Step[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

const DEFAULT_STEPS: Step[] = [
  { _key: 's1', number: '01', title: 'Техническа консултация', description: 'От квалифициран екип, на база на конкретните Ви нужди.' },
  { _key: 's2', number: '02', title: 'Проектна документация', description: 'Изготвяне на технически чертежи и спецификации.' },
  { _key: 's3', number: '03', title: 'Структурно окабеляване', description: 'Изграждане на кабелна инфраструктура — основата на всяка система.' },
  { _key: 's4', number: '04', title: 'Доставка и монтаж', description: 'Техника от сертифицирани производители, лицензиран екип.' },
  { _key: 's5', number: '05', title: 'Програмиране', description: 'Оживяване на системата и конфигуриране за конкретния обект.' },
  { _key: 's6', number: '06', title: '24-часов тест', description: 'Изпитание на системите в реални условия преди приемане.' },
  { _key: 's7', number: '07', title: 'Обучение на персонала', description: 'Инструктаж за работа със системата на български.' },
  { _key: 's8', number: '08', title: 'Гаранционен сервиз', description: 'Поддръжка по време на гаранционния период.' },
  { _key: 's9', number: '09', title: 'Абонаментна поддръжка', description: 'Следгаранционна техническа поддръжка на изградените системи.' },
];

export default function AboutEngagement({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  const steps = block?.steps ?? DEFAULT_STEPS;

  return (
    <section className="section-pad about-engagement dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Инженеринг · 09 ангажимента'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Ангажираме се на всеки етап от работния процес.'} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.lead` }).toString()}
          >
            {block?.lead ?? 'Техническата осигуреност на компанията и екипът от квалифицирани инженери, проектанти и техници са в състояние да посрещнат изискванията на всеки клиент.'}
          </p>
        </div>
        <div
          className="eng-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.steps` }).toString()}
        >
          {steps.map((s) => (
            <div
              className="eng-card"
              key={s._key}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.steps[_key=="${s._key}"]` }).toString()}
            >
              <div className="eng-num">{s.number ?? ''}</div>
              <h3 className="h4">{s.title ?? ''}</h3>
              <p dangerouslySetInnerHTML={{ __html: s.description ?? '' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
