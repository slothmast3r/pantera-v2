import type { Block } from 'payload'

export const ForWhoBlock: Block = {
  slug: 'forWho',
  labels: { singular: 'Dla kogo', plural: 'Sekcje dla kogo' },
  fields: [
    {
      name: 'label',
      label: 'Etykieta',
      type: 'text',
      defaultValue: 'UCZESTNICY',
    },
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'bullets',
      label: 'Lista punktów',
      type: 'array',
      fields: [
        { name: 'text', label: 'Punkt', type: 'text', required: true },
      ],
    },
    {
      name: 'variant',
      label: 'Wariant',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Ciemne tło', value: 'dark' },
        { label: 'Jasne tło', value: 'light' },
      ],
    },
  ],
}
