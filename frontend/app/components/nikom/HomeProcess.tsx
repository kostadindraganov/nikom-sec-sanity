'use client';

import { StreamText, ProcessWalker } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Step = {
  _key?: string;
  num?: string;
  title?: string;
  desc?: string;
};

type Props = {
  block?: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    steps?: Step[];
  };
  index?: number;
  pageId?: string;
  pageType?: string;
};

const DEFAULT_STEPS: Step[] = [
  { _key: 's01', num: '01', title: 'Консултация', desc: 'Оглед, нормативни изисквания, бюджетна рамка.' },
  { _key: 's02', num: '02', title: 'Проектиране', desc: 'Работен проект, спецификация, съгласувания.' },
  { _key: 's03', num: '03', title: 'Доставка', desc: 'Сертифицирана техника от водещи производители.' },
  { _key: 's04', num: '04', title: 'Монтаж', desc: 'Лицензиран екип, инсталация по график.' },
  { _key: 's05', num: '05', title: 'Тестване', desc: '72-часов приемен тест, протоколи.' },
  { _key: 's06', num: '06', title: 'Обучение', desc: 'Инструктаж на операторите.' },
  { _key: 's07', num: '07', title: 'Поддръжка', desc: 'Абонаментен сервиз 24/7.' },
];

export default function HomeProcess({ block, index, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow ?? 'Процес · End-to-End инженеринг';
  const heading = block?.heading ?? 'Един екип. Един проект. От консултация до поддръжка.';
  const lead = block?.lead ?? 'Не работим с подизпълнители на ключови етапи. Всеки проект се води от назначен инженер-ръководител.';
  const steps = (block?.steps && block.steps.length > 0) ? block.steps : DEFAULT_STEPS;
  const blockKey = block?._key ?? '';

  const fieldPath = (field: string) =>
    (pageId && pageType && blockKey)
      ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].${field}` }).toString()
      : undefined;

  const arrayPath = (pageId && pageType && blockKey)
    ? `pageBuilder[_key=="${blockKey}"].steps`
    : undefined;

  // ProcessWalker: total steps, interval ms
  const [walkerRef, active] = ProcessWalker(steps.length, 1300);

  const completedThrough = active === -2 ? steps.length - 1 : Math.max(active, -1);
  const progress = active === -2 ? 100 : (completedThrough + 1) / steps.length * 100;

  return (
    <section className="section-pad process" id="process">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={fieldPath('eyebrow')}>{eyebrow}</div>
            <h2 className="h2" data-sanity={fieldPath('heading')}>
              <StreamText text={heading} />
            </h2>
          </div>
          <p className="section-lead" data-sanity={fieldPath('lead')}>{lead}</p>
        </div>

        <div
          className="proc-timeline"
          ref={walkerRef}
          style={{ '--progress': progress + '%' } as React.CSSProperties}
          data-sanity={arrayPath ? dataAttr({ id: pageId!, type: pageType!, path: arrayPath }).toString() : undefined}
        >
          <div className="proc-line">
            <div className="proc-line-fill" />
          </div>
          <div className="proc-steps">
            {steps.map((s, i) => {
              const state =
                active === -2 ? 'done' :
                active === i  ? 'active' :
                i < active    ? 'done' : 'idle';

              const itemDataAttr = (pageId && pageType && blockKey && s._key)
                ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].steps[_key=="${s._key}"]` }).toString()
                : undefined;

              return (
                <div
                  className={'proc-step state-' + state}
                  key={s._key ?? s.num ?? i}
                  style={{ '--i': i } as React.CSSProperties}
                  data-sanity={itemDataAttr}
                >
                  <div className="proc-dot" />
                  <div className="proc-n">{s.num ?? String(i + 1).padStart(2, '0')}</div>
                  <div className="proc-t">{s.title ?? ''}</div>
                  <div className="proc-d">{s.desc ?? ''}</div>
                </div>
              );
            })}
          </div>
          <div className="proc-status">
            <span className="status-dot" />
            <span className="meta">
              {active === -2
                ? 'Цикъл завършен · стандартен work-flow'
                : active === -1
                  ? 'Готов за изпълнение'
                  : `Активна стъпка: ${steps[active]?.num} · ${steps[active]?.title}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
