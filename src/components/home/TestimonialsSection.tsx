import React from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import type { Testimonial } from '@/payload-types'
import { SectionHeader } from '@/components/ui/SectionHeader'

const staticTestimonials = [
  { id: -1, author: 'Bazyli Holewa', rating: 5, content: 'Trenuję Krav Mage od kilku lat w Pantera. Treningi są ciekawe i pozwalają utrzymać się w bardzo dobrej formie. Polecam zajęcia na pierwszy trening, potem ciężko przestać.' },
  { id: -2, author: 'Maciej Kuczera', rating: 5, content: 'Zajęcia z Krav Maga prowadzone tak, że w każdej chwili można dołączyć, a jednocześnie nie są nudne dla bardziej doświadczonych. Trener wszystko pokazuje krok po kroku, poprawia w trakcie i dba, żeby zajęcia były maksymalnie bezpieczne. Poza techniką walki, jest też sporo ruchu. Dla mnie perfekcyjnie prowadzone. Polecam :)' },
  { id: -3, author: 'Kamil Pietrowicz', rating: 5, content: 'Trafiłem do klubu przez przypadek. Wstępnie przyszedłem na pierwszy darmowy trening. I tak właśnie wpadłem :) W czerwcu minął mi 10 miesięcy jak trenuję…' },
  { id: -4, author: 'Karolina', rating: 5, content: 'Do Pantery chodzę na zajęcia tai-chi. Super prowadzący i atmosfera na zajęciach. Atrakcyjne ceny zajęć. Polecam.' },
  { id: -5, author: 'Paweł Osiecki', rating: 5, content: 'Genialna szkoła walki. Trenerzy sympatyczni, bardzo pomocni. Atmosfera na zajęciach swobodna. Idealny sposób na oderwanie się od codzienności i wyładowanie emocji.' },
  { id: -6, author: 'Michał Kulesza', rating: 3, content: 'Ludzie z pasją i doskonałym podejściem zarówno do początkujących jak i średnio zaawansowanych. Zajęcia dla dzieci są wyjątkowe. Trochę zbyt mała sala… trudno ponieść cały entuzjazm :)' },
  { id: -7, author: 'Piotr Zaręba', rating: 5, content: 'Polecam, zwłaszcza dla dzieci i rodziców (również razem na jednych zajęciach ze starszymi dziećmi).' },
  { id: -8, author: 'Emilia Zwolińska', rating: 5, content: 'Super zajęcia z samoobrony Krav maga. Rzetelni i wymagający instruktorzy z mega doświadczeniem. Polecam…' },
  { id: -9, author: 'Marios Maragos', rating: 5, content: '2nd year training KM at PANTERA. Trainer is professional and genuinely cares about motivating his students and transmitting his knowledge. Superb job.' },
  { id: -10, author: 'Darek Ulejczyk', rating: 5, content: 'Wszystko się zgadza – trener, ekipa, miejsce. Polecam!' },
  { id: -11, author: 'Al Pacino', rating: 5, content: 'nic więcej nie powiem bo dentysta drogi' },
  { id: -12, author: 'Lord Fris', rating: 5, content: 'Bardzo fajne lekcje i można się dużo nauczyć. Polecam! 👊' },
  { id: -13, author: 'Marcin M', rating: 4, content: 'Zaangażowani trenerzy, świetne zajęcia, kameralna atmosfera :)' },
  { id: -14, author: 'Maciek Goszcząński', rating: 5, content: 'Super sala treningowa z szatnią' },
  { id: -15, author: 'Aneta Czaus', rating: 5, content: 'Mój syn jest zachwycony zajęciami Krav Magi dla dzieci.' },
]

function TestimonialCard({ t }: { t: typeof staticTestimonials[number] }) {
  return (
    <div className="testimonials__card">
      <div className="testimonials__stars">
        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
          <Icon key={i} name="star" className="testimonials__star-icon" />
        ))}
      </div>
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
  )
}

function fillToMin<T>(arr: T[], min = 10): T[] {
  let result = [...arr]
  while (result.length < min) result = [...result, ...arr]
  return result
}

export default function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] | null }) {
  const raw = (testimonials?.length ? testimonials : staticTestimonials) as typeof staticTestimonials
  const items = fillToMin(raw)

  return (
    <section className="testimonials">
      <div className="section-container">
        <SectionHeader label="OPINIE" title="Co mówią o nas Klubowicze?" />
      </div>

      <div className="testimonials__marquee">
        <div className="testimonials__marquee-inner">
          {items.map((t, i) => <TestimonialCard key={i} t={t} />)}
          {items.map((t, i) => <TestimonialCard key={`dup-${i}`} t={t} aria-hidden />)}
        </div>
        <div className="testimonials__marquee-inner testimonials__marquee-inner--reverse">
          {[...items].reverse().map((t, i) => <TestimonialCard key={i} t={t} />)}
          {[...items].reverse().map((t, i) => <TestimonialCard key={`dup-${i}`} t={t} aria-hidden />)}
        </div>
      </div>

      <div className="section-container">
        <Link href="https://share.google/0bHi75WhFk7b2tbb3" target="_blank" rel="noopener noreferrer" className="testimonials__attribution">
          <i className="fa-brands fa-google" />
          Opinie pochodzą z Google Maps
        </Link>
      </div>
    </section>
  )
}
