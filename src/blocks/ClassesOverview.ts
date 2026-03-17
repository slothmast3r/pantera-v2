import type { Block } from 'payload'

export const ClassesOverviewBlock: Block = {
  slug: 'classesOverview',
  labels: { singular: 'Przegląd Zajęć', plural: 'Przeglądy Zajęć' },
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
      name: 'classes',
      label: 'Zajęcia',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: true,
    },
  ],
}
