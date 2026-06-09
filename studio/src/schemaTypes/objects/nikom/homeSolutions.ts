import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

export const homeSolutions = defineType({
  name: 'homeSolutions',
  title: 'Home — Solutions Bento',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Решения · 05 категории',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Един партньор за всички инженерни системи в обекта.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Проектираме, доставяме и интегрираме сертифицирани системи на водещи производители. Категориите по-долу се изграждат самостоятелно или като единна интегрирана среда.',
    }),
    defineField({
      name: 'cards',
      title: 'Bento cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'solutionCard',
          title: 'Card',
          fields: [
            defineField({ name: 'icon', title: 'Icon key (Fire/Cam/Panic/Key/Speaker/Net/Shield)', type: 'string' }),
            defineField({ name: 'chip', title: 'Chip label', type: 'string' }),
            defineField({ name: 'meta', title: 'Meta label (right of chip)', type: 'string' }),
            defineField({ name: 'title', title: 'Card title', type: 'string' }),
            defineField({ name: 'desc', title: 'Card description', type: 'text', rows: 3 }),
            defineField({ name: 'tag', title: 'Tag text (for card-link)', type: 'string', initialValue: 'Детайли' }),
            defineField({
              name: 'variant',
              title: 'Card variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Fire card (dark + animated floorplan)', value: 'fire' },
                  { title: 'Wide (span-2)', value: 'wide' },
                  { title: 'Dark wide (span-2 dark)', value: 'dark-wide' },
                ],
              },
              initialValue: 'default',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'variant', media: 'icon' },
            prepare({ title, subtitle }) {
              return { title: title || 'Card', subtitle: subtitle || 'default' }
            },
          },
        }),
      ],
      initialValue: [
        {
          _key: 'fire',
          icon: 'Fire',
          chip: '01 · Пожарна безопасност',
          meta: 'EN 54 · NFPA',
          title: 'Пожароизвестяване & пожарогасене',
          desc: '',
          tag: 'Прегледай решения',
          variant: 'fire',
        },
        {
          _key: 'cctv',
          icon: 'Cam',
          chip: '02 · Сигурност',
          meta: '',
          title: 'Видеонаблюдение & СОТ',
          desc: 'IP/PTZ камери, термовизия, VMS, охранителни централи, периметрова защита.',
          tag: 'Детайли',
          variant: 'default',
        },
        {
          _key: 'panic',
          icon: 'Panic',
          chip: '03 · Реакция',
          meta: '',
          title: 'Паник & алармени системи',
          desc: 'Дискретни паник бутони, моментално оповестяване, патрулна реакция.',
          tag: 'Детайли',
          variant: 'default',
        },
        {
          _key: 'acs',
          icon: 'Key',
          chip: '04 · Контрол на достъп',
          meta: 'RFID · BIOMETRIC · ANPR',
          title: 'Контрол на достъп & паркинг',
          desc: 'Soyal, Paradox, Suprema. Биометрия, картови системи, турникети, бариери и ANPR за паркинг управление.',
          tag: 'Детайли',
          variant: 'wide',
        },
        {
          _key: 'speaker',
          icon: 'Speaker',
          chip: '05 · Комуникация',
          meta: '',
          title: 'Озвучаване & оповестяване',
          desc: 'Bosch, TOA, Inter-M. Гласово евакуационно оповестяване EN 54-16.',
          tag: 'Детайли',
          variant: 'default',
        },
        {
          _key: 'net',
          icon: 'Net',
          chip: '06 · Инфраструктура',
          meta: '',
          title: 'Структурни кабелни системи',
          desc: 'Cat6/6A, оптика, LAN/WAN, сървърни шкафове — основата на всяка система.',
          tag: 'Детайли',
          variant: 'default',
        },
        {
          _key: 'integration',
          icon: 'Shield',
          chip: '07 · Интеграция',
          meta: 'PSIM · SCADA · BMS',
          title: 'Единна интегрирана среда',
          desc: 'Свързваме пожарна, охрана, достъп, видеонаблюдение, оповестяване и BMS в единна PSIM платформа.',
          tag: 'Архитектура на интеграцията',
          variant: 'dark-wide',
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading', eyebrow: 'eyebrow' },
    prepare({ title, eyebrow }) {
      return { title: title || 'Solutions Bento', subtitle: eyebrow || 'homeSolutions' }
    },
  },
})
