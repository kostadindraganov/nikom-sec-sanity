import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['bg'],
  defaultLocale: 'bg',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
