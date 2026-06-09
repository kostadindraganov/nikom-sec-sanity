import { defineType, defineField } from 'sanity'
import { OlistIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesProcess',
  title: 'Services Process',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Методология · End-to-end',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Един и същ процес за всеки проект.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue:
        'Не правим компромис на ключови етапи. От консултация до дългосрочна поддръжка — една отговорна точка.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          fields: [
            defineField({ name: 'n', title: 'Number', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'n' },
            prepare({ title, subtitle }) {
              return { title: title || 'Step', subtitle: `#${subtitle}` }
            },
          },
        },
      ],
      initialValue: [
        { _key: 's01', n: '01', title: 'Консултация', desc: 'Оглед на обект, нормативни изисквания.' },
        { _key: 's02', n: '02', title: 'Проектиране', desc: 'Работен проект, спецификации, съгласувания.' },
        { _key: 's03', n: '03', title: 'Доставка', desc: 'Сертифицирана техника, лицензиран екип.' },
        { _key: 's04', n: '04', title: 'Монтаж', desc: 'Лицензиран екип, инсталация по график.' },
        { _key: 's05', n: '05', title: 'Тестване', desc: '72-часов приемен тест, протоколи.' },
        { _key: 's06', n: '06', title: 'Обучение', desc: 'Инструктаж на операторите.' },
        { _key: 's07', n: '07', title: 'Поддръжка', desc: 'Абонаментен сервиз 24/7.' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services Process', subtitle: 'servicesProcess' }
    },
  },
})
