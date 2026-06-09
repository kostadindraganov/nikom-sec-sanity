import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

const rssPostsQuery = `
  *[_type == "post" && locale == "bg" && defined(pathname.current)]
  | order(coalesce(date, _updatedAt) desc) [0...50] {
    _id,
    "title": coalesce(title, "Untitled"),
    "pathname": pathname.current,
    excerpt,
    "date": coalesce(date, _updatedAt),
    "author": coalesce(
      author->firstName + " " + author->lastName,
      authorName,
      "NIKOM Security"
    )
  }
`

export const revalidate = 3600

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nikomsecurity.bg'

  const posts: Array<{
    _id: string
    title: string
    pathname: string
    excerpt?: string | null
    date: string
    author?: string | null
  }> = await client.fetch(rssPostsQuery, {}, { perspective: 'published', stega: false })

  const now = new Date().toUTCString()

  const items = (posts ?? [])
    .map((post) => {
      const url = `${baseUrl}/bg${post.pathname}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : now
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.excerpt ?? ''}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author ?? 'NIKOM Security'}]]></author>
    </item>`
    })
    .join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NIKOM Security — Блог</title>
    <link>${baseUrl}/bg/blog</link>
    <description>Инженерни системи за сигурност, пожарна безопасност и контрол на достъп.</description>
    <language>bg</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
