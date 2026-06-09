import { defineField, defineType } from 'sanity'
import { SearchIcon } from '@sanity/icons'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides the page title in search results. Leave empty to use the document title.',
      validation: rule => rule.max(70).warning('Keep under 70 characters for best results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Overrides the meta description. Leave empty to use the excerpt/summary.',
      validation: rule => rule.max(160).warning('Keep under 160 characters for best results'),
    }),
    defineField({
      name: 'image',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Overrides the Open Graph image (1200×630 recommended). Leave empty to use the cover image.',
      options: {
        hotspot: true,
        aiAssist: { imageDescriptionField: 'alt' },
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'When enabled, this page will not appear in Google and other search engines.',
      initialValue: false,
    }),
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})
