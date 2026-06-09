import { defineType, defineField, defineArrayMember } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export default defineType({
  name: 'homeIndustries',
  title: 'Home — Industries',
  type: 'object',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Сектори · 06 индустрии',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Системи, изпитани в най-критични среди.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 2,
      initialValue:
        'Всеки сектор има специфични нормативни изисквания и риск-профил. Подходът ни е адаптиран към всеки от тях.',
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sector',
          fields: [
            defineField({ name: 'name', type: 'string', title: 'Sector name (display label)' }),
            defineField({
              name: 'k',
              type: 'string',
              title: 'Sector key (CSS/data key)',
              options: {
                list: [
                  { title: 'Hospital', value: 'hospital' },
                  { title: 'Retail', value: 'retail' },
                  { title: 'Hotel', value: 'hotel' },
                  { title: 'Industrial', value: 'ind' },
                  { title: 'Office', value: 'office' },
                  { title: 'Government', value: 'gov' },
                ],
              },
            }),
            defineField({ name: 'code', type: 'string', title: 'SOC code pill (e.g. H+, R, GOV)' }),
            defineField({ name: 'kpi', type: 'number', title: 'KPI number' }),
            defineField({ name: 'kpiLabel', type: 'string', title: 'KPI label (e.g. ЗОНИ)' }),
            defineField({
              name: 'events',
              title: 'SOC event log lines (5 items)',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: {
            select: { name: 'name', k: 'k' },
            prepare({ name, k }) {
              return { title: name ?? k ?? 'Sector', subtitle: `key: ${k ?? '—'}` }
            },
          },
        }),
      ],
      initialValue: [
        {
          _key: 'sec1',
          name: 'Болници и лечебни заведения',
          k: 'hospital',
          code: 'H+',
          kpi: 187,
          kpiLabel: 'ЗОНИ',
          events: ['Зона 12 · OK', 'Достъп · Кардиология', 'ASD · норма', 'Камера 47 · активна', 'Газ-гасене · armed'],
        },
        {
          _key: 'sec2',
          name: 'Търговски вериги & ритейл',
          k: 'retail',
          code: 'R',
          kpi: 640,
          kpiLabel: 'КАМЕРИ',
          events: ['EAS · Каса 04', 'POS-CCTV синхрон', 'Зона 03 · норма', 'Видеоанализ · OK', 'Склад · вход 2'],
        },
        {
          _key: 'sec3',
          name: 'Хотели и жилищни комплекси',
          k: 'hotel',
          code: 'HSP',
          kpi: 248,
          kpiLabel: 'СТАИ',
          events: ['Карта · етаж 7', 'Лоби · OK', 'Паркинг · вход 2', 'Пожар · норма', 'SPA зона · OK'],
        },
        {
          _key: 'sec4',
          name: 'Индустриални и складови бази',
          k: 'ind',
          code: 'IND',
          kpi: 412,
          kpiLabel: 'СЕНЗОРИ',
          events: ['Периметър · OK', 'Радар · сектор B', 'Бариера · вход 2', 'VESDA · норма', 'ATEX зона · OK'],
        },
        {
          _key: 'sec5',
          name: 'Офис и административни сгради',
          k: 'office',
          code: 'OFF',
          kpi: 16,
          kpiLabel: 'ЕТАЖА',
          events: ['Турникет · вход юг', 'BMS · норма', 'Зона 4 · OK', 'Лифт · сервиз', 'Дата-център · OK'],
        },
        {
          _key: 'sec6',
          name: 'Държавни и институционални',
          k: 'gov',
          code: 'GOV',
          kpi: 92,
          kpiLabel: 'ЗОНИ',
          events: ['Бариера · вход 1', 'ID-контрол · активен', 'Периметър · OK', 'Архив · заключен', 'Sally-port · clear'],
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return {
        title: heading ?? 'Home — Industries',
        subtitle: 'homeIndustries block',
        media: EarthGlobeIcon,
      }
    },
  },
})
