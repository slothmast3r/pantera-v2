import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class, Media, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import './zajecia.css'

const typeLabels: Record<string, string> = {
  'krav-maga': 'Krav Maga',
  karate: 'Karate',
  'tai-chi': 'Tai Chi',
  individual: 'Indywidualne',
  asg: 'ASG',
  'power-training': 'Power Training',
  other: 'Inne',
}

const ageLabels: Record<string, string> = {
  adults: 'Dorośli',
  children: 'Dzieci',
  all: 'Wszyscy',
}

const typeIcons: Record<string, string> = {
  'krav-maga': '🥊',
  karate: '🥋',
  'tai-chi': '☯️',
  individual: '👤',
  asg: '🎯',
  'power-training': '💪',
  other: '⭐',
}

const staticClasses: Partial<Class>[] = [
  { id: -1, title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga', ageGroup: 'adults', heading: { title: 'Skuteczna samoobrona dla dorosłych' } },
  { id: -2, title: 'Karate', slug: 'karate', type: 'karate', ageGroup: 'adults', heading: { title: 'Dyscyplina, siła i technika' } },
  { id: -3, title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi', ageGroup: 'all', heading: { title: 'Harmonia ciała i umysłu' } },
  { id: -4, title: 'Krav Maga Dzieci', slug: 'krav-maga-dzieci', type: 'krav-maga', ageGroup: 'children', heading: { title: 'Samoobrona i pewność siebie dla dzieci' } },
  { id: -5, title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate', ageGroup: 'children', heading: { title: 'Karate dla dzieci w bezpiecznym środowisku' } },
  { id: -6, title: 'Zajęcia Indywidualne', slug: 'indywidualne', type: 'individual', ageGroup: 'all', heading: { title: 'Trening dopasowany do Ciebie' } },
]

function getCoverUrl(coverImage: Class['coverImage']): string | null {
  if (!coverImage || typeof coverImage === 'number') return null
  return (coverImage as Media).url ?? null
}

export default async function ZajeciaPage() {
  let classes: Partial<Class>[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  try {
    const payload = await getPayload({ config })
    const [classesRes, navRes, footerRes] = await Promise.all([
      payload.find({ collection: 'classes', limit: 20, sort: 'title', depth: 1 }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    classes = classesRes.docs
    nav = navRes
    footer = footerRes
  } catch {
    // DB unavailable — fall back to static data
  }

  const items = classes?.length ? classes : staticClasses

  return (
    <>
      <Navbar data={nav} />

      <section className="zajecia-header">
        <div className="container">
          <div className="label label--white">OFERTA</div>
          <h1>
            Nasze <span>Zajęcia</span>
          </h1>
          <p className="zajecia-header__lead">
            Krav Maga, Karate, Tai Chi i więcej. Znajdź zajęcia dopasowane do swojego wieku,
            celu i poziomu zaawansowania.
          </p>
        </div>
      </section>

      <section className="zajecia-list">
        <div className="container">
          <div className="label">WSZYSTKIE ZAJĘCIA</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1C', marginBottom: '8px' }}>
            Wybierz swoją drogę
          </h2>
          <p style={{ color: '#666', marginBottom: '0' }}>
            {items.length} {items.length === 1 ? 'propozycja' : items.length < 5 ? 'propozycje' : 'propozycji'} dla Ciebie i Twojej rodziny
          </p>

          <div className="zajecia-grid">
            {items.map((cls) => {
              const coverUrl = getCoverUrl(cls.coverImage)
              const icon = typeIcons[cls.type ?? ''] ?? '⭐'
              return (
                <a key={cls.id} href={`/zajecia/${cls.slug}`} className="zajecia-card" style={{ textDecoration: 'none' }}>
                  {coverUrl ? (
                    <img src={coverUrl} alt={cls.title} className="zajecia-card__image" />
                  ) : (
                    <div className="zajecia-card__image--placeholder">{icon}</div>
                  )}
                  <div className="zajecia-card__body">
                    <div className="zajecia-card__badges">
                      {cls.type && (
                        <span className="zajecia-card__badge zajecia-card__badge--type">
                          {typeLabels[cls.type] ?? cls.type}
                        </span>
                      )}
                      {cls.ageGroup && (
                        <span className={`zajecia-card__badge ${cls.ageGroup === 'children' ? 'zajecia-card__badge--age-children' : 'zajecia-card__badge--age-adults'}`}>
                          {cls.ageGroup === 'children' ? '🧒 ' : '👤 '}{ageLabels[cls.ageGroup] ?? cls.ageGroup}
                        </span>
                      )}
                    </div>
                    <h3>{cls.title}</h3>
                    {cls.heading?.subtitle && (
                      <p className="zajecia-card__subtitle">{cls.heading.subtitle}</p>
                    )}
                    {!cls.heading?.subtitle && cls.heading?.title && (
                      <p className="zajecia-card__subtitle">{cls.heading.title}</p>
                    )}
                    <span className="zajecia-card__link">Sprawdź ofertę →</span>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}
