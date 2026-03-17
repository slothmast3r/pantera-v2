import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Statystyki', plural: 'Statystyki' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Statystyki',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'value',
          label: 'Wartość (np. "500+" lub "10 lat")',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Etykieta',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Dodatkowy opis',
          type: 'text',
        },
      ],
    },
  ],
}
