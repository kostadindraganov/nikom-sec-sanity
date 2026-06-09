import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const homeProcess = defineType({
  name: 'homeProcess',
  title: 'Home — Process Walker',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Процес · End-to-End инженеринг',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Един екип. Един проект. От консултация до поддръжка.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Не работим с подизпълнители на ключови етапи. Всеки проект се води от назначен инженер-ръководител.',
    }),
    defineField({
      name: 'steps',
      title: 'Process steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'processStep',
          title: 'Step',
          fields: [
            defineField({ name: 'num', title: 'Step number (e.g. "01")', type: 'string' }),
            defineField({ name: 'title', title: 'Step title', type: 'string' }),
            defineField({ name: 'desc', title: 'Step description', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { num: 'num', title: 'title' },
            prepare({ num, title }) {
              return { title: `${num} · ${title}` }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 's01', num: '01', title: 'Консултация', desc: 'Оглед, нормативни изисквания, бюджетна рамка.' },
        { _key: 's02', num: '02', title: 'Проектиране', desc: 'Работен проект, спецификация, съгласувания.' },
        { _key: 's03', num: '03', title: 'Доставка', desc: 'Сертифицирана техника от водещи производители.' },
        { _key: 's04', num: '04', title: 'Монтаж', desc: 'Лицензиран екип, инсталация по график.' },
        { _key: 's05', num: '05', title: 'Тестване', desc: '72-часов приемен тест, протоколи.' },
        { _key: 's06', num: '06', title: 'Обучение', desc: 'Инструктаж на операторите.' },
        { _key: 's07', num: '07', title: 'Поддръжка', desc: 'Абонаментен сервиз 24/7.' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', eyebrow: 'eyebrow' },
    prepare({ title, eyebrow }) {
      return { title: title || 'Process Walker', subtitle: eyebrow || 'homeProcess' }
    },
  },
})
