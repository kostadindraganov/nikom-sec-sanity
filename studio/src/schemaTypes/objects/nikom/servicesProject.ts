import { defineType, defineField } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesProject',
  title: 'Services Project Types',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Услуги по проекти · 04 типа',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'От концепция до дългосрочна поддръжка.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue:
        'Работим със сертифицирана апаратура и по високи технически стандарти. Всеки проект минава през еднакъв инженерен work-flow.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectServiceItem',
          fields: [
            defineField({ name: 'n', title: 'Number', type: 'string', initialValue: '01' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'icon', title: 'Icon key', type: 'string' }),
            defineField({
              name: 'bullets',
              title: 'Bullets',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'n' },
            prepare({ title, subtitle }) {
              return { title: title || 'Item', subtitle: `#${subtitle}` }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'plan',
          n: '01', title: 'Проектиране', icon: 'plan',
          desc: 'Изготвяне на работен проект, технически чертежи и спецификации съгласно действащите норми и стандарти.',
          bullets: ['Концептуален проект', 'Технически чертежи', 'Спецификация на апаратурата', 'Съгласувания с РСПБЗН'],
        },
        {
          _key: 'build',
          n: '02', title: 'Разработка и монтаж', icon: 'build',
          desc: 'Лицензиран екип за разработка и монтаж — с документиране на всеки етап и 72-часов приемен тест.',
          bullets: ['Структурно окабеляване', 'Монтаж на апаратурата', 'Програмиране', '72-часов приемен тест'],
        },
        {
          _key: 'pm',
          n: '03', title: 'Управление на проекти', icon: 'pm',
          desc: 'Назначен инженер-ръководител с единствена точка на отговорност за графика, бюджета и качеството.',
          bullets: ['Инженер-ръководител', 'График и milestone', 'Бюджетен контрол', 'Документация и handover'],
        },
        {
          _key: 'srv',
          n: '04', title: 'Сервизно обслужване', icon: 'srv',
          desc: 'Гаранционен и следгаранционен сервиз с абонаментна поддръжка 24/7 и договорно SLA.',
          bullets: ['Гаранционен сервиз', 'Абонаментна поддръжка', 'SLA реакция', 'Резервни части на склад'],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services Project', subtitle: 'servicesProject' }
    },
  },
})
