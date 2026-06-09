/* Contact page — info, custom Sofia map + office blueprint, form */

const IcC = window.NIKOMIcon;

/* Smartphone + chat bubbles — engineered yellow style */
function RingingPhone() {
  const [bubble, setBubble] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setBubble(b => (b + 1) % 7), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <svg viewBox="0 0 360 420" className="ring-phone-svg">
      <defs>
        <radialGradient id="phGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".5"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="phBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262C36"/>
          <stop offset="1" stopColor="#0E1116"/>
        </linearGradient>
        <linearGradient id="phScreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1018"/>
          <stop offset="1" stopColor="#13191F"/>
        </linearGradient>
      </defs>

      {/* faint backdrop grid */}
      <g stroke="color-mix(in oklab, var(--accent) 12%, transparent)" strokeWidth=".5" opacity=".6">
        {Array.from({length:10}).map((_,i)=>(<line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="420"/>))}
        {Array.from({length:11}).map((_,i)=>(<line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="360"/>))}
      </g>

      {/* glow halo behind phone */}
      <circle cx="180" cy="220" r="140" fill="url(#phGlow)">
        <animate attributeName="r" values="120;160;120" dur="2.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".55;.15;.55" dur="2.6s" repeatCount="indefinite"/>
      </circle>

      {/* scan rings around phone */}
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity=".55">
        <ellipse cx="180" cy="220" rx="80" ry="120">
          <animate attributeName="rx" values="70;110;70" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="110;150;110" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".55;0;.55" dur="2.4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="180" cy="220" rx="80" ry="120">
          <animate attributeName="rx" values="70;110;70" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
          <animate attributeName="ry" values="110;150;110" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".55;0;.55" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      {/* ===== Smartphone body ===== */}
      <g transform="translate(112 92)">
        {/* slight float */}
        <animateTransform attributeName="transform" type="translate"
          values="112,92; 112,86; 112,92"
          dur="4s" repeatCount="indefinite"/>

        {/* shadow */}
        <ellipse cx="68" cy="260" rx="80" ry="8" fill="#000" opacity=".5"/>

        {/* body */}
        <rect x="0" y="0" width="136" height="256" rx="22" fill="url(#phBody)"
          stroke="rgba(247,215,36,.35)" strokeWidth="1.4"/>
        {/* inner bezel */}
        <rect x="6" y="6" width="124" height="244" rx="18" fill="url(#phScreen)"/>

        {/* notch / Dynamic Island */}
        <rect x="48" y="12" width="40" height="10" rx="5" fill="#000"/>

        {/* Status bar */}
        <text x="18" y="32" fontFamily="JetBrains Mono" fontSize="7.5" fill="rgba(255,255,255,.7)" fontWeight="600">9:41</text>
        <g transform="translate(106 26)">
          <rect x="0" y="0" width="14" height="6" rx="1.2" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth=".8"/>
          <rect x="1" y="1" width="10" height="4" rx=".6" fill="rgba(255,255,255,.7)"/>
        </g>

        {/* NIKOM app header */}
        <g transform="translate(14 44)">
          <rect x="0" y="0" width="108" height="22" rx="6" fill="var(--accent)" opacity=".15"/>
          <circle cx="11" cy="11" r="6" fill="var(--accent)"/>
          <text x="11" y="14" textAnchor="middle" fontFamily="Geologica" fontSize="7" fontWeight="700" fill="var(--accent-ink)">N</text>
          <text x="22" y="10" fontFamily="Geologica" fontSize="7.5" fontWeight="600" fill="#F5F2EB">NIKOM Security</text>
          <text x="22" y="18" fontFamily="JetBrains Mono" fontSize="5.5" fill="var(--accent)">● Online · отговаря веднага</text>
        </g>

        {/* Chat messages on screen */}
        <g transform="translate(14 74)">
          {/* 1 · User message (right, dark) — 2 lines */}
          <g className="ph-msg" style={{opacity: bubble >= 0 ? 1 : 0}}>
            <rect x="18" y="0" width="90" height="24" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.06)"/>
            <text x="63" y="10" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">Здравейте! Искам</text>
            <text x="63" y="19" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">видеонаблюдение.</text>
          </g>

          {/* typing before NIKOM reply 1 */}
          <g transform="translate(0 30)" style={{opacity: bubble === 1 ? 1 : 0}}>
            <rect x="0" y="0" width="34" height="14" rx="6" fill="var(--accent)" opacity=".85"/>
            <circle cx="10" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" repeatCount="indefinite"/></circle>
            <circle cx="17" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.3s" repeatCount="indefinite"/></circle>
            <circle cx="24" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.6s" repeatCount="indefinite"/></circle>
          </g>

          {/* 2 · NIKOM reply (left, yellow) */}
          <g transform="translate(0 30)" style={{opacity: bubble >= 2 ? 1 : 0}}>
            <rect x="0" y="0" width="62" height="14" rx="6" fill="var(--accent)"/>
            <text x="31" y="9.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="var(--accent-ink)" fontWeight="600">Няма проблем.</text>
          </g>

          {/* 3 · User reply (right, dark) */}
          <g style={{opacity: bubble >= 3 ? 1 : 0}}>
            <rect x="44" y="50" width="64" height="14" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.06)"/>
            <text x="76" y="59.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="#F5F2EB">И сигурност?</text>
          </g>

          {/* typing before NIKOM reply 2 */}
          <g transform="translate(0 70)" style={{opacity: bubble === 4 ? 1 : 0}}>
            <rect x="0" y="0" width="34" height="14" rx="6" fill="var(--accent)" opacity=".85"/>
            <circle cx="10" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" repeatCount="indefinite"/></circle>
            <circle cx="17" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.3s" repeatCount="indefinite"/></circle>
            <circle cx="24" cy="7" r="1.5" fill="var(--accent-ink)"><animate attributeName="opacity" values=".3;1;.3" dur=".9s" begin="-.6s" repeatCount="indefinite"/></circle>
          </g>

          {/* 4 · NIKOM final reply (left, yellow) */}
          <g transform="translate(0 70)" style={{opacity: bubble >= 5 ? 1 : 0}}>
            <rect x="0" y="0" width="92" height="14" rx="6" fill="var(--accent)"/>
            <text x="46" y="9.5" textAnchor="middle" fontFamily="Geologica" fontSize="5.5" fill="var(--accent-ink)" fontWeight="600">Идваме веднага ✓</text>
          </g>
        </g>

        {/* Input bar at bottom */}
        <g transform="translate(14 222)">
          <rect x="0" y="0" width="108" height="16" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.08)"/>
          <text x="8" y="10.5" fontFamily="Geologica" fontSize="6" fill="rgba(255,255,255,.4)">Напишете съобщение…</text>
          <circle cx="100" cy="8" r="5" fill="var(--accent)"/>
          <path d="M 98 6 L 102 8 L 98 10 Z" fill="var(--accent-ink)"/>
        </g>

        {/* Home indicator */}
        <rect x="48" y="244" width="40" height="3" rx="1.5" fill="rgba(255,255,255,.4)"/>

        {/* Side buttons */}
        <rect x="-2" y="60" width="2" height="18" rx="1" fill="#1A1F28"/>
        <rect x="-2" y="86" width="2" height="32" rx="1" fill="#1A1F28"/>
        <rect x="136" y="74" width="2" height="40" rx="1" fill="#1A1F28"/>
      </g>

      {/* Floating chat bubbles around phone */}
      <g>
        {/* Top left bubble */}
        <g transform="translate(36 90)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="36,90; 36,80; 36,90" dur="3.2s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--accent)"
            stroke="rgba(26,19,0,.2)" strokeWidth="1"/>
          <circle cx="-2" cy="22" r="5" fill="var(--accent)"/>
          <text x="36" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="var(--accent-ink)">Здравейте!</text>
        </g>

        {/* Top right bubble */}
        <g transform="translate(228 58)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="228,58; 228,50; 228,58" dur="3.6s" begin="-1.2s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="108" height="28" rx="14" fill="#1A1F28"
            stroke="rgba(247,215,36,.55)" strokeWidth="1"/>
          <circle cx="110" cy="22" r="5" fill="#1A1F28" stroke="rgba(247,215,36,.55)" strokeWidth="1"/>
          <text x="54" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="#F5F2EB">Видеонаблюдение</text>
        </g>

        {/* Bottom right bubble */}
        <g transform="translate(258 290)" style={{opacity: 0.95}}>
          <animateTransform attributeName="transform" type="translate"
            values="258,290; 258,282; 258,290" dur="3.8s" begin="-0.5s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="72" height="28" rx="14" fill="var(--accent)"
            stroke="rgba(26,19,0,.2)" strokeWidth="1"/>
          <circle cx="74" cy="22" r="5" fill="var(--accent)"/>
          <text x="36" y="18" textAnchor="middle" fontFamily="Geologica" fontSize="10" fontWeight="600" fill="var(--accent-ink)">Сигурност</text>
        </g>

        {/* Bottom left tiny bubble */}
        <g transform="translate(28 280)" style={{opacity: 0.85}}>
          <animateTransform attributeName="transform" type="translate"
            values="28,280; 28,272; 28,280" dur="4.2s" begin="-1.8s" repeatCount="indefinite"/>
          <rect x="0" y="0" width="48" height="22" rx="11" fill="#1A1F28"
            stroke="rgba(247,215,36,.5)" strokeWidth="1"/>
          <circle cx="6" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" repeatCount="indefinite"/>
          </circle>
          <circle cx="13" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" begin="-.27s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="9" r="1.5" fill="var(--accent)">
            <animate attributeName="opacity" values=".3;1;.3" dur=".8s" begin="-.54s" repeatCount="indefinite"/>
          </circle>
        </g>
      </g>

      {/* Corner brackets */}
      <g stroke="color-mix(in oklab, var(--accent) 65%, transparent)" strokeWidth="1.5" fill="none">
        <path d="M14 30 L14 14 L30 14"/>
        <path d="M330 14 L346 14 L346 30"/>
        <path d="M346 390 L346 406 L330 406"/>
        <path d="M30 406 L14 406 L14 390"/>
      </g>

      {/* Meta */}
      <text x="180" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" letterSpacing="0.14em">● LIVE CHAT · NIKOM-API-01</text>
      <text x="180" y="416" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(247,215,36,.6)" letterSpacing="0.12em">RESPONSE TIME · &lt; 4H</text>
    </svg>
  );
}

/* ===== Hero ===== */
function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>
      <div className="container">
        <div className="ctc-hero-inner">
          <div className="ctc-hero-text">
            <div className="eyebrow">Контакт · Инженер на линия</div>
            <h1 className="h1 ctc-h1">
              <window.StreamText text="Свържете се с нас за нов или съществуващ проект."/>
            </h1>
            <p className="ctc-hero-lead">
              Дискретността и конфиденциалността са гарантирани. Ще споделим нашия опит накратко или в обширна консултация — както Ви е удобно.
            </p>
          </div>
          <div className="ctc-hero-phone" aria-hidden="true">
            <RingingPhone/>
          </div>
        </div>
        <div className="ctc-quick">
          <a href="tel:+359894523970" className="ctc-quick-btn">
            <div className="ctc-quick-icon"><IcC.Phone/></div>
            <div>
              <div className="meta">Телефон</div>
              <div className="ctc-quick-v">+359 89 45 23 970</div>
            </div>
          </a>
          <a href="mailto:office@nikom-security.com" className="ctc-quick-btn">
            <div className="ctc-quick-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 7l10 7L22 7"/>
              </svg>
            </div>
            <div>
              <div className="meta">Имейл</div>
              <div className="ctc-quick-v">office@nikom-security.com</div>
            </div>
          </a>
          <div className="ctc-quick-btn">
            <div className="ctc-quick-icon"><span className="status-dot"/></div>
            <div>
              <div className="meta">Статус</div>
              <OfficeStatus/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OfficeStatus() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const day = now.getDay(); // 0=Sun, 6=Sat
  const hour = now.getHours();
  const isWeekday = day >= 1 && day <= 5;
  const isOpen = isWeekday && hour >= 9 && hour < 18;
  return (
    <div className={"ctc-quick-v " + (isOpen ? "ctc-status-open" : "ctc-status-closed")}>
      {isOpen ? "Офисът е отворен" : "Сервиз 24/7"}
    </div>
  );
}

/* ===== Info Block ===== */
function ContactInfo() {
  return (
    <section className="section-pad ctc-info">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Координати · 04 канала за връзка</div>
            <h2 className="h2"><window.StreamText text="Как можем да Ви бъдем полезни."/></h2>
          </div>
          <p className="section-lead">
            Ако желаете да направим среща или консултация, изпратете запитване чрез формата по-долу или ни звъннете директно.
          </p>
        </div>
        <div className="ctc-info-grid">
          <div className="ctc-info-card">
            <div className="ctc-info-num meta">01</div>
            <h3 className="h4">Адрес офис и склад</h3>
            <p>жк. Младост 4, блок 477, вх. 1, офис 1<br/>София, 1715<br/>България</p>
            <a className="ctc-info-link" href="#map">Виж на картата <IcC.Arrow/></a>
          </div>
          <div className="ctc-info-card">
            <div className="ctc-info-num meta">02</div>
            <h3 className="h4">Работно време</h3>
            <p>Пн – Пт &nbsp;·&nbsp; 09:00 — 18:00<br/>Сб &amp; Нд — неработни<br/>Сервиз — <strong>24 / 7 / 365</strong></p>
            <span className="ctc-info-link">Активен статус ⓘ</span>
          </div>
          <div className="ctc-info-card">
            <div className="ctc-info-num meta">03</div>
            <h3 className="h4">Данни на фирмата</h3>
            <p>„Ником Системи за Сигурност“ ЕООД<br/>ЕИК <strong>131294795</strong><br/>Лиценз ГД ПБЗН-МВР № 743/07.07.2017 г.</p>
            <span className="ctc-info-link">Документи на запитване ⓘ</span>
          </div>
          <div className="ctc-info-card">
            <div className="ctc-info-num meta">04</div>
            <h3 className="h4">Време за реакция</h3>
            <div className="ctc-reaction">
              <div className="ctc-reaction-row">
                <span className="meta">Запитване</span>
                <span className="ctc-reaction-v">~ <window.Counter to={3}/>ч <window.Counter to={12}/>мин</span>
              </div>
              <div className="ctc-reaction-row">
                <span className="meta">Спешен сервиз</span>
                <span className="ctc-reaction-v">&lt; <window.Counter to={30}/> мин</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Maps — Sofia city + Office blueprint ===== */
function ContactMaps() {
  const [view, setView] = React.useState("city");
  return (
    <section className="section-pad ctc-maps dark-band" id="map">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Локация · OBJ-NIKOM-HQ</div>
            <h2 className="h2"><window.StreamText text="Намерете ни."/></h2>
          </div>
          <div className="ctc-map-toggle">
            <button className={view==="city"?"active":""} onClick={() => setView("city")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 21V7l9-4 9 4v14"/><path d="M9 21V11h6v10"/></svg>
              <span>Карта на града</span>
            </button>
            <button className={view==="blueprint"?"active":""} onClick={() => setView("blueprint")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 9v12M15 9v12"/></svg>
              <span>План на офиса</span>
            </button>
            <button className={view==="gmaps"?"active":""} onClick={() => setView("gmaps")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <span>Google Maps</span>
            </button>
          </div>
        </div>

        <div className="ctc-map-wrap">
          <div className="arch-scan" />
          {view === "city" && <CityMap/>}
          {view === "blueprint" && <BlueprintMap/>}
          {view === "gmaps" && <GoogleMapView/>}
          <div className="ctc-map-side">
            <div className="ctc-map-meta">
              <div className="meta">КООРДИНАТИ</div>
              <div className="ctc-coord">42.6502° N</div>
              <div className="ctc-coord">23.3796° E</div>
              <div className="meta" style={{marginTop:16}}>СЕКТОР</div>
              <div className="ctc-coord">Sofia · Mladost 4</div>
              <div className="meta" style={{marginTop:16}}>СТАТУС</div>
              <div className="ctc-coord ctc-status-live"><span className="status-dot"/> ACTIVE · TX</div>
              <div className="meta" style={{marginTop:16}}>ОБЕКТ-ID</div>
              <div className="ctc-coord">NIKOM-HQ-001</div>
            </div>
            <div className="ctc-map-directions">
              <div className="meta">Указания за път</div>
              <a className="ctc-dir-btn" href="https://www.google.com/maps/search/?api=1&query=NIKOM%20%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%A1%D0%B8%D0%B3%D1%83%D1%80%D0%BD%D0%BE%D1%81%D1%82%2C%20%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                Google Maps
                <IcC.Arrow/>
              </a>
              <a className="ctc-dir-btn" href="https://www.waze.com/ul?ll=42.6502%2C23.3796&navigate=yes" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22L3 12l9-10 9 10z"/></svg>
                Waze
                <IcC.Arrow/>
              </a>
              <a className="ctc-dir-btn" href="https://maps.apple.com/?ll=42.6502,23.3796&q=NIKOM%20Security" target="_blank" rel="noopener">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="10" r="3"/><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/></svg>
                Apple Maps
                <IcC.Arrow/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Google Maps embed (no API key needed for embed URL) */
function GoogleMapView() {
  return (
    <div className="ctc-gmap-wrap">
      <div className="ctc-gmap-frame">
        <iframe
          src="https://www.google.com/maps?q=%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&output=embed&hl=bg&z=16"
          width="100%" height="100%"
          style={{border:0}}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps — NIKOM Security"
        />
        <div className="ctc-gmap-overlay" aria-hidden="true">
          <div className="ctc-gmap-corner tl"/><div className="ctc-gmap-corner tr"/>
          <div className="ctc-gmap-corner bl"/><div className="ctc-gmap-corner br"/>
        </div>
        <div className="ctc-gmap-badge">
          <span className="status-dot"/>
          <span className="meta">LIVE · Google Maps</span>
        </div>
        <div className="ctc-gmap-pin-info">
          <div className="meta">OBJ-NIKOM-HQ</div>
          <div className="ctc-gmap-pin-name">Ником Системи за Сигурност</div>
          <div className="ctc-gmap-pin-addr">жк. Младост 4, блок 477, офис 1</div>
        </div>
        <a className="ctc-gmap-open" href="https://www.google.com/maps/search/?api=1&query=NIKOM%20%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%A1%D0%B8%D0%B3%D1%83%D1%80%D0%BD%D0%BE%D1%81%D1%82%2C%20%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F" target="_blank" rel="noopener">
          Отвори в Google Maps
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17 17 7M9 7h8v8"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* Custom SVG city map of Sofia / Mladost */
function CityMap() {
  return (
    <svg viewBox="0 0 800 520" className="ctc-map-svg">
      <defs>
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".6"/>
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* grid */}
      {Array.from({length:21}).map((_,i)=>(
        <line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="520" stroke="rgba(255,255,255,.04)"/>
      ))}
      {Array.from({length:14}).map((_,i)=>(
        <line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="800" stroke="rgba(255,255,255,.04)"/>
      ))}

      {/* River — Perlovska */}
      <path d="M0 380 C 150 360, 280 420, 420 380 S 700 340, 800 360" fill="none"
            stroke="rgba(100,140,200,.25)" strokeWidth="6"/>
      <path d="M0 380 C 150 360, 280 420, 420 380 S 700 340, 800 360" fill="none"
            stroke="rgba(140,180,230,.18)" strokeWidth="1" strokeDasharray="3 4"/>

      {/* Main roads */}
      <g stroke="rgba(255,255,255,.18)" strokeWidth="1.4" fill="none">
        {/* Tsarigradsko Shose — main highway */}
        <line x1="50" y1="280" x2="780" y2="240"/>
        {/* Ring road */}
        <path d="M50 100 C 180 80, 320 120, 480 150 S 700 200, 780 180"/>
        {/* Mladost connections */}
        <line x1="420" y1="240" x2="540" y2="180"/>
        <line x1="540" y1="180" x2="600" y2="100"/>
        <line x1="480" y1="320" x2="540" y2="180"/>
      </g>

      {/* Mladost 1, 2, 3, 4 quadrants */}
      <g fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.1)" strokeWidth="1">
        <rect x="380" y="80" width="120" height="100" rx="2"/>
        <rect x="500" y="80" width="120" height="100" rx="2"/>
        <rect x="380" y="180" width="120" height="100" rx="2"/>
        <rect x="500" y="180" width="120" height="100" rx="2"/>
      </g>
      <text x="440" y="125" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 1</text>
      <text x="560" y="125" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 2</text>
      <text x="440" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.35)">MLADOST 3</text>
      <text x="560" y="225" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" fontWeight="600">MLADOST 4 ★</text>

      {/* Smaller streets in Mladost 4 */}
      <g stroke="rgba(255,255,255,.15)" strokeWidth=".8" strokeDasharray="2 3">
        <line x1="500" y1="200" x2="620" y2="200"/>
        <line x1="500" y1="220" x2="620" y2="220"/>
        <line x1="500" y1="240" x2="620" y2="240"/>
        <line x1="520" y1="180" x2="520" y2="280"/>
        <line x1="540" y1="180" x2="540" y2="280"/>
        <line x1="560" y1="180" x2="560" y2="280"/>
        <line x1="580" y1="180" x2="580" y2="280"/>
        <line x1="600" y1="180" x2="600" y2="280"/>
      </g>

      {/* Landmarks */}
      <g fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.55)">
        <circle cx="180" cy="200" r="3" fill="#8AB4FF" opacity=".8"/>
        <text x="190" y="204">NDK</text>

        <circle cx="700" cy="120" r="3" fill="#9DE2C6" opacity=".8"/>
        <text x="710" y="124">BIZ.PARK</text>

        <circle cx="420" cy="160" r="3" fill="#9DE2C6" opacity=".8"/>
        <text x="430" y="164">M-METRO</text>

        <circle cx="100" cy="100" r="3" fill="#EB9856" opacity=".8"/>
        <text x="110" y="104">CENTER</text>
      </g>

      {/* Connection lines from HQ to landmarks */}
      <g stroke="rgba(247,215,36,.18)" strokeWidth=".8" strokeDasharray="2 4" fill="none">
        <line x1="560" y1="230" x2="700" y2="120"/>
        <line x1="560" y1="230" x2="420" y2="160"/>
        <line x1="560" y1="230" x2="180" y2="200"/>
      </g>

      {/* HQ PIN */}
      <g transform="translate(560 230)">
        <circle r="60" fill="url(#pinGlow)">
          <animate attributeName="r" values="44;68;44" dur="2.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values=".6;.05;.6" dur="2.6s" repeatCount="indefinite"/>
        </circle>
        <circle r="14" fill="none" stroke="var(--accent)" strokeWidth="1.5">
          <animate attributeName="r" values="10;28;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle r="9" fill="var(--accent)"/>
        <circle r="3" fill="var(--accent-ink)"/>

        {/* Callout */}
        <line x1="9" y1="-9" x2="40" y2="-50" stroke="var(--accent)" strokeWidth="1.2"/>
        <rect x="40" y="-66" width="130" height="32" rx="3" fill="var(--ink-900)" stroke="var(--accent)" strokeWidth="1"/>
        <text x="48" y="-52" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" fontWeight="600">OBJ-NIKOM-HQ</text>
        <text x="48" y="-40" fontFamily="JetBrains Mono" fontSize="7.5" fill="rgba(255,255,255,.7)">Mladost 4 · Blk 477 · Office 1</text>
      </g>

      {/* Compass */}
      <g transform="translate(740 460)">
        <circle r="22" fill="none" stroke="rgba(255,255,255,.18)"/>
        <path d="M0 -16 L4 0 L0 16 L-4 0 Z" fill="var(--accent)" opacity=".9"/>
        <text y="-26" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent)">N</text>
      </g>

      {/* Scale */}
      <g transform="translate(30 480)">
        <line x1="0" x2="120" y1="0" y2="0" stroke="rgba(255,255,255,.4)" strokeWidth="1.2"/>
        <line x1="0" x2="0" y1="-4" y2="4" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <line x1="60" x2="60" y1="-2" y2="2" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <line x1="120" x2="120" y1="-4" y2="4" stroke="rgba(255,255,255,.4)" strokeWidth="1"/>
        <text x="0" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.5)">0</text>
        <text x="120" y="20" fontFamily="JetBrains Mono" fontSize="8" fill="rgba(255,255,255,.5)">2 km</text>
      </g>
    </svg>
  );
}

/* Engineered office floor plan */
function BlueprintMap() {
  return (
    <svg viewBox="0 0 800 520" className="ctc-map-svg">
      {/* grid */}
      {Array.from({length:21}).map((_,i)=>(
        <line key={"v"+i} x1={i*40} x2={i*40} y1="0" y2="520" stroke="rgba(255,255,255,.04)"/>
      ))}
      {Array.from({length:14}).map((_,i)=>(
        <line key={"h"+i} y1={i*40} y2={i*40} x1="0" x2="800" stroke="rgba(255,255,255,.04)"/>
      ))}

      {/* Building outline */}
      <g transform="translate(140 90)">
        {/* Outer wall */}
        <rect x="0" y="0" width="520" height="320" fill="rgba(255,255,255,.025)"
              stroke="rgba(247,215,36,.6)" strokeWidth="2"/>

        {/* Internal walls */}
        <g stroke="rgba(255,255,255,.4)" strokeWidth="1.5" fill="none">
          <line x1="200" y1="0" x2="200" y2="180"/>
          <line x1="200" y1="180" x2="520" y2="180"/>
          <line x1="320" y1="0" x2="320" y2="180"/>
          <line x1="200" y1="240" x2="520" y2="240"/>
          <line x1="380" y1="180" x2="380" y2="320"/>
        </g>

        {/* Doors (gaps in walls) */}
        <g stroke="var(--ink-950)" strokeWidth="3">
          <line x1="200" y1="80" x2="200" y2="110"/>
          <line x1="240" y1="180" x2="270" y2="180"/>
          <line x1="380" y1="280" x2="380" y2="305"/>
          <line x1="320" y1="60" x2="320" y2="90"/>
        </g>

        {/* Door arcs */}
        <g stroke="rgba(255,255,255,.2)" strokeWidth=".5" fill="none">
          <path d="M200 110 A 30 30 0 0 1 230 80"/>
          <path d="M270 180 A 30 30 0 0 1 240 210"/>
        </g>

        {/* Office 1 (highlighted — NIKOM) */}
        <rect x="2" y="2" width="196" height="176" fill="rgba(247,215,36,.08)"/>
        <text x="100" y="80" textAnchor="middle" fontFamily="Geologica" fontSize="16" fontWeight="600" fill="var(--accent)">OFFICE 1</text>
        <text x="100" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.55)">NIKOM Security</text>
        <text x="100" y="118" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8.5" fill="var(--accent)" opacity=".7">★ HEADQUARTERS</text>

        {/* Furniture in NIKOM office */}
        <g stroke="rgba(247,215,36,.45)" strokeWidth="1" fill="rgba(247,215,36,.06)">
          <rect x="20" y="140" width="50" height="20" rx="1"/>
          <rect x="130" y="140" width="50" height="20" rx="1"/>
        </g>
        <circle cx="45" cy="135" r="5" fill="rgba(247,215,36,.3)"/>
        <circle cx="155" cy="135" r="5" fill="rgba(247,215,36,.3)"/>

        {/* Other offices */}
        <text x="260" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">OFFICE 2</text>
        <text x="420" y="100" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">OFFICE 3</text>
        <text x="100" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">CORRIDOR</text>
        <text x="290" y="220" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">RECEPTION</text>
        <text x="290" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">STORAGE</text>
        <text x="450" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="rgba(255,255,255,.4)">TECH ROOM</text>

        {/* Entrance arrow */}
        <g transform="translate(0 280)">
          <path d="M-30 0 L 0 0" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#arr)"/>
          <text x="-32" y="-6" fontFamily="JetBrains Mono" fontSize="9" fill="var(--accent)" textAnchor="end">ENTR</text>
        </g>

        {/* Pulsing pin on Office 1 */}
        <g transform="translate(100 60)">
          <circle r="20" fill="var(--accent)" opacity=".2">
            <animate attributeName="r" values="14;28;14" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values=".4;0;.4" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle r="6" fill="var(--accent)"/>
          <circle r="2" fill="var(--accent-ink)"/>
        </g>
      </g>

      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="var(--accent)"/>
        </marker>
      </defs>

      {/* Dimensions */}
      <g stroke="rgba(255,255,255,.3)" strokeWidth=".7" fill="none">
        <line x1="140" y1="80" x2="660" y2="80"/>
        <line x1="140" y1="76" x2="140" y2="84"/>
        <line x1="660" y1="76" x2="660" y2="84"/>
        <line x1="120" y1="90" x2="120" y2="410"/>
        <line x1="116" y1="90" x2="124" y2="90"/>
        <line x1="116" y1="410" x2="124" y2="410"/>
      </g>
      <text x="400" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)">26.4 m</text>
      <text x="110" y="250" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.5)" transform="rotate(-90 110 250)">16.0 m</text>

      {/* Title block */}
      <g transform="translate(30 460)">
        <rect x="0" y="0" width="280" height="44" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.18)"/>
        <text x="10" y="16" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.6)" letterSpacing="0.06em">DWG · NIKOM-HQ-FP-01 · REV 2026.05</text>
        <text x="10" y="30" fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,.4)">SCALE 1:100 · MLADOST 4 · BLOCK 477</text>
        <text x="10" y="42" fontFamily="JetBrains Mono" fontSize="8" fill="var(--accent)">CLASSIFICATION: PUBLIC</text>
      </g>
    </svg>
  );
}

/* ===== Form ===== */
function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [type, setType] = React.useState("consultation");
  return (
    <section className="section-pad ctc-form-section">
      <div className="container">
        <div className="ctc-form-grid">
          <div className="ctc-form-left">
            <div className="eyebrow">Запитване · Форма</div>
            <h2 className="h2"><window.StreamText text="Изпратете запитване — отговор до 4 работни часа."/></h2>
            <p className="ctc-form-lead">
              Получавате обратна връзка от инженер до 4 работни часа. За спешни случаи на действащи обекти — директен телефон към дежурен инженер.
            </p>

            <div className="ctc-type-pills">
              <span className="meta">Тип на запитване:</span>
              <div className="ctc-type-row">
                {[
                  {id:"consultation", label:"Консултация"},
                  {id:"project", label:"Нов проект"},
                  {id:"service", label:"Сервиз"},
                  {id:"other", label:"Друго"},
                ].map(t => (
                  <button key={t.id}
                          type="button"
                          className={"chip " + (type === t.id ? "solid" : "")}
                          onClick={() => setType(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ctc-trust">
              <IcC.Shield/>
              <div>
                <strong>Вашата информация е защитена</strong>
                <span>Обработваме конфиденциално и не споделяме с трети страни.</span>
              </div>
            </div>
          </div>

          <form className="ctc-form" onSubmit={(e) => {e.preventDefault(); setSent(true);}}>
            <div className="ctc-form-head">
              <span className="chip solid">FORM · 07 полета</span>
              <span className="meta">ENCRYPTED · TLS</span>
            </div>
            {sent ? (
              <div className="ctc-form-success">
                <div className="ctc-success-circle"><IcC.Check/></div>
                <h3 className="h3">Получихме запитването Ви.</h3>
                <p>Инженер от екипа ще се свърже с Вас в рамките на 4 работни часа.</p>
                <div className="meta" style={{marginTop:24}}>Referenc: REQ-{Math.floor(Math.random()*99999).toString().padStart(5,"0")}</div>
              </div>
            ) : (
              <>
                <div className="ctc-form-row-2">
                  <CFormField label="Име" required placeholder="Иван"/>
                  <CFormField label="Фамилия" required placeholder="Иванов"/>
                </div>
                <div className="ctc-form-row-2">
                  <CFormField label="Имейл" required type="email" placeholder="email@example.com"/>
                  <CFormField label="Телефон" placeholder="+359 ..."/>
                </div>
                <CFormField label="Фирма / Организация" placeholder="Опционално"/>
                <CFormField label="Адрес на обекта" placeholder="Опционално"/>
                <CFormTextarea label="Кратко описание или въпрос" placeholder="Брой етажи, площ, системи от интерес, срокове..."/>
                <button className="btn btn-primary btn-lg" type="submit">
                  Изпрати запитване <IcC.Arrow/>
                </button>
                <div className="ctc-form-foot">
                  <span className="meta">Средно време за отговор:</span>
                  <span className="ctc-form-foot-v">~3ч 12мин</span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function CFormField({label, required, type, placeholder}) {
  return (
    <div className="ctc-field">
      <label>{label}{required && <span className="ctc-req">*</span>}</label>
      <input type={type || "text"} placeholder={placeholder} required={required}/>
    </div>
  );
}
function CFormTextarea({label, placeholder}) {
  return (
    <div className="ctc-field">
      <label>{label} <span className="ctc-opt">опционално</span></label>
      <textarea rows="4" placeholder={placeholder}/>
    </div>
  );
}

Object.assign(window, { ContactHero, ContactInfo, ContactMaps, ContactForm });
