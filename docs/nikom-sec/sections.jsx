/* Main sections: solutions bento, process, why, industries, projects, integration, partners, contact, footer */

const Ic = window.NIKOMIcon;
const { useState, useEffect, useRef } = React;

/* ===== SOLUTIONS — BENTO ===== */
function Solutions() {
  return (
    <section className="section-pad solutions" id="solutions">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Решения · 05 категории</div>
            <h2 className="h2"><window.StreamText text="Един партньор за всички инженерни системи в обекта." /></h2>
          </div>
          <p className="section-lead">
            Проектираме, доставяме и интегрираме сертифицирани системи на водещи производители. Категориите по-долу се изграждат самостоятелно или като единна интегрирана среда.
          </p>
        </div>

        <div className="bento">
          {/* BIG — Fire safety — REDESIGNED dark+yellow accent */}
          <div className="bento-card span-2 row-2 fire-card">
            <div className="fire-grid" />
            <div className="fire-glow" />

            <div className="card-meta" style={{ position: "relative", zIndex: 2 }}>
              <span className="chip dark">01 · Пожарна безопасност</span>
              <span className="meta">EN 54 · NFPA</span>
            </div>

            <div className="fire-title" style={{ position: "relative", zIndex: 2 }}>
              <div className="card-icon anim"><Ic.Fire /></div>
              <h3 className="h3">Пожароизвестяване<br />&amp; пожарогасене</h3>
            </div>

            <div className="fire-diagram" style={{ position: "relative", zIndex: 2 }}>
              <FireFloorPlan />
            </div>

            <div className="fire-mini-stats" style={{ position: "relative", zIndex: 2 }}>
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

            <a className="card-link" href="#" style={{ position: "relative", zIndex: 2 }}>Прегледай решения <Ic.Arrow /></a>
            <CornerTicks />
          </div>

          {/* CCTV */}
          <div className="bento-card">
            <div className="card-meta">
              <span className="chip">02 · Сигурност</span>
              <span className="icon-dot" />
            </div>
            <div className="card-icon anim"><Ic.Cam /></div>
            <h3 className="h4">Видеонаблюдение &amp; СОТ</h3>
            <p>IP/PTZ камери, термовизия, VMS, охранителни централи, периметрова защита.</p>
            <a className="card-link" href="#">Детайли <Ic.Arrow /></a>
            <CornerTicks />
          </div>

          {/* Panic */}
          <div className="bento-card">
            <div className="card-meta">
              <span className="chip">03 · Реакция</span>
              <span className="icon-dot" />
            </div>
            <div className="card-icon anim"><Ic.Panic /></div>
            <h3 className="h4">Паник &amp; алармени системи</h3>
            <p>Дискретни паник бутони, моментално оповестяване, патрулна реакция.</p>
            <a className="card-link" href="#">Детайли <Ic.Arrow /></a>
            <CornerTicks />
          </div>

          {/* ACS */}
          <div className="bento-card span-2">
            <div className="card-meta">
              <span className="chip">04 · Контрол на достъп</span>
              <span className="meta">RFID · BIOMETRIC · ANPR</span>
            </div>
            <div className="card-row">
              <div>
                <div className="card-icon anim"><Ic.Key /></div>
                <h3 className="h3">Контрол на достъп &amp; паркинг</h3>
                <p>Soyal, Paradox, Suprema. Биометрия, картови системи, турникети, бариери и&nbsp;ANPR за&nbsp;паркинг управление.</p>
              </div>
              <div className="acs-visual">
                <AcsVisual />
              </div>
            </div>
            <CornerTicks />
          </div>

          {/* Communication */}
          <div className="bento-card">
            <div className="card-meta">
              <span className="chip">05 · Комуникация</span>
              <span className="icon-dot" />
            </div>
            <div className="card-icon anim"><Ic.Speaker /></div>
            <h3 className="h4">Озвучаване &amp; оповестяване</h3>
            <p>Bosch, TOA, Inter-M. Гласово евакуационно оповестяване EN 54-16.</p>
            <a className="card-link" href="#">Детайли <Ic.Arrow /></a>
            <CornerTicks />
          </div>

          {/* Structured cabling */}
          <div className="bento-card">
            <div className="card-meta">
              <span className="chip">06 · Инфраструктура</span>
              <span className="icon-dot" />
            </div>
            <div className="card-icon anim"><Ic.Net /></div>
            <h3 className="h4">Структурни кабелни системи</h3>
            <p>Cat6/6A, оптика, LAN/WAN, сървърни шкафове — основата на&nbsp;всяка система.</p>
            <a className="card-link" href="#">Детайли <Ic.Arrow /></a>
            <CornerTicks />
          </div>

          {/* Integration — wide */}
          <div className="bento-card span-2 dark">
            <div className="card-meta">
              <span className="chip solid">07 · Интеграция</span>
              <span className="meta light">PSIM · SCADA · BMS</span>
            </div>
            <div className="card-row">
              <div>
                <h3 className="h3">Единна интегрирана среда</h3>
                <p>Свързваме пожарна, охрана, достъп, видеонаблюдение, оповестяване и&nbsp;BMS в&nbsp;единна PSIM платформа.</p>
              </div>
              <div className="int-visual">
                <IntegrationMini />
              </div>
            </div>
            <a className="card-link light" href="#">Архитектура на интеграцията <Ic.Arrow /></a>
          </div>
        </div>
      </div>
    </section>);

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
    { x: 60,  y: 50,  zone: "F1" },
    { x: 145, y: 50,  zone: "F2" },
    { x: 230, y: 50,  zone: "F3" },
    { x: 60,  y: 140, zone: "F4" },
    { x: 145, y: 140, zone: "F5" },
    { x: 230, y: 140, zone: "F6" },
  ];
  const [active, setActive] = React.useState(1);
  React.useEffect(() => {
    const t = setInterval(() => {
      setActive(a => (a + 1) % detectors.length);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  const acc = "var(--accent)";
  const dim = "rgba(247,215,36,.35)";
  const wall = "rgba(255,255,255,.22)";
  const grid = "rgba(255,255,255,.05)";

  return (
    <svg viewBox="0 0 380 220" className="firefp-svg">
      <defs>
        <linearGradient id="fpGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity=".5"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* grid lines */}
      {Array.from({length:10}).map((_,i)=>(
        <line key={"v"+i} x1={i*38} x2={i*38} y1="0" y2="220" stroke={grid}/>
      ))}
      {Array.from({length:6}).map((_,i)=>(
        <line key={"h"+i} y1={i*44} y2={i*44} x1="0" x2="380" stroke={grid}/>
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
          key={"l"+i}
          d={`M ${d.x} ${d.y} Q ${(d.x+330)/2} ${d.y < 100 ? d.y - 10 : d.y + 10} 330 100`}
          fill="none"
          stroke={i === active ? acc : dim}
          strokeWidth={i === active ? 1.4 : 0.8}
          strokeDasharray={i === active ? "3 3" : "2 4"}
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
          <g key={"d"+i} transform={`translate(${d.x} ${d.y})`}>
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
            <circle r="5" fill={isActive ? acc : "var(--ink-700)"} stroke={dim} strokeWidth="0.8"/>
            <circle r="2" fill={isActive ? "var(--accent-ink)" : acc} opacity={isActive ? 1 : 0.45}>
              {isActive && <animate attributeName="opacity" values="1;.4;1" dur="0.6s" repeatCount="indefinite"/>}
            </circle>
            {/* zone label */}
            <text x="0" y="-9" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="6"
                  fill={isActive ? acc : "rgba(255,255,255,.45)"}
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
    </svg>);

}

function IntegrationMini() {
  const nodes = [
  { x: 30, y: 30, l: "FIRE" },
  { x: 30, y: 130, l: "CCTV" },
  { x: 240, y: 30, l: "PA" },
  { x: 240, y: 130, l: "ACS" }];

  return (
    <svg viewBox="0 0 280 170" className="intmini-svg">
      <circle cx="140" cy="80" r="36" fill="var(--accent)">
        <animate attributeName="r" values="34;38;34" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <text x="140" y="76" textAnchor="middle" fontFamily="Geologica" fontSize="11" fill="var(--accent-ink)" fontWeight="600">PSIM</text>
      <text x="140" y="90" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent-ink)">core</text>
      {nodes.map((n, i) =>
      <g key={i}>
          <path d={`M ${n.x + 40} ${n.y} Q 140 ${n.y < 80 ? 30 : 130} 140 80`} fill="none"
        stroke="rgba(247,215,36,.7)" strokeWidth="1.2" strokeDasharray="2 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur={2 + i * 0.3 + "s"} repeatCount="indefinite" />
          </path>
          <rect x={n.x - 22} y={n.y - 12} width="44" height="24" rx="3" fill="var(--bg-elev)" stroke="var(--border-strong)" />
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--fg)">{n.l}</text>
        </g>
      )}
    </svg>);

}

/* ===== TICKER (scrolling status bar) ===== */
function Ticker() {
  const items = [
  { n: "800+", l: "завършени обекта" },
  { n: "24/7", l: "дежурен инженер" },
  { n: "< 30 мин", l: "критична реакция" },
  { n: "20+ г.", l: "инженерен опит" },
  { n: "ISO 27001", l: "сертифицирано" },
  { n: "98.6%", l: "SLA точност" },
  { n: "248", l: "активни нод-а" },
  { n: "EN 54", l: "съответствие" }];

  return (
    <div className="ticker">
      <Marquee speed={45} className="on-dark">
        {items.map((it, i) =>
        <React.Fragment key={i}>
            <span className="ticker-item"><span className="num">{it.n}</span><span>{it.l}</span></span>
            <span className="ticker-sep" />
          </React.Fragment>
        )}
      </Marquee>
    </div>);

}

/* ===== PROCESS ===== */
function Process() {
  const steps = [
  { n: "01", t: "Консултация", d: "Оглед, нормативни изисквания, бюджетна рамка." },
  { n: "02", t: "Проектиране", d: "Работен проект, спецификация, съгласувания." },
  { n: "03", t: "Доставка", d: "Сертифицирана техника от водещи производители." },
  { n: "04", t: "Монтаж", d: "Лицензиран екип, инсталация по график." },
  { n: "05", t: "Тестване", d: "72-часов приемен тест, протоколи." },
  { n: "06", t: "Обучение", d: "Инструктаж на операторите." },
  { n: "07", t: "Поддръжка", d: "Абонаментен сервиз 24/7." }];

  const [walkerRef, active] = window.ProcessWalker(steps.length, 1300);
  // active: -1 idle, 0..steps.length-1 current step, -2 all complete
  const completedThrough = active === -2 ? steps.length - 1 : Math.max(active, -1);
  const progress = active === -2 ? 100 : (completedThrough + 1) / steps.length * 100;

  return (
    <section className="section-pad process" id="process">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Процес · End-to-End инженеринг</div>
            <h2 className="h2"><window.StreamText text="Един екип. Един проект. От консултация до поддръжка." /></h2>
          </div>
          <p className="section-lead">
            Не работим с подизпълнители на ключови етапи. Всеки проект се води от&nbsp;назначен инженер-ръководител.
          </p>
        </div>

        <div className="proc-timeline" ref={walkerRef} style={{ "--progress": progress + "%" }}>
          <div className="proc-line">
            <div className="proc-line-fill" />
          </div>
          <div className="proc-steps">
            {steps.map((s, i) => {
              const state = active === -2 ? "done" :
              active === i ? "active" :
              i < active ? "done" : "idle";
              return (
                <div className={"proc-step state-" + state} key={s.n} style={{ "--i": i }}>
                  <div className="proc-dot" />
                  <div className="proc-n">{s.n}</div>
                  <div className="proc-t">{s.t}</div>
                  <div className="proc-d">{s.d}</div>
                </div>);

            })}
          </div>
          <div className="proc-status">
            <span className="status-dot" />
            <span className="meta">
              {active === -2 ? "Цикъл завършен · стандартен work-flow" :
              active === -1 ? "Готов за изпълнение" :
              `Активна стъпка: ${steps[active].n} · ${steps[active].t}`}
            </span>
          </div>
        </div>
      </div>
    </section>);

}

/* ===== WHY NIKOM ===== */
function WhyNikom() {
  const pillars = [
  { t: "Инженерен подход", d: "Решения, проектирани от инженери. Всеки проект минава през работно проектиране и съгласуване." },
  { t: "Сертифицирана апаратура", d: "Esser, Honeywell, INIM, Securiton, Bosch, Soyal, Paradox — само сертифицирани производители." },
  { t: "Прецизно изпълнение", d: "Лицензирани монтажни екипи, доказана методика, документиране и 72-часов приемен тест." },
  { t: "Дългосрочна поддръжка", d: "Абонаментен сервиз 24/7, профилактика, резервни части, договорно SLA." }];

  return (
    <section className="section-pad why">
      <div className="container">
        <div className="why-grid">
          <div className="why-head">
            <div className="eyebrow">Защо NIKOM</div>
            <h2 className="h2"><window.StreamText text="Инженерен партньор, не доставчик на оборудване." /></h2>
            <p className="why-lead">Над 20 години изграждаме критични системи за&nbsp;болници, посолства, индустрия и&nbsp;търговски вериги. Останалото е&nbsp;въпрос на&nbsp;стандарт.</p>
            <div className="why-stats">
              <div><div className="why-n"><Counter to={98.6} decimals={1} suffix="%" /></div><div className="why-l">точност на SLA реакции</div></div>
              <div><div className="why-n">&lt;<Counter to={30} /> мин</div><div className="why-l">средно време за&nbsp;критична реакция</div></div>
            </div>
          </div>
          <div className="why-pillars">
            {pillars.map((p, i) =>
            <div className="pillar" key={i}>
                <div className="pillar-n">0{i + 1}</div>
                <div>
                  <h3 className="h4">{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ===== INDUSTRIES ===== */
function Industries({ variant = "soc" }) {
  const items = [
  { t: "Болници и лечебни заведения", n: "H+", k: "hospital",
    kpi: 187, kpiLabel: "ЗОНИ",
    ev: ["Зона 12 · OK", "Достъп · Кардиология", "ASD · норма", "Камера 47 · активна", "Газ-гасене · armed"] },
  { t: "Търговски вериги &amp; ритейл", n: "R", k: "retail",
    kpi: 640, kpiLabel: "КАМЕРИ",
    ev: ["EAS · Каса 04", "POS-CCTV синхрон", "Зона 03 · норма", "Видеоанализ · OK", "Склад · вход 2"] },
  { t: "Хотели и жилищни комплекси", n: "HSP", k: "hotel",
    kpi: 248, kpiLabel: "СТАИ",
    ev: ["Карта · етаж 7", "Лоби · OK", "Паркинг · вход 2", "Пожар · норма", "SPA зона · OK"] },
  { t: "Индустриални и складови бази", n: "IND", k: "ind",
    kpi: 412, kpiLabel: "СЕНЗОРИ",
    ev: ["Периметър · OK", "Радар · сектор B", "Бариера · вход 2", "VESDA · норма", "ATEX зона · OK"] },
  { t: "Офис и административни сгради", n: "OFF", k: "office",
    kpi: 16, kpiLabel: "ЕТАЖА",
    ev: ["Турникет · вход юг", "BMS · норма", "Зона 4 · OK", "Лифт · сервиз", "Дата-център · OK"] },
  { t: "Държавни и институционални", n: "GOV", k: "gov",
    kpi: 92, kpiLabel: "ЗОНИ",
    ev: ["Бариера · вход 1", "ID-контрол · активен", "Периметър · OK", "Архив · заключен", "Sally-port · clear"] }];

  const isSOC = variant === "soc";

  return (
    <section className="section-pad industries">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сектори · 06 индустрии</div>
            <h2 className="h2"><window.StreamText text="Системи, изпитани в най-критични среди." /></h2>
          </div>
          <p className="section-lead">Всеки сектор има специфични нормативни изисквания и&nbsp;риск-профил. Подходът ни е&nbsp;адаптиран към&nbsp;всеки от тях.</p>
        </div>
        <div className={"ind-grid" + (isSOC ? " ind-grid-soc" : "")}>
          {items.map((it, i) =>
          <a className={"ind-tile" + (isSOC ? " ind-tile-soc" : "")} key={i} href="#">
              <div className="ind-bg" data-k={it.k}>
                {isSOC ? (
                  <window.IndustrySOC
                    k={it.k} code={it.n} kpi={it.kpi} kpiLabel={it.kpiLabel} events={it.ev} seed={i} />
                ) : (
                  <React.Fragment>
                    <span className="ind-code">{it.n}</span>
                    <window.IndustryScene k={it.k} variant={variant} />
                  </React.Fragment>
                )}
              </div>
              <div className="ind-cap">
                <span dangerouslySetInnerHTML={{ __html: it.t }} />
                <Ic.Arrow />
              </div>
            </a>
          )}
        </div>
      </div>
    </section>);

}

/* ===== PROJECTS ===== */
function Projects() {
  const list = [
  {
    name: "Аджибадем Сити Клиник · Болница Токуда",
    sector: "Здравеопазване", year: "2022",
    img: "assets/proj-tokuda.jpg",
    systems: ["Пожароизвестяване", "Видеонаблюдение", "Контрол на достъп", "Гласово оповестяване", "Структурно окабеляване"],
    kpi: [["Обекта", 3], ["Камери", 312], ["Сензори", 1850, "plus"]],
    featured: true
  },
  {
    name: "Верига магазини ХИПОЛЕНД",
    sector: "Ритейл", year: "2019—2025",
    img: "assets/proj-hipoland.jpg",
    systems: ["Пожароизвестяване", "CCTV", "СОТ", "Озвучаване"],
    kpi: [["Обекта", 28], ["Камери", 640, "plus"], ["Сензори", 1240, "plus"]]
  },
  {
    name: "Болница по хематология",
    sector: "Здравеопазване", year: "2021",
    img: "assets/proj-onkobolnitsa.jpg",
    systems: ["Газово пожарогасене", "ASD", "Контрол на достъп"],
    kpi: [["Обекта", 1], ["Камери", 96], ["Сензори", 210]]
  },
  {
    name: "Посолство и резиденция · Република Полша",
    sector: "Държавни обекти", year: "2020",
    img: "assets/proj-poland.jpg",
    systems: ["Периметрова защита", "CCTV", "ACS", "PA"],
    kpi: [["Обекта", 2], ["Камери", 84], ["Сензори", 156]]
  }];


  const renderKpi = (k) => {
    const [label, val, kind] = k;
    if (kind === "raw") return val;
    if (kind === "comma") return <Counter to={val} format="comma" />;
    if (kind === "plus") return <><Counter to={val} />+</>;
    if (kind === "pct") return <><Counter to={val} decimals={1} />%</>;
    return <Counter to={val} />;
  };

  return (
    <section className="section-pad projects" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Проекти · Избрани</div>
            <h2 className="h2"><window.StreamText text="Доказани решения в обекти с висока критичност." /></h2>
          </div>
          <div className="proj-filters">
            <span className="chip solid">Всички</span>
            <span className="chip">Здравеопазване</span>
            <span className="chip">Ритейл</span>
            <span className="chip">Държавни</span>
            <span className="chip">Индустрия</span>
            <a className="btn btn-ghost btn-sm" href="#">Виж всички 80+ <Ic.Arrow /></a>
          </div>
        </div>

        <div className="proj-grid">
          {list.map((p, i) =>
          <article className={"proj-card " + (p.featured ? "featured" : "")} key={i}>
              <div className="proj-img">
                <img src={p.img} alt={p.name} className="proj-photo" loading="lazy" />
                <div className="proj-overlay">
                  <span className="chip dark">{p.year}</span>
                  <span className="chip solid">{p.sector}</span>
                </div>
                <span className="proj-meta-stamp">PROJECT · {String(i + 1).padStart(3, "0")}</span>
              </div>
              <div className="proj-body">
                <h3 className="h3 proj-title">{p.name}</h3>
                <div className="proj-systems">
                  {p.systems.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
                <div className="proj-kpis">
                  {p.kpi.map((k, idx) =>
                <div key={idx}>
                      <div className="meta">{k[0]}</div>
                      <div className="kpi-v">{renderKpi(k)}</div>
                    </div>
                )}
                </div>
                <a className="card-link" href="#">Виж проекта <Ic.Arrow /></a>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

/* ===== INTEGRATION ARCHITECTURE — fully animated ===== */
function Integration() {
  return (
    <section className="section-pad integration dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Архитектура · Интеграция</div>
            <h2 className="h2"><window.StreamText text="Една централа. Всички подсистеми." /></h2>
          </div>
          <p className="section-lead">Сценарий, при&nbsp;който димен датчик задейства CCTV запис, локално оповестяване, евакуационни маршрути и&nbsp;уведомяване на&nbsp;дежурния — за&nbsp;секунди.</p>
        </div>
        <div className="arch-wrap">
          <div className="arch-scan" />
          <ArchitectureDiagram />

          <div className="arch-side">
            <div className="arch-log">
              <div className="arch-log-head">
                <span><span className="icon-dot" /> LIVE EVENT STREAM</span>
                <span>OBJ-247 · ZONE F2</span>
              </div>
              <Streaming items={[
              { time: "14:02:11", tag: "INFO", kind: "info", msg: "Heartbeat — всички подсистеми online" },
              { time: "14:03:48", tag: "OK", kind: "ok", msg: "ACS-A1 · валидиран достъп (карта #2847)" },
              { time: "14:05:22", tag: "INFO", kind: "info", msg: "CCTV-C7 · PTZ patrol cycle стартиран" },
              { time: "14:07:09", tag: "WARN", kind: "warn", msg: "FIRE-F2 · смущение в&nbsp;detector loop 3" },
              { time: "14:07:11", tag: "OK", kind: "ok", msg: "FIRE-F2 · self-check premium · възстановен" },
              { time: "14:09:34", tag: "INFO", kind: "info", msg: "PA · scheduled announcement OK" },
              { time: "14:11:50", tag: "OK", kind: "ok", msg: "BMS · HVAC синхронизация валидна" }]
              } />
            </div>

            <div>
              <div className="arch-stat-row">
                <div className="arch-stat">
                  <div className="arch-stat-n"><Counter to={248} /></div>
                  <div className="arch-stat-l">активни нод-а</div>
                </div>
                <div className="arch-stat">
                  <div className="arch-stat-n"><Counter to={8} /></div>
                  <div className="arch-stat-l">подсистеми</div>
                </div>
                <div className="arch-stat">
                  <div className="arch-stat-n"><Counter to={99.97} decimals={2} suffix="%" /></div>
                  <div className="arch-stat-l">uptime · 90 дни</div>
                </div>
                <div className="arch-stat">
                  <div className="arch-stat-n">&lt;<Counter to={400} />ms</div>
                  <div className="arch-stat-l">cross-system latency</div>
                </div>
              </div>
              <div className="arch-log" style={{ marginTop: 16 }}>
                <div className="arch-log-head">
                  <span><span className="icon-dot" /> SCENARIO · FIRE → ALL</span>
                  <span>~ 1.8 sec</span>
                </div>
                <div className="streaming">
                  <div className="stream-line active"><span className="stream-time">+0.0s</span><span className="stream-tag tag-alert">F2</span><span className="stream-msg">Димен датчик в&nbsp;зона F2 · trigger</span></div>
                  <div className="stream-line active"><span className="stream-time">+0.4s</span><span className="stream-tag tag-ok">CCTV</span><span className="stream-msg">PTZ pre-set към&nbsp;зоната · запис започва</span></div>
                  <div className="stream-line active"><span className="stream-time">+0.8s</span><span className="stream-tag tag-ok">ACS</span><span className="stream-msg">Евакуационни маршрути · отключени</span></div>
                  <div className="stream-line active"><span className="stream-time">+1.2s</span><span className="stream-tag tag-warn">PA</span><span className="stream-msg">Гласово оповестяване · евакуация</span></div>
                  <div className="stream-line active"><span className="stream-time">+1.8s</span><span className="stream-tag tag-info">OPS</span><span className="stream-msg">Дежурен инженер · push notification</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function ArchitectureDiagram() {
  const subs = [
  { l: "Пожароизвестяване", k: "FIRE", x: 30,  y: 40,  ic: "fire" },
  { l: "Видеонаблюдение",   k: "CCTV", x: 30,  y: 150, ic: "cam"  },
  { l: "Контрол на достъп", k: "ACS",  x: 30,  y: 260, ic: "key"  },
  { l: "Алармени системи",  k: "INT",  x: 30,  y: 370, ic: "bell" },
  { l: "Озвучаване / PA",   k: "PA",   x: 700, y: 40,  ic: "speaker" },
  { l: "Паркинг / ANPR",    k: "PRK",  x: 700, y: 150, ic: "bar"  },
  { l: "Аудио-видеодомофон",k: "INT2", x: 700, y: 260, ic: "intercom"},
  { l: "BMS / Сграда",      k: "BMS",  x: 700, y: 370, ic: "net"  }];
  const W = 150, H = 60;

  return (
    <svg viewBox="0 0 880 460" className="arch-svg">
      {Array.from({ length: 23 }).map((_, i) =>
      <line key={"av" + i} x1={i * 40} x2={i * 40} y1="0" y2="460" stroke="var(--grid-line)" />
      )}
      {Array.from({ length: 12 }).map((_, i) =>
      <line key={"ah" + i} y1={i * 40} y2={i * 40} x1="0" x2="880" stroke="var(--grid-line)" />
      )}

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

      {/* subsystem cards with icons */}
      {subs.map((s, i) =>
        <ArchNode key={s.k} s={s} i={i} w={W} h={H}/>
      )}

      {/* signal paths with streaming dots */}
      {subs.map((s, i) => {
        const onLeft = s.x < 400;
        const startX = onLeft ? s.x + W : s.x;
        const startY = s.y + H/2;
        const endX = onLeft ? 330 : 550;
        const endY = 225;
        const cx1 = startX + (onLeft ? 90 : -90);
        const cx2 = endX + (onLeft ? -60 : 60);
        const d = `M ${startX} ${startY} C ${cx1} ${startY}, ${cx2} ${endY}, ${endX} ${endY}`;
        return (
          <g key={"p" + i}>
            <path d={d} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="1" />
            <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="4 6" opacity=".55">
              <animate attributeName="stroke-dashoffset" from="0" to="-100" dur={3 + i * 0.2 + "s"} repeatCount="indefinite" />
            </path>
            <circle r="3" fill="var(--accent)">
              <animateMotion dur={3.4 + i * 0.3 + "s"} repeatCount="indefinite" path={d} keyPoints={onLeft ? "0;1" : "1;0"} keyTimes="0;1" />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.1;.9;1" dur={3.4 + i * 0.3 + "s"} repeatCount="indefinite" />
            </circle>
          </g>);
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
    </svg>);

}

/* Single subsystem card with icon + animation */
function ArchNode({ s, i, w, h }) {
  const delay = (i * 0.25) + "s";
  return (
    <g transform={`translate(${s.x} ${s.y})`} className="arch-node">
      <rect width={w} height={h} rx="10" fill="var(--ink-800)" stroke="rgba(255,255,255,.18)"/>
      <rect width="4" height={h} rx="2" fill="var(--accent)" opacity={i % 3 === 0 ? 1 : .5}>
        {i % 3 === 0 && <animate attributeName="opacity" values=".4;1;.4" dur="1.8s" repeatCount="indefinite" />}
      </rect>
      <circle cx={w - 12} cy={12} r="3" fill="#42C77A">
        <animate attributeName="opacity" values="1;.3;1" dur="2s" begin={delay} repeatCount="indefinite"/>
      </circle>
      <g transform={`translate(${16} ${h/2 - 14})`}>
        <ArchIcon kind={s.ic} delay={delay}/>
      </g>
      <text x="48" y="26" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" fill="#F5F2EB">{s.k}</text>
      <text x="48" y="42" fontFamily="Geologica" fontSize="10" fill="rgba(255,255,255,.62)">{s.l}</text>
    </g>
  );
}

function ArchIcon({ kind, delay = "0s" }) {
  const c = "var(--accent)";
  const o = "rgba(247,215,36,.35)";
  switch (kind) {
    case "fire":
      return (
        <g>
          <g style={{ transformOrigin: "14px 14px" }}>
            <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="0.9s" begin={delay} repeatCount="indefinite"/>
            <path d="M14 4 C 17 8 20 11 20 16 a6 6 0 0 1 -12 0 c0-2 1-3.5 2-4.5 -.2 1.4 .8 2.2 1.5 1.5 -.6-1.6 0-4.5 2.5-9z" fill={c}>
              <animate attributeName="opacity" values="1;.65;1" dur="0.9s" begin={delay} repeatCount="indefinite"/>
            </path>
          </g>
        </g>
      );
    case "cam":
      return (
        <g style={{ transformOrigin: "14px 14px" }}>
          <animateTransform attributeName="transform" type="rotate" values="-18;18;-18" dur="3.2s" begin={delay} repeatCount="indefinite"/>
          <rect x="3" y="9" width="16" height="10" rx="2" fill="none" stroke={c} strokeWidth="1.5"/>
          <path d="M19 12 l5 -2 v8 l-5 -2 z" fill={c}/>
          <circle cx="8" cy="14" r="1.6" fill={c}>
            <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/>
          </circle>
        </g>
      );
    case "key":
      return (
        <g>
          <circle cx="9" cy="14" r="5" fill="none" stroke={c} strokeWidth="1.5"/>
          <circle cx="9" cy="14" r="1.8" fill={c}>
            <animate attributeName="r" values="1;2.4;1" dur="1.6s" begin={delay} repeatCount="indefinite"/>
          </circle>
          <path d="M14 14 L26 14 M22 14 L22 18 M18 14 L18 17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
        </g>
      );
    case "bell":
      return (
        <g style={{ transformOrigin: "14px 14px" }}>
          <animateTransform attributeName="transform" type="rotate" values="0;-12;0;12;0" dur="1.4s" begin={delay} repeatCount="indefinite"/>
          <path d="M14 4 a7 7 0 0 1 7 7 v5 l2 3 H5 l2-3 v-5 a7 7 0 0 1 7-7 z" fill="none" stroke={c} strokeWidth="1.5"/>
          <circle cx="14" cy="22" r="1.8" fill={c}/>
        </g>
      );
    case "speaker":
      return (
        <g>
          <path d="M4 11 v6 h4 l5 4 V7 L8 11 H4 z" fill={c}/>
          <path d="M16 9 a6 6 0 0 1 0 10" fill="none" stroke={c} strokeWidth="1.5">
            <animate attributeName="opacity" values=".4;1;.4" dur="1.4s" begin={delay} repeatCount="indefinite"/>
          </path>
          <path d="M19 6 a10 10 0 0 1 0 16" fill="none" stroke={c} strokeWidth="1.5" opacity=".6">
            <animate attributeName="opacity" values=".2;.7;.2" dur="1.4s" begin="-0.7s" repeatCount="indefinite"/>
          </path>
        </g>
      );
    case "bar":
      return (
        <g>
          <rect x="3" y="19" width="22" height="2.5" rx="1" fill={c} opacity=".4"/>
          <rect x="3" y="15" width="22" height="2" rx="1" fill={c}>
            <animateTransform attributeName="transform" type="rotate" values="0 4 16; -65 4 16; -65 4 16; 0 4 16" keyTimes="0;.4;.6;1" dur="3s" begin={delay} repeatCount="indefinite"/>
          </rect>
          <rect x="3" y="13" width="4" height="9" rx="1" fill={c}/>
        </g>
      );
    case "intercom":
      return (
        <g>
          <rect x="6" y="3" width="16" height="22" rx="2" fill="none" stroke={c} strokeWidth="1.5"/>
          <rect x="10" y="7" width="8" height="6" rx="1" fill={c} opacity=".7">
            <animate attributeName="opacity" values=".4;1;.4" dur="1.6s" begin={delay} repeatCount="indefinite"/>
          </rect>
          <circle cx="14" cy="19" r="1.8" fill={c}/>
          <circle cx="14" cy="19" r="4" fill="none" stroke={c} strokeWidth=".8">
            <animate attributeName="r" values="1.8;5;1.8" dur="1.6s" begin={delay} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0;1" dur="1.6s" begin={delay} repeatCount="indefinite"/>
          </circle>
        </g>
      );
    case "net":
      return (
        <g>
          {[[5,6],[19,6],[5,20],[19,20]].map(([cx,cy], idx) => (
            <rect key={idx} x={cx-3} y={cy-3} width="6" height="6" rx="1" fill={c} opacity=".75">
              <animate attributeName="opacity" values=".3;1;.3" dur="1.6s" begin={(idx*0.4) + "s"} repeatCount="indefinite"/>
            </rect>
          ))}
          <line x1="8" y1="6" x2="16" y2="6" stroke={c} strokeWidth="1"/>
          <line x1="8" y1="20" x2="16" y2="20" stroke={c} strokeWidth="1"/>
          <line x1="5" y1="9" x2="5" y2="17" stroke={c} strokeWidth="1"/>
          <line x1="19" y1="9" x2="19" y2="17" stroke={c} strokeWidth="1"/>
          <circle cx="12" cy="13" r="1.5" fill={c}>
            <animate attributeName="r" values="1;2.2;1" dur="1.2s" repeatCount="indefinite"/>
          </circle>
        </g>
      );
    default:
      return <circle r="6" fill={c}/>;
  }
}

/* ===== PARTNERS — marquee ===== */
function Partners() {
  const brands = ["Honeywell", "Esser", "INIM", "Securiton", "Panasonic", "Bosch", "Dahua", "Paradox", "Soyal", "Farfisa", "TOA", "Suprema", "Hikvision", "Axis", "Mobotix"];
  return (
    <section className="section-pad partners">
      <div className="container">
        <div className="partners-head">
          <div className="eyebrow">Сертифицирани партньори</div>
          <h2 className="h3"><window.StreamText text="Работим със световни производители — без компромиси с качеството." /></h2>
        </div>
        <div className="partners-marquee">
          <Marquee speed={48} className="">
            {brands.map((b) =>
            <span className="partner-pill" key={b}>
                <span className="dot" /> {b}
              </span>
            )}
          </Marquee>
        </div>
        <div className="partners-marquee" style={{ marginTop: 12 }}>
          <Marquee speed={56} reverse={true}>
            {brands.slice().reverse().map((b) =>
            <span className="partner-pill" key={"r-" + b}>
                <span className="dot" /> {b}
              </span>
            )}
          </Marquee>
        </div>
        <div className="certs">
          {["ISO 9001:2015", "ISO 14001:2015", "ISO 27001", "ИТ–СТД-001", "Лиценз МВР № 2436", "EN 54"].map((c) =>
          <span className="cert" key={c}><Ic.Check /> {c}</span>
          )}
        </div>
      </div>
    </section>);

}

/* ===== CONTACT ===== */
function Contact() {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="section-pad contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <div className="eyebrow">Контакт · Инженер на&nbsp;линия</div>
            <h2 className="h2"><window.StreamText text="Обсъдете Вашия проект с инженер." /></h2>
            <p>Получавате обратна връзка до&nbsp;4 работни часа в&nbsp;работни дни. За&nbsp;спешни случаи на&nbsp;действащи обекти — директен телефон към&nbsp;дежурен инженер.</p>

            <div className="contact-info">
              <div>
                <div className="meta">Телефон</div>
                <a href="tel:+359894523970" className="ci-big">+359 89 45 23 970</a>
              </div>
              <div>
                <div className="meta">Имейл</div>
                <a href="mailto:office@nikom-security.com" className="ci-big">office@nikom-security.com</a>
              </div>
              <div>
                <div className="meta">Централа</div>
                <div className="ci-mid">гр. София, ул. Инженерна 14, ет. 3</div>
              </div>
              <div>
                <div className="meta">Работно време</div>
                <div className="ci-mid">Пн–Пт · 09:00—18:00 &nbsp;|&nbsp; Сервиз · 24/7</div>
              </div>
            </div>

            <div className="privacy">
              <Ic.Shield /> Вашата информация се обработва конфиденциално и&nbsp;не се споделя с&nbsp;трети страни.
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => {e.preventDefault();setSent(true);}}>
            <div className="form-head">
              <span className="chip solid">Заявка за консултация</span>
              <span className="meta">FORM · 06 fields</span>
            </div>
            {sent ?
            <div className="form-success">
                <div className="check-circle"><Ic.Check /></div>
                <h3 className="h3">Получихме заявката Ви.</h3>
                <p>Инженер от екипа ще се свърже с&nbsp;Вас в&nbsp;рамките на&nbsp;4 работни часа.</p>
              </div> :

            <>
                <div className="row-2">
                  <Field label="Име" placeholder="Иван Иванов" />
                  <Field label="Фирма" placeholder="Опционално" />
                </div>
                <div className="row-2">
                  <Field label="Телефон" placeholder="+359 ..." required />
                  <Field label="Имейл" placeholder="email@firma.bg" required />
                </div>
                <Select label="Тип обект" options={["Изберете…", "Офис сграда", "Болница", "Хотел / резиденция", "Ритейл / магазин", "Индустриален обект", "Държавна институция", "Жилищен комплекс", "Друго"]} />
                <div className="field">
                  <label>Кратко описание <span className="opt">опционално</span></label>
                  <textarea rows="4" placeholder="Брой етажи, площ, системи от интерес, срокове…" />
                </div>
                <button className="btn btn-primary btn-lg" type="submit">Изпрати заявката <Ic.Arrow /></button>
                <div className="form-foot">
                  <span className="meta">Средно време за&nbsp;отговор: ~3ч 12мин</span>
                </div>
              </>
            }
          </form>
        </div>
      </div>
    </section>);

}

function Field({ label, placeholder, required }) {
  return (
    <div className="field">
      <label>{label}{required && <span className="req">*</span>}</label>
      <input type="text" placeholder={placeholder} required={required} />
    </div>);

}
function Select({ label, options }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </div>);

}

/* ===== FOOTER ===== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <a href="#" className="brand">
              <span className="brand-mark">N</span>
              <span>NIKOM<span style={{ color: "var(--fg-muted)", fontWeight: 400, marginLeft: 4 }}>Security</span></span>
            </a>
            <p className="foot-pos">Инженерен партньор за&nbsp;интегрирани системи за&nbsp;сигурност, пожарна безопасност и&nbsp;контрол на&nbsp;достъп.</p>
            <div className="foot-social">
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="YouTube">▶</a>
            </div>
          </div>

          <FootCol title="Навигация" items={[
            {l:"Начало", h:"NIKOM Security.html"},
            {l:"За нас", h:"За нас.html"},
            {l:"Услуги", h:"Услуги.html"},
            {l:"Проекти", h:"Проекти.html"},
            {l:"Блог", h:"Блог.html"},
            {l:"Контакт", h:"Контакт.html"},
          ]} />
          <FootCol title="Услуги" items={["Пожароизвестяване", "Видеонаблюдение", "Контрол на достъп", "Паник системи", "Озвучаване", "Структурно окабеляване", "Интеграция (PSIM)"]} />
          <div className="foot-col">
            <div className="meta">Контакт</div>
            <div className="foot-contact">
              <a href="tel:+359894523970">+359 89 45 23 970</a>
              <a href="mailto:office@nikom-security.com">office@nikom-security.com</a>
              <div>гр. София, ул. Инженерна 14, ет. 3</div>
              <div className="meta" style={{ marginTop: 12 }}>Работно време</div>
              <div>Пн–Пт · 09:00—18:00</div>
              <div>Сервиз · 24 / 7 / 365</div>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="meta">© 2026 НИКОМ Системи за Сигурност ООД · ЕИК 175 432 901 · Лиценз МВР 2436-2017</div>
          <div className="foot-legal">
            <a href="#">Политика за поверителност</a>
            <a href="#">Общи условия</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <div className="footer-ghost" aria-hidden="true">
        <div className="fg-frame">
          <span className="fg-corner tl">[L:000]</span>
          <span className="fg-corner tr">[W:1920]</span>
          <span className="fg-corner bl">[H:540]</span>
          <span className="fg-corner br">[REV:2026.05]</span>
          <span className="fg-crosshair">
            <span className="cx-h" />
            <span className="cx-v" />
            <span className="cx-dot" />
          </span>
          <span className="fg-dim dim-top">+ +</span>
          <span className="fg-dim dim-bottom">+ +</span>
        </div>
        <div className="fg-line fg-line-1 fg-3d">NIKOM</div>
        <div className="fg-line fg-line-2">СИСТЕМИ ЗА СИГУРНОСТ</div>
        <div className="fg-scan" />
      </div>
    </footer>);

}
function FootCol({ title, items }) {
  return (
    <div className="foot-col">
      <div className="meta">{title}</div>
      <ul>{items.map((i) => {
        const isObj = typeof i === 'object';
        const label = isObj ? i.l : i;
        const href = isObj ? i.h : "#";
        return <li key={label}><a href={href}>{label}</a></li>;
      })}</ul>
    </div>);

}

Object.assign(window, {
  NIKOMSolutions: Solutions,
  NIKOMProcess: Process,
  NIKOMWhy: WhyNikom,
  NIKOMIndustries: Industries,
  NIKOMProjects: Projects,
  NIKOMIntegration: Integration,
  NIKOMPartners: Partners,
  NIKOMContact: Contact,
  NIKOMFooter: Footer,
  NIKOMTicker: Ticker
});