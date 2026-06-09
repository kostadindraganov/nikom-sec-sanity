import { defineType, defineField, defineArrayMember } from 'sanity'
import { ActivityIcon } from '@sanity/icons'
const BarChart2 = ActivityIcon

export default defineType({
  name: 'homeTicker',
  title: 'Home — Ticker',
  type: 'object',
  icon: BarChart2,
  fields: [
    defineField({
      name: 'items',
      title: 'Ticker Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'tickerItem',
          fields: [
            defineField({ name: 'num', title: 'Number / Metric', type: 'string' }),
            defineField({ name: 'text', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'num', subtitle: 'text' },
            prepare({ title, subtitle }) {
              return { title: title ?? '–', subtitle }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'tk1', num: '800+', text: 'завършени обекта' },
        { _key: 'tk2', num: '24/7', text: 'дежурен инженер' },
        { _key: 'tk3', num: '< 30 мин', text: 'критична реакция' },
        { _key: 'tk4', num: '20+ г.', text: 'инженерен опит' },
        { _key: 'tk5', num: 'ISO 27001', text: 'сертифицирано' },
        { _key: 'tk6', num: '98.6%', text: 'SLA точност' },
        { _key: 'tk7', num: '248', text: 'активни нод-а' },
        { _key: 'tk8', num: 'EN 54', text: 'съответствие' },
      ],
    }),
    defineField({
      name: 'speed',
      title: 'Marquee Speed (seconds)',
      type: 'number',
      initialValue: 45,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Ticker',
        subtitle: 'homeTicker',
        media: BarChart2,
      }
    },
  },
})
