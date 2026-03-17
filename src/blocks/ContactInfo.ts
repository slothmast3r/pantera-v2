import type { Block } from 'payload'

export const ContactInfoBlock: Block = {
  slug: 'contactInfo',
  labels: { singular: 'Dane Kontaktowe', plural: 'Dane Kontaktowe' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'address',
      label: 'Adres',
      type: 'text',
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'openingHours',
      label: 'Godziny otwarcia',
      type: 'array',
      fields: [
        { name: 'day', label: 'Dzień', type: 'text', required: true },
        { name: 'hours', label: 'Godziny', type: 'text', required: true },
      ],
    },
  ],
}
