/* Camera-diagram concepts — three modern "2026" visions of a 4-camera
   security system as a background-free SVG diagram. Four distinct camera
   TYPES (dome / bullet / turret / PTZ), each clearly a security camera. */

/* ============ one security camera, two render treatments ============ */
function Camera({ type, mode = "line", ink = "#1B2430", accent = "#2E6BB8" }) {
  const line = mode === "line";
  const fill = line ? "#FFFFFF" : "url(#bodyG)";
  const st = line ? ink : "rgba(22,30,42,.16)";
  const bsw = line ? 2.2 : 1;
  const glass = line ? accent : "url(#glassG)";

  const lens = (cx, cy, r, rr) => (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={st} strokeWidth={bsw} />
      <circle cx={cx} cy={cy} r={rr} fill={glass} stroke={line ? ink : "none"} strokeWidth={line ? 1.4 : 0} />
      {line
        ? <circle cx={cx - rr * 0.35} cy={cy - rr * 0.35} r={rr * 0.32} fill="#fff" opacity=".9" />
        : <circle cx={cx - rr * 0.32} cy={cy - rr * 0.34} r={rr * 0.3} fill="#CFE6FF" opacity=".85">
            <animate attributeName="opacity" values=".5;.95;.5" dur="2.6s" repeatCount="indefinite" />
          </circle>}
    </g>
  );

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {!line && <ellipse cx="0" cy="30" rx="32" ry="7" fill="rgba(15,23,35,.12)" />}

      {type === "dome" && (
        <g>
          <ellipse cx="0" cy="-20" rx="25" ry="6.5" fill={fill} stroke={st} strokeWidth={bsw} />
          <path d="M-25 -20 A25 23 0 0 0 25 -20 Z" fill={fill} stroke={st} strokeWidth={bsw} />
          {!line && <path d="M-25 -20 A25 23 0 0 0 25 -20 Z" fill="rgba(255,255,255,.18)" stroke="none" />}
          {lens(0, -3, 9, 6)}
        </g>
      )}

      {type === "bullet" && (
        <g>
          <rect x="-36" y="-13" width="7.5" height="26" rx="2" fill={fill} stroke={st} strokeWidth={bsw} />
          <path d="M-29 -1 L-15 3" stroke={st} strokeWidth={line ? 5 : 6.5} strokeLinecap="round" fill="none" />
          <rect x="-16" y="-13" width="46" height="26" rx="13" fill={fill} stroke={st} strokeWidth={bsw} />
          {!line && <rect x="-12" y="-12" width="38" height="6" rx="3" fill="#fff" opacity=".5" />}
          <path d="M-13 -13 L28 -13" stroke={st} strokeWidth={bsw} fill="none" opacity={line ? 1 : .5} />
          {lens(29, 0, 11, 7)}
        </g>
      )}

      {type === "turret" && (
        <g>
          <path d="M-20 -15 L20 -15 L22 -1 L-22 -1 Z" fill={fill} stroke={st} strokeWidth={bsw} />
          <ellipse cx="0" cy="-15" rx="20" ry="5.5" fill={fill} stroke={st} strokeWidth={bsw} />
          <circle cx="0" cy="1" r="17" fill={fill} stroke={st} strokeWidth={bsw} />
          {!line && <path d="M-12 -10 A17 17 0 0 1 11 -12" stroke="#fff" strokeWidth="3" opacity=".4" fill="none" />}
          {lens(3, 2, 10, 6)}
        </g>
      )}

      {type === "ptz" && (
        <g>
          <rect x="-5" y="-32" width="10" height="15" rx="2.5" fill={fill} stroke={st} strokeWidth={bsw} />
          <path d="M-21 -15 A21 10 0 0 1 21 -15 Z" fill={fill} stroke={st} strokeWidth={bsw} />
          <ellipse cx="0" cy="-15" rx="21" ry="6" fill={fill} stroke={st} strokeWidth={bsw} />
          <path d="M-22 -15 A22 24 0 0 0 22 -15 Z" fill={line ? "#FFFFFF" : "url(#bubbleG)"} stroke={st} strokeWidth={bsw} />
          {!line && <ellipse cx="-8" cy="-7" rx="7" ry="4" fill="#fff" opacity=".4" />}
          {lens(2, 2, 10, 6.5)}
        </g>
      )}
    </g>
  );
}

const CAM_DEFS = (
  <defs>
    <linearGradient id="bodyG" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stopColor="#FDFEFF" />
      <stop offset="1" stopColor="#DEE5EE" />
    </linearGradient>
    <radialGradient id="glassG" cx="38%" cy="33%" r="70%">
      <stop offset="0" stopColor="#1C3252" />
      <stop offset=".6" stopColor="#0B1726" />
      <stop offset="1" stopColor="#04080F" />
    </radialGradient>
    <radialGradient id="bubbleG" cx="40%" cy="32%" r="72%">
      <stop offset="0" stopColor="rgba(190,216,248,.85)" />
      <stop offset="1" stopColor="rgba(120,150,190,.35)" />
    </radialGradient>
  </defs>
);

function FlowDot({ d, dur, begin = 0, r = 3, color = "#2E6BB8" }) {
  return (
    <circle r={r} fill={color}>
      <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  );
}

const MONO = "'JetBrains Mono', monospace";
const DISP = "'Geologica', sans-serif";

/* ============ Variant A — technical schematic / blueprint ============ */
function VariantA() {
  const ink = "#1B2430", acc = "#2E6BB8";
  const cams = [
    { x: 96,  y: 132, type: "dome",   tag: "DOME · IPC-D24",   d: "M96 156 Q120 320 226 432" },
    { x: 366, y: 132, type: "bullet", tag: "BULLET · IPC-B47", d: "M366 150 Q344 320 240 432" },
    { x: 96,  y: 320, type: "turret", tag: "TURRET · IPC-T11", d: "M104 344 Q150 404 206 446" },
    { x: 366, y: 320, type: "ptz",    tag: "PTZ · SD-92X",      d: "M360 344 Q322 404 256 446" },
  ];
  return (
    <svg viewBox="0 0 460 600" width="460" height="600">
      {CAM_DEFS}
      <rect width="460" height="600" fill="#FBFCFE" />
      {/* faint blueprint grid */}
      <g stroke="#EAEFF5" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => <line key={"v" + i} x1={i * 40} y1="0" x2={i * 40} y2="600" />)}
        {Array.from({ length: 15 }).map((_, i) => <line key={"h" + i} x1="0" y1={i * 40} x2="460" y2={i * 40} />)}
      </g>
      {/* corner ticks */}
      <g stroke={acc} strokeWidth="1.5">
        <path d="M16 30 V16 H30" fill="none" /><path d="M430 16 H444 V30" fill="none" />
        <path d="M16 570 V584 H30" fill="none" /><path d="M444 570 V584 H430" fill="none" />
      </g>
      <text x="20" y="44" fontFamily={MONO} fontSize="11" letterSpacing="0.12em" fill={ink}>ОХРАНИТЕЛНА СИСТЕМА</text>
      <text x="20" y="58" fontFamily={MONO} fontSize="9" letterSpacing="0.1em" fill="#8A95A3">ДИАГРАМА · v2026 · 16CH</text>

      {/* cloud / remote node */}
      <g transform="translate(230 78)">
        <path d="M-26 6 a13 13 0 0 1 5 -25 a16 16 0 0 1 30 3 a11 11 0 0 1 3 22 Z" fill="#fff" stroke={ink} strokeWidth="1.6" />
        <text x="0" y="2" textAnchor="middle" fontFamily={MONO} fontSize="8" fill="#8A95A3">CLOUD</text>
      </g>
      <path d="M230 100 V160 L230 408" stroke={acc} strokeWidth="1.2" strokeDasharray="2 5" fill="none" opacity=".5" />
      <FlowDot d="M230 408 L230 100" dur={2.6} r={2.4} color={acc} />

      {/* signal links */}
      <g fill="none" stroke={acc} strokeWidth="1.3" strokeDasharray="2 5" opacity=".55">
        {cams.map((c, i) => <path key={i} d={c.d} />)}
      </g>
      {cams.map((c, i) => <FlowDot key={i} d={c.d} dur={2} begin={i * 0.4} r={2.6} color={acc} />)}

      {/* NVR hub */}
      <g transform="translate(230 455)">
        <rect x="-62" y="-30" width="124" height="60" rx="6" fill="#fff" stroke={ink} strokeWidth="2" />
        <rect x="-54" y="-20" width="30" height="22" rx="2" fill="#0B1726" />
        <rect x="-51" y="-17" width="24" height="3" fill="#56C98C"><animate attributeName="width" values="4;24;4" dur="2.6s" repeatCount="indefinite" /></rect>
        <text x="-14" y="-8" fontFamily={DISP} fontSize="15" fontWeight="700" fill={ink}>NVR</text>
        <text x="-14" y="6" fontFamily={MONO} fontSize="8" fill="#8A95A3">16-CH · PoE</text>
        {[0, 1, 2, 3, 4].map(i => (
          <circle key={i} cx={-46 + i * 12} cy="20" r="2.6" fill={i === 4 ? "#E0563E" : "#56C98C"}>
            <animate attributeName="opacity" values={i === 4 ? "1;.2;1" : ".4;1;.4"} dur={i === 4 ? "0.9s" : `${1.4 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      {/* cameras + callouts */}
      {cams.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <Camera type={c.type} mode="line" ink={ink} accent={acc} />
          <circle cx="0" cy="0" r="2.5" fill={acc} opacity=".0" />
          <text x="0" y="58" textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="0.06em" fill="#46505E">{c.tag}</text>
        </g>
      ))}
    </svg>
  );
}

/* ============ Variant B — soft product render, airy 2026 ============ */
function VariantB() {
  const acc = "#2E6BB8";
  const cams = [
    { x: 118, y: 158, type: "dome",   chip: "Куполна", d: "M132 178 Q175 240 205 286" },
    { x: 342, y: 158, type: "bullet", chip: "Булет",   d: "M330 176 Q288 240 256 286" },
    { x: 110, y: 408, type: "turret", chip: "Турел",   d: "M118 388 Q165 350 204 322" },
    { x: 352, y: 408, type: "ptz",    chip: "PTZ",     d: "M346 384 Q300 348 258 320" },
  ];
  return (
    <svg viewBox="0 0 460 600" width="460" height="600">
      {CAM_DEFS}
      <defs>
        <radialGradient id="bgGlowB" cx="50%" cy="28%" r="65%">
          <stop offset="0" stopColor="#EAF2FE" />
          <stop offset="1" stopColor="#FFFFFF" />
        </radialGradient>
        <linearGradient id="linkB" x1="0" x2="1">
          <stop offset="0" stopColor={acc} stopOpacity="0" />
          <stop offset="1" stopColor={acc} stopOpacity=".6" />
        </linearGradient>
      </defs>
      <rect width="460" height="600" fill="url(#bgGlowB)" />

      <text x="40" y="58" fontFamily={DISP} fontSize="13" fontWeight="600" fill="#1B2430">Свързана система</text>
      <text x="40" y="74" fontFamily={MONO} fontSize="9" letterSpacing="0.1em" fill="#8A95A3">4 КАМЕРИ · 1 NVR · 2026</text>

      {/* connectors */}
      <g fill="none" stroke="url(#linkB)" strokeWidth="2">
        {cams.map((c, i) => <path key={i} d={c.d} />)}
      </g>
      {cams.map((c, i) => <FlowDot key={i} d={c.d} dur={2.2} begin={i * 0.5} r={3} color={acc} />)}

      {/* central NVR glass card */}
      <g transform="translate(230 300)">
        <rect x="-66" y="-44" width="132" height="88" rx="16" fill="#fff" stroke="rgba(30,60,110,.12)" strokeWidth="1.5" />
        <rect x="-66" y="-44" width="132" height="88" rx="16" fill="rgba(120,170,255,.06)" />
        <circle cx="0" cy="-44" r="30" fill="rgba(46,107,184,.10)">
          <animate attributeName="r" values="24;40;24" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".5;0;.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <text x="0" y="-8" textAnchor="middle" fontFamily={DISP} fontSize="20" fontWeight="700" fill="#1B2430">NVR</text>
        <text x="0" y="10" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="0.08em" fill="#7C8896">16-CH · CLOUD</text>
        <g>{[0, 1, 2, 3].map(i => <rect key={i} x={-24 + i * 14} y="22" width="9" height="9" rx="2" fill="#E7EDF4" stroke="rgba(30,60,110,.12)" strokeWidth="1" />)}</g>
        <rect x="-24" y="22" width="9" height="9" rx="2" fill={acc}><animate attributeName="opacity" values=".3;1;.3" dur="1.6s" repeatCount="indefinite" /></rect>
      </g>

      {/* cameras + chips */}
      {cams.map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y})`}>
          <Camera type={c.type} mode="soft" accent={acc} />
          <g transform="translate(0 50)">
            <rect x={-c.chip.length * 4 - 8} y="-11" width={c.chip.length * 8 + 16} height="20" rx="10" fill="#fff" stroke="rgba(30,60,110,.12)" strokeWidth="1" />
            <text x="0" y="3" textAnchor="middle" fontFamily={DISP} fontSize="11" fontWeight="500" fill="#36404D">{c.chip}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ============ Variant C — editorial mono grid, minimal ============ */
function VariantC() {
  const ink = "#16202B", acc = "#D9A400";
  const cells = [
    { cx: 130, cy: 250, n: "01", type: "dome",   name: "Куполна", spec: "360° · вътрешна" },
    { cx: 330, cy: 250, n: "02", type: "bullet", name: "Булет",   spec: "далекобойна · IP67" },
    { cx: 130, cy: 430, n: "03", type: "turret", name: "Турел",   spec: "компактна · IR" },
    { cx: 330, cy: 430, n: "04", type: "ptz",    name: "PTZ",     spec: "завъртане · zoom" },
  ];
  return (
    <svg viewBox="0 0 460 600" width="460" height="600">
      {CAM_DEFS}
      <rect width="460" height="600" fill="#FFFFFF" />
      <text x="40" y="76" fontFamily={DISP} fontSize="27" fontWeight="700" fill={ink} letterSpacing="-0.01em">Четири камери.</text>
      <text x="40" y="108" fontFamily={DISP} fontSize="27" fontWeight="700" fill={ink} letterSpacing="-0.01em">Една система.</text>
      <text x="42" y="132" fontFamily={MONO} fontSize="9.5" letterSpacing="0.14em" fill="#9AA3AD">ВИДЕОНАБЛЮДЕНИЕ · 2026</text>

      {/* hairline grid */}
      <g stroke="#ECEFF3" strokeWidth="1.4">
        <line x1="40" y1="158" x2="420" y2="158" />
        <line x1="230" y1="170" x2="230" y2="520" />
        <line x1="40" y1="345" x2="420" y2="345" />
        <line x1="40" y1="532" x2="420" y2="532" />
      </g>

      {cells.map((c, i) => (
        <g key={i}>
          <text x={c.cx - 84} y={c.cy - 70} fontFamily={MONO} fontSize="11" fill={acc} fontWeight="500">{c.n}</text>
          <g transform={`translate(${c.cx} ${c.cy - 6}) scale(1.06)`}>
            <Camera type={c.type} mode="line" ink={ink} accent={acc} />
          </g>
          <text x={c.cx - 84} y={c.cy + 64} fontFamily={DISP} fontSize="15" fontWeight="600" fill={ink}>{c.name}</text>
          <text x={c.cx - 84} y={c.cy + 80} fontFamily={MONO} fontSize="8.5" fill="#9AA3AD">{c.spec}</text>
          <circle cx={c.cx + 84} cy={c.cy + 60} r="3" fill={acc} />
        </g>
      ))}

      <text x="40" y="558" fontFamily={MONO} fontSize="9.5" letterSpacing="0.06em" fill="#46505E">→ Свързани към NVR · 16-канален запис 24/7</text>
    </svg>
  );
}

/* ============ mount onto the design canvas ============ */
const { DesignCanvas, DCSection, DCArtboard } = window;

function ConceptsApp() {
  return (
    <DesignCanvas>
      <DCSection id="cams" title="Камерна диаграма" subtitle="Три модерни визии · 4 типа охранителни камери · без фон">
        <DCArtboard id="a" label="A · Техническа схема" width={460} height={600}><VariantA /></DCArtboard>
        <DCArtboard id="b" label="B · Мек 3D рендер" width={460} height={600}><VariantB /></DCArtboard>
        <DCArtboard id="c" label="C · Редакционен грид" width={460} height={600}><VariantC /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ConceptsApp />);
