import { StarIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const blogHero = defineType({
  name: 'blogHero',
  title: 'Blog Hero',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'БЛОГ · NIKOM SECURITY',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Инженерни статии за сигурност, пожарна безопасност и интеграция.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue: 'Технически прегледи, case studies и експертни мнения от екипа на НИКОМ.',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'Blog Hero', subtitle: 'blogHero' }
    },
  },
})
