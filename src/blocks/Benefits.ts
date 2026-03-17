import type { Block } from 'payload'

export const BenefitsBlock: Block = {
  slug: 'benefits',
  labels: { singular: 'Sekcja Benefitów', plural: 'Sekcje Benefitów' },
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
      label: 'Benefity',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          label: 'Ikona (nazwa lub URL)',
          type: 'text',
        },
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
      ],
    },
  ],
}
