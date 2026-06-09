import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageBuilder } from '@/app/components/PageBuilder'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, nikomPostsListQuery, nikomPostCategoriesQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'

const PATHNAME = '/blog'

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { pathname: PATHNAME },
    stega: false,
  })
  return { title: page?.name ?? 'Блог', description: page?.heading ?? undefined }
}

export default async function BlogIndexPage() {
  const [{ data: page }, { data: posts }, { data: rawCategories }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params: { pathname: PATHNAME } }),
    sanityFetch({ query: nikomPostsListQuery }),
    sanityFetch({ query: nikomPostCategoriesQuery }),
  ])

  const categories = (rawCategories ?? []).map((c: { key?: string | null; title?: string | null }) => ({ id: c.key ?? '', label: c.title ?? '' }))

  if (!page?._id) return notFound()

  // Map the seeded `post` documents into the shape BlogList/BlogFeatured render.
  const mapped = (posts ?? []).map((p) => ({
    _id: p._id,
    title: p.title ?? '',
    excerpt: p.excerpt ?? '',
    authorName: p.authorName ?? '',
    date: p.date ?? undefined,
    readTime: p.readTime ?? 0,
    tags: p.tags ?? [],
    category: p.category ?? '',
    categoryLabel: p.categoryLabel ?? '',
    featured: p.featured ?? false,
    slug: p.slug ?? '',
    coverImageUrl: p.coverImage
      ? urlForImage(p.coverImage).width(900).height(560).fit('crop').url()
      : undefined,
  }))

  const featured = mapped.find((p) => p.featured) ?? mapped[0]

  const injected = {
    ...page,
    pageBuilder: (page.pageBuilder ?? []).map((b) => {
      if (b?._type === 'blogList') return { ...b, posts: mapped, categories }
      if (b?._type === 'blogFeatured') return { ...b, featuredPost: featured }
      return b
    }),
  }

  return <PageBuilder page={injected as unknown as GetPageQueryResult} />
}
