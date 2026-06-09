/* Blog listing page */

const IcB = window.NIKOMIcon;

const BLOG_POSTS = [
  {
    id: "en54-explained",
    slug: "kakvo-e-en54-i-zashto-imame-nuzhda",
    title: "Какво е EN 54 и защо имаме нужда от сертифицирани системи",
    excerpt: "Подробно обяснение на европейския стандарт за пожароизвестителни системи и какво трябва да знае всеки управител на сграда.",
    category: "Стандарти",
    cat: "standards",
    date: "2026-04-12",
    readMin: 8,
    author: "инж. Николай Васев",
    img: "assets/proj-tokuda.jpg",
    tags: ["EN 54", "Пожароизвестяване", "Сертификати"],
    featured: true,
  },
  {
    id: "anpr-parking",
    slug: "anpr-parkingovi-sistemi-2026",
    title: "ANPR паркинг системи: От разпознаване до автоматично таксуване",
    excerpt: "Преглед на технологиите за разпознаване на регистрационни номера и тяхното приложение в съвременните паркинги.",
    category: "Технологии",
    cat: "tech",
    date: "2026-03-28",
    readMin: 6,
    author: "инж. Петър Стоянов",
    img: "assets/proj-gopet.jpg",
    tags: ["ANPR", "Паркинг", "Автоматизация"],
  },
  {
    id: "hospital-fire",
    slug: "pozharna-bezopasnost-v-bolnitsi",
    title: "Пожарна безопасност в болници: специфики и предизвикателства",
    excerpt: "Защо болниците изискват уникален подход към пожарната безопасност и кои са най-критичните зони за защита.",
    category: "Case Study",
    cat: "case",
    date: "2026-03-15",
    readMin: 11,
    author: "инж. Николай Васев",
    img: "assets/proj-onkobolnitsa.jpg",
    tags: ["Здравеопазване", "Esser", "Спринклери"],
  },
  {
    id: "cctv-buying",
    slug: "kak-da-izberete-videonablyudenie",
    title: "Как да изберете видеонаблюдение: 7 ключови критерия",
    excerpt: "Резолюция, обектив, нощно виждане, AI видеоанализ — на какво да обърнете внимание, преди да купите CCTV система.",
    category: "Технологии",
    cat: "tech",
    date: "2026-02-22",
    readMin: 7,
    author: "инж. Мария Петрова",
    img: "assets/proj-crystal.jpg",
    tags: ["CCTV", "IP камери", "Видеоанализ"],
  },
  {
    id: "psim-integration",
    slug: "psim-edinna-platforma-za-sigurnost",
    title: "PSIM: единна платформа за сигурност в големите обекти",
    excerpt: "Какво е Physical Security Information Management и как обединяването на подсистемите подобрява реакцията.",
    category: "Технологии",
    cat: "tech",
    date: "2026-02-08",
    readMin: 9,
    author: "инж. Николай Васев",
    img: "assets/proj-poland.jpg",
    tags: ["PSIM", "Интеграция", "BMS"],
  },
  {
    id: "maintenance",
    slug: "abonamentna-poddrazhka",
    title: "Защо абонаментната поддръжка не е лукс, а необходимост",
    excerpt: "Реални примери от 20+ години опит — каква е разликата между обект с активна поддръжка и такъв без.",
    category: "Поддръжка",
    cat: "maintenance",
    date: "2026-01-30",
    readMin: 5,
    author: "инж. Георги Костов",
    img: "assets/proj-anel.jpg",
    tags: ["SLA", "24/7", "Сервиз"],
  },
  {
    id: "gas-extinguishing",
    slug: "gazovo-pozharogasene",
    title: "Газово пожарогасене: FM-200, NOVEC или CO2?",
    excerpt: "Сравнение на най-използваните газови агенти за пожарогасене в сървърни помещения и архиви.",
    category: "Технологии",
    cat: "tech",
    date: "2026-01-15",
    readMin: 7,
    author: "инж. Петър Стоянов",
    img: "assets/proj-mod.jpg",
    tags: ["FM-200", "Газово", "Сървъри"],
  },
  {
    id: "access-control",
    slug: "biometriya-kartov-dostap",
    title: "Биометрия срещу карта: коя система за контрол на достъп е по-добра",
    excerpt: "Предимства, недостатъци и реални сценарии за избор между биометрични четци и RFID карти.",
    category: "Технологии",
    cat: "tech",
    date: "2025-12-20",
    readMin: 6,
    author: "инж. Мария Петрова",
    img: "assets/proj-arena.jpg",
    tags: ["ACS", "Биометрия", "RFID"],
  },
  {
    id: "new-license",
    slug: "novosti-2026",
    title: "НИКОМ Security през 2026: нови сертификации и партньорства",
    excerpt: "Поглед към изминалата година и какво ни очаква напред — нови партньорства, разширение на екипа, инвестиции в обучение.",
    category: "Новини",
    cat: "news",
    date: "2026-04-30",
    readMin: 4,
    author: "Екипът на NIKOM",
    img: "assets/proj-izvorite.jpg",
    tags: ["Новини", "Компания"],
  },
  {
    id: "voice-evac",
    slug: "glasovo-opoveestyavane-en54-16",
    title: "Гласово евакуационно оповестяване по EN 54-16",
    excerpt: "Защо обикновените сирени вече не са достатъчни и какво изисква стандартът за модерните VES системи.",
    category: "Стандарти",
    cat: "standards",
    date: "2025-11-28",
    readMin: 8,
    author: "инж. Николай Васев",
    img: "assets/proj-hipoland.jpg",
    tags: ["EN 54-16", "PA", "Оповестяване"],
  },
];

const BLOG_CATEGORIES = [
  { id: "all", label: "Всички" },
  { id: "standards", label: "Стандарти" },
  { id: "tech", label: "Технологии" },
  { id: "case", label: "Case Study" },
  { id: "maintenance", label: "Поддръжка" },
  { id: "news", label: "Новини" },
];

const BLOG_TAGS = [
  "EN 54", "Пожароизвестяване", "CCTV", "PSIM", "ANPR",
  "Биометрия", "Спринклери", "FM-200", "Интеграция", "Сертификати",
  "Esser", "BMS", "Видеоанализ"
];

function formatDate(iso) {
  const d = new Date(iso);
  const months = ["януари","февруари","март","април","май","юни","юли","август","септември","октомври","ноември","декември"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

/* ===== Hero with featured post ===== */
function BlogHero() {
  const featured = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  return (
    <section className="blog-hero">
      <div className="bh-img-wrap">
        <img src={featured.img} alt={featured.title}/>
        <div className="bh-gradient"/>
        <div className="bh-scan"/>
      </div>
      <div className="container bh-inner">
        <div className="bh-eyebrow">
          <span className="status-dot"/>
          <span>БЛОГ · NIKOM SECURITY</span>
        </div>
        <h1 className="bh-h1"><window.StreamText text="Инженерни статии за сигурност, пожарна безопасност и интеграция."/></h1>
        <p className="bh-lead">Технически прегледи, case studies и&nbsp;експертни мнения от&nbsp;екипа на&nbsp;НИКОМ.</p>
      </div>
    </section>
  );
}

/* ===== Featured post card ===== */
function BlogFeatured() {
  const p = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];
  return (
    <section className="section-pad blog-featured">
      <div className="container">
        <div className="bf-grid">
          <a className="bf-img-wrap" href={`Статия.html?id=${p.id}`}>
            <window.LazyImg src={p.img} alt={p.title}/>
            <span className="chip solid bf-cat">{p.category}</span>
            <div className="bf-corners">
              <span className="corn tl"/><span className="corn tr"/>
              <span className="corn bl"/><span className="corn br"/>
            </div>
            <div className="bf-featured-tag meta">★ ИЗБРАНА</div>
          </a>
          <div className="bf-content">
            <div className="eyebrow">Избрана статия</div>
            <h2 className="h2 bf-title"><window.StreamText text={p.title}/></h2>
            <p className="bf-excerpt">{p.excerpt}</p>
            <div className="bf-meta">
              <div className="bf-meta-row">
                <span className="meta">Автор</span>
                <span className="bf-meta-v">{p.author}</span>
              </div>
              <div className="bf-meta-row">
                <span className="meta">Дата</span>
                <span className="bf-meta-v">{formatDate(p.date)}</span>
              </div>
              <div className="bf-meta-row">
                <span className="meta">Време за прочит</span>
                <span className="bf-meta-v">{p.readMin} мин</span>
              </div>
            </div>
            <div className="bf-tags">
              {p.tags.map(t => <span className="chip" key={t}>#{t}</span>)}
            </div>
            <a className="btn btn-primary" href={`Статия.html?id=${p.id}`}>Прочети статията <IcB.Arrow/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Filters + Grid ===== */
function BlogList() {
  const [filter, setFilter] = React.useState("all");
  const [tagFilter, setTagFilter] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(4);
  const counts = React.useMemo(() => {
    const c = { all: BLOG_POSTS.length };
    BLOG_POSTS.forEach(p => { c[p.cat] = (c[p.cat] || 0) + 1; });
    return c;
  }, []);

  const filtered = React.useMemo(() => {
    let list = BLOG_POSTS;
    if (filter !== "all") list = list.filter(p => p.cat === filter);
    if (tagFilter) list = list.filter(p => p.tags.includes(tagFilter));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [filter, tagFilter, query]);

  React.useEffect(() => { setVisible(4); }, [filter, tagFilter, query]);

  const sentinelRef = React.useRef(null);
  React.useEffect(() => {
    if (visible >= filtered.length) return;
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(v => Math.min(v + 4, filtered.length));
    }, { rootMargin: "300px" });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [visible, filtered.length]);

  return (
    <section className="section-pad blog-list">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Архив · {BLOG_POSTS.length} статии</div>
            <h2 className="h2"><window.StreamText text="Намерете точно това, което Ви интересува."/></h2>
          </div>
          <div className="bl-filter-bar">
            <div className="bl-filter-rail">
              {BLOG_CATEGORIES.map(cat => (
                <button key={cat.id}
                        className={"prj-filter-btn " + (filter === cat.id ? "active" : "")}
                        onClick={() => setFilter(cat.id)}>
                  <span>{cat.label}</span>
                  <span className="prj-filter-count">{counts[cat.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bl-layout">
          <div className="bl-grid">
            {filtered.length === 0 ? (
              <div className="bl-empty">
                <div className="meta">Няма статии съответстващи на филтрите.</div>
                <button className="btn btn-ghost btn-sm" style={{marginTop: 12}}
                  onClick={() => { setFilter("all"); setTagFilter(null); setQuery(""); }}>
                  Изчисти филтри
                </button>
              </div>
            ) : (
              filtered.slice(0, visible).map((p, i) => <BlogCard key={p.id} p={p} index={i}/>)
            )}
          </div>
          <aside className="bl-sidebar">
            <div className="bl-side-card bl-search">
              <div className="eyebrow">Търсене</div>
              <div className="bl-search-wrap">
                <svg className="bl-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="21" y1="21" x2="16.5" y2="16.5"/>
                </svg>
                <input
                  type="search"
                  className="bl-search-input"
                  placeholder="Търси статия, ключов термин..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                {query && (
                  <button className="bl-search-clear" onClick={() => setQuery("")} aria-label="Изчисти">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 6l12 12M18 6 6 18"/>
                    </svg>
                  </button>
                )}
              </div>
              {query && (
                <div className="bl-search-hint meta">
                  Намерени: <strong>{filtered.length}</strong> / {BLOG_POSTS.length}
                </div>
              )}
            </div>

            <div className="bl-side-card">
              <div className="eyebrow">Топ тагове</div>
              <div className="bl-tags-cloud">
                {BLOG_TAGS.map(t => (
                  <button
                    key={t}
                    className={"chip " + (tagFilter === t ? "solid" : "")}
                    onClick={() => setTagFilter(tagFilter === t ? null : t)}
                  >#{t}</button>
                ))}
              </div>
              {tagFilter && (
                <button className="bl-clear-tag" onClick={() => setTagFilter(null)}>
                  Изчисти филтър за #{tagFilter} ✕
                </button>
              )}
            </div>

            <div className="bl-side-card bl-newsletter">
              <div className="eyebrow">Нюзлетър</div>
              <h4 className="h4">Получавайте нови статии</h4>
              <p>Веднъж месечно, без spam. Може да се отпишете по всяко време.</p>
              <form className="bl-nl-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Вашият имейл"/>
                <button className="btn btn-primary btn-sm" type="submit">Запиши</button>
              </form>
            </div>

            <div className="bl-side-card bl-recent">
              <div className="eyebrow">Последни</div>
              <ul>
                {BLOG_POSTS.slice(0, 4).map(p => (
                  <li key={p.id}>
                    <a href={`Статия.html?id=${p.id}`}>
                      <span className="bl-rec-date">{formatDate(p.date).split(" ").slice(0,2).join(" ")}</span>
                      <span className="bl-rec-title">{p.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {visible < filtered.length && (
          <div className="bl-sentinel" ref={sentinelRef}>
            <div className="prj-loader"><span/><span/><span/></div>
            <div className="meta">Зареждане още {filtered.length - visible} статии…</div>
          </div>
        )}
        {visible >= filtered.length && filtered.length > 4 && (
          <div className="prj-end"><div className="meta">— Край на архива —</div></div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ p, index }) {
  const ref = React.useRef(null);
  const [phase, setPhase] = React.useState("idle");

  React.useEffect(() => {
    if (!ref.current) return;
    let t1 = null, t2 = null;
    const trigger = () => {
      const delay = Math.min(index, 6) * 80;
      t1 = setTimeout(() => {
        setPhase("scanning");
        t2 = setTimeout(() => setPhase("done"), 1000);
      }, delay);
    };
    const rect = ref.current.getBoundingClientRect();
    const inView = rect.top < (window.innerHeight || 800) + 300;
    if (inView) { trigger(); return () => { if (t1) clearTimeout(t1); if (t2) clearTimeout(t2); }; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { trigger(); io.disconnect(); }
    }, { threshold: 0, rootMargin: '300px 0px' });
    io.observe(ref.current);
    const fallback = setTimeout(trigger, 3000);
    return () => { io.disconnect(); clearTimeout(fallback); if (t1) clearTimeout(t1); if (t2) clearTimeout(t2); };
  }, [index]);

  return (
    <a ref={ref} className={"bl-card phase-" + phase} href={`Статия.html?id=${p.id}`}>
      <div className="bl-scan-overlay" aria-hidden="true">
        <span className="bl-scan-line"/>
      </div>
      <div className="bl-card-inner">
        <div className="bl-card-img">
          <window.LazyImg src={p.img} alt={p.title}/>
          <div className="bl-img-veil"/>
          <span className="chip solid bl-card-cat">{p.category}</span>
          <div className="bl-card-corners">
            <span className="corn tl"/><span className="corn tr"/>
            <span className="corn bl"/><span className="corn br"/>
          </div>
        </div>
        <div className="bl-card-body">
          <div className="bl-card-meta">
            <span className="meta">{formatDate(p.date)}</span>
            <span className="meta">·</span>
            <span className="meta">{p.readMin} мин</span>
          </div>
          <h3 className="h4 bl-card-title">{p.title}</h3>
          <p className="bl-card-excerpt">{p.excerpt}</p>
          <div className="bl-card-foot">
            <span className="bl-author">{p.author}</span>
            <span className="bl-arrow">Прочети <IcB.Arrow/></span>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ===== CTA ===== */
function BlogCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Не намирате отговор?</div>
            <h2 className="h2"><window.StreamText text="Попитайте инженер директно."/></h2>
            <p>Получавате обратна връзка по&nbsp;технически въпрос до&nbsp;4 работни часа.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Свържете се <IcB.Arrow/></a>
            <a className="btn btn-ghost btn-lg" href="Услуги.html">Вижте услуги</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BlogHero, BlogFeatured, BlogList, BlogCta, NIKOM_POSTS: BLOG_POSTS, getPostById: (id) => BLOG_POSTS.find(p => p.id === id), formatBlogDate: formatDate });
