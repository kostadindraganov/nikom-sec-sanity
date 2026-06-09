/* Single blog post page */

const IcBS = window.NIKOMIcon;

function PostHero({ p }) {
  return (
    <section className="post-hero">
      <div className="ph-img-wrap">
        <window.LazyImg src={p.img} alt={p.title}/>
        <div className="ph-gradient"/>
        <div className="ph-scan"/>
      </div>
      <div className="container ph-inner">
        <div className="ph-breadcrumb">
          <a href="Блог.html">Блог</a>
          <span className="ph-bc-sep">/</span>
          <span>{p.category}</span>
        </div>
        <h1 className="ph-h1"><window.StreamText text={p.title}/></h1>
        <div className="ph-meta">
          <span className="chip solid">{p.category}</span>
          <span className="ph-meta-item">
            <span className="meta">Автор:</span>
            <strong>{p.author}</strong>
          </span>
          <span className="ph-meta-item">
            <span className="meta">Дата:</span>
            <strong>{window.formatBlogDate(p.date)}</strong>
          </span>
          <span className="ph-meta-item">
            <span className="meta">Прочит:</span>
            <strong>{p.readMin} мин</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

function PostBody({ p }) {
  // Mock article body — different content per post
  const bodyMap = {
    "en54-explained": [
      ["lead", "EN 54 е серията европейски стандарти за пожароизвестителни и алармени системи. Включва над 30 части — от детектори до управляващи централи и източници на захранване."],
      ["h2", "Защо EN 54 е задължителен"],
      ["p", "В България сертифицирането по EN 54 е изискване по Наредба Iз-1971 за обекти от категории А, Б и В. Без него системата не може да бъде въведена в експлоатация."],
      ["h2", "Ключови части на стандарта"],
      ["list", ["EN 54-2: контролни и индикаторни уреди", "EN 54-3: звукови сигнализатори", "EN 54-4: захранващи устройства", "EN 54-7: димни детектори", "EN 54-16: гласово евакуационно оповестяване"]],
      ["quote", "Сертификатът не е документ на стена — той е гаранция, че системата ще работи в реална ситуация. — инж. Николай Васев"],
      ["h2", "Какво проверяваме при доставка"],
      ["p", "Декларация за съответствие, сертификат от нотифициран орган, серийни номера на компонентите. Документацията остава на обекта като част от експлоатационното досие."],
      ["h2", "Поддръжка и проверки"],
      ["p", "EN 54 изисква редовни проверки от лицензиран специалист. NIKOM поддържа абонаментни договори с над 200 обекта, включително болнични и индустриални комплекси."],
    ],
    "anpr-parking": [
      ["lead", "ANPR (Automatic Number Plate Recognition) е технология, която чрез камера и софтуер автоматично разпознава регистрационния номер на превозно средство."],
      ["h2", "Как работи"],
      ["p", "Камерата прави снимка, OCR алгоритъмът извлича текста, системата проверява номера в база данни и взема решение — отваряне на бариера, таксуване, регистрация на влизане/излизане."],
      ["h2", "Точност и условия"],
      ["p", "Съвременните системи постигат над 98% точност при добра светлина. При нощни условия се използват IR прожектори. Скоростта на разпознаване — под 200ms."],
      ["h2", "Приложения"],
      ["list", ["Платени паркинги и&nbsp;шопинг центрове", "Контролиран достъп до&nbsp;офиси и&nbsp;складове", "Жилищни комплекси и&nbsp;закрити паркинги", "Корпоративни паркинги с&nbsp;HR интеграция"]],
    ],
  };
  const body = bodyMap[p.id] || [
    ["lead", p.excerpt],
    ["h2", "Технически контекст"],
    ["p", "Тази статия задълбочено разглежда темата с фокус върху практическо приложение в реални проекти от портфолиото на НИКОМ."],
    ["h2", "Ключови наблюдения"],
    ["list", ["Стандартите развиват с темпото на технологиите", "Интеграцията остава ключов фактор за успех", "Поддръжката определя дългосрочната ефективност"]],
    ["p", "За повече информация или индивидуална консултация по темата, свържете се с екипа на НИКОМ."],
  ];

  return (
    <article className="post-body">
      <div className="container post-container">
        <div className="post-grid">
          <div className="post-main">
            {body.map((b, i) => {
              const [type, content] = b;
              if (type === "lead") return <p className="post-lead" key={i}>{content}</p>;
              if (type === "h2") return <h2 className="post-h2" key={i}>{content}</h2>;
              if (type === "p") return <p className="post-p" key={i} dangerouslySetInnerHTML={{__html: content}}/>;
              if (type === "list") return (
                <ul className="post-list" key={i}>
                  {content.map((it, j) => <li key={j} dangerouslySetInnerHTML={{__html: it}}/>)}
                </ul>
              );
              if (type === "quote") return <blockquote className="post-quote" key={i}>{content}</blockquote>;
              return null;
            })}

            <div className="post-tags">
              <span className="meta">Тагове:</span>
              {p.tags.map(t => <span className="chip" key={t}>#{t}</span>)}
            </div>

            <div className="post-share">
              <span className="meta">Сподели:</span>
              <button className="post-share-btn" aria-label="Facebook">f</button>
              <button className="post-share-btn" aria-label="LinkedIn">in</button>
              <button className="post-share-btn" aria-label="X">𝕏</button>
              <button className="post-share-btn" aria-label="Copy link">⧉</button>
            </div>
          </div>

          <aside className="post-side">
            <div className="post-toc">
              <div className="eyebrow">Съдържание</div>
              <ol>
                {body.filter(b => b[0] === "h2").map((b, i) => (
                  <li key={i}><a href={`#h-${i}`}>{b[1]}</a></li>
                ))}
              </ol>
            </div>
            <div className="post-author-card">
              <div className="eyebrow">Автор</div>
              <div className="pa-avatar">{p.author.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
              <div className="pa-name">{p.author}</div>
              <div className="pa-role">Инженер · NIKOM Security</div>
              <p className="pa-bio">Над 15 години опит в&nbsp;проектиране и&nbsp;интеграция на&nbsp;инженерни системи за&nbsp;сигурност и&nbsp;пожарна безопасност.</p>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function PostRelated({ p }) {
  const others = window.NIKOM_POSTS.filter(x => x.id !== p.id).slice(0, 3);
  return (
    <section className="section-pad post-related">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow">Сходни статии · 03</div>
            <h2 className="h2"><window.StreamText text="Прочетете още от блога."/></h2>
          </div>
          <a className="btn btn-ghost btn-sm" href="Блог.html">Виж всички <IcBS.Arrow/></a>
        </div>
        <div className="pr-grid">
          {others.map(o => (
            <a className="pr-card" key={o.id} href={`Статия.html?id=${o.id}`}>
              <div className="pr-img">
                <window.LazyImg src={o.img} alt={o.title}/>
                <span className="chip solid pr-cat">{o.category}</span>
              </div>
              <div className="pr-body">
                <span className="meta">{window.formatBlogDate(o.date)} · {o.readMin} мин</span>
                <h3 className="h4">{o.title}</h3>
                <span className="pr-arrow">Прочети <IcBS.Arrow/></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Имате въпрос?</div>
            <h2 className="h2"><window.StreamText text="Обсъдете го с инженер от екипа."/></h2>
            <p>Безплатна първоначална консултация. Поверителността е&nbsp;стандарт.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="Контакт.html">Заявете консултация <IcBS.Arrow/></a>
            <a className="btn btn-ghost btn-lg" href="Блог.html">Всички статии</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PostHero, PostBody, PostRelated, PostCta });
