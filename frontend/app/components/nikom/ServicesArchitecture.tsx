'use client';

import { useState, useEffect } from 'react';
import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    coreLabel?: string;
    coreSubLabel?: string;
  };
  index: number;
  pageId: string;
  pageType: string;
};

const NODES = [
  { k: 'FIRE',  l: 'Пожароизв.',      r: 240 },
  { k: 'F-EXT', l: 'Пожарогасене',    r: 165 },
  { k: 'CCTV',  l: 'Видеонаблюдение', r: 240 },
  { k: 'PANIC', l: 'Паник системи',   r: 165 },
  { k: 'INT',   l: 'Охрана',          r: 240 },
  { k: 'PARK',  l: 'Паркинг',         r: 165 },
  { k: 'ACS',   l: 'Контрол достъп',  r: 240 },
  { k: 'IT',    l: 'Домофон',         r: 165 },
  { k: 'COMM',  l: 'Комуникация',     r: 240 },
  { k: 'PA',    l: 'Оповестяване',    r: 165 },
  { k: 'SKS',   l: 'Окабеляване',     r: 240 },
  { k: 'BMS',   l: 'BMS / Сграда',   r: 165 },
];

const cx = 400, cy = 320;

const positioned = NODES.map((n, i) => {
  const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
  return { ...n, x: cx + n.r * Math.cos(angle), y: cy + n.r * Math.sin(angle) };
});

export default function ServicesArchitecture({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const [hover, setHover] = useState<number | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 12), 1300);
    return () => clearInterval(id);
  }, []);

  const eyebrow = block?.eyebrow ?? 'Архитектура · Интеграция';
  const heading = block?.heading ?? 'Дванадесет системи. Една централна интеграция.';
  const lead =
    block?.lead ??
    'PSIM платформата свързва всички подсистеми в единна среда — със сценарии за автоматична реакция, корелация на събития и централно наблюдение.';

  return (
    <section className="section-pad services-arch dark-band">
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

        <div className="arch-map-wrap">
          <div className="arch-scan" />
          <svg viewBox="0 0 800 640" className="arch-map-svg">
            <defs>
              <radialGradient id="archCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity=".55" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {Array.from({ length: 21 }).map((_, i) => (
              <line key={'v' + i} x1={i * 40} x2={i * 40} y1="0" y2="640" stroke="rgba(255,255,255,.04)" />
            ))}
            {Array.from({ length: 17 }).map((_, i) => (
              <line key={'h' + i} y1={i * 40} y2={i * 40} x1="0" x2="800" stroke="rgba(255,255,255,.04)" />
            ))}

            <circle cx={cx} cy={cy} r={240} fill="none" stroke="rgba(247,215,36,.10)" strokeDasharray="2 6" />
            <circle cx={cx} cy={cy} r={165} fill="none" stroke="rgba(247,215,36,.06)" strokeDasharray="2 5" />

            {positioned.map((n, i) => {
              const active = pulse === i || hover === i;
              return (
                <line
                  key={'p' + i}
                  x1={n.x} y1={n.y} x2={cx} y2={cy}
                  stroke={active ? 'var(--accent)' : 'rgba(247,215,36,.18)'}
                  strokeWidth={active ? 1.6 : 0.8}
                  strokeDasharray="3 5"
                  opacity={active ? 1 : 0.55}
                >
                  {active && (
                    <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1s" repeatCount="indefinite" />
                  )}
                </line>
              );
            })}

            {positioned.map((n, i) => (
              <circle key={'dot' + i} r="3" fill="var(--accent)" opacity={pulse === i ? 0.9 : 0}>
                <animateMotion
                  dur="1.3s"
                  repeatCount="indefinite"
                  path={`M ${n.x} ${n.y} L ${cx} ${cy}`}
                />
              </circle>
            ))}

            <circle cx={cx} cy={cy} r="140" fill="url(#archCoreGlow)" />

            <g transform={`translate(${cx} ${cy})`}>
              <circle r="100" fill="none" stroke="rgba(247,215,36,.2)" strokeDasharray="3 6">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="50s" repeatCount="indefinite" />
              </circle>
              <circle r="120" fill="none" stroke="rgba(247,215,36,.1)" strokeDasharray="2 8">
                <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="75s" repeatCount="indefinite" />
              </circle>
              <rect x="-78" y="-50" width="156" height="100" rx="12" fill="var(--accent)" />
              <text x="0" y="-12" textAnchor="middle" fontFamily="Geologica" fontSize="20" fontWeight="600" fill="var(--accent-ink)">
                PSIM
              </text>
              <text x="0" y="8" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent-ink)" opacity=".7">
                Unified Security
              </text>
              <text x="0" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent-ink)" opacity=".7">
                Intelligence Platform
              </text>
              <circle r="3" cy="38" fill="var(--accent-ink)">
                <animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </g>

            {positioned.map((n, i) => {
              const active = pulse === i || hover === i;
              return (
                <g
                  key={'n' + i}
                  transform={`translate(${n.x} ${n.y})`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {active && (
                    <circle r="32" fill="var(--accent)" opacity=".18">
                      <animate attributeName="r" values="22;38;22" dur="1.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values=".3;0;.3" dur="1.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <rect
                    x="-50" y="-22" width="100" height="44" rx="8"
                    fill={active ? 'var(--accent)' : 'var(--ink-800)'}
                    stroke={active ? 'var(--accent)' : 'rgba(255,255,255,.18)'}
                  />
                  <text x="0" y="-3" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600"
                    fill={active ? 'var(--accent-ink)' : 'var(--accent)'}>
                    {n.k}
                  </text>
                  <text x="0" y="12" textAnchor="middle" fontFamily="Geologica" fontSize="9"
                    fill={active ? 'var(--accent-ink)' : 'rgba(255,255,255,.65)'}>
                    {n.l}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="arch-legend">
            <div className="arch-leg-item">
              <span className="arch-leg-dot accent" />
              <span>PSIM ядро</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-dot outer" />
              <span>Външен периметър — 6 системи</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-dot inner" />
              <span>Вътрешен слой — 6 системи</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-line" />
              <span>Сигнална връзка</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
