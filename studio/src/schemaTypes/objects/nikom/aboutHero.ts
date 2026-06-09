import { defineType, defineField, defineArrayMember } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutHero',
  title: 'About Hero',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'За нас · Инженерна компания от 2005',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Над 20 години инженеринг в системите за сигурност, контрол и пожарна безопасност.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      initialValue: '„НИКОМ Системи за Сигурност" ЕООД е инженерингова компания, създадена през 2005 г. от инженери с отлична професионална квалификация и дългогодишен опит в предоставянето на цялостни решения в сигурността. Свидетели сме на бързите промени в продуктите и услугите — и развълнувани от възможностите, които те дават на нашите клиенти.',
    }),
    defineField({
      name: 'image',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value', initialValue: '' }),
            defineField({ name: 'animated', type: 'boolean', title: 'Animated counter?', initialValue: false }),
            defineField({ name: 'suffix', type: 'string', title: 'Suffix (e.g. +)', initialValue: '' }),
            defineField({ name: 'label', type: 'string', title: 'Label', initialValue: '' }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
            prepare({ title, subtitle }) {
              return { title: title || 'Stat', subtitle: subtitle || 'About Hero stat' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'stat1', value: '20', animated: true, suffix: '+', label: 'години опит' },
        { _key: 'stat2', value: '2005', animated: false, suffix: '', label: 'година на основаване' },
        { _key: 'stat3', value: '12', animated: false, suffix: '', label: 'категории системи' },
        { _key: 'stat4', value: '№ 743', animated: false, suffix: '', label: 'лиценз ГД ПБЗН-МВР' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'About Hero', subtitle: 'aboutHero', media }
    },
  },
})
