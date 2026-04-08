import React from 'react'
import type { Metadata } from 'next'
import { getPayload as getPayloadInstance } from 'payload'
import payloadConfig from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadInstance({ config: payloadConfig })
    const res = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })
    const page = res.docs[0]
    if (page?.seo?.metaTitle || page?.seo?.metaDescription) {
      return {
        title: page.seo.metaTitle ?? undefined,
        description: page.seo.metaDescription ?? undefined,
        openGraph: page.seo.ogImage ? {
          images: [{ url: (page.seo.ogImage as any).url || '' }],
        } : undefined,
      }
    }
  } catch {}
  return {
    title: 'Pantera Family & Sport Club | Klub sportowy Mokotów',
    description: 'Krav Maga, Karate, Tai Chi i Power Training w Warszawie na Mokotowie. Rodzinna atmosfera, certyfikowani instruktorzy, grupy dla dzieci i dorosłych.',
  }
}

import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  Instructor,
  Testimonial,
  Navigation,
  Footer as FooterType,
  Page,
  HomepageService,
  HomepagePricing,
} from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import HeroSection from '@/components/home/HeroSection'
import ClassesSection from '@/components/home/ClassesSection'
import BenefitsSection from '@/components/home/BenefitsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import InstructorsSection from '@/components/home/InstructorsSection'
import PricingSection from '@/components/home/PricingSection'
import ServicesSection from '@/components/home/ServicesSection'
import CTASection from '@/components/home/CTASection'
import Footer from '@/components/home/Footer'
import './homepage.css'

export const revalidate = 300

type HeroBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export default async function HomePage() {
  let instructors: Instructor[] | null = null
  let testimonials: Testimonial[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null
  let heroBlock: HeroBlock | null = null
  let homepageServices: HomepageService | null = null
  let homepagePricing: HomepagePricing | null = null

  try {
    const payload = await getPayload({ config })
    const [instructorsRes, testimonialsRes, navRes, footerRes, homePageRes, servicesRes, pricingRes] =
      await Promise.all([
        payload.find({ collection: 'instructors', limit: 10, sort: 'order' }),
        payload.find({
          collection: 'testimonials',
          where: { isFeatured: { equals: true } },
          limit: 6,
        }),
        payload.findGlobal({ slug: 'navigation' }),
        payload.findGlobal({ slug: 'footer' }),
        payload.find({
          collection: 'pages',
          where: { slug: { equals: 'home' } },
          limit: 1,
          depth: 1,
        }),
        payload.findGlobal({ slug: 'homepage-services' }),
        payload.findGlobal({ slug: 'homepage-pricing' }),
      ])
    instructors = instructorsRes.docs
    testimonials = testimonialsRes.docs
    nav = navRes
    footer = footerRes
    homepageServices = servicesRes
    homepagePricing = pricingRes
    const homePage = homePageRes.docs[0]
    heroBlock = (homePage?.layout?.find((b) => b.blockType === 'hero') as HeroBlock) ?? null
  } catch {
    // DB unavailable — components fall back to static data
  }

  return (
    <>
      <Navbar data={nav} />
      <HeroSection data={heroBlock} />
      <ClassesSection />
      <BenefitsSection />
      <TestimonialsSection testimonials={testimonials} />
      <InstructorsSection instructors={instructors} />
      <PricingSection data={homepagePricing} />
      <ServicesSection data={homepageServices} />
      <CTASection />
      <Footer data={footer} />
    </>
  )
}
