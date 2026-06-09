import { defineType, defineField, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutManifest',
  title: 'About Manifest',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Принципи · 04 стълба',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Високи стандарти, сертификати и навременно изпълнение.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      initialValue: 'Нашата цел е да поставим висок стандарт в сферата на системите за сигурност и наблюдение, по критерии по-високи от очакванията.',
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({ name: 'number', type: 'string', title: 'Number', initialValue: '' }),
            defineField({ name: 'title', type: 'string', title: 'Title', initialValue: '' }),
            defineField({ name: 'description', type: 'text', title: 'Description', initialValue: '' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number' },
            prepare({ title, subtitle }) {
              return { title: title || 'Pillar', subtitle: subtitle || 'About Manifest pillar' }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'p1', number: '01', title: 'Инженерингов подход', description: 'Компания, създадена от инженери с отлична професионална квалификация. Всеки проект минава през квалифициран технически екип.' },
        { _key: 'p2', number: '02', title: 'Сертифицирана техника', description: 'Работим изключително със сертифицирана, висококачествена техника на световни производители — без компромиси.' },
        { _key: 'p3', number: '03', title: 'Цялостни решения', description: 'Проектиране, доставка, монтаж и поддръжка. От дома и офиса до големи промишлени, търговски и институционални обекти.' },
        { _key: 'p4', number: '04', title: 'Дългосрочно партньорство', description: 'Работим в синергия, за да доставим резултати и да изградим дългосрочно партньорство с клиенти и партньори.' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Manifest', subtitle: 'aboutManifest' }
    },
  },
})
