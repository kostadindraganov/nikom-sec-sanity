import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'

import { apiVersion, dataset, projectId } from '@/sanity/lib/api'

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN,
})

export async function POST(req: Request) {
  const body = await req.json()
  const { email } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Невалиден имейл адрес.' }, { status: 400 })
  }

  // Check for duplicate
  const existing = await writeClient.fetch<{ _id: string } | null>(
    `*[_type == "newsletterSubscriber" && email == $email][0]{ _id }`,
    { email }
  )

  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true })
  }

  await writeClient.create({
    _type: 'newsletterSubscriber',
    email,
    subscribedAt: new Date().toISOString(),
    active: true,
  })

  return NextResponse.json({ ok: true })
}
