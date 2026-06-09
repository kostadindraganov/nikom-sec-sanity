import { defineType, defineField } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesFaq',
  title: 'Services FAQ',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'FAQ · Често задавани въпроси',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Отговори преди да говорите с инженер.',
    }),
    defineField({
      name: 'items',
      title: 'FAQ items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'q', title: 'Question', type: 'string' }),
            defineField({ name: 'a', title: 'Answer', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'q' },
            prepare({ title }) {
              return { title: title || 'FAQ item', subtitle: 'faqItem' }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'faq1',
          q: 'Каква апаратура използвате?',
          a: 'Работим изключително със сертифицирана техника от световни производители: Esser by Honeywell, INIM Electronics, Panasonic, Securiton, Dahua, Paradox, Soyal, Farfisa и други.',
        },
        {
          _key: 'faq2',
          q: 'Лицензирани ли сте за пожарни системи?',
          a: 'Да, фирма „НИКОМ" е лицензирана от ГД ПБЗН – МВР с разрешително № 743/07.07.2017 г. за поддържане и обслужване на противопожарни системи и съоръжения.',
        },
        {
          _key: 'faq3',
          q: 'Какъв е срокът от запитване до готов проект?',
          a: 'Срокът зависи от типа и обхвата на обекта. След първоначална консултация Ви предоставяме график за всички етапи — обикновено между 2 и 12 седмици за средно-голям обект.',
        },
        {
          _key: 'faq4',
          q: 'Предлагате ли поддръжка след монтаж?',
          a: 'Да. Всички наши клиенти получават гаранционен сервиз, а след това — абонаментна техническа поддръжка по договорено SLA. Профилактика, резервни части и 24/7 техническа линия.',
        },
        {
          _key: 'faq5',
          q: 'Може ли да интегрирате с вече съществуващи системи?',
          a: 'Да. Имаме опит в развитие и разширяване на съществуващи системи — особено когато са на сертифицирана платформа. Започваме с оглед и техническа оценка на текущата инсталация.',
        },
        {
          _key: 'faq6',
          q: 'Работите ли с държавни и дипломатически обекти?',
          a: 'Да. Имаме опит с посолства, държавни институции и обекти с високо ниво на сигурност. Поверителността и дискретността са стандарт за нас.',
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services FAQ', subtitle: 'servicesFaq' }
    },
  },
})
