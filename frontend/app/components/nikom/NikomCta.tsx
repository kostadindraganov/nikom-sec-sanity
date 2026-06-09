'use client';

import { stegaClean } from 'next-sanity';
import { StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr } from '@/sanity/lib/utils';

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    sub?: string;
    buttonPrimary?: { label?: string; href?: string };
    buttonSecondary?: { label?: string; href?: string };
    theme?: string;
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function NikomCta({ block, index, pageId, pageType }: Props) {
  const path = `pageBuilder[_key=="${block?._key}"]`;
  // stegaClean only on theme — it drives className logic
  const theme = stegaClean(block?.theme) ?? 'light';

  return (
    <section className={`section-pad about-cta${theme === 'dark' ? ' dark-band' : ''}`}>
      <div className="container">
        <div className="cta-band">
          <div>
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.eyebrow` }).toString()}
            >
              {block?.eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.heading` }).toString()}
            >
              <StreamText text={block?.heading} />
            </h2>
            <p
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.sub` }).toString()}
            >
              {block?.sub}
            </p>
          </div>
          <div className="cta-band-actions">
            <a
              className="btn btn-primary btn-lg"
              href={block?.buttonPrimary?.href}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.buttonPrimary` }).toString()}
            >
              {block?.buttonPrimary?.label} <Icons.Arrow />
            </a>
            <a
              className="btn btn-ghost btn-lg"
              href={block?.buttonSecondary?.href}
              data-sanity={dataAttr({ id: pageId, type: pageType, path: `${path}.buttonSecondary` }).toString()}
            >
              {block?.buttonSecondary?.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
