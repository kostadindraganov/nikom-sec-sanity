/* About / За нас — page-specific components — content from nikom-security.com/about */

const Ic2 = window.NIKOMIcon;

/* ===== Hero with video placeholder ===== */
function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero-img-wrap">
        <img src="assets/about-hero.jpg" alt="За НИКОМ" className="about-hero-img"/>
        <div className="about-hero-gradient" />
      </div>
      <div className="container about-hero-inner">
        <div className="about-hero-copy">
          <div className="eyebrow">За нас · Инженерна компания от 2005</div>
          <h1 className="h1 about-h1">
            <window.StreamText text="Над 20 години инженеринг в системите за сигурност, контрол и пожарна безопасност."/>
          </h1>
          <p className="about-lead">
            „НИКОМ Системи за Сигурност“ ЕООД е инженерингова компания, създадена през 2005 г. от инженери с отлична професионална квалификация и дългогодишен опит в предоставянето на цялостни решения в сигурността. Свидетели сме на бързите промени в продуктите и услугите — и развълнувани от възможностите, които те дават на нашите клиенти.
          </p>
          <div className="about-stats">
            <div><div className="trust-n"><window.Counter to={20}/><span>+</span></div><div className="trust-l">години опит</div></div>
            <div><div className="trust-n">2005</div><div className="trust-l">година на основаване</div></div>
            <div><div className="trust-n">12</div><div className="trust-l">категории системи</div></div>
            <div><div className="trust-n">№ 743</div><div className="trust-l">лиценз ГД ПБЗН-МВР</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Mission / Manifesto ===== */
function AboutManifest() {
  const lines = [
    {n:"01", t:"Инженерингов подход", d:"Компания, създадена от инженери с отлична професионална квалификация. Всеки проект минава през квалифициран технически екип."},
    {n:"02", t:"Сертифицирана техника", d:"Работим изключително със сертифицирана, висококачествена техника на световни производители — без компромиси."},
    {n:"03", t:"Цялостни решения", d:"Проектиране, доставка, монтаж и поддръжка. От дома и офиса до големи промишлени, търговски и институционални обекти."},
    {n:"04", t:"Дългосрочно партньорство", d:"Работим в синергия, за да доставим резултати и да изградим дългосрочно партньорство с клиенти и партньори."},
  ];
  return (
    <section className="section-pad about-manifest">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Принципи · 04 стълба</div>
            <h2 className="h2"><window.StreamText text="Високи стандарти, сертификати и навременно изпълнение."/></h2>
          </div>
          <p className="section-lead">Нашата цел е да поставим висок стандарт в сферата на системите за сигурност и наблюдение, по критерии по-високи от очакванията.</p>
        </div>
        <div className="manifest-grid">
          {lines.map((l,i)=>(
            <div className="manifest-card" key={l.n}>
              <div className="m-num">{l.n}</div>
              <h3 className="h3">{l.t}</h3>
              <p dangerouslySetInnerHTML={{__html: l.d}}/>
              <span className="m-tick" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Engagement / End-to-end engineering process ===== */
function AboutEngagement() {
  const steps = [
    {n:"01", t:"Техническа консултация", d:"От квалифициран екип, на база на конкретните Ви нужди."},
    {n:"02", t:"Проектна документация", d:"Изготвяне на технически чертежи и спецификации."},
    {n:"03", t:"Структурно окабеляване", d:"Изграждане на кабелна инфраструктура — основата на всяка система."},
    {n:"04", t:"Доставка и монтаж", d:"Техника от сертифицирани производители, лицензиран екип."},
    {n:"05", t:"Програмиране", d:"Оживяване на системата и конфигуриране за конкретния обект."},
    {n:"06", t:"24-часов тест", d:"Изпитание на системите в реални условия преди приемане."},
    {n:"07", t:"Обучение на персонала", d:"Инструктаж за работа със системата на български."},
    {n:"08", t:"Гаранционен сервиз", d:"Поддръжка по време на гаранционния период."},
    {n:"09", t:"Абонаментна поддръжка", d:"Следгаранционна техническа поддръжка на изградените системи."},
  ];
  return (
    <section className="section-pad about-engagement dark-band">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Инженеринг · 09 ангажимента</div>
            <h2 className="h2"><window.StreamText text="Ангажираме се на всеки етап от работния процес."/></h2>
          </div>
          <p className="section-lead">Техническата осигуреност на компанията и екипът от квалифицирани инженери, проектанти и техници са в състояние да посрещнат изискванията на всеки клиент.</p>
        </div>
        <div className="eng-grid">
          {steps.map((s,i)=>(
            <div className="eng-card" key={s.n}>
              <div className="eng-num">{s.n}</div>
              <h3 className="h4">{s.t}</h3>
              <p dangerouslySetInnerHTML={{__html: s.d}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Sectors / Где работим ===== */
function AboutSectors() {
  const sectors = [
    {n:"01", t:"Административни и офис сгради"},
    {n:"02", t:"Търговски центрове и комплекси"},
    {n:"03", t:"Болнични и лечебни центрове"},
    {n:"04", t:"Банкови и финансови институции"},
    {n:"05", t:"Училища и детски градини"},
    {n:"06", t:"Производствени бази и складове"},
    {n:"07", t:"Държавни обекти с високо ниво на сигурност"},
  ];
  return (
    <section className="section-pad about-sectors">
      <div className="container">
        <div className="sectors-grid">
          <div>
            <div className="eyebrow">Сектори · 07 индустрии</div>
            <h2 className="h2"><window.StreamText text="Решения за дома, офиса и големите институционални обекти."/></h2>
            <p className="sectors-lead">
              Покриваме целия спектър — от дома и офиса до големи промишлени, търговски и институционални обекти. За всеки сектор имаме адаптирано техническо решение.
            </p>
          </div>
          <div className="sectors-list">
            {sectors.map((s,i)=>(
              <div className="sector-row" key={s.n}>
                <span className="meta">{s.n}</span>
                <span className="sector-name" dangerouslySetInnerHTML={{__html: s.t}} />
                <span className="sector-dash" />
                <Ic2.Arrow />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Manufacturers ===== */
function AboutManufacturers() {
  const brands = [
    {n:"Esser", sub:"by Honeywell"},
    {n:"INIM", sub:"Electronics"},
    {n:"Panasonic"},
    {n:"Securiton"},
    {n:"Dahua"},
    {n:"Paradox"},
    {n:"Soyal"},
    {n:"Farfisa"},
  ];
  return (
    <section className="section-pad about-brands">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Партньори · 08 световни производители</div>
            <h2 className="h2"><window.StreamText text="Доказано качество, многообразие и възможности за интеграция."/></h2>
          </div>
          <p className="section-lead">В портфолиото си избираме да присъстват продукти с доказано качество, многообразие в техническите спецификации, възможности за интеграция и икономическа ефективност.</p>
        </div>
        <div className="brand-strip" style={{borderRadius: "var(--radius-md)"}}>
          {brands.map((b,i)=>(
            <div className="brand-cell" key={i}>
              <div className="brand-logo">{b.n}</div>
              {b.sub && <div className="brand-sub">{b.sub}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Certifications / License ===== */
function AboutCerts() {
  return (
    <section className="section-pad about-certs">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Лиценз · Сертификати</div>
            <h2 className="h2"><window.StreamText text="Лицензирани от ГД ПБЗН – МВР."/></h2>
          </div>
        </div>
        <div className="license-band">
          <div className="lic-left">
            <Ic2.Shield />
            <div>
              <div className="lic-no">Разрешително № 743/07.07.2017 г.</div>
              <div className="lic-issuer">Главна Дирекция „Пожарна безопасност и защита на населението“ — МВР</div>
            </div>
          </div>
          <div className="lic-right">
            <div className="lic-scope">Поддържане и обслужване на противопожарни системи и съоръжения:</div>
            <ul className="lic-list">
              <li><Ic2.Check /> Пожароизвестителни системи</li>
              <li><Ic2.Check /> Пожарогасителни системи</li>
              <li><Ic2.Check /> Системи за управление на дим и топлина</li>
              <li><Ic2.Check /> Пожарни кранове</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CTA band ===== */
function AboutCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Готови сме за разговор</div>
            <h2 className="h2"><window.StreamText text="Свържете се с нас за консултация по нов или съществуващ проект."/></h2>
            <p>Получавате обратна връзка от инженер до 4 работни часа.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Заявете консултация <Ic2.Arrow /></a>
            <a className="btn btn-ghost btn-lg" href="Проекти.html">Вижте проекти</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutHero, AboutManifest, AboutEngagement, AboutSectors, AboutManufacturers, AboutCerts, AboutCta });
