import React from 'react'
import Icon from '@/components/ui/Icon'
import type { Media } from '@/payload-types'

interface HeroData {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  backgroundImage?: (number | null) | Media
  primaryCta?: { text?: string | null; link?: string | null }
  socialProof?: { googleReviewsText?: string | null }
}

function getImageUrl(image: HeroData['backgroundImage']): string | null {
  if (!image || typeof image === 'number') return null
  return (image as Media).url ?? null
}

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const title = data?.title ?? 'Sztuki walki i rozwój. Mądrze. Bezpiecznie. Lokalnie.'
  const description =
    data?.description ??
    'Rodzinny klub sportowy na Mokotowie. Budujemy pewność siebie i formy ruchowe w bezpiecznym środowisku.'
  const ctaText = data?.primaryCta?.text ?? 'Umówione zajęcia za darmo'
  const ctaLink = data?.primaryCta?.link ?? '/kontakt'
  const googleText = data?.socialProof?.googleReviewsText ?? 'Google Reviews'
  const imageUrl = getImageUrl(data?.backgroundImage)

  const style = imageUrl
    ? ({ '--hero-bg': `url(${imageUrl})` } as React.CSSProperties)
    : undefined

  return (
    <section className="hero" style={style}>
      <div className="hero__overlay" />
      <div className="hero__container">
      <div className="hero__content">
        <div className="hero__proof">
          <div className="hero__stars">
            <Icon name="star" className="hero__star-icon" /><Icon name="star" className="hero__star-icon" /><Icon name="star" className="hero__star-icon" /><Icon name="star" className="hero__star-icon" /><Icon name="star" className="hero__star-icon" /> <span>{googleText}</span>
          </div>
        </div>
        <h1 className="hero__title">{title}</h1>
        <p className="hero__desc">{description}</p>
        <a href={ctaLink} className="btn btn--orange">{ctaText}</a>
        <div className="hero__partners" aria-label="Partnerzy">
          <span className="hero__partners-label">Zrzeszeni w:</span>
          <div className="hero__partners-logos">
            <img src="/partners/united-krav-maga.svg" alt="United Krav Maga" className="partner-united" />
            <img src="/partners/zawsze-w-formie.svg" alt="Zawsze w Formie" className="partner-zwf" />
          </div>
        </div>
      </div>
      </div>
      <div className="hero__divider" aria-hidden="true">
        <img src="/divider2.svg" alt="" />
      </div>
    </section>
  )
}
