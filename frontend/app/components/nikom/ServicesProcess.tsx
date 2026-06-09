import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type ProcessStep = {
  _key?: string;
  n?: string;
  title?: string;
  desc?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    steps?: ProcessStep[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

const DEFAULT_STEPS: ProcessStep[] = [
  { _key: 's01', n: '01', title: 'Консултация', desc: 'Оглед на обект, нормативни изисквания.' },
  { _key: 's02', n: '02', title: 'Проектиране', desc: 'Работен проект, спецификации, съгласувания.' },
  { _key: 's03', n: '03', title: 'Доставка', desc: 'Сертифицирана техника, лицензиран екип.' },
  { _key: 's04', n: '04', title: 'Монтаж', desc: 'Лицензиран екип, инсталация по график.' },
  { _key: 's05', n: '05', title: 'Тестване', desc: '72-часов приемен тест, протоколи.' },
  { _key: 's06', n: '06', title: 'Обучение', desc: 'Инструктаж на операторите.' },
  { _key: 's07', n: '07', title: 'Поддръжка', desc: 'Абонаментен сервиз 24/7.' },
];

export default function ServicesProcess({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow ?? 'Методология · End-to-end';
  const heading = block?.heading ?? 'Един и същ процес за всеки проект.';
  const lead =
    block?.lead ??
    'Не правим компромис на ключови етапи. От консултация до дългосрочна поддръжка — една отговорна точка.';
  const steps = block?.steps?.length ? block.steps : DEFAULT_STEPS;

  return (
    <section className="section-pad services-process">
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
          className="srv-process-rail"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('steps') }).toString()}
        >
          {steps.map((step) => (
            <div
              className="rail-step"
              key={step._key}
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: path(`steps[_key=="${step._key}"]`),
              }).toString()}
            >
              <div className="rail-num">{step.n ?? ''}</div>
              <div className="rail-line" />
              <div className="rail-body">
                <h4 className="h4">{step.title ?? ''}</h4>
                <p dangerouslySetInnerHTML={{ __html: step.desc ?? '' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
