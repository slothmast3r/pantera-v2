import type { CollectionConfig } from 'payload'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'Oferta', plural: 'Oferty' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Nazwa oferty', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'np. "dla-firm", "urodziny", "warsztaty-samoobrona-kobiet"' },
    },
    {
      name: 'category',
      label: 'Kategoria',
      type: 'select',
      options: [
        { label: 'Dla Firm', value: 'company' },
        { label: 'Dla Szkół', value: 'schools' },
        { label: 'Warsztaty', value: 'workshop' },
        { label: 'Urodziny', value: 'birthday' },
        { label: 'Inne', value: 'other' },
      ],
    },
    { name: 'coverImage', label: 'Zdjęcie główne', type: 'upload', relationTo: 'media' },

    // --- Nagłówek ---
    {
      name: 'heading',
      label: 'Nagłówek strony',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł (H1)', type: 'text', required: true },
        { name: 'subtitle', label: 'Lead / Podtytuł', type: 'textarea' },
        { name: 'backgroundImage', label: 'Zdjęcie w tle', type: 'upload', relationTo: 'media' },
      ],
    },

    // --- Wprowadzenie ---
    {
      name: 'intro',
      label: 'Sekcja wprowadzająca',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł sekcji', type: 'text' },
        { name: 'content', label: 'Opis', type: 'textarea' },
      ],
    },

    // --- Co proponujemy (karty) ---
    {
      name: 'offerings',
      label: 'Co proponujemy (karty z ikoną)',
      type: 'array',
      fields: [
        { name: 'icon', label: 'Ikona (emoji)', type: 'text' },
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        { name: 'description', label: 'Opis', type: 'textarea' },
      ],
    },

    // --- Forma współpracy ---
    {
      name: 'formats',
      label: 'Forma współpracy',
      type: 'array',
      fields: [
        { name: 'title', label: 'Nazwa formy', type: 'text', required: true },
        { name: 'description', label: 'Opis', type: 'textarea' },
      ],
    },

    // --- Dla kogo ---
    {
      name: 'forWho',
      label: 'Dla kogo?',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł sekcji', type: 'text' },
        { name: 'content', label: 'Opis', type: 'textarea' },
        {
          name: 'bullets',
          label: 'Lista punktów',
          type: 'array',
          fields: [{ name: 'text', label: 'Punkt', type: 'text' }],
        },
      ],
    },

    // --- Kontakt ---
    {
      name: 'contact',
      label: 'Kontakt dla tej oferty',
      type: 'group',
      fields: [
        { name: 'email', label: 'E-mail', type: 'email' },
        { name: 'phone', label: 'Telefon', type: 'text' },
        { name: 'note', label: 'Dodatkowa notatka', type: 'text' },
      ],
    },

    // --- CTA ---
    {
      name: 'cta',
      label: 'CTA',
      type: 'group',
      fields: [
        { name: 'heading', label: 'Nagłówek', type: 'text' },
        { name: 'description', label: 'Opis', type: 'textarea' },
        { name: 'buttonText', label: 'Tekst przycisku', type: 'text' },
        { name: 'buttonLink', label: 'Link przycisku', type: 'text' },
      ],
    },
  ],
}
