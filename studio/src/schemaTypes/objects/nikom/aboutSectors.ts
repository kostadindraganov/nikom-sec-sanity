import { defineType, defineField, defineArrayMember } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutSectors',
  title: 'About Sectors',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Сектори · 07 индустрии',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Решения за дома, офиса и големите институционални обекти.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      initialValue: 'Покриваме целия спектър — от дома и офиса до големи промишлени, търговски и институционални обекти. За всеки сектор имаме адаптирано техническо решение.',
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sector',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number', initialValue: '' }),
            defineField({ name: 'name', type: 'string', title: 'Name', initialValue: '' }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'number' },
            prepare({ title, subtitle }) {
              return { title: title || 'Sector', subtitle: subtitle || 'About Sectors item' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'sec1', number: '01', name: 'Административни и офис сгради' },
        { _key: 'sec2', number: '02', name: 'Търговски центрове и комплекси' },
        { _key: 'sec3', number: '03', name: 'Болнични и лечебни центрове' },
        { _key: 'sec4', number: '04', name: 'Банкови и финансови институции' },
        { _key: 'sec5', number: '05', name: 'Училища и детски градини' },
        { _key: 'sec6', number: '06', name: 'Производствени бази и складове' },
        { _key: 'sec7', number: '07', name: 'Държавни обекти с високо ниво на сигурност' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Sectors', subtitle: 'aboutSectors' }
    },
  },
})
