import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { autoSlug } from '../hooks/autoSlug'
import { seoFields } from '../fields/seo'
import { revalidateClasses, revalidateClassesOnDelete } from '../hooks/revalidate'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const Classes: CollectionConfig = {
  slug: 'classes',
  labels: { singular: 'Zajęcia', plural: 'Zajęcia' },
  versions: {
    drafts: { autosave: { interval: 500 } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'ageGroup', 'updatedAt'],
    group: 'Treści',
    livePreview: {
      url: ({ data }) => `${SITE_URL}/zajecia/${(data as any).slug}`,
    },
    preview: (doc) => `${SITE_URL}/zajecia/${(doc as any).slug}`,
  },
  hooks: {
    beforeChange: [autoSlug('title')],
    afterChange: [revalidateClasses],
    afterDelete: [revalidateClassesOnDelete],
  },
  access: {
    read: () => true,
  },
  fields: [
    // --- Meta ---
    {
      name: 'title',
      label: 'Nazwa zajęć',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Generowany automatycznie z nazwy. Możesz nadpisać ręcznie.' },
    },
    {
      name: 'type',
      label: 'Typ zajęć',
      type: 'select',
      options: [
        { label: 'Krav Maga', value: 'krav-maga' },
        { label: 'Karate', value: 'karate' },
        { label: 'Tai Chi', value: 'tai-chi' },
        { label: 'Indywidualne', value: 'individual' },
        { label: 'ASG', value: 'asg' },
        { label: 'Power Training', value: 'power-training' },
        { label: 'Inne', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'ageGroup',
      label: 'Grupa wiekowa',
      type: 'select',
      options: [
        { label: 'Dorośli', value: 'adults' },
        { label: 'Dzieci', value: 'children' },
        { label: 'Wszystkie', value: 'all' },
      ],
      defaultValue: 'adults',
    },
    {
      name: 'coverImage',
      label: 'Zdjęcie główne',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Wyświetlane na liście zajęć i w nagłówku podstrony.' },
    },

    // --- Nagłówek ---
    {
      name: 'heading',
      label: 'Nagłówek strony',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        { name: 'subtitle', label: 'Podtytuł', type: 'text' },
        {
          name: 'backgroundImage',
          label: 'Zdjęcie w tle nagłówka',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // --- Wprowadzenie ---
    {
      name: 'introduction',
      label: 'Wprowadzenie (czym są te zajęcia)',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł', type: 'text' },
        {
          name: 'content',
          label: 'Treść',
          type: 'richText',
          editor: lexicalEditor(),
        },
        {
          name: 'image',
          label: 'Zdjęcie',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // --- Wyróżnik ---
    {
      name: 'highlights',
      label: 'Wyróżnik (czego nauczysz się na zajęciach)',
      type: 'array',
      fields: [
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        { name: 'description', label: 'Opis', type: 'textarea' },
        { name: 'icon', label: 'Ikona', type: 'text' },
      ],
    },

    // --- Benefity ---
    {
      name: 'benefits',
      label: 'Benefity (pewność siebie, sprawność fizyczna...)',
      type: 'array',
      fields: [
        { name: 'title', label: 'Tytuł', type: 'text', required: true },
        { name: 'description', label: 'Opis', type: 'textarea' },
        { name: 'icon', label: 'Ikona', type: 'text' },
      ],
    },

    // --- Sekcja dla kogo / czego oczekiwać ---
    {
      name: 'targetAudience',
      label: 'Sekcja: dla kogo i czego oczekiwać',
      type: 'group',
      fields: [
        { name: 'forWhoTitle', label: 'Tytuł "Dla kogo"', type: 'text' },
        { name: 'forWhoContent', label: 'Treść "Dla kogo"', type: 'textarea' },
        { name: 'expectTitle', label: 'Tytuł "Czego oczekiwać"', type: 'text' },
        { name: 'expectContent', label: 'Treść "Czego oczekiwać"', type: 'textarea' },
      ],
    },

    // --- Redirect (odsyłacz do zajęć dzieci / dorosłych) ---
    {
      name: 'redirect',
      label: 'Redirect (np. oferta dla dzieci / dorosłych)',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł', type: 'text' },
        { name: 'description', label: 'Opis', type: 'textarea' },
        {
          name: 'targetClass',
          label: 'Zajęcia docelowe',
          type: 'relationship',
          relationTo: 'classes',
        },
        { name: 'buttonText', label: 'Tekst przycisku', type: 'text' },
      ],
    },

    // --- Informacje organizacyjne ---
    {
      name: 'logistics',
      label: 'Informacje organizacyjne',
      type: 'group',
      fields: [
        {
          name: 'intensity',
          label: 'Intensywność',
          type: 'select',
          options: [
            { label: 'Mała', value: 'low' },
            { label: 'Średnia', value: 'medium' },
            { label: 'Średnia/Duża', value: 'medium-high' },
            { label: 'Duża', value: 'high' },
          ],
        },
        { name: 'whatToBring', label: 'Co zabrać', type: 'text', admin: { description: 'np. "Długie spodnie sportowe, koszulka, woda"' } },
      ],
    },

    // --- Instruktor (opcjonalnie) ---
    {
      name: 'instructor',
      label: 'Instruktor (opcjonalnie)',
      type: 'relationship',
      relationTo: 'instructors',
    },

    // --- Opinie ---
    {
      name: 'testimonials',
      label: 'Opinie Pantera',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
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

    // --- SEO ---
    seoFields,
  ],
}
