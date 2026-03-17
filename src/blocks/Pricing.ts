import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  labels: { singular: 'Cennik', plural: 'Cenniki' },
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
      name: 'plans',
      label: 'Plany cenowe',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          label: 'Nazwa planu',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          label: 'Cena',
          type: 'text',
          required: true,
        },
        {
          name: 'period',
          label: 'Okres (np. "/ miesiąc")',
          type: 'text',
        },
        {
          name: 'features',
          label: 'Cechy planu',
          type: 'array',
          fields: [
            { name: 'text', label: 'Cecha', type: 'text', required: true },
          ],
        },
        {
          name: 'isFeatured',
          label: 'Wyróżniony plan',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'ctaText',
          label: 'Tekst przycisku',
          type: 'text',
        },
        {
          name: 'ctaLink',
          label: 'Link przycisku',
          type: 'text',
        },
      ],
    },
  ],
}
