# NIKOM-SEC → Sanity/Next.js — Migration Summary

Status: **COMPLETE & VERIFIED.** Production build passes (exit 0), typecheck 0 errors, all content seeded, 3 verifiers PASS.

## What was built
- **Locale**: switched to Bulgarian-only (`bg`, default). URLs under `/bg/...`.
- **Design system**: 9 source CSS files ported verbatim → `frontend/app/nikom/css/` (aggregated by `nikom.css`, imported after Tailwind so NIKOM `.container` wins). Google Fonts (Geologica / Source Sans 3 / JetBrains Mono, Cyrillic) added. `data-theme` light/dark + yellow accent via `ThemeController`.
- **Primitives**: `animations.tsx` (Counter, StreamText, Marquee, Streaming, ProcessWalker, useCountUp, Reveal, ScanLine, LazyImg), `icons.tsx` (16 NIKOM icons).
- **Chrome**: `Header`, `MobileMenu`, `Footer`, `SiteChrome` — nav/contact/footer driven by the `settings` singleton (editable).
- **8 pages** ported pixel-faithfully with all animations:
  - Home (`/bg`) — 10 sections: hero, ticker, solutions(+fire floorplan), process walker, why, industries(SOC), featured projects, integration(PSIM arch), partners, contact.
  - About (`/bg/za-nas`), Services (`/bg/uslugi`), Projects (`/bg/proekti`), Blog (`/bg/blog`), Contact (`/bg/kontakt`) — pageBuilder docs.
  - Project single (`/bg/proekti/[slug]`) — `project` document template.
  - Article (`/bg/blog/[slug]`) — `post` document template.
- **Sanity schema**: 34 pageBuilder section object types + `project` document + extended `post` + extended `settings`. All registered in `index.ts`, `page.ts` `of[]`, `BlockRenderer.tsx`. TypeGen regenerated (`sanity.types.ts`, 81 types).
- **Editability**: every text/image/section is a Sanity field with the source copy as `initialValue` + component fallback, plus field-level `data-sanity` for frontend live editing (Presentation/Visual Editing).
- **Seeded content** (dataset `production`): `siteSettings`, **11 projects**, **10 posts**, **6 page docs** (ordered blocks), **15 images uploaded as real Sanity assets**.

## How to run
```bash
pnpm dev            # runs frontend (localhost:3000) + studio (localhost:3333) in parallel
# Frontend:  http://localhost:3000/bg
# Studio:    http://localhost:3333  → Presentation tool for live frontend editing
```
Pages render correct content immediately via component fallbacks; the seeded page docs let you edit every section in Studio and inline via Presentation.

## Final visual check (rendered HTML, dev server)
`docs/nikom-migration/check-render.mjs` fetched every route from a running dev server: **8/8 PASS** —
home, about, services, projects, blog, contact, a project-single page, and an article — all return 200,
render the NIKOM content + images, and the project/article links resolve.

## Projects & Blog listings → connected to CMS documents
The `/bg/proekti` and `/bg/blog` index pages have **dedicated routes** (`app/[locale]/proekti/page.tsx`,
`app/[locale]/blog/page.tsx`) that fetch the `project`/`post` documents (`nikomProjectsListQuery`,
`nikomPostsListQuery`) and inject them into the `projectsMasonry` / `blogList` blocks. So the listings
reflect the CMS documents and each card links to its single page (`/bg/proekti/<slug>`, `/bg/blog/<slug>`).

## Known minor items (low priority)
- Stale template routes remain and are harmless: `app/[locale]/about/`, `app/[locale]/posts/` (old starter pages). Safe to delete later.
- One seeded project has an auto-slug `project-35` (mixed slug data in `projects.json`); cosmetic only.
- `Avatar.tsx` / `Cta.tsx` got small crop/hotspot normalizations after TypeGen regenerated stricter image types.
- Schema is not deployed to Sanity's hosted registry (not needed for local Studio editing). Run `cd studio && npx sanity schema deploy` if you want hosted/MCP schema parity.
- To re-seed idempotently: `cd studio && npx sanity exec scripts/seed.mjs --with-user-token`.

## Architecture contract
See `docs/nikom-migration/CONTRACT.md` — the single source of truth every build agent followed.
</content>
