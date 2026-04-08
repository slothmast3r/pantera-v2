import React from 'react'

const classes = [
  {
    title: 'Dla Dzieci',
    desc: 'Budujemy pewność siebie i formy ruchowe u dzieci w bezpiecznym, rodzinnym środowisku.',
    href: '/zajecia?filter=children',
    color: '#2a5298',
    image: '/classes-dzieci.webp',
  },
  {
    title: 'Dla Dorosłych',
    desc: 'Krav Maga, Karate i sztuki walki dla dorosłych. Naucz się jak się bronić i ćwicz efektywnie.',
    href: '/zajecia?filter=adults',
    color: '#8b0000',
    image: '/classes-dorosli.webp',
  },
  {
    title: 'Tai Chi',
    desc: 'Tai Chi i zajęcia skupiające się na harmonii ciała i umysłu, dobre dla każdego wieku.',
    href: '/zajecia/tai-chi',
    color: '#1a6b3c',
    image: '/classes-taichi.webp',
  },
]

export default function ClassesSection() {
  return (
    <section className="classes">
      <div className="section-container">
        <div className="section-label">ZAJĘCIA</div>
        <h2 className="section-title">Wybierz swoją drogę</h2>
        <p className="section-subtitle">Znajdź zajęcia idealne dla swojego wieku i celu treningowego</p>
        <div className="classes__grid">
          {classes.map((cls) => (
            <a key={cls.href} href={cls.href} className="classes__card" style={{ background: cls.color, backgroundImage: `url(${cls.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="classes__card-overlay" />
              <div className="classes__card-content">
                <div className="classes__card-title-row">
                  <h3>{cls.title}</h3>
                  <span className="classes__card-arrow">→</span>
                </div>
                <div className="classes__card-hover">
                  <div>
                    <p>{cls.desc}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="classes__divider" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/divider2.svg" alt="" />
      </div>
    </section>
  )
}
