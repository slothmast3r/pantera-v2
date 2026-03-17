import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      label: 'Krótki opis',
      type: 'textarea',
    },
    {
      name: 'columns',
      label: 'Kolumny stopki',
      type: 'array',
      fields: [
        {
          name: 'heading',
          label: 'Nagłówek kolumny',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Linki',
          type: 'array',
          fields: [
            { name: 'label', label: 'Etykieta', type: 'text', required: true },
            { name: 'href', label: 'Link', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social media',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platforma',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
          ],
          required: true,
        },
        { name: 'url', label: 'URL', type: 'text', required: true },
      ],
    },
    {
      name: 'bottomText',
      label: 'Tekst na dole (copyright)',
      type: 'text',
    },
  ],
}
