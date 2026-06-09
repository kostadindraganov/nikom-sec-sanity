// migrate-pagebuilder-content.mjs — populate empty pageBuilder blocks with content
// Run: cd studio && npx sanity exec scripts/migrate-pagebuilder-content.mjs --with-user-token
//
// Reads scripts/content/page-*.json (keyed by block _type), then for every `page`
// document merges the matching content into each pageBuilder block, preserving the
// existing _key and _type so Visual Editing data-attributes keep working.
// Image fields are intentionally NOT touched (they need uploaded assets — separate step).

import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.resolve(__dirname, 'content')

const client = getCliClient({ apiVersion: '2025-09-25' })

// ─── 1. Build merged content map keyed by block _type ─────────────────────────

function loadContent() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
  const map = {}
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
    for (const [blockType, fields] of Object.entries(data)) {
      if (map[blockType]) {
        console.warn(`⚠ duplicate content for "${blockType}" — keeping first, ignoring ${file}`)
        continue
      }
      map[blockType] = fields
    }
  }
  return map
}

// ─── 2. Merge content into each page's pageBuilder blocks ─────────────────────

async function migrate() {
  const content = loadContent()
  console.log(`Loaded content for ${Object.keys(content).length} block types\n`)

  const pages = await client.fetch(`*[_type == "page"]{_id, name, pageBuilder}`)
  console.log(`Found ${pages.length} page documents\n`)

  for (const page of pages) {
    const blocks = page.pageBuilder || []
    let touched = 0
    const missing = []

    const newPageBuilder = blocks.map(block => {
      const fields = content[block._type]
      if (!fields) {
        missing.push(block._type)
        return block
      }
      touched++
      // Preserve existing _key/_type; overlay content fields on top.
      return { ...block, ...fields, _key: block._key, _type: block._type }
    })

    await client
      .patch(page._id)
      .set({ pageBuilder: newPageBuilder })
      .commit()

    console.log(
      `✓ ${page._id} (${page.name}) — populated ${touched}/${blocks.length} blocks` +
        (missing.length ? ` · no content for: ${[...new Set(missing)].join(', ')}` : '')
    )
  }
}

// ─── 3. Verify ────────────────────────────────────────────────────────────────

async function verify() {
  const sample = await client.fetch(
    `*[_type == "page" && _id == "page-home"][0]{
      "blocks": pageBuilder[]{_type, _key, "hasEyebrow": defined(eyebrow), "hasHeading": defined(heading)}
    }`
  )
  console.log('\n── VERIFY page-home (eyebrow/heading populated per block) ──')
  for (const b of sample.blocks) {
    console.log(`  ${b._type.padEnd(22)} eyebrow:${b.hasEyebrow ? '✓' : '–'} heading:${b.hasHeading ? '✓' : '–'}`)
  }
}

async function main() {
  console.log('=== NIKOM pageBuilder content migration ===\n')
  await migrate()
  await verify()
  console.log('\n=== Done ===')
}

main().catch(err => {
  console.error('MIGRATION FAILED:', err)
  process.exit(1)
})
