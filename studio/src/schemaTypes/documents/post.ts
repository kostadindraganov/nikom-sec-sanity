import { DocumentTextIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineField, defineType } from 'sanity'
import { definePathname } from '@tinloof/sanity-studio'
import type { Post } from '../../../../frontend/sanity.types'

const PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
const DEFAULT_LOCALE_ID = 'bg'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Meta' },
    { name: 'seo', title: 'SEO' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    defineField({
      name: 'locale',
      title: 'Language',
      type: 'string',
      group: 'settings',
      readOnly: true,
      initialValue: DEFAULT_LOCALE_ID,
      options: {
        list: [
          { title: '🇧🇬 Български', value: 'bg' },
          { title: '🇬🇧 English', value: 'en' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: rule => rule.required(),
    }),
    definePathname({
      name: 'pathname',
      group: 'settings',
      description:
        "The URL path for this post. Path must start with /blog/.",
      options: {
        source: (doc: any) => {
          if (!doc?.slug) return ''
          return `blog/${doc.slug}`
        },
        i18n: {
          enabled: true,
          defaultLocaleId: DEFAULT_LOCALE_ID,
          localizePathname: ({
            pathname,
            localeId,
          }: {
            pathname: string
            localeId?: string
          }) => `/${localeId || DEFAULT_LOCALE_ID}${pathname}`,
        },
        prefix: (doc: any) => `${PREVIEW_URL}/${doc.locale || DEFAULT_LOCALE_ID}`,
        autoNavigate: true,
      },
      validation: Rule =>
        Rule.custom(slug => {
          if (!slug?.current) return true
          if (!slug.current.startsWith('/blog/')) {
            return 'Path must start with /blog/ prefix.'
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: rule => {
            return rule.custom((alt, context) => {
              const document = context.document as Post
              if (document?.coverImage?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        },
      ],
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Cover Image URL (fallback)',
      type: 'string',
      group: 'content',
      description: 'Fallback path if no Sanity image is uploaded, e.g. /nikom/proj-tokuda.jpg',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'authorName',
      title: 'Author name (plain text)',
      type: 'string',
      group: 'content',
      description: 'Used when author reference is not set.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'meta',
      to: [{ type: 'postCategory' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'readTime',
      title: 'Read time (minutes)',
      type: 'number',
      group: 'meta',
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      group: 'meta',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Body content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      authorName: 'authorName',
      date: 'date',
      media: 'coverImage',
      locale: 'locale',
      pathname: 'pathname',
    },
    prepare({ title, media, authorFirstName, authorLastName, authorName, date, locale, pathname }) {
      const path = pathname?.current
        ? `/${locale || DEFAULT_LOCALE_ID}${pathname.current}`
        : ''
      const resolvedAuthor = authorFirstName && authorLastName
        ? `${authorFirstName} ${authorLastName}`
        : (authorName ?? '')
      const meta = [
        resolvedAuthor && `by ${resolvedAuthor}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ]
        .filter(Boolean)
        .join(' ')
      const subtitle = [path, meta].filter(Boolean).join(' · ')

      return { title, media, subtitle }
    },
  },
})
