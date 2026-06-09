import { defineType, defineField, defineArrayMember } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'aboutManufacturers',
  title: 'About Manufacturers',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Партньори · 08 световни производители',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Доказано качество, многообразие и възможности за интеграция.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      initialValue: 'В портфолиото си избираме да присъстват продукти с доказано качество, многообразие в техническите спецификации, възможности за интеграция и икономическа ефективност.',
    }),
    defineField({
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'brand',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Brand name', initialValue: '' }),
            defineField({ name: 'sub', type: 'string', title: 'Sub-label', initialValue: '' }),
            defineField({ name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'sub', media: 'logo' },
            prepare({ title, subtitle, media }) {
              return { title: title || 'Brand', subtitle: subtitle || 'About Manufacturers brand', media }
            },
          },
        }),
      ],
      initialValue: [
        { _key: 'b1', name: 'Esser', sub: 'by Honeywell' },
        { _key: 'b2', name: 'INIM', sub: 'Electronics' },
        { _key: 'b3', name: 'Panasonic', sub: '' },
        { _key: 'b4', name: 'Securiton', sub: '' },
        { _key: 'b5', name: 'Dahua', sub: '' },
        { _key: 'b6', name: 'Paradox', sub: '' },
        { _key: 'b7', name: 'Soyal', sub: '' },
        { _key: 'b8', name: 'Farfisa', sub: '' },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'About Manufacturers', subtitle: 'aboutManufacturers' }
    },
  },
})
