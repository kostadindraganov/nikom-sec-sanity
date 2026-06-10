import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons'

export const projectsHero = defineType({
  name: 'projectsHero',
  title: 'Projects Hero',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow text',
      type: 'string',
      initialValue: 'NIKOM · АРХИВ ОТ РЕАЛНИ ПРОЕКТИ',
    }),
    defineField({
      name: 'heading1',
      title: 'Heading line 1',
      type: 'string',
      initialValue: 'Проектирани с инженерия.',
    }),
    defineField({
      name: 'heading2',
      title: 'Heading line 2',
      type: 'string',
      initialValue: 'Изпълнени с прецизност.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead text',
      type: 'text',
      rows: 2,
      initialValue: '11 избрани реализации в здравеопазване, хотелиерство, ритейл и държавни обекти.',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'Разгледай проектите',
    }),
    defineField({
      name: 'ctaGhostLabel',
      title: 'Ghost CTA label',
      type: 'string',
      initialValue: 'Заявете консултация',
    }),
    defineField({
      name: 'ctaGhostHref',
      title: 'Ghost CTA href',
      type: 'string',
      initialValue: '/bg/kontakt',
    }),
    defineField({
      name: 'videoLight',
      title: 'Hero video — Light theme',
      description: 'Background video shown when the site is in Light theme (MP4, muted, loops).',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'videoDark',
      title: 'Hero video — Dark theme',
      description: 'Background video shown when the site is in Dark theme (MP4, muted, loops).',
      type: 'file',
      options: { accept: 'video/*' },
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Poster image (fallback)',
      description: 'Shown while the video loads, or when no video is uploaded.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      heading1: 'heading1',
    },
    prepare({ heading1 }) {
      return {
        title: heading1 ?? 'Projects Hero',
        subtitle: 'projectsHero',
      }
    },
  },
})
