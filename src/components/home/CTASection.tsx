import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-section__watermark">PANTERA</div>
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
