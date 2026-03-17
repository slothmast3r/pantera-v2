import type { Block } from 'payload'

export const LogoListBlock: Block = {
  slug: 'logoList',
  labels: { singular: 'Lista Logo', plural: 'Listy Logo' },
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
      name: 'logos',
      label: 'Logo',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          label: 'Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'name', label: 'Nazwa firmy', type: 'text' },
        { name: 'url', label: 'Link do strony', type: 'text' },
      ],
    },
  ],
}
