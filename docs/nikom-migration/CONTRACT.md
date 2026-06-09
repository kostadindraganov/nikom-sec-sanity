# NIKOM-SEC → Sanity/Next.js Migration — ARCHITECTURE CONTRACT

**This file is the single source of truth. Every agent MUST read it before acting and follow it exactly.**

## Goal
Migrate the static React prototype in `docs/nikom-sec/` into the existing Sanity CMS + Next.js app so the
public site looks **pixel-identical** (same sections, layout, animations, text, images) AND every text/image/
section is editable in **Sanity Studio** and via **frontend Visual Editing (live edit)**.

## Hard constraints
- Locale: **Bulgarian only** (`bg`). Replace `en/pt/pl`. `defaultLocale = 'bg'`, keep `localePrefix: 'always'` (URLs `/bg/...`).
- Use existing patterns: `page.pageBuilder[]` → `BlockRenderer` maps `_type` → component; Visual Editing via `dataAttr`.
- Preserve fidelity by **porting the source CSS verbatim** (do NOT rewrite to Tailwind).
- Budget is tight. Be concise. Do not over-explain. Write files, report 1-line summaries.

## Paths & conventions
- Source prototype: `docs/nikom-sec/` (HTML entry files, `*.jsx`, `*.css`, `assets/`, `screenshots/`).
- Frontend app: `frontend/` (Next.js 15 App Router, Tailwind v4, next-intl). Components in `frontend/app/components/`.
- Studio: `studio/` (schema in `studio/src/schemaTypes/`).
- Sanity project: `4z2j1ytf`, dataset `production` (currently EMPTY).
- **NIKOM React components** go in: `frontend/app/components/nikom/`
- **NIKOM ported CSS** goes in: `frontend/app/nikom/css/` (one file per source css), aggregated by `frontend/app/nikom/nikom.css` (which `@import`s them in this order: styles.css, sections.css, animations.css, about.css, services.css, projects.css, project-single.css, contact.css, blog.css). Import `nikom.css` once, AFTER the tailwind import (resolve `.container` conflict — see below).
- **NIKOM images**: copy `docs/nikom-sec/assets/*` → `frontend/public/nikom/` (keep filenames). Components render Sanity image if present, else fall back to `/nikom/<file>`.
- **NIKOM schema objects** go in: `studio/src/schemaTypes/objects/nikom/` (one file per type).

## Known conflicts to resolve (foundation phase)
1. `frontend/app/globals.css` is **Tailwind v4** (`@import 'tailwindcss'; @utility container {...}`). NIKOM `styles.css` also defines `.container` (max-width:1320px). Ensure NIKOM `.container` wins on NIKOM pages (import order / specificity). Do not break Tailwind for the Studio/template.
2. Tailwind `@layer base` styles bare `h1..h6`. NIKOM uses class-based `.h1/.h2/...`; ensure NIKOM headings look right.
3. `[locale]/layout.tsx` sets `<html className="... bg-gray-50 text-gray-900">`. NIKOM body must use `var(--bg)/var(--fg)`. Add `data-theme="light"` to `<html>` and let NIKOM `body{}` rule drive colors. Remove conflicting Tailwind bg/text on html for the public site.

## Fonts
Source uses Google Fonts (Cyrillic subset): **Geologica** (400/500/600/700), **Source Sans 3** (400/500/600/700),
**JetBrains Mono** (400/500). NIKOM CSS references these family names directly. Add a `<link>` to Google Fonts
(same href as source HTML `<head>`) in `[locale]/layout.tsx` head so the exact family names resolve. Keep existing next/font Inter for template parts if needed.

## Theme + accent (client)
Source toggles `data-theme="light|dark"` on `<html>` and sets `--accent` via JS. Create a small client
component `frontend/app/components/nikom/ThemeController.tsx` that: reads/persists theme in localStorage,
sets `document.documentElement.dataset.theme`, applies accent (port `applyAccent()` from the HTML entry files).
Header's theme toggle uses it. Default theme `light`, default accent `#F7D724`.

## Component porting rules (EVERY section component)
1. New file `frontend/app/components/nikom/<Name>.tsx`. Port JSX from the matching source `*.jsx`.
2. Keep **all `className` strings EXACTLY** as source (CSS is ported verbatim → pixel match). Convert `class=`→`className=`, inline `style` objects stay.
3. Replace globals:
   - `window.NIKOMIcon` / `I.X` → `import { Icons } from '@/app/components/nikom/icons'` then `<Icons.X/>`.
   - `window.Counter`/`StreamText`/`Marquee`/`Streaming`/`ProcessWalker`/`useCountUp` → `import { Counter, StreamText, Marquee, Streaming, ProcessWalker, useCountUp } from '@/app/components/nikom/animations'`.
   - `window.HeroCameraDiagram` etc. → import the ported helper component.
4. Add `'use client'` to any component using hooks, state, effects, animation, IntersectionObserver, or event handlers. Pure static ones may stay server components.
5. **Sanity-driven content**: every visible text/image/number/list comes from a prop `block` (for pageBuilder sections) or `doc` (for documents). Use the ORIGINAL source text/number/image as the schema `initialValue` AND as the JSX fallback (`block?.heading ?? "Системи за…"`). Never lose the original copy.
6. **Visual Editing**: import `createDataAttribute`/`dataAttr` from `@/sanity/lib/utils`. For each editable field render a `data-sanity={dataAttr({id: pageId, type: pageType, path: 'pageBuilder[_key==\"'+block._key+'\"].<field>'}).toString()}` on the element. Block-level wrapper is already added by `BlockRenderer`; add field-level for headings, body, images, and array items. Section props always include `{ block, index, pageId, pageType }` (match `BlockRenderer` BlockProps).
7. SVG diagrams (hero camera/building, fire floorplan, PSIM arch, industry tiles): port the SVG markup faithfully; these are decorative — they do NOT need to be Sanity-editable (but surrounding text/labels that are real copy SHOULD be editable where reasonable).

## Schema rules (EVERY section → pageBuilder object type)
- New file `studio/src/schemaTypes/objects/nikom/<typeName>.ts` using `defineType({name, title, type:'object', icon, fields, preview})`.
- Field types: `string` (short text), `text` (multi-line), `array of block` via existing `blockContentTextOnly`/`blockContent` for rich text, `image` (with `options.hotspot:true`) for images, `array` of inline objects for repeated items (cards, steps, stats, pillars, faq, etc.). Give every repeated-item object a clear preview.
- Put the ORIGINAL source copy as `initialValue` on each field so a freshly created block already shows the real content.
- Naming (use EXACTLY these `name`s):
  - Home: `homeHero, homeTicker, homeSolutions, homeProcess, homeWhy, homeIndustries, homeProjectsFeatured, homeIntegration, homePartners, homeContact`
  - About: `aboutHero, aboutManifest, aboutEngagement, aboutSectors, aboutManufacturers, aboutCerts`
  - Services: `servicesHero, servicesCatalog, servicesArchitecture, servicesProject, servicesProcess, servicesFaq`
  - Projects: `projectsHero, projectsFeature, projectsMasonry, projectsSectorStats`
  - Blog: `blogHero, blogFeatured, blogList`
  - Contact: `contactHero, contactInfo, contactMaps, contactForm`
  - Shared CTA: `nikomCta` (used by About/Services/Projects/Blog/Contact end CTAs — one reusable type)
- Documents: `project` (NEW, for /proekti/[slug] + listings), `post` (EXISTS — extend for articles), `settings` (EXTEND for nav/contact/footer).
- **DO NOT edit shared registry files** (`schemaTypes/index.ts`, `BlockRenderer.tsx`, `page.ts`, `nikom.css`, route files) from a parallel section agent. Only the dedicated **Registry agent** edits those (serialized). Section agents create only their own new files.

## Routes (pages)
- `/` (home): make `[locale]/page.tsx` fetch the `page` doc with `pathname == "/"` and render NIKOM `<Header/>` + `<PageBuilder/>` (like `[...path]/page.tsx`). Remove the old demo sections.
- About `/za-nas`, Services `/uslugi`, Projects `/proekti`, Blog `/blog`, Contact `/kontakt`: `page` docs via existing `[...path]` route (already renders pageBuilder). Latin slugs.
- Project single `/proekti/[slug]`: NEW route → `project` doc template (ProjectHero/Facts/Scope/Quote/Gallery/Related/CTA).
- Article `/blog/[slug]`: extend existing `posts/[slug]` OR add `blog/[slug]` → `post` doc template (PostHero/Body/Related/CTA). Prefer reusing the existing post route + query; adjust pathname base to `/blog`.
- Shared chrome: NIKOM `Header` + `MobileMenu` at top, NIKOM `Footer` at bottom (already in `[locale]/layout.tsx` — replace the template Footer with NIKOM Footer; add Header in layout or per-page).

## Navigation / Settings (editable menus & footer)
Extend `settings` singleton (id `siteSettings`) with: `headerNav` (array of {label, href}), `phone`, `licenseText`,
`locations`, `ctaText`, `footerColumns`, `footerGhostText`, `social`. Seed with source values:
nav = Начало(/), За нас(/za-nas), Услуги(/uslugi), Проекти(/proekti), Блог(/blog), Контакт(/kontakt);
phone `+359894523970` (display `+359 89 45 23 970`); license `Лиценз № 2436-2017 · МВР`;
locations `Sofia · Plovdiv · Varna · Burgas`. Header/Footer/MobileMenu read these via `settingsQuery` (extend the GROQ).

## Content seeding (after schema is wired)
- Preferred tool for creating docs + uploading image assets: `cd studio && npx sanity exec <script>.mjs --with-user-token`
  (uses the logged-in CLI user = project owner = full write + asset upload). Probe first: `npx sanity debug 2>&1 | head`.
  If CLI is NOT authenticated, fall back to the Sanity MCP `create_documents_from_json` for text docs and rely on
  `/nikom/<file>` public images (image fields left empty, fallback renders the file). REPORT which path was used.
- Seed: `settings` (siteSettings), the 8 `page` docs with full `pageBuilder` arrays (every section block populated with
  real source copy), `project` docs (from `projects.jsx` data), `post` docs (from `blog.jsx` data). Publish them
  (remove `drafts.` prefix / use the script's `createOrReplace`).
- Every `pageBuilder` array item needs a unique `_key`.

## Verification criteria (Haiku verifiers check, per page)
PASS requires ALL of:
1. Every source section for the page exists as a ported component AND a registered pageBuilder block type.
2. `className`s preserved (CSS fidelity) — spot-check key classes from the source.
3. Every real text/number/image is a Sanity field (editable), with source copy as initialValue/fallback.
4. Field-level `data-sanity` present on headings/body/images (frontend live edit works).
5. Schema type registered in `index.ts` + `page.ts` `of[]` + `BlockRenderer`.
6. The seeded `page` doc contains the section blocks in the correct order matching the source page.
Report a structured list of any GAPS (file:issue) — do not fix, just report.

## BEST PRACTICES (Sanity + Next.js — MANDATORY)
1. **React keys = `_key`** for every mapped array item (pageBuilder blocks AND repeated inner items). Never index keys — it breaks Visual Editing + causes hydration bugs. Queries must select `_key` for array items.
2. **Stega cleaning**: import `stegaClean` from `next-sanity` (or `@sanity/client/stega`). Clean a value ONLY when it drives LOGIC — i.e. fields used in `if`/`switch`/className/`data-*`/object keys/3rd-party libs (e.g. NIKOM `theme` light|dark, `indAnim` variant, `contentAlignment`, any boolean-ish select). NEVER clean displayed text (`<h1>{block.heading}</h1>`), PortableText values, or image helper inputs — cleaning those kills click-to-edit.
3. **Metadata**: every `generateMetadata` `sanityFetch`/`sanityFetch` call uses `stega: false` (the existing layout already does — keep it). Never let stega chars into `<head>`.
4. **Block preview** on every object type: `preview: { select: {...}, prepare → { title, subtitle: '<Block name>', media: media ?? <Icon> } }`.
5. **Section component prop typing**: define a LOCAL `type Props = { block: { /* only fields used, all optional */ }, index: number, pageId: string, pageType: string }`. This decouples Phase-B components from TypeGen ordering. The `BlockRenderer` `Blocks` map (`as BlocksType`) absorbs the variance. Always read with fallback: `block?.heading ?? 'original source copy'`.
6. **Visual editing attributes**: field-level `data-sanity={dataAttr({ id: pageId, type: pageType, path: 'pageBuilder[_key=="'+block._key+'"].<field>' }).toString()}` on headings/body/images. For editable arrays (cards/steps/stats/pillars/gallery): put a `data-sanity` on the container (`...path` = the array) AND on each item (`...path[_key=="<itemKey>"]`), and select `_key` for those items in GROQ.
7. **TypeGen**: components/queries rely on `frontend/sanity.types.ts`. After ANY schema or query change, regenerate it. Phase C (Registry) runs: `cd studio && npx sanity schema extract && cd ../frontend && npx sanity typegen generate` (or the repo's typegen script) and commits `frontend/sanity.types.ts`. NEVER hand-edit `sanity.types.ts`. Use unique `defineQuery` variable names (scoped, e.g. `homePageQuery`, `projectBySlugQuery`).
8. **Images**: Sanity `image` fields render via the existing `@/app/components/SanityImage` or `urlFor()` (`@/sanity/lib/utils`) + `next/image`, honoring hotspot. When a Sanity image is absent, fall back to the copied `/nikom/<file>` (plain `<img>` is fine for the prototype's decorative/background images). Always provide `alt`.
9. **RSC boundaries (Next.js)**: keep components server by default; add `'use client'` ONLY for interactivity/animation/hooks. Data fetching (`sanityFetch`) happens in server components / page files, then pass serializable props to client section components. Do NOT fetch in client components except optional `usePresentationQuery`.
10. **Do NOT over-build**: skip per-block `usePresentationQuery` presentation queries (optimization only) to save budget — page-level `useOptimistic` (already in `PageBuilder`) + field `dataAttr` is sufficient for live edit.
11. **IDs**: let Sanity generate `_id` for all created docs (pages, projects, posts). Only fixed IDs: `siteSettings` (settings singleton). Model relations (project→related, post→author) as `reference` fields.
12. **Presentation locations**: when adding `project` document type, add it to `studio/sanity.config.ts` `locations` (defineLocations) so Presentation can navigate to `/proekti/<slug>` (mirror the existing `post` location).

## Definition of done
`pnpm --filter frontend type-check` passes; `pnpm --filter frontend build` (or `next build`) compiles; visiting `/bg`
shows the NIKOM homepage identical to `docs/nikom-sec/NIKOM Security.html`; all 8 pages render; Studio shows the
section blocks with real content, all editable.
