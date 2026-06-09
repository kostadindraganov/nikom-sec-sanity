'use client';

import React, { useState } from 'react';
import { Counter, StreamText } from '@/app/components/nikom/animations';
import { Icons } from '@/app/components/nikom/icons';
import { dataAttr } from '@/sanity/lib/utils';
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

const DEFAULT_PROJECTS: Project[] = [
  {
    _key: 'proj-tokuda',
    title: 'Аджибадем Сити Клиник · Болница Токуда',
    sector: 'Здравеопазване',
    year: '2022',
    imageFallback: 'proj-tokuda.jpg',
    systems: ['Пожароизвестяване', 'Видеонаблюдение', 'Контрол на достъп', 'Гласово оповестяване', 'Структурно окабеляване'],
    kpis: [
      { _key: 'k1', label: 'Обекта', value: 3, suffix: '' },
      { _key: 'k2', label: 'Камери', value: 312, suffix: '' },
      { _key: 'k3', label: 'Сензори', value: 1850, suffix: '+' },
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
      { _key: 'k1', label: 'Обекта', value: 28, suffix: '' },
      { _key: 'k2', label: 'Камери', value: 640, suffix: '+' },
      { _key: 'k3', label: 'Сензори', value: 1240, suffix: '+' },
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
      { _key: 'k1', label: 'Обекта', value: 1, suffix: '' },
      { _key: 'k2', label: 'Камери', value: 96, suffix: '' },
      { _key: 'k3', label: 'Сензори', value: 210, suffix: '' },
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
      { _key: 'k1', label: 'Обекта', value: 2, suffix: '' },
      { _key: 'k2', label: 'Камери', value: 84, suffix: '' },
      { _key: 'k3', label: 'Сензори', value: 156, suffix: '' },
    ],
    href: '#',
    featured: false,
  },
];

export default function HomeProjectsFeatured({ block, index, pageId, pageType }: Props) {
  const eyebrow = block?.eyebrow ?? 'Проекти · Избрани';
  const heading = block?.heading ?? 'Доказани решения в обекти с висока критичност.';
  const projects = block?.projects ?? DEFAULT_PROJECTS;

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
            const imgSrc = p.imageFallback ? `/nikom/${p.imageFallback}` : '/nikom/proj-tokuda.jpg';

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
