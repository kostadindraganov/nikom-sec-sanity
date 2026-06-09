import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesHero',
  title: 'Services Hero',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Услуги · 12 системни категории',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Широк кръг от услуги в системите за наблюдение и сигурност.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 3,
      initialValue:
        'Екипът на „НИКОМ Системи за Сигурност" е с 20-годишен опит в сферата на системите за сигурност и контрол. Специализираме във всяка област на системи за наблюдение и сигурност и предлагаме услуги с висок стандарт и богат опит.',
    }),
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Проектиране', 'Разработка и монтаж', 'Управление на проекти', 'Сервизно обслужване'],
    }),
    defineField({
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Services Hero', subtitle: 'servicesHero', media }
    },
  },
})
