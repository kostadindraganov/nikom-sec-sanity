# NIKOM Security — Design System

A premium, trustworthy B2B website concept for a Bulgarian security & fire-safety engineering company. Built as an interactive React prototype with full Bulgarian/Cyrillic support, light + dark theme, and an engineered/SOC visual language.

> **Дизайн концепция:** _"Signal Yellow + Engineered Graphite"_ — индустриално жълто като при сертифицирани защитни системи, в контраст с дълбок графит. Visual cues от SOC-табла, blueprint-и, и инженерна документация.

---

## 1. Brand voice

- Technical · calm · reliable · precise · discreet · engineering-focused
- Authority comes from numbers (count-up stats), certification labels (EN 54, ISO 27001, MVR license), and live monitoring metaphors (LIVE dot, event streams, scan lines)
- Never marketing-fluff; always "engineer-talking-to-engineer"

---

## 2. Color tokens

### Brand — Signal Yellow
| Token | Hex | Use |
|---|---|---|
| `--yellow-50`  | `#FFFBE6` | very faint tint |
| `--yellow-100` | `#FFF3B0` | hover wash |
| `--yellow-200` | `#FFE970` | dark-mode strong |
| `--yellow-300` | `#F7D724` | **PRIMARY ACCENT** |
| `--yellow-400` | `#EBC524` | accent-strong (hover) |
| `--yellow-500` | `#D9B017` | dense / outline |
| `--yellow-600` | `#B08F0E` | deep |

### Engineered Graphite (ink scale)
| Token | Hex |
|---|---|
| `--ink-950` | `#0B0D10` |
| `--ink-900` | `#111418` |
| `--ink-800` | `#181C22` |
| `--ink-700` | `#232932` |
| `--ink-600` | `#2E3641` |
| `--ink-500` | `#3A4250` |
| `--ink-400` | `#6B7280` (muted text) |
| `--ink-300` | `#9CA3AF` |
| `--ink-200` | `#D1D5DB` |

### Warm Paper
| Token | Hex |
|---|---|
| `--paper-50`  | `#FAF8F2` (page bg light) |
| `--paper-100` | `#F4F1E8` (section soft bg) |
| `--paper-200` | `#ECE8DB` |
| `--paper-300` | `#DDD8C7` |

### Semantic tokens (theme-aware)
| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FAF8F2` | `#0B0D10` |
| `--bg-soft` | `#F4F1E8` | `#111418` |
| `--bg-elev` | `#FFFFFF` | `#181C22` |
| `--fg` | `#0B0D10` | `#F5F2EB` |
| `--fg-muted` | `#4B5562` | `#B6BDC8` |
| `--fg-subtle` | `#7B8593` | `#8892A0` |
| `--border` | `rgba(11,13,16,.10)` | `rgba(255,255,255,.08)` |
| `--accent` | `#F7D724` | `#F7D724` |
| `--accent-ink` | `#1A1300` | `#14100A` |

Accent stays the same in both themes — yellow is the brand, not a theme color.

---

## 3. Typography

Font families (Google Fonts, full Cyrillic subset):

| Role | Family | Weights |
|---|---|---|
| Display / headings | **Geologica** | 500 / 600 / 700 |
| Body / UI | **Source Sans 3** | 400 / 500 / 600 |
| Code / meta | **JetBrains Mono** | 400 / 500 |

### Scale (fluid via clamp())
| Class | Size | Use |
|---|---|---|
| `.h1` | `clamp(40px, 5.6vw, 76px)` | Hero |
| `.h2` | `clamp(30px, 3.6vw, 50px)` | Section headers |
| `.h3` | `clamp(22px, 2.2vw, 30px)` | Card titles |
| `.h4` | `clamp(18px, 1.4vw, 22px)` | Sub-card titles |
| body large | `18-20px` | Lead paragraphs |
| body | `17px` | Default |
| `.meta` | `11.5px` mono | Technical labels |
| `.eyebrow` | `12px` Geologica 500 + tracking 0.14em | Section eyebrows |

**Bulgarian-Cyrillic comfort rules:**
- Line-height `1.55` for body, `1.06-1.18` for headlines
- `text-wrap: balance` on headlines
- No negative letter-spacing on body
- Headlines use `-0.01em` max
- `font-feature-settings: 'ss01', 'cv11'` for Geologica stylistic alternates

---

## 4. Layout & spacing

- Container: `max-width: 1320px`, gutter `clamp(16px, 3vw, 40px)`
- Section padding-block: `clamp(64px, 8vw, 120px)`
- Bento grid: `repeat(4, 1fr)` desktop → `repeat(2, 1fr)` tablet → `1fr` mobile
- Card padding: `28px`
- Border radius scale: `xs 4` / `sm 8` / `md 14` / `lg 22` / pill `999px`

### Shadows (sparingly)
- `--shadow-sm` — 1px hairline
- `--shadow-md` — soft 32px Y-offset for hover lift
- `--shadow-lg` — 80px atmospheric (used only for floating chrome)

---

## 5. Component vocabulary

### Buttons
- `.btn-primary` — yellow fill, dark ink text, pill shape
- `.btn-ghost` — transparent, border, swaps to ink-bg on hover
- `.btn-dark` — inverse (used in dark-bands)
- Always pair a CTA with an arrow icon (`→`) that translates `3px` on hover
- Sizes: `.btn-sm` / default / `.btn-lg`

### Chips
- `.chip` — bordered, neutral
- `.chip.solid` — yellow fill (active state)
- `.chip.dark` — inverse fill

### Cards (bento)
- `.bento-card` — generic surface, hover: border darkens, `translateY(-2px)`
- `.bento-card.fire-card` — dark gradient with yellow accents, embedded floor plan visualisation
- `.bento-card.dark` — inverse for spotlight blocks (Integration)
- Corner ticks: `.tick.tl/tr/bl/br` — subtle yellow brackets at each corner

### Status / live indicators
- `.status-dot` — pulsing yellow dot for "LIVE / online" labels
- `.icon-dot` — inline pulse dot used inside chips
- Green `#42C77A` for "operational/online" semantic dots (never yellow — yellow is brand, green is status)

---

## 6. Motion language

Every motion has a purpose. No decorative parallax. No glassmorphism. Motion communicates **live monitoring**.

### Reusable primitives (`animations.jsx`)
- `<Counter to={N} />` — count-up on scroll into view, easeOutCubic, 1.6s
- `<StreamText text="…" />` — word-by-word reveal with blur-in, used on all `h2`
- `<Marquee speed={48}>` — infinite scroll for partner pills + ticker
- `<Streaming items={…}>` — live event log with cycling active state
- `ProcessWalker(total, interval)` — auto-cycles through the 7-step process timeline
- `useCountUp(target, opts)` — underlying hook

### Section-level animations
| Section | Motion |
|---|---|
| Hero | Vertical **scan line** across building diagram, pulsing zone dots, animated dashed signal paths |
| Solutions / Fire | Animated **floor plan** — 6 detectors cycle, active one emits expanding ripple; signal line streams to FACP |
| Process | **Walker** advances 01→07 with pulsing active dot + gradient progress bar |
| Industries | Single yellow window mid-blink in each tile |
| Integration / PSIM | Rotating concentric dashes around core, streaming dot on each signal path, horizontal **arch-scan** sweeping right, plus icon-by-icon animations inside each subsystem card (camera rotate, bell shake, barrier lift, intercom ripple, etc.) |
| Partners | Two counter-running marquees |
| Footer ghost | Wireframe text watermark + grid overlay + corner labels + crosshair + downward scan + 3D `text-shadow` perspective tilt |

### Easing curves
- Default UI: `ease` or `cubic-bezier(.4, 0, .2, 1)`
- Reveal: `easeOutCubic`
- Process walker: 1.1s `cubic-bezier(.4, 0, .2, 1)`

### Respect `prefers-reduced-motion`
All `*` selectors fall back to `none` animations.

---

## 7. Iconography

Two icon systems coexist:

1. **`window.NIKOMIcon`** (`icons.jsx`) — Lucide-inspired line icons, 22px, currentColor. Used for UI affordances (arrow, phone, sun/moon, etc.) and bento card icons.
2. **`ArchIcon`** (`sections.jsx`) — Custom animated SVGs **inside** the PSIM architecture diagram (FIRE flame flicker, CCTV scan rotate, ACS key pulse, INT bell wobble, PA speaker waves, PRK barrier lift, INT2 intercom ripple, BMS sequenced grid).

No emoji. No 3rd-party logo recreation (partner pills are text-only).

---

## 8. Theme behaviour

- Toggle via `data-theme="light|dark"` on `<html>`
- Tokens are theme-aware (semantic) — components never hard-code hex
- Yellow accent stays constant across themes for brand consistency
- Light theme = warm paper with deep ink text
- Dark theme = deep ink with off-white text + same yellow
- Persisted via Tweaks panel state

---

## 9. Tweaks panel

Available controls (toggle from toolbar):
- **Theme** — Light / Dark
- **Жълт нюанс** — 4 curated yellow swatches (#F7D724 / #FFB400 / #EBC524 / #F5D547)
- **CTA текст** — editable headline copy
- **Покажи лентата под hero** — toggle the ticker bar

Defaults are persisted inside the `EDITMODE-BEGIN/END` JSON block at the top of `NIKOM Security.html`.

---

## 10. Page structure (homepage)

1. **Header** — sticky, grid `auto 1fr auto` (logo · nav · actions), backdrop-blur + border on scroll
2. **Hero** — H1 with yellow highlight wash, building schematic with live zones, trust bar with count-up
3. **Ticker** — dark scrolling marquee of metrics
4. **Solutions / Bento** — 7 cards including the redesigned dark FIRE card with embedded floor-plan animation
5. **Process** — 7-step horizontal walker (vertical on mobile)
6. **Why NIKOM** — split layout: stats left, 4 pillars right
7. **Industries** — 6 sector tiles with mini-skyline SVGs
8. **Featured Projects** — 4 cards, one featured-wide, with KPI count-ups
9. **Integration architecture** — full-bleed dark band with PSIM core + 8 subsystem icon-nodes, live event stream log, scenario timeline, KPI grid
10. **Partners** — dual marquees + certification chips
11. **Contact** — split copy/form, live form-state, success state
12. **Footer** — dark, with wireframe ghost watermark "NIKOM / СИСТЕМИ ЗА СИГУРНОСТ"

---

## 11. File map

```
NIKOM Security.html      ← entry, React root, theme + tweaks state
styles.css               ← tokens, base, header, mobile menu
sections.css             ← section-level styles (solutions, process, ...)
animations.css           ← motion primitives + footer ghost + fire diagram
icons.jsx                ← NIKOMIcon UI icons
animations.jsx           ← Counter, StreamText, Marquee, Streaming, ProcessWalker
hero.jsx                 ← Header, MobileMenu, Hero, BuildingDiagram
sections.jsx             ← Solutions, FireFloorPlan, Process, Why, Industries,
                           Projects, Integration, ArchitectureDiagram, ArchNode,
                           ArchIcon, Partners, Contact, Footer
tweaks-panel.jsx         ← Tweaks shell + controls
```

---

## 12. Do / Don't

✅ **Do**
- Use yellow as the brand signal — sparingly, always purposeful (CTA, active state, alerts)
- Pair every claim with a number (with count-up) or a certification label
- Make motion mean something: stream = live, scan = monitoring, pulse = active
- Keep Bulgarian Cyrillic comfortable — no negative letter-spacing on body text
- Use mono font for technical labels, coordinates, zones, codes

❌ **Don't**
- Generic AI-landing-page glassmorphism or neon-cyber clichés
- Hand-drawn complex SVG illustrations — use placeholders + ask for real assets
- Stock photography of "hooded hackers"
- Drop-shadows on yellow elements
- Long marketing paragraphs — use bullets, KPIs, or a diagram instead
- Emoji
- More than 2 accent colors on screen
