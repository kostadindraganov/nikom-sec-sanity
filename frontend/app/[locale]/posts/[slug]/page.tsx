import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { PortableTextBlock } from 'next-sanity'

import { sanityFetch } from '@/sanity/lib/live'
import { postQuery, postPathnames, relatedPostsQuery } from '@/sanity/lib/queries'
import { routing, type Locale } from '@/i18n/routing'
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
  return (data ?? [])
    .filter((p) => p.locale && p.slug)
    .map((p) => ({ locale: p.locale as string, slug: p.slug as string }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  // Support both /blog/<slug> and /posts/<slug> pathnames
  const blogPathname = `/blog/${params.slug}`
  const postsPathname = `/posts/${params.slug}`

  let post = null
  const { data: blogPost } = await sanityFetch({
    query: postQuery,
    params: { pathname: blogPathname, locale: params.locale },
    stega: false,
  })
  post = blogPost
  if (!post) {
    const { data: postsPost } = await sanityFetch({
      query: postQuery,
      params: { pathname: postsPathname, locale: params.locale },
      stega: false,
    })
    post = postsPost
  }

  if (!post) return { title: undefined }

  type RawTranslation = { locale: string | null; pathname: string | null }
  const rawTranslations = (post.translations ?? []) as RawTranslation[] | null
  const languages: Record<string, string> = {
    [params.locale]: `/${params.locale}/posts/${params.slug}`,
  }
  for (const tr of rawTranslations ?? []) {
    if (tr?.locale && tr?.pathname && (routing.locales as readonly string[]).includes(tr.locale)) {
      languages[tr.locale] = `/${tr.locale}${tr.pathname}`
    }
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { languages },
  }
}

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (routing.locales as readonly string[]).includes(value)
}

type RawTranslation = { locale: string | null; pathname: string | null }

export default async function PostPage(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)
  await getTranslations('Post')

  // Support both /blog/<slug> (NIKOM) and /posts/<slug> (legacy) pathnames
  const blogPathname = `/blog/${params.slug}`
  const postsPathname = `/posts/${params.slug}`

  let post = null
  const { data: blogPost } = await sanityFetch({
    query: postQuery,
    params: { pathname: blogPathname, locale: params.locale },
  })
  post = blogPost
  if (!post) {
    const { data: postsPost } = await sanityFetch({
      query: postQuery,
      params: { pathname: postsPathname, locale: params.locale },
    })
    post = postsPost
  }

  if (!post?._id) {
    return notFound()
  }

  // Fetch related posts
  const { data: relatedData } = await sanityFetch({
    query: relatedPostsQuery,
    params: { locale: params.locale, skip: post._id },
  })

  const rawTranslations = (post.translations ?? []) as RawTranslation[] | null
  const translations = (rawTranslations ?? [])
    .filter((tr): tr is { locale: string; pathname: string } => !!tr?.locale && !!tr?.pathname)
    .filter((tr) => isLocale(tr.locale))

  const docForComponents = {
    ...post,
    content: post.content as PortableTextBlock[] | null | undefined,
  }

  void translations // translations available for Header if needed

  return (
    <>
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
