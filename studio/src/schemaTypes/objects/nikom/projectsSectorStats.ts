import { defineField, defineType } from 'sanity'
import { BarChartIcon } from '@sanity/icons'

export const projectsSectorStats = defineType({
  name: 'projectsSectorStats',
  title: 'Projects Sector Stats',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Сектори · Разбивка',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Опит в най-различни критични среди.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 3,
      initialValue:
        'Всеки сектор има специфични нормативни изисквания и риск-профил. Подходът ни е адаптиран към всеки от тях.',
    }),
    defineField({
      name: 'sectors',
      title: 'Sector stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'sectorStat',
          title: 'Sector stat',
          fields: [
            defineField({ name: 'id', type: 'string', title: 'Sector id key', description: 'e.g. hotel, healthcare, government, retail, industrial' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'count', type: 'number', title: 'Count' }),
            defineField({ name: 'icon', type: 'string', title: 'Icon key', description: 'hotel | health | gov | retail | ind' }),
          ],
          preview: {
            select: { label: 'label', count: 'count' },
            prepare({ label, count }) {
              return { title: label, subtitle: String(count) }
            },
          },
        },
      ],
      initialValue: [
        { id: 'hotel', label: 'Хотели', count: 5, icon: 'hotel' },
        { id: 'healthcare', label: 'Здравеопазване', count: 2, icon: 'health' },
        { id: 'government', label: 'Държавни', count: 2, icon: 'gov' },
        { id: 'retail', label: 'Ритейл', count: 1, icon: 'retail' },
        { id: 'industrial', label: 'Складове', count: 1, icon: 'ind' },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: heading ?? 'Projects Sector Stats',
        subtitle: 'projectsSectorStats',
      }
    },
  },
})
