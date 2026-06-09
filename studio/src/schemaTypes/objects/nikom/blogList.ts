import { ThListIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export const blogList = defineType({
  name: 'blogList',
  title: 'Blog List',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Архив · 10 статии',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Намерете точно това, което Ви интересува.',
    }),
    defineField({
      name: 'initialCount',
      title: 'Initial posts to show',
      type: 'number',
      initialValue: 4,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'Blog List', subtitle: 'blogList' }
    },
  },
})
