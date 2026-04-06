import type { GlobalConfig } from 'payload'

export const HomepageServices: GlobalConfig = {
  slug: 'homepage-services',
  label: 'Strona główna – Usługi dodatkowe',
  admin: { group: 'Komponenty' },
  access: { read: () => true },
  fields: [
    {
      name: 'sectionLabel',
      label: 'Etykieta sekcji',
      type: 'text',
      defaultValue: 'USŁUGI DODATKOWE',
    },
    {
      name: 'sectionTitle',
      label: 'Tytuł sekcji',
      type: 'text',
      defaultValue: 'Pantera to także:',
    },
    {
      name: 'columns',
      label: 'Liczba kart w rzędzie',
      type: 'select',
      defaultValue: '2',
      options: [
        { label: '2 karty', value: '2' },
        { label: '3 karty', value: '3' },
        { label: '4 karty', value: '4' },
      ],
    },
    {
      name: 'cards',
      label: 'Karty',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: 'tag',
          label: 'Tag / kategoria',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Tytuł',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Opis',
          type: 'textarea',
          required: true,
        },
        {
          name: 'ctaText',
          label: 'Tekst przycisku',
          type: 'text',
          defaultValue: 'Sprawdź ofertę',
        },
        {
          name: 'ctaUrl',
          label: 'Link przycisku',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          label: 'Kolor tła karty (hex)',
          type: 'text',
          defaultValue: '#2a5298',
          admin: {
            description: 'Np. #2a5298, #8b0000, #1a6b3c',
          },
        },
        {
          name: 'image',
          label: 'Zdjęcie tła (opcjonalne)',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
