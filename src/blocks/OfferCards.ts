import type { Block } from 'payload'

export const OfferCardsBlock: Block = {
  slug: 'offerCards',
  labels: { singular: 'Karty z ikonami', plural: 'Karty z ikonami' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek sekcji',
      type: 'text',
    },
    {
      name: 'subheading',
      label: 'Podtytuł sekcji',
      type: 'text',
    },
    {
      name: 'label',
      label: 'Etykieta nad nagłówkiem',
      type: 'text',
    },
    {
      name: 'items',
      label: 'Karty',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          label: 'Ikona',
          type: 'text',
          admin: {
            components: {
              Field: '@/components/admin/IconPickerField',
            },
          },
        },
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        { name: 'description', label: 'Opis', type: 'textarea' },
      ],
    },
  ],
}
