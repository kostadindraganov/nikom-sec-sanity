import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'
const Mail = EnvelopeIcon

export default defineType({
  name: 'contactForm',
  title: 'Contact — Form',
  type: 'object',
  icon: Mail,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Запитване · Форма',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Изпратете запитване — отговор до 4 работни часа.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Получавате обратна връзка от инженер до 4 работни часа. За спешни случаи на действащи обекти — директен телефон към дежурен инженер.',
    }),
    defineField({
      name: 'departments',
      title: 'Department / type pills',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'department',
          fields: [
            defineField({ name: 'id', title: 'ID (no spaces)', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'id' },
            prepare({ title, subtitle }) {
              return { title: title ?? '(dept)', subtitle: subtitle ?? '' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'd1', id: 'consultation', label: 'Консултация' },
        { _key: 'd2', id: 'project', label: 'Нов проект' },
        { _key: 'd3', id: 'service', label: 'Сервиз' },
        { _key: 'd4', id: 'other', label: 'Друго' },
      ],
    }),
    defineField({
      name: 'fieldLabelName',
      title: 'Field label: First name',
      type: 'string',
      initialValue: 'Име',
    }),
    defineField({
      name: 'fieldLabelSurname',
      title: 'Field label: Last name',
      type: 'string',
      initialValue: 'Фамилия',
    }),
    defineField({
      name: 'fieldLabelEmail',
      title: 'Field label: Email',
      type: 'string',
      initialValue: 'Имейл',
    }),
    defineField({
      name: 'fieldLabelPhone',
      title: 'Field label: Phone',
      type: 'string',
      initialValue: 'Телефон',
    }),
    defineField({
      name: 'fieldLabelCompany',
      title: 'Field label: Company',
      type: 'string',
      initialValue: 'Фирма / Организация',
    }),
    defineField({
      name: 'fieldLabelAddress',
      title: 'Field label: Object address',
      type: 'string',
      initialValue: 'Адрес на обекта',
    }),
    defineField({
      name: 'fieldLabelMessage',
      title: 'Field label: Message',
      type: 'string',
      initialValue: 'Кратко описание или въпрос',
    }),
    defineField({
      name: 'submitText',
      title: 'Submit button text',
      type: 'string',
      initialValue: 'Изпрати запитване',
    }),
    defineField({
      name: 'trustTitle',
      title: 'Trust badge title',
      type: 'string',
      initialValue: 'Вашата информация е защитена',
    }),
    defineField({
      name: 'trustText',
      title: 'Trust badge text',
      type: 'string',
      initialValue: 'Обработваме конфиденциално и не споделяме с трети страни.',
    }),
    defineField({
      name: 'successHeading',
      title: 'Success heading',
      type: 'string',
      initialValue: 'Получихме запитването Ви.',
    }),
    defineField({
      name: 'successText',
      title: 'Success text',
      type: 'string',
      initialValue: 'Инженер от екипа ще се свърже с Вас в рамките на 4 работни часа.',
    }),
    defineField({
      name: 'avgResponseTime',
      title: 'Average response time (display)',
      type: 'string',
      initialValue: '~3ч 12мин',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'contactForm', subtitle: 'Contact — Form' }
    },
  },
})
