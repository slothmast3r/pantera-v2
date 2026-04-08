import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="cta-section">
      <Image
        src="/cta-sala.webp"
        alt=""
        fill
        className="cta-section__bg"
        sizes="100vw"
        loading="lazy"
      />
      <div className="cta-section__overlay" />
      <div className="cta-section__content">
        <h2>Gotowy na pierwszy krok?</h2>
        <p>Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!</p>
        <Button asChild variant="default" size="lg" className="px-10 h-13 text-[1.05rem] bg-[#F57C28] hover:bg-[#d96a1a]">
          <Link href="/kontakt">Umów się na pierwsze zajęcia</Link>
        </Button>
      </div>
    </section>
  )
}
