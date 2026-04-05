import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: { singular: 'Pytanie FAQ', plural: 'FAQ' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order', 'updatedAt'],
    group: 'Treści',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      label: 'Pytanie',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Odpowiedź',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      label: 'Kategoria',
      type: 'select',
      options: [
        { label: 'Ogólne', value: 'general' },
        { label: 'Zajęcia', value: 'classes' },
        { label: 'Cennik', value: 'pricing' },
        { label: 'Dla Firm', value: 'corporate' },
        { label: 'Zapisy', value: 'registration' },
      ],
    },
    {
      name: 'order',
      label: 'Kolejność',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
