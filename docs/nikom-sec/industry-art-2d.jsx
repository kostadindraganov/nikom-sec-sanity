/* Flat 2D (non-3D) animated scenes for the Industries grid.
   Three switchable styles — "blueprint" (detailed colour elevation),
   "radar", "grid" — each with a distinct scene per sector (k).
   Exposed via window.IndustryScene; falls back to the original isometric
   art when variant === "iso". */

(function () {
  const ACC  = "var(--accent)";
  const ACS  = "var(--accent-strong)";
  const MUT  = "var(--fg-muted)";
  const SUB  = "var(--fg-subtle)";
  const GRID = "var(--grid-line)";
  const ELEV = "var(--bg-elev)";

  /* security-system colour palette (theme-stable mid-tones) */
  const BLUE  = "#4F9CF2";   // CCTV / surveillance
  const GREEN = "#36B06A";   // access granted / OK
  const RED   = "#E8513C";   // fire / alarm
  const AMBER = "#FFC24D";   // lit / occupied windows
  const GLASS = "rgba(79,156,242,0.42)";
  const DARK  = "#11161D";

  /* ---------------------------------------------------------------- */
  /*  Sector glyphs — simple 24x24 line marks, stroke = currentColor  */
  /* ---------------------------------------------------------------- */
  function Glyph({ k, sw = 2 }) {
    const c = { fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
    switch (k) {
      case "hospital": return <g {...c}><path d="M12 5v14M5 12h14" /></g>;
      case "retail":   return <g {...c}><path d="M6 8h12l-1 11H7L6 8Z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></g>;
      case "hotel":    return <g {...c}><circle cx="8.5" cy="12" r="3.4" /><path d="M11.8 12H20v3.2M16.2 12v3.2" /></g>;
      case "ind":      return <g {...c}><path d="M4 19V10l5 3.2V10l5 3.2V7.4h6V19H4Z" /><path d="M17.5 7.4V4.6h1.8" /></g>;
      case "office":   return <g {...c}><path d="M7.5 19V5h9v14M10.4 8.2h.6M14 8.2h.6M10.4 12h.6M14 12h.6M11 19v-2.6h2V19" /></g>;
      case "gov":      return <g {...c}><path d="M12 4.5 5 7v5.2c0 4 3 6.8 7 7.8 4-1 7-3.8 7-7.8V7l-7-2.5Z" /><path d="M9.4 11v3.4M12 11v3.4M14.6 11v3.4" /></g>;
      default:         return <g {...c}><circle cx="12" cy="12" r="7" /></g>;
    }
  }
  function GlyphAt({ k, x, y, scale = 1, color = MUT, sw = 2 }) {
    return <g transform={`translate(${x} ${y}) scale(${scale})`} color={color}><g transform="translate(-12 -12)"><Glyph k={k} sw={sw} /></g></g>;
  }

  /* ================================================================ */
  /*  SECURITY DEVICE LIBRARY — flat 2D, animated                     */
  /* ================================================================ */

  // CCTV bullet camera; body+cone pan together. aim in degrees.
  function Cam({ x, y, aim = 0, len = 38, arm = 9, color = BLUE, dur = 5 }) {
    return (
      <g transform={`translate(${x} ${y}) rotate(${aim})`}>
        <line x1={-arm} y1="0" x2="0" y2="0" stroke={MUT} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx={-arm} cy="0" r="1.7" fill={MUT} />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-13;13;-13" dur={dur + "s"}
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
          <polygon points={`6,0 ${len},${-len * 0.26} ${len},${len * 0.26}`} fill={color} opacity=".14">
            <animate attributeName="opacity" values=".05;.2;.05" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          <line x1="6" y1="0" x2={len} y2="0" stroke={color} strokeWidth=".8" opacity=".5" strokeDasharray="2 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
          </line>
          <rect x="-2" y="-3.4" width="11" height="6.8" rx="2.4" fill={ELEV} stroke={MUT} strokeWidth="1" />
          <rect x="-1" y="-3.2" width="8" height="1.7" rx=".8" fill="#fff" opacity=".2" />
          <circle cx="8" cy="0" r="2.5" fill={DARK} stroke={color} strokeWidth=".9" />
          <circle cx="7.2" cy="-0.8" r=".8" fill="#CFE6FF" opacity=".9" />
        </g>
      </g>
    );
  }

  // ceiling dome camera with sweeping downward cone
  function Dome({ x, y, color = BLUE }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-9" y="-3.2" width="18" height="3.2" rx="1.2" fill={ELEV} stroke={MUT} strokeWidth="1" />
        <path d="M-7.5 0 A7.5 7.5 0 0 0 7.5 0 Z" fill={ELEV} stroke={MUT} strokeWidth="1" />
        <path d="M-7.5 0 A7.5 7.5 0 0 0 7.5 0 Z" fill={DARK} opacity=".22" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-28;28;-28" dur="4.6s"
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
          <polygon points="0,3 -11,32 11,32" fill={color} opacity=".12">
            <animate attributeName="opacity" values=".04;.18;.04" dur="3s" repeatCount="indefinite" />
          </polygon>
        </g>
        <circle cx="0" cy="2.5" r="1.8" fill={color}>
          <animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // PIR motion sensor with green detection cone
  function PIR({ x, y, dir = 1, color = GREEN }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <polygon points={`0,0 ${30 * dir},-12 ${30 * dir},12`} fill={color}>
          <animate attributeName="opacity" values=".04;.22;.04" dur="2.6s" repeatCount="indefinite" />
        </polygon>
        <rect x="-3" y="-4.5" width="6" height="9" rx="3" fill={ELEV} stroke={MUT} strokeWidth=".9" />
        <circle cx="0" cy="0" r="1.4" fill={color}>
          <animate attributeName="opacity" values=".4;1;.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // ceiling fire/smoke detector: red blink + periodic detection ring
  function Fire({ x, y }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="0" rx="6" ry="2.6" fill={ELEV} stroke={MUT} strokeWidth=".9" />
        <circle cx="0" cy="0" r="1.5" fill={RED}>
          <animate attributeName="opacity" values="1;.15;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="none" stroke={RED} strokeWidth="1" opacity="0">
          <animate attributeName="r" values="3;16" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;.7;0" keyTimes="0;0.55;0.63;1" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // wall strobe/siren: red lamp + radiating sound rings
  function Strobe({ x, y, color = RED }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        {[0, 1, 2].map(i => (
          <circle key={i} cx="0" cy="0" r="3" fill="none" stroke={color} strokeWidth="1.1" opacity="0">
            <animate attributeName="r" values="3;13" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".7;0" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="-4.5" y="-4.5" width="9" height="9" rx="2" fill={ELEV} stroke={MUT} strokeWidth=".8" />
        <circle cx="0" cy="0" r="2.4" fill={color}>
          <animate attributeName="opacity" values="1;.2;1" dur="0.7s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // access card reader: green LED + tap pulse
  function Reader({ x, y, color = GREEN }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-3.2" y="-6" width="7" height="12" rx="1.8" fill={ELEV} stroke={MUT} strokeWidth=".8" />
        <rect x="-1.6" y="-4.2" width="3.6" height="3.6" rx=".8" fill={color}>
          <animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <circle cx="0.2" cy="-0.5" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0">
          <animate attributeName="r" values="2;11" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".7;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // boom barrier raising/lowering
  function Barrier({ x, y, flip = 1, color = ACC }) {
    return (
      <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
        <rect x="-2.6" y="-15" width="5.2" height="17" rx="1.5" fill={ELEV} stroke={MUT} strokeWidth=".8" />
        <circle cx="0" cy="-13" r="2.4" fill={MUT} />
        <g transform="translate(0 -13)">
          <animateTransform attributeName="transform" type="rotate" values="0;0;-74;-74;0" keyTimes="0;0.18;0.36;0.82;1" dur="5.5s" additive="sum" repeatCount="indefinite" />
          <rect x="0" y="-1.8" width="32" height="3.6" rx="1.8" fill={ELEV} stroke={MUT} strokeWidth=".7" />
          {[4, 14, 24].map(d => <rect key={d} x={d} y="-1.8" width="5" height="3.6" fill={RED} />)}
        </g>
      </g>
    );
  }

  // NVR / control panel with blinking status LEDs
  function NVR({ x = 20, y = 110 }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-10" y="-9" width="20" height="18" rx="2.2" fill={ELEV} stroke={MUT} strokeWidth="1.2" />
        <rect x="-10" y="-9" width="20" height="5.5" rx="2.2" fill={MUT} opacity=".16" />
        {[[-5.5, GREEN, 0], [0, BLUE, 0.5], [5.5, AMBER, 1]].map(([lx, c, b], i) => (
          <circle key={i} cx={lx} cy="-6.2" r="1.3" fill={c}>
            <animate attributeName="opacity" values=".3;1;.3" dur="1.6s" begin={`${b}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[0, 1].map(r => [0, 1, 2, 3].map(c => (
          <rect key={r + "-" + c} x={-7.5 + c * 4} y={-1 + r * 4} width="3" height="2.4" rx=".5" fill={SUB} opacity=".5" />
        )))}
      </g>
    );
  }

  // live signal link: dashed line + travelling packet dot
  function Sig({ x1, y1, x2, y2, color = BLUE, dur = 2 }) {
    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth=".9" opacity=".45" strokeDasharray="2 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="0.9s" repeatCount="indefinite" />
        </line>
        <circle r="1.7" fill={color}>
          <animateMotion path={`M${x1} ${y1} L${x2} ${y2}`} dur={dur + "s"} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur={dur + "s"} repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  /* ================================================================ */
  /*  STYLE A — DETAILED 2D ELEVATION SCENES                          */
  /* ================================================================ */
  const GROUND = 120;
  const STROKE = MUT, SW = 1.4;

  function Wall(p) { return <rect {...p} fill={ELEV} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />; }
  function Shadow({ cx, w }) { return <ellipse cx={cx} cy={GROUND + 2} rx={w / 2} ry="4" fill="rgba(0,0,0,0.13)" />; }
  // window
  function W({ x, y, w = 8, h = 9, lit = false, begin = 0, glass = GLASS }) {
    return (
      <rect x={x} y={y} width={w} height={h} fill={lit ? AMBER : glass} stroke={STROKE} strokeWidth=".5" opacity={lit ? 0.95 : 0.62}>
        {lit && <animate attributeName="opacity" values=".4;1;.4" dur="3.4s" begin={`${begin}s`} repeatCount="indefinite" />}
      </rect>
    );
  }
  function row(x, y, n, gap, props) { return Array.from({ length: n }, (_, i) => <W key={i} x={x + i * (( props.w || 8) + gap)} y={y} {...props} begin={(props.begin || 0) + i * 0.4} />); }

  const BP = {
    /* ---------- HOSPITAL ---------- */
    hospital: () => (<g>
      <Shadow cx={92} w={104} />
      <Wall x={44} y={84} width={32} height={36} />
      <Wall x={74} y={50} width={58} height={70} />
      <rect x={72} y={47} width={62} height={5} rx={1.5} fill={MUT} opacity=".2" />
      {/* glass facade */}
      {[0, 1, 2, 3].map(r => row(80, 58 + r * 13, 4, 4, { w: 8, h: 8, lit: (r === 1), begin: r * 0.5 }))}
      {row(50, 92, 2, 6, { w: 9, h: 9, lit: true, begin: 0.6 })}
      {/* entrance + green-lit doors */}
      <rect x={94} y={104} width={18} height={16} fill={DARK} opacity=".8" />
      <rect x={94} y={104} width={18} height={2.4} fill={GREEN} opacity=".85"><animate attributeName="opacity" values=".4;.9;.4" dur="2.4s" repeatCount="indefinite" /></rect>
      <rect x={90} y={100} width={26} height={5} rx={1.5} fill={ACC} />
      {/* rooftop red cross sign */}
      <g transform="translate(103 38)">
        <rect x="-10" y="-12" width="20" height="13" rx="2" fill={ELEV} stroke={STROKE} strokeWidth="1" />
        <g fill={RED}><rect x="-2.4" y="-10" width="4.8" height="9" rx="1" /><rect x="-6.6" y="-6.1" width="13" height="4.8" rx="1" />
          <animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite" /></g>
      </g>
      <Dome x={103} y={101} />
      <Fire x={60} y={90} />
      <Reader x={117} y={112} />
      <Cam x={42} y={60} aim={20} />
      <Sig x1={42} y1={60} x2={22} y2={104} />
    </g>),

    /* ---------- RETAIL ---------- */
    retail: () => (<g>
      <Shadow cx={110} w={150} />
      <Wall x={40} y={76} width={140} height={44} />
      {/* awning */}
      <path d="M34 76 q76 -18 152 0 l0 6 q-76 -16 -152 0 Z" fill={ACC} stroke={ACS} strokeWidth="1" />
      {/* signage band */}
      <rect x={48} y={58} width={124} height={11} rx={2} fill={DARK} />
      <rect x={56} y={61} width={60} height={5} rx={1} fill={ACC} opacity=".9"><animate attributeName="opacity" values=".5;1;.5" dur="2.6s" repeatCount="indefinite" /></rect>
      {/* big display windows */}
      {row(50, 88, 5, 6, { w: 20, h: 22, lit: false })}
      {/* doorway + EAS anti-theft gates with blue beam */}
      <rect x={102} y={98} width={16} height={22} fill={DARK} opacity=".55" stroke={STROKE} strokeWidth=".8" />
      <line x1={100} y1={98} x2={100} y2={120} stroke={MUT} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={120} y1={98} x2={120} y2={120} stroke={MUT} strokeWidth="2.4" strokeLinecap="round" />
      <line x1={100} y1={106} x2={120} y2={106} stroke={BLUE} strokeWidth="1.4"><animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite" /></line>
      <Dome x={110} y={73} />
      <Cam x={50} y={84} aim={28} />
      <Strobe x={170} y={70} />
      <Reader x={92} y={108} />
      <Sig x1={50} y1={84} x2={22} y2={104} />
    </g>),

    /* ---------- HOTEL ---------- */
    hotel: () => (<g>
      <Shadow cx={110} w={108} />
      <Wall x={58} y={92} width={104} height={28} />
      <Wall x={86} y={28} width={48} height={92} />
      <rect x={84} y={25} width={52} height={4} rx={1.5} fill={MUT} opacity=".2" />
      {/* balcony rows; one window lit */}
      {[0, 1, 2, 3, 4, 5].map(r => (
        <g key={r}>
          <W x={92} y={36 + r * 9} w={9} h={7} lit={r === 2} begin={r * 0.4} />
          <W x={104} y={36 + r * 9} w={9} h={7} lit={r === 4} begin={r * 0.3} />
          <W x={116} y={36 + r * 9} w={9} h={7} lit={r === 1} begin={r * 0.5} />
          <line x1={90} y1={45 + r * 9} x2={128} y2={45 + r * 9} stroke={MUT} strokeWidth=".5" opacity=".4" />
        </g>
      ))}
      {/* podium windows + entrance */}
      {row(62, 100, 4, 5, { w: 12, h: 9 })}
      <rect x={138} y={96} width={20} height={24} fill={DARK} opacity=".7" />
      {/* rooftop star sign */}
      <g transform="translate(110 22)">
        <path d="M0 -7 L1.9 -2.3 L7 -2.3 L2.9 0.7 L4.5 5.7 L0 2.7 L-4.5 5.7 L-2.9 0.7 L-7 -2.3 L-1.9 -2.3 Z" fill={ACC} stroke={ACS} strokeWidth=".5">
          <animate attributeName="opacity" values=".6;1;.6" dur="2.6s" repeatCount="indefinite" /></path>
      </g>
      <Cam x={150} y={30} aim={158} />
      <Fire x={74} y={98} />
      <Reader x={134} y={108} />
      <Sig x1={150} y1={30} x2={198} y2={104} color={GREEN} />
      <NVR x={198} y={110} />
    </g>),

    /* ---------- INDUSTRIAL ---------- */
    ind: () => (<g>
      <Shadow cx={104} w={150} />
      {/* sawtooth roof shed */}
      <Wall x={36} y={72} width={128} height={48} />
      <path d="M36 72 l18 -16 18 16 18 -16 18 16 18 -16 18 16 18 -16 18 16" fill={ELEV} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      {[54, 90, 126].map(gx => <line key={gx} x1={gx} y1={56} x2={gx - 14} y2={72} stroke={BLUE} strokeWidth="2" opacity=".35" />)}
      {/* chimney with rising puff */}
      <Wall x={146} y={42} width={9} height={22} />
      <circle cx={150} cy={40} r="2.4" fill={SUB} opacity=".4"><animate attributeName="cy" values="40;26" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values=".5;0" dur="3s" repeatCount="indefinite" /></circle>
      {/* roller door + accent container */}
      <rect x={48} y={86} width={30} height={34} fill={MUT} opacity=".25" stroke={STROKE} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map(i => <line key={i} x1={48} y1={90 + i * 6} x2={78} y2={90 + i * 6} stroke={MUT} strokeWidth=".7" opacity=".5" />)}
      <Wall x={120} y={100} width={30} height={20} />
      <rect x={120} y={100} width={30} height={20} fill={ACC} opacity=".25" />
      {row(92, 80, 3, 6, { w: 12, h: 8, lit: true, begin: 0.4 })}
      {/* perimeter pole with cam + motion fence */}
      <line x1={28} y1={120} x2={28} y2={64} stroke={MUT} strokeWidth="2" />
      <Cam x={28} y={64} aim={24} color={BLUE} />
      <PIR x={36} y={112} dir={1} />
      <Strobe x={160} y={66} />
      <Barrier x={172} y={120} flip={-1} />
      <Sig x1={28} y1={64} x2={22} y2={104} />
    </g>),

    /* ---------- OFFICE ---------- */
    office: () => (<g>
      <Shadow cx={110} w={92} />
      <Wall x={70} y={96} width={80} height={24} />
      <Wall x={78} y={26} width={64} height={94} />
      <Wall x={100} y={18} width={20} height={10} />
      {/* blue glass curtain wall, scattered amber lit */}
      {[0, 1, 2, 3, 4, 5, 6].map(r => [0, 1, 2, 3].map(cc => {
        const lit = (r * 4 + cc) % 5 === 0;
        return <W key={r + "-" + cc} x={84 + cc * 14} y={32 + r * 9} w={11} h={7} lit={lit} begin={(r + cc) * 0.3} />;
      }))}
      {/* lobby turnstiles + green pass line */}
      <g transform={`translate(110 ${GROUND})`}>
        {[-7, 0, 7].map((dx, i) => <rect key={i} x={dx - 1.4} y="-8" width="2.8" height="8" rx="1" fill={MUT} />)}
        <rect x="-10" y="-3" width="20" height="2" fill={GREEN} opacity=".8"><animate attributeName="opacity" values=".3;.9;.3" dur="1.8s" repeatCount="indefinite" /></rect>
      </g>
      <Dome x={110} y={94} />
      <Reader x={132} y={108} />
      <Cam x={70} y={32} aim={26} />
      <Sig x1={70} y1={32} x2={22} y2={104} />
    </g>),

    /* ---------- GOVERNMENT ---------- */
    gov: () => (<g>
      <Shadow cx={110} w={130} />
      <Wall x={48} y={114} width={124} height={6} />
      <Wall x={54} y={70} width={112} height={44} />
      {/* pediment */}
      <path d="M48 70 L110 42 L172 70 Z" fill={ELEV} stroke={STROKE} strokeWidth={SW} strokeLinejoin="round" />
      <g color={ACC}><GlyphAt k="gov" x={110} y={60} scale={0.62} color={ACC} sw={3} /></g>
      {/* columns */}
      {[62, 82, 102, 122, 142].map((cx, i) => (
        <g key={i}>
          <rect x={cx} y={76} width={9} height={38} fill={ELEV} stroke={STROKE} strokeWidth="1.2" />
          <rect x={cx - 1} y={74} width={11} height={3} fill={MUT} opacity=".2" />
        </g>
      ))}
      {/* flag pole + waving flag */}
      <g transform="translate(168 70)">
        <line x1="0" y1="0" x2="0" y2="-30" stroke={MUT} strokeWidth="1.4" />
        <path d="M0 -29 Q7 -27 14 -29 Q7 -31 14 -33 Q7 -31 0 -23 Z" fill={ACC}>
          <animate attributeName="d"
            values="M0 -29 Q7 -27 14 -29 Q7 -31 14 -33 Q7 -31 0 -23 Z;M0 -29 Q7 -31 14 -29 Q7 -27 14 -33 Q7 -29 0 -23 Z;M0 -29 Q7 -27 14 -29 Q7 -31 14 -33 Q7 -31 0 -23 Z"
            dur="2.6s" repeatCount="indefinite" /></path>
      </g>
      <Cam x={50} y={68} aim={22} />
      <Strobe x={150} y={64} />
      <Reader x={110} y={106} />
      <Sig x1={50} y1={68} x2={22} y2={104} />
    </g>)
  };

  function Blueprint({ k }) {
    const B = BP[k] || BP.office;
    return (
      <g>
        {/* faint guide lines */}
        <g stroke={GRID} strokeWidth="1">
          {[36, 60, 84, 108].map(y => <line key={y} x1="6" y1={y} x2="214" y2={y} />)}
        </g>
        <line x1="6" y1={GROUND} x2="214" y2={GROUND} stroke={MUT} strokeWidth="1.4" />
        <line x1="6" y1={GROUND + 3} x2="214" y2={GROUND + 3} stroke={MUT} strokeWidth=".7" opacity=".4" />
        <B />
        <NVR x={20} y={110} />
        {/* subtle system scan */}
        <g opacity=".7">
          <animateTransform attributeName="transform" type="translate" values="0 26;0 110;0 26" dur="7s"
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.4 1;0.4 0 0.4 1" repeatCount="indefinite" />
          <rect x="6" y="-4" width="208" height="4" fill={ACC} opacity=".08" />
          <line x1="6" y1="0" x2="214" y2="0" stroke={ACC} strokeWidth="1" opacity=".5" />
        </g>
      </g>
    );
  }

  /* ================================================================ */
  /*  STYLE B — RADAR                                                 */
  /* ================================================================ */
  const RADAR_BLIPS = {
    hospital: [[150, 48], [70, 96], [168, 88], [62, 52], [120, 30]],
    retail:   [[60, 44], [160, 50], [54, 96], [166, 94], [110, 28], [110, 112]],
    hotel:    [[150, 40], [72, 100], [156, 100], [64, 44]],
    ind:      [[56, 46], [164, 44], [56, 96], [164, 96], [40, 70], [180, 70]],
    office:   [[150, 46], [70, 46], [70, 94], [150, 94], [110, 26]],
    gov:      [[110, 28], [60, 60], [160, 60], [78, 104], [142, 104]]
  };
  const BLIP_COLORS = [ACC, BLUE, GREEN, ACC, RED, BLUE];

  function Radar({ k }) {
    const cx = 110, cy = 70;
    const blips = RADAR_BLIPS[k] || RADAR_BLIPS.office;
    return (
      <g>
        <g fill="none" stroke={MUT} opacity=".35">{[20, 36, 52].map(r => <circle key={r} cx={cx} cy={cy} r={r} strokeWidth="1" />)}</g>
        <g stroke={GRID} strokeWidth="1"><line x1={cx - 56} y1={cy} x2={cx + 56} y2={cy} /><line x1={cx} y1={cy - 54} x2={cx} y2={cy + 54} /></g>
        <g transform={`translate(${cx} ${cy})`}>
          <g><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
            <polygon points="0,0 52,0 50,-16" fill={ACC} opacity=".18" />
            <polygon points="0,0 52,0 51,-9" fill={ACC} opacity=".22" />
            <line x1="0" y1="0" x2="52" y2="0" stroke={ACC} strokeWidth="1.4" opacity=".9" /></g>
        </g>
        {blips.map(([x, y], i) => {
          const col = BLIP_COLORS[i % BLIP_COLORS.length];
          return (<g key={i}>
            <circle cx={x} cy={y} r="2.4" fill={col}><animate attributeName="opacity" values="1;.15;1" dur="4s" begin={`${(i * 0.55) % 4}s`} repeatCount="indefinite" /></circle>
            <circle cx={x} cy={y} r="2.4" fill="none" stroke={col} strokeWidth="1" opacity="0">
              <animate attributeName="r" values="2.4;9" dur="4s" begin={`${(i * 0.55) % 4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values=".7;0" dur="4s" begin={`${(i * 0.55) % 4}s`} repeatCount="indefinite" /></circle>
          </g>);
        })}
        <circle cx={cx} cy={cy} r="13" fill={ELEV} stroke={MUT} strokeWidth="1.2" />
        <g color={ACS}><GlyphAt k={k} x={cx} y={cy} scale={0.72} color={ACS} sw={2} /></g>
        <circle cx={cx} cy={cy} r="13" fill="none" stroke={ACC} strokeWidth="1.4" opacity="0">
          <animate attributeName="r" values="13;26" dur="4s" repeatCount="indefinite" /><animate attributeName="opacity" values=".5;0" dur="4s" repeatCount="indefinite" /></circle>
      </g>
    );
  }

  /* ================================================================ */
  /*  STYLE C — PULSE GRID                                            */
  /* ================================================================ */
  const ACTIVE_NODES = {
    hospital: [[3, 1, RED], [6, 4, GREEN], [8, 2, BLUE], [2, 3, ACC]],
    retail:   [[1, 1, BLUE], [9, 1, GREEN], [5, 4, ACC], [3, 3, RED], [7, 2, BLUE]],
    hotel:    [[4, 0, ACC], [4, 5, GREEN], [7, 2, BLUE], [2, 3, RED]],
    ind:      [[1, 2, BLUE], [9, 2, RED], [5, 0, ACC], [5, 5, GREEN], [3, 4, BLUE]],
    office:   [[2, 1, BLUE], [8, 1, ACC], [5, 3, GREEN], [3, 4, RED], [7, 4, BLUE]],
    gov:      [[5, 0, ACC], [2, 3, BLUE], [8, 3, GREEN], [4, 5, RED], [6, 5, BLUE]]
  };

  function PulseGrid({ k }) {
    const cols = 11, rows = 6, x0 = 18, y0 = 22, sx = 18.4, sy = 17.2;
    const at = (c, r) => [x0 + c * sx, y0 + r * sy];
    const hub = at(5, 2.5);
    const active = ACTIVE_NODES[k] || ACTIVE_NODES.office;
    const dots = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const a = active.find(([ac, ar]) => ac === c && ar === r);
      const [px, py] = at(c, r);
      dots.push(
        <circle key={c + "-" + r} cx={px} cy={py} r={a ? 2.2 : 1.5} fill={a ? a[2] : SUB} opacity={a ? 0.9 : 0.3}>
          {a && <animate attributeName="opacity" values=".3;1;.3" dur="2.4s" begin={`${(c + r) * 0.2}s`} repeatCount="indefinite" />}
        </circle>
      );
    }
    return (
      <g>
        {dots}
        {[0, 1].map(i => (
          <circle key={i} cx={hub[0]} cy={hub[1]} r="6" fill="none" stroke={ACC} strokeWidth="1.2" opacity="0">
            <animate attributeName="r" values="6;104" dur="3.6s" begin={`${i * 1.8}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".55;0" dur="3.6s" begin={`${i * 1.8}s`} repeatCount="indefinite" /></circle>
        ))}
        <g>
          <animateTransform attributeName="transform" type="translate" values="-6 0;214 0;-6 0" dur="6s"
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.4 1;0.4 0 0.4 1" repeatCount="indefinite" />
          <rect x="0" y="12" width="10" height="116" fill={ACC} opacity=".06" />
          <line x1="5" y1="12" x2="5" y2="128" stroke={ACC} strokeWidth="1" opacity=".4" /></g>
        <circle cx={hub[0]} cy={hub[1]} r="11" fill={ELEV} stroke={MUT} strokeWidth="1.2" />
        <g color={ACS}><GlyphAt k={k} x={hub[0]} y={hub[1]} scale={0.62} color={ACS} sw={2} /></g>
      </g>
    );
  }

  const VARIANTS = { blueprint: Blueprint, radar: Radar, grid: PulseGrid };

  function IndustryArt2D({ k, variant }) {
    const C = VARIANTS[variant] || Blueprint;
    return <svg viewBox="0 0 220 140" className="ind-art" preserveAspectRatio="xMidYMid meet"><C k={k} /></svg>;
  }
  function IndustryScene({ k, variant }) {
    if (variant === "iso" && window.IndustryArt) return <window.IndustryArt k={k} />;
    return <IndustryArt2D k={k} variant={variant} />;
  }

  window.IndustryArt2D = IndustryArt2D;
  window.IndustryScene = IndustryScene;
})();
