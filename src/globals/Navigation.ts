import { revalidateGlobalAll } from '../hooks/revalidate'
import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Nawigacja',
  admin: { group: 'Wygląd' },
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
      name: 'logoText',
      label: 'Tekst logo (fallback)',
      type: 'text',
      defaultValue: 'Pantera',
    },
    {
      name: 'links',
      label: 'Linki nawigacji',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Etykieta',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Adres URL',
          type: 'text',
          required: true,
        },
        {
          name: 'subLinks',
          label: 'Podlinki',
          type: 'array',
          fields: [
            { name: 'label', label: 'Etykieta', type: 'text', required: true },
            { name: 'href', label: 'Adres URL', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'ctaButton',
      label: 'Przycisk CTA w nawigacji',
      type: 'group',
      fields: [
        { name: 'text', label: 'Tekst', type: 'text' },
        { name: 'href', label: 'Link', type: 'text' },
      ],
    },
  ],
}
