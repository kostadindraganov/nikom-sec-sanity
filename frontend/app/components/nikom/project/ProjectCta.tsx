'use client'

import { StreamText } from '@/app/components/nikom/animations'
import { Icons } from '@/app/components/nikom/icons'

export function ProjectCta() {
  return (
    <section className="section-pad about-cta">
      <div className="container">
        <div className="cta-band">
          <div>
            <div className="eyebrow">Подобен обект?</div>
            <h2 className="h2">
              <StreamText text="Започнете с консултация." />
            </h2>
            <p>Получавате обратна връзка от&nbsp;инженер до&nbsp;4 работни часа.</p>
          </div>
          <div className="cta-band-actions">
            <a className="btn btn-primary btn-lg" href="/bg/kontakt">
              Заявете консултация <Icons.Arrow />
            </a>
            <a className="btn btn-ghost btn-lg" href="/bg/uslugi">
              Вижте услуги
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
