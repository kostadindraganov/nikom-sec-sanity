'use client';

import React, { useState } from 'react';
import { Counter, StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr, imageUrl } from '@/sanity/lib/utils';
import Image from 'next/image';

type KpiItem = {
  _key?: string;
  label?: string;
  value?: number;
  suffix?: string;
};

type Project = {
  _key?: string;
  title?: string;
  sector?: string;
  year?: string;
  image?: { asset?: { _ref?: string; url?: string }; hotspot?: unknown };
  imageFallback?: string;
  kpis?: KpiItem[];
  systems?: string[];
  href?: string;
  featured?: boolean;
};

type Props = {
  block?: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    projects?: Project[];
  };
  index?: number;
  pageId?: string;
  pageType?: string;
};

export default function HomeProjectsFeatured({ block, index, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const projects = block?.projects ?? [];

  const blockKey = block?._key ?? '';
  const path = (field: string) =>
    pageId && pageType && blockKey
      ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].${field}` }).toString()
      : undefined;

  const projArrayPath = path('projects');

  return (
    <section className="section-pad projects" id="projects">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div className="eyebrow" data-sanity={path('eyebrow')}>{eyebrow}</div>
            <h2 className="h2" data-sanity={path('heading')}>
              <StreamText text={heading} />
            </h2>
          </div>
          <div className="proj-filters">
            <span className="chip solid">Всички</span>
            <span className="chip">Здравеопазване</span>
            <span className="chip">Ритейл</span>
            <span className="chip">Държавни</span>
            <span className="chip">Индустрия</span>
            <a className="btn btn-ghost btn-sm" href="#">Виж всички 80+ <Icons.Arrow /></a>
          </div>
        </div>

        <div className="proj-grid" data-sanity={projArrayPath}>
          {projects.map((p, i) => {
            const itemKey = p._key ?? String(i);
            const imgSrc = imageUrl(p.image, p.imageFallback ? `/nikom/${p.imageFallback}` : '/nikom/proj-tokuda.jpg');

            return (
              <article
                className={'proj-card ' + (p.featured ? 'featured' : '')}
                key={itemKey}
                data-sanity={
                  pageId && pageType && blockKey
                    ? dataAttr({ id: pageId, type: pageType, path: `pageBuilder[_key=="${blockKey}"].projects[_key=="${itemKey}"]` }).toString()
                    : undefined
                }
              >
                <div className="proj-img">
                  <img src={imgSrc} alt={p.title ?? ''} className="proj-photo" loading="lazy" />
                  <div className="proj-overlay">
                    <span className="chip dark">{p.year ?? ''}</span>
                    <span className="chip solid">{p.sector ?? ''}</span>
                  </div>
                  <span className="proj-meta-stamp">PROJECT · {String(i + 1).padStart(3, '0')}</span>
                </div>
                <div className="proj-body">
                  <h3 className="h3 proj-title">{p.title ?? ''}</h3>
                  <div className="proj-systems">
                    {(p.systems ?? []).map((s) => (
                      <span className="chip" key={s}>{s}</span>
                    ))}
                  </div>
                  <div className="proj-kpis">
                    {(p.kpis ?? []).map((k, idx) => (
                      <div key={k._key ?? idx}>
                        <div className="meta">{k.label ?? ''}</div>
                        <div className="kpi-v">
                          <Counter to={k.value ?? 0} />{k.suffix ?? ''}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a className="card-link" href={p.href ?? '#'}>Виж проекта <Icons.Arrow /></a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
