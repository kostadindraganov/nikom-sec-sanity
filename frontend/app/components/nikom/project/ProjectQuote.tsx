import { dataAttr } from '@/sanity/lib/utils'

type Props = {
  doc: {
    _id?: string
    quote?: {
      text?: string | null
      author?: string | null
      role?: string | null
    } | null
  }
  pageId: string
}

export function ProjectQuote({ doc, pageId }: Props) {
  if (!doc?.quote?.text) return null

  return (
    <section className="section-pad single-quote">
      <div className="container">
        <div className="sq-wrap">
          <svg
            width="80"
            height="60"
            viewBox="0 0 80 60"
            fill="currentColor"
            className="sq-mark"
          >
            <path
              d="M0 60V30C0 13.5 13.5 0 30 0v15c-8.3 0-15 6.7-15 15h15v30H0zm45 0V30C45 13.5 58.5 0 75 0v15c-8.3 0-15 6.7-15 15h15v30H45z"
              opacity=".18"
            />
          </svg>
          <blockquote>
            <p
              className="sq-text"
              data-sanity={dataAttr({ id: pageId, type: 'project', path: 'quote.text' }).toString()}
            >
              {doc.quote.text}
            </p>
            <footer>
              <div>
                <strong
                  data-sanity={dataAttr({ id: pageId, type: 'project', path: 'quote.author' }).toString()}
                >
                  {doc.quote.author ?? ''}
                </strong>
                <span
                  data-sanity={dataAttr({ id: pageId, type: 'project', path: 'quote.role' }).toString()}
                >
                  {doc.quote.role ?? ''}
                </span>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
