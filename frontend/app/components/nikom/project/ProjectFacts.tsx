import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type Fact = {
  _key: string
  label?: string | null
  value?: string | null
}

type System = {
  _key: string
  name?: string | null
}

type Props = {
  doc: {
    _id?: string
    year?: string | null
    sectorLabel?: string | null
    systems?: System[] | null
    facts?: Fact[] | null
  }
  pageId: string
}

export function ProjectFacts({ doc, pageId }: Props) {
  const systems = doc?.systems ?? []
  const facts = doc?.facts ?? []
  const year = doc?.year ?? '2024'
  const sectorLabel = doc?.sectorLabel ?? 'Сигурност'
  return (
    <section className="section-pad single-facts">
      <div className="container">
        <div className="sf-grid">
          <div className="sf-left">
            <div className="eyebrow">Обхват · Реализирани системи</div>
            <h2 className="h2">Какво изградихме.</h2>
            <div
              className="sf-systems-list"
              data-sanity={dataAttr({ id: pageId, type: 'project', path: 'systems' }).toString()}
            >
              {systems.map((s, i) => (
                <div
                  className="sf-sys-row"
                  key={s._key}
                  data-sanity={dataAttr({ id: pageId, type: 'project', path: `systems[_key=="${s._key}"]` }).toString()}
                >
                  <span className="sf-sys-num meta">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sf-sys-name">{s.name ?? 'Система'}</span>
                  <span className="sf-sys-bar" />
                  <Icons.Check />
                </div>
              ))}
            </div>
          </div>
          <aside className="sf-right">
            <div className="sf-card dot-border">
              <div className="meta">FACT SHEET</div>
              <div className="sf-fact-list">
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Период</span>
                  <span
                    className="sf-fact-v"
                    data-sanity={dataAttr({ id: pageId, type: 'project', path: 'year' }).toString()}
                  >
                    {year}
                  </span>
                </div>
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Сектор</span>
                  <span
                    className="sf-fact-v"
                    data-sanity={dataAttr({ id: pageId, type: 'project', path: 'sectorLabel' }).toString()}
                  >
                    {sectorLabel}
                  </span>
                </div>
                <div className="sf-fact-row">
                  <span className="sf-fact-l">Брой системи</span>
                  <span className="sf-fact-v">{systems.length}</span>
                </div>
                {facts.map((f) => (
                  <div
                    className="sf-fact-row"
                    key={f._key}
                    data-sanity={dataAttr({ id: pageId, type: 'project', path: `facts[_key=="${f._key}"]` }).toString()}
                  >
                    <span className="sf-fact-l">{f.label ?? 'Поле'}</span>
                    <span className="sf-fact-v">{f.value ?? '—'}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
