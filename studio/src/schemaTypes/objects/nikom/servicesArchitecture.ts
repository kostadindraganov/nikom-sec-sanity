import { defineType, defineField } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesArchitecture',
  title: 'Services Architecture',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Архитектура · Интеграция',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Дванадесет системи. Една централна интеграция.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue:
        'PSIM платформата свързва всички подсистеми в единна среда — със сценарии за автоматична реакция, корелация на събития и централно наблюдение.',
    }),
    defineField({
      name: 'coreLabel',
      title: 'Core label (PSIM)',
      type: 'string',
      initialValue: 'PSIM',
    }),
    defineField({
      name: 'coreSubLabel',
      title: 'Core sub-label',
      type: 'string',
      initialValue: 'Unified Security Intelligence Platform',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services Architecture', subtitle: 'servicesArchitecture' }
    },
  },
})
