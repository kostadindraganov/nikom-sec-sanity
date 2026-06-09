// Rendered-HTML visual check for the migrated NIKOM site.
// Waits for next dev on :3000, fetches every page, asserts NIKOM content + seeded data render.
const BASE = 'http://localhost:3000'
const EMPTY = 'This page has no content'

async function waitReady(timeoutMs = 90000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(BASE + '/bg', { redirect: 'manual' })
      if (r.status === 200 || r.status === 307 || r.status === 308) return true
    } catch {}
    await new Promise(r => setTimeout(r, 1500))
  }
  return false
}

async function get(path) {
  try {
    const r = await fetch(BASE + path, { redirect: 'follow' })
    const html = await r.text()
    return { status: r.status, html }
  } catch (e) {
    return { status: 0, html: '', err: String(e) }
  }
}

function has(html, ...needles) { return needles.every(n => html.includes(n)) }
function any(html, ...needles) { return needles.some(n => html.includes(n)) }
function firstMatch(html, re) { const m = html.match(re); return m ? m[1] : null }

const pages = [
  { path: '/bg', name: 'HOME', markers: [['Инженерни системи'], ['ticker', 'ticker-item'], ['solutions', 'bento'], ['proc-'], ['integration'], ['partners']] },
  { path: '/bg/za-nas', name: 'ABOUT', markers: [['about-hero'], ['manifest'], ['eng-'], ['license-band', 'lic-']] },
  { path: '/bg/uslugi', name: 'SERVICES', markers: [['services-hero', 'srv-hero'], ['srv-grid', 'srv-card'], ['srv-process-rail', 'rail-step'], ['faq-']] },
  { path: '/bg/proekti', name: 'PROJECTS', markers: [['prj-'], ['prj-card', 'prj-img']] },
  { path: '/bg/blog', name: 'BLOG', markers: [['blog-hero', 'bh-'], ['bl-card', 'bf-']] },
  { path: '/bg/kontakt', name: 'CONTACT', markers: [['contact-hero', 'ctc-hero'], ['ctc-form', 'ctc-field'], ['ctc-info']] },
]

const ready = await waitReady()
if (!ready) { console.log('SERVER NOT READY within timeout'); process.exit(1) }
console.log('Server ready. Checking pages...\n')

let pass = 0, fail = 0
const results = []
for (const p of pages) {
  const { status, html, err } = await get(p.path)
  const isEmpty = html.includes(EMPTY)
  const markerResults = p.markers.map(group => ({ group, ok: any(html, ...group) }))
  const missing = markerResults.filter(m => !m.ok).map(m => m.group.join('|'))
  const imgOk = any(html, '/nikom/', 'cdn.sanity.io')
  const ok = status === 200 && !isEmpty && missing.length === 0
  results.push({ name: p.name, path: p.path, status, bytes: html.length, isEmpty, missing, imgOk, ok, err })
  if (ok) pass++; else fail++
}

// project single + article: discover a slug from the listing pages
const projHtml = (await get('/bg/proekti')).html
const projSlug = firstMatch(projHtml, /\/bg\/proekti\/([a-z0-9-]+)/)
if (projSlug) {
  const { status, html } = await get('/bg/proekti/' + projSlug)
  const ok = status === 200 && any(html, 'single-hero', 'sh-hero', 'sh-h1', 'sf-grid')
  results.push({ name: 'PROJECT/' + projSlug, path: '/bg/proekti/' + projSlug, status, bytes: html.length, missing: ok ? [] : ['single-hero markers'], imgOk: any(html, '/nikom/', 'cdn.sanity.io'), ok })
  ok ? pass++ : fail++
} else { results.push({ name: 'PROJECT', ok: false, missing: ['no /proekti/<slug> link found on listing'] }); fail++ }

const blogHtml = (await get('/bg/blog')).html
const postSlug = firstMatch(blogHtml, /\/bg\/blog\/([a-z0-9-]+)/)
if (postSlug) {
  const { status, html } = await get('/bg/blog/' + postSlug)
  const ok = status === 200 && any(html, 'post-hero', 'ph-h1', 'post-body', 'post-main')
  results.push({ name: 'ARTICLE/' + postSlug, path: '/bg/blog/' + postSlug, status, bytes: html.length, missing: ok ? [] : ['post-hero markers'], imgOk: any(html, '/nikom/', 'cdn.sanity.io'), ok })
  ok ? pass++ : fail++
} else { results.push({ name: 'ARTICLE', ok: false, missing: ['no /blog/<slug> link found on listing'] }); fail++ }

console.log('PAGE'.padEnd(22), 'STATUS'.padEnd(7), 'BYTES'.padEnd(8), 'IMG', 'RESULT')
for (const r of results) {
  console.log(
    r.name.padEnd(22),
    String(r.status ?? '-').padEnd(7),
    String(r.bytes ?? '-').padEnd(8),
    (r.imgOk ? 'yes' : 'no ').padEnd(3),
    r.ok ? 'PASS' : 'FAIL ' + (r.isEmpty ? '[EMPTY-STATE] ' : '') + (r.missing?.length ? 'missing: ' + r.missing.join(', ') : '') + (r.err || '')
  )
}
console.log(`\n==> ${pass} PASS / ${fail} FAIL out of ${results.length}`)
process.exit(fail === 0 ? 0 : 2)
