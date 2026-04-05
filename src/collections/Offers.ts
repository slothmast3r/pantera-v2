import type { CollectionConfig } from 'payload'
import { autoSlug } from '../hooks/autoSlug'
import { seoFields } from '../fields/seo'
import { RichTextBlock } from '../blocks/RichText'
import { CTABlock } from '../blocks/CTA'
import { FAQBlock } from '../blocks/FAQBlock'
import { OfferCardsBlock } from '../blocks/OfferCards'
import { ForWhoBlock } from '../blocks/ForWho'
import { ContactCardBlock } from '../blocks/ContactCard'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'Oferta', plural: 'Oferty' },
  versions: {
    drafts: {
      autosave: { interval: 500 },
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
    group: 'Treści',
    livePreview: {
      url: ({ data }) => `${SITE_URL}/oferta/${data.slug}`,
    },
    preview: (doc) => `${SITE_URL}/oferta/${(doc as any).slug}`,
  },
  hooks: {
    beforeChange: [autoSlug('title')],
  },
  access: { read: () => true },
  fields: [
    // --- Metadane ---
    {
      name: 'title',
      label: 'Nazwa oferty',
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
    {
      name: 'coverImage',
      label: 'Zdjęcie główne',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Wyświetlane na liście ofert i jako fallback tła nagłówka.' },
    },

    // --- Nagłówek (zawsze strukturalny — spójny wygląd hero na każdej ofercie) ---
    {
      name: 'heading',
      label: 'Nagłówek strony',
      type: 'group',
      fields: [
        { name: 'title', label: 'Tytuł (H1)', type: 'text', required: true },
        { name: 'subtitle', label: 'Lead / Podtytuł', type: 'textarea' },
        {
          name: 'backgroundImage',
          label: 'Zdjęcie w tle nagłówka',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ctaText',
          label: 'Tekst przycisku CTA',
          type: 'text',
          defaultValue: 'Zapytaj o ofertę',
          admin: { description: 'Przycisk wyświetlany w nagłówku, zazwyczaj prowadzący do kontaktu.' },
        },
        {
          name: 'ctaLink',
          label: 'Link CTA',
          type: 'text',
          defaultValue: '/kontakt',
        },
      ],
    },

    // --- Treść strony — w pełni blokowa ---
    {
      name: 'layout',
      label: 'Treść strony',
      type: 'blocks',
      admin: {
        description: 'Zbuduj stronę oferty z bloków. Kolejność bloków = kolejność na stronie.',
        initCollapsed: false,
      },
      blocks: [
        RichTextBlock,
        OfferCardsBlock,
        ForWhoBlock,
        ContactCardBlock,
        CTABlock,
        FAQBlock,
      ],
    },

    // --- SEO ---
    seoFields,
  ],
}
