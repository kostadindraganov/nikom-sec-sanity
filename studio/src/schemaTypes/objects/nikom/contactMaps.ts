import { defineType, defineField, defineArrayMember } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'
const Globe = EarthGlobeIcon

export default defineType({
  name: 'contactMaps',
  title: 'Contact — Maps',
  type: 'object',
  icon: Globe,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Локация · OBJ-NIKOM-HQ',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Намерете ни.',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude (display)',
      type: 'string',
      initialValue: '42.6502° N',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude (display)',
      type: 'string',
      initialValue: '23.3796° E',
    }),
    defineField({
      name: 'sector',
      title: 'Sector label',
      type: 'string',
      initialValue: 'Sofia · Mladost 4',
    }),
    defineField({
      name: 'objectId',
      title: 'Object ID',
      type: 'string',
      initialValue: 'NIKOM-HQ-001',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      initialValue:
        'https://www.google.com/maps/search/?api=1&query=NIKOM%20%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B8%20%D0%B7%D0%B0%20%D0%A1%D0%B8%D0%B3%D1%83%D1%80%D0%BD%D0%BE%D1%81%D1%82%2C%20%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F',
    }),
    defineField({
      name: 'wazeUrl',
      title: 'Waze URL',
      type: 'url',
      initialValue: 'https://www.waze.com/ul?ll=42.6502%2C23.3796&navigate=yes',
    }),
    defineField({
      name: 'appleMapsUrl',
      title: 'Apple Maps URL',
      type: 'url',
      initialValue: 'https://maps.apple.com/?ll=42.6502,23.3796&q=NIKOM%20Security',
    }),
    defineField({
      name: 'embedUrl',
      title: 'Google Maps embed URL (iframe src)',
      type: 'url',
      initialValue:
        'https://www.google.com/maps?q=%D0%B6%D0%BA.%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82%204%2C%20%D0%B1%D0%BB%D0%BE%D0%BA%20477%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&output=embed&hl=bg&z=16',
    }),
    defineField({
      name: 'locations',
      title: 'Map pin locations',
      description: 'Array of named map views / pins shown in map tabs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'mapLocation',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'embedUrl', title: 'Embed URL', type: 'url' }),
            defineField({ name: 'coords', title: 'Coords (lat,lng)', type: 'string' }),
          ],
          preview: {
            select: { title: 'label' },
            prepare({ title }) {
              return { title: title ?? '(location)', subtitle: 'Map location' }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title ?? 'contactMaps', subtitle: 'Contact — Maps' }
    },
  },
})
