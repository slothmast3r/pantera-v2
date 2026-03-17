import React from 'react'

const classes = [
  {
    title: 'Dla Dzieci',
    desc: 'Budujemy pewność siebie i formy ruchowe u dzieci w bezpiecznym, rodzinnym środowisku.',
    slug: 'krav-maga-dzieci',
    color: '#2a5298',
  },
  {
    title: 'Dla Dorosłych',
    desc: 'Krav Maga, Karate i sztuki walki dla dorosłych. Naucz się jak się bronić i ćwicz efektywnie.',
    slug: 'krav-maga',
    color: '#8b0000',
  },
  {
    title: 'Harmonia i Zdrowie',
    desc: 'Tai Chi i zajęcia skupiające się na harmonii ciała i umysłu, dobre dla każdego wieku.',
    slug: 'tai-chi',
    color: '#1a6b3c',
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
            <div key={cls.slug} className="classes__card" style={{ background: cls.color }}>
              <div className="classes__card-overlay" />
              <div className="classes__card-content">
                <h3>{cls.title}</h3>
                <p>{cls.desc}</p>
                <a href={`/zajecia/${cls.slug}`} className="btn btn--white-outline">Sprawdź ofertę →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
