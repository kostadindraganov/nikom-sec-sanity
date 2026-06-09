// migrate-pagebuilder-images.mjs — upload /nikom images as assets and wire them into pageBuilder
// Run: cd studio && npx sanity exec scripts/migrate-pagebuilder-images.mjs --with-user-token
//
// Uploads every .jpg in frontend/public/nikom (skips logo.png), then sets the image
// fields on the relevant pageBuilder blocks. Array images are resolved from each item's
// existing `imageFallback` string; single hero images use a fixed filename mapping.
// Existing _key/_type are preserved. Re-running re-uploads assets (idempotent enough for a one-off).

import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const NIKOM_IMG_DIR = path.resolve(__dirname, '../../frontend/public/nikom')

const client = getCliClient({ apiVersion: '2025-09-25' })

const imageRef = assetId => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId } })

// imageFallback may be "proj-x.jpg" or "/nikom/proj-x.jpg" — reduce to bare filename.
const basename = p => (p || '').split('/').filter(Boolean).pop()

// Fixed single-image fields: blockType -> { field, filename }
const FIXED = {
  aboutHero: { field: 'image', file: 'about-hero.jpg' },
  servicesHero: { field: 'image', file: 'services-hero.jpg' },
  projectsHero: { field: 'backgroundImage', file: 'projects-hero.jpg' },
  blogHero: { field: 'backgroundImage', file: 'proj-tokuda.jpg' },
  blogFeatured: { field: 'fallbackImage', file: 'proj-tokuda.jpg' },
}

async function uploadImages() {
  const files = fs.readdirSync(NIKOM_IMG_DIR).filter(f => /\.jpg$/i.test(f)) // skip logo.png + brand logos (none)
  const assetMap = {}
  console.log(`Uploading ${files.length} images from ${NIKOM_IMG_DIR} …`)
  for (const filename of files) {
    const asset = await client.assets.upload('image', fs.createReadStream(path.join(NIKOM_IMG_DIR, filename)), {
      filename,
    })
    assetMap[filename] = asset._id
    console.log(`  ✓ ${filename} → ${asset._id}`)
  }
  return assetMap
}

function refFor(assetMap, file, where) {
  const id = assetMap[file]
  if (!id) {
    console.warn(`  ⚠ no uploaded asset for "${file}" (${where}) — left empty`)
    return null
  }
  return imageRef(id)
}

async function migrate(assetMap) {
  const pages = await client.fetch(`*[_type == "page"]{_id, name, pageBuilder}`)
  console.log(`\nWiring images into ${pages.length} pages …`)

  for (const page of pages) {
    let set = 0
    const pageBuilder = (page.pageBuilder || []).map(block => {
      const fixed = FIXED[block._type]
      if (fixed) {
        const ref = refFor(assetMap, fixed.file, `${block._type}.${fixed.field}`)
        if (ref) {
          set++
          return { ...block, [fixed.field]: ref }
        }
        return block
      }

      if (block._type === 'projectsFeature' && block.imageFallback) {
        const ref = refFor(assetMap, basename(block.imageFallback), 'projectsFeature.image')
        if (ref) { set++; return { ...block, image: ref } }
      }

      if (block._type === 'homeProjectsFeatured' && Array.isArray(block.projects)) {
        const projects = block.projects.map(p => {
          const ref = p.imageFallback ? refFor(assetMap, basename(p.imageFallback), `homeProjectsFeatured[${p._key}].image`) : null
          if (ref) { set++; return { ...p, image: ref } }
          return p
        })
        return { ...block, projects }
      }

      if (block._type === 'projectsMasonry' && Array.isArray(block.items)) {
        const items = block.items.map(it => {
          const ref = it.imageFallback ? refFor(assetMap, basename(it.imageFallback), `projectsMasonry[${it._key}].image`) : null
          if (ref) { set++; return { ...it, image: ref } }
          return it
        })
        return { ...block, items }
      }

      return block
    })

    await client.patch(page._id).set({ pageBuilder }).commit()
    console.log(`✓ ${page._id} (${page.name}) — set ${set} image field(s)`)
  }
}

async function main() {
  console.log('=== NIKOM pageBuilder IMAGE migration ===\n')
  const assetMap = await uploadImages()
  await migrate(assetMap)
  console.log('\n=== Done ===')
}

main().catch(err => {
  console.error('IMAGE MIGRATION FAILED:', err)
  process.exit(1)
})
