import { CogIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Settings schema Singleton.  Singletons are single documents that are displayed not in a collection, handy for things like site settings and other global configurations.
 * Learn more: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
 */

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact / Email' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: 'Sanity, Next.js, and Cloudflare Starter Template',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'description',
      description: 'Used on the Homepage',
      title: 'Description',
      type: 'array',
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'A starter template for Sanity, Next.js, and Cloudflare. Build high-performance, content-first web applications.',
            },
          ],
        },
      ],
      of: [
        // Define a minified block content field for the description. https://www.sanity.io/docs/block-content
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'linkType',
                    title: 'Link Type',
                    type: 'string',
                    initialValue: 'href',
                    options: {
                      list: [
                        { title: 'URL', value: 'href' },
                        { title: 'Page', value: 'page' },
                        { title: 'Post', value: 'post' },
                      ],
                      layout: 'radio',
                    },
                  }),
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    hidden: ({ parent }) => parent?.linkType !== 'href' && parent?.linkType != null,
                    validation: Rule =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'href' && !value) {
                          return 'URL is required when Link Type is URL'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'page',
                    title: 'Page',
                    type: 'reference',
                    to: [{ type: 'page' }],
                    hidden: ({ parent }) => parent?.linkType !== 'page',
                    validation: Rule =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'page' && !value) {
                          return 'Page reference is required when Link Type is Page'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'post',
                    title: 'Post',
                    type: 'reference',
                    to: [{ type: 'post' }],
                    hidden: ({ parent }) => parent?.linkType !== 'post',
                    validation: Rule =>
                      Rule.custom((value, context: any) => {
                        if (context.parent?.linkType === 'post' && !value) {
                          return 'Post reference is required when Link Type is Post'
                        }
                        return true
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
      ],
    }),
    // ── Navigation ──────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'NIKOM Security',
      group: 'navigation',
    }),
    defineField({
      name: 'headerNav',
      title: 'Header Navigation',
      type: 'array',
      group: 'navigation',
      initialValue: [
        { _type: 'navItem', label: 'Начало', href: '/' },
        { _type: 'navItem', label: 'За нас', href: '/za-nas' },
        { _type: 'navItem', label: 'Услуги', href: '/uslugi' },
        { _type: 'navItem', label: 'Проекти', href: '/proekti' },
        { _type: 'navItem', label: 'Блог', href: '/blog' },
        { _type: 'navItem', label: 'Контакт', href: '/kontakt' },
      ],
      of: [
        defineArrayMember({
          name: 'navItem',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'href', type: 'string', title: 'Path / URL' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone (machine-readable)',
      type: 'string',
      initialValue: '+359894523970',
      group: 'navigation',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone (display)',
      type: 'string',
      initialValue: '+359 89 45 23 970',
      group: 'navigation',
    }),
    defineField({
      name: 'ctaText',
      title: 'Header CTA Button Text',
      type: 'string',
      initialValue: 'Заявете консултация',
      group: 'navigation',
    }),
    defineField({
      name: 'licenseText',
      title: 'License Text',
      type: 'string',
      initialValue: 'Лиценз № 2436-2017 · МВР',
      group: 'navigation',
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'string',
      initialValue: 'Sofia · Plovdiv · Varna · Burgas',
      group: 'navigation',
    }),
    defineField({
      name: 'liveText',
      title: 'Live Duty Text',
      type: 'string',
      initialValue: 'LIVE — Дежурен инженер на линия',
      group: 'navigation',
    }),
    // ── Footer ───────────────────────────────────────────────
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
      initialValue: 'Инженерен партньор за интегрирани системи за сигурност, пожарна безопасност и контрол на достъп.',
      group: 'footer',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'array',
      group: 'footer',
      initialValue: [
        { _type: 'socialLink', label: 'LinkedIn', href: '#' },
        { _type: 'socialLink', label: 'Facebook', href: '#' },
        { _type: 'socialLink', label: 'YouTube', href: '#' },
      ],
      of: [
        defineArrayMember({
          name: 'socialLink',
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Label' }),
            defineField({ name: 'href', type: 'string', title: 'URL' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      group: 'footer',
      initialValue: [
        {
          _type: 'footerColumn',
          title: 'Навигация',
          links: [
            { _type: 'navItem', label: 'Начало', href: '/' },
            { _type: 'navItem', label: 'За нас', href: '/za-nas' },
            { _type: 'navItem', label: 'Услуги', href: '/uslugi' },
            { _type: 'navItem', label: 'Проекти', href: '/proekti' },
            { _type: 'navItem', label: 'Блог', href: '/blog' },
            { _type: 'navItem', label: 'Контакт', href: '/kontakt' },
          ],
        },
        {
          _type: 'footerColumn',
          title: 'Услуги',
          links: [
            { _type: 'navItem', label: 'Пожароизвестяване', href: '/uslugi' },
            { _type: 'navItem', label: 'Видеонаблюдение', href: '/uslugi' },
            { _type: 'navItem', label: 'Контрол на достъп', href: '/uslugi' },
            { _type: 'navItem', label: 'Паник системи', href: '/uslugi' },
            { _type: 'navItem', label: 'Озвучаване', href: '/uslugi' },
            { _type: 'navItem', label: 'Структурно окабеляване', href: '/uslugi' },
            { _type: 'navItem', label: 'Интеграция (PSIM)', href: '/uslugi' },
          ],
        },
      ],
      of: [
        defineArrayMember({
          name: 'footerColumn',
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Column Title' }),
            defineField({
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                defineArrayMember({
                  name: 'navItem',
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'string', title: 'Label' }),
                    defineField({ name: 'href', type: 'string', title: 'Path / URL' }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerGhostText',
      title: 'Footer Ghost Text (large)',
      type: 'string',
      initialValue: 'NIKOM',
      group: 'footer',
    }),
    defineField({
      name: 'footerGhostSub',
      title: 'Footer Ghost Sub Text',
      type: 'string',
      initialValue: 'СИСТЕМИ ЗА СИГУРНОСТ',
      group: 'footer',
    }),
    // ── Contact / Email ─────────────────────────────────────
    defineField({
      name: 'contactEmail',
      title: 'Recipient Email',
      description: 'Имейл адресът, на който се изпращат запитванията от контактната форма.',
      type: 'string',
      group: 'contact',
      initialValue: 'nikomsecuritysystems@gmail.com',
      validation: rule => rule.email().required(),
    }),
    defineField({
      name: 'contactFromName',
      title: 'From Name',
      description: 'Изпращачът, показан в имейла (напр. "Nikom Security Форма").',
      type: 'string',
      group: 'contact',
      initialValue: 'Nikom Security Форма',
    }),
    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      fields: [
        defineField({
          name: 'alt',
          description: 'Important for accessibility and SEO.',
          title: 'Alternative text',
          type: 'string',
          validation: rule => {
            return rule.custom((alt, context) => {
              if ((context.document?.ogImage as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
        defineField({
          name: 'metadataBase',
          type: 'url',
          description:
            'The base URL used to resolve relative OG image and metadata paths. More info: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
