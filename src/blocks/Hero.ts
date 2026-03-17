import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Sekcja Hero', plural: 'Sekcje Hero' },
  fields: [
    {
      name: 'title',
      label: 'Tytuł',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Podtytuł',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'backgroundImage',
      label: 'Zdjęcie w tle',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'primaryCta',
      label: 'Główny przycisk CTA',
      type: 'group',
      fields: [
        { name: 'text', label: 'Tekst', type: 'text' },
        { name: 'link', label: 'Link', type: 'text' },
      ],
    },
    {
      name: 'secondaryCta',
      label: 'Drugi przycisk CTA',
      type: 'group',
      fields: [
        { name: 'text', label: 'Tekst', type: 'text' },
        { name: 'link', label: 'Link', type: 'text' },
      ],
    },
    {
      name: 'socialProof',
      label: 'Dowody społeczne',
      type: 'group',
      fields: [
        {
          name: 'googleReviewsText',
          label: 'Tekst Google Reviews',
          type: 'text',
        },
        {
          name: 'partnerLogos',
          label: 'Logo partnerów',
          type: 'array',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            { name: 'name', label: 'Nazwa', type: 'text' },
          ],
        },
      ],
    },
  ],
}
