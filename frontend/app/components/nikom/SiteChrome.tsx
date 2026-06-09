'use client';

import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/app/components/nikom/ThemeController';
import { Header } from '@/app/components/nikom/Header';
import { MobileMenu } from '@/app/components/nikom/MobileMenu';

type NavItem = { label: string; href: string };
type SocialLink = { label: string; href: string };

type SiteChromeProps = {
  nav?: NavItem[];
  phone?: string;
  phoneDisplay?: string;
  ctaText?: string;
};

export function SiteChrome({
  nav,
  phone,
  phoneDisplay,
  ctaText,
}: SiteChromeProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ThemeProvider>
      <Header
        nav={nav}
        phone={phone}
        phoneDisplay={phoneDisplay}
        ctaText={ctaText}
        scrolled={scrolled}
        onOpenMenu={() => setMenuOpen(true)}
      />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={nav}
        phone={phone}
        phoneDisplay={phoneDisplay}
        ctaText={ctaText}
      />
    </ThemeProvider>
  );
}
