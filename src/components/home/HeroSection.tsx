import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Icon from '@/components/ui/Icon'
import type { Media } from '@/payload-types'
import { getImageUrl } from '@/lib/media'
import HeroVideo from './HeroVideo'

interface HeroData {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  backgroundImage?: (number | null) | Media
  primaryCta?: { text?: string | null; link?: string | null }
  socialProof?: { googleReviewsText?: string | null }
}

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const title = data?.title ?? 'Sztuki walki i rozwój. Mądrze. Bezpiecznie. Lokalnie.'
  const description =
    data?.description ??
    'Rodzinny klub sportowy na Mokotowie. Budujemy pewność siebie i formy ruchowe w bezpiecznym środowisku.'
  const ctaText = data?.primaryCta?.text ?? 'Pierwsze zajęcia gratis'
  const ctaLink = data?.primaryCta?.link ?? '/kontakt'
  const imageUrl = getImageUrl(data?.backgroundImage, 'hero') || '/hero-pantera.webp'

  return (
    <section className="hero">
      <div className="hero__image-container">
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero__bg-image"
          fetchPriority="high"
        />
        <HeroVideo />
      </div>
      <div className="hero__overlay" />
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__proof">
            <div className="hero__stars">
              <Icon name="star" className="hero__star-icon" />
              <Icon name="star" className="hero__star-icon" />
              <Icon name="star" className="hero__star-icon" />
              <Icon name="star" className="hero__star-icon" />
              <Icon name="star" className="hero__star-icon" />
              <span className="hero__stars-label">
                <i className="fa-brands fa-google hero__google-icon" aria-label="Google Reviews" />
              </span>
            </div>
          </div>
          <h1 className="hero__title">{title}</h1>
          <p className="hero__desc">{description}</p>
          <Link href={ctaLink as any} className="btn btn--orange">
            {ctaText}
          </Link>
          <div className="hero__partners" aria-label="Partnerzy">
            <span className="hero__partners-label">Zrzeszeni w:</span>
            <div className="hero__partners-logos">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partners/united-krav-maga.svg"
                alt="United Krav Maga"
                className="partner-united"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/partners/zawsze-w-formie.svg"
                alt="Zawsze w Formie"
                className="partner-zwf"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hero__divider" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/divider2.svg" alt="" />
      </div>
    </section>
  )
}
