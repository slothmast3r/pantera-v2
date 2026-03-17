import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faqSection',
  labels: { singular: 'Sekcja FAQ', plural: 'Sekcje FAQ' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'faqs',
      label: 'Pytania i odpowiedzi',
      type: 'relationship',
      relationTo: 'faq',
      hasMany: true,
    },
  ],
}
