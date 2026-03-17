import React from 'react'

const partners = [
  {
    name: 'United Krav Maga',
    logo: '/partners/united-krav-maga.png',
    url: 'https://unitedkravmaga.pl',
  },
  {
    name: 'Zawsze w Formie',
    logo: '/partners/zawsze-w-formie.png',
    url: 'https://zawszewformie.pl',
  },
]

export default function PartnersSection() {
  return (
    <section className="partners">
      <div className="partners__inner">
        <span className="partners__label">Certyfikacje i partnerzy</span>
        <div className="partners__logos">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partners__logo"
              title={p.name}
            >
              <img src={p.logo} alt={p.name} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
