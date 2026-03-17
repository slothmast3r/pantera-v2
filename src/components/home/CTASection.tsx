import React from 'react'

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-section__watermark">PANTERA</div>
      <div className="cta-section__content">
        <h2>Gotowy na pierwszy krok?</h2>
        <p>Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!</p>
        <a href="/kontakt" className="btn btn--orange">Umów się na pierwsze zajęcia</a>
      </div>
    </section>
  )
}
