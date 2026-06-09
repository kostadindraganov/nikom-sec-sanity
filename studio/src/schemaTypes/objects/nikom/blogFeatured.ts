import { BookIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const blogFeatured = defineType({
  name: 'blogFeatured',
  title: 'Blog Featured Post',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Избрана статия',
    }),
    defineField({
      name: 'featuredPost',
      title: 'Featured post',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'If empty, the first post with featured=true is used as fallback.',
    }),
    // Fallback fields for when no post document is referenced yet
    defineField({
      name: 'fallbackTitle',
      title: 'Fallback title',
      type: 'string',
      initialValue: 'Какво е EN 54 и защо имаме нужда от сертифицирани системи',
    }),
    defineField({
      name: 'fallbackExcerpt',
      title: 'Fallback excerpt',
      type: 'text',
      rows: 3,
      initialValue: 'Подробно обяснение на европейския стандарт за пожароизвестителни системи и какво трябва да знае всеки управител на сграда.',
    }),
    defineField({
      name: 'fallbackImage',
      title: 'Fallback image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'fallbackAuthor',
      title: 'Fallback author',
      type: 'string',
      initialValue: 'инж. Николай Васев',
    }),
    defineField({
      name: 'fallbackDate',
      title: 'Fallback date',
      type: 'date',
      initialValue: '2026-04-12',
    }),
    defineField({
      name: 'fallbackReadMin',
      title: 'Fallback read time (min)',
      type: 'number',
      initialValue: 8,
    }),
    defineField({
      name: 'fallbackTags',
      title: 'Fallback tags',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['EN 54', 'Пожароизвестяване', 'Сертификати'],
    }),
    defineField({
      name: 'fallbackCategory',
      title: 'Fallback category',
      type: 'string',
      initialValue: 'Стандарти',
    }),
    defineField({
      name: 'fallbackSlug',
      title: 'Fallback post slug (for link)',
      type: 'string',
      initialValue: 'kakvo-e-en54-i-zashto-imame-nuzhda',
    }),
  ],
  preview: {
    select: { title: 'fallbackTitle', media: 'fallbackImage' },
    prepare({ title, media }) {
      return { title: title ?? 'Blog Featured', subtitle: 'blogFeatured', media }
    },
  },
})
