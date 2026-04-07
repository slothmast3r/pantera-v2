export const revalidate = 300

import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Offer, Media, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import './oferta.css'

const categoryLabels: Record<string, string> = {
  company: 'Dla Firm',
  schools: 'Dla Szkół',
  workshop: 'Warsztaty',
  birthday: 'Urodziny',
  other: 'Inne',
}

const categoryIcons: Record<string, string> = {
  company: '🏢',
  schools: '🏫',
  workshop: '🥋',
  birthday: '🎂',
  other: '⭐',
}

const staticOffers: Partial<Offer>[] = [
  {
    id: -1,
    slug: 'dla-firm',
    title: 'Dla Firm i Korporacji',
    category: 'company',
    heading: { title: 'Warsztaty dla Firm', subtitle: 'Jednorazowe eventy integracyjne, cykliczne benefity dla pracowników lub programy szyte na miarę.' },
  },
  {
    id: -2,
    slug: 'dla-szkol',
    title: 'Dla Szkół i Przedszkoli',
    category: 'schools',
    heading: { title: 'Edukacja poprzez Ruch', subtitle: 'Promujemy aktywność fizyczną i edukację bezpieczeństwa w placówkach edukacyjnych.' },
  },
  {
    id: -3,
    slug: 'urodziny',
    title: 'Urodziny na Sportowo',
    category: 'birthday',
    heading: { title: 'Aktywne Urodziny', subtitle: 'Sala 115 m², bezpieczne materace, sprzęt sportowy i doświadczeni instruktorzy.' },
  },
  {
    id: -4,
    slug: 'warsztaty-rodzinne',
    title: 'Warsztaty Rodzinne',
    category: 'workshop',
    heading: { title: 'Rodzic + Dziecko', subtitle: 'Podstawy samoobrony, bezpieczne przewroty i mnóstwo zabaw ruchowych dla całej rodziny.' },
  },
]

function getCoverUrl(img: Offer['coverImage']): string | null {
  if (!img || typeof img === 'number') return null
  return (img as Media).url ?? null
}

export default async function OfertaPage() {
  let offers: Partial<Offer>[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  try {
    const payload = await getPayload({ config })
    const [offersRes, navRes, footerRes] = await Promise.all([
      payload.find({ collection: 'offers', limit: 20, sort: 'title', depth: 1 }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    offers = offersRes.docs
    nav = navRes
    footer = footerRes
  } catch {
    // DB unavailable
  }

  const items = offers?.length ? offers : staticOffers

  return (
    <>
      <Navbar data={nav} />

      <section className="oferta-header">
        <div className="container">
          <div className="label label--white">OFERTA SPECJALNA</div>
          <h1>Zajęcia i warsztaty <span>dla każdego</span></h1>
          <p className="oferta-header__lead">
            Poza regularnym grafikiem zajęć oferujemy warsztaty i eventy dla firm, szkół,
            rodzin i grup specjalnych. Zapytaj o program szyty na miarę.
          </p>
        </div>
      </section>

      <section className="oferta-list">
        <div className="container">
          <div className="label">EVENTY I WARSZTATY</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1C', marginBottom: '8px' }}>
            Co możemy dla Ciebie zorganizować?
          </h2>
          <p style={{ color: '#666' }}>
            Każda oferta jest dostosowana do potrzeb grupy — napisz do nas, a wspólnie ustalimy szczegóły.
          </p>

          <div className="oferta-grid">
            {items.map((offer) => {
              const coverUrl = getCoverUrl(offer.coverImage)
              const icon = categoryIcons[offer.category ?? ''] ?? '⭐'
              const badge = categoryLabels[offer.category ?? ''] ?? 'Oferta'
              return (
                <a key={offer.id} href={`/oferta/${offer.slug}`} className="oferta-card">
                  <div className="oferta-card__header">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {coverUrl ? (
                      <img src={coverUrl} alt={offer.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
                    ) : (
                      <div className="oferta-card__fallback">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/logo-icon.svg" alt="" />
                      </div>
                    )}
                    <span className="oferta-card__icon">{icon}</span>
                    <span className="oferta-card__badge">{badge}</span>
                  </div>
                  <div className="oferta-card__body">
                    <h3>{offer.title}</h3>
                    {offer.heading?.subtitle && (
                      <p>{offer.heading.subtitle.length > 120 ? offer.heading.subtitle.slice(0, 120) + '…' : offer.heading.subtitle}</p>
                    )}
                    <span className="oferta-card__link">Dowiedz się więcej →</span>
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
