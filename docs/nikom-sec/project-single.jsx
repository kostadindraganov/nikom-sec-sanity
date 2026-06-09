/* Single Project page — uses ?id=<projectId> from URL */

const IcSP = window.NIKOMIcon;
const PROJECT_LIST = window.NIKOM_PROJECTS || [];

function getProjectById(id) {
  return PROJECT_LIST.find(p => p.id === id) || PROJECT_LIST[0];
}

function ProjectHero({ p }) {
  return (
    <section className="single-hero">
      <div className="sh-img-wrap">
        <img src={p.img} alt={p.title}/>
        <div className="sh-gradient"/>
        <div className="sh-scan"/>
      </div>
      <div className="container sh-inner">
        <div className="sh-breadcrumb">
          <a href="Проекти.html">Проекти</a>
          <span className="sh-bc-sep">/</span>
          <span>{p.sectorLabel}</span>
        </div>
        <h1 className="sh-h1">
          <window.StreamText text={p.title}/>
        </h1>
        <div className="sh-meta-row">
          <span className="chip solid">{p.sectorLabel}</span>
          <span className="chip dark">{p.year}</span>
          {p.classified && <span className="chip" style={{background: "var(--accent-ink)", color: "var(--accent)", borderColor: "var(--accent)"}}>CLASSIFIED</span>}
          <span className="meta sh-id">ПРОЕКТ № {String(PROJECT_LIST.findIndex(x => x.id === p.id) + 1).padStart(3,"0")}</span>
        </div>
      </div>
    </section>
  );
}

function ProjectFacts({ p }) {
  return (
    <section className="section-pad single-facts">
      <div className="container">
        <div className="sf-grid">
          <div className="sf-left">
            <div className="eyebrow">Обхват · Реализирани системи</div>
            <h2 className="h2"><window.StreamText text="Какво изградихме."/></h2>
            <div className="sf-systems-list">
              {p.systems.map((s, i) => (
                <div className="sf-sys-row" key={i}>
                  <span className="sf-sys-num meta">{String(i+1).padStart(2,"0")}</span>
                  <span className="sf-sys-name">{s}</span>
                  <span className="sf-sys-bar"/>
                  <IcSP.Check />
                </div>
              ))}
            </div>
          </div>
          <aside className="sf-right">
            <div className="sf-card dot-border">
              <div className="meta">FACT SHEET</div>
              <div className="sf-fact-list">
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Период</span>
                  <span className="sf-fact-v">{p.year}</span>
                </div>
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Сектор</span>
                  <span className="sf-fact-v">{p.sectorLabel}</span>
                </div>
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Брой системи</span>
                  <span className="sf-fact-v">{p.systems.length}</span>
                </div>
                {(p.kpi || []).map(([l, v]) => (
                  <div className="sf-fact-row" key={l}>
                    <span className="sf-fact-l">{l}</span>
                    <span className="sf-fact-v">{v}</span>
                  </div>
                ))}
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Статус</span>
                  <span className="sf-fact-v sf-status-live">
                    <span className="status-dot"/> Активна поддръжка
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProjectScope({ p }) {
  return (
    <section className="section-pad single-scope dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Обхват на работа · End-to-end</div>
            <h2 className="h2"><window.StreamText text="От проектиране до 24/7 поддръжка."/></h2>
          </div>
          <p className="section-lead">
            Този обект минава през&nbsp;пълния NIKOM инженерен work-flow. Поддръжката е&nbsp;по&nbsp;абонаментно SLA, в&nbsp;съответствие с&nbsp;EN-54 и&nbsp;Наредба № 8121з-647 от&nbsp;1.10.2014&nbsp;г.
          </p>
        </div>
        <div className="sc-grid">
          {[
            {n:"01", t:"Проектиране", d:"Работен проект и съгласувания."},
            {n:"02", t:"Доставка", d:"Сертифицирана техника."},
            {n:"03", t:"Монтаж", d:"Лицензиран екип."},
            {n:"04", t:"Програмиране", d:"Конфигурация по обект."},
            {n:"05", t:"Приемен тест", d:"72-часов изпитен."},
            {n:"06", t:"Обучение", d:"Инструктаж на персонала."},
            {n:"07", t:"Поддръжка", d:"Абонаментен сервиз."},
          ].map(s => (
            <div className="sc-card" key={s.n}>
              <div className="sc-n">{s.n}</div>
              <div className="sc-t">{s.t}</div>
              <div className="sc-d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectQuote({ p }) {
  if (!p.quote) return null;
  return (
    <section className="section-pad single-quote">
      <div className="container">
        <div className="sq-wrap">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="currentColor" className="sq-mark">
            <path d="M0 60V30C0 13.5 13.5 0 30 0v15c-8.3 0-15 6.7-15 15h15v30H0zm45 0V30C45 13.5 58.5 0 75 0v15c-8.3 0-15 6.7-15 15h15v30H45z" opacity=".18"/>
          </svg>
          <blockquote>
            <p className="sq-text">{p.quote.text}</p>
            <footer>
              <div>
                <strong>{p.quote.author}</strong>
                <span>{p.quote.role}</span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function ProjectGallery({ p }) {
  // For demo, use the project image multiple times — replace with real gallery
  const images = [
    { src: p.img, caption: "Изглед към обекта" },
    { src: p.img, caption: "Детектори в основна зона" },
    { src: p.img, caption: "Контролен панел" },
    { src: p.img, caption: "Сензори в техническо помещение" },
    { src: p.img, caption: "Изпитване на системата" },
    { src: p.img, caption: "Документация при приемане" },
  ];
  const [open, setOpen] = React.useState(null); // index or null

  return (
    <section className="section-pad single-gallery">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Галерия · {images.length} кадри</div>
            <h2 className="h2"><window.StreamText text="Документация от обекта."/></h2>
          </div>
          <p className="section-lead">Кликнете върху&nbsp;кадър за&nbsp;fullscreen изглед. Навигация с&nbsp;←&nbsp;→ или докоснете отстрани.</p>
        </div>
        <div className="sg-grid">
          {images.map((img, i) => (
            <button
              type="button"
              className={"sg-tile " + (i === 0 ? "sg-tile-wide" : "")}
              key={i}
              onClick={() => setOpen(i)}
              aria-label={`Отвори кадър ${i+1}: ${img.caption}`}
            >
              <img src={img.src} alt={img.caption} loading="lazy"/>
              <div className="sg-tile-tag meta">KADR-{String(i+1).padStart(3,"0")}</div>
              <div className="sg-tile-zoom" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7"/>
                  <line x1="16" y1="16" x2="22" y2="22"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                </svg>
              </div>
              <div className="sg-corners">
                <span className="corn tl"/><span className="corn tr"/>
                <span className="corn bl"/><span className="corn br"/>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          startIndex={open}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}

/* ===== Lightbox ===== */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = React.useState(startIndex);
  const [direction, setDirection] = React.useState(0); // -1 prev, 1 next
  const touchRef = React.useRef({ x: 0, y: 0, t: 0 });

  const go = React.useCallback((dir) => {
    setDirection(dir);
    setIdx(i => (i + dir + images.length) % images.length);
  }, [images.length]);

  // Lock body scroll
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Preload neighbors
  React.useEffect(() => {
    [-1, 1].forEach(d => {
      const i = (idx + d + images.length) % images.length;
      const im = new Image(); im.src = images[i].src;
    });
  }, [idx, images]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.current.x;
    const dy = t.clientY - touchRef.current.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  const cur = images[idx];

  return (
    <div className="lb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}
         onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="lb-topbar">
        <div className="lb-counter meta">
          <span className="status-dot"/>
          <span>{String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        </div>
        <button className="lb-close" onClick={onClose} aria-label="Затвори">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18"/>
          </svg>
        </button>
      </div>

      <button className="lb-nav lb-prev" onClick={() => go(-1)} aria-label="Предишен">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <button className="lb-nav lb-next" onClick={() => go(1)} aria-label="Следващ">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      <div className="lb-stage">
        <div key={idx} className={"lb-image-wrap lb-dir-" + (direction >= 0 ? "next" : "prev")}>
          <img src={cur.src} alt={cur.caption} className="lb-image"/>
        </div>
      </div>

      <div className="lb-bottom">
        <div className="lb-caption">
          <span className="meta lb-kadr">KADR-{String(idx + 1).padStart(3,"0")}</span>
          <span className="lb-cap-text">{cur.caption}</span>
        </div>
        <div className="lb-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={"lb-thumb " + (i === idx ? "active" : "")}
              onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i); }}
              aria-label={`Кадър ${i+1}`}
            >
              <img src={img.src} alt=""/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRelated({ p }) {
  const others = PROJECT_LIST.filter(x => x.id !== p.id).slice(0, 3);
  return (
    <section className="section-pad single-related">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сходни проекти · 03</div>
            <h2 className="h2"><window.StreamText text="Други реализации от архива."/></h2>
          </div>
          <a className="btn btn-ghost btn-sm" href="Проекти.html">Виж всички <IcSP.Arrow/></a>
        </div>
        <div className="sr-grid">
          {others.map(o => (
            <a className="sr-card" key={o.id} href={`Проект.html?id=${o.id}`}>
              <div className="sr-img">
                <img src={o.img} alt={o.title}/>
                <span className="chip solid sr-sector">{o.sectorLabel}</span>
              </div>
              <div className="sr-body">
                <span className="meta">{o.year}</span>
                <h3 className="h4">{o.title}</h3>
                <span className="sr-arrow">Виж <IcSP.Arrow/></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Подобен обект?</div>
            <h2 className="h2"><window.StreamText text="Започнете с консултация."/></h2>
            <p>Получавате обратна връзка от&nbsp;инженер до&nbsp;4 работни часа.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Заявете консултация <IcSP.Arrow/></a>
            <a className="btn btn-ghost btn-lg" href="Услуги.html">Вижте услуги</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ProjectHero, ProjectFacts, ProjectScope, ProjectQuote, ProjectGallery, ProjectRelated, ProjectCta, getProjectById });
