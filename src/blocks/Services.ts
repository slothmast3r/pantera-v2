import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: { singular: 'Usługi', plural: 'Usługi' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'items',
      label: 'Usługi',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Tytuł',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Opis',
          type: 'textarea',
        },
        {
          name: 'icon',
          label: 'Ikona',
          type: 'text',
        },
        {
          name: 'link',
          label: 'Link (opcjonalnie)',
          type: 'text',
        },
      ],
    },
  ],
}
