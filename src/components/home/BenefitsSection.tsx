import React from 'react'

const benefits = [
  {
    icon: '🛡️',
    title: 'Bezpieczeństwo',
    desc: 'Bezpieczeństwo w całej naszej szkole i metody nauczania są najwyższym priorytetem.',
  },
  {
    icon: '👥',
    title: 'Kameralność',
    desc: 'Małe grupy, bliskie relacje, przyjazna i motywująca atmosfera.',
  },
  {
    icon: '🥋',
    title: 'Profesjonalne kadry',
    desc: 'Nasi instruktorzy posiadają wieloletnie doświadczenie i certyfikacje.',
  },
  {
    icon: '❤️',
    title: 'Rodzinna społeczność',
    desc: 'Dołącz do Pantery i stań się częścią bezpiecznej rodzinnej społeczności.',
  },
]

export default function BenefitsSection() {
  return (
    <section className="benefits">
      <div className="benefits__container">
        <div className="benefits__image">
          <div className="benefits__image-placeholder" />
        </div>
        <div className="benefits__content">
          <div className="section-label">DLACZEGO PANTERA?</div>
          <h2 className="section-title section-title--left">Więcej niż tylko trening</h2>
          <ul className="benefits__list">
            {benefits.map((b) => (
              <li key={b.title} className="benefits__item">
                <span className="benefits__icon">{b.icon}</span>
                <div>
                  <strong>{b.title}</strong>
                  <p>{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="/zajecia" className="btn btn--orange">Wybierz zajęcia →</a>
        </div>
      </div>
    </section>
  )
}
