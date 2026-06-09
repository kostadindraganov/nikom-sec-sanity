/* Услуги — page-specific components — content from nikom-security.com/services + enriched */

const IcS = window.NIKOMIcon;

/* ===== Services Hero with image banner ===== */
function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="srv-hero-img-wrap">
        <img src="assets/services-hero.jpg" alt="Услуги — NIKOM" className="srv-hero-img"/>
        <div className="srv-hero-gradient" />
        <div className="srv-hero-scan" />
      </div>
      <div className="container srv-hero-inner">
        <div className="srv-hero-card">
          <div className="eyebrow">Услуги · 12 системни категории</div>
          <h1 className="h1">
            <window.StreamText text="Широк кръг от услуги в системите за наблюдение и сигурност."/>
          </h1>
          <p className="srv-hero-lead">
            Екипът на „НИКОМ Системи за Сигурност“ е с 20-годишен опит в сферата на системите за сигурност и контрол. Специализираме във всяка област на системи за наблюдение и сигурност и предлагаме услуги с висок стандарт и богат опит.
          </p>
          <div className="srv-hero-pills">
            <span className="chip solid">Проектиране</span>
            <span className="chip">Разработка и монтаж</span>
            <span className="chip">Управление на проекти</span>
            <span className="chip">Сервизно обслужване</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== 12 Systems — main catalog with detailed cards ===== */
function ServicesCatalog() {
  const systems = [
    {
      n: "01", k: "FIRE", title: "Пожароизвестителни системи",
      d: "Адресируеми и конвенционални системи за ранна детекция, отговарящи на EN 54 и Наредба Iз-1971.",
      tags: ["Esser by Honeywell", "INIM", "Securiton", "Адресируеми", "Аспирация VESDA", "Сертифицирано EN 54"],
      icon: "fire",
      stats: [["Покрити обекта", "210+"], ["Стандарти", "EN 54"], ["Brands", "4"]],
    },
    {
      n: "02", k: "FIRE-EXT", title: "Пожарогасителни системи",
      d: "Спринклерни, газови, водно-мъглеви и пенни инсталации за критични зони и сървърни помещения.",
      tags: ["Спринклери", "FM-200", "FirePro", "Водно-мъгляви", "Газово", "Пожарни кранове"],
      icon: "fire-ext",
      stats: [["Реализирани", "60+"], ["Тип агенти", "5"], ["Лиценз ПБЗН", "№ 743"]],
    },
    {
      n: "03", k: "CCTV", title: "Видеонаблюдение",
      d: "IP/PTZ, термовизия, VMS и видеоанализ — с камери на Dahua, Panasonic и водещи производители.",
      tags: ["IP / PTZ", "Термовизия", "VMS", "AI видеоанализ", "Dahua", "Panasonic"],
      icon: "cam",
      stats: [["Камери монтирани", "2 400+"], ["Хранилище", "до 90 дни"], ["Резолюция", "до 4K"]],
    },
    {
      n: "04", k: "PANIC", title: "Паник системи",
      d: "Дискретни паник бутони с моментално оповестяване, връзка с дежурни центрове и патрулна реакция.",
      tags: ["Стационарни", "Мобилни", "Дискретни", "GSM модул", "Връзка с СОТ"],
      icon: "panic",
      stats: [["Реакция", "< 30 мин"], ["Тип бутони", "8"], ["24/7 мониторинг", "ДА"]],
    },
    {
      n: "05", k: "INT", title: "Сигнално-охранителни системи",
      d: "Алармени централи с периметрова и вътрешна защита от Paradox, INIM, Texecom — за всеки тип обект.",
      tags: ["Paradox", "INIM", "Texecom", "Периметрова", "Безжична", "Хибридна"],
      icon: "int",
      stats: [["Зони на обект", "до 256"], ["GSM/IP комуникация", "ДА"], ["Резервиране", "N+1"]],
    },
    {
      n: "06", k: "PARK", title: "Паркинг системи",
      d: "ANPR разпознаване на номера, бариери, тикет-машини и управление на платени паркинги.",
      tags: ["ANPR", "Бариери", "Тикет-системи", "Платени", "Free-flow", "Интеграция HR"],
      icon: "park",
      stats: [["Пропускателна способност", "1 200 авт/ч"], ["Точност ANPR", "98.5%"], ["Реакция", "< 1.2s"]],
    },
    {
      n: "07", k: "ACS", title: "Системи за контрол на достъп",
      d: "RFID, биометрия, картови системи и турникети с интеграция към HR и работно време.",
      tags: ["RFID", "Биометрия", "Soyal", "Турникети", "Suprema", "Работно време"],
      icon: "key",
      stats: [["Точки за контрол", "500+"], ["Тип идентификация", "4"], ["Интеграция HR", "ДА"]],
    },
    {
      n: "08", k: "PSIM", title: "Интегрирани системи за сигурност",
      d: "PSIM платформа, която обединява пожарна, охрана, достъп, видеонаблюдение и оповестяване в единна среда.",
      tags: ["PSIM", "SCADA", "BMS интеграция", "Unified Dashboard", "Автоматизирани сценарии"],
      icon: "psim",
      stats: [["Подсистеми", "8"], ["Latency", "< 400ms"], ["Uptime", "99.97%"]],
      featured: true,
    },
    {
      n: "09", k: "INT2", title: "Аудио и Видеодомофонни системи",
      d: "Farfisa и водещи производители — за жилищни сгради, офиси и охраняеми обекти.",
      tags: ["Farfisa", "IP домофон", "Видео", "Мобилно приложение", "Многоабонатни"],
      icon: "intercom",
      stats: [["Тип системи", "6"], ["Абонати", "до 1024"], ["IP/2-wire", "Двата"]],
    },
    {
      n: "10", k: "COMM", title: "Комуникационни системи",
      d: "Вътрешни комуникации, интерком, безжични и hands-free решения за индустриални среди.",
      tags: ["Интерком", "Безжични", "Hands-free", "Wallphones", "Indust. grade"],
      icon: "comm",
      stats: [["Реализирани", "40+"], ["IP54+", "ДА"], ["Шум", "до 95 dB"]],
    },
    {
      n: "11", k: "PA", title: "Озвучителни и оповестителни системи",
      d: "Гласово евакуационно оповестяване EN 54-16 (Bosch, TOA), фоново озвучаване и конферентни системи.",
      tags: ["Bosch", "TOA", "EN 54-16", "VES", "Фоново озвучаване", "Конферентни"],
      icon: "speaker",
      stats: [["Сертифицирано EN 54-16", "ДА"], ["Зони на обект", "до 64"], ["Watts", "до 5 kW"]],
    },
    {
      n: "12", k: "SKS", title: "Структурни кабелни системи",
      d: "Cat6/6A медни и FO оптични мрежи, сървърни шкафове, патч панели — основата на всяка интегрирана система.",
      tags: ["Cat 6/6A", "Cat 7", "Optical Fiber", "Сървърни шкафове", "Trasses", "Patch panels"],
      icon: "net",
      stats: [["Точки изградени", "12 000+"], ["FO дължини", "85 km"], ["Сертификация Fluke", "ДА"]],
    },
  ];

  return (
    <section className="section-pad services-catalog">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Каталог · Изграждане на системи</div>
            <h2 className="h2"><window.StreamText text="Дванадесет категории сертифицирани системи."/></h2>
          </div>
          <p className="section-lead">
            Всеки тип система се изгражда самостоятелно или като част от интегрирана среда. Работим със сертифицирана техника от световни производители.
          </p>
        </div>

        <div className="srv-grid">
          {systems.map((s) => (
            <SystemCard key={s.k} s={s}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemCard({ s }) {
  return (
    <article className={"srv-card " + (s.featured ? "featured" : "")}>
      <div className="srv-card-head">
        <div className="srv-icon-box">
          <SrvIcon kind={s.icon}/>
        </div>
        <div className="srv-meta">
          <span className="meta">{s.n} · {s.k}</span>
          <h3 className="h3 srv-title">{s.title}</h3>
        </div>
      </div>
      <p className="srv-desc" dangerouslySetInnerHTML={{__html: s.d}}/>
      <div className="srv-tags">
        {s.tags.map(t => <span className="chip" key={t}>{t}</span>)}
      </div>
      <div className="srv-stats">
        {s.stats.map(([l,v]) => (
          <div key={l}>
            <div className="meta">{l}</div>
            <div className="srv-stat-v">{v}</div>
          </div>
        ))}
      </div>
      <a className="srv-link" href="Контакт.html">
        Запитване <IcS.Arrow/>
      </a>
      <span className="srv-corner-tl"/>
      <span className="srv-corner-br"/>
    </article>
  );
}

function SrvIcon({ kind }) {
  const c = "var(--accent)";
  switch (kind) {
    case "fire": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><path d="M16 4 c2 3 5 6 5 11 a6 6 0 0 1 -10 0 c0-2 1-3.5 2-4.5 -.5 1.5 1 2.5 2 1.5 -.8-2 0-6 1-8z" fill={c} fillOpacity=".15"/><path d="M11 22 a5 5 0 0 0 10 0" /></svg>);
    case "fire-ext": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><rect x="11" y="9" width="10" height="18" rx="2" fill={c} fillOpacity=".15"/><path d="M14 9 V 6 a2 2 0 0 1 4 0 V 9"/><path d="M16 6 L 24 4 M24 4 L 26 8"/></svg>);
    case "cam": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><rect x="3" y="11" width="20" height="12" rx="2" fill={c} fillOpacity=".15"/><path d="M23 14 l6 -2 v8 l-6 -2 z" fill={c} fillOpacity=".25"/><circle cx="9" cy="17" r="2"/></svg>);
    case "panic": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><circle cx="16" cy="16" r="11" fill={c} fillOpacity=".15"/><circle cx="16" cy="16" r="5" fill={c}/></svg>);
    case "int": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><path d="M16 4 l10 4 v8 c0 6 -4 11 -10 12 -6 -1 -10 -6 -10 -12 v-8 z" fill={c} fillOpacity=".15"/><path d="M11 16 l3 3 7 -7"/></svg>);
    case "park": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><rect x="4" y="18" width="24" height="6" rx="1" fill={c} fillOpacity=".15"/><path d="M8 18 V 12 m16 6 V 14 m-12 4 V 10"/><rect x="3" y="16" width="6" height="10" rx="1" fill={c}/></svg>);
    case "key": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><circle cx="11" cy="16" r="6" fill={c} fillOpacity=".15"/><circle cx="11" cy="16" r="2" fill={c}/><path d="M17 16 H 28 M 25 16 V 21 M 21 16 V 19"/></svg>);
    case "psim": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><circle cx="16" cy="16" r="6" fill={c} fillOpacity=".25"/><circle cx="16" cy="16" r="10" strokeDasharray="2 3"/><circle cx="6" cy="6" r="2" fill={c}/><circle cx="26" cy="6" r="2" fill={c}/><circle cx="6" cy="26" r="2" fill={c}/><circle cx="26" cy="26" r="2" fill={c}/></svg>);
    case "intercom": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><rect x="9" y="4" width="14" height="24" rx="2" fill={c} fillOpacity=".15"/><rect x="12" y="8" width="8" height="6" rx="1" fill={c} fillOpacity=".5"/><circle cx="16" cy="21" r="2" fill={c}/></svg>);
    case "comm": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><path d="M5 7 a3 3 0 0 1 3 -3 h2 a2 2 0 0 1 2 2 v4 a2 2 0 0 1 -2 2 h-2 c0 6 4 10 10 10 v -2 a2 2 0 0 1 2 -2 h4 a2 2 0 0 1 2 2 v2 a3 3 0 0 1 -3 3 c-11 0 -18 -7 -18 -18z" fill={c} fillOpacity=".15"/></svg>);
    case "speaker": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><path d="M4 13 v6 h5 l7 5 V 8 L 9 13 Z" fill={c} fillOpacity=".15"/><path d="M21 11 a 6 6 0 0 1 0 10"/><path d="M25 7 a 12 12 0 0 1 0 18"/></svg>);
    case "net": return (<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke={c} strokeWidth="1.6"><rect x="3" y="3" width="9" height="9" rx="1" fill={c} fillOpacity=".15"/><rect x="20" y="3" width="9" height="9" rx="1" fill={c} fillOpacity=".15"/><rect x="3" y="20" width="9" height="9" rx="1" fill={c} fillOpacity=".15"/><rect x="20" y="20" width="9" height="9" rx="1" fill={c} fillOpacity=".15"/><path d="M12 7.5 H 20 M 12 24.5 H 20 M 7.5 12 V 20 M 24.5 12 V 20"/></svg>);
    default: return <circle r="6" fill={c}/>;
  }
}

/* ===== Project Services (4 service types) ===== */
function ServicesProject() {
  const items = [
    {
      n:"01", t:"Проектиране",
      d:"Изготвяне на работен проект, технически чертежи и спецификации съгласно действащите норми и стандарти.",
      icon:"plan",
      bullets:["Концептуален проект","Технически чертежи","Спецификация на апаратурата","Съгласувания с РСПБЗН"],
    },
    {
      n:"02", t:"Разработка и монтаж",
      d:"Лицензиран екип за разработка и монтаж — с документиране на всеки етап и 72-часов приемен тест.",
      icon:"build",
      bullets:["Структурно окабеляване","Монтаж на апаратурата","Програмиране","72-часов приемен тест"],
    },
    {
      n:"03", t:"Управление на проекти",
      d:"Назначен инженер-ръководител с единствена точка на отговорност за графика, бюджета и качеството.",
      icon:"pm",
      bullets:["Инженер-ръководител","График и milestone","Бюджетен контрол","Документация и handover"],
    },
    {
      n:"04", t:"Сервизно обслужване",
      d:"Гаранционен и следгаранционен сервиз с абонаментна поддръжка 24/7 и договорно SLA.",
      icon:"srv",
      bullets:["Гаранционен сервиз","Абонаментна поддръжка","SLA реакция","Резервни части на склад"],
    },
  ];
  return (
    <section className="section-pad services-project dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Услуги по проекти · 04 типа</div>
            <h2 className="h2"><window.StreamText text="От концепция до дългосрочна поддръжка."/></h2>
          </div>
          <p className="section-lead">Работим със сертифицирана апаратура и по високи технически стандарти. Всеки проект минава през еднакъв инженерен work-flow.</p>
        </div>
        <div className="srv-proj-grid">
          {items.map(it => (
            <div className="srv-proj-card" key={it.n}>
              <div className="spc-num meta">{it.n}</div>
              <ProjIcon kind={it.icon}/>
              <h3 className="h3">{it.t}</h3>
              <p dangerouslySetInnerHTML={{__html: it.d}}/>
              <ul>
                {it.bullets.map((b,i) => (
                  <li key={i}>
                    <span className="bullet-dot"/>
                    <span dangerouslySetInnerHTML={{__html: b}}/>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjIcon({ kind }) {
  const c = "var(--accent)";
  const stroke = { fill: "none", stroke: c, strokeWidth: 1.6 };
  switch(kind) {
    case "plan": return (<svg viewBox="0 0 40 40" width="36" height="36" {...stroke}><rect x="6" y="6" width="28" height="28" rx="2" fill={c} fillOpacity=".12"/><path d="M10 12 H 30 M 10 17 H 24 M 10 22 H 28 M 10 27 H 18"/><circle cx="33" cy="33" r="4" fill={c}/></svg>);
    case "build": return (<svg viewBox="0 0 40 40" width="36" height="36" {...stroke}><path d="M4 36 L 14 26 L 22 34 L 36 20" fill={c} fillOpacity=".15"/><circle cx="14" cy="26" r="3" fill={c}/><circle cx="22" cy="34" r="3" fill={c}/><path d="M28 12 L 36 4 M 32 4 H 36 V 8"/></svg>);
    case "pm": return (<svg viewBox="0 0 40 40" width="36" height="36" {...stroke}><circle cx="20" cy="14" r="6" fill={c} fillOpacity=".15"/><path d="M6 34 c0 -8 6 -12 14 -12 s14 4 14 12"/><circle cx="32" cy="10" r="3" fill={c}/></svg>);
    case "srv": return (<svg viewBox="0 0 40 40" width="36" height="36" {...stroke}><path d="M20 4 a16 16 0 1 1 -8 30 l4 -7 a8 8 0 0 0 12 -10 z" fill={c} fillOpacity=".15"/><circle cx="20" cy="20" r="4"/></svg>);
    default: return <circle r="4" fill={c}/>;
  }
}

/* ===== Process (re-used theme) ===== */
function ServicesProcess() {
  return (
    <section className="section-pad services-process">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Методология · End-to-end</div>
            <h2 className="h2"><window.StreamText text="Един и същ процес за всеки проект."/></h2>
          </div>
          <p className="section-lead">Не правим компромис на ключови етапи. От консултация до дългосрочна поддръжка — една отговорна точка.</p>
        </div>
        <div className="srv-process-rail">
          {[
            ["01","Консултация","Оглед на обект, нормативни изисквания."],
            ["02","Проектиране","Работен проект, спецификации, съгласувания."],
            ["03","Доставка","Сертифицирана техника, лицензиран екип."],
            ["04","Монтаж","Лицензиран екип, инсталация по график."],
            ["05","Тестване","72-часов приемен тест, протоколи."],
            ["06","Обучение","Инструктаж на операторите."],
            ["07","Поддръжка","Абонаментен сервиз 24/7."],
          ].map(([n,t,d]) => (
            <div className="rail-step" key={n}>
              <div className="rail-num">{n}</div>
              <div className="rail-line"/>
              <div className="rail-body">
                <h4 className="h4">{t}</h4>
                <p dangerouslySetInnerHTML={{__html: d}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== FAQ ===== */
function ServicesFaq() {
  const [open, setOpen] = React.useState(0);
  const faqs = [
    {q:"Каква апаратура използвате?", a:"Работим изключително със сертифицирана техника от световни производители: Esser by Honeywell, INIM Electronics, Panasonic, Securiton, Dahua, Paradox, Soyal, Farfisa и други."},
    {q:"Лицензирани ли сте за пожарни системи?", a:"Да, фирма „НИКОМ“ е лицензирана от ГД ПБЗН – МВР с разрешително № 743/07.07.2017 г. за поддържане и обслужване на противопожарни системи и съоръжения."},
    {q:"Какъв е срокът от запитване до готов проект?", a:"Срокът зависи от типа и обхвата на обекта. След първоначална консултация Ви предоставяме график за всички етапи — обикновено между 2 и 12 седмици за средно-голям обект."},
    {q:"Предлагате ли поддръжка след монтаж?", a:"Да. Всички наши клиенти получават гаранционен сервиз, а след това — абонаментна техническа поддръжка по договорено SLA. Профилактика, резервни части и 24/7 техническа линия."},
    {q:"Може ли да интегрирате с вече съществуващи системи?", a:"Да. Имаме опит в развитие и разширяване на съществуващи системи — особено когато са на сертифицирана платформа. Започваме с оглед и техническа оценка на текущата инсталация."},
    {q:"Работите ли с държавни и дипломатически обекти?", a:"Да. Имаме опит с посолства, държавни институции и обекти с високо ниво на сигурност. Поверителността и дискретността са стандарт за нас."},
  ];

  return (
    <section className="section-pad services-faq">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">FAQ · Често задавани въпроси</div>
            <h2 className="h2"><window.StreamText text="Отговори преди да говорите с инженер."/></h2>
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((f,i)=>(
            <div className={"faq-item " + (open===i ? "open" : "")} key={i} onClick={() => setOpen(open===i ? -1 : i)}>
              <div className="faq-q">
                <span className="faq-num meta">{String(i+1).padStart(2,"0")}</span>
                <span className="faq-q-text">{f.q}</span>
                <span className="faq-plus" aria-hidden="true">
                  <span/><span/>
                </span>
              </div>
              <div className="faq-a" dangerouslySetInnerHTML={{__html: f.a}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA — reuse pattern ===== */
function ServicesCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Имате проект?</div>
            <h2 className="h2"><window.StreamText text="Обсъдете го с инженер от екипа."/></h2>
            <p>Получавате обратна връзка от инженер до 4 работни часа. Поверителността е стандарт.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Заявете консултация <IcS.Arrow /></a>
            <a className="btn btn-ghost btn-lg" href="Проекти.html">Вижте проекти</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ServicesHero, ServicesCatalog, ServicesArchitecture, ServicesProject, ServicesProcess, ServicesFaq, ServicesCta });

/* ===== System Architecture Map — 12 systems orbiting PSIM ===== */
function ServicesArchitecture() {
  const [hover, setHover] = React.useState(null);
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 12), 1300);
    return () => clearInterval(id);
  }, []);

  // 12 nodes around a circle
  const cx = 400, cy = 320, r1 = 240, r2 = 165;
  const nodes = [
    {k:"FIRE",   l:"Пожароизв.",      r:r1},
    {k:"F-EXT",  l:"Пожарогасене",    r:r2},
    {k:"CCTV",   l:"Видеонаблюдение", r:r1},
    {k:"PANIC",  l:"Паник системи",   r:r2},
    {k:"INT",    l:"Охрана",          r:r1},
    {k:"PARK",   l:"Паркинг",         r:r2},
    {k:"ACS",    l:"Контрол достъп",  r:r1},
    {k:"IT",     l:"Домофон",         r:r2},
    {k:"COMM",   l:"Комуникация",     r:r1},
    {k:"PA",     l:"Оповестяване",    r:r2},
    {k:"SKS",    l:"Окабеляване",     r:r1},
    {k:"BMS",    l:"BMS / Сграда",    r:r2},
  ];

  const positioned = nodes.map((n, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { ...n, x: cx + n.r * Math.cos(angle), y: cy + n.r * Math.sin(angle) };
  });

  return (
    <section className="section-pad services-arch dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Архитектура · Интеграция</div>
            <h2 className="h2"><window.StreamText text="Дванадесет системи. Една централна интеграция."/></h2>
          </div>
          <p className="section-lead">PSIM платформата свързва всички подсистеми в единна среда — със сценарии за автоматична реакция, корелация на събития и централно наблюдение.</p>
        </div>

        <div className="arch-map-wrap">
          <div className="arch-scan" />
          <svg viewBox="0 0 800 640" className="arch-map-svg">
            <defs>
              <radialGradient id="archCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity=".55"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
              </radialGradient>
            </defs>

            {/* grid */}
            {Array.from({length:21}).map((_,i)=>(
              <line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="640" stroke="rgba(255,255,255,.04)"/>
            ))}
            {Array.from({length:17}).map((_,i)=>(
              <line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="800" stroke="rgba(255,255,255,.04)"/>
            ))}

            {/* outer orbit */}
            <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(247,215,36,.10)" strokeDasharray="2 6"/>
            <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(247,215,36,.06)" strokeDasharray="2 5"/>

            {/* signal paths */}
            {positioned.map((n, i) => {
              const active = pulse === i || hover === i;
              return (
                <line
                  key={"p"+i}
                  x1={n.x} y1={n.y} x2={cx} y2={cy}
                  stroke={active ? "var(--accent)" : "rgba(247,215,36,.18)"}
                  strokeWidth={active ? 1.6 : 0.8}
                  strokeDasharray="3 5"
                  opacity={active ? 1 : .55}
                >
                  {active && <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1s" repeatCount="indefinite"/>}
                </line>
              );
            })}

            {/* streaming dots from outer ring (always running) */}
            {positioned.map((n, i) => (
              <circle key={"dot"+i} r="3" fill="var(--accent)" opacity={pulse === i ? .9 : 0}>
                <animateMotion
                  dur="1.3s"
                  repeatCount="indefinite"
                  path={`M ${n.x} ${n.y} L ${cx} ${cy}`}
                />
              </circle>
            ))}

            {/* glow halo */}
            <circle cx={cx} cy={cy} r="140" fill="url(#archCoreGlow)"/>

            {/* PSIM core */}
            <g transform={`translate(${cx} ${cy})`}>
              <circle r="100" fill="none" stroke="rgba(247,215,36,.2)" strokeDasharray="3 6">
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="50s" repeatCount="indefinite"/>
              </circle>
              <circle r="120" fill="none" stroke="rgba(247,215,36,.1)" strokeDasharray="2 8">
                <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="75s" repeatCount="indefinite"/>
              </circle>
              <rect x="-78" y="-50" width="156" height="100" rx="12" fill="var(--accent)"/>
              <text x="0" y="-12" textAnchor="middle" fontFamily="Geologica" fontSize="20" fontWeight="600" fill="var(--accent-ink)">PSIM</text>
              <text x="0" y="8" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent-ink)" opacity=".7">Unified Security</text>
              <text x="0" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent-ink)" opacity=".7">Intelligence Platform</text>
              <circle r="3" cy="38" fill="var(--accent-ink)">
                <animate attributeName="opacity" values="1;.3;1" dur="1.2s" repeatCount="indefinite"/>
              </circle>
            </g>

            {/* nodes */}
            {positioned.map((n, i) => {
              const active = pulse === i || hover === i;
              const isInner = n.r === r2;
              return (
                <g key={"n"+i} transform={`translate(${n.x} ${n.y})`}
                   onMouseEnter={() => setHover(i)}
                   onMouseLeave={() => setHover(null)}
                   style={{cursor: "pointer"}}>
                  {active && (
                    <circle r="32" fill="var(--accent)" opacity=".18">
                      <animate attributeName="r" values="22;38;22" dur="1.4s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values=".3;0;.3" dur="1.4s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <rect x="-50" y="-22" width="100" height="44" rx="8"
                        fill={active ? "var(--accent)" : "var(--ink-800)"}
                        stroke={active ? "var(--accent)" : "rgba(255,255,255,.18)"}/>
                  <text x="0" y="-3" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fontWeight="600"
                        fill={active ? "var(--accent-ink)" : "var(--accent)"}>{n.k}</text>
                  <text x="0" y="12" textAnchor="middle" fontFamily="Geologica" fontSize="9"
                        fill={active ? "var(--accent-ink)" : "rgba(255,255,255,.65)"}>{n.l}</text>
                </g>
              );
            })}
          </svg>

          {/* legend */}
          <div className="arch-legend">
            <div className="arch-leg-item">
              <span className="arch-leg-dot accent" />
              <span>PSIM ядро</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-dot outer" />
              <span>Външен периметър — 6 системи</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-dot inner" />
              <span>Вътрешен слой — 6 системи</span>
            </div>
            <div className="arch-leg-item">
              <span className="arch-leg-line" />
              <span>Сигнална връзка</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
