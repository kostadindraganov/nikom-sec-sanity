'use client';

import React, { useState, useEffect, useRef } from 'react';
import { stegaClean } from 'next-sanity';

// Animated counter that triggers when scrolled into view
export function useCountUp(target: number, { duration = 1600, decimals = 0 }: { duration?: number; decimals?: number } = {}): [React.RefObject<HTMLSpanElement | null>, string] {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - startTime) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    };

    // If already in viewport on mount, start immediately
    const rect = el.getBoundingClientRect();
    const inView = rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
    if (inView) { start(); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) start(); });
    }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return [ref, decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()];
}

export function Counter({ to, suffix = "", prefix = "", decimals = 0, format = "default", className = "" }: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  format?: string;
  className?: string;
}) {
  const [ref, val] = useCountUp(to, { decimals });
  // format with thousand separator
  let display = val;
  if (format === "comma") {
    display = Number(val).toLocaleString('bg-BG');
  }
  return <span ref={ref} className={"counter " + className}>{prefix}{display}{suffix}</span>;
}

// Scan line animation overlay
export function ScanLine({ vertical = false, duration = 3.6, className = "" }: {
  vertical?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={"scanline " + (vertical ? "v " : "") + className} style={{ animationDuration: duration + "s" }} />
  );
}

// Reveal-on-scroll wrapper
export function Reveal({ children, delay = 0, y = 16, className = "" }: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >{children}</div>
  );
}

// Marquee that loops content horizontally
export function Marquee({ children, speed = 50, reverse = false, pauseOnHover = true, className = "" }: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={"marquee " + (pauseOnHover ? "phover " : "") + className}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div className="marquee-row">{children}</div>
        <div className="marquee-row" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

// Type-on text effect (simple)
export function Streaming({ items = [], interval = 1800, className = "" }: {
  items?: { time?: string; kind?: string; tag?: string; msg?: string }[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items.length, interval]);
  return (
    <div className={"streaming " + className}>
      {items.map((it, idx) => (
        <div key={idx} className={"stream-line " + (idx === i ? "active" : "")}>
          <span className="stream-time">{it.time}</span>
          <span className={"stream-tag tag-" + (it.kind || "info")}>{it.tag}</span>
          <span className="stream-msg">{it.msg}</span>
        </div>
      ))}
    </div>
  );
}

/* LazyImg — image with shimmer skeleton until loaded, fades in.
   Props: src, alt, className?, onLoad? */
export function LazyImg({ src, alt, className = "", onLoad, ...rest }: {
  src: string;
  alt: string;
  className?: string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  [key: string]: unknown;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  return (
    <span className={"lazy-img-wrap " + (loaded ? "is-loaded " : "is-loading ") + className}>
      <span className="lazy-shimmer" aria-hidden="true">
        <span className="lazy-shimmer-bar" />
      </span>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => { setLoaded(true); if (onLoad) onLoad(e); }}
        {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
      />
    </span>
  );
}

/* StreamText — word-by-word reveal w/ subtle blur fade.
   children must be a plain string. Wrap inline (use as inner span). */
export function StreamText({ children, text: textProp, speed = 55, startDelay = 0, once = true, className = "", caret = false }: {
  children?: React.ReactNode;
  text?: string;
  speed?: number;
  startDelay?: number;
  once?: boolean;
  className?: string;
  caret?: boolean;
}) {
  const rawText = typeof textProp === 'string' ? textProp
    : typeof children === 'string' ? children
    : (Array.isArray(children) ? (children as unknown[]).filter(c => typeof c === 'string').join('') : String(children || ''));
  // Strip stega encoding before tokenizing: splitting at whitespace fractures the
  // invisible stega payload across word spans, which makes Visual Editing's decoder
  // throw "Encoded data has invalid length". The parent element's data-sanity attr
  // still carries the click-to-edit anchor, so we lose nothing.
  const text = stegaClean(rawText);
  // tokenize into runs of whitespace + word so spaces are preserved
  const tokens = text.match(/\S+|\s+/g) || [];
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const start = () => {
      if (started.current) return;
      started.current = true;
      setTimeout(() => {
        let i = 0;
        const tick = () => {
          i += 1;
          setShown(i);
          // advance faster on whitespace tokens
          const next = tokens[i];
          const delay = next && /\s+/.test(next) ? 8 : speed;
          if (i < tokens.length) setTimeout(tick, delay);
        };
        tick();
      }, startDelay);
    };
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    if (rect.top < (window.innerHeight || 800) && rect.bottom > 0) { start(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={"stream-text " + className}>
      {tokens.map((tok, i) => {
        if (/\s+/.test(tok)) return <React.Fragment key={i}>{tok}</React.Fragment>;
        return <span key={i} className={"stream-word " + (i < shown ? "in" : "")}>{tok}</span>;
      })}
      {caret && shown < tokens.length && <span className="stream-caret">▍</span>}
    </span>
  );
}

/* ProcessWalker — walks through N steps, advancing every interval.
   Returns the currently active index. Looping. Pauses on hover via CSS. */
export function ProcessWalker(total = 7, interval = 1200): [React.RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const begin = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let i = 0;
      setStep(0);
      timerRef.current = setInterval(() => {
        i = (i + 1) % (total + 2); // pause 2 cycles at end before looping
        setStep(i >= total ? -2 : i); // -2 = all done flash
        if (i === total + 1) i = -1; // reset
      }, interval);
    };
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { begin(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) begin(); }, { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); if (timerRef.current) clearInterval(timerRef.current); };
  }, [total, interval]);

  return [ref, step];
}
