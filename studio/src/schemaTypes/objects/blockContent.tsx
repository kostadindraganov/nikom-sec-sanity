import { defineArrayMember, defineType, defineField } from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
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
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
      ],
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code block',
      options: { withFilename: true },
    }),
    defineArrayMember({
      type: 'object',
      name: 'videoEmbed',
      title: 'Video',
      fields: [
        defineField({
          name: 'url',
          title: 'YouTube / Vimeo URL',
          type: 'url',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
      preview: {
        select: { url: 'url', caption: 'caption' },
        prepare({ url, caption }) {
          return { title: '▶ ' + (caption || 'Video'), subtitle: url }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'fileAttachment',
      title: 'File / PDF',
      fields: [
        defineField({
          name: 'file',
          title: 'File',
          type: 'file',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'label',
          title: 'Button label',
          type: 'string',
          initialValue: 'Изтегли',
        }),
      ],
      preview: {
        select: { label: 'label' },
        prepare({ label }) {
          return { title: '📎 ' + (label || 'File') }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout',
      fields: [
        defineField({
          name: 'variant',
          title: 'Вариант',
          type: 'string',
          initialValue: 'info',
          options: {
            list: [
              { title: '💡 Info', value: 'info' },
              { title: '⚠️ Warning', value: 'warning' },
              { title: '🚨 Danger', value: 'danger' },
              { title: '✅ Success', value: 'success' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'body',
          title: 'Текст',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required(),
        }),
      ],
      preview: {
        select: { variant: 'variant', body: 'body' },
        prepare({ variant, body }: { variant: string; body: string }) {
          const icons: Record<string, string> = { info: '💡', warning: '⚠️', danger: '🚨', success: '✅' }
          return { title: `${icons[variant] ?? '💡'} ${body?.slice(0, 60) ?? ''}` }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'table',
      title: 'Таблица',
      fields: [
        defineField({
          name: 'caption',
          title: 'Заглавие на таблицата',
          type: 'string',
        }),
        defineField({
          name: 'rows',
          title: 'Редове',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              title: 'Ред',
              fields: [
                defineField({
                  name: 'cells',
                  title: 'Клетки (разделени с Enter)',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
              ],
              preview: {
                select: { cells: 'cells' },
                prepare({ cells }: { cells?: string[] }) {
                  return { title: cells?.join(' | ') || 'Ред' }
                },
              },
            },
          ],
        }),
      ],
      preview: {
        select: { caption: 'caption', rows: 'rows' },
        prepare({ caption, rows }: { caption?: string; rows?: unknown[] }) {
          return { title: `⊞ ${caption || 'Таблица'}`, subtitle: `${rows?.length ?? 0} реда` }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'ctaButton',
      title: 'CTA Button',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'href',
          title: 'URL',
          type: 'url',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'variant',
          title: 'Стил',
          type: 'string',
          initialValue: 'primary',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
              { title: 'Outline', value: 'outline' },
            ],
            layout: 'radio',
          },
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open in new tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      preview: {
        select: { label: 'label', href: 'href' },
        prepare({ label, href }) {
          return { title: `→ ${label}`, subtitle: href }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'divider',
      title: 'Divider',
      fields: [
        defineField({
          name: 'style',
          title: 'Стил',
          type: 'string',
          initialValue: 'line',
          options: {
            list: [
              { title: 'Line', value: 'line' },
              { title: 'Space', value: 'space' },
            ],
            layout: 'radio',
          },
        }),
      ],
      preview: {
        select: { style: 'style' },
        prepare({ style }) {
          return { title: style === 'space' ? '— Разстояние —' : '— Разделител —' }
        },
      },
    }),
  ],
})
