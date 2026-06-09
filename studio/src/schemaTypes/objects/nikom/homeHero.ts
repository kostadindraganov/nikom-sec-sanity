import { defineType, defineField, defineArrayMember } from 'sanity'
import { BlockContentIcon } from '@sanity/icons'
const Shield = BlockContentIcon

export default defineType({
  name: 'homeHero',
  title: 'Home — Hero',
  type: 'object',
  icon: Shield,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Инженерни системи • Сертифицирано',
    }),
    defineField({
      name: 'headingParts',
      title: 'Heading Parts',
      description: 'Each part of the h1. Mark highlighted words with isHighlight.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'headingPart',
          fields: [
            defineField({ name: 'text', title: 'Text', type: 'string' }),
            defineField({ name: 'highlight', title: 'Highlight?', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'highlight' },
            prepare({ title, subtitle }) {
              return { title: title ?? '(empty)', subtitle: subtitle ? '★ highlighted' : 'plain' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'hp1', text: 'Системи за ', highlight: false },
        { _key: 'hp2', text: 'сигурност', highlight: true },
        { _key: 'hp3', text: ', ', highlight: false },
        { _key: 'hp4', text: 'пожарна безопасност', highlight: true },
        { _key: 'hp5', text: ' и ', highlight: false },
        { _key: 'hp6', text: 'контрол на достъп', highlight: true },
      ],
    }),
    defineField({
      name: 'sub',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
      initialValue:
        'Проектиране, доставка, монтаж и поддръжка на сертифицирани решения за бизнес, обществени и индустриални обекти. Над две десетилетия инженерен опит, без компромис към сигурността.',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', initialValue: 'Заявете консултация' }),
        defineField({ name: 'href', type: 'string', initialValue: '#contact' }),
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', initialValue: 'Вижте проекти' }),
        defineField({ name: 'href', type: 'string', initialValue: '#projects' }),
      ],
    }),
    defineField({
      name: 'trustItems',
      title: 'Trust Bar Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trustItem',
          fields: [
            defineField({ name: 'value', title: 'Value / Number', type: 'string' }),
            defineField({ name: 'suffix', title: 'Suffix (e.g. +)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'isCounter', title: 'Animate as counter?', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
            prepare({ title, subtitle }) {
              return { title: title ?? '–', subtitle }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'ti1', value: '20', suffix: '+', label: 'години инженерен опит', isCounter: true },
        { _key: 'ti2', value: '800', suffix: '+', label: 'завършени обекта', isCounter: true },
        { _key: 'ti3', value: '24/7', suffix: '', label: 'сервизна поддръжка', isCounter: false },
        { _key: 'ti4', value: 'ISO', suffix: '', label: '9001 / 14001 / 27001', isCounter: false },
      ],
    }),
    defineField({
      name: 'stripLive',
      title: 'Strip — Live text',
      type: 'string',
      initialValue: 'LIVE — Дежурен инженер на линия',
    }),
    defineField({
      name: 'stripLocations',
      title: 'Strip — Locations',
      type: 'string',
      initialValue: 'Sofia · Plovdiv · Varna · Burgas',
    }),
    defineField({
      name: 'stripLicense',
      title: 'Strip — License',
      type: 'string',
      initialValue: 'Лиценз № 2436-2017 · МВР',
    }),
  ],
  preview: {
    select: {
      sub: 'eyebrow',
    },
    prepare({ sub }) {
      return {
        title: 'Home Hero',
        subtitle: sub ?? 'homeHero',
        media: Shield,
      }
    },
  },
})
