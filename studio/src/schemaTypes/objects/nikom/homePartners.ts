import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const homePartners = defineType({
  name: 'homePartners',
  title: 'Home · Partners',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Сертифицирани партньори',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Работим със световни производители — без компромиси с качеството.',
    }),
    defineField({
      name: 'partnersRow1',
      title: 'Partners Row 1',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partnerItem',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
          ],
          preview: {
            select: { title: 'name' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Partner' }
            },
          },
        },
      ],
      initialValue: [
        { _type: 'partnerItem', name: 'Honeywell' },
        { _type: 'partnerItem', name: 'Esser' },
        { _type: 'partnerItem', name: 'INIM' },
        { _type: 'partnerItem', name: 'Securiton' },
        { _type: 'partnerItem', name: 'Panasonic' },
        { _type: 'partnerItem', name: 'Bosch' },
        { _type: 'partnerItem', name: 'Dahua' },
        { _type: 'partnerItem', name: 'Paradox' },
        { _type: 'partnerItem', name: 'Soyal' },
        { _type: 'partnerItem', name: 'Farfisa' },
        { _type: 'partnerItem', name: 'TOA' },
        { _type: 'partnerItem', name: 'Suprema' },
        { _type: 'partnerItem', name: 'Hikvision' },
        { _type: 'partnerItem', name: 'Axis' },
        { _type: 'partnerItem', name: 'Mobotix' },
      ],
    }),
    defineField({
      name: 'partnersRow2',
      title: 'Partners Row 2 (reversed marquee)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'partnerItem2',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
          ],
          preview: {
            select: { title: 'name' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Partner' }
            },
          },
        },
      ],
      initialValue: [
        { _type: 'partnerItem2', name: 'Mobotix' },
        { _type: 'partnerItem2', name: 'Axis' },
        { _type: 'partnerItem2', name: 'Hikvision' },
        { _type: 'partnerItem2', name: 'Suprema' },
        { _type: 'partnerItem2', name: 'TOA' },
        { _type: 'partnerItem2', name: 'Farfisa' },
        { _type: 'partnerItem2', name: 'Soyal' },
        { _type: 'partnerItem2', name: 'Paradox' },
        { _type: 'partnerItem2', name: 'Dahua' },
        { _type: 'partnerItem2', name: 'Bosch' },
        { _type: 'partnerItem2', name: 'Panasonic' },
        { _type: 'partnerItem2', name: 'Securiton' },
        { _type: 'partnerItem2', name: 'INIM' },
        { _type: 'partnerItem2', name: 'Esser' },
        { _type: 'partnerItem2', name: 'Honeywell' },
      ],
    }),
    defineField({
      name: 'certs',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'certItem',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Cert' }
            },
          },
        },
      ],
      initialValue: [
        { _type: 'certItem', label: 'ISO 9001:2015' },
        { _type: 'certItem', label: 'ISO 14001:2015' },
        { _type: 'certItem', label: 'ISO 27001' },
        { _type: 'certItem', label: 'ИТ–СТД-001' },
        { _type: 'certItem', label: 'Лиценз МВР № 2436' },
        { _type: 'certItem', label: 'EN 54' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Home · Partners',
        subtitle: 'homePartners block',
      }
    },
  },
})
