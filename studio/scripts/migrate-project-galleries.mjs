// migrate-project-galleries.mjs
// Uploads highest-resolution archive banners and populates gallery[] on every project.
// Run: cd studio && npx sanity exec scripts/migrate-project-galleries.mjs --with-user-token

import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ARCHIVE = path.resolve(__dirname, '../../docs/Archive/images/site/assets/files')

const client = getCliClient({ apiVersion: '2025-09-25' })

// Project ID → array of { file (relative to ARCHIVE), caption }
// Using 1600x500 as the best single-image resolution; hipoland also has 4 extra 600x420 shots.
const GALLERY_MAP = {
  'project-tokuda': [
    { file: '1163/siti_klinik_bolnitca_tokuda-1.1600x500.jpg', caption: 'Болница Токуда — интегрирана система за сигурност' },
  ],
  'project-hipoland': [
    { file: '1164/lulin_bojurishte-_2.1600x500.jpg', caption: 'Верига ХИПОЛЕНД — охранителни системи' },
    { file: '1216/hippoland1.600x420.jpg', caption: 'Хиполенд — пожароизвестяване' },
    { file: '1216/bg-mall-_4-1.600x420.jpg', caption: 'Хиполенд — видеонаблюдение' },
    { file: '1216/img_1670.600x420.jpg', caption: 'Хиполенд — контрол на достъп' },
    { file: '1216/lulin_bojurishte-_2-1.600x420.jpg', caption: 'Хиполенд — монтаж на оборудване' },
  ],
  'project-hematology': [
    { file: '1238/onkobolnitsa.1600x500.jpg', caption: 'НСБАЛХЗ — системи за пожарна безопасност' },
  ],
  'project-poland': [
    { file: '1241/polland_emassy.1600x500.jpg', caption: 'Посолство на Полша — интегрирана защита' },
  ],
  'project-gopet': [
    { file: '1244/gopet-1-res.1600x500.jpg', caption: 'GOPET TRANS — складова охрана' },
  ],
  'project-izvorite': [
    { file: '1247/images75o56pdx.1600x500.jpg', caption: 'Хотел ИЗВОРИТЕ — комплексна система за сигурност' },
  ],
  'project-anel-sofia': [
    { file: '1250/ed55ozr.1600x500.jpg', caption: 'Хотел АНЕЛ 5★ — интегрирана система за сигурност' },
  ],
  'project-crystal': [
    { file: '1253/crystal_palace.1600x500.jpg', caption: 'Кристал Палас — пожароизвестяване и видеонаблюдение' },
  ],
  'project-arena': [
    { file: '1256/arena_di_serdika-1.1600x500.jpg', caption: 'Arena di Serdika — системи за безопасност' },
  ],
  'project-sozopol': [
    { file: '1259/anel_sozopol.1600x500.jpg', caption: 'Хотел АНЕЛ Созопол — охранителна система' },
  ],
  'project-defence': [
    { file: '1261/pojarogasene_fk_12_-1_-5.1600x500.jpg', caption: 'Министерство на отбраната — газово пожарогасене' },
  ],
}

async function uploadFile(filepath) {
  const stream = fs.createReadStream(filepath)
  const filename = path.basename(filepath)
  const asset = await client.assets.upload('image', stream, { filename })
  return asset._id
}

async function main() {
  console.log('=== NIKOM gallery migration ===\n')

  // Build asset map: filepath → assetId (upload once per unique file)
  const uploadedFiles = {}

  for (const [projectId, items] of Object.entries(GALLERY_MAP)) {
    console.log(`\n── ${projectId}`)

    const galleryItems = []

    for (let i = 0; i < items.length; i++) {
      const { file, caption } = items[i]
      const filepath = path.join(ARCHIVE, file)

      if (!fs.existsSync(filepath)) {
        console.warn(`  ⚠ file not found: ${filepath}`)
        continue
      }

      let assetId = uploadedFiles[file]
      if (!assetId) {
        assetId = await uploadFile(filepath)
        uploadedFiles[file] = assetId
        console.log(`  ↑ uploaded ${path.basename(file)} → ${assetId}`)
      } else {
        console.log(`  ✓ reuse ${path.basename(file)} → ${assetId}`)
      }

      galleryItems.push({
        _key: `gal-${i}`,
        _type: 'galleryItem',
        caption,
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      })
    }

    if (galleryItems.length === 0) {
      console.log(`  ⚠ no gallery items — skipping patch`)
      continue
    }

    await client.patch(projectId).set({ gallery: galleryItems }).commit()
    console.log(`  ✓ patched gallery (${galleryItems.length} item${galleryItems.length !== 1 ? 's' : ''})`)
  }

  // Verify
  const results = await client.fetch(
    `*[_type=="project"]{_id, "galleryCount": count(gallery)} | order(_id)`
  )
  console.log('\n── Verification ──────────────────')
  for (const r of results) {
    const ok = r.galleryCount > 0 ? '✓' : '✗'
    console.log(`  ${ok} ${r._id}: ${r.galleryCount} gallery item(s)`)
  }

  console.log('\n=== Done ===')
}

main().catch(err => {
  console.error('MIGRATION FAILED:', err)
  process.exit(1)
})
