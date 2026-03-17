import React from 'react'
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
              <div className="testimonials__stars">{'★'.repeat(t.rating ?? 5)}</div>
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
      </div>
    </section>
  )
}
