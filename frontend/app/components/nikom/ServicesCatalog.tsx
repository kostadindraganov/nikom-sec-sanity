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

export default function ServicesCatalog({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const lead = block?.lead;
  const services = block?.services ?? [];

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
