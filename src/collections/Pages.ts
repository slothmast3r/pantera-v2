import type { CollectionConfig } from 'payload'

import { HeroBlock } from '../blocks/Hero'
import { BenefitsBlock } from '../blocks/Benefits'
import { CTABlock } from '../blocks/CTA'
import { StatsBlock } from '../blocks/Stats'
import { RichTextBlock } from '../blocks/RichText'
import { TestimonialsBlock } from '../blocks/TestimonialsBlock'
import { InstructorsBlock } from '../blocks/InstructorsBlock'
import { PricingBlock } from '../blocks/Pricing'
import { ServicesBlock } from '../blocks/Services'
import { ContactInfoBlock } from '../blocks/ContactInfo'
import { ContactFormBlock } from '../blocks/ContactForm'
import { MapBlock } from '../blocks/Map'
import { FAQBlock } from '../blocks/FAQBlock'
import { LogoListBlock } from '../blocks/LogoList'
import { ScheduleBlock } from '../blocks/Schedule'
import { ClassesOverviewBlock } from '../blocks/ClassesOverview'
import { EventsListBlock } from '../blocks/EventsList'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Strona', plural: 'Strony' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
        description: 'np. "strona-glowna", "o-nas", "dla-firm", "kontakt", "grafik"',
      },
    },
    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        { name: 'metaTitle', label: 'Meta tytuł', type: 'text' },
        { name: 'metaDescription', label: 'Meta opis', type: 'textarea' },
        {
          name: 'ogImage',
          label: 'OG Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
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
        PricingBlock,
        ServicesBlock,
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
