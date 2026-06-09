import { defineType, defineField } from 'sanity'
import { ThListIcon } from '@sanity/icons'

export default defineType({
  name: 'servicesCatalog',
  title: 'Services Catalog',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Каталог · Изграждане на системи',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Дванадесет категории сертифицирани системи.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue:
        'Всеки тип система се изгражда самостоятелно или като част от интегрирана среда. Работим със сертифицирана техника от световни производители.',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          fields: [
            defineField({ name: 'n', title: 'Number', type: 'string', initialValue: '01' }),
            defineField({ name: 'k', title: 'Code', type: 'string', initialValue: 'FIRE' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'icon', title: 'Icon key', type: 'string' }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'stats',
              title: 'Stats',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'statItem',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'value' },
                    prepare({ title, subtitle }) {
                      return { title: title || 'Stat', subtitle }
                    },
                  },
                },
              ],
            }),
            defineField({ name: 'featured', title: 'Featured (PSIM)', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'n' },
            prepare({ title, subtitle }) {
              return { title: title || 'Service', subtitle: `#${subtitle}` }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'fire',
          n: '01', k: 'FIRE', title: 'Пожароизвестителни системи',
          desc: 'Адресируеми и конвенционални системи за ранна детекция, отговарящи на EN 54 и Наредба Iз-1971.',
          icon: 'fire', featured: false,
          tags: ['Esser by Honeywell', 'INIM', 'Securiton', 'Адресируеми', 'Аспирация VESDA', 'Сертифицирано EN 54'],
          stats: [
            { _key: 'f1', label: 'Покрити обекта', value: '210+' },
            { _key: 'f2', label: 'Стандарти', value: 'EN 54' },
            { _key: 'f3', label: 'Brands', value: '4' },
          ],
        },
        {
          _key: 'fire-ext',
          n: '02', k: 'FIRE-EXT', title: 'Пожарогасителни системи',
          desc: 'Спринклерни, газови, водно-мъглеви и пенни инсталации за критични зони и сървърни помещения.',
          icon: 'fire-ext', featured: false,
          tags: ['Спринклери', 'FM-200', 'FirePro', 'Водно-мъгляви', 'Газово', 'Пожарни кранове'],
          stats: [
            { _key: 'fe1', label: 'Реализирани', value: '60+' },
            { _key: 'fe2', label: 'Тип агенти', value: '5' },
            { _key: 'fe3', label: 'Лиценз ПБЗН', value: '№ 743' },
          ],
        },
        {
          _key: 'cctv',
          n: '03', k: 'CCTV', title: 'Видеонаблюдение',
          desc: 'IP/PTZ, термовизия, VMS и видеоанализ — с камери на Dahua, Panasonic и водещи производители.',
          icon: 'cam', featured: false,
          tags: ['IP / PTZ', 'Термовизия', 'VMS', 'AI видеоанализ', 'Dahua', 'Panasonic'],
          stats: [
            { _key: 'c1', label: 'Камери монтирани', value: '2 400+' },
            { _key: 'c2', label: 'Хранилище', value: 'до 90 дни' },
            { _key: 'c3', label: 'Резолюция', value: 'до 4K' },
          ],
        },
        {
          _key: 'panic',
          n: '04', k: 'PANIC', title: 'Паник системи',
          desc: 'Дискретни паник бутони с моментално оповестяване, връзка с дежурни центрове и патрулна реакция.',
          icon: 'panic', featured: false,
          tags: ['Стационарни', 'Мобилни', 'Дискретни', 'GSM модул', 'Връзка с СОТ'],
          stats: [
            { _key: 'p1', label: 'Реакция', value: '< 30 мин' },
            { _key: 'p2', label: 'Тип бутони', value: '8' },
            { _key: 'p3', label: '24/7 мониторинг', value: 'ДА' },
          ],
        },
        {
          _key: 'int',
          n: '05', k: 'INT', title: 'Сигнално-охранителни системи',
          desc: 'Алармени централи с периметрова и вътрешна защита от Paradox, INIM, Texecom — за всеки тип обект.',
          icon: 'int', featured: false,
          tags: ['Paradox', 'INIM', 'Texecom', 'Периметрова', 'Безжична', 'Хибридна'],
          stats: [
            { _key: 'i1', label: 'Зони на обект', value: 'до 256' },
            { _key: 'i2', label: 'GSM/IP комуникация', value: 'ДА' },
            { _key: 'i3', label: 'Резервиране', value: 'N+1' },
          ],
        },
        {
          _key: 'park',
          n: '06', k: 'PARK', title: 'Паркинг системи',
          desc: 'ANPR разпознаване на номера, бариери, тикет-машини и управление на платени паркинги.',
          icon: 'park', featured: false,
          tags: ['ANPR', 'Бариери', 'Тикет-системи', 'Платени', 'Free-flow', 'Интеграция HR'],
          stats: [
            { _key: 'pk1', label: 'Пропускателна способност', value: '1 200 авт/ч' },
            { _key: 'pk2', label: 'Точност ANPR', value: '98.5%' },
            { _key: 'pk3', label: 'Реакция', value: '< 1.2s' },
          ],
        },
        {
          _key: 'acs',
          n: '07', k: 'ACS', title: 'Системи за контрол на достъп',
          desc: 'RFID, биометрия, картови системи и турникети с интеграция към HR и работно време.',
          icon: 'key', featured: false,
          tags: ['RFID', 'Биометрия', 'Soyal', 'Турникети', 'Suprema', 'Работно време'],
          stats: [
            { _key: 'a1', label: 'Точки за контрол', value: '500+' },
            { _key: 'a2', label: 'Тип идентификация', value: '4' },
            { _key: 'a3', label: 'Интеграция HR', value: 'ДА' },
          ],
        },
        {
          _key: 'psim',
          n: '08', k: 'PSIM', title: 'Интегрирани системи за сигурност',
          desc: 'PSIM платформа, която обединява пожарна, охрана, достъп, видеонаблюдение и оповестяване в единна среда.',
          icon: 'psim', featured: true,
          tags: ['PSIM', 'SCADA', 'BMS интеграция', 'Unified Dashboard', 'Автоматизирани сценарии'],
          stats: [
            { _key: 'ps1', label: 'Подсистеми', value: '8' },
            { _key: 'ps2', label: 'Latency', value: '< 400ms' },
            { _key: 'ps3', label: 'Uptime', value: '99.97%' },
          ],
        },
        {
          _key: 'intercom',
          n: '09', k: 'INT2', title: 'Аудио и Видеодомофонни системи',
          desc: 'Farfisa и водещи производители — за жилищни сгради, офиси и охраняеми обекти.',
          icon: 'intercom', featured: false,
          tags: ['Farfisa', 'IP домофон', 'Видео', 'Мобилно приложение', 'Многоабонатни'],
          stats: [
            { _key: 'ic1', label: 'Тип системи', value: '6' },
            { _key: 'ic2', label: 'Абонати', value: 'до 1024' },
            { _key: 'ic3', label: 'IP/2-wire', value: 'Двата' },
          ],
        },
        {
          _key: 'comm',
          n: '10', k: 'COMM', title: 'Комуникационни системи',
          desc: 'Вътрешни комуникации, интерком, безжични и hands-free решения за индустриални среди.',
          icon: 'comm', featured: false,
          tags: ['Интерком', 'Безжични', 'Hands-free', 'Wallphones', 'Indust. grade'],
          stats: [
            { _key: 'co1', label: 'Реализирани', value: '40+' },
            { _key: 'co2', label: 'IP54+', value: 'ДА' },
            { _key: 'co3', label: 'Шум', value: 'до 95 dB' },
          ],
        },
        {
          _key: 'pa',
          n: '11', k: 'PA', title: 'Озвучителни и оповестителни системи',
          desc: 'Гласово евакуационно оповестяване EN 54-16 (Bosch, TOA), фоново озвучаване и конферентни системи.',
          icon: 'speaker', featured: false,
          tags: ['Bosch', 'TOA', 'EN 54-16', 'VES', 'Фоново озвучаване', 'Конферентни'],
          stats: [
            { _key: 'pa1', label: 'Сертифицирано EN 54-16', value: 'ДА' },
            { _key: 'pa2', label: 'Зони на обект', value: 'до 64' },
            { _key: 'pa3', label: 'Watts', value: 'до 5 kW' },
          ],
        },
        {
          _key: 'sks',
          n: '12', k: 'SKS', title: 'Структурни кабелни системи',
          desc: 'Cat6/6A медни и FO оптични мрежи, сървърни шкафове, патч панели — основата на всяка интегрирана система.',
          icon: 'net', featured: false,
          tags: ['Cat 6/6A', 'Cat 7', 'Optical Fiber', 'Сървърни шкафове', 'Trasses', 'Patch panels'],
          stats: [
            { _key: 'sk1', label: 'Точки изградени', value: '12 000+' },
            { _key: 'sk2', label: 'FO дължини', value: '85 km' },
            { _key: 'sk3', label: 'Сертификация Fluke', value: 'ДА' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Services Catalog', subtitle: 'servicesCatalog' }
    },
  },
})
