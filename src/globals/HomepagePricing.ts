import type { GlobalConfig } from 'payload'

export const HomepagePricing: GlobalConfig = {
  slug: 'homepage-pricing',
  label: 'Strona główna – Cennik',
  admin: { group: 'Strona główna' },
  access: { read: () => true },
  fields: [
    {
      name: 'sectionLabel',
      label: 'Etykieta sekcji',
      type: 'text',
      defaultValue: 'CENNIK',
    },
    {
      name: 'sectionTitle',
      label: 'Tytuł sekcji',
      type: 'text',
      defaultValue: 'Cennik dopasowany do twoich potrzeb',
    },
    {
      name: 'note',
      label: 'Przypis pod cennikiem',
      type: 'text',
      defaultValue: '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.',
    },
    {
      name: 'plans',
      label: 'Plany cenowe',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'name',
          label: 'Nazwa planu',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          label: 'Cena (np. "250 zł" lub "Zapytaj o cenę")',
          type: 'text',
          required: true,
        },
        {
          name: 'period',
          label: 'Okres (np. "/ mies. *")',
          type: 'text',
          admin: {
            description: 'Zostaw puste jeśli nie dotyczy',
          },
        },
        {
          name: 'features',
          label: 'Lista benefitów',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              label: 'Benefit',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'ctaText',
          label: 'Tekst przycisku',
          type: 'text',
          defaultValue: 'Zapisz się',
        },
        {
          name: 'ctaUrl',
          label: 'Link przycisku',
          type: 'text',
          defaultValue: '/kontakt',
        },
        {
          name: 'featured',
          label: 'Wyróżniony plan (ciemne tło)',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
