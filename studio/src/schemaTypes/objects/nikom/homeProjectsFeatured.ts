import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const homeProjectsFeatured = defineType({
  name: 'homeProjectsFeatured',
  title: 'Home — Featured Projects',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Проекти · Избрани',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Доказани решения в обекти с висока критичност.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Featured Projects', subtitle: 'Автоматично от Featured проекти' }
    },
  },
})
