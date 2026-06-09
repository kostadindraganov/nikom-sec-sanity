import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Details' },
    { name: 'media', title: 'Media' },
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
    defineField({
      name: 'sector',
      title: 'Sector key',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Здравеопазване', value: 'healthcare' },
          { title: 'Хотели', value: 'hotel' },
          { title: 'Ритейл', value: 'retail' },
          { title: 'Складове', value: 'industrial' },
          { title: 'Държавни', value: 'government' },
        ],
      },
    }),
    defineField({
      name: 'sectorLabel',
      title: 'Sector label (Bulgarian)',
      type: 'string',
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
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
          ],
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
  ],
  preview: {
    select: {
      title: 'title',
      sector: 'sectorLabel',
      media: 'heroImage',
      slug: 'slug',
    },
    prepare({ title, sector, media, slug }) {
      const path = slug?.current ? `/bg/proekti/${slug.current}` : ''
      return {
        title: title ?? 'Project',
        subtitle: [sector, path].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
