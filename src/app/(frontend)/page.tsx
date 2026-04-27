import React from 'react'
import type { Metadata } from 'next'
import { getPayload as getPayloadInstance } from 'payload'
import payloadConfig from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadInstance({ config: payloadConfig })
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'home' } },
      limit: 1,
    })
    const page = res.docs[0]
    if (page?.seo?.metaTitle || page?.seo?.metaDescription) {
      const ogImages = page.seo.ogImage ? [{ url: (page.seo.ogImage as any).url || '' }] : undefined
      return {
        title: page.seo.metaTitle ?? undefined,
        description: page.seo.metaDescription ?? undefined,
        alternates: { canonical: '/' },
        openGraph: { images: ogImages },
        twitter: { card: 'summary_large_image', images: ogImages?.map((i) => i.url) },
      }
    }
  } catch {}
  return {
    title: 'Pantera Family & Sport Club | Klub sportowy Mokotów',
    description:
      'Krav Maga, Karate, Tai Chi i Power Training w Warszawie na Mokotowie. Rodzinna atmosfera, certyfikowani instruktorzy, grupy dla dzieci i dorosłych.',
    alternates: { canonical: '/' },
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
  Homepage,
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
import JsonLd from '@/components/seo/JsonLd'
import './homepage.css'

export const revalidate = 300

type HeroBlock = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

export default async function HomePage() {
  let instructors: Instructor[] | null = null
  let testimonials: Testimonial[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null
  let heroBlock: HeroBlock | null = null
  let homepage: Homepage | null = null

  try {
    const payload = await getPayload({ config })
    const [instructorsRes, testimonialsRes, navRes, footerRes, homePageRes, homepageRes] =
      await Promise.all([
        payload.find({
          collection: 'instructors',
          limit: 10,
          sort: 'order',
          select: {
            name: true,
            specialization: true,
            photo: true,
            slug: true,
            excerpt: true,
            bio: true,
          },
        }),
        payload.find({
          collection: 'testimonials',
          where: { isFeatured: { equals: true } },
          limit: 6,
          select: { author: true, content: true, rating: true },
        }),
        payload.findGlobal({ slug: 'navigation' }),
        payload.findGlobal({ slug: 'footer' }),
        payload.find({
          collection: 'pages',
          where: { slug: { equals: 'home' } },
          limit: 1,
          depth: 1,
        }),
        payload.findGlobal({ slug: 'homepage', depth: 1 }),
      ])
    instructors = instructorsRes.docs as Instructor[]
    testimonials = testimonialsRes.docs as Testimonial[]
    nav = navRes
    footer = footerRes
    homepage = homepageRes
    const homePage = homePageRes.docs[0]
    heroBlock = (homePage?.layout?.find((b) => b.blockType === 'hero') as HeroBlock) ?? null
  } catch {
    // DB unavailable — components fall back to static data
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pantera.waw.pl'

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pantera Family & Sport Club',
            url: siteUrl,
            logo: `${siteUrl}/logo.png`,
            telephone: '+48508689718',
            email: 'kontakt@pantera.waw.pl',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ul. Powsińska 25',
              addressLocality: 'Warszawa',
              postalCode: '02-903',
              addressCountry: 'PL',
            },
            sameAs: ['https://www.facebook.com/panterafamilysportclub'],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Pantera Family & Sport Club',
            url: siteUrl,
            telephone: '+48508689718',
            email: 'kontakt@pantera.waw.pl',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'ul. Powsińska 25',
              addressLocality: 'Warszawa',
              addressRegion: 'Mazowieckie',
              postalCode: '02-903',
              addressCountry: 'PL',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '15:00',
                closes: '21:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Saturday'],
                opens: '09:00',
                closes: '14:00',
              },
            ],
          },
        ]}
      />
      <Navbar data={nav} />
      <HeroSection data={heroBlock} />
      <ClassesSection data={homepage?.classes} />
      <BenefitsSection data={homepage?.benefits} />
      <InstructorsSection instructors={instructors} />
      <TestimonialsSection testimonials={testimonials} />
      <PricingSection data={homepage?.pricing} />
      <ServicesSection data={homepage?.services} />
      <CTASection data={homepage?.cta} />
      <Footer data={footer} />
    </>
  )
}
