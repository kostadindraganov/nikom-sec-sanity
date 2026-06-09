import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const projectsFeature = defineType({
  name: 'projectsFeature',
  title: 'Projects Feature (Case Study)',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Избран проект · Дългосрочно партньорство',
    }),
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      initialValue: '„Аджибадем Сити Клиник Болница Токуда" ЕАД',
    }),
    defineField({
      name: 'year',
      title: 'Year / period',
      type: 'string',
      initialValue: '2010 — наст.',
    }),
    defineField({
      name: 'sectorLabel',
      title: 'Sector label',
      type: 'string',
      initialValue: 'Здравеопазване',
    }),
    defineField({
      name: 'image',
      title: 'Project image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageFallback',
      title: 'Image fallback path',
      type: 'string',
      initialValue: '/nikom/proj-tokuda.jpg',
      description: 'Fallback /nikom/<file> path used when Sanity image is absent.',
    }),
    defineField({
      name: 'systems',
      title: 'Systems / chips',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Пожароизвестяване Esser by Honeywell',
        'Спринклерна пожарогасителна',
        'Пожарни кранове',
      ],
    }),
    defineField({
      name: 'kpis',
      title: 'KPI items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'kpiItem',
          title: 'KPI',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'value', type: 'string', title: 'Value' }),
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: value, subtitle: label }
            },
          },
        },
      ],
      initialValue: [
        { label: 'Детектори', value: '2 000' },
        { label: 'Спринклери', value: '4 800' },
      ],
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote text',
      type: 'text',
      rows: 4,
      initialValue:
        'Дългогодишното успешно партньорство и съвместна работа с екипа на „НИКОМ системи за сигурност" ЕООД от 2010 г., ръководен от инж. Николай Васев, ни дава основание да ги препоръчаме като коректен, компетентен и надежден партньор.',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote author',
      type: 'string',
      initialValue: 'инж. Георги Кърчев',
    }),
    defineField({
      name: 'quoteRole',
      title: 'Quote author role',
      type: 'string',
      initialValue: 'инспектор Пожарна Безопасност',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title ?? 'Projects Feature',
        subtitle: 'projectsFeature',
      }
    },
  },
})
