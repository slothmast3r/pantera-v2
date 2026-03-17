import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsSection',
  labels: { singular: 'Sekcja Opinii', plural: 'Sekcje Opinii' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'testimonials',
      label: 'Opinie',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
    },
  ],
}
