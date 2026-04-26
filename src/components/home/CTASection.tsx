import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { Homepage, Media } from '@/payload-types'

type CTAData = Homepage['cta']

export default function CTASection({ data }: { data?: CTAData | null }) {
  const heading = data?.heading ?? 'Gotowy na pierwszy krok?'
  const subheading = data?.subheading ?? 'Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!'
  const buttonLabel = data?.buttonLabel ?? 'Umów się na pierwsze zajęcia'
  const buttonHref = data?.buttonHref ?? '/kontakt'
  const bgMedia = typeof data?.backgroundImage === 'object' ? (data.backgroundImage as Media) : null
  const bgSrc = bgMedia?.url ?? '/cta-sala.webp'

  return (
    <section className="cta-section">
      <Image
        src={bgSrc}
        alt=""
        fill
        className="cta-section__bg"
        sizes="100vw"
        loading="lazy"
      />
      <div className="cta-section__overlay" />
      <div className="cta-section__content">
        <h2>{heading}</h2>
        <p>{subheading}</p>
        <Button asChild variant="default" size="lg" className="px-10 h-13 text-[1.05rem] bg-[#F57C28] hover:bg-[#d96a1a]">
          <Link href={buttonHref}>{buttonLabel}</Link>
        </Button>
      </div>
    </section>
  )
}
