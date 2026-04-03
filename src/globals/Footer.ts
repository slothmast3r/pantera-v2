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
      admin: {
        description: 'Linki do mediów społecznościowych wyświetlane w stopce.',
      },
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
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Snapchat', value: 'snapchat' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Inne', value: 'other' },
          ],
          required: true,
        },
        { name: 'url', label: 'URL', type: 'text', required: true },
        {
          name: 'customIcon',
          label: 'Ikona Font Awesome (tylko dla „Inne")',
          type: 'text',
          admin: {
            description: 'Nazwa klasy Font Awesome Brands bez prefiksu "fa-", np. "mastodon", "bluesky", "threads". Lista: fontawesome.com/icons?f=brands',
            placeholder: 'np. bluesky',
            condition: (_, siblingData) => siblingData?.platform === 'other',
          },
        },
        {
          name: 'label',
          label: 'Etykieta (aria-label)',
          type: 'text',
          admin: {
            description: 'Tekst dla czytników ekranowych, np. "Śledź nas na Instagramie".',
            placeholder: 'np. Instagram Pantera',
          },
        },
      ],
    },
    {
      name: 'bottomText',
      label: 'Tekst na dole (copyright)',
      type: 'text',
    },
  ],
}
