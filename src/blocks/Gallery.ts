import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'gallery',
  labels: {
    singular: 'Galeria',
    plural: 'Galerie',
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł galerii',
      type: 'text',
    },
    {
      name: 'images',
      label: 'Zdjęcia',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          label: 'Zdjęcie',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          label: 'Podpis (opcjonalnie)',
          type: 'text',
        },
      ],
    },
    {
      name: 'columns',
      label: 'Liczba kolumn (desktop)',
      type: 'number',
      defaultValue: 3,
      min: 1,
      max: 4,
      admin: {
        step: 1,
      },
    },
  ],
}
