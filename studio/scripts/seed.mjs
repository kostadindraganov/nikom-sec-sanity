// seed.mjs — NIKOM content seeder
// Run: cd studio && npx sanity exec scripts/seed.mjs --with-user-token

import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = getCliClient({ apiVersion: '2025-09-25' })

// ─── helpers ────────────────────────────────────────────────────────────────

function key(prefix, i) {
  return `${prefix}-${i}`
}

function imageRef(assetId) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

// ─── 1. UPLOAD IMAGES ───────────────────────────────────────────────────────

const NIKOM_IMG_DIR = path.resolve(__dirname, '../../frontend/public/nikom')

async function uploadImages() {
  const files = fs.readdirSync(NIKOM_IMG_DIR).filter(f => /\.(jpg|png)$/i.test(f))
  const assetMap = {}
  let uploaded = 0

  console.log(`\nUploading ${files.length} images from ${NIKOM_IMG_DIR} …`)

  for (const filename of files) {
    const filepath = path.join(NIKOM_IMG_DIR, filename)
    try {
      const asset = await client.assets.upload('image', fs.createReadStream(filepath), { filename })
      assetMap[filename] = asset._id
      uploaded++
      console.log(`  ✓ ${filename} → ${asset._id}`)
    } catch (err) {
      console.error(`  ✗ ${filename}: ${err.message}`)
    }
  }

  console.log(`Uploaded ${uploaded}/${files.length} images.\n`)
  return assetMap
}

// ─── 2. SETTINGS ────────────────────────────────────────────────────────────

async function seedSettings(assetMap) {
  const doc = {
    _id: 'siteSettings',
    _type: 'settings',
    title: 'NIKOM Security',
    siteName: 'NIKOM Security',
    headerNav: [
      { _key: 'nav-0', _type: 'navItem', label: 'Начало', href: '/' },
      { _key: 'nav-1', _type: 'navItem', label: 'За нас', href: '/za-nas' },
      { _key: 'nav-2', _type: 'navItem', label: 'Услуги', href: '/uslugi' },
      { _key: 'nav-3', _type: 'navItem', label: 'Проекти', href: '/proekti' },
      { _key: 'nav-4', _type: 'navItem', label: 'Блог', href: '/blog' },
      { _key: 'nav-5', _type: 'navItem', label: 'Контакт', href: '/kontakt' },
    ],
    phone: '+359894523970',
    phoneDisplay: '+359 89 45 23 970',
    ctaText: 'Заявете консултация',
    licenseText: 'Лиценз № 2436-2017 · МВР',
    locations: 'Sofia · Plovdiv · Varna · Burgas',
    liveText: 'LIVE — Дежурен инженер на линия',
    footerTagline:
      'Инженерен партньор за интегрирани системи за сигурност, пожарна безопасност и контрол на достъп.',
    footerGhostText: 'NIKOM',
    footerGhostSub: 'СИСТЕМИ ЗА СИГУРНОСТ',
    social: [
      { _key: 'soc-0', _type: 'socialLink', label: 'LinkedIn', href: '#' },
      { _key: 'soc-1', _type: 'socialLink', label: 'Facebook', href: '#' },
      { _key: 'soc-2', _type: 'socialLink', label: 'YouTube', href: '#' },
    ],
    footerColumns: [
      {
        _key: 'fc-0',
        _type: 'footerColumn',
        title: 'Навигация',
        links: [
          { _key: 'fcl-0', _type: 'navItem', label: 'Начало', href: '/' },
          { _key: 'fcl-1', _type: 'navItem', label: 'За нас', href: '/za-nas' },
          { _key: 'fcl-2', _type: 'navItem', label: 'Услуги', href: '/uslugi' },
          { _key: 'fcl-3', _type: 'navItem', label: 'Проекти', href: '/proekti' },
          { _key: 'fcl-4', _type: 'navItem', label: 'Блог', href: '/blog' },
          { _key: 'fcl-5', _type: 'navItem', label: 'Контакт', href: '/kontakt' },
        ],
      },
      {
        _key: 'fc-1',
        _type: 'footerColumn',
        title: 'Услуги',
        links: [
          { _key: 'fcs-0', _type: 'navItem', label: 'Пожароизвестяване', href: '/uslugi' },
          { _key: 'fcs-1', _type: 'navItem', label: 'Видеонаблюдение', href: '/uslugi' },
          { _key: 'fcs-2', _type: 'navItem', label: 'Контрол на достъп', href: '/uslugi' },
          { _key: 'fcs-3', _type: 'navItem', label: 'Паник системи', href: '/uslugi' },
          { _key: 'fcs-4', _type: 'navItem', label: 'Озвучаване', href: '/uslugi' },
          { _key: 'fcs-5', _type: 'navItem', label: 'Структурно окабеляване', href: '/uslugi' },
          { _key: 'fcs-6', _type: 'navItem', label: 'Интеграция (PSIM)', href: '/uslugi' },
        ],
      },
    ],
  }

  await client.createOrReplace(doc)
  console.log('✓ settings (siteSettings)')
}

// ─── 3. PROJECTS ────────────────────────────────────────────────────────────

const PROJECTS_JSON = path.resolve(__dirname, '../../docs/nikom-migration/data/projects.json')

async function seedProjects(assetMap) {
  const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON, 'utf8'))

  for (const p of projects) {
    // heroImage: derive filename from heroImageFallback like /nikom/proj-tokuda.jpg
    const heroFilename = p.heroImageFallback ? path.basename(p.heroImageFallback) : null
    const heroAssetId = heroFilename ? assetMap[heroFilename] : null

    const doc = {
      _id: `project-${p.id}`,
      _type: 'project',
      title: p.title,
      slug: { _type: 'slug', current: p.slug },
      pathname: { _type: 'slug', current: `/proekti/${p.slug}` },
      sector: p.sector || undefined,
      sectorLabel: p.sectorLabel || undefined,
      year: p.year || undefined,
      classified: p.classified ?? false,
      heroImageFallback: p.heroImageFallback || undefined,
      summary: p.summary || undefined,
      facts: (p.facts || []).map((f, i) => ({
        _key: `fact-${i}`,
        _type: 'factItem',
        label: f.label,
        value: f.value,
      })),
      scope: (p.scope || []).map((s, i) => ({
        _key: `scope-${i}`,
        _type: 'scopeItem',
        title: s.title,
        desc: s.desc || undefined,
      })),
      kpis: (p.kpis || []).map((k, i) => ({
        _key: `kpi-${i}`,
        _type: 'kpiCounter',
        value: k.value,
        suffix: k.suffix || undefined,
        label: k.label,
      })),
      gallery: [],
    }

    if (heroAssetId) {
      doc.heroImage = imageRef(heroAssetId)
    }

    if (p.quote && p.quote.text) {
      doc.quote = {
        _type: 'object',
        text: p.quote.text,
        author: p.quote.author,
        role: p.quote.role,
      }
    }

    await client.createOrReplace(doc)
    console.log(`✓ project ${doc._id} (${p.title})`)
  }
}

// ─── 4. POSTS ───────────────────────────────────────────────────────────────

const POSTS_JSON = path.resolve(__dirname, '../../docs/nikom-migration/data/posts.json')

async function seedPosts(assetMap) {
  const posts = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf8'))

  for (const p of posts) {
    const slugCurrent = p.slug?.current || p.slug
    // coverImage: derive filename from coverImageUrl like /nikom/proj-tokuda.jpg
    const coverFilename = p.coverImageUrl ? path.basename(p.coverImageUrl) : null
    const coverAssetId = coverFilename ? assetMap[coverFilename] : null

    const doc = {
      _id: `post-${slugCurrent}`,
      _type: 'post',
      locale: 'bg',
      title: p.title,
      slug: { _type: 'slug', current: slugCurrent },
      pathname: { _type: 'slug', current: `/blog/${slugCurrent}` },
      excerpt: p.excerpt || undefined,
      date: p.date || new Date().toISOString(),
      authorName: p.authorName || undefined,
      category: p.category || undefined,
      categoryLabel: p.categoryLabel || undefined,
      tags: p.tags || [],
      readTime: p.readTime || undefined,
      featured: p.featured ?? false,
      coverImageUrl: p.coverImageUrl || undefined,
      // Minimal blockContent body using the excerpt as a paragraph
      content: p.excerpt
        ? [
            {
              _key: 'body-0',
              _type: 'block',
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _key: 'span-0',
                  _type: 'span',
                  text: p.excerpt,
                  marks: [],
                },
              ],
            },
          ]
        : undefined,
    }

    if (coverAssetId) {
      doc.coverImage = {
        ...imageRef(coverAssetId),
        alt: p.title,
      }
    }

    await client.createOrReplace(doc)
    console.log(`✓ post ${doc._id}`)
  }
}

// ─── 5. PAGES ───────────────────────────────────────────────────────────────

async function seedPages() {
  const pages = [
    {
      _id: 'page-home',
      name: 'Начало',
      heading: 'Инженерни системи за сигурност',
      path: '/',
      blocks: [
        'homeHero',
        'homeTicker',
        'homeSolutions',
        'homeProcess',
        'homeWhy',
        'homeIndustries',
        'homeProjectsFeatured',
        'homeIntegration',
        'homePartners',
        'homeContact',
      ],
    },
    {
      _id: 'page-za-nas',
      name: 'За нас',
      heading: 'За NIKOM Security',
      path: '/za-nas',
      blocks: [
        'aboutHero',
        'aboutManifest',
        'aboutEngagement',
        'aboutSectors',
        'aboutManufacturers',
        'aboutCerts',
        'nikomCta',
      ],
    },
    {
      _id: 'page-uslugi',
      name: 'Услуги',
      heading: 'Услуги',
      path: '/uslugi',
      blocks: [
        'servicesHero',
        'servicesCatalog',
        'servicesArchitecture',
        'servicesProject',
        'servicesProcess',
        'servicesFaq',
        'nikomCta',
      ],
    },
    {
      _id: 'page-proekti',
      name: 'Проекти',
      heading: 'Проекти',
      path: '/proekti',
      blocks: ['projectsHero', 'projectsFeature', 'projectsMasonry', 'projectsSectorStats', 'nikomCta'],
    },
    {
      _id: 'page-blog',
      name: 'Блог',
      heading: 'Блог',
      path: '/blog',
      blocks: ['blogHero', 'blogFeatured', 'blogList', 'nikomCta'],
    },
    {
      _id: 'page-kontakt',
      name: 'Контакт',
      heading: 'Контакт',
      path: '/kontakt',
      blocks: ['contactHero', 'contactInfo', 'contactMaps', 'contactForm'],
    },
  ]

  for (const page of pages) {
    const doc = {
      _id: page._id,
      _type: 'page',
      name: page.name,
      heading: page.heading,
      pathname: { _type: 'slug', current: page.path },
      pageBuilder: page.blocks.map((blockType, i) => ({
        _key: `${page._id}-block-${i}`,
        _type: blockType,
      })),
    }

    await client.createOrReplace(doc)
    console.log(`✓ page ${doc._id} (${page.name}) — ${page.blocks.length} blocks`)
  }
}

// ─── 6. VERIFY ──────────────────────────────────────────────────────────────

async function verify() {
  const counts = await client.fetch(
    '{"pages":count(*[_type=="page"]),"projects":count(*[_type=="project"]),"posts":count(*[_type=="post"]),"settings":count(*[_type=="settings"])}'
  )
  console.log('\n── VERIFICATION ──────────────────────────────────────────')
  console.log(JSON.stringify(counts, null, 2))
  return counts
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== NIKOM Sanity Seed ===')
  console.log('Project: 4z2j1ytf  Dataset: production\n')

  const assetMap = await uploadImages()

  console.log('Seeding settings …')
  await seedSettings(assetMap)

  console.log('\nSeeding projects …')
  await seedProjects(assetMap)

  console.log('\nSeeding posts …')
  await seedPosts(assetMap)

  console.log('\nSeeding pages …')
  await seedPages()

  await verify()
  console.log('\n=== Done ===')
}

main().catch(err => {
  console.error('SEED FAILED:', err)
  process.exit(1)
})
