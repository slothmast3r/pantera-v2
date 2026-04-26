import React from 'react'
import Link from 'next/link'
import type { Homepage, Media } from '@/payload-types'
import { getImageUrl as getMediaUrl } from '@/lib/media'
import { SectionHeader } from '@/components/ui/SectionHeader'

type ServicesData = Homepage['services']

const staticCards = [
  {
    tag: 'Firmy',
    title: 'Warsztaty dla Firm (B2B)',
    description: 'Organizujemy warsztaty samoobrony i teambuilding dla firm. Idealne na integracje i szkolenia.',
    ctaText: 'Sprawdź ofertę',
    ctaUrl: '/oferta/dla-firm',
    color: '#2a5298',
    image: null,
  },
  {
    tag: 'Kulturowo',
    title: 'Urodziny na sportowo',
    description: 'Zorganizuj wyjątkowe urodziny dla dzieci w naszym klubie! Animacje, nauka samoobrony i świetna zabawa.',
    ctaText: 'Sprawdź ofertę',
    ctaUrl: '/oferta/urodziny',
    color: '#8b0000',
    image: null,
  },
]

type CardImage = NonNullable<NonNullable<ServicesData>['cards']>[number]['image']

export default function ServicesSection({ data }: { data?: ServicesData | null }) {
  const label = data?.sectionLabel ?? 'USŁUGI DODATKOWE'
  const title = data?.sectionTitle ?? 'Pantera to także:'
  const cols = data?.columns ?? '2'
  const cards = data?.cards?.length ? data.cards : staticCards

  return (
    <section className="services">
      <div className="section-container">
        <SectionHeader label={label} title={title} />
        <div className={`services__grid services__grid--cols-${cols}`}>
          {cards.map((s, i) => {
            const imgUrl = 'image' in s ? getMediaUrl(s.image as Media | number | null, 'card') : null
            return (
              <div key={i} className="services__card">
                <div
                  className="services__image"
                  style={imgUrl
                    ? { backgroundImage: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                    : { background: '#e8e9ec' }
                  }
                >
                  {!imgUrl && (
                    <div style={{ position: 'absolute', inset: '64px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/logo-icon.svg" alt="" style={{ width: 'auto', height: '100%', opacity: 0.15, filter: 'grayscale(1)' }} />
                    </div>
                  )}
                  <span className="services__tag">{s.tag}</span>
                </div>
                <div className="services__content">
                  <h3>{s.title}</h3>
                  <p>{'description' in s ? (s as { description?: string | null }).description : null}</p>
                  <Link href={(s.ctaUrl ?? '#') as any} className="btn btn--orange">
                    {s.ctaText ?? 'Sprawdź ofertę'} →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
