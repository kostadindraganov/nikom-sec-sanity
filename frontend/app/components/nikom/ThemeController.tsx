'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';

const DEFAULT_ACCENT = '#F7D724';
const LS_THEME_KEY = 'nikom-theme';
const LS_ACCENT_KEY = 'nikom-accent';

// Port of applyAccent() from NIKOM Security.html EDITMODE block (verbatim logic)
function applyAccent(hex: string) {
  const root = document.documentElement;
  root.style.setProperty('--accent', hex);
  // derive strong variant by darkening slightly via color-mix
  root.style.setProperty('--accent-strong', `color-mix(in oklab, ${hex} 88%, #000)`);
  // pick readable ink based on luminance
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  root.style.setProperty('--accent-ink', lum > 0.6 ? '#1A1300' : '#FFFFFF');
}

interface ThemeContextValue {
  theme: 'light' | 'dark';
  accent: string;
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setAccent: (hex: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  accent: DEFAULT_ACCENT,
  setTheme: () => {},
  toggleTheme: () => {},
  setAccent: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [accent, setAccentState] = useState<string>(DEFAULT_ACCENT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = (localStorage.getItem(LS_THEME_KEY) as 'light' | 'dark') ?? 'light';
    const savedAccent = localStorage.getItem(LS_ACCENT_KEY) ?? DEFAULT_ACCENT;
    setThemeState(savedTheme);
    setAccentState(savedAccent);
    document.documentElement.dataset.theme = savedTheme;
    applyAccent(savedAccent);
    setMounted(true);
  }, []);

  const setTheme = useCallback((t: 'light' | 'dark') => {
    setThemeState(t);
    localStorage.setItem(LS_THEME_KEY, t);
    document.documentElement.dataset.theme = t;
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(LS_THEME_KEY, next);
      document.documentElement.dataset.theme = next;
      return next;
    });
  }, []);

  const setAccent = useCallback((hex: string) => {
    setAccentState(hex);
    localStorage.setItem(LS_ACCENT_KEY, hex);
    applyAccent(hex);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, toggleTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Renders nothing — mounts theme from localStorage on first paint
export function ThemeController() {
  useEffect(() => {
    const savedTheme = (localStorage.getItem(LS_THEME_KEY) as 'light' | 'dark') ?? 'light';
    const savedAccent = localStorage.getItem(LS_ACCENT_KEY) ?? DEFAULT_ACCENT;
    document.documentElement.dataset.theme = savedTheme;
    applyAccent(savedAccent);
  }, []);

  return null;
}
