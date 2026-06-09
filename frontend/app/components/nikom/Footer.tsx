import { Link } from '@/i18n/navigation';

type NavItem = { label: string; href: string };
type FooterColumn = { title: string; links: NavItem[] };
type SocialLink = { label: string; href: string };

type FooterProps = {
  tagline?: string;
  social?: SocialLink[];
  footerColumns?: FooterColumn[];
  phone?: string;
  phoneDisplay?: string;
  ghostText?: string;
  ghostSub?: string;
};

const DEFAULT_NAV: NavItem[] = [
  { label: 'Начало', href: '/' },
  { label: 'За нас', href: '/za-nas' },
  { label: 'Услуги', href: '/uslugi' },
  { label: 'Проекти', href: '/proekti' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакт', href: '/kontakt' },
];

const DEFAULT_SERVICES: NavItem[] = [
  { label: 'Пожароизвестяване', href: '/uslugi' },
  { label: 'Видеонаблюдение', href: '/uslugi' },
  { label: 'Контрол на достъп', href: '/uslugi' },
  { label: 'Паник системи', href: '/uslugi' },
  { label: 'Озвучаване', href: '/uslugi' },
  { label: 'Структурно окабеляване', href: '/uslugi' },
  { label: 'Интеграция (PSIM)', href: '/uslugi' },
];

const DEFAULT_COLUMNS: FooterColumn[] = [
  { title: 'Навигация', links: DEFAULT_NAV },
  { title: 'Услуги', links: DEFAULT_SERVICES },
];

const DEFAULT_SOCIAL: SocialLink[] = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'YouTube', href: '#' },
];

const SOCIAL_LABELS: Record<string, string> = {
  LinkedIn: 'in',
  Facebook: 'f',
  YouTube: '▶',
};

export function Footer({
  tagline = 'Инженерен партньор за интегрирани системи за сигурност, пожарна безопасност и контрол на достъп.',
  social = DEFAULT_SOCIAL,
  footerColumns = DEFAULT_COLUMNS,
  phone = '+359894523970',
  phoneDisplay = '+359 89 45 23 970',
  ghostText = 'NIKOM',
  ghostSub = 'СИСТЕМИ ЗА СИГУРНОСТ',
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-top">
          <div className="foot-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">N</span>
              <span>NIKOM<span style={{ color: 'var(--fg-muted)', fontWeight: 400, marginLeft: 4 }}>Security</span></span>
            </Link>
            <p className="foot-pos">{tagline}</p>
            <div className="foot-social">
              {social.map(({ label, href }) => (
                <a key={label} href={href} aria-label={label}>
                  {SOCIAL_LABELS[label] ?? label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map(({ title, links }) => (
            <FootCol key={title} title={title} items={links} />
          ))}

          {/* Contact column — rendered inline from settings fields */}
          <div className="foot-col">
            <div className="meta">Контакт</div>
            <div className="foot-contact">
              <a href={`tel:${phone}`}>{phoneDisplay}</a>
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
        <div className="fg-line fg-line-1 fg-3d">{ghostText}</div>
        <div className="fg-line fg-line-2">{ghostSub}</div>
        <div className="fg-scan" />
      </div>
    </footer>
  );
}

function FootCol({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div className="foot-col">
      <div className="meta">{title}</div>
      <ul>
        {items.map(({ label, href }) => (
          <li key={label}>
            <Link href={href as '/'}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
