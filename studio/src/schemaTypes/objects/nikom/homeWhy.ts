import { defineType, defineField, defineArrayMember } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export default defineType({
  name: 'homeWhy',
  title: 'Home — Why NIKOM',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Защо NIKOM',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Инженерен партньор, не доставчик на оборудване.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Над 20 години изграждаме критични системи за болници, посолства, индустрия и търговски вериги. Останалото е въпрос на стандарт.',
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
            defineField({ name: 'value', type: 'number', title: 'Value' }),
            defineField({ name: 'decimals', type: 'number', title: 'Decimal places', initialValue: 0 }),
            defineField({ name: 'prefix', type: 'string', title: 'Prefix (e.g. <)' }),
            defineField({ name: 'suffix', type: 'string', title: 'Suffix (e.g. %)' }),
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'isCounter', type: 'boolean', title: 'Animate counter?', initialValue: true }),
          ],
          preview: {
            select: { value: 'value', suffix: 'suffix', label: 'label' },
            prepare({ value, suffix, label }) {
              return { title: `${value}${suffix ?? ''}`, subtitle: label }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'stat1', value: 98.6, decimals: 1, suffix: '%', label: 'точност на SLA реакции', isCounter: true },
        { _key: 'stat2', value: 30, prefix: '<', label: 'мин средно време за критична реакция', isCounter: true },
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Icon name (from Icons)', options: { list: ['Fire','Cam','Key','Speaker','Net','Shield','Bar','Panic','Phone','Arrow','Check','Plus'] } }),
            defineField({ name: 'title', type: 'string', title: 'Title' }),
            defineField({ name: 'desc', type: 'text', title: 'Description', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'desc' },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        }),
      ],
      initialValue: [
        {
          _key: 'p1',
          title: 'Инженерен подход',
          desc: 'Решения, проектирани от инженери. Всеки проект минава през работно проектиране и съгласуване.',
        },
        {
          _key: 'p2',
          title: 'Сертифицирана апаратура',
          desc: 'Esser, Honeywell, INIM, Securiton, Bosch, Soyal, Paradox — само сертифицирани производители.',
        },
        {
          _key: 'p3',
          title: 'Прецизно изпълнение',
          desc: 'Лицензирани монтажни екипи, доказана методика, документиране и 72-часов приемен тест.',
        },
        {
          _key: 'p4',
          title: 'Дългосрочна поддръжка',
          desc: 'Абонаментен сервиз 24/7, профилактика, резервни части, договорно SLA.',
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: heading ?? 'Home — Why NIKOM',
        subtitle: 'homeWhy block',
        media: HeartIcon,
      }
    },
  },
})
