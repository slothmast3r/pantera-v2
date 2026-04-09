export const revalidate = 300

import type { Metadata } from 'next'
import { getPayload as getPayloadInstance } from 'payload'
import payloadConfig from '@payload-config'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadInstance({ config: payloadConfig })
    const res = await payload.find({ collection: 'offers', where: { slug: { equals: slug } }, limit: 1 })
    const doc = res.docs[0]
    if (doc?.seo?.metaTitle || doc?.seo?.metaDescription) {
      return {
        title: doc.seo.metaTitle ?? undefined,
        description: doc.seo.metaDescription ?? undefined,
        openGraph: doc.seo.ogImage ? {
          images: [
            {
              url: (doc.seo.ogImage as any).url || '',
            },
          ],
        } : undefined,
      }
    }
  } catch {}
  return {
    title: 'Oferta – Pantera Family & Sport Club',
  }
}

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Offer, Media, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import CategoryIcon from '../CategoryIcon'
import '../oferta.css'

const categoryLabels: Record<string, string> = {
  company: 'Dla Firm',
  schools: 'Dla Szkół',
  workshop: 'Warsztaty',
  birthday: 'Urodziny',
  other: 'Oferta specjalna',
}


function getBgUrl(img: Offer['coverImage'] | Offer['heading']['backgroundImage']): string | null {
  if (!img || typeof img === 'number') return null
  return (img as Media).url ?? null
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()

  let offer: Offer | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  try {
    const payload = await getPayload({ config })
    const [offerRes, navRes, footerRes] = await Promise.all([
      payload.find({
        collection: 'offers',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 2,
        draft: isDraft,
      }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    nav = navRes
    footer = footerRes
    if (offerRes.docs[0]) offer = offerRes.docs[0] as Offer
  } catch {
    // DB unavailable
  }

  if (!offer) notFound()

  const bgUrl = getBgUrl(offer.heading?.backgroundImage) ?? getBgUrl(offer.coverImage)
  const categoryLabel = categoryLabels[offer.category ?? ''] ?? 'Oferta'

  return (
    <>
      {isDraft && (
        <div style={{ background: '#F57C28', color: '#fff', textAlign: 'center', padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}>
          Tryb podglądu (wersja robocza) —{' '}
          <Link href="/api/disable-preview" style={{ color: '#fff', textDecoration: 'underline' }}>
            wyłącz
          </Link>
        </div>
      )}

      <Navbar data={nav} />

      {/* HEADER */}
      <section className="offer-header">
        {bgUrl && <div className="offer-header__bg" style={{ backgroundImage: `url(${bgUrl})` }} />}
        <div className="offer-header__overlay" />
        <div className="container">
          <nav className="offer-header__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona główna</Link>
            <span>›</span>
            <Link href="/oferta">Oferta</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{offer.title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div className="label label--white" style={{ margin: 0, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CategoryIcon icon={(offer as any).icon} category={offer.category ?? 'other'} size={16} />
                {categoryLabel.toUpperCase()}
              </div>
          </div>
          <h1>{offer.heading?.title ?? offer.title}</h1>
          {offer.heading?.subtitle && (
            <p className="offer-header__lead">{offer.heading.subtitle}</p>
          )}
          <Link href={((offer.heading as any)?.ctaLink ?? '/kontakt') as any} className="btn btn--orange">
            {(offer.heading as any)?.ctaText ?? 'Zapytaj o ofertę'}
          </Link>
        </div>
      </section>

      {/* BODY — bloki z CMS */}
      <BlockRenderer layout={offer.layout} />

      <Footer data={footer} />
    </>
  )
}
