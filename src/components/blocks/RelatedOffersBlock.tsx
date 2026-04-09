import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Offer } from '@/payload-types'
import { offerIconMap } from '@/components/icons/offerIcons'

interface Props {
  heading?: string | null
  offers: (number | Offer)[]
}

const categoryLabels: Record<string, string> = {
  company: 'Dla Firm',
  schools: 'Dla Szkół',
  workshop: 'Warsztaty',
  birthday: 'Urodziny',
  other: 'Oferta',
}

export default async function RelatedOffersBlock({ heading, offers }: Props) {
  const ids = offers.map((o) => (typeof o === 'number' ? o : o.id))
  if (!ids.length) return null

  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'offers',
    where: { id: { in: ids } },
    limit: 3,
    depth: 0,
  })

  const docs = res.docs as Offer[]
  if (!docs.length) return null

  // preserve original order
  const ordered = ids.map((id) => docs.find((d) => d.id === id)).filter(Boolean) as Offer[]

  return (
    <section className="related-offers">
      <div className="container">
        {heading && <p className="related-offers__label">{heading}</p>}
        <div className="related-offers__grid">
          {ordered.map((offer) => {
            const iconKey = (offer as any).icon || offer.category || 'other'
            const iconEntry = offerIconMap[iconKey] ?? offerIconMap.other
            const category = categoryLabels[offer.category ?? ''] ?? 'Oferta'
            const subtitle = offer.heading?.subtitle
            return (
              <Link key={offer.id} href={`/oferta/${offer.slug}`} className="related-offer-card">
                <div className="related-offer-card__icon">
                  {iconEntry.svg}
                </div>
                <div className="related-offer-card__body">
                  <span className="related-offer-card__category">{category}</span>
                  <h3 className="related-offer-card__title">{offer.title}</h3>
                  {subtitle && (
                    <p className="related-offer-card__desc">
                      {subtitle.length > 100 ? subtitle.slice(0, 100) + '…' : subtitle}
                    </p>
                  )}
                </div>
                <span className="related-offer-card__arrow">→</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
