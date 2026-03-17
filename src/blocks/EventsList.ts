import type { Block } from 'payload'

export const EventsListBlock: Block = {
  slug: 'eventsList',
  labels: { singular: 'Lista Wydarzeń', plural: 'Listy Wydarzeń' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'variant',
      label: 'Wariant',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Nadchodzące', value: 'upcoming' },
        { label: 'Poprzednie', value: 'past' },
        { label: 'Wszystkie', value: 'all' },
      ],
    },
    {
      name: 'limit',
      label: 'Maksymalna liczba wydarzeń',
      type: 'number',
      defaultValue: 6,
    },
    {
      name: 'manualSelection',
      label: 'Ręczny wybór wydarzeń (opcjonalnie)',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
    },
  ],
}
