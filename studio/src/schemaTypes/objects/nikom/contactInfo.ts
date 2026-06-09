import { defineType, defineField, defineArrayMember } from 'sanity'
import { PinIcon } from '@sanity/icons'
const MapPin = PinIcon

export default defineType({
  name: 'contactInfo',
  title: 'Contact — Info',
  type: 'object',
  icon: MapPin,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Координати · 04 канала за връзка',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Как можем да Ви бъдем полезни.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 2,
      initialValue:
        'Ако желаете да направим среща или консултация, изпратете запитване чрез формата по-долу или ни звъннете директно.',
    }),
    defineField({
      name: 'offices',
      title: 'Office cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'officeCard',
          fields: [
            defineField({ name: 'num', title: 'Number label (e.g. 01)', type: 'string' }),
            defineField({ name: 'city', title: 'Card heading', type: 'string' }),
            defineField({ name: 'address', title: 'Address (HTML allowed: use \\n for <br>)', type: 'text', rows: 3 }),
            defineField({ name: 'phone', title: 'Phone', type: 'string' }),
            defineField({ name: 'email', title: 'Email', type: 'string' }),
            defineField({ name: 'hours', title: 'Hours', type: 'text', rows: 2 }),
            defineField({ name: 'linkLabel', title: 'Link label', type: 'string' }),
            defineField({ name: 'linkHref', title: 'Link href', type: 'string' }),
          ],
          preview: {
            select: { title: 'city', subtitle: 'num' },
            prepare({ title, subtitle }) {
              return { title: title ?? '(card)', subtitle: subtitle ?? '' }
            },
          },
        }),
      ],
      initialValue: [
        {
          _key: 'card01',
          num: '01',
          city: 'Адрес офис и склад',
          address: 'жк. Младост 4, блок 477, вх. 1, офис 1\nСофия, 1715\nБългария',
          linkLabel: 'Виж на картата',
          linkHref: '#map',
        },
        {
          _key: 'card02',
          num: '02',
          city: 'Работно време',
          hours: 'Пн – Пт · 09:00 — 18:00\nСб & Нд — неработни\nСервиз — 24 / 7 / 365',
          linkLabel: 'Активен статус ⓘ',
        },
        {
          _key: 'card03',
          num: '03',
          city: 'Данни на фирмата',
          address: '„Ником Системи за Сигурност" ЕООД\nЕИК 131294795\nЛиценз ГД ПБЗН-МВР № 743/07.07.2017 г.',
          linkLabel: 'Документи на запитване ⓘ',
        },
        {
          _key: 'card04',
          num: '04',
          city: 'Време за реакция',
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'contactInfo', subtitle: 'Contact — Info' }
    },
  },
})
