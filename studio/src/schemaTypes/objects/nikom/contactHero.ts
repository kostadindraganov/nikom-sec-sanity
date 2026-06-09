import { defineType, defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'
const Phone = EarthGlobeIcon

export default defineType({
  name: 'contactHero',
  title: 'Contact — Hero',
  type: 'object',
  icon: Phone,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Контакт · Инженер на линия',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Свържете се с нас за нов или съществуващ проект.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Дискретността и конфиденциалността са гарантирани. Ще споделим нашия опит накратко или в обширна консултация — както Ви е удобно.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone (href)',
      type: 'string',
      initialValue: '+359894523970',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone (display)',
      type: 'string',
      initialValue: '+359 89 45 23 970',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'office@nikom-security.com',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'contactHero', subtitle: 'Contact — Hero' }
    },
  },
})
