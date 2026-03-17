import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Opinia', plural: 'Opinie' },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'relatedClass', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      label: 'Autor',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      label: 'Zdjęcie autora',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Treść opinii',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Ocena (1–5)',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'relatedClass',
      label: 'Powiązane zajęcia',
      type: 'relationship',
      relationTo: 'classes',
    },
    {
      name: 'isFeatured',
      label: 'Wyróżniona',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
