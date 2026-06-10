import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Название (български)',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'key',
      title: 'Ключ (slug за CSS/филтри)',
      type: 'slug',
      description: 'Автоматично от названието — напр. healthcare, hotel. Не го сменяй след създаване.',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Category Label (legacy)',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'title', key: 'key' },
    prepare({ title, key }) {
      return { title, subtitle: key?.current }
    },
  },
})
