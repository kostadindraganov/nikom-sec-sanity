import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const homeContact = defineType({
  name: 'homeContact',
  title: 'Home · Contact',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Контакт · Инженер на линия',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Обсъдете Вашия проект с инженер.',
    }),
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'Получавате обратна връзка до 4 работни часа в работни дни. За спешни случаи на действащи обекти — директен телефон към дежурен инженер.',
    }),
    defineField({
      name: 'contactItems',
      title: 'Contact Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactItem',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon key',
              type: 'string',
              description: 'One of: Phone, Shield, Key, Net (matches Icons.*)',
            }),
            defineField({ name: 'label', title: 'Label (meta)', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Contact item', subtitle }
            },
          },
        },
      ],
      initialValue: [
        { _type: 'contactItem', icon: 'Phone', label: 'Телефон', value: '+359 89 45 23 970' },
        { _type: 'contactItem', icon: 'Net', label: 'Имейл', value: 'office@nikom-security.com' },
        { _type: 'contactItem', icon: 'Key', label: 'Централа', value: 'гр. София, ул. Инженерна 14, ет. 3' },
        { _type: 'contactItem', icon: 'Shield', label: 'Работно време', value: 'Пн–Пт · 09:00—18:00 | Сервиз · 24/7' },
      ],
    }),
    defineField({
      name: 'formSubmitLabel',
      title: 'Form submit button label',
      type: 'string',
      initialValue: 'Изпрати заявката',
    }),
    defineField({
      name: 'formSuccessHeading',
      title: 'Form success heading',
      type: 'string',
      initialValue: 'Получихме заявката Ви.',
    }),
    defineField({
      name: 'formSuccessBody',
      title: 'Form success body',
      type: 'string',
      initialValue: 'Инженер от екипа ще се свърже с Вас в рамките на 4 работни часа.',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Home · Contact',
        subtitle: 'homeContact block',
      }
    },
  },
})
