import React from 'react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-section__watermark">PANTERA</div>
      <div className="cta-section__content">
        <h2>Gotowy na pierwszy krok?</h2>
        <p>Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!</p>
        <Link href="/kontakt" className="btn btn--orange">Umów się na pierwsze zajęcia</Link>
      </div>
    </section>
  )
}
