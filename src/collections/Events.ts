import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { autoSlug } from '../hooks/autoSlug'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Wydarzenie', plural: 'Wydarzenia' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'status', 'updatedAt'],
    group: 'Treści',
  },
  hooks: {
    beforeChange: [autoSlug('title')],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Generowany automatycznie z tytułu. Możesz nadpisać ręcznie.',
      },
    },
    {
      name: 'coverImage',
      label: 'Zdjęcie główne',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'startDate',
      label: 'Data rozpoczęcia',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'Data zakończenia',
      type: 'date',
    },
    {
      name: 'location',
      label: 'Miejsce',
      type: 'text',
    },
    {
      name: 'shortDescription',
      label: 'Krótki opis',
      type: 'textarea',
    },
    {
      name: 'content',
      label: 'Treść',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'registrationLink',
      label: 'Link do zapisów',
      type: 'text',
      admin: { description: 'URL do zewnętrznego formularza zapisów lub strony kontaktowej.' },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Nadchodzące', value: 'upcoming' },
        { label: 'W trakcie', value: 'ongoing' },
        { label: 'Zakończone', value: 'past' },
        { label: 'Anulowane', value: 'cancelled' },
      ],
    },
    {
      name: 'relatedClasses',
      label: 'Powiązane zajęcia',
      type: 'relationship',
      relationTo: 'classes',
      hasMany: true,
    },
  ],
}
