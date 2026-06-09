/* Проекти — page-specific components — 11 real projects from nikom-security.com */

const IcP = window.NIKOMIcon;

/* ====== Project data ====== */
const PROJECTS = [
  {
    id: "tokuda",
    slug: "project-35",
    title: '„Аджибадем Сити Клиник Болница Токуда“ ЕАД',
    sector: "healthcare",
    sectorLabel: "Здравеопазване",
    year: "2010 — наст.",
    img: "assets/proj-tokuda.jpg",
    systems: ["Пожароизвестяване Esser by Honeywell", "Спринклерна пожарогасителна", "Пожарни кранове"],
    kpi: [["Детектори", "2 000"], ["Спринклери", "4 800"]],
    featured: true,
    quote: {
      text: "Дългогодишното успешно партньорство и съвместна работа с екипа на „НИКОМ системи за сигурност“ ЕООД от 2010 г., ръководен от инж. Николай Васев, ни дава основание да ги препоръчаме като коректен, компетентен и надежден партньор.",
      author: "инж. Георги Кърчев",
      role: "инспектор Пожарна Безопасност",
    }
  },
  {
    id: "hipoland",
    slug: "project-42",
    title: "Верига магазини ХИПОЛЕНД",
    sector: "retail",
    sectorLabel: "Ритейл",
    year: "2019 — наст.",
    img: "assets/proj-hipoland.jpg",
    systems: ["Пожароизвестяване", "Видеонаблюдение", "Сигнално-охранителни системи", "Озвучаване"],
    kpi: [["Обекта", "28+"], ["SLA", "99.5%"]],
  },
  {
    id: "hematology",
    slug: "nsbalkhz-ead-bolnitca-po-khematologiia-gr.sofiia",
    title: '„НСБАЛХЗ“ ЕАД — Болница по Хематология, гр. София',
    sector: "healthcare",
    sectorLabel: "Здравеопазване",
    year: "2021",
    img: "assets/proj-onkobolnitsa.jpg",
    systems: ["Пожароизвестяване", "Сигнално-охранителна", "Силнотокови инсталации", "СКС"],
    kpi: [["Чисти зони", "12"], ["Точки за SKS", "850+"]],
  },
  {
    id: "poland",
    slug: "posolstvo-i-rezidentciia-na-republika-polsha-sofiia",
    title: "Посолство и резиденция на Република ПОЛША, София",
    sector: "government",
    sectorLabel: "Държавни",
    year: "2020",
    img: "assets/proj-poland.jpg",
    systems: ["Видеонаблюдение", "Контрол на достъп", "Видеодомофонна система"],
    kpi: [["Ниво", "Дипл."], ["Резервиране", "N+1"]],
    classified: true,
  },
  {
    id: "gopet",
    slug: "skladova-baza-gopet-trans-gr.sofiia-4000-kv.m",
    title: "Складова база GOPET TRANS, гр. София",
    sector: "industrial",
    sectorLabel: "Складове",
    year: "2018",
    img: "assets/proj-gopet.jpg",
    systems: ["Пожароизвестяване", "Видеонаблюдение", "Контрол на достъп", "Паркинг", "Охранителна"],
    kpi: [["Площ", "4 000 m²"], ["Камери", "48"]],
  },
  {
    id: "izvorite",
    slug: "khotelski-kompleks-izvorite-gr.razlog",
    title: "Хотелски комплекс ИЗВОРИТЕ, гр. Разлог",
    sector: "hotel",
    sectorLabel: "Хотели",
    year: "2017",
    img: "assets/proj-izvorite.jpg",
    systems: ["Пожароизвестяване", "Оповестителна и SOS системи"],
    kpi: [["Стаи", "85"], ["EN 54-16", "ДА"]],
  },
  {
    id: "anel-sofia",
    slug: "khotel-anel-5-gr-sofiia",
    title: "Хотел АНЕЛ 5★, гр. София",
    sector: "hotel",
    sectorLabel: "Хотели",
    year: "2015",
    img: "assets/proj-anel.jpg",
    systems: ["Пожароизвестяване"],
    kpi: [["Етажи", "11"], ["Стаи", "84"]],
  },
  {
    id: "crystal",
    slug: "butikov-khotel-kristal-palas-4-gr.sofiia",
    title: "Бутиков хотел Кристал Палас 4★, гр. София",
    sector: "hotel",
    sectorLabel: "Хотели",
    year: "2014",
    img: "assets/proj-crystal.jpg",
    systems: ["Пожароизвестяване", "Видеонаблюдение"],
    kpi: [["Стаи", "62"]],
  },
  {
    id: "arena",
    slug: "khotel-arena-di-serdika-5-gr.sofiia",
    title: "Хотел Arena di Serdika 5★, гр. София",
    sector: "hotel",
    sectorLabel: "Хотели",
    year: "2016",
    img: "assets/proj-arena.jpg",
    systems: ["Пожароизвестяване", "Видеонаблюдение", "Контрол на достъп"],
    kpi: [["Стаи", "140"], ["Зали", "5"]],
  },
  {
    id: "sozopol",
    slug: "art-khotelski-kompleks-anel-gr-sozopol",
    title: "Арт хотелски комплекс АНЕЛ, гр. Созопол",
    sector: "hotel",
    sectorLabel: "Хотели",
    year: "2019",
    img: "assets/proj-sozopol.jpg",
    systems: ["Пожароизвестяване", "СКС"],
    kpi: [["Сезон", "12/12 мес."]],
  },
  {
    id: "defence",
    slug: "obekt-ministerstvo-na-otbranata-gazovo-pozhargasene",
    title: "Обект на Министерство на отбраната",
    sector: "government",
    sectorLabel: "Държавни",
    year: "2022",
    img: "assets/proj-mod.jpg",
    systems: ["Газова автоматична пожарогасителна инсталация"],
    kpi: [["Тип агент", "FM-200"], ["Зони", "3"]],
    classified: true,
  },
];

const CATEGORIES = [
  { id: "all", label: "Всички" },
  { id: "healthcare", label: "Здравеопазване" },
  { id: "hotel", label: "Хотели" },
  { id: "retail", label: "Ритейл" },
  { id: "industrial", label: "Складове" },
  { id: "government", label: "Държавни" },
];

/* ===== Hero ===== */
function ProjectsHero() {
  // Generate stable dust positions
  const dust = React.useMemo(() => {
    const items = [];
    for (let i = 0; i < 80; i++) {
      items.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.6,
        delay: -Math.random() * 12,
        dur: 8 + Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.55,
      });
    }
    return items;
  }, []);

  return (
    <section className="prj-video-hero">
      {/* Particles */}
      <div className="vid-particles" aria-hidden="true">
        {dust.map((d, i) => (
          <span
            key={i}
            className="vid-dust"
            style={{
              left: d.x + "%",
              top: d.y + "%",
              width: d.size + "px",
              height: d.size + "px",
              opacity: d.opacity,
              animationDelay: d.delay + "s",
              animationDuration: d.dur + "s",
            }}
          />
        ))}
      </div>

      {/* Center subject — CCTV camera */}
      <div className="vid-stage" aria-hidden="true">
        <div className="vid-glow" />
        <div className="vid-cam">
          <svg viewBox="0 0 360 280" className="vid-cam-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2A2F38"/>
                <stop offset="1" stopColor="#0E1015"/>
              </linearGradient>
              <linearGradient id="camFace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1A1D24"/>
                <stop offset="1" stopColor="#080A0E"/>
              </linearGradient>
              <radialGradient id="lens" cx="50%" cy="50%" r="55%">
                <stop offset="0" stopColor="#0A0C12"/>
                <stop offset="0.55" stopColor="#1B2230"/>
                <stop offset="0.78" stopColor="#0C0F14"/>
                <stop offset="1" stopColor="#000"/>
              </radialGradient>
              <radialGradient id="lensHi" cx="35%" cy="32%" r="40%">
                <stop offset="0" stopColor="rgba(255,255,255,.35)"/>
                <stop offset="1" stopColor="rgba(255,255,255,0)"/>
              </radialGradient>
              <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="rgba(247,215,36,.55)"/>
                <stop offset="0.55" stopColor="rgba(247,215,36,0)"/>
              </radialGradient>
            </defs>

            {/* shadow */}
            <ellipse cx="180" cy="252" rx="120" ry="10" fill="#000" opacity=".5"/>

            {/* body */}
            <rect x="80" y="40" width="180" height="180" rx="22" fill="url(#camBody)"
                  stroke="rgba(255,255,255,.06)"/>

            {/* side wedge */}
            <path d="M260 75 L 290 90 L 290 170 L 260 185 Z" fill="url(#camBody)"
                  stroke="rgba(255,255,255,.04)"/>

            {/* face plate */}
            <rect x="92" y="52" width="156" height="156" rx="18" fill="url(#camFace)"
                  stroke="rgba(255,255,255,.08)"/>

            {/* lens glow */}
            <circle cx="170" cy="130" r="85" fill="url(#lensGlow)" opacity=".7"/>

            {/* big lens */}
            <circle cx="170" cy="130" r="62" fill="url(#lens)" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
            <circle cx="170" cy="130" r="50" fill="none" stroke="rgba(255,255,255,.06)"/>
            <circle cx="170" cy="130" r="38" fill="#03050A"/>
            <circle cx="170" cy="130" r="26" fill="url(#lensHi)"/>
            <circle cx="170" cy="130" r="6" fill="var(--accent)" opacity=".85">
              <animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="170" cy="130" r="14" fill="none" stroke="var(--accent)" strokeWidth="1" opacity=".25">
              <animate attributeName="r" values="10;26;10" dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values=".5;0;.5" dur="2.4s" repeatCount="indefinite"/>
            </circle>

            {/* small sensors */}
            <circle cx="112" cy="68" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
            <circle cx="112" cy="68" r="1.4" fill="#42C77A">
              <animate attributeName="opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/>
            </circle>
            <circle cx="228" cy="68" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>

            {/* bottom sensor */}
            <circle cx="112" cy="192" r="3.5" fill="#0A0C12" stroke="rgba(255,255,255,.18)" strokeWidth=".8"/>
            <rect x="200" y="190" width="36" height="3" rx="1.5" fill="rgba(255,255,255,.1)"/>

            {/* brand chip */}
            <rect x="135" y="218" width="70" height="3.5" rx="1.5" fill="rgba(255,255,255,.12)"/>
          </svg>
        </div>
      </div>

      {/* Bottom gradient → page */}
      <div className="vid-vignette" />

      <div className="container vid-hero-content">
        <div className="vid-eyebrow">
          <span className="status-dot"/>
          <span>NIKOM · АРХИВ ОТ РЕАЛНИ ПРОЕКТИ</span>
        </div>
        <h1 className="vid-h1">
          <window.StreamText text="Проектирани с инженерия."/>
          <br/>
          <window.StreamText text="Изпълнени с прецизност." startDelay={800}/>
        </h1>
        <p className="vid-lead">
          11 избрани реализации в&nbsp;здравеопазване, хотелиерство, ритейл и&nbsp;държавни обекти.
        </p>
        <div className="vid-cta">
          <a href="#projects" className="vid-btn vid-btn-primary">
            <span className="vid-kbd">⌘</span> Разгледай проектите
          </a>
          <a href="Контакт.html" className="vid-btn vid-btn-ghost">Заявете консултация</a>
        </div>
      </div>
    </section>
  );
}

/* ===== Featured case study (Tokuda) ===== */
function ProjectsFeature() {
  const p = PROJECTS[0]; // Tokuda
  return (
    <section className="section-pad projects-feature">
      <div className="container">
        <div className="feat-grid">
          <div className="feat-img-wrap">
            <img src={p.img} alt={p.title}/>
            <div className="feat-img-tag">
              <span className="chip dark">{p.year}</span>
              <span className="chip solid">{p.sectorLabel}</span>
            </div>
            <div className="feat-img-corners">
              <span className="corn tl"/><span className="corn tr"/>
              <span className="corn bl"/><span className="corn br"/>
            </div>
          </div>
          <div className="feat-content">
            <div className="eyebrow">Избран проект · Дългосрочно партньорство</div>
            <h2 className="h2"><window.StreamText text={p.title}/></h2>
            <div className="feat-systems">
              {p.systems.map(s => <span className="chip" key={s}>{s}</span>)}
            </div>
            <div className="feat-kpi">
              {p.kpi.map(([l,v]) => (
                <div key={l}>
                  <div className="meta">{l}</div>
                  <div className="kpi-v">{v}</div>
                </div>
              ))}
              <div>
                <div className="meta">Период</div>
                <div className="kpi-v">{p.year}</div>
              </div>
            </div>
            <blockquote className="feat-quote">
              <svg width="32" height="24" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
                <path d="M0 24V12C0 5.4 5.4 0 12 0v6c-3.3 0-6 2.7-6 6h6v12H0zm18 0V12C18 5.4 23.4 0 30 0v6c-3.3 0-6 2.7-6 6h6v12H18z" opacity=".25"/>
              </svg>
              <p>{p.quote.text}</p>
              <footer>
                <strong>{p.quote.author}</strong>
                <span>{p.quote.role}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Filter bar ===== */
function ProjectsFilter({ active, onChange }) {
  const counts = React.useMemo(() => {
    const c = { all: PROJECTS.length };
    PROJECTS.forEach(p => { c[p.sector] = (c[p.sector] || 0) + 1; });
    return c;
  }, []);

  return (
    <div className="prj-filter-bar">
      <div className="prj-filter-rail">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={"prj-filter-btn " + (active === cat.id ? "active" : "")}
            onClick={() => onChange(cat.id)}
          >
            <span>{cat.label}</span>
            <span className="prj-filter-count">{counts[cat.id] || 0}</span>
          </button>
        ))}
      </div>
      <div className="meta prj-filter-meta">
        <span className="status-dot"/>
        <span>LIVE FILTER · {CATEGORIES.length - 1} категории</span>
      </div>
    </div>
  );
}

/* ===== Masonry Grid with scroll-reveal ===== */
function ProjectsMasonry() {
  const [filter, setFilter] = React.useState("all");
  const [visible, setVisible] = React.useState(6);
  const filtered = React.useMemo(() => {
    return filter === "all" ? PROJECTS : PROJECTS.filter(p => p.sector === filter);
  }, [filter]);

  // Reset visible when filter changes
  React.useEffect(() => { setVisible(filter === "all" ? 6 : filtered.length); }, [filter, filtered.length]);

  // Infinite scroll observer
  const sentinelRef = React.useRef(null);
  React.useEffect(() => {
    if (visible >= filtered.length) return;
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(v => Math.min(v + 4, filtered.length));
      }
    }, { rootMargin: "200px" });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [visible, filtered.length]);

  return (
    <section className="section-pad projects-grid" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Архив · 11+ реализации</div>
            <h2 className="h2"><window.StreamText text="Изберете сектор и разгледайте проектите."/></h2>
          </div>
          <ProjectsFilter active={filter} onChange={setFilter}/>
        </div>

        <div className="prj-masonry">
          {filtered.slice(0, visible).map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i}/>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="prj-sentinel" ref={sentinelRef}>
            <div className="prj-loader">
              <span/><span/><span/>
            </div>
            <div className="meta">Зареждане още {filtered.length - visible} проекта…</div>
          </div>
        )}

        {visible >= filtered.length && filtered.length > 6 && (
          <div className="prj-end">
            <div className="meta">— Край на архива —</div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ p, index }) {
  const ref = React.useRef(null);
  const [phase, setPhase] = React.useState("idle"); // idle → scanning → done

  React.useEffect(() => {
    if (!ref.current) return;
    let t1 = null, t2 = null;
    const trigger = () => {
      const delay = Math.min(index, 8) * 70;
      t1 = setTimeout(() => {
        setPhase("scanning");
        t2 = setTimeout(() => setPhase("done"), 1100);
      }, delay);
    };
    const rect = ref.current.getBoundingClientRect();
    const inView = rect.top < (window.innerHeight || 800) + 300;
    if (inView) { trigger(); return () => { if (t1) clearTimeout(t1); if (t2) clearTimeout(t2); }; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { trigger(); io.disconnect(); }
    }, { threshold: 0, rootMargin: '300px 0px 300px 0px' });
    io.observe(ref.current);
    const fallback = setTimeout(trigger, 3000);
    return () => { io.disconnect(); clearTimeout(fallback); if (t1) clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, [index]);

  return (
    <article
      ref={ref}
      className={"prj-card phase-" + phase + " sector-" + p.sector}
    >
      <div className="prj-scan-overlay" aria-hidden="true">
        <span className="prj-scan-line"/>
      </div>
      <div className="prj-content">
        <div className="prj-img-wrap">
          <img src={p.img} alt={p.title} loading="lazy"/>
          <div className="prj-img-veil" aria-hidden="true"/>
          <div className="prj-img-shade"/>
          <span className="chip solid prj-sector">{p.sectorLabel}</span>
          {p.classified && <span className="prj-classified meta">CLASSIFIED</span>}
          <div className="prj-corners">
            <span className="corn tl"/><span className="corn tr"/>
            <span className="corn bl"/><span className="corn br"/>
          </div>
        </div>
        <div className="prj-body">
          <div className="prj-meta-row">
            <span className="meta">{p.year}</span>
            <span className="meta prj-id">№ {String(index + 1).padStart(3, "0")}</span>
          </div>
          <h3 className="h4 prj-title">{p.title}</h3>
          <div className="prj-systems">
            {p.systems.map(s => <span className="chip" key={s}>{s}</span>)}
          </div>
          {p.kpi && p.kpi.length > 0 && (
            <div className="prj-kpi">
              {p.kpi.map(([l,v]) => (
                <div key={l}>
                  <div className="meta">{l}</div>
                  <div className="prj-kpi-v">{v}</div>
                </div>
              ))}
            </div>
          )}
          <a className="prj-link" href={`Проект.html?id=${p.id}`}>
            Виж проекта <IcP.Arrow/>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ===== Sectors stat band ===== */
function ProjectsSectorStats() {
  const sectors = [
    { id:"hotel", label:"Хотели", count:5, icon:"hotel" },
    { id:"healthcare", label:"Здравеопазване", count:2, icon:"health" },
    { id:"government", label:"Държавни", count:2, icon:"gov" },
    { id:"retail", label:"Ритейл", count:1, icon:"retail" },
    { id:"industrial", label:"Складове", count:1, icon:"ind" },
  ];
  return (
    <section className="section-pad projects-sector-stats dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сектори · Разбивка</div>
            <h2 className="h2"><window.StreamText text="Опит в най-различни критични среди."/></h2>
          </div>
          <p className="section-lead">Всеки сектор има специфични нормативни изисквания и&nbsp;риск-профил. Подходът ни е&nbsp;адаптиран към&nbsp;всеки от&nbsp;тях.</p>
        </div>
        <div className="sec-stats-grid">
          {sectors.map(s => (
            <div className="sec-stat-card" key={s.id}>
              <SectorIcon kind={s.icon}/>
              <div className="sec-stat-n"><window.Counter to={s.count}/></div>
              <div className="sec-stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorIcon({ kind }) {
  const c = "var(--accent)";
  const stroke = { fill: "none", stroke: c, strokeWidth: 1.5 };
  switch (kind) {
    case "hotel": return (<svg width="32" height="32" viewBox="0 0 32 32" {...stroke}><path d="M4 28V8h10v20M14 28V14h14v14M4 28h24" /><path d="M18 18h2M18 22h2M24 18h2M24 22h2M8 14h2M8 18h2M8 22h2" /></svg>);
    case "health": return (<svg width="32" height="32" viewBox="0 0 32 32" {...stroke}><rect x="5" y="6" width="22" height="22" rx="2"/><path d="M16 12v10M11 17h10"/></svg>);
    case "gov": return (<svg width="32" height="32" viewBox="0 0 32 32" {...stroke}><path d="M4 14L16 6l12 8v2H4z"/><path d="M7 28V16M12 28V16M20 28V16M25 28V16M4 28h24"/></svg>);
    case "retail": return (<svg width="32" height="32" viewBox="0 0 32 32" {...stroke}><path d="M5 10h22l-2 18H7zM10 14V8a6 6 0 0 1 12 0v6"/></svg>);
    case "ind": return (<svg width="32" height="32" viewBox="0 0 32 32" {...stroke}><path d="M4 28V12l8 6v-6l8 6V12l8 16zM4 28h24"/><path d="M10 24h4M18 24h4"/></svg>);
    default: return null;
  }
}

/* ===== CTA ===== */
function ProjectsCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Имате обект?</div>
            <h2 className="h2"><window.StreamText text="Споделете концепцията. Ще го превърнем в проект."/></h2>
            <p>Дискретността и&nbsp;конфиденциалността са&nbsp;стандарт при&nbsp;всеки разговор.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Заявете консултация <IcP.Arrow /></a>
            <a className="btn btn-ghost btn-lg" href="Услуги.html">Вижте услуги</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProjectsHero, ProjectsFeature, ProjectsMasonry, ProjectsSectorStats, ProjectsCta, NIKOM_PROJECTS: PROJECTS });
