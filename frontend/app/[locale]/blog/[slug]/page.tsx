/**
 * /[locale]/blog/[slug] — canonical NIKOM article route.
 * Post docs have pathname.current = /blog/<slug>, so this is the primary URL.
 * Delegates entirely to the same template as /posts/[slug].
 */
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import { sanityFetch } from '@/sanity/lib/live'
import { postQuery, postPathnames, relatedPostsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { PostHero } from '@/app/components/nikom/post/PostHero'
import { PostBody } from '@/app/components/nikom/post/PostBody'
import { PostRelated } from '@/app/components/nikom/post/PostRelated'
import NikomCta from '@/app/components/nikom/NikomCta'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPathnames,
    perspective: 'published',
    stega: false,
  })
  // Only return entries with /blog/ pathnames (this route's responsibility)
  return (data ?? [])
    .filter((p) => p.locale && p.slug && p.pathname?.startsWith('/blog/'))
    .map((p) => ({ locale: p.locale as string, slug: p.slug as string }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const pathname = `/blog/${params.slug}`
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { pathname, locale: params.locale },
    stega: false,
  })
  if (!post) return { title: undefined }

  const postAny = post as any
  const ogImage = resolveOpenGraphImage(postAny.seoImage ?? post.coverImage)

  return {
    title: postAny.seoTitle ?? post.title,
    description: postAny.seoDescription ?? post.excerpt ?? undefined,
    ...(postAny.noIndex ? { robots: 'noindex' } : {}),
    openGraph: {
      images: ogImage ? [ogImage] : [],
      type: 'article',
    },
    alternates: {
      canonical: `/${params.locale}/blog/${params.slug}`,
    },
  }
}

export default async function BlogSlugPage(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)

  const pathname = `/blog/${params.slug}`
  const { data: post } = await sanityFetch({
    query: postQuery,
    params: { pathname, locale: params.locale },
  })

  if (!post?._id) {
    return notFound()
  }

  const { data: relatedData } = await sanityFetch({
    query: relatedPostsQuery,
    params: { locale: params.locale, skip: post._id },
  })

  const docForComponents = {
    ...post,
    content: post.content as PortableTextBlock[] | null | undefined,
  }

  const postAny = post as any
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nikomsecurity.bg'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postAny.seoTitle ?? post.title,
    description: postAny.seoDescription ?? post.excerpt ?? undefined,
    datePublished: post.date ?? undefined,
    ...(postAny.author
      ? { author: { '@type': 'Person', name: `${postAny.author.firstName ?? ''} ${postAny.author.lastName ?? ''}`.trim() || 'NIKOM Security' } }
      : { author: { '@type': 'Organization', name: 'NIKOM Security' } }),
    publisher: { '@type': 'Organization', name: 'NIKOM Security', url: siteUrl },
    url: `${siteUrl}/${params.locale}/blog/${params.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PostHero doc={docForComponents} pageId={post._id} />
      <PostBody doc={docForComponents} pageId={post._id} />
      <PostRelated related={relatedData ?? []} pageId={post._id} />
      <NikomCta
        block={{
          _key: 'postCta',
          eyebrow: 'Имате въпрос?',
          heading: 'Обсъдете го с инженер от екипа.',
          sub: 'Безплатна първоначална консултация. Поверителността е стандарт.',
          buttonPrimary: { label: 'Заявете консултация', href: '/bg/kontakt' },
          buttonSecondary: { label: 'Всички статии', href: '/bg/blog' },
        }}
        index={0}
        pageId={post._id}
        pageType="post"
      />
    </>
  )
}
