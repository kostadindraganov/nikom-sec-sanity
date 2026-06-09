/**
 * Премахва legacy полетата `sector` и `sectorLabel` от project документите.
 * Те са заменени от `category` reference към projectCategory — всички 11
 * проекта вече имат зададена category със съвпадащ ключ.
 *
 * Изпълнение: npx sanity exec scripts/remove-legacy-sector-fields.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function run() {
  const ids: string[] = await client.fetch(
    `*[_type == "project" && (defined(sector) || defined(sectorLabel))]._id`,
  )

  if (ids.length === 0) {
    console.log('Няма документи с legacy sector полета. Нищо за правене.')
    return
  }

  console.log(`Премахвам sector/sectorLabel от ${ids.length} документа:`)
  ids.forEach((id) => console.log(`  - ${id}`))

  const tx = client.transaction()
  ids.forEach((id) => tx.patch(id, (p) => p.unset(['sector', 'sectorLabel'])))
  await tx.commit()

  console.log('Готово.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
