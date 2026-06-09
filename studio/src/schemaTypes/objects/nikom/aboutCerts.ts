import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutCerts',
  title: 'About Certifications',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Лиценз · Сертификати',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Лицензирани от ГД ПБЗН – МВР.',
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License number',
      type: 'string',
      initialValue: 'Разрешително № 743/07.07.2017 г.',
    }),
    defineField({
      name: 'licenseIssuer',
      title: 'License issuer',
      type: 'string',
      initialValue: 'Главна Дирекция „Пожарна безопасност и защита на населението" — МВР',
    }),
    defineField({
      name: 'scopeLabel',
      title: 'Scope label',
      type: 'string',
      initialValue: 'Поддържане и обслужване на противопожарни системи и съоръжения:',
    }),
    defineField({
      name: 'scopeItems',
      title: 'Scope items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'scopeItem',
          fields: [
            defineField({ name: 'text', type: 'string', title: 'Text', initialValue: '' }),
          ],
          preview: {
            select: { title: 'text' },
            prepare({ title }) {
              return { title: title || 'Scope item', subtitle: 'About Certs scope item' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'sc1', text: 'Пожароизвестителни системи' },
        { _key: 'sc2', text: 'Пожарогасителни системи' },
        { _key: 'sc3', text: 'Системи за управление на дим и топлина' },
        { _key: 'sc4', text: 'Пожарни кранове' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Certifications', subtitle: 'aboutCerts' }
    },
  },
})
