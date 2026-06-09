import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
import { definePathname } from '@tinloof/sanity-studio'

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
const DEFAULT_LOCALE_ID = 'bg'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Details' },
    { name: 'media', title: 'Media' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 120,
      },
      validation: Rule => Rule.required(),
    }),
    definePathname({
      name: 'pathname',
      group: 'content',
      description: 'The URL path for this project. Must start with /proekti/.',
      options: {
        source: (doc: any) => {
          if (!doc?.slug?.current) return ''
          return `proekti/${doc.slug.current}`
        },
        prefix: `${PREVIEW_URL}/${DEFAULT_LOCALE_ID}`,
        autoNavigate: true,
      },
      validation: Rule =>
        Rule.custom((slug: any) => {
          if (!slug?.current) return true
          if (!slug.current.startsWith('/proekti/')) {
            return 'Path must start with /proekti/ prefix.'
          }
          return true
        }),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{ type: 'projectCategory' }],
      group: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Year / period',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (начална страница)',
      type: 'boolean',
      group: 'details',
      initialValue: false,
      description: 'Ако е включено, проектът се появява в "Проекти · Избрани" на началната страница.',
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Ред в Featured (1 = пръв, fluid карта)',
      type: 'number',
      group: 'details',
      description: 'По-малкото число = по-напред. Проектът с ред 1 се показва като широка fluid карта.',
    }),
    defineField({
      name: 'classified',
      title: 'Classified',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'heroImageFallback',
      title: 'Hero image fallback path',
      type: 'string',
      group: 'media',
      description: 'Fallback /nikom/proj-*.jpg path when Sanity image is absent',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'facts',
      title: 'Fact sheet items',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          name: 'factItem',
          title: 'Fact',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: label, subtitle: value }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'scope',
      title: 'Scope / systems',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          name: 'scopeItem',
          title: 'Scope item',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'System name' }),
            defineField({ name: 'desc', type: 'text', title: 'Description', rows: 2 }),
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }) {
              return { title }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Client quote',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'text', type: 'text', title: 'Quote text', rows: 4 }),
        defineField({ name: 'author', type: 'string', title: 'Author name' }),
        defineField({ name: 'role', type: 'string', title: 'Author role' }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          name: 'galleryItem',
          title: 'Gallery image',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'caption' },
            prepare({ media, title }: { media: unknown; title?: string }) {
              return { title: title ?? 'Gallery image', media }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'kpis',
      title: 'KPI counters',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          name: 'kpiCounter',
          title: 'KPI counter',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value (numeric part)', description: 'e.g. 2000' }),
            defineField({ name: 'suffix', type: 'string', title: 'Suffix', description: 'e.g. +, m², %' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
          ],
          preview: {
            select: { value: 'value', suffix: 'suffix', label: 'label' },
            prepare({ value, suffix, label }) {
              return { title: `${value}${suffix ?? ''}`, subtitle: label }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related projects',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sector: 'category.title',
      media: 'heroImage',
      slug: 'slug',
      featured: 'featured',
      featuredOrder: 'featuredOrder',
    },
    prepare({ title, sector, media, slug, featured, featuredOrder }) {
      const path = slug?.current ? `/bg/proekti/${slug.current}` : ''
      const star = featured ? `★${featuredOrder ? ` #${featuredOrder}` : ''} ` : ''
      return {
        title: `${star}${title ?? 'Project'}`,
        subtitle: [sector, path].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
