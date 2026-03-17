import type { Block } from 'payload'

export const InstructorsBlock: Block = {
  slug: 'instructorsSection',
  labels: { singular: 'Sekcja Instruktorów', plural: 'Sekcje Instruktorów' },
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
      name: 'instructors',
      label: 'Instruktorzy',
      type: 'relationship',
      relationTo: 'instructors',
      hasMany: true,
    },
  ],
}
