import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { autoSlug } from '../hooks/autoSlug'
import { revalidateEvents, revalidateEventsOnDelete } from '../hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Wydarzenie', plural: 'Wydarzenia' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startDate', 'cancelled', 'updatedAt'],
    group: 'Treści',
  },
  hooks: {
    beforeChange: [autoSlug('title')],
    afterChange: [revalidateEvents],
    afterDelete: [revalidateEventsOnDelete],
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
      validate: (value: any, { data }: { data: Record<string, unknown> }) => {
        if (!value || !data.startDate) return true
        if (new Date(value) < new Date(data.startDate as string)) {
          return 'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.'
        }
        return true
      },
    },
    {
      name: 'time',
      label: 'Godzina',
      type: 'text',
      admin: { description: 'Np. „18:00" lub „18:00–20:00". Opcjonalne.' },
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
      name: 'cancelled',
      label: 'Anulowane',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Zaznacz jeśli wydarzenie zostało odwołane.' },
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
