/* Hero camera diagram — "Техническа схема" (Variant A), transparent background.
   Detailed, realistic security cameras (dome / bullet / PTZ) wired into a full
   system: PoE NVR, live monitor, cloud, with animated signal flow + annotations.
   Theme-aware linework (var(--fg)); exposes window.HeroCameraDiagram. */
(function () {
  const MONO = "'JetBrains Mono', monospace";
  const DISP = "'Geologica', sans-serif";
  const INK = "var(--fg)";
  const MUT = "var(--fg-muted)";
  const SUB = "var(--fg-subtle)";
  const ACC = "#3B82E0";

  const CAM_DEFS = (
    <defs>
      <linearGradient id="mMetal" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset=".5" stopColor="#EDF1F6" />
        <stop offset="1" stopColor="#D2DAE5" />
      </linearGradient>
      <linearGradient id="mCyl" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#D7DEE8" />
        <stop offset=".42" stopColor="#FBFDFE" />
        <stop offset="1" stopColor="#C3CCD9" />
      </linearGradient>
      <radialGradient id="mGlass" cx="36%" cy="32%" r="72%">
        <stop offset="0" stopColor="#213B5E" />
        <stop offset=".55" stopColor="#0C1828" />
        <stop offset="1" stopColor="#04080F" />
      </radialGradient>
      <radialGradient id="mBubble" cx="40%" cy="30%" r="74%">
        <stop offset="0" stopColor="rgba(150,172,200,.55)" />
        <stop offset=".6" stopColor="rgba(54,74,104,.5)" />
        <stop offset="1" stopColor="rgba(16,26,42,.62)" />
      </radialGradient>
    </defs>
  );

  function Packet({ d, dur, begin = 0, r = 2.6, color = ACC }) {
    return (
      <circle r={r} fill={color}>
        <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.82;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      </circle>
    );
  }

  function IrRing({ cx, cy, r, n = 6, begin = 0 }) {
    return Array.from({ length: n }).map((_, i) => {
      const a = (i / n) * Math.PI * 2;
      return (
        <circle key={i} cx={cx + Math.cos(a) * r} cy={cy + Math.sin(a) * r} r="1.5" fill="#3a0d0d">
          <animate attributeName="fill" values="#3a0d0d;#ff5a4d;#3a0d0d" dur="3s" begin={`${begin + i * 0.18}s`} repeatCount="indefinite" />
        </circle>
      );
    });
  }

  /* ---------- DOME (vandal-dome) ---------- */
  function DomeCam() {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="0" cy="27" rx="30" ry="6" fill="rgba(20,35,60,.12)" />
        <ellipse cx="0" cy="-20" rx="28" ry="9" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <path d="M-28 -20 L-28 -14 A28 9 0 0 0 28 -14 L28 -20" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <path d="M-27 -15 A27 27 0 0 0 27 -15 Z" fill="url(#mBubble)" stroke={INK} strokeWidth="1.4" />
        {[-20, 0, 20].map((x, i) => <circle key={i} cx={x} cy="-18" r="1.7" fill="#9AA6B4" stroke={INK} strokeWidth=".5" />)}
        <g transform="rotate(-12)">
          <ellipse cx="2" cy="-1" rx="13" ry="11" fill="#0c1626" opacity=".5" />
          <circle cx="2" cy="0" r="8.5" fill="url(#mGlass)" stroke="#243246" strokeWidth="1" />
          <circle cx="2" cy="0" r="4.2" fill="#04080f" />
          <circle cx="-0.6" cy="-2.2" r="1.8" fill="#BFE0FF" opacity=".85"><animate attributeName="opacity" values=".5;.95;.5" dur="2.6s" repeatCount="indefinite" /></circle>
          <IrRing cx={2} cy={0} r={9.5} n={6} />
        </g>
        <path d="M-18 -10 A22 22 0 0 1 6 -22" fill="none" stroke="#fff" strokeWidth="3" opacity=".5" />
        <circle cx="22" cy="-20" r="1.7" fill="#3FBF6E"><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite" /></circle>
      </g>
    );
  }

  /* ---------- BULLET ---------- */
  function BulletCam() {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="6" cy="24" rx="32" ry="6" fill="rgba(20,35,60,.12)" />
        <rect x="-40" y="-12" width="8" height="24" rx="2.5" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <circle cx="-36" cy="-6" r="1.3" fill={INK} /><circle cx="-36" cy="6" r="1.3" fill={INK} />
        <path d="M-32 0 L-18 4" stroke={INK} strokeWidth="6" fill="none" />
        <path d="M-32 0 L-18 4" stroke="url(#mMetal)" strokeWidth="3.4" fill="none" />
        <circle cx="-18" cy="4" r="3.6" fill="url(#mMetal)" stroke={INK} strokeWidth="1.2" />
        <rect x="-16" y="-12" width="44" height="24" rx="12" fill="url(#mCyl)" stroke={INK} strokeWidth="1.4" />
        {[-6, 0, 6].map((x, i) => <line key={i} x1={x} y1="-11" x2={x} y2="11" stroke={INK} strokeWidth=".6" opacity=".28" />)}
        <path d="M-14 -12 L30 -12 L30 -8 L-14 -8 Z" fill="url(#mMetal)" stroke={INK} strokeWidth="1.2" />
        <rect x="-12" y="-14.5" width="6" height="2.6" rx="1" fill="#9AA6B4" stroke={INK} strokeWidth=".5" />
        <circle cx="29" cy="0" r="12.5" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <circle cx="29" cy="0" r="9.2" fill="#0c1626" />
        <IrRing cx={29} cy={0} r={6.6} n={6} />
        <circle cx="29" cy="0" r="5" fill="url(#mGlass)" />
        <circle cx="26.4" cy="-2.4" r="1.8" fill="#BFE0FF" opacity=".85"><animate attributeName="opacity" values=".5;.95;.5" dur="2.6s" repeatCount="indefinite" /></circle>
        <path d="M-16 7 q-9 4 -11 13" fill="none" stroke={INK} strokeWidth="1.6" opacity=".45" />
      </g>
    );
  }

  /* ---------- PTZ (speed dome) ---------- */
  function PtzCam() {
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="0" cy="29" rx="28" ry="6" fill="rgba(20,35,60,.12)" />
        <rect x="-6" y="-35" width="12" height="9" rx="2" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <rect x="-3.5" y="-27" width="7" height="6" fill="url(#mMetal)" stroke={INK} strokeWidth="1.2" />
        <path d="M-22 -20 A22 8 0 0 1 22 -20 L22 -14 A22 8 0 0 1 -22 -14 Z" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        <ellipse cx="0" cy="-20" rx="22" ry="8" fill="url(#mMetal)" stroke={INK} strokeWidth="1.4" />
        {[-12, -6, 0, 6, 12].map((x, i) => <line key={i} x1={x} y1="-19" x2={x} y2="-15" stroke={INK} strokeWidth=".7" opacity=".38" />)}
        <path d="M-23 -14 A23 24 0 0 0 23 -14 Z" fill="url(#mBubble)" stroke={INK} strokeWidth="1.4" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-11;11;-11" dur="6s" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
          <rect x="-9" y="-6" width="18" height="16" rx="5" fill="#11202f" />
          <circle cx="0" cy="3" r="7.8" fill="url(#mGlass)" stroke="#243246" strokeWidth="1" />
          <circle cx="0" cy="3" r="3.8" fill="#04080f" />
          <circle cx="-2.3" cy="0.8" r="1.6" fill="#BFE0FF" opacity=".85"><animate attributeName="opacity" values=".5;.95;.5" dur="2.4s" repeatCount="indefinite" /></circle>
        </g>
        <path d="M-16 -10 A20 20 0 0 1 4 -20" fill="none" stroke="#fff" strokeWidth="3" opacity=".45" />
      </g>
    );
  }

  /* assembled below */
  window.__camParts = { CAM_DEFS, Packet, DomeCam, BulletCam, PtzCam, MONO, DISP, INK, MUT, SUB, ACC };
})();
