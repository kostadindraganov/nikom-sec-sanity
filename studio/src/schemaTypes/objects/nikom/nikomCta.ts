import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export default defineType({
  name: 'nikomCta',
  title: 'NIKOM CTA',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Готови сме за разговор',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Свържете се с нас за консултация по нов или съществуващ проект.',
    }),
    defineField({
      name: 'sub',
      title: 'Sub-text',
      type: 'text',
      initialValue: 'Получавате обратна връзка от инженер до 4 работни часа.',
    }),
    defineField({
      name: 'buttonPrimary',
      title: 'Primary button',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label', initialValue: 'Заявете консултация' }),
        defineField({ name: 'href', type: 'string', title: 'Href', initialValue: '/bg/kontakt' }),
      ],
    }),
    defineField({
      name: 'buttonSecondary',
      title: 'Secondary button',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', title: 'Label', initialValue: 'Вижте проекти' }),
        defineField({ name: 'href', type: 'string', title: 'Href', initialValue: '/bg/proekti' }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'theme' },
    prepare({ title, subtitle }) {
      return { title: title || 'NIKOM CTA', subtitle: subtitle ? `nikomCta · ${subtitle}` : 'nikomCta' }
    },
  },
})
