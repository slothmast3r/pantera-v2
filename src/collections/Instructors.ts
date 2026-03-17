import type { CollectionConfig } from 'payload'

export const Instructors: CollectionConfig = {
  slug: 'instructors',
  labels: { singular: 'Instruktor', plural: 'Instruktorzy' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialization', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Imię i nazwisko',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      unique: true,
      admin: { description: 'np. "michal-jaworski" — używany w URL /kadra/[slug]' },
    },
    {
      name: 'photo',
      label: 'Zdjęcie',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'specialization',
      label: 'Specjalizacja',
      type: 'text',
    },
    {
      name: 'classes',
      label: 'Prowadzone zajęcia',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: true,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
    },
    {
      name: 'achievements',
      label: 'Osiągnięcia',
      type: 'array',
      fields: [
        { name: 'text', label: 'Osiągnięcie', type: 'text', required: true },
      ],
    },
    {
      name: 'order',
      label: 'Kolejność wyświetlania',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
