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

const DEFAULT_CONTACT_ITEMS: ContactItem[] = [
  { label: 'Телефон', value: '+359 89 45 23 970' },
  { label: 'Имейл', value: 'office@nikom-security.com' },
  { label: 'Централа', value: 'гр. София, ул. Инженерна 14, ет. 3' },
  { label: 'Работно време', value: 'Пн–Пт · 09:00—18:00  |  Сервиз · 24/7' },
]

function Field({ label, placeholder, required }: { label: string; placeholder: string; required?: boolean }) {
  return (
    <div className="field">
      <label>{label}{required && <span className="req">*</span>}</label>
      <input type="text" placeholder={placeholder} required={required} />
    </div>
  )
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="field">
      <label>{label}</label>
      <select>{options.map((o) => <option key={o}>{o}</option>)}</select>
    </div>
  )
}

export default function HomeContact({ block, index: _index, pageId, pageType }: Props) {
  const [sent, setSent] = useState(false)
  const basePath = `pageBuilder[_key=="${block?._key}"]`

  const contactItems: ContactItem[] =
    block?.contactItems && block.contactItems.length > 0
      ? block.contactItems
      : DEFAULT_CONTACT_ITEMS

  return (
    <section className="section-pad contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-copy">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.eyebrow` }).toString()}
            >
              {block?.eyebrow ?? 'Контакт · Инженер на линия'}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.heading` }).toString()}
            >
              <StreamText text={block?.heading ?? 'Обсъдете Вашия проект с инженер.'} />
            </h2>
            <p
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.copy` }).toString()}
            >
              {block?.copy ?? 'Получавате обратна връзка до 4 работни часа в работни дни. За спешни случаи на действащи обекти — директен телефон към дежурен инженер.'}
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
                      <a href={`tel:${(item.value ?? '').replace(/\s/g, '')}`} className="ci-big">{item.value ?? '+359 89 45 23 970'}</a>
                    ) : isEmail ? (
                      <a href={`mailto:${item.value}`} className="ci-big">{item.value ?? 'office@nikom-security.com'}</a>
                    ) : (
                      <div className="ci-mid">{item.value}</div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="privacy">
              <Icons.Shield /> Вашата информация се обработва конфиденциално и не се споделя с трети страни.
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
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
                  {block?.formSuccessHeading ?? 'Получихме заявката Ви.'}
                </h3>
                <p
                  data-sanity={dataAttr({ id: pageId, type: pageType, path: `${basePath}.formSuccessBody` }).toString()}
                >
                  {block?.formSuccessBody ?? 'Инженер от екипа ще се свърже с Вас в рамките на 4 работни часа.'}
                </p>
              </div>
            ) : (
              <>
                <div className="row-2">
                  <Field label="Име" placeholder="Иван Иванов" />
                  <Field label="Фирма" placeholder="Опционално" />
                </div>
                <div className="row-2">
                  <Field label="Телефон" placeholder="+359 ..." required />
                  <Field label="Имейл" placeholder="email@firma.bg" required />
                </div>
                <SelectField
                  label="Тип обект"
                  options={['Изберете…', 'Офис сграда', 'Болница', 'Хотел / резиденция', 'Ритейл / магазин', 'Индустриален обект', 'Държавна институция', 'Жилищен комплекс', 'Друго']}
                />
                <div className="field">
                  <label>Кратко описание <span className="opt">опционално</span></label>
                  <textarea rows={4} placeholder="Брой етажи, площ, системи от интерес, срокове…" />
                </div>
                <button className="btn btn-primary btn-lg" type="submit">
                  {block?.formSubmitLabel ?? 'Изпрати заявката'} <Icons.Arrow />
                </button>
                <div className="form-foot">
                  <span className="meta">Средно време за отговор: ~3ч 12мин</span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
