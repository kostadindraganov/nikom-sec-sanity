import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { draftMode } from 'next/headers'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { VisualEditing } from 'next-sanity/visual-editing'
import { Toaster } from 'sonner'

import { DraftModeToast } from '@/app/components/DraftModeToast'
import { SiteChrome } from '@/app/components/nikom/SiteChrome'
import { Footer } from '@/app/components/nikom/Footer'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import { handleError } from '@/app/client-utils'
import { routing } from '@/i18n/routing'
import '@/app/nikom/nikom.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const { data: settings } = await sanityFetch({ query: settingsQuery, stega: false })

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined
  } catch {
    // ignore
  }

  return {
    metadataBase,
    title: { template: `%s | ${t('siteTitle')}`, default: t('siteTitle') },
    description: t('siteDescription'),
    openGraph: {
      images: ogImage ? [ogImage] : [],
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
  }
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled: isDraftMode } = await draftMode()
  const { data: settings } = await sanityFetch({ query: settingsQuery })

  const nav: { label: string; href: string }[] | undefined =
    settings?.headerNav?.map((n) => ({ label: n.label ?? '', href: n.href ?? '/' })) ?? undefined
  const footerColumns: { title: string; links: { label: string; href: string }[] }[] | undefined =
    settings?.footerColumns?.map((col) => ({
      title: col.title ?? '',
      links: (col.links ?? []).map((l) => ({ label: l.label ?? '', href: l.href ?? '#' })),
    })) ?? undefined
  const social: { label: string; href: string }[] | undefined =
    settings?.social?.map((sl) => ({ label: sl.label ?? '', href: sl.href ?? '#' })) ?? undefined

  return (
    <html
      lang={locale}
      data-theme="light"
      className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geologica:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Toaster theme="light" />
          {isDraftMode && (
            <>
              <DraftModeToast />
              <VisualEditing />
            </>
          )}
          <SanityLive onError={handleError} />
          <SiteChrome
            nav={nav}
            phone={settings?.phone ?? undefined}
            phoneDisplay={settings?.phoneDisplay ?? undefined}
            ctaText={settings?.ctaText ?? undefined}
          />
          <main>{children}</main>
          <Footer
            tagline={settings?.footerTagline ?? undefined}
            social={social}
            footerColumns={footerColumns}
            phone={settings?.phone ?? undefined}
            phoneDisplay={settings?.phoneDisplay ?? undefined}
            ghostText={settings?.footerGhostText ?? undefined}
            ghostSub={settings?.footerGhostSub ?? undefined}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
