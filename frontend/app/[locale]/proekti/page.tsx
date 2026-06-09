import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PageBuilder } from '@/app/components/PageBuilder'
import { sanityFetch } from '@/sanity/lib/live'
import { getPageQuery, nikomProjectsListQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/utils'
import { GetPageQueryResult } from '@/sanity.types'

const PATHNAME = '/proekti'

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: getPageQuery,
    params: { pathname: PATHNAME },
    stega: false,
  })
  return { title: page?.name ?? 'Проекти', description: page?.heading ?? undefined }
}

export default async function ProjectsIndexPage() {
  const [{ data: page }, { data: projects }] = await Promise.all([
    sanityFetch({ query: getPageQuery, params: { pathname: PATHNAME } }),
    sanityFetch({ query: nikomProjectsListQuery }),
  ])

  if (!page?._id) return notFound()

  // Map the seeded `project` documents into the card shape ProjectsMasonry renders,
  // linking each card to its project-single page. Stays editable via the block field.
  const items = (projects ?? []).map((p, i) => ({
    _key: p._id ?? `proj-${i}`,
    title: p.title ?? '',
    sector: p.sector ?? 'other',
    sectorLabel: p.sectorLabel ?? '',
    year: p.year ?? '',
    classified: p.classified ?? false,
    imageFallback: p.heroImage
      ? urlForImage(p.heroImage).width(900).height(620).fit('crop').url()
      : undefined,
    href: `/bg/proekti/${p.slug}`,
    systems: (p.systems as string[] | undefined) ?? [],
    kpis: p.kpis ?? [],
  }))

  const injected = {
    ...page,
    pageBuilder: (page.pageBuilder ?? []).map((b) =>
      b?._type === 'projectsMasonry' ? { ...b, items } : b
    ),
  }

  return <PageBuilder page={injected as unknown as GetPageQueryResult} />
}
