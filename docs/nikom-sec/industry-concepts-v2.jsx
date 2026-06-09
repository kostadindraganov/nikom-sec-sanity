/* Five industry-tile concept directions for the Industries section.
   Each concept renders the full 6-sector grid so they can be compared. */

const SECTORS = [
  { k: "hospital", code: "H+", title: "Болници и лечебни заведения",
    kpi: 187, kpiLabel: "ЗОНИ", spec: "EN 54 · клас A",
    ev: ["Зона 12 · OK", "Достъп · Кардиология", "ASD · норма", "Камера 47 · активна"] },
  { k: "retail", code: "R", title: "Търговски вериги &amp; ритейл",
    kpi: 640, kpiLabel: "КАМЕРИ", spec: "28 обекта · SLA 99.5%",
    ev: ["EAS · Каса 04", "POS-CCTV синхрон", "Зона 03 · норма", "Видеоанализ · OK"] },
  { k: "hotel", code: "HSP", title: "Хотели и жилищни комплекси",
    kpi: 248, kpiLabel: "СТАИ", spec: "PMS · BMS интеграция",
    ev: ["Карта · етаж 7", "Лоби · OK", "Паркинг · вход 2", "Пожар · норма"] },
  { k: "ind", code: "IND", title: "Индустриални и складови бази",
    kpi: 412, kpiLabel: "СЕНЗОРИ", spec: "ATEX · периметър",
    ev: ["Периметър · OK", "Радар · сектор B", "Бариера · вход 2", "VESDA · норма"] },
  { k: "office", code: "OFF", title: "Офис и административни сгради",
    kpi: 16, kpiLabel: "ЕТАЖА", spec: "ISO 27001 · DGNB",
    ev: ["Турникет · вход юг", "BMS · норма", "Зона 4 · OK", "Лифт · сервиз"] },
  { k: "gov", code: "GOV", title: "Държавни и институционални",
    kpi: 92, kpiLabel: "ЗОНИ", spec: "Лиценз МВР · класифицирано",
    ev: ["Бариера · вход 1", "ID-контрол · активен", "Периметър · OK", "Архив · заключен"] },
];

/* shared sector caption row */
function TileCap({ title }) {
  return (
    <div className="tile-cap">
      <span dangerouslySetInnerHTML={{ __html: title }} />
      <span className="tile-arr">→</span>
    </div>
  );
}

/* ============================================================
   CONCEPT 01 — SOC MISSION CARD
   Dark telemetry card: LIVE pulse, KPI count-up, event log
   ============================================================ */
function ConceptSOC({ s, idx }) {
  const [tick, setTick] = React.useState(0);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1800 + (idx % 3) * 230);
    return () => clearInterval(id);
  }, [idx]);
  React.useEffect(() => {
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / 1800);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(s.kpi * e));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [s.kpi]);

  const time = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`;
  };
  const [t, setT] = React.useState(time());
  React.useEffect(() => { const id = setInterval(() => setT(time()), 1000); return () => clearInterval(id); }, []);

  return (
    <div className="soc">
      <div className="soc-top">
        <span className="soc-code">{s.code}</span>
        <span className="soc-live"><i /> LIVE</span>
        <span className="soc-time">{t}</span>
      </div>
      <div className="soc-kpi">
        <span className="soc-num">{n.toLocaleString("bg-BG")}</span>
        <span className="soc-lbl">{s.kpiLabel}</span>
      </div>
      <div className="soc-log">
        {[0,1,2].map(i => {
          const ev = s.ev[(tick + i) % s.ev.length];
          return (
            <div key={i} className={`soc-row ${i===0?"on":""}`} style={{ opacity: 1 - i*0.32 }}>
              <span className="soc-dot" />
              <span className="soc-ev">{ev}</span>
              <span className="soc-ts">{String((tick+i)%60).padStart(2,"0")}s</span>
            </div>
          );
        })}
      </div>
      <div className="soc-bar"><div /></div>
    </div>
  );
}

/* ============================================================
   CONCEPT 02 — ANIMATED BLUEPRINT
   Top-down floor plan per sector, scan sweep, lit zone
   ============================================================ */
function ConceptBlueprint({ s }) {
  const W = 400, H = 225;
  const plans = {
    hospital: (
      <g>
        {/* corridor */}
        <rect x="40" y="100" width="320" height="26" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* rooms top */}
        {[0,1,2,3,4,5].map(i => <rect key={"t"+i} x={45 + i*52} y="50" width="48" height="46" fill="none" stroke="currentColor" strokeWidth="1" />)}
        {[0,1,2,3,4,5].map(i => <rect key={"b"+i} x={45 + i*52} y="130" width="48" height="46" fill="none" stroke="currentColor" strokeWidth="1" />)}
        {/* lit room (operating) */}
        <rect x="201" y="50" width="48" height="46" fill="var(--accent)" opacity="0.22" />
        <text x="225" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">OR-3</text>
        {/* cross marker */}
        <g transform="translate(370 30)" fill="currentColor"><rect x="-2" y="-7" width="4" height="14" /><rect x="-7" y="-2" width="14" height="4" /></g>
      </g>
    ),
    retail: (
      <g>
        {/* outer shell */}
        <rect x="32" y="36" width="336" height="156" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* aisles */}
        {[0,1,2,3].map(i => <rect key={i} x={56 + i*70} y="64" width="48" height="104" fill="none" stroke="currentColor" strokeWidth="1" />)}
        {/* entrance + EAS gates */}
        <line x1="174" y1="192" x2="226" y2="192" stroke="currentColor" strokeWidth="2.5" />
        <line x1="174" y1="186" x2="174" y2="198" stroke="var(--accent)" strokeWidth="2" />
        <line x1="226" y1="186" x2="226" y2="198" stroke="var(--accent)" strokeWidth="2" />
        {/* lit aisle */}
        <rect x="196" y="64" width="48" height="104" fill="var(--accent)" opacity="0.16" />
        <text x="52" y="50" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">SHOP · L1</text>
      </g>
    ),
    hotel: (
      <g>
        {/* tower section */}
        <rect x="120" y="30" width="160" height="170" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* floors */}
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1="120" y1={52 + i*22} x2="280" y2={52 + i*22} stroke="currentColor" strokeWidth="1" />)}
        {/* room divisions per floor */}
        {[0,1,2,3,4,5,6].map(i => (
          <g key={"d"+i}>
            <line x1="160" y1={32 + i*22} x2="160" y2={52 + i*22} stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1={32 + i*22} x2="200" y2={52 + i*22} stroke="currentColor" strokeWidth="1" />
            <line x1="240" y1={32 + i*22} x2="240" y2={52 + i*22} stroke="currentColor" strokeWidth="1" />
          </g>
        ))}
        {/* lit room */}
        <rect x="200" y="74" width="40" height="22" fill="var(--accent)" opacity="0.28" />
        <text x="138" y="220" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">SUITE · 312</text>
      </g>
    ),
    ind: (
      <g>
        {/* warehouse outline */}
        <rect x="32" y="50" width="336" height="140" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* racks */}
        {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1={56 + i*40} y1="70" x2={56 + i*40} y2="170" stroke="currentColor" strokeWidth="1" />)}
        {/* perimeter dashed */}
        <rect x="20" y="38" width="360" height="164" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        {/* radar arc */}
        <g transform="translate(36 54)" stroke="var(--accent)" fill="none">
          <path d="M0 0 L40 0 A40 40 0 0 1 28 28 Z" fill="var(--accent)" opacity="0.18" />
        </g>
        <text x="56" y="200" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">PERIMETER · B</text>
      </g>
    ),
    office: (
      <g>
        {/* open floor */}
        <rect x="40" y="36" width="320" height="158" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* core */}
        <rect x="170" y="80" width="60" height="70" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* desks grid */}
        {[0,1,2,3].map(r => [0,1,2,3].map(c => (
          <rect key={r+"-"+c} x={56 + c*70} y={56 + r*30} width="40" height="14" fill="none" stroke="currentColor" strokeWidth="1" opacity={(c>=2 && r>=1 && r<=2)?0:1} />
        )))}
        {/* lit desk cluster */}
        <rect x="266" y="86" width="40" height="14" fill="var(--accent)" opacity="0.3" />
        <text x="56" y="210" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">FLOOR · 08</text>
      </g>
    ),
    gov: (
      <g>
        {/* hall */}
        <rect x="60" y="60" width="280" height="120" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* colonnade */}
        {[0,1,2,3,4,5,6,7].map(i => <rect key={i} x={70 + i*35} y="56" width="6" height="128" fill="currentColor" opacity="0.85" />)}
        {/* lit entry */}
        <rect x="184" y="170" width="32" height="14" fill="var(--accent)" opacity="0.32" />
        <text x="72" y="206" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor">ENTRY · 01</text>
      </g>
    ),
  };

  return (
    <div className="blue">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* grid */}
        <defs>
          <pattern id={`bg-${s.k}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill={`url(#bg-${s.k})`} />
        {/* corner ticks */}
        <g stroke="currentColor" strokeWidth="1.2" opacity="0.55">
          <path d="M8 8 L20 8 M8 8 L8 20" />
          <path d={`M${W-8} 8 L${W-20} 8 M${W-8} 8 L${W-8} 20`} />
          <path d={`M8 ${H-8} L20 ${H-8} M8 ${H-8} L8 ${H-20}`} />
          <path d={`M${W-8} ${H-8} L${W-20} ${H-8} M${W-8} ${H-8} L${W-8} ${H-20}`} />
        </g>
        <text x="14" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor" opacity="0.65">PLAN · {s.code}</text>
        <text x={W-14} y="22" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor" opacity="0.65">N ↑</text>
        {plans[s.k]}
        {/* sensor dots */}
        {[[80,80],[200,160],[320,80],[150,170]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="4" fill="none" stroke="var(--accent)" strokeWidth="1">
              <animate attributeName="r" values="3;9;3" dur="2.2s" begin={`${i*0.4}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values=".9;0;.9" dur="2.2s" begin={`${i*0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle r="1.6" fill="var(--accent)" />
          </g>
        ))}
        {/* scan line */}
        <g>
          <rect x="-40" y="0" width="2" height={H} fill="var(--accent)" opacity="0.9">
            <animate attributeName="x" from="0" to={W} dur="3.6s" repeatCount="indefinite" />
          </rect>
          <rect x="-40" y="0" width="46" height={H} fill="url(#scan-grad)" opacity="0.7">
            <animate attributeName="x" from="-46" to={W} dur="3.6s" repeatCount="indefinite" />
          </rect>
        </g>
        <defs>
          <linearGradient id="scan-grad" x1="0" x2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.18" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ============================================================
   CONCEPT 03 — EDITORIAL CODE PLATE
   Huge sector code typography, minimal supporting data
   ============================================================ */
function ConceptCode({ s, idx }) {
  return (
    <div className="code-plate">
      <div className="cp-meta">
        <span>СЕКТОР · {String(idx+1).padStart(2,"0")} / 06</span>
        <span className="cp-spec">{s.spec}</span>
      </div>
      <div className="cp-mark">
        <span className="cp-code">{s.code}</span>
        <div className="cp-bars">
          {[0,1,2,3,4,5,6,7].map(i => (
            <span key={i} className="cp-bar" style={{ animationDelay: `${i*0.12}s` }} />
          ))}
        </div>
      </div>
      <div className="cp-foot">
        <span className="cp-kpi"><b>{s.kpi.toLocaleString("bg-BG")}</b> {s.kpiLabel}</span>
        <span className="cp-scan" />
      </div>
    </div>
  );
}

/* ============================================================
   CONCEPT 04 — SIGNAL TOPOLOGY
   PSIM core + branch nodes with animated signal flow
   ============================================================ */
function ConceptTopology({ s }) {
  const W = 400, H = 225;
  const cx = 200, cy = 113;
  // Different node layouts per sector (count + glyph type)
  const layouts = {
    hospital: [["CAM",80,55],["DET",120,170],["ACS",290,60],["NRC",320,160],["ASD",60,135]],
    retail:   [["CAM",70,60],["EAS",130,170],["POS",290,55],["ACS",330,150],["FIRE",60,140]],
    hotel:    [["CAM",80,55],["KEY",290,60],["FIRE",330,150],["BMS",60,150],["IC",140,170]],
    ind:      [["RADAR",70,55],["CAM",340,55],["GATE",340,165],["VESDA",60,165],["PIR",200,55]],
    office:   [["TRN",70,60],["CAM",330,60],["BMS",60,165],["ACS",330,165],["FIRE",200,170]],
    gov:      [["GATE",70,60],["CAM",330,60],["XRAY",60,165],["ID",330,165],["VIP",200,55]],
  };
  const nodes = layouts[s.k];

  return (
    <div className="topo">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* faint grid dots */}
        <defs>
          <pattern id={`dots-${s.k}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" opacity="0.22" />
          </pattern>
          <radialGradient id={`core-${s.k}`}>
            <stop offset="0" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill={`url(#dots-${s.k})`} />
        {/* connecting lines with flowing dashes */}
        {nodes.map(([lbl, x, y], i) => (
          <g key={i}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3 8">
              <animate attributeName="stroke-dashoffset" from="0" to="-22" dur={`${1.4 + i*0.2}s`} repeatCount="indefinite" />
            </line>
          </g>
        ))}
        {/* outer ring */}
        <circle cx={cx} cy={cy} r="36" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.55" strokeDasharray="2 4">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="22s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="48" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
        {/* core */}
        <circle cx={cx} cy={cy} r="22" fill={`url(#core-${s.k})`} opacity="0.45" />
        <circle cx={cx} cy={cy} r="18" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1.4" />
        <text x={cx} y={cy-1} textAnchor="middle" fontFamily="Geologica" fontWeight="700" fontSize="11" fill="currentColor">PSIM</text>
        <text x={cx} y={cy+10} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7.5" fill="currentColor" opacity="0.7">{s.code}</text>
        <circle cx={cx} cy={cy} r="22" fill="none" stroke="var(--accent)" strokeWidth="1">
          <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".6;0;.6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* nodes */}
        {nodes.map(([lbl, x, y], i) => (
          <g key={"n"+i} transform={`translate(${x} ${y})`}>
            <circle r="13" fill="var(--bg-elev)" stroke="currentColor" strokeWidth="1" />
            <circle r="13" fill="none" stroke="var(--accent)" strokeWidth="1.2" opacity="0">
              <animate attributeName="opacity" values="0;0.9;0" dur="3s" begin={`${i*0.6}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="13;20;13" dur="3s" begin={`${i*0.6}s`} repeatCount="indefinite" />
            </circle>
            <text textAnchor="middle" y="3" fontFamily="JetBrains Mono" fontSize="7" fill="currentColor">{lbl}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================
   CONCEPT 05 — ACTIVITY HEATMAP
   Sector-specific grid of cells, pulsing with activity
   ============================================================ */
function ConceptHeatmap({ s, idx }) {
  // Distinct grid layouts per sector
  const layouts = {
    hospital: { cols: 12, rows: 6, gap: 3, active: [10, 17, 28, 41, 55] },
    retail:   { cols: 16, rows: 5, gap: 3, active: [12, 33, 48, 61, 72] },
    hotel:    { cols: 6,  rows: 10, gap: 4, active: [8, 17, 31, 42, 55] },
    ind:      { cols: 14, rows: 6, gap: 3, active: [5, 22, 47, 60, 78] },
    office:   { cols: 8,  rows: 8, gap: 4, active: [10, 25, 36, 49, 60] },
    gov:      { cols: 10, rows: 6, gap: 4, active: [13, 27, 39, 48, 55] },
  };
  const L = layouts[s.k];
  const W = 400, H = 225;
  const padX = 28, padY = 40;
  const cw = (W - padX*2 - L.gap*(L.cols-1)) / L.cols;
  const ch = (H - padY - 36 - L.gap*(L.rows-1)) / L.rows;
  const cells = [];
  for (let r=0; r<L.rows; r++) {
    for (let c=0; c<L.cols; c++) {
      cells.push({ x: padX + c*(cw+L.gap), y: padY + r*(ch+L.gap), i: r*L.cols+c });
    }
  }
  const activeSet = new Set(L.active);

  return (
    <div className="heat">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* header */}
        <text x="20" y="22" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor" opacity="0.7">{s.code} · АКТИВНОСТ · 24h</text>
        <text x={W-20} y="22" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="currentColor" opacity="0.7">{s.kpi.toLocaleString("bg-BG")} {s.kpiLabel}</text>
        {/* cells */}
        {cells.map(({x,y,i}) => {
          const base = 0.08 + ((i*37) % 9) * 0.025;
          const isActive = activeSet.has(i);
          return (
            <rect key={i} x={x} y={y} width={cw} height={ch}
              fill={isActive ? "var(--accent)" : "currentColor"}
              opacity={isActive ? 0.85 : base}>
              {isActive && (
                <animate attributeName="opacity" values="0.25;1;0.25" dur={`${1.6 + (i%4)*0.3}s`} begin={`${(i%5)*0.3}s`} repeatCount="indefinite" />
              )}
            </rect>
          );
        })}
        {/* density scale */}
        <g transform={`translate(20 ${H-20})`}>
          <text x="0" y="0" fontFamily="JetBrains Mono" fontSize="8" fill="currentColor" opacity="0.55">low</text>
          {[0,1,2,3,4,5,6,7].map(i => (
            <rect key={i} x={28 + i*9} y={-8} width="7" height="8" fill="currentColor" opacity={0.1 + i*0.1} />
          ))}
          <text x={28 + 8*9 + 4} y="0" fontFamily="JetBrains Mono" fontSize="8" fill="currentColor" opacity="0.55">high</text>
        </g>
        <text x={W-20} y={H-12} textAnchor="end" fontFamily="JetBrains Mono" fontSize="8" fill="currentColor" opacity="0.55">events / hr</text>
      </svg>
    </div>
  );
}

/* ============================================================
   GRID WRAPPER + DEMO PAGE
   ============================================================ */
const CONCEPTS = [
  { id: "soc", num: "01", name: "SOC Mission Card",
    pitch: "Тъмна телеметрична карта в духа на Security Operations Center: пулсиращ LIVE индикатор, count-up KPI, поток от събития в реално време. Максимална техническа достоверност.",
    use: "Когато искаме веднага да внушим „това е под наблюдение 24/7“.",
    theme: "dark", Comp: ConceptSOC },
  { id: "blue", num: "02", name: "Animated Blueprint",
    pitch: "Top-down инженерен план на сектора (болничен коридор, рафтове, етаж от хотел, складова зона, офис флоор, колонада). Скан-линия минава вертикално, сензорни точки пулсират, една зона свети жълто.",
    use: "Когато искаме да говорим инженерно — „виждаме обекта като чертеж“.",
    theme: "light", Comp: ConceptBlueprint },
  { id: "code", num: "03", name: "Editorial Code Plate",
    pitch: "Минимална редакционна композиция. Огромен секторен код (H+, R, HSP, IND, OFF, GOV) като знак. Мета-ред горе, KPI долу, тънка скан-линия. Без илюстрация.",
    use: "Най-уверен, най-чист, най-„premium B2B“. Тук рамкираме индустриите като система.",
    theme: "light", Comp: ConceptCode },
  { id: "topo", num: "04", name: "Signal Topology",
    pitch: "Архитектурна диаграма: PSIM ядро в центъра, лъчи към подсистемите (CAM, ACS, DET, EAS, BMS…), сигналът тече по линиите като пулсиращи тирета.",
    use: "Когато искаме да покажем интеграция и сложност — „всичко минава през едно ядро“.",
    theme: "light", Comp: ConceptTopology },
  { id: "heat", num: "05", name: "Activity Heatmap",
    pitch: "Грид от клетки с уникална форма за всеки сектор. Клетките пулсират с различен интензитет, имитирайки честота на събитията. Долу — скала, горе — KPI.",
    use: "Когато искаме абстрактно, data-art усещане без буквална илюстрация.",
    theme: "light", Comp: ConceptHeatmap },
];

function IndustryGrid({ Comp, theme }) {
  return (
    <div className={`ind-grid-v2 ${theme === "dark" ? "on-dark" : ""}`}>
      {SECTORS.map((s, i) => (
        <a key={s.k} className={`tile-v2 t-${s.k}`} href="#">
          <div className="tile-art">
            <Comp s={s} idx={i} />
          </div>
          <TileCap title={s.title} />
        </a>
      ))}
    </div>
  );
}

function ConceptBlock({ c, idx }) {
  return (
    <section className={`concept ${c.theme === "dark" ? "dark" : ""}`} id={c.id}>
      <div className="cwrap">
        <header className="chead">
          <div className="chead-l">
            <div className="cnum">КОНЦЕПЦИЯ · {c.num} / 05</div>
            <h2 className="cname">{c.name}</h2>
          </div>
          <div className="chead-r">
            <p className="cpitch">{c.pitch}</p>
            <p className="cuse"><span>Кога:</span> {c.use}</p>
          </div>
        </header>
        <IndustryGrid Comp={c.Comp} theme={c.theme} />
      </div>
    </section>
  );
}

function ConceptsDemo() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <div className="ph-eyebrow">NIKOM · Industries · визуални концепции</div>
          <h1 className="ph-h1">Пет посоки за визуализация на индустриите</h1>
          <p className="ph-lead">
            Сега всеки сектор е представен с малка изометрична сграда. Това работи, но
            се повтаря и не носи смисъл. По-долу — пет различни посоки, всяка с анимация
            и приложена върху всички 6 сектора, за да може да се сравнят на равна нога.
          </p>
          <nav className="ph-nav">
            {CONCEPTS.map(c => <a key={c.id} href={`#${c.id}`}><span>{c.num}</span>{c.name}</a>)}
          </nav>
        </div>
      </header>
      {CONCEPTS.map((c, i) => <ConceptBlock key={c.id} c={c} idx={i} />)}
      <footer className="page-foot">
        <div className="container">
          <span>Кажете коя посока да заменим в Industries секцията — мога да я интегрирам директно в NIKOM Security.html.</span>
        </div>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ConceptsDemo />);
