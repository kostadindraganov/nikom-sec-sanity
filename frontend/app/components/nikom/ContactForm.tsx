'use client'

import { useState } from 'react'
import { Icons } from '@/app/components/nikom/icons'
import { StreamText } from '@/app/components/nikom/animations'
import { dataAttr } from '@/sanity/lib/utils'
import { stegaClean } from 'next-sanity'

type Department = {
  _key: string
  id?: string
  label?: string
}

type Props = {
  block: {
    _key?: string
    eyebrow?: string
    heading?: string
    lead?: string
    departments?: Department[]
    fieldLabelName?: string
    fieldLabelSurname?: string
    fieldLabelEmail?: string
    fieldLabelPhone?: string
    fieldLabelCompany?: string
    fieldLabelAddress?: string
    fieldLabelMessage?: string
    submitText?: string
    trustTitle?: string
    trustText?: string
    successHeading?: string
    successText?: string
    avgResponseTime?: string
  }
  index: number
  pageId: string
  pageType: string
}

interface FieldProps {
  label?: string
  required?: boolean
  type?: string
  placeholder?: string
  name?: string
}
function CFormField({ label, required, type, placeholder, name }: FieldProps) {
  return (
    <div className="ctc-field">
      <label>{label}{required && <span className="ctc-req">*</span>}</label>
      <input name={name} type={type ?? 'text'} placeholder={placeholder} required={required} />
    </div>
  )
}

interface TextareaProps {
  label?: string
  placeholder?: string
  name?: string
}
function CFormTextarea({ label, placeholder, name }: TextareaProps) {
  return (
    <div className="ctc-field">
      <label>{label} <span className="ctc-opt">опционално</span></label>
      <textarea name={name} rows={4} placeholder={placeholder} />
    </div>
  )
}

export default function ContactForm({ block, index, pageId, pageType }: Props) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [type, setType] = useState('consultation')

  const path = (field: string) =>
    dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].${field}` }).toString()

  const departments = block?.departments ?? []

  const successRef = `REQ-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`

  return (
    <section className="section-pad ctc-form-section">
      <div className="container">
        <div className="ctc-form-grid">
          {/* Left column */}
          <div className="ctc-form-left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>
              {block?.eyebrow}
            </div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={block?.heading} />
            </h2>
            <p className="ctc-form-lead" data-sanity={path('lead')}>
              {block?.lead}
            </p>

            <div className="ctc-type-pills">
              <span className="meta">Тип на запитване:</span>
              <div
                className="ctc-type-row"
                data-sanity={path('departments')}
              >
                {departments.map((dept) => {
                  const deptId = stegaClean(dept.id) ?? dept._key
                  return (
                    <button
                      key={dept._key}
                      type="button"
                      className={'chip ' + (type === deptId ? 'solid' : '')}
                      onClick={() => setType(deptId)}
                      data-sanity={dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${block._key}"].departments[_key=="${dept._key}"].label` }).toString()}
                    >
                      {dept.label ?? dept.id}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="ctc-trust">
              <Icons.Shield />
              <div>
                <strong data-sanity={path('trustTitle')}>
                  {block?.trustTitle}
                </strong>
                <span data-sanity={path('trustText')}>
                  {block?.trustText}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="ctc-form"
            onSubmit={async (e) => {
              e.preventDefault()
              setSending(true)
              setError(null)
              const form = e.currentTarget
              const data = {
                type,
                name: (form.elements.namedItem('name') as HTMLInputElement)?.value,
                surname: (form.elements.namedItem('surname') as HTMLInputElement)?.value,
                email: (form.elements.namedItem('email') as HTMLInputElement)?.value,
                phone: (form.elements.namedItem('phone') as HTMLInputElement)?.value,
                company: (form.elements.namedItem('company') as HTMLInputElement)?.value,
                address: (form.elements.namedItem('address') as HTMLInputElement)?.value,
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
            <div className="ctc-form-head">
              <span className="chip solid">FORM · 07 полета</span>
              <span className="meta">ENCRYPTED · TLS</span>
            </div>

            {sent ? (
              <div className="ctc-form-success">
                <div className="ctc-success-circle"><Icons.Check /></div>
                <h3 className="h3" data-sanity={path('successHeading')}>
                  {block?.successHeading}
                </h3>
                <p data-sanity={path('successText')}>
                  {block?.successText}
                </p>
                <div className="meta" style={{marginTop: 24}}>
                  Referenc: {successRef}
                </div>
              </div>
            ) : (
              <>
                <div className="ctc-form-row-2">
                  <CFormField
                    label={block?.fieldLabelName}
                    required
                    name="name"
                    placeholder="Иван"
                  />
                  <CFormField
                    label={block?.fieldLabelSurname}
                    required
                    name="surname"
                    placeholder="Иванов"
                  />
                </div>
                <div className="ctc-form-row-2">
                  <CFormField
                    label={block?.fieldLabelEmail}
                    required
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                  />
                  <CFormField
                    label={block?.fieldLabelPhone}
                    name="phone"
                    placeholder="+359 ..."
                  />
                </div>
                <CFormField
                  label={block?.fieldLabelCompany}
                  name="company"
                  placeholder="Опционално"
                />
                <CFormField
                  label={block?.fieldLabelAddress}
                  name="address"
                  placeholder="Опционално"
                />
                <CFormTextarea
                  label={block?.fieldLabelMessage}
                  name="message"
                  placeholder="Брой етажи, площ, системи от интерес, срокове..."
                />
                {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}
                <button className="btn btn-primary btn-lg" type="submit" disabled={sending} data-sanity={path('submitText')}>
                  {sending ? 'Изпращане...' : <>{block?.submitText} <Icons.Arrow /></>}
                </button>
                <div className="ctc-form-foot">
                  <span className="meta">Средно време за отговор:</span>
                  <span className="ctc-form-foot-v" data-sanity={path('avgResponseTime')}>
                    {block?.avgResponseTime}
                  </span>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
