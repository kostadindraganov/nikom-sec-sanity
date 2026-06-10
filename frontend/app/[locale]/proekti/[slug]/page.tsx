import type { Metadata } from 'next'
import type { PortableTextBlock } from 'next-sanity'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { sanityFetch } from '@/sanity/lib/live'
import { projectBySlugQuery, projectSlugPathnames } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { ProjectHero } from '@/app/components/nikom/project/ProjectHero'
import { ProjectFacts } from '@/app/components/nikom/project/ProjectFacts'
import { ProjectScope } from '@/app/components/nikom/project/ProjectScope'
import { ProjectQuote } from '@/app/components/nikom/project/ProjectQuote'
import { ProjectGallery } from '@/app/components/nikom/project/ProjectGallery'
import { ProjectDocs } from '@/app/components/nikom/project/ProjectDocs'
import { ProjectRelated } from '@/app/components/nikom/project/ProjectRelated'
import { ProjectCta } from '@/app/components/nikom/project/ProjectCta'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: projectSlugPathnames,
    perspective: 'published',
    stega: false,
  })
  return (data ?? [])
    .filter((p: { slug: string | null }) => p.slug)
    .map((p: { slug: string | null }) => ({ slug: p.slug as string }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    stega: false,
  })

  if (!project) return { title: undefined }

  const projectAny = project as any
  const ogImage = resolveOpenGraphImage(projectAny.seoImage ?? project.heroImage)

  return {
    title: projectAny.seoTitle ?? project.title ?? undefined,
    description: projectAny.seoDescription ?? project.summary ?? undefined,
    ...(projectAny.noIndex ? { robots: 'noindex' } : {}),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `/${params.locale}/proekti/${params.slug}`,
    },
  }
}

export default async function ProjectSinglePage(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)

  const { data: project } = await sanityFetch({
    query: projectBySlugQuery,
    params: { slug: params.slug },
  })

  if (!project?._id) {
    return notFound()
  }

  const pageId = project._id

  // Build index for project number display (fallback to 0)
  const doc = {
    ...project,
    body: project.body as PortableTextBlock[] | null | undefined,
    index: 0,
  }

  return (
    <>
      <ProjectHero doc={doc} pageId={pageId} />
      <ProjectFacts doc={doc} pageId={pageId} />
      <ProjectScope doc={doc} pageId={pageId} />
      <ProjectQuote doc={doc} pageId={pageId} />
      <ProjectGallery doc={doc} pageId={pageId} />
      <ProjectDocs doc={doc} pageId={pageId} />
      <ProjectRelated doc={doc} pageId={pageId} />
      <ProjectCta />
    </>
  )
}
