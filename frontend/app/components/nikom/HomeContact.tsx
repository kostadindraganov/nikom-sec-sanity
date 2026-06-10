'use client'

import { useState } from 'react'
import { StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'
import { dataAttr } from '@/sanity/lib/utils'

type ContactItem = { _key?: string; icon?: string; label?: string; value?: string }

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    copy?: string
    contactItems?: ContactItem[]
    formSubmitLabel?: string
    formSuccessHeading?: string
    formSuccessBody?: string
  }
  index: number
  pageId: string
  pageType: string
}

function Field({ label, placeholder, required, name, type }: { label: string; placeholder: string; required?: boolean; name: string; type?: string }) {
  return (
    <div className="field">
      <label>{label}{required && <span className="req">*</span>}</label>
      <input name={name} type={type ?? 'text'} placeholder={placeholder} required={required} />
    </div>
  )
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select name={name}>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </div>
  )
}

export default function HomeContact({ block, index: _index, pageId, pageType }: Props) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const basePath = `pageBuilder[_key=="${block?._key}"]`

  const contactItems: ContactItem[] = block?.contactItems ?? []

  const successRef = `REQ-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`

  return (
    <section className="section-pad contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.eyebrow` }).toString()}
            >
              {block?.eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? ''} />
            </h2>
            <p
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.copy` }).toString()}
            >
              {block?.copy}
            </p>

            <div
              className="contact-info"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.contactItems` }).toString()}
            >
              {contactItems.map((item, i) => {
                const isPhone = item.label === 'Телефон'
                const isEmail = item.label === 'Имейл'
                return (
                  <div
                    key={item._key ?? item.label ?? i}
                    data-sanity={item._key ? dataAttr({ id: pageId, type: pageType, path: `${basePath}.contactItems[_key=="${item._key}"]` }).toString() : undefined}
                  >
                    <div className="meta">{item.label}</div>
                    {isPhone ? (
                      <a href={`tel:${(item.value ?? '').replace(/\s/g, '')}`} className="ci-big">{item.value}</a>
                    ) : isEmail ? (
                      <a href={`mailto:${item.value}`} className="ci-big">{item.value}</a>
                    ) : (
                      <div className="ci-mid">{item.value}</div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="privacy">
              <Icons.Shield /> Вашата информация се обработва конфиденциално и не се споделя с трети страни.
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={async (e) => {
              e.preventDefault()
              setSending(true)
              setError(null)
              const form = e.currentTarget
              const data = {
                type: (form.elements.namedItem('type') as HTMLSelectElement)?.value,
                name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
                email: (form.elements.namedItem('email') as HTMLInputElement)?.value,
                phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value,
                company: (form.elements.namedItem('company') as HTMLInputElement)?.value,
                message: (form.elements.namedItem('message') as HTMLTextAreaElement)?.value,
              }
              try {
                const res = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                })
                if (!res.ok) throw new Error()
                setSent(true)
              } catch {
                setError('Грешка при изпращане. Моля опитайте отново.')
              } finally {
                setSending(false)
              }
            }}
          >
            <div className="form-head">
              <span className="chip solid">Заявка за консултация</span>
              <span className="meta">FORM · 06 fields</span>
            </div>
            {sent ? (
              <div className="form-success">
                <div className="check-circle"><Icons.Check /></div>
                <h3
                  className="h3"
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.formSuccessHeading` }).toString()}
                >
                  {block?.formSuccessHeading}
                </h3>
                <p
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.formSuccessBody` }).toString()}
                >
                  {block?.formSuccessBody}
                </p>
                <div className="meta" style={{ marginTop: 24 }}>
                  Референция: {successRef}
                </div>
              </div>
            ) : (
              <>
                <div className="row-2">
                  <Field label="Ime" placeholder="Иван Иванов" name="name" required />
                  <Field label="Фирма" placeholder="Опционално" name="company" />
                </div>
                <div className="row-2">
                  <Field label="Телефон" placeholder="+359 ..." name="phone" required />
                  <Field label="Имейл" placeholder="email@firma.bg" name="email" type="email" required />
                </div>
                <SelectField
                  label="Тип обект"
                  name="type"
                  options={['Изберете…', 'Офис сграда', 'Болница', 'Хотел / резиденция', 'Ритейл / магазин', 'Индустриален обект', 'Държавна институция', 'Жилищен комплекс', 'Друго']}
                />
                <div className="field">
                  <label>Кратко описание <span className="opt">опционално</span></label>
                  <textarea name="message" rows={4} placeholder="Брой етажи, площ, системи от интерес, срокове…" />
                </div>
                {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}
                <button className="btn btn-primary btn-lg" type="submit" disabled={sending}>
                  {sending ? 'Изпращане...' : <>{block?.formSubmitLabel} <Icons.Arrow /></>}
                </button>
                <div className="form-foot">
                  <span className="meta">Средно време за отговор: ~3ч 12мин</span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
