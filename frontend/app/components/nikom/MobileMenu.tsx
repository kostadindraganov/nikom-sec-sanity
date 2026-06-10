'use client';

import { Link } from '@/i18n/navigation';
import { Icons } from '@/app/components/nikom/icons';

type NavItem = { label: string; href: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  nav?: NavItem[];
  phone?: string;
  phoneDisplay?: string;
  ctaText?: string;
};

const DEFAULT_NAV: NavItem[] = [
  { label: 'Начало', href: '/' },
  { label: 'За нас', href: '/za-nas' },
  { label: 'Услуги', href: '/uslugi' },
  { label: 'Проекти', href: '/proekti' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакт', href: '/kontakt' },
];

export function MobileMenu({
  open,
  onClose,
  nav = DEFAULT_NAV,
  phone = '+359894523970',
  phoneDisplay = '+359 89 45 23 970',
  ctaText = 'Заявете консултация',
}: MobileMenuProps) {
  return (
    <div className={'mobile-menu ' + (open ? 'open' : '')}>
      <div className="mm-top">
        <button className="theme-toggle mm-close" onClick={onClose} aria-label="Затвори менюто">
          <Icons.Close />
        </button>
      </div>
      <nav>
        {nav.map(({ label, href }) => (
          <Link key={label} href={href as '/'} onClick={onClose}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="m-cta">
        <Link href="/kontakt" className="btn btn-primary btn-lg" onClick={onClose}>
          {ctaText} <Icons.Arrow />
        </Link>
        <a className="btn btn-ghost btn-lg" href={`tel:${phone}`}>
          <Icons.Phone /> {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
