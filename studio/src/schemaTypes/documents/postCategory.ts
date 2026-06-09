import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const postCategory = defineType({
  name: 'postCategory',
  title: 'Blog Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Название (за показване)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Ключ (slug за CSS/филтри)',
      type: 'slug',
      description: 'Автоматично от названието — напр. standards, tech. Не го сменяй след създаване.',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', key: 'key' },
    prepare({ title, key }) {
      return { title, subtitle: key?.current }
    },
  },
})
