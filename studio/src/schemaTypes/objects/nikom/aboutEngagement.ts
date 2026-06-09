import { defineType, defineField, defineArrayMember } from 'sanity'
import { OlistIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutEngagement',
  title: 'About Engagement',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Инженеринг · 09 ангажимента',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Ангажираме се на всеки етап от работния процес.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      initialValue: 'Техническата осигуреност на компанията и екипът от квалифицирани инженери, проектанти и техници са в състояние да посрещнат изискванията на всеки клиент.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number', initialValue: '' }),
            defineField({ name: 'title', type: 'string', title: 'Title', initialValue: '' }),
            defineField({ name: 'description', type: 'text', title: 'Description', initialValue: '' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare({ title, subtitle }) {
              return { title: title || 'Step', subtitle: subtitle || 'About Engagement step' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 's1', number: '01', title: 'Техническа консултация', description: 'От квалифициран екип, на база на конкретните Ви нужди.' },
        { _key: 's2', number: '02', title: 'Проектна документация', description: 'Изготвяне на технически чертежи и спецификации.' },
        { _key: 's3', number: '03', title: 'Структурно окабеляване', description: 'Изграждане на кабелна инфраструктура — основата на всяка система.' },
        { _key: 's4', number: '04', title: 'Доставка и монтаж', description: 'Техника от сертифицирани производители, лицензиран екип.' },
        { _key: 's5', number: '05', title: 'Програмиране', description: 'Оживяване на системата и конфигуриране за конкретния обект.' },
        { _key: 's6', number: '06', title: '24-часов тест', description: 'Изпитание на системите в реални условия преди приемане.' },
        { _key: 's7', number: '07', title: 'Обучение на персонала', description: 'Инструктаж за работа със системата на български.' },
        { _key: 's8', number: '08', title: 'Гаранционен сервиз', description: 'Поддръжка по време на гаранционния период.' },
        { _key: 's9', number: '09', title: 'Абонаментна поддръжка', description: 'Следгаранционна техническа поддръжка на изградените системи.' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Engagement', subtitle: 'aboutEngagement' }
    },
  },
})
