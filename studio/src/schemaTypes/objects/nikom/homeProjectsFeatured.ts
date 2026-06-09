import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const homeProjectsFeatured = defineType({
  name: 'homeProjectsFeatured',
  title: 'Home — Featured Projects',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Проекти · Избрани',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Доказани решения в обекти с висока критичност.',
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuredProject',
          title: 'Project',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', initialValue: '' }),
            defineField({ name: 'sector', title: 'Sector', type: 'string', initialValue: '' }),
            defineField({ name: 'year', title: 'Year', type: 'string', initialValue: '' }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'imageFallback', title: 'Image Fallback (filename in /nikom/)', type: 'string', initialValue: '' }),
            defineField({
              name: 'kpis',
              title: 'KPIs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'kpiItem',
                  title: 'KPI',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', initialValue: '' }),
                    defineField({ name: 'value', title: 'Value', type: 'number', initialValue: 0 }),
                    defineField({ name: 'suffix', title: 'Suffix (e.g. +, %)', type: 'string', initialValue: '' }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'value' },
                    prepare({ title, subtitle }) {
                      return { title: title || 'KPI', subtitle: String(subtitle) }
                    },
                  },
                },
              ],
            }),
            defineField({
              name: 'systems',
              title: 'Systems (chip tags)',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({ name: 'href', title: 'Link href', type: 'string', initialValue: '#' }),
            defineField({ name: 'featured', title: 'Featured (wide card)', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'sector',
              media: 'image',
            },
            prepare({ title, subtitle, media }) {
              return { title: title || 'Project', subtitle: subtitle || 'Project', media }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'proj-tokuda',
          title: 'Аджибадем Сити Клиник · Болница Токуда',
          sector: 'Здравеопазване',
          year: '2022',
          imageFallback: 'proj-tokuda.jpg',
          systems: ['Пожароизвестяване', 'Видеонаблюдение', 'Контрол на достъп', 'Гласово оповестяване', 'Структурно окабеляване'],
          kpis: [
            { _key: 'kpi-t1', label: 'Обекта', value: 3, suffix: '' },
            { _key: 'kpi-t2', label: 'Камери', value: 312, suffix: '' },
            { _key: 'kpi-t3', label: 'Сензори', value: 1850, suffix: '+' },
          ],
          href: '#',
          featured: true,
        },
        {
          _key: 'proj-hipoland',
          title: 'Верига магазини ХИПОЛЕНД',
          sector: 'Ритейл',
          year: '2019—2025',
          imageFallback: 'proj-hipoland.jpg',
          systems: ['Пожароизвестяване', 'CCTV', 'СОТ', 'Озвучаване'],
          kpis: [
            { _key: 'kpi-h1', label: 'Обекта', value: 28, suffix: '' },
            { _key: 'kpi-h2', label: 'Камери', value: 640, suffix: '+' },
            { _key: 'kpi-h3', label: 'Сензори', value: 1240, suffix: '+' },
          ],
          href: '#',
          featured: false,
        },
        {
          _key: 'proj-onko',
          title: 'Болница по хематология',
          sector: 'Здравеопазване',
          year: '2021',
          imageFallback: 'proj-onkobolnitsa.jpg',
          systems: ['Газово пожарогасене', 'ASD', 'Контрол на достъп'],
          kpis: [
            { _key: 'kpi-o1', label: 'Обекта', value: 1, suffix: '' },
            { _key: 'kpi-o2', label: 'Камери', value: 96, suffix: '' },
            { _key: 'kpi-o3', label: 'Сензори', value: 210, suffix: '' },
          ],
          href: '#',
          featured: false,
        },
        {
          _key: 'proj-poland',
          title: 'Посолство и резиденция · Република Полша',
          sector: 'Държавни обекти',
          year: '2020',
          imageFallback: 'proj-poland.jpg',
          systems: ['Периметрова защита', 'CCTV', 'ACS', 'PA'],
          kpis: [
            { _key: 'kpi-p1', label: 'Обекта', value: 2, suffix: '' },
            { _key: 'kpi-p2', label: 'Камери', value: 84, suffix: '' },
            { _key: 'kpi-p3', label: 'Сензори', value: 156, suffix: '' },
          ],
          href: '#',
          featured: false,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return { title: title || 'Featured Projects', subtitle: 'homeProjectsFeatured' }
    },
  },
})
