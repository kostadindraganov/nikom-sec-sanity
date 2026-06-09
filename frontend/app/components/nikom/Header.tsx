'use client';

import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Icons } from '@/app/components/nikom/icons';
import { useTheme } from '@/app/components/nikom/ThemeController';

type NavItem = { label: string; href: string };

type HeaderProps = {
  nav?: NavItem[];
  phone?: string;
  phoneDisplay?: string;
  ctaText?: string;
  scrolled?: boolean;
  onOpenMenu?: () => void;
};

const DEFAULT_NAV: NavItem[] = [
  { label: 'Начало', href: '/' },
  { label: 'За нас', href: '/za-nas' },
  { label: 'Услуги', href: '/uslugi' },
  { label: 'Проекти', href: '/proekti' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакт', href: '/kontakt' },
];

export function Header({
  nav = DEFAULT_NAV,
  phone = '+359894523970',
  phoneDisplay = '+359 89 45 23 970',
  ctaText = 'Заявете консултация',
  scrolled = false,
  onOpenMenu,
}: HeaderProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // active detection: strip leading slash for comparison
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <div className={'hdr-wrap ' + (scrolled ? 'scrolled' : '')}>
      <div className="container">
        <div className={'hdr ' + (scrolled ? 'scrolled' : '')}>
          <Link href="/" className="brand">
            <span className="brand-mark">N</span>
            <span>NIKOM<span style={{ color: 'var(--fg-muted)', fontWeight: 400, marginLeft: 4 }}>Security</span></span>
          </Link>

          <nav className="primary">
            {nav.map(({ label, href }) => (
              <Link key={label} href={href as '/'} className={isActive(href) ? 'active' : ''}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="actions">
            <a
              className="phone-btn desktop-only"
              href={`tel:${phone}`}
              aria-label={`Обадете се: ${phoneDisplay}`}
              title={phoneDisplay}
            >
              <Icons.Phone />
            </a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Смяна на темата">
              {theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <Link href="/kontakt" className="btn btn-primary desktop-only">
              {ctaText} <Icons.Arrow />
            </Link>
            <button className="theme-toggle menu-toggle" onClick={onOpenMenu} aria-label="Меню">
              <Icons.Menu />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
