'use client';

import React from 'react';
import { Counter, StreamText, Streaming } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

/* ===== ArchIcon — port from source ArchIcon() ===== */
function ArchIcon({ kind, delay = '0s' }: { kind: string; delay?: string }) {
  const c = 'var(--accent)';
  const o = 'rgba(247,215,36,.35)';
  switch (kind) {
    case 'fire':
      return (
        <g>
          <g style={{ transformOrigin: '14px 14px' }}>
            <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="0.9s" begin={delay} repeatCount="indefinite" />
            <path d="M14 4 C 17 8 20 11 20 16 a6 6 0 0 1 -12 0 c0-2 1-3.5 2-4.5 -.2 1.4 .8 2.2 1.5 1.5 -.6-1.6 0-4.5 2.5-9z" fill={c}>
              <animate attributeName="opacity" values="1;.65;1" dur="0.9s" begin={delay} repeatCount="indefinite" />
            </path>
          </g>
        </g>
      );
    case 'cam':
      return (
        <g style={{ transformOrigin: '14px 14px' }}>
          <animateTransform attributeName="transform" type="rotate" values="-18;18;-18" dur="3.2s" begin={delay} repeatCount="indefinite" />
          <rect x="3" y="9" width="16" height="10" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
          <path d="M19 12 l5 -2 v8 l-5 -2 z" fill={c} />
          <circle cx="8" cy="14" r="1.6" fill={c}>
            <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </g>
      );
    case 'key':
      return (
        <g>
          <circle cx="9" cy="14" r="5" fill="none" stroke={c} strokeWidth="1.5" />
          <circle cx="9" cy="14" r="1.8" fill={c}>
            <animate attributeName="r" values="1;2.4;1" dur="1.6s" begin={delay} repeatCount="indefinite" />
          </circle>
          <path d="M14 14 L26 14 M22 14 L22 18 M18 14 L18 17" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );
    case 'bell':
      return (
        <g style={{ transformOrigin: '14px 14px' }}>
          <animateTransform attributeName="transform" type="rotate" values="0;-12;0;12;0" dur="1.4s" begin={delay} repeatCount="indefinite" />
          <path d="M14 4 a7 7 0 0 1 7 7 v5 l2 3 H5 l2-3 v-5 a7 7 0 0 1 7-7 z" fill="none" stroke={c} strokeWidth="1.5" />
          <circle cx="14" cy="22" r="1.8" fill={c} />
        </g>
      );
    case 'speaker':
      return (
        <g>
          <path d="M4 11 v6 h4 l5 4 V7 L8 11 H4 z" fill={c} />
          <path d="M16 9 a6 6 0 0 1 0 10" fill="none" stroke={c} strokeWidth="1.5">
            <animate attributeName="opacity" values=".4;1;.4" dur="1.4s" begin={delay} repeatCount="indefinite" />
          </path>
          <path d="M19 6 a10 10 0 0 1 0 16" fill="none" stroke={c} strokeWidth="1.5" opacity=".6">
            <animate attributeName="opacity" values=".2;.7;.2" dur="1.4s" begin="-0.7s" repeatCount="indefinite" />
          </path>
        </g>
      );
    case 'bar':
      return (
        <g>
          <rect x="3" y="19" width="22" height="2.5" rx="1" fill={c} opacity=".4" />
          <rect x="3" y="15" width="22" height="2" rx="1" fill={c}>
            <animateTransform attributeName="transform" type="rotate" values="0 4 16; -65 4 16; -65 4 16; 0 4 16" keyTimes="0;.4;.6;1" dur="3s" begin={delay} repeatCount="indefinite" />
          </rect>
          <rect x="3" y="13" width="4" height="9" rx="1" fill={c} />
        </g>
      );
    case 'intercom':
      return (
        <g>
          <rect x="6" y="3" width="16" height="22" rx="2" fill="none" stroke={c} strokeWidth="1.5" />
          <rect x="10" y="7" width="8" height="6" rx="1" fill={c} opacity=".7">
            <animate attributeName="opacity" values=".4;1;.4" dur="1.6s" begin={delay} repeatCount="indefinite" />
          </rect>
          <circle cx="14" cy="19" r="1.8" fill={c} />
          <circle cx="14" cy="19" r="4" fill="none" stroke={c} strokeWidth=".8">
            <animate attributeName="r" values="1.8;5;1.8" dur="1.6s" begin={delay} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="1.6s" begin={delay} repeatCount="indefinite" />
          </circle>
        </g>
      );
    case 'net':
      return (
        <g>
          {([[5, 6], [19, 6], [5, 20], [19, 20]] as [number, number][]).map(([cx, cy], idx) => (
            <rect key={idx} x={cx - 3} y={cy - 3} width="6" height="6" rx="1" fill={c} opacity=".75">
              <animate attributeName="opacity" values=".3;1;.3" dur="1.6s" begin={idx * 0.4 + 's'} repeatCount="indefinite" />
            </rect>
          ))}
          <line x1="8" y1="6" x2="16" y2="6" stroke={c} strokeWidth="1" />
          <line x1="8" y1="20" x2="16" y2="20" stroke={c} strokeWidth="1" />
          <line x1="5" y1="9" x2="5" y2="17" stroke={c} strokeWidth="1" />
          <line x1="19" y1="9" x2="19" y2="17" stroke={c} strokeWidth="1" />
          <circle cx="12" cy="13" r="1.5" fill={c}>
            <animate attributeName="r" values="1;2.2;1" dur="1.2s" repeatCount="indefinite" />
          </circle>
        </g>
      );
    default:
      return <circle r="6" fill={c} />;
  }
}

/* ===== ArchNode — port from source ArchNode() ===== */
function ArchNode({ s, i, w, h }: { s: { l?: string; k?: string; x: number; y: number; ic: string }; i: number; w: number; h: number }) {
  const delay = i * 0.25 + 's';
  return (
    <g transform={`translate(${s.x} ${s.y})`} className="arch-node">
      <rect width={w} height={h} rx="10" fill="var(--ink-800)" stroke="rgba(255,255,255,.18)" />
      <rect width="4" height={h} rx="2" fill="var(--accent)" opacity={i % 3 === 0 ? 1 : 0.5}>
        {i % 3 === 0 && <animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite" />}
      </rect>
      <circle cx={w - 12} cy={12} r="3" fill="#42C77A">
        <animate attributeName="opacity" values="1;.3;1" dur="2s" begin={delay} repeatCount="indefinite" />
      </circle>
      <g transform={`translate(16 ${h / 2 - 14})`}>
        <ArchIcon kind={s.ic} delay={delay} />
      </g>
      <text x="48" y="26" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" fill="#F5F2EB">{s.k}</text>
      <text x="48" y="42" fontFamily="Geologica" fontSize="10" fill="rgba(255,255,255,.62)">{s.l}</text>
    </g>
  );
}

/* ===== ArchitectureDiagram — port from source ===== */
function ArchitectureDiagram({ subs }: { subs: Array<{ l?: string; k?: string; x: number; y: number; ic: string }> }) {
  const W = 150;
  const H = 60;

  return (
    <svg viewBox="0 0 880 460" className="arch-svg">
      {Array.from({ length: 23 }).map((_, i) => (
        <line key={'av' + i} x1={i * 40} x2={i * 40} y1="0" y2="460" stroke="var(--grid-line)" />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={'ah' + i} y1={i * 40} y2={i * 40} x1="0" x2="880" stroke="var(--grid-line)" />
      ))}

      <defs>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".5" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* core glow halo */}
      <circle cx="440" cy="225" r="160" fill="url(#coreGlow)" />

      {/* core */}
      <g transform="translate(440 225)">
        <circle r="90" fill="none" stroke="rgba(247,215,36,.15)" strokeDasharray="3 6">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="60s" repeatCount="indefinite" />
        </circle>
        <circle r="115" fill="none" stroke="rgba(247,215,36,.08)" strokeDasharray="2 8">
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="90s" repeatCount="indefinite" />
        </circle>

        <rect x="-110" y="-60" width="220" height="120" rx="14" fill="var(--accent)" />
        <text x="0" y="-22" textAnchor="middle" fontFamily="Geologica" fontSize="18" fontWeight="600" fill="var(--accent-ink)">PSIM CORE</text>
        <text x="0" y="0" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--accent-ink)" opacity=".7">Physical Security</text>
        <text x="0" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--accent-ink)" opacity=".7">Information Mgmt</text>
        <g transform="translate(0 36)">
          <circle r="4" fill="var(--accent-ink)">
            <animate attributeName="r" values="3;5;3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="14" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent-ink)">ONLINE · 24/7</text>
        </g>
      </g>

      {/* subsystem cards */}
      {subs.map((s, i) => (
        <ArchNode key={s.k ?? i} s={s} i={i} w={W} h={H} />
      ))}

      {/* signal paths with streaming dots */}
      {subs.map((s, i) => {
        const onLeft = s.x < 400;
        const startX = onLeft ? s.x + W : s.x;
        const startY = s.y + H / 2;
        const endX = onLeft ? 330 : 550;
        const endY = 225;
        const cx1 = startX + (onLeft ? 90 : -90);
        const cx2 = endX + (onLeft ? -60 : 60);
        const d = `M ${startX} ${startY} C ${cx1} ${startY}, ${cx2} ${endY}, ${endX} ${endY}`;
        return (
          <g key={'p' + i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 6" opacity=".55">
              <animate attributeName="stroke-dashoffset" from="0" to="-100" dur={3 + i * 0.2 + 's'} repeatCount="indefinite" />
            </path>
            <circle r="3" fill="var(--accent)">
              <animateMotion dur={3.4 + i * 0.3 + 's'} repeatCount="indefinite" path={d} keyPoints={onLeft ? '0;1' : '1;0'} keyTimes="0;1" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur={3.4 + i * 0.3 + 's'} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* status pills bottom */}
      <g transform="translate(440 425)">
        <rect x="-180" y="-14" width="360" height="28" rx="14" fill="var(--ink-800)" stroke="rgba(255,255,255,.18)" />
        <circle cx="-160" cy="0" r="4" fill="#42C77A">
          <animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
        <text x="-145" y="4" fontFamily="JetBrains Mono" fontSize="10" fill="#F5F2EB">OPERATIONAL</text>
        <text x="-60" y="4" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.55)">·  8 SUBSYSTEMS</text>
        <text x="40" y="4" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.55)">·  248 NODES</text>
        <text x="135" y="4" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.55)">·  LIVE</text>
      </g>
    </svg>
  );
}

/* ===== Types ===== */
type EventItem = {
  _key?: string;
  time?: string;
  tag?: string;
  kind?: string;
  msg?: string;
};

type KpiItem = {
  _key?: string;
  value?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label?: string;
};

type SubsystemItem = {
  _key?: string;
  key?: string;
  label?: string;
  icon?: string;
};

type ScenarioStep = {
  _key?: string;
  time?: string;
  tag?: string;
  kind?: string;
  msg?: string;
};

type Props = {
  block?: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    subsystems?: SubsystemItem[];
    events?: EventItem[];
    kpis?: KpiItem[];
    scenarioSteps?: ScenarioStep[];
  };
  index?: number;
  pageId?: string;
  pageType?: string;
};

/* Layout-only subsystem positions and default icon keys (NOT schema content).
   Indexed by subsystem order; text (key/label) is sourced from Sanity. */
const SUBS_LAYOUT = [
  { x: 30,  y: 40,  ic: 'fire' },
  { x: 30,  y: 150, ic: 'cam'  },
  { x: 30,  y: 260, ic: 'key'  },
  { x: 30,  y: 370, ic: 'bell' },
  { x: 700, y: 40,  ic: 'speaker' },
  { x: 700, y: 150, ic: 'bar'  },
  { x: 700, y: 260, ic: 'intercom' },
  { x: 700, y: 370, ic: 'net'  },
];

export default function HomeIntegration({ block, index, pageId, pageType }: Props) {
  const eyebrow  = block?.eyebrow;
  const heading  = block?.heading;
  const lead     = block?.lead;
  const events   = block?.events ?? [];
  const kpis     = block?.kpis   ?? [];
  const scenario = block?.scenarioSteps ?? [];

  /* Subsystem text comes from Sanity; x/y layout positions and the icon-key
     mapping are layout-only (not schema content) and stay sourced from SUBS_LAYOUT. */
  const subs = (block?.subsystems ?? []).map((s, idx) => {
    const layout = SUBS_LAYOUT[idx] ?? SUBS_LAYOUT[SUBS_LAYOUT.length - 1];
    return {
      l: s.label,
      k: s.key,
      x: layout.x,
      y: layout.y,
      ic: s.icon ?? layout.ic,
    };
  });

  const blockKey = block?._key ?? '';
  const path = (field: string) =>
    pageId && pageType && blockKey
      ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].${field}` }).toString()
      : undefined;

  return (
    <section className="section-pad integration dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>{eyebrow}</div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={heading} />
            </h2>
          </div>
          <p className="section-lead" data-sanity={path('lead')}>{lead}</p>
        </div>

        <div className="arch-wrap">
          <div className="arch-scan" />
          <ArchitectureDiagram subs={subs} />

          <div className="arch-side">
            {/* Live event stream */}
            <div className="arch-log">
              <div className="arch-log-head">
                <span><span className="icon-dot" /> LIVE EVENT STREAM</span>
                <span>OBJ-247 · ZONE F2</span>
              </div>
              <Streaming
                items={events.map((e) => ({
                  time: e.time,
                  tag: e.tag,
                  kind: e.kind,
                  msg: e.msg,
                }))}
              />
            </div>

            <div>
              {/* KPI grid */}
              <div className="arch-stat-row" data-sanity={path('kpis')}>
                {kpis.map((k, idx) => (
                  <div
                    className="arch-stat"
                    key={k._key ?? idx}
                    data-sanity={
                      pageId && pageType && blockKey
                        ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].kpis[_key=="${k._key ?? idx}"]` }).toString()
                        : undefined
                    }
                  >
                    <div className="arch-stat-n">
                      {k.prefix ?? ''}<Counter to={k.value ?? 0} decimals={k.decimals ?? 0} />{k.suffix ?? ''}
                    </div>
                    <div className="arch-stat-l">{k.label ?? ''}</div>
                  </div>
                ))}
              </div>

              {/* Scenario timeline */}
              <div className="arch-log" style={{ marginTop: 16 }}>
                <div className="arch-log-head">
                  <span><span className="icon-dot" /> SCENARIO · FIRE → ALL</span>
                  <span>~ 1.8 sec</span>
                </div>
                <div className="streaming" data-sanity={path('scenarioSteps')}>
                  {scenario.map((s, idx) => (
                    <div
                      className="stream-line active"
                      key={s._key ?? idx}
                      data-sanity={
                        pageId && pageType && blockKey
                          ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].scenarioSteps[_key=="${s._key ?? idx}"]` }).toString()
                          : undefined
                      }
                    >
                      <span className="stream-time">{s.time ?? ''}</span>
                      <span className={'stream-tag tag-' + (s.kind ?? 'info')}>{s.tag ?? ''}</span>
                      <span className="stream-msg">{s.msg ?? ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
