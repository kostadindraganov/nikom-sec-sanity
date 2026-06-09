/* Hero camera diagram assembly (Variant A). Builds the full technical schematic
   from window.__camParts and exposes window.HeroCameraDiagram. */
(function () {
  const P = window.__camParts || {};
  const { CAM_DEFS, Packet, DomeCam, BulletCam, PtzCam, MONO, DISP, INK, MUT, SUB, ACC } = P;

  function CamNode({ x, y, scale = 1.2, code, name, spec, Comp }) {
    return (
      <g>
        <g transform={`translate(${x} ${y}) scale(${scale})`}><Comp /></g>
        <text x={x} y={y + 52} textAnchor="middle" fontFamily={DISP} fontSize="13" fontWeight="600" fill={INK}>{name}</text>
        <text x={x} y={y + 66} textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="0.04em" fill={MUT}>{spec}</text>
        <text x={x} y={y + 79} textAnchor="middle" fontFamily={MONO} fontSize="7.5" letterSpacing="0.12em" fill={ACC}>{code}</text>
      </g>
    );
  }

  function NvrNode() {
    return (
      <g transform="translate(262 384)" strokeLinejoin="round">
        <ellipse cx="6" cy="46" rx="74" ry="11" fill="rgba(20,35,60,.10)" />
        {/* 2.5D body */}
        <polygon points="-58,-2 58,-2 74,-20 -42,-20" fill="var(--bg-elev)" stroke={INK} strokeWidth="1.3" />
        <polygon points="58,-2 74,-20 74,30 58,42" fill="var(--bg-soft)" stroke={INK} strokeWidth="1.3" />
        <polygon points="58,-2 74,-20 74,30 58,42" fill="rgba(0,0,0,.10)" stroke="none" />
        <rect x="-58" y="-2" width="116" height="44" rx="2" fill="var(--bg-elev)" stroke={INK} strokeWidth="1.3" />
        {/* mini display */}
        <rect x="-50" y="6" width="34" height="22" rx="2" fill="#06101b" stroke="#27435f" strokeWidth="1" />
        <rect x="-47" y="9" width="28" height="3" fill="#3FBF6E" opacity=".85"><animate attributeName="width" values="5;28;5" dur="2.6s" repeatCount="indefinite" /></rect>
        <line x1="-47" y1="16" x2="-21" y2="16" stroke={ACC} strokeWidth="1" opacity=".5" /><line x1="-47" y1="20" x2="-27" y2="20" stroke={ACC} strokeWidth="1" opacity=".4" />
        {/* label */}
        <text x="-8" y="14" fontFamily={DISP} fontSize="15" fontWeight="700" fill={INK}>NVR</text>
        <text x="-8" y="26" fontFamily={MONO} fontSize="7.5" letterSpacing="0.06em" fill={MUT}>16-CH · PoE · 8TB</text>
        {/* PoE port row */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`translate(${-50 + i * 13} 34)`}>
            <rect x="0" y="0" width="9" height="5" rx="1" fill="var(--bg-soft)" stroke={INK} strokeWidth=".6" />
            <circle cx="4.5" cy="-2.6" r="1.2" fill="#3FBF6E"><animate attributeName="opacity" values=".25;1;.25" dur={`${1.2 + i * 0.22}s`} repeatCount="indefinite" /></circle>
          </g>
        ))}
        {/* status LEDs */}
        {[0, 1, 2].map(i => <circle key={i} cx={50 + i * 0} cy={6 + i * 7} r="1.7" fill={i === 2 ? "#E0563E" : "#3FBF6E"}><animate attributeName="opacity" values=".3;1;.3" dur={`${1 + i * 0.4}s`} repeatCount="indefinite" /></circle>)}
      </g>
    );
  }

  function MonitorNode() {
    const tiles = [[-30, -16], [2, -16], [-30, 2], [2, 2]];
    return (
      <g transform="translate(384 446)" strokeLinejoin="round">
        <ellipse cx="0" cy="40" rx="36" ry="6" fill="rgba(20,35,60,.10)" />
        <rect x="-8" y="26" width="16" height="12" fill="var(--bg-soft)" stroke={INK} strokeWidth="1" />
        <ellipse cx="0" cy="40" rx="22" ry="4" fill="var(--bg-elev)" stroke={INK} strokeWidth="1" />
        <rect x="-40" y="-30" width="80" height="58" rx="5" fill="#0c1722" stroke={INK} strokeWidth="1.3" />
        <rect x="-35" y="-26" width="70" height="44" rx="2" fill="#050d16" />
        {tiles.map((t, i) => (
          <g key={i}>
            <clipPath id={`mt${i}`}><rect x={t[0]} y={t[1]} width="28" height="14" rx="1" /></clipPath>
            <rect x={t[0]} y={t[1]} width="28" height="14" rx="1" fill="#0a1622" stroke="#1d2b3c" strokeWidth=".6" />
            <g clipPath={`url(#mt${i})`}>
              <rect x={t[0]} y={t[1]} width="28" height="2" fill="#5AA8FF" opacity=".5"><animateTransform attributeName="transform" type="translate" values={`0 0;0 12;0 0`} dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" /></rect>
            </g>
          </g>
        ))}
        <circle cx="32" cy="-23" r="1.8" fill="#FF4D3D"><animate attributeName="opacity" values="1;.15;1" dur="1.3s" repeatCount="indefinite" /></circle>
        <text x="-35" y="25" fontFamily={MONO} fontSize="6" fill="#7FA6D0" letterSpacing="0.1em">LIVE · 16CH</text>
      </g>
    );
  }

  function CloudNode() {
    return (
      <g transform="translate(262 74)">
        <path d="M-30 8 a14 14 0 0 1 5 -27 a17 17 0 0 1 32 3 a12 12 0 0 1 3 24 Z" fill="var(--bg-elev)" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
        <text x="2" y="-2" textAnchor="middle" fontFamily={DISP} fontSize="10" fontWeight="600" fill={INK}>ОБЛАК</text>
        <text x="2" y="9" textAnchor="middle" fontFamily={MONO} fontSize="6.5" letterSpacing="0.06em" fill={MUT}>отдалечен достъп</text>
      </g>
    );
  }

  function HeroCameraDiagram() {
    const links = [
      { d: "M108 190 Q150 300 214 366", ch: "CH1", t: [150, 286] },
      { d: "M360 190 Q322 300 312 366", ch: "CH2", t: [332, 286] },
      { d: "M134 438 Q186 420 214 404", ch: "CH3", t: [168, 432] },
    ];
    return (
      <svg viewBox="0 0 480 600" width="100%" preserveAspectRatio="xMidYMid meet" className="cam-svg">
        {CAM_DEFS}

        {/* crop / registration marks */}
        <g stroke={ACC} strokeWidth="1.4" opacity=".7">
          <path d="M16 34 V18 H32" fill="none" /><path d="M448 18 H464 V34" fill="none" />
          <path d="M16 566 V582 H32" fill="none" /><path d="M464 566 V582 H448" fill="none" />
        </g>
        <text x="28" y="46" fontFamily={MONO} fontSize="11" letterSpacing="0.12em" fill={INK}>ОХРАНИТЕЛНА СИСТЕМА</text>
        <text x="28" y="60" fontFamily={MONO} fontSize="8.5" letterSpacing="0.1em" fill={SUB}>СХЕМА · v2026 · REV.3</text>

        <CloudNode />
        {/* cloud <-> NVR sync link */}
        <path d="M262 100 L262 356" stroke={ACC} strokeWidth="1.2" strokeDasharray="2 5" fill="none" opacity=".5" />
        <Packet d="M262 356 L262 100" dur={2.8} r={2.3} color="#7FB4F0" />
        <Packet d="M262 100 L262 356" dur={2.8} begin={1.4} r={2.3} color="#7FB4F0" />

        {/* camera → NVR links + channel tags */}
        <g fill="none" stroke={ACC} strokeWidth="1.4" strokeDasharray="2 5" opacity=".55">
          {links.map((l, i) => <path key={i} d={l.d} />)}
        </g>
        {links.map((l, i) => <Packet key={i} d={l.d} dur={2} begin={i * 0.45} r={2.6} />)}
        {links.map((l, i) => (
          <g key={i} transform={`translate(${l.t[0]} ${l.t[1]})`}>
            <rect x="-12" y="-7" width="24" height="13" rx="3" fill="var(--bg)" stroke={ACC} strokeWidth=".8" opacity=".9" />
            <text x="0" y="2.5" textAnchor="middle" fontFamily={MONO} fontSize="7.5" fill={ACC}>{l.ch}</text>
          </g>
        ))}

        {/* NVR → monitor */}
        <path d="M320 392 Q352 414 372 434" stroke={ACC} strokeWidth="1.4" strokeDasharray="2 5" fill="none" opacity=".55" />
        <Packet d="M320 392 Q352 414 372 434" dur={1.5} r={2.4} color="#9FE0FF" />

        <NvrNode />
        <MonitorNode />

        {/* cameras */}
        <CamNode x={96}  y={172} code="IPC-D24" name="Куполна" spec="4MP · IK10" Comp={DomeCam} />
        <CamNode x={374} y={172} code="IPC-B47" name="Булет"   spec="8MP · IP67 · IR60m" Comp={BulletCam} />
        <CamNode x={110} y={450} code="SD-92X"  name="PTZ"     spec="4MP · 25× zoom" Comp={PtzCam} />

        {/* legend */}
        <g fontFamily={MONO} fontSize="8" fill={MUT}>
          <circle cx="32" cy="556" r="2.6" fill="#3FBF6E" /><text x="40" y="559">онлайн</text>
          <circle cx="100" cy="556" r="2.6" fill={ACC} /><text x="108" y="559">PoE / данни</text>
          <circle cx="196" cy="556" r="2.6" fill="#FF4D3D" /><text x="204" y="559">аларма</text>
        </g>
      </svg>
    );
  }

  window.HeroCameraDiagram = HeroCameraDiagram;
})();
