import { defineField, defineType } from 'sanity'
import { PlugIcon } from '@sanity/icons'

export const homeIntegration = defineType({
  name: 'homeIntegration',
  title: 'Home — Integration Architecture',
  type: 'object',
  icon: PlugIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Архитектура · Интеграция',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Една централа. Всички подсистеми.',
    }),
    defineField({
      name: 'lead',
      title: 'Lead paragraph',
      type: 'text',
      rows: 3,
      initialValue:
        'Сценарий, при който димен датчик задейства CCTV запис, локално оповестяване, евакуационни маршрути и уведомяване на дежурния — за секунди.',
    }),
    defineField({
      name: 'subsystems',
      title: 'Subsystems (ArchNode labels)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'subsystem',
          title: 'Subsystem',
          fields: [
            defineField({ name: 'key', title: 'Code (e.g. FIRE)', type: 'string' }),
            defineField({ name: 'label', title: 'Label (e.g. Пожароизвестяване)', type: 'string' }),
            defineField({
              name: 'icon',
              title: 'Icon kind',
              type: 'string',
              options: {
                list: [
                  { title: 'Fire', value: 'fire' },
                  { title: 'Camera', value: 'cam' },
                  { title: 'Key/ACS', value: 'key' },
                  { title: 'Bell/Alarm', value: 'bell' },
                  { title: 'Speaker/PA', value: 'speaker' },
                  { title: 'Barrier', value: 'bar' },
                  { title: 'Intercom', value: 'intercom' },
                  { title: 'Network/BMS', value: 'net' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'key', subtitle: 'label' },
            prepare({ title, subtitle }) {
              return { title: title || 'Subsystem', subtitle }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'sub-fire', key: 'FIRE', label: 'Пожароизвестяване', icon: 'fire' },
        { _key: 'sub-cctv', key: 'CCTV', label: 'Видеонаблюдение', icon: 'cam' },
        { _key: 'sub-acs', key: 'ACS', label: 'Контрол на достъп', icon: 'key' },
        { _key: 'sub-int', key: 'INT', label: 'Алармени системи', icon: 'bell' },
        { _key: 'sub-pa', key: 'PA', label: 'Озвучаване / PA', icon: 'speaker' },
        { _key: 'sub-prk', key: 'PRK', label: 'Паркинг / ANPR', icon: 'bar' },
        { _key: 'sub-int2', key: 'INT2', label: 'Аудио-видеодомофон', icon: 'intercom' },
        { _key: 'sub-bms', key: 'BMS', label: 'BMS / Сграда', icon: 'net' },
      ],
    }),
    defineField({
      name: 'events',
      title: 'Live Event Stream items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'eventItem',
          title: 'Event',
          fields: [
            defineField({ name: 'time', title: 'Time (e.g. 14:02:11)', type: 'string' }),
            defineField({ name: 'tag', title: 'Tag (e.g. INFO)', type: 'string' }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: { list: ['info', 'ok', 'warn', 'alert'] },
            }),
            defineField({ name: 'msg', title: 'Message', type: 'string' }),
          ],
          preview: {
            select: { title: 'msg', subtitle: 'tag' },
            prepare({ title, subtitle }) {
              return { title: title || 'Event', subtitle }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'ev1', time: '14:02:11', tag: 'INFO', kind: 'info', msg: 'Heartbeat — всички подсистеми online' },
        { _key: 'ev2', time: '14:03:48', tag: 'OK', kind: 'ok', msg: 'ACS-A1 · валидиран достъп (карта #2847)' },
        { _key: 'ev3', time: '14:05:22', tag: 'INFO', kind: 'info', msg: 'CCTV-C7 · PTZ patrol cycle стартиран' },
        { _key: 'ev4', time: '14:07:09', tag: 'WARN', kind: 'warn', msg: 'FIRE-F2 · смущение в detector loop 3' },
        { _key: 'ev5', time: '14:07:11', tag: 'OK', kind: 'ok', msg: 'FIRE-F2 · self-check premium · възстановен' },
        { _key: 'ev6', time: '14:09:34', tag: 'INFO', kind: 'info', msg: 'PA · scheduled announcement OK' },
        { _key: 'ev7', time: '14:11:50', tag: 'OK', kind: 'ok', msg: 'BMS · HVAC синхронизация валидна' },
      ],
    }),
    defineField({
      name: 'kpis',
      title: 'KPI Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'archKpi',
          title: 'KPI',
          fields: [
            defineField({ name: 'value', title: 'Value (number)', type: 'number' }),
            defineField({ name: 'suffix', title: 'Suffix (e.g. %, ms)', type: 'string', initialValue: '' }),
            defineField({ name: 'prefix', title: 'Prefix (e.g. <)', type: 'string', initialValue: '' }),
            defineField({ name: 'decimals', title: 'Decimal places', type: 'number', initialValue: 0 }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
            prepare({ title, subtitle }) {
              return { title: title || 'KPI', subtitle: String(subtitle) }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'kpi-nodes', value: 248, suffix: '', prefix: '', decimals: 0, label: 'активни нод-а' },
        { _key: 'kpi-subs', value: 8, suffix: '', prefix: '', decimals: 0, label: 'подсистеми' },
        { _key: 'kpi-uptime', value: 99.97, suffix: '%', prefix: '', decimals: 2, label: 'uptime · 90 дни' },
        { _key: 'kpi-latency', value: 400, suffix: 'ms', prefix: '<', decimals: 0, label: 'cross-system latency' },
      ],
    }),
    defineField({
      name: 'scenarioSteps',
      title: 'Scenario Timeline steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'scenarioStep',
          title: 'Scenario Step',
          fields: [
            defineField({ name: 'time', title: 'Time offset (e.g. +0.0s)', type: 'string' }),
            defineField({ name: 'tag', title: 'Tag (e.g. F2)', type: 'string' }),
            defineField({
              name: 'kind',
              title: 'Kind',
              type: 'string',
              options: { list: ['alert', 'ok', 'warn', 'info'] },
            }),
            defineField({ name: 'msg', title: 'Message', type: 'string' }),
          ],
          preview: {
            select: { title: 'msg', subtitle: 'time' },
            prepare({ title, subtitle }) {
              return { title: title || 'Step', subtitle }
            },
          },
        },
      ],
      initialValue: [
        { _key: 'sc1', time: '+0.0s', tag: 'F2', kind: 'alert', msg: 'Димен датчик в зона F2 · trigger' },
        { _key: 'sc2', time: '+0.4s', tag: 'CCTV', kind: 'ok', msg: 'PTZ pre-set към зоната · запис започва' },
        { _key: 'sc3', time: '+0.8s', tag: 'ACS', kind: 'ok', msg: 'Евакуационни маршрути · отключени' },
        { _key: 'sc4', time: '+1.2s', tag: 'PA', kind: 'warn', msg: 'Гласово оповестяване · евакуация' },
        { _key: 'sc5', time: '+1.8s', tag: 'OPS', kind: 'info', msg: 'Дежурен инженер · push notification' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return { title: title || 'Integration Architecture', subtitle: 'homeIntegration' }
    },
  },
})
