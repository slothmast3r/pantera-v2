import type { Field } from 'payload'

export const seoFields: Field = {
  name: 'seo',
  label: 'SEO',
  type: 'group',
  admin: {
    description: 'Ustawienia SEO dla tej strony. Zostaw puste aby użyć domyślnych wartości.',
  },
  fields: [
    {
      name: 'metaTitle',
      label: 'Meta tytuł',
      type: 'text',
      admin: {
        description: 'Tytuł wyświetlany w wynikach Google (max ~60 znaków).',
      },
    },
    {
      name: 'metaDescription',
      label: 'Meta opis',
      type: 'textarea',
      admin: {
        description: 'Opis wyświetlany w wynikach Google (max ~160 znaków).',
      },
    },
    {
      name: 'ogImage',
      label: 'Zdjęcie OG (social media)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Zdjęcie wyświetlane przy udostępnianiu na Facebooku, Twitterze itp.',
      },
    },
  ],
}
