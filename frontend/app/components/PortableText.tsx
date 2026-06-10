import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'
import { ResolvedLink } from '@/app/components/ResolvedLink'
import { SanityImage } from '@/app/components/SanityImage'
import { dataset, projectId } from '@/sanity/lib/api'

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/\s]{11})/)
  return match?.[1] ?? null
}

function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match?.[1] ?? null
}

function buildFileUrl(ref: string): string {
  // ref format: file-{hash}-{extension}
  const parts = ref.replace('file-', '').split('-')
  const ext = parts.pop()
  const hash = parts.join('-')
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${hash}.${ext}`
}

export const CustomPortableText = ({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null
        return (
          <figure className="my-8">
            <SanityImage
              id={value.asset._ref}
              alt={value.alt || ''}
              width={672}
              crop={value.crop}
              mode="cover"
              className="rounded-sm"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">{value.caption}</figcaption>
            )}
          </figure>
        )
      },

      code: ({ value }) => (
        <pre className="my-6 overflow-x-auto rounded bg-gray-900 p-4 text-sm text-gray-100">
          {value.filename && (
            <div className="mb-2 text-xs text-gray-400">{value.filename}</div>
          )}
          <code>{value.code}</code>
        </pre>
      ),

      videoEmbed: ({ value }) => {
        if (!value?.url) return null
        const ytId = extractYouTubeId(value.url)
        const vimeoId = extractVimeoId(value.url)
        const src = ytId
          ? `https://www.youtube.com/embed/${ytId}`
          : vimeoId
            ? `https://player.vimeo.com/video/${vimeoId}`
            : null
        if (!src) return null
        return (
          <figure className="my-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <iframe
                src={src}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-gray-500">{value.caption}</figcaption>
            )}
          </figure>
        )
      },

      fileAttachment: ({ value }) => {
        if (!value?.file?.asset?._ref) return null
        const url = buildFileUrl(value.file.asset._ref)
        return (
          <div className="my-6">
            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-current px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
            >
              <span>📎</span>
              {value.label || 'Изтегли'}
            </a>
          </div>
        )
      },

      callout: ({ value }) => {
        const styles: Record<string, string> = {
          info: 'border-blue-400 bg-blue-50 text-blue-900',
          warning: 'border-yellow-400 bg-yellow-50 text-yellow-900',
          danger: 'border-red-400 bg-red-50 text-red-900',
          success: 'border-green-400 bg-green-50 text-green-900',
        }
        const icons: Record<string, string> = {
          info: '💡', warning: '⚠️', danger: '🚨', success: '✅',
        }
        const variant = value.variant || 'info'
        return (
          <div className={`my-6 flex gap-3 rounded border-l-4 p-4 ${styles[variant] ?? styles.info}`}>
            <span className="shrink-0 text-lg">{icons[variant] ?? '💡'}</span>
            <p className="m-0">{value.body}</p>
          </div>
        )
      },

      table: ({ value }) => {
        if (!value?.rows?.length) return null
        return (
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {value.rows.map((row: any) => (
                  <tr key={row._key} className="border-b border-gray-200">
                    {row.cells?.map((cell: string, i: number) => (
                      <td key={i} className="px-3 py-2 align-top">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      },

      ctaButton: ({ value }) => {
        if (!value?.href || !value?.label) return null
        const variantClass = value.variant === 'outline'
          ? 'border border-current bg-transparent'
          : value.variant === 'secondary'
            ? 'bg-gray-800 text-white'
            : 'bg-brand text-white'
        return (
          <div className="my-6">
            <a
              href={value.href}
              target={value.openInNewTab ? '_blank' : undefined}
              rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
              className={`inline-block rounded px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80 ${variantClass}`}
            >
              {value.label}
            </a>
          </div>
        )
      },

      divider: ({ value }) => {
        if (value?.style === 'space') return <div className="my-12" />
        return <hr className="my-8 border-gray-200" />
      },
    },

    block: {
      h1: ({ children, value }) => (
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => (
        <h2 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 transition-opacity group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </a>
        </h2>
      ),
    },

    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div className={`prose-a:text-brand prose ${className}`}>
      <PortableText components={components} value={value} />
    </div>
  )
}
