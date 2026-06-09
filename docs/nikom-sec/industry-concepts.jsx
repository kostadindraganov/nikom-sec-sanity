/* Industry-tile concepts — three modern directions for the sector visuals.
   Each shown on real tiles (Hospital + Retail). Mounts on the design canvas. */

const IC_INK = "#16202B", IC_MUT = "#5B6675", IC_SUB = "#94A0AE";
const IC_ACC = "#D9A400";      // brand yellow
const IC_BLU = "#2563B5";
const IC_GRN = "#2FA866";
const IC_MONO = "'JetBrains Mono', monospace";
const IC_DISP = "'Geologica', sans-serif";

const SECTORS = {
  hospital: { code: "H+", title: "Болници и лечебни заведения",
    glyph: <g fill={IC_ACC}><rect x="-3" y="-9" width="6" height="18" rx="1.5" /><rect x="-9" y="-3" width="18" height="6" rx="1.5" /></g> },
  retail: { code: "R", title: "Търговски вериги & ритейл",
    glyph: <g fill="none" stroke={IC_ACC} strokeWidth="2.4" strokeLinejoin="round"><path d="M-9 -3 H9 L10 11 H-10 Z" fill={`${IC_ACC}22`} /><path d="M-4.5 -3 V-6 a4.5 4.5 0 0 1 9 0 V-3" /></g> },
};

function Chip({ x, y, label, dot = IC_GRN }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width={label.length * 6.0 + 26} height="20" rx="10" fill="#fff" stroke="rgba(20,32,46,.14)" />
      <circle cx="13" cy="10" r="3" fill={dot}><animate attributeName="opacity" values=".3;1;.3" dur="1.8s" repeatCount="indefinite" /></circle>
      <text x="22" y="13.5" fontFamily={IC_MONO} fontSize="8.5" letterSpacing="0.08em" fill={IC_MUT}>{label}</text>
    </g>
  );
}

/* ---- Direction A: live-status dashboard ---- */
function DirDashboard({ sector }) {
  const rows = [
    { c: IC_GRN, l: "Камери", v: "12 · online" },
    { c: IC_GRN, l: "Сензори", v: "армирани" },
    { c: IC_BLU, l: "Контрол достъп", v: "4 точки" },
    { c: "#E0563E", l: "Пожароизвестяване", v: "OK" },
  ];
  return (
    <svg viewBox="0 0 420 236" width="100%">
      <rect width="420" height="236" fill="#FCFDFE" />
      <Chip x={20} y={18} label="ОХРАНЯВАН ОБЕКТ" />
      {/* sector icon block */}
      <rect x="22" y="64" width="104" height="104" rx="16" fill={`${IC_ACC}14`} stroke="rgba(20,32,46,.10)" />
      <g transform="translate(74 116) scale(2.1)">{sector.glyph}</g>
      <text x="74" y="190" textAnchor="middle" fontFamily={IC_MONO} fontSize="9" fill={IC_SUB}>{sector.code}</text>
      {/* status rows */}
      {rows.map((r, i) => (
        <g key={i} transform={`translate(150 ${74 + i * 27})`}>
          <circle cx="4" cy="-3" r="3.4" fill={r.c}>
            <animate attributeName="opacity" values=".35;1;.35" dur={`${1.6 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x="16" y="0" fontFamily={IC_DISP} fontSize="12.5" fontWeight="500" fill={IC_INK}>{r.l}</text>
          <text x="250" y="0" textAnchor="end" fontFamily={IC_MONO} fontSize="10" fill={IC_MUT}>{r.v}</text>
          <line x1="16" y1="9" x2="250" y2="9" stroke="rgba(20,32,46,.08)" />
        </g>
      ))}
      {/* sparkline */}
      <g transform="translate(150 196)">
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={i * 11.4} y="-14" width="6" height="14" rx="1.5" fill={i > 17 ? IC_ACC : "rgba(37,99,181,.30)"}>
            <animate attributeName="height" values={`${4 + (i % 5) * 2};${14 - (i % 4) * 2};${4 + (i % 5) * 2}`} dur={`${2 + (i % 6) * 0.2}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${-4 - (i % 5) * 2};${-14 + (i % 4) * 2};${-4 - (i % 5) * 2}`} dur={`${2 + (i % 6) * 0.2}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
    </svg>
  );
}

/* ---- Direction B: floor-plan coverage ---- */
function CoverageCam({ x, y, rot }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`rotate(${rot})`}>
        <path d="M0 0 L78 -30 A84 84 0 0 1 78 30 Z" fill={IC_BLU} opacity=".12">
          <animateTransform attributeName="transform" type="rotate" values="-16;16;-16" dur="6s" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
        </path>
      </g>
      <circle r="5" fill="#fff" stroke={IC_INK} strokeWidth="1.4" />
      <circle r="2.2" fill={IC_BLU} />
    </g>
  );
}
function DirFloorplan({ sector }) {
  return (
    <svg viewBox="0 0 420 236" width="100%">
      <rect width="420" height="236" fill="#FCFDFE" />
      <Chip x={20} y={18} label="ПЛАН · ПОКРИТИЕ" dot={IC_BLU} />
      <g stroke={IC_INK} strokeWidth="2" fill="none" strokeLinejoin="round" opacity=".85">
        <rect x="40" y="58" width="340" height="150" rx="3" />
        <line x1="190" y1="58" x2="190" y2="150" /><line x1="190" y1="150" x2="40" y2="150" />
        <line x1="280" y1="120" x2="280" y2="208" /><line x1="280" y1="120" x2="380" y2="120" />
      </g>
      {/* door / access points */}
      {[[190, 150], [280, 164]].map((p, i) => (
        <rect key={i} x={p[0] - 5} y={p[1] - 2} width="10" height="4" rx="1" fill={IC_GRN}>
          <animate attributeName="opacity" values=".3;1;.3" dur={`${1.6 + i * 0.5}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <CoverageCam x={48} y={66} rot={28} />
      <CoverageCam x={372} y={66} rot={118} />
      <CoverageCam x={372} y={200} rot={210} />
      {/* patrol dot */}
      <circle r="4" fill={IC_ACC}>
        <animateMotion path="M110 104 L110 180 L240 180 L330 180 L330 104 L110 104" dur="9s" repeatCount="indefinite" />
      </circle>
      {/* faint sector glyph */}
      <g transform="translate(115 104) scale(1.7)" opacity=".5">{sector.glyph}</g>
    </svg>
  );
}

/* ---- Direction C: connected node constellation ---- */
function DirConstellation({ sector }) {
  const C = [210, 116];
  const nodes = [
    { x: 70, y: 60, t: "CAM" }, { x: 350, y: 60, t: "CAM" }, { x: 70, y: 176, t: "CAM" },
    { x: 350, y: 176, t: "PIR" }, { x: 210, y: 40, t: "☁" }, { x: 210, y: 196, t: "ACS" },
  ];
  return (
    <svg viewBox="0 0 420 236" width="100%">
      <rect width="420" height="236" fill="#FCFDFE" />
      <g transform={`translate(${C[0]} ${C[1]}) scale(4.2)`} opacity=".06">{sector.glyph}</g>
      <Chip x={20} y={18} label="СВЪРЗАНА МРЕЖА" dot={IC_BLU} />
      <g stroke={IC_BLU} strokeWidth="1.2" strokeDasharray="2 5" opacity=".5">
        {nodes.map((n, i) => <line key={i} x1={C[0]} y1={C[1]} x2={n.x} y2={n.y} />)}
      </g>
      {nodes.map((n, i) => (
        <circle key={i} r="2.5" fill={IC_BLU}>
          <animateMotion path={`M${n.x} ${n.y} L${C[0]} ${C[1]}`} dur={`${2 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur={`${2 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {nodes.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y})`}>
          <circle r="13" fill="none" stroke={IC_BLU} strokeWidth="1" opacity="0">
            <animate attributeName="r" values="9;18" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".6;0" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <circle r="13" fill="#fff" stroke="rgba(20,32,46,.16)" strokeWidth="1.2" />
          <text y="3" textAnchor="middle" fontFamily={IC_MONO} fontSize="7.5" fill={IC_MUT}>{n.t}</text>
        </g>
      ))}
      {/* central NVR */}
      <g transform={`translate(${C[0]} ${C[1]})`}>
        <circle r="24" fill={IC_INK} />
        <text y="3.5" textAnchor="middle" fontFamily={IC_DISP} fontSize="12" fontWeight="700" fill="#fff">NVR</text>
      </g>
    </svg>
  );
}

/* ---- tile chrome + canvas mount ---- */
function Tile({ Dir, sector }) {
  return (
    <div className="tcard">
      <div className="tart"><Dir sector={sector} /></div>
      <div className="tcap"><span>{sector.title}</span><span className="tarrow">→</span></div>
    </div>
  );
}

const { DesignCanvas, DCSection, DCArtboard } = window;
function IndConceptsApp() {
  const dirs = [
    { id: "a", label: "A · Дашборд статус", Dir: DirDashboard },
    { id: "b", label: "B · План на покритие", Dir: DirFloorplan },
    { id: "c", label: "C · Свързана мрежа", Dir: DirConstellation },
  ];
  return (
    <DesignCanvas>
      <DCSection id="tiles" title="Индустрии — визуални концепции" subtitle="Три модерни направления · показани върху реални плочки">
        {dirs.map(d => (
          <DCArtboard key={d.id} id={d.id} label={d.label} width={420} height={580}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "10px" }}>
              <Tile Dir={d.Dir} sector={SECTORS.hospital} />
              <Tile Dir={d.Dir} sector={SECTORS.retail} />
            </div>
          </DCArtboard>
        ))}
      </DCSection>
    </DesignCanvas>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<IndConceptsApp />);
