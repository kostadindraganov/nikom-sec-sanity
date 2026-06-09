import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Нюзлетър абонати',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'email',
      title: 'Имейл',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Дата на абонамент',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'active',
      title: 'Активен',
      type: 'boolean',
      initialValue: true,
      description: 'Изключи, за да деактивираш без да изтриваш.',
    }),
  ],
  orderings: [
    {
      title: 'Най-нови',
      name: 'subscribedAtDesc',
      by: [{ field: 'subscribedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'email', subtitle: 'subscribedAt', active: 'active' },
    prepare({ title, subtitle, active }) {
      return {
        title,
        subtitle: [subtitle ? subtitle.slice(0, 10) : '', active === false ? '(неактивен)' : '']
          .filter(Boolean)
          .join(' '),
      }
    },
  },
})
