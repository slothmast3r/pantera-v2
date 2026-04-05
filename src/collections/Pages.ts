import type { CollectionConfig } from 'payload'
import { autoSlug } from '../hooks/autoSlug'
import { seoFields } from '../fields/seo'

import { HeroBlock } from '../blocks/Hero'
import { BenefitsBlock } from '../blocks/Benefits'
import { CTABlock } from '../blocks/CTA'
import { StatsBlock } from '../blocks/Stats'
import { RichTextBlock } from '../blocks/RichText'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { InstructorsBlock } from '../blocks/InstructorsBlock'
import { ContactInfoBlock } from '../blocks/ContactInfo'
import { ContactFormBlock } from '../blocks/ContactForm'
import { MapBlock } from '../blocks/Map'
import { FAQBlock } from '../blocks/FAQBlock'
import { LogoListBlock } from '../blocks/LogoList'
import { ScheduleBlock } from '../blocks/Schedule'
import { ClassesOverviewBlock } from '../blocks/ClassesOverview'
import { EventsListBlock } from '../blocks/EventsList'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Strona', plural: 'Strony' },
  versions: {
    drafts: { autosave: { interval: 500 } },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Strony',
    livePreview: {
      url: ({ data }) => {
        const slug = (data as any).slug
        return slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`
      },
    },
    preview: (doc) => {
      const slug = (doc as any).slug
      return slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${slug}`
    },
  },
  hooks: {
    beforeChange: [autoSlug('title')],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł strony',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug URL',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Generowany automatycznie z tytułu. Możesz nadpisać ręcznie.',
      },
    },
    seoFields,
    {
      name: 'layout',
      label: 'Sekcje strony',
      type: 'blocks',
      blocks: [
        HeroBlock,
        ClassesOverviewBlock,
        BenefitsBlock,
        TestimonialsBlock,
        InstructorsBlock,
        CTABlock,
        StatsBlock,
        LogoListBlock,
        ContactInfoBlock,
        ContactFormBlock,
        MapBlock,
        FAQBlock,
        ScheduleBlock,
        EventsListBlock,
        RichTextBlock,
      ],
    },
  ],
}
