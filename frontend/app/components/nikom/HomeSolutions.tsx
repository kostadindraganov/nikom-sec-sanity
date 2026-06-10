'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { Icons } from '@/app/components/nikom/icons';
import { Counter, StreamText } from '@/app/components/nikom/animations';
import { dataAttr, linkResolver } from '@/sanity/lib/utils';
import { DereferencedLink } from '@/sanity/lib/types';
import { stegaClean } from 'next-sanity';

type Card = {
  _key?: string;
  icon?: string;
  chip?: string;
  meta?: string;
  title?: string;
  desc?: string;
  tag?: string;
  variant?: string;
  link?: DereferencedLink;
};

// Renders the "Детайли" button. When the card has a resolvable link, it navigates
// there (locale-aware, honoring openInNewTab); otherwise it stays inert (href="#").
function CardLink({ card, className, style }: { card: Card; className: string; style?: React.CSSProperties }) {
  const href = linkResolver(card.link);
  const label = (
    <>
      {card.tag} <Icons.Arrow />
    </>
  );

  if (!href) {
    return <a className={className} href="#" style={style}>{label}</a>;
  }

  return (
    <Link
      className={className}
      href={href}
      style={style}
      target={card.link?.openInNewTab ? '_blank' : undefined}
      rel={card.link?.openInNewTab ? 'noopener noreferrer' : undefined}
    >
      {label}
    </Link>
  );
}

type Props = {
  block?: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    cards?: Card[];
  };
  index?: number;
  pageId?: string;
  pageType?: string;
};

// Resolve icon key string → Icon component
function ResolveIcon({ name }: { name?: string }) {
  switch (name) {
    case 'Fire': return <Icons.Fire />;
    case 'Cam': return <Icons.Cam />;
    case 'Panic': return <Icons.Panic />;
    case 'Key': return <Icons.Key />;
    case 'Speaker': return <Icons.Speaker />;
    case 'Net': return <Icons.Net />;
    case 'Shield': return <Icons.Shield />;
    case 'Bar': return <Icons.Bar />;
    default: return <Icons.Shield />;
  }
}

function CornerTicks() {
  return (
    <>
      <span className="tick tl" /><span className="tick tr" />
      <span className="tick bl" /><span className="tick br" />
    </>
  );
}

function FireFloorPlan() {
  const detectors = [
    { x: 60,  y: 50,  zone: 'F1' },
    { x: 145, y: 50,  zone: 'F2' },
    { x: 230, y: 50,  zone: 'F3' },
    { x: 60,  y: 140, zone: 'F4' },
    { x: 145, y: 140, zone: 'F5' },
    { x: 230, y: 140, zone: 'F6' },
  ];
  const [active, setActive] = useState(1);
  useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % detectors.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const acc = 'var(--accent)';
  const dim = 'rgba(247,215,36,.35)';
  const wall = 'rgba(255,255,255,.22)';
  const grid = 'rgba(255,255,255,.05)';

  return (
    <svg viewBox="0 0 380 220" className="firefp-svg">
      <defs>
        <radialGradient id="fpGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".5"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* grid lines */}
      {Array.from({length:10}).map((_,i)=>(
        <line key={'v'+i} x1={i*38} x2={i*38} y1="0" y2="220" stroke={grid}/>
      ))}
      {Array.from({length:6}).map((_,i)=>(
        <line key={'h'+i} y1={i*44} y2={i*44} x1="0" x2="380" stroke={grid}/>
      ))}

      {/* room outline */}
      <g stroke={wall} strokeWidth="1.2" fill="none">
        <rect x="20" y="20" width="280" height="180" rx="2"/>
        {/* internal partitions */}
        <line x1="105" y1="20" x2="105" y2="200"/>
        <line x1="190" y1="20" x2="190" y2="200"/>
        <line x1="20" y1="100" x2="300" y2="100"/>
        {/* door gaps */}
        <line x1="105" y1="55" x2="105" y2="75" stroke="var(--ink-900)" strokeWidth="2.5"/>
        <line x1="190" y1="140" x2="190" y2="160" stroke="var(--ink-900)" strokeWidth="2.5"/>
      </g>

      {/* PSIM gateway on the right */}
      <g transform="translate(330 100)">
        <rect x="-22" y="-26" width="44" height="52" rx="4" fill="var(--ink-700)" stroke={dim}/>
        <text x="0" y="-10" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill={acc}>FACP</text>
        <circle cx="0" cy="2" r="3" fill={acc}>
          <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/>
        </circle>
        <text x="0" y="16" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6" fill="rgba(255,255,255,.6)">PANEL</text>
      </g>

      {/* room labels */}
      <text x="62" y="44" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">SRV-01</text>
      <text x="148" y="44" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">OFFICE</text>
      <text x="232" y="44" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">CORR</text>
      <text x="62" y="194" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">ARCHV</text>
      <text x="148" y="194" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">LAB-02</text>
      <text x="232" y="194" fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.4)">PLANT</text>

      {/* signal lines from each detector → FACP */}
      {detectors.map((d, i) => (
        <path
          key={'l'+i}
          d={`M ${d.x} ${d.y} Q ${(d.x+330)/2} ${d.y < 100 ? d.y - 10 : d.y + 10} 330 100`}
          fill="none"
          stroke={i === active ? acc : dim}
          strokeWidth={i === active ? 1.4 : 0.8}
          strokeDasharray={i === active ? '3 3' : '2 4'}
          opacity={i === active ? 1 : 0.5}
        >
          {i === active && (
            <animate attributeName="stroke-dashoffset" from="0" to="-30" dur="1.2s" repeatCount="indefinite"/>
          )}
        </path>
      ))}

      {/* detectors */}
      {detectors.map((d, i) => {
        const isActive = i === active;
        return (
          <g key={'d'+i} transform={`translate(${d.x} ${d.y})`}>
            {isActive && (
              <>
                <circle r="14" fill="url(#fpGlow)">
                  <animate attributeName="r" values="6;22;6" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>
                <circle r="10" fill="none" stroke={acc} strokeWidth="1">
                  <animate attributeName="r" values="4;14;4" dur="1.6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite"/>
                </circle>
              </>
            )}
            {/* detector body */}
            <circle r="5" fill={isActive ? acc : 'var(--ink-700)'} stroke={dim} strokeWidth="0.8"/>
            <circle r="2" fill={isActive ? 'var(--accent-ink)' : acc} opacity={isActive ? 1 : 0.45}>
              {isActive && <animate attributeName="opacity" values="1;.4;1" dur="0.6s" repeatCount="indefinite"/>}
            </circle>
            {/* zone label */}
            <text x="0" y="-9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6"
                  fill={isActive ? acc : 'rgba(255,255,255,.45)'}
                  fontWeight={isActive ? 600 : 400}>{d.zone}</text>
          </g>
        );
      })}

      {/* corner brackets */}
      <g stroke={acc} strokeWidth="1" fill="none" opacity=".55">
        <path d="M0 0 L0 10 M0 0 L10 0"/>
        <path d="M380 0 L380 10 M380 0 L370 0"/>
        <path d="M0 220 L0 210 M0 220 L10 220"/>
        <path d="M380 220 L380 210 M380 220 L370 220"/>
      </g>

      {/* status text bottom */}
      <g transform="translate(20 215)">
        <text fontFamily="JetBrains Mono" fontSize="7" fill="rgba(255,255,255,.5)" letterSpacing="0.06em">
          ZONE&nbsp;{detectors[active].zone} · DETECTION · ACK
        </text>
      </g>
    </svg>
  );
}

function AcsVisual() {
  return (
    <svg viewBox="0 0 220 160" className="acs-svg">
      <rect x="20" y="30" width="120" height="100" rx="6" fill="var(--bg-soft)" stroke="var(--border-strong)" />
      <rect x="30" y="42" width="100" height="14" rx="2" fill="var(--ink-700)" opacity=".18" />
      <rect x="30" y="62" width="60" height="8" rx="2" fill="var(--ink-700)" opacity=".12" />
      <circle cx="80" cy="98" r="20" fill="var(--accent)">
        <animate attributeName="r" values="18;22;18" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path d="M73 98l5 5 10-10" stroke="var(--accent-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="155" y="40" width="50" height="90" rx="3" fill="var(--bg-elev)" stroke="var(--border-strong)" />
      <circle cx="180" cy="60" r="6" fill="var(--accent)">
        <animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <rect x="166" y="74" width="28" height="3" fill="var(--ink-300)" />
      <rect x="166" y="82" width="20" height="3" fill="var(--ink-300)" />
      <rect x="166" y="100" width="28" height="20" rx="2" fill="var(--ink-800)" opacity=".15" />
      <path d="M140 95 L155 80" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function IntegrationMini() {
  const nodes = [
    { x: 30,  y: 30,  l: 'FIRE' },
    { x: 30,  y: 130, l: 'CCTV' },
    { x: 240, y: 30,  l: 'PA' },
    { x: 240, y: 130, l: 'ACS' },
  ];
  return (
    <svg viewBox="0 0 280 170" className="intmini-svg">
      <circle cx="140" cy="80" r="36" fill="var(--accent)">
        <animate attributeName="r" values="34;38;34" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <text x="140" y="76" textAnchor="middle" fontFamily="Geologica" fontSize="11" fill="var(--accent-ink)" fontWeight="600">PSIM</text>
      <text x="140" y="90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent-ink)">core</text>
      {nodes.map((n, i) => (
        <g key={i}>
          <path d={`M ${n.x + 40} ${n.y} Q 140 ${n.y < 80 ? 30 : 130} 140 80`} fill="none"
            stroke="rgba(247,215,36,.7)" strokeWidth="1.2" strokeDasharray="2 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur={String(2 + i * 0.3) + 's'} repeatCount="indefinite" />
          </path>
          <rect x={n.x - 22} y={n.y - 12} width="44" height="24" rx="3" fill="var(--bg-elev)" stroke="var(--border-strong)" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--fg)">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}

function BentoCard({ card, pageId, pageType, blockKey, arrayPath }: {
  card: Card;
  pageId?: string;
  pageType?: string;
  blockKey?: string;
  arrayPath?: string;
}) {
  const variant = stegaClean(card.variant) ?? 'default';
  const itemKey = card._key ?? '';

  const itemDataAttr = (pageId && pageType && blockKey && arrayPath && itemKey)
    ? dataAttr({ id: pageId, type: pageType, path: `${arrayPath}[_key=="${itemKey}"]` }).toString()
    : undefined;

  if (variant === 'fire') {
    return (
      <div className="bento-card span-2 row-2 fire-card" data-sanity={itemDataAttr}>
        <div className="fire-grid" />
        <div className="fire-glow" />

        <div className="card-meta" style={{ position: 'relative', zIndex: 2 }}>
          <span className="chip dark">{card.chip}</span>
          <span className="meta">{card.meta}</span>
        </div>

        <div className="fire-title" style={{ position: 'relative', zIndex: 2 }}>
          <div className="card-icon anim"><ResolveIcon name={card.icon} /></div>
          <h3 className="h3">{card.title}</h3>
        </div>

        <div className="fire-diagram" style={{ position: 'relative', zIndex: 2 }}>
          <FireFloorPlan />
        </div>

        <div className="fire-mini-stats" style={{ position: 'relative', zIndex: 2 }}>
          <div className="fms">
            <div className="fms-n"><Counter to={210} />+</div>
            <div className="fms-l">обекта</div>
          </div>
          <div className="fms-sep" />
          <div className="fms">
            <div className="fms-n">EN 54</div>
            <div className="fms-l">сертифицирано</div>
          </div>
          <div className="fms-sep" />
          <div className="fms">
            <div className="fms-n">24/7</div>
            <div className="fms-l">мониторинг</div>
          </div>
        </div>

        <CardLink card={card} className="card-link" style={{ position: 'relative', zIndex: 2 }} />
        <CornerTicks />
      </div>
    );
  }

  if (variant === 'wide') {
    return (
      <div className="bento-card span-2" data-sanity={itemDataAttr}>
        <div className="card-meta">
          <span className="chip">{card.chip}</span>
          <span className="meta">{card.meta}</span>
        </div>
        <div className="card-row">
          <div>
            <div className="card-icon anim"><ResolveIcon name={card.icon} /></div>
            <h3 className="h3">{card.title}</h3>
            <p>{card.desc}</p>
          </div>
          <div className="acs-visual">
            <AcsVisual />
          </div>
        </div>
        <CornerTicks />
      </div>
    );
  }

  if (variant === 'dark-wide') {
    return (
      <div className="bento-card span-2 dark" data-sanity={itemDataAttr}>
        <div className="card-meta">
          <span className="chip solid">{card.chip}</span>
          <span className="meta light">{card.meta}</span>
        </div>
        <div className="card-row">
          <div>
            <h3 className="h3">{card.title}</h3>
            <p>{card.desc}</p>
          </div>
          <div className="int-visual">
            <IntegrationMini />
          </div>
        </div>
        <CardLink card={card} className="card-link light" />
      </div>
    );
  }

  // default card
  return (
    <div className="bento-card" data-sanity={itemDataAttr}>
      <div className="card-meta">
        <span className="chip">{card.chip}</span>
        <span className="icon-dot" />
      </div>
      <div className="card-icon anim"><ResolveIcon name={card.icon} /></div>
      <h3 className="h4">{card.title}</h3>
      <p>{card.desc ?? ''}</p>
      <CardLink card={card} className="card-link" />
      <CornerTicks />
    </div>
  );
}

export default function HomeSolutions({ block, index, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const lead = block?.lead;
  const cards = block?.cards ?? [];
  const blockKey = block?._key ?? '';

  const fieldPath = (field: string) =>
    (pageId && pageType && blockKey)
      ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].${field}` }).toString()
      : undefined;

  const arrayPath = (pageId && pageType && blockKey)
    ? `pageBuilder[_key=="${blockKey}"].cards`
    : undefined;

  return (
    <section className="section-pad solutions" id="solutions">
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
          className="bento"
          data-sanity={arrayPath ? dataAttr({ id: pageId!, type: pageType!, path: arrayPath }).toString() : undefined}
        >
          {cards.map((card) => (
            <BentoCard
              key={card._key}
              card={card}
              pageId={pageId}
              pageType={pageType}
              blockKey={blockKey}
              arrayPath={arrayPath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
