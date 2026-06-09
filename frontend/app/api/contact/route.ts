import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'

async function getContactEmail(): Promise<string> {
  const data = await client.fetch<{ contactEmail?: string }>(
    `*[_type == "settings"][0]{ contactEmail }`,
    {},
    { next: { revalidate: 60 } }
  )
  return data?.contactEmail ?? 'nikomsecuritysystems@gmail.com'
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, surname, email, phone, company, address, message, type } = body

  if (!name || !surname || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const toEmail = await getContactEmail()

  const rows = [
    ['Тип', type || '—'],
    ['Имена', `${name} ${surname}`],
    ['Имейл', email],
    ['Телефон', phone || '—'],
    ['Фирма', company || '—'],
    ['Адрес', address || '—'],
    ['Съобщение', message || '—'],
  ]

  const table = rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;white-space:nowrap">${k}</td><td style="padding:6px 12px">${v}</td></tr>`)
    .join('')

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: toEmail,
    replyTo: email,
    subject: `Ново запитване от ${name} ${surname} — Nikom Security`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="margin-bottom:24px">Ново контактно запитване</h2>
        <table style="border-collapse:collapse;width:100%;background:#f9f9f9;border-radius:8px">
          <tbody>${table}</tbody>
        </table>
        <p style="margin-top:24px;color:#666;font-size:13px">
          Изпратено от контактната форма на nikomsecurity.com
        </p>
      </div>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
