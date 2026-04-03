import React from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import type { Testimonial } from '@/payload-types'

const staticTestimonials = [
  {
    id: -1,
    author: 'Maciej Brunner',
    content: 'Świetne zajęcia, polecam każdemu! Instruktorzy są bardzo profesjonalni i pomocni. Dzieci uwielbiają te zajęcia.',
    rating: 5,
  },
  {
    id: -2,
    author: 'Tomasz Thompson',
    content: 'Jeden z najlepszych klubów sportowych w Warszawie. Zajęcia są na wysokim poziomie. Atmosfera super. Polecam',
    rating: 5,
  },
  {
    id: -3,
    author: 'Sandra',
    content: 'Polecam Panterę jeśli szukasz czegoś więcej niż tylko treningu. Tu naprawdę dbają o każdego uczestnika.',
    rating: 5,
  },
]

export default function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] | null }) {
  const items = testimonials?.length ? testimonials : staticTestimonials

  return (
    <section className="testimonials">
      <div className="section-container">
        <div className="section-label">OPINIE</div>
        <h2 className="section-title">Co mówią o nas Klubowicze?</h2>
        <div className="testimonials__grid">
          {items.map((t) => (
            <div key={t.id} className="testimonials__card">
              <div className="testimonials__stars">{Array.from({ length: t.rating ?? 5 }).map((_, i) => <Icon key={i} name="star" className="testimonials__star-icon" />)}</div>
              <p className="testimonials__text">&ldquo;{t.content}&rdquo;</p>
              <div className="testimonials__footer">
                <div className="testimonials__avatar">{t.author[0]}</div>
                <div>
                  <strong>{t.author}</strong>
                  <div className="testimonials__google">
                    <span>G</span> Google
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* TODO: replace href with real Google Maps profile URL; when switching to API add "Powered by Google" logo per branding guidelines */}
        <Link href="https://share.google/0bHi75WhFk7b2tbb3" target="_blank" rel="noopener noreferrer" className="testimonials__attribution">
          <i className="fa-brands fa-google" />
          Opinie pochodzą z Google Maps
        </Link>
      </div>
    </section>
  )
}
