'use client';

import { StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr } from '@/sanity/lib/utils';

type StatItem = { _key?: string; label?: string; value?: string };
type ServiceItem = {
  _key?: string;
  n?: string;
  k?: string;
  title?: string;
  desc?: string;
  icon?: string;
  tags?: string[];
  stats?: StatItem[];
  featured?: boolean;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    services?: ServiceItem[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

function SrvIcon({ kind }: { kind: string }) {
  const c = 'var(--accent)';
  switch (kind) {
    case 'fire':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <path d="M16 4 c2 3 5 6 5 11 a6 6 0 0 1 -10 0 c0-2 1-3.5 2-4.5 -.5 1.5 1 2.5 2 1.5 -.8-2 0-6 1-8z" fill={c} fillOpacity=".15" />
          <path d="M11 22 a5 5 0 0 0 10 0" />
        </svg>
      );
    case 'fire-ext':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <rect x="11" y="9" width="10" height="18" rx="2" fill={c} fillOpacity=".15" />
          <path d="M14 9 V 6 a2 2 0 0 1 4 0 V 9" />
          <path d="M16 6 L 24 4 M24 4 L 26 8" />
        </svg>
      );
    case 'cam':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <rect x="3" y="11" width="20" height="12" rx="2" fill={c} fillOpacity=".15" />
          <path d="M23 14 l6 -2 v8 l-6 -2 z" fill={c} fillOpacity=".25" />
          <circle cx="9" cy="17" r="2" />
        </svg>
      );
    case 'panic':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <circle cx="16" cy="16" r="11" fill={c} fillOpacity=".15" />
          <circle cx="16" cy="16" r="5" fill={c} />
        </svg>
      );
    case 'int':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <path d="M16 4 l10 4 v8 c0 6 -4 11 -10 12 -6 -1 -10 -6 -10 -12 v-8 z" fill={c} fillOpacity=".15" />
          <path d="M11 16 l3 3 7 -7" />
        </svg>
      );
    case 'park':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <rect x="4" y="18" width="24" height="6" rx="1" fill={c} fillOpacity=".15" />
          <path d="M8 18 V 12 m16 6 V 14 m-12 4 V 10" />
          <rect x="3" y="16" width="6" height="10" rx="1" fill={c} />
        </svg>
      );
    case 'key':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <circle cx="11" cy="16" r="6" fill={c} fillOpacity=".15" />
          <circle cx="11" cy="16" r="2" fill={c} />
          <path d="M17 16 H 28 M 25 16 V 21 M 21 16 V 19" />
        </svg>
      );
    case 'psim':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <circle cx="16" cy="16" r="6" fill={c} fillOpacity=".25" />
          <circle cx="16" cy="16" r="10" strokeDasharray="2 3" />
          <circle cx="6" cy="6" r="2" fill={c} />
          <circle cx="26" cy="6" r="2" fill={c} />
          <circle cx="6" cy="26" r="2" fill={c} />
          <circle cx="26" cy="26" r="2" fill={c} />
        </svg>
      );
    case 'intercom':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <rect x="9" y="4" width="14" height="24" rx="2" fill={c} fillOpacity=".15" />
          <rect x="12" y="8" width="8" height="6" rx="1" fill={c} fillOpacity=".5" />
          <circle cx="16" cy="21" r="2" fill={c} />
        </svg>
      );
    case 'comm':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <path d="M5 7 a3 3 0 0 1 3 -3 h2 a2 2 0 0 1 2 2 v4 a2 2 0 0 1 -2 2 h-2 c0 6 4 10 10 10 v -2 a2 2 0 0 1 2 -2 h4 a2 2 0 0 1 2 2 v2 a3 3 0 0 1 -3 3 c-11 0 -18 -7 -18 -18z" fill={c} fillOpacity=".15" />
        </svg>
      );
    case 'speaker':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <path d="M4 13 v6 h5 l7 5 V 8 L 9 13 Z" fill={c} fillOpacity=".15" />
          <path d="M21 11 a 6 6 0 0 1 0 10" />
          <path d="M25 7 a 12 12 0 0 1 0 18" />
        </svg>
      );
    case 'net':
      return (
        <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6">
          <rect x="3" y="3" width="9" height="9" rx="1" fill={c} fillOpacity=".15" />
          <rect x="20" y="3" width="9" height="9" rx="1" fill={c} fillOpacity=".15" />
          <rect x="3" y="20" width="9" height="9" rx="1" fill={c} fillOpacity=".15" />
          <rect x="20" y="20" width="9" height="9" rx="1" fill={c} fillOpacity=".15" />
          <path d="M12 7.5 H 20 M 12 24.5 H 20 M 7.5 12 V 20 M 24.5 12 V 20" />
        </svg>
      );
    default:
      return <circle r="6" fill={c} />;
  }
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    _key: 'fire', n: '01', k: 'FIRE', title: 'Пожароизвестителни системи', icon: 'fire', featured: false,
    desc: 'Адресируеми и конвенционални системи за ранна детекция, отговарящи на EN 54 и Наредба Iз-1971.',
    tags: ['Esser by Honeywell', 'INIM', 'Securiton', 'Адресируеми', 'Аспирация VESDA', 'Сертифицирано EN 54'],
    stats: [{ _key: 'f1', label: 'Покрити обекта', value: '210+' }, { _key: 'f2', label: 'Стандарти', value: 'EN 54' }, { _key: 'f3', label: 'Brands', value: '4' }],
  },
  {
    _key: 'fire-ext', n: '02', k: 'FIRE-EXT', title: 'Пожарогасителни системи', icon: 'fire-ext', featured: false,
    desc: 'Спринклерни, газови, водно-мъглеви и пенни инсталации за критични зони и сървърни помещения.',
    tags: ['Спринклери', 'FM-200', 'FirePro', 'Водно-мъгляви', 'Газово', 'Пожарни кранове'],
    stats: [{ _key: 'fe1', label: 'Реализирани', value: '60+' }, { _key: 'fe2', label: 'Тип агенти', value: '5' }, { _key: 'fe3', label: 'Лиценз ПБЗН', value: '№ 743' }],
  },
  {
    _key: 'cctv', n: '03', k: 'CCTV', title: 'Видеонаблюдение', icon: 'cam', featured: false,
    desc: 'IP/PTZ, термовизия, VMS и видеоанализ — с камери на Dahua, Panasonic и водещи производители.',
    tags: ['IP / PTZ', 'Термовизия', 'VMS', 'AI видеоанализ', 'Dahua', 'Panasonic'],
    stats: [{ _key: 'c1', label: 'Камери монтирани', value: '2 400+' }, { _key: 'c2', label: 'Хранилище', value: 'до 90 дни' }, { _key: 'c3', label: 'Резолюция', value: 'до 4K' }],
  },
  {
    _key: 'panic', n: '04', k: 'PANIC', title: 'Паник системи', icon: 'panic', featured: false,
    desc: 'Дискретни паник бутони с моментално оповестяване, връзка с дежурни центрове и патрулна реакция.',
    tags: ['Стационарни', 'Мобилни', 'Дискретни', 'GSM модул', 'Връзка с СОТ'],
    stats: [{ _key: 'p1', label: 'Реакция', value: '< 30 мин' }, { _key: 'p2', label: 'Тип бутони', value: '8' }, { _key: 'p3', label: '24/7 мониторинг', value: 'ДА' }],
  },
  {
    _key: 'int', n: '05', k: 'INT', title: 'Сигнално-охранителни системи', icon: 'int', featured: false,
    desc: 'Алармени централи с периметрова и вътрешна защита от Paradox, INIM, Texecom — за всеки тип обект.',
    tags: ['Paradox', 'INIM', 'Texecom', 'Периметрова', 'Безжична', 'Хибридна'],
    stats: [{ _key: 'i1', label: 'Зони на обект', value: 'до 256' }, { _key: 'i2', label: 'GSM/IP комуникация', value: 'ДА' }, { _key: 'i3', label: 'Резервиране', value: 'N+1' }],
  },
  {
    _key: 'park', n: '06', k: 'PARK', title: 'Паркинг системи', icon: 'park', featured: false,
    desc: 'ANPR разпознаване на номера, бариери, тикет-машини и управление на платени паркинги.',
    tags: ['ANPR', 'Бариери', 'Тикет-системи', 'Платени', 'Free-flow', 'Интеграция HR'],
    stats: [{ _key: 'pk1', label: 'Пропускателна способност', value: '1 200 авт/ч' }, { _key: 'pk2', label: 'Точност ANPR', value: '98.5%' }, { _key: 'pk3', label: 'Реакция', value: '< 1.2s' }],
  },
  {
    _key: 'acs', n: '07', k: 'ACS', title: 'Системи за контрол на достъп', icon: 'key', featured: false,
    desc: 'RFID, биометрия, картови системи и турникети с интеграция към HR и работно време.',
    tags: ['RFID', 'Биометрия', 'Soyal', 'Турникети', 'Suprema', 'Работно време'],
    stats: [{ _key: 'a1', label: 'Точки за контрол', value: '500+' }, { _key: 'a2', label: 'Тип идентификация', value: '4' }, { _key: 'a3', label: 'Интеграция HR', value: 'ДА' }],
  },
  {
    _key: 'psim', n: '08', k: 'PSIM', title: 'Интегрирани системи за сигурност', icon: 'psim', featured: true,
    desc: 'PSIM платформа, която обединява пожарна, охрана, достъп, видеонаблюдение и оповестяване в единна среда.',
    tags: ['PSIM', 'SCADA', 'BMS интеграция', 'Unified Dashboard', 'Автоматизирани сценарии'],
    stats: [{ _key: 'ps1', label: 'Подсистеми', value: '8' }, { _key: 'ps2', label: 'Latency', value: '< 400ms' }, { _key: 'ps3', label: 'Uptime', value: '99.97%' }],
  },
  {
    _key: 'intercom', n: '09', k: 'INT2', title: 'Аудио и Видеодомофонни системи', icon: 'intercom', featured: false,
    desc: 'Farfisa и водещи производители — за жилищни сгради, офиси и охраняеми обекти.',
    tags: ['Farfisa', 'IP домофон', 'Видео', 'Мобилно приложение', 'Многоабонатни'],
    stats: [{ _key: 'ic1', label: 'Тип системи', value: '6' }, { _key: 'ic2', label: 'Абонати', value: 'до 1024' }, { _key: 'ic3', label: 'IP/2-wire', value: 'Двата' }],
  },
  {
    _key: 'comm', n: '10', k: 'COMM', title: 'Комуникационни системи', icon: 'comm', featured: false,
    desc: 'Вътрешни комуникации, интерком, безжични и hands-free решения за индустриални среди.',
    tags: ['Интерком', 'Безжични', 'Hands-free', 'Wallphones', 'Indust. grade'],
    stats: [{ _key: 'co1', label: 'Реализирани', value: '40+' }, { _key: 'co2', label: 'IP54+', value: 'ДА' }, { _key: 'co3', label: 'Шум', value: 'до 95 dB' }],
  },
  {
    _key: 'pa', n: '11', k: 'PA', title: 'Озвучителни и оповестителни системи', icon: 'speaker', featured: false,
    desc: 'Гласово евакуационно оповестяване EN 54-16 (Bosch, TOA), фоново озвучаване и конферентни системи.',
    tags: ['Bosch', 'TOA', 'EN 54-16', 'VES', 'Фоново озвучаване', 'Конферентни'],
    stats: [{ _key: 'pa1', label: 'Сертифицирано EN 54-16', value: 'ДА' }, { _key: 'pa2', label: 'Зони на обект', value: 'до 64' }, { _key: 'pa3', label: 'Watts', value: 'до 5 kW' }],
  },
  {
    _key: 'sks', n: '12', k: 'SKS', title: 'Структурни кабелни системи', icon: 'net', featured: false,
    desc: 'Cat6/6A медни и FO оптични мрежи, сървърни шкафове, патч панели — основата на всяка интегрирана система.',
    tags: ['Cat 6/6A', 'Cat 7', 'Optical Fiber', 'Сървърни шкафове', 'Trasses', 'Patch panels'],
    stats: [{ _key: 'sk1', label: 'Точки изградени', value: '12 000+' }, { _key: 'sk2', label: 'FO дължини', value: '85 km' }, { _key: 'sk3', label: 'Сертификация Fluke', value: 'ДА' }],
  },
];

export default function ServicesCatalog({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow ?? 'Каталог · Изграждане на системи';
  const heading = block?.heading ?? 'Дванадесет категории сертифицирани системи.';
  const lead =
    block?.lead ??
    'Всеки тип система се изгражда самостоятелно или като част от интегрирана среда. Работим със сертифицирана техника от световни производители.';
  const services = block?.services?.length ? block.services : DEFAULT_SERVICES;

  return (
    <section className="section-pad services-catalog">
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
          className="srv-grid"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('services') }).toString()}
        >
          {services.map((s) => (
            <article
              key={s._key}
              className={'srv-card ' + (s.featured ? 'featured' : '')}
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: path(`services[_key=="${s._key}"]`),
              }).toString()}
            >
              <div className="srv-card-head">
                <div className="srv-icon-box">
                  <SrvIcon kind={s.icon ?? ''} />
                </div>
                <div className="srv-meta">
                  <span className="meta">
                    {s.n ?? ''} · {s.k ?? ''}
                  </span>
                  <h3 className="h3 srv-title">{s.title ?? ''}</h3>
                </div>
              </div>
              <p className="srv-desc" dangerouslySetInnerHTML={{ __html: s.desc ?? '' }} />
              <div className="srv-tags">
                {(s.tags ?? []).map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="srv-stats">
                {(s.stats ?? []).map((st) => (
                  <div key={st._key}>
                    <div className="meta">{st.label ?? ''}</div>
                    <div className="srv-stat-v">{st.value ?? ''}</div>
                  </div>
                ))}
              </div>
              <a className="srv-link" href="/bg/kontakt">
                Запитване <Icons.Arrow />
              </a>
              <span className="srv-corner-tl" />
              <span className="srv-corner-br" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
