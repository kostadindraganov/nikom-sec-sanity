/* Header, Hero, Mobile menu */

const I = window.NIKOMIcon;

/* Static highlighted keyword (decode animation removed per request) */
function GlitchWord({ text }) {
  return (
    <span className="key-tag">
      <span className="key-tag-text">{text}</span>
    </span>
  );
}

function Header({ active, theme, onToggleTheme, onOpenMenu, scrolled }) {
  return (
    <div className={"hdr-wrap " + (scrolled ? "scrolled" : "")}>
      <div className="container">
        <div className={"hdr " + (scrolled ? "scrolled" : "")}>
          <a href="#" className="brand">
            <span className="brand-mark">N</span>
            <span>NIKOM<span style={{color: "var(--fg-muted)", fontWeight: 400, marginLeft: 4}}>Security</span></span>
          </a>

          <nav className="primary">
            {[
              {l:"Начало", h:"NIKOM Security.html"},
              {l:"За нас", h:"За нас.html"},
              {l:"Услуги", h:"Услуги.html"},
              {l:"Проекти", h:"Проекти.html"},
              {l:"Блог", h:"Блог.html"},
              {l:"Контакт", h:"Контакт.html"},
            ].map(({l,h}) => (
              <a key={l} href={h} className={active===l?"active":""}>{l}</a>
            ))}
          </nav>

          <div className="actions">
            <a className="phone-btn desktop-only" href="tel:+359894523970" aria-label="Обадете се: +359 89 45 23 970" title="+359 89 45 23 970">
              <I.Phone />
            </a>
            <button className="theme-toggle" onClick={onToggleTheme} aria-label="Смяна на темата">
              {theme==="dark" ? <I.Sun /> : <I.Moon />}
            </button>
            <a className="btn btn-primary desktop-only" href="Контакт.html">
              Заявете консултация <I.Arrow />
            </a>
            <button className="theme-toggle menu-toggle" onClick={onOpenMenu} aria-label="Меню">
              <I.Menu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, theme }) {
  return (
    <div className={"mobile-menu " + (open?"open":"")}>
      <nav>
        {[
          {l:"Начало", h:"NIKOM Security.html"},
          {l:"За нас", h:"За нас.html"},
          {l:"Услуги", h:"Услуги.html"},
          {l:"Проекти", h:"Проекти.html"},
          {l:"Блог", h:"Блог.html"},
          {l:"Контакт", h:"Контакт.html"},
        ].map(({l,h}) => (
          <a key={l} href={h} onClick={onClose}>{l}</a>
        ))}
      </nav>
      <div className="m-cta">
        <a className="btn btn-primary btn-lg" href="Контакт.html" onClick={onClose}>Заявете консултация <I.Arrow /></a>
        <a className="btn btn-ghost btn-lg" href="tel:+359894523970"><I.Phone /> +359 89 45 23 970</a>
      </div>
    </div>
  );
}

/* Hero — large headline, trust indicators, building schematic visual */
function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
      </div>
      <div className="container hero-inner">
        <div className="eyebrow">Инженерни системи • Сертифицирано</div>
        <h1 className="h1 hero-h1">
          Системи за <span className="hl">сигурност</span>, <span className="hl">пожарна&nbsp;безопасност</span> и <span className="hl">контрол&nbsp;на&nbsp;достъп</span>
        </h1>
        <p className="hero-sub">
          Проектиране, доставка, монтаж и поддръжка на сертифицирани решения за бизнес, обществени и индустриални обекти. Над две десетилетия инженерен опит, без компромис към сигурността.
        </p>

        <div className="hero-cta">
          <a className="btn btn-primary btn-lg" href="#contact">Заявете консултация <I.Arrow /></a>
          <a className="btn btn-ghost btn-lg" href="#projects">Вижте проекти</a>
        </div>

        <div className="trust-bar">
          <div className="trust-item">
            <div className="trust-n"><window.Counter to={20}/><span>+</span></div>
            <div className="trust-l">години инженерен опит</div>
          </div>
          <div className="trust-item">
            <div className="trust-n"><window.Counter to={800}/><span>+</span></div>
            <div className="trust-l">завършени обекта</div>
          </div>
          <div className="trust-item">
            <div className="trust-n">24/7</div>
            <div className="trust-l">сервизна поддръжка</div>
          </div>
          <div className="trust-item">
            <div className="trust-n">ISO</div>
            <div className="trust-l">9001 / 14001 / 27001</div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="container hero-strip-inner">
          <span className="meta"><span className="status-dot" /> &nbsp;LIVE — Дежурен инженер на линия</span>
          <span className="meta">Sofia · Plovdiv · Varna · Burgas</span>
          <span className="meta">Лиценз № 2436-2017 · МВР</span>
        </div>
      </div>
    </section>
  );
}

/* Hero camera diagram — "Soft 3D render" (Variant B); markup lives in hero-cameras.jsx */
function CameraScene() {
  return (
    <div className="building-wrap">
      <div className="cam-stage">
        {window.HeroCameraDiagram ? <window.HeroCameraDiagram /> : null}
      </div>
    </div>
  );
}

/* ---- legacy NVR-monitor scene (unused, kept for reference) ---- */
const ALERT_OP = { attributeName: "opacity", values: "0;0;1;1;0;0", keyTimes: "0;0.45;0.5;0.66;0.71;1", dur: "6s", repeatCount: "indefinite" };
const NORM_OP  = { attributeName: "opacity", values: "1;1;0;0;1;1", keyTimes: "0;0.45;0.5;0.66;0.71;1", dur: "6s", repeatCount: "indefinite" };
function MiniCam({ cx, cy, aim, dur = 5 }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <line x1="0" y1="-15" x2="0" y2="-2" stroke="#39424f" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="0" cy="-16" r="3.2" fill="#2b323c" stroke="#10141a" strokeWidth=".6" />
      <g transform={`rotate(${aim})`}>
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-7;7;-7" dur={`${dur}s`}
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
          <polygon points="12,0 66,-20 66,20" fill="#5AA8FF" opacity=".15">
            <animate attributeName="opacity" values=".06;.2;.06" dur="3s" repeatCount="indefinite" />
          </polygon>
          <line x1="12" y1="0" x2="66" y2="0" stroke="#7FD0FF" strokeWidth=".7" opacity=".4" strokeDasharray="2 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1s" repeatCount="indefinite" />
          </line>
          <rect x="-17" y="-9.5" width="32" height="19" rx="9.5" fill="url(#camBody)" stroke="#10141a" strokeWidth="1" />
          <rect x="-15" y="-9" width="27" height="5" rx="2.5" fill="#fff" opacity=".18" />
          <circle cx="16" cy="0" r="9" fill="url(#camBezel)" stroke="#10141a" strokeWidth="1" />
          <circle cx="16" cy="0" r="5.8" fill="url(#camGlass)" />
          <circle cx="13.6" cy="-2.2" r="1.9" fill="#BFE0FF" opacity=".9" />
        </g>
      </g>
    </g>
  );
}

/* a signal packet travelling along a path */
function Packet({ d, dur, begin = 0, r = 2.6, color = "#7FD0FF" }) {
  return (
    <circle r={r} fill={color}>
      <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.82;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  );
}

/* one camera feed tile inside the NVR monitor */
function FeedTile({ x, y, w, h, id, label, alert }) {
  const cx = x + w / 2;
  return (
    <g>
      <clipPath id={id}><rect x={x} y={y} width={w} height={h} rx="2" /></clipPath>
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#08131f" stroke="#1d2b3c" strokeWidth="1" />
      <g clipPath={`url(#${id})`}>
        <rect x={x} y={y + h * 0.56} width={w} height={h * 0.44} fill="#0b1828" />
        <rect x={x + w * 0.1} y={y + h * 0.32} width={w * 0.17} height={h * 0.4} fill="#12273d" />
        <rect x={x + w * 0.4} y={y + h * 0.22} width={w * 0.2} height={h * 0.52} fill="#163048" />
        <rect x={x + w * 0.68} y={y + h * 0.36} width={w * 0.16} height={h * 0.38} fill="#102539" />
        <rect x={x} y={y} width={w} height="2.4" fill="#5AA8FF" opacity=".45">
          <animateTransform attributeName="transform" type="translate" values={`0 0; 0 ${h - 2.4}; 0 0`} dur="3.4s" repeatCount="indefinite" />
        </rect>
        {alert && (
          <g>
            <g opacity="0">
              <animate {...ALERT_OP} />
              <g>
                <animateTransform attributeName="transform" type="translate"
                  values={`-16 0; -16 0; ${w - 6} 0; ${w - 6} 0`} keyTimes="0;0.45;0.71;1" dur="6s" repeatCount="indefinite" />
                <g transform={`translate(${x} ${y + h - 5})`} fill="#FF6052">
                  <circle cx="7" cy="-23" r="4.2" />
                  <path d="M2.5 -18.5 q4.5 -2.5 9 0 l1 12 -3.2 0 -1.3 -7 -1.3 7 -3.2 0 z" />
                  <rect x="3.6" y="-7" width="2.6" height="7.5" />
                  <rect x="8" y="-7" width="2.6" height="7.5" />
                </g>
              </g>
            </g>
            <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} rx="2" fill="none" stroke="#FF4D3D" strokeWidth="2" opacity="0">
              <animate {...ALERT_OP} />
            </rect>
            <text x={cx} y={y + h - 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fontWeight="700" fill="#FF7163" opacity="0">
              НАРУШИТЕЛ<animate {...ALERT_OP} />
            </text>
          </g>
        )}
      </g>
      <text x={x + 4} y={y + 9} fontFamily="JetBrains Mono" fontSize="6.5" fill="#9CC4F5" fillOpacity=".8">{label}</text>
      <circle cx={x + w - 6} cy={y + 7} r="2" fill="#FF4D3D">
        <animate attributeName="opacity" values="1;.15;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}

/* Animated schematic of a full CCTV system: cameras → NVR → monitor with intruder alert */
function CameraSceneLegacy() {
  const NVR_IN = [[206, 272], [256, 270], [306, 272]];
  const cams = [
    { cx: 96,  cy: 124, aim: 50,  dur: 5.2 },
    { cx: 240, cy: 96,  aim: 90,  dur: 6.0 },
    { cx: 384, cy: 124, aim: 130, dur: 4.6 },
  ];
  const camOut = [[112, 138], [240, 112], [368, 138]];
  const tiles = [
    { x: 166, y: 368, label: "CAM 01" },
    { x: 242, y: 368, label: "CAM 02", alert: true },
    { x: 166, y: 426, label: "CAM 03" },
    { x: 242, y: 426, label: "CAM 04" },
  ];

  return (
    <div className="building-wrap">
      <div className="bldg-frame cam-frame">
        <div className="bldg-corner tl" /><div className="bldg-corner tr" />
        <div className="bldg-corner bl" /><div className="bldg-corner br" />

        <div className="cam-feed">
          <span className="live" /> СИСТЕМА — LIVE <span className="sep">·</span> 16 CH
        </div>
        <div className="cam-rec">
          <span className="rdot" /> REC
        </div>

        <svg viewBox="0 0 480 600" className="cam-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="camBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#525C6B" />
              <stop offset=".34" stopColor="#737E8F" />
              <stop offset=".68" stopColor="#2D343F" />
              <stop offset="1" stopColor="#1A1F27" />
            </linearGradient>
            <linearGradient id="camBezel" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#7B8799" />
              <stop offset=".55" stopColor="#3C444F" />
              <stop offset="1" stopColor="#1C212A" />
            </linearGradient>
            <radialGradient id="camGlass" cx="38%" cy="33%" r="72%">
              <stop offset="0" stopColor="#1B2E50" />
              <stop offset=".5" stopColor="#0C1626" />
              <stop offset="1" stopColor="#03060C" />
            </radialGradient>
            <linearGradient id="nvrFront" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2A3543" />
              <stop offset="1" stopColor="#1A222C" />
            </linearGradient>
          </defs>

          {/* ===== signal links: cameras → NVR ===== */}
          <g fill="none" stroke="#3E8BFF" strokeOpacity=".45" strokeWidth="1.4" strokeDasharray="2 6">
            {cams.map((c, i) => (
              <path key={i} d={`M${camOut[i][0]} ${camOut[i][1]} L${NVR_IN[i][0]} ${NVR_IN[i][1]}`}>
                <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.1s" repeatCount="indefinite" />
              </path>
            ))}
          </g>
          {cams.map((c, i) => (
            <Packet key={i} d={`M${camOut[i][0]} ${camOut[i][1]} L${NVR_IN[i][0]} ${NVR_IN[i][1]}`} dur={1.8} begin={i * 0.5} />
          ))}

          {/* ===== cameras ===== */}
          {cams.map((c, i) => <MiniCam key={i} {...c} />)}

          {/* ===== NVR unit (3D) ===== */}
          <g>
            <ellipse cx="252" cy="338" rx="96" ry="16" fill="rgba(0,0,0,.35)" />
            {/* top face */}
            <polygon points="168,286 312,286 344,262 200,262" fill="#33404F" stroke="#0e1218" strokeWidth="1" strokeLinejoin="round" />
            {/* right side */}
            <polygon points="312,286 344,262 344,306 312,330" fill="#161d26" stroke="#0e1218" strokeWidth="1" strokeLinejoin="round" />
            {/* front face */}
            <rect x="168" y="286" width="144" height="44" fill="url(#nvrFront)" stroke="#0e1218" strokeWidth="1" />
            {/* NVR mini display */}
            <rect x="176" y="296" width="40" height="26" rx="2" fill="#06101b" stroke="#27435f" strokeWidth="1" />
            <rect x="179" y="299" width="34" height="3" fill="#3FBF6E" opacity=".8">
              <animate attributeName="width" values="6;34;6" dur="2.6s" repeatCount="indefinite" />
            </rect>
            <line x1="179" y1="307" x2="211" y2="307" stroke="#2E6BB8" strokeWidth="1" opacity=".5" />
            <line x1="179" y1="312" x2="205" y2="312" stroke="#2E6BB8" strokeWidth="1" opacity=".4" />
            {/* label */}
            <text x="228" y="302" fontFamily="JetBrains Mono" fontSize="11" fontWeight="700" fill="#E6EEFB" letterSpacing="0.05em">NVR</text>
            <text x="228" y="313" fontFamily="JetBrains Mono" fontSize="7" fill="#8FB3DC" letterSpacing="0.08em">16-CH · POE</text>
            {/* status LED row */}
            {[0, 1, 2, 3, 4].map(i => (
              <circle key={i} cx={230 + i * 11} cy={322} r="2.4" fill={i === 4 ? "#FF4D3D" : "#3FBF6E"}>
                <animate attributeName="opacity" values={i === 4 ? "1;.15;1" : ".4;1;.4"} dur={i === 4 ? "0.9s" : `${1.4 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {/* drive bay vents on right side */}
            {[0, 1, 2].map(i => (
              <line key={i} x1={318 + i * 8} y1={296 + i * 0} x2={326 + i * 8} y2={290} stroke="#2b3947" strokeWidth="1.4" opacity=".6" />
            ))}
          </g>

          {/* NVR → monitor link */}
          <g fill="none" stroke="#3E8BFF" strokeOpacity=".5" strokeWidth="1.6" strokeDasharray="2 5">
            <path d="M240 330 L240 356">
              <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.9s" repeatCount="indefinite" />
            </path>
          </g>
          <Packet d="M240 330 L240 356" dur={1.2} color="#9FE0FF" />

          {/* ===== monitor (3D) ===== */}
          <g>
            {/* alert glow */}
            <ellipse cx="240" cy="430" rx="150" ry="110" fill="#FF3322" opacity="0">
              <animate attributeName="opacity" values="0;0;.16;.16;0;0" keyTimes="0;0.45;0.5;0.66;0.71;1" dur="6s" repeatCount="indefinite" />
            </ellipse>
            {/* stand */}
            <rect x="232" y="502" width="16" height="16" fill="#2b3340" stroke="#10141a" strokeWidth="1" />
            <ellipse cx="240" cy="522" rx="44" ry="8" fill="#222a35" stroke="#10141a" strokeWidth="1" />
            {/* bezel + 3D edge */}
            <polygon points="330,356 338,362 338,500 330,494" fill="#0a0f15" />
            <polygon points="150,494 330,494 338,500 158,500" fill="#0a0f15" />
            <rect x="150" y="356" width="180" height="138" rx="8" fill="#10171f" stroke="#2b3947" strokeWidth="1.5" />
            {/* screen */}
            <rect x="160" y="364" width="160" height="112" rx="3" fill="#050d16" />
            {tiles.map((t, i) => (
              <FeedTile key={i} id={`ft${i}`} x={t.x} y={t.y} w={70} h={52} label={t.label} alert={t.alert} />
            ))}
            {/* bottom bezel label — normal vs alert */}
            <g>
              <text x="160" y="488" fontFamily="JetBrains Mono" fontSize="8" fill="#7FA6D0" letterSpacing="0.06em">
                NVR-01 · 16CH · REC<animate {...NORM_OP} />
              </text>
            </g>
            <g>
              <rect x="158" y="480" width="164" height="11" rx="2" fill="#7A1410" opacity="0"><animate {...ALERT_OP} /></rect>
              <text x="240" y="488" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fontWeight="700" fill="#FF8073" letterSpacing="0.08em" opacity="0">
                ⚠ ДВИЖЕНИЕ — CAM 02<animate {...ALERT_OP} />
              </text>
            </g>
            {/* power led */}
            <circle cx="240" cy="497" r="2" fill="#3FBF6E">
              <animate attributeName="opacity" values=".5;1;.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        <div className="cam-scrim" />
        <div className="cam-caption">
          <h2>Цялостни системи за видеонаблюдение</h2>
          <div className="cam-sub">Камери • NVR запис • 24/7 мониторинг и известяване</div>
        </div>
      </div>
    </div>
  );
}

window.NIKOMHeader = Header;
window.NIKOMMobileMenu = MobileMenu;
window.NIKOMHero = Hero;
