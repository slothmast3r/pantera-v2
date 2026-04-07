import type { CollectionConfig } from 'payload'
import { autoSlug } from '../hooks/autoSlug'
import { seoFields } from '../fields/seo'
import { revalidateInstructors, revalidateInstructorsOnDelete } from '../hooks/revalidate'

export const Instructors: CollectionConfig = {
  slug: 'instructors',
  labels: { singular: 'Instruktor', plural: 'Instruktorzy' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialization', 'updatedAt'],
    group: 'Treści',
  },
  hooks: {
    beforeChange: [autoSlug('name')],
    afterChange: [revalidateInstructors],
    afterDelete: [revalidateInstructorsOnDelete],
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
      admin: { description: 'Generowany automatycznie z imienia. Używany w URL /kadra/[slug].' },
    },
    {
      name: 'photo',
      label: 'Zdjęcie',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Kwadratowe zdjęcie profilowe. Zalecany rozmiar: min. 600×600px.' },
    },
    {
      name: 'specialization',
      label: 'Specjalizacja',
      type: 'text',
      admin: { description: 'Wyświetlana pod imieniem, np. "KRAV MAGA / SAMOOBRONA".' },
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
      admin: {
        description: 'Mniejsza liczba = wyżej na liście. 0 = domyślna kolejność.',
      },
    },

    // --- SEO ---
    seoFields,
  ],
}
