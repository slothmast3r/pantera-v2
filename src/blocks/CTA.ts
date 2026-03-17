import type { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'CTA', plural: 'CTA' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'primaryButton',
      label: 'Główny przycisk',
      type: 'group',
      fields: [
        { name: 'text', label: 'Tekst', type: 'text', required: true },
        { name: 'link', label: 'Link', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryButton',
      label: 'Drugi przycisk (opcjonalnie)',
      type: 'group',
      fields: [
        { name: 'text', label: 'Tekst', type: 'text' },
        { name: 'link', label: 'Link', type: 'text' },
      ],
    },
    {
      name: 'variant',
      label: 'Wariant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Domyślny', value: 'default' },
        { label: 'Ciemne tło', value: 'dark' },
        { label: 'Kolorowe tło', value: 'accent' },
      ],
    },
  ],
}
