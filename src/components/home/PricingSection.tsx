import React from 'react'
import Icon from '@/components/ui/Icon'
import type { Homepage } from '@/payload-types'
import { SectionHeader } from '@/components/ui/SectionHeader'

type PricingData = Homepage['pricing']

const FEATURED_ACCENT = '#F57C28'
const SECONDARY_ACCENT = '#2a5298'

const staticPlans = [
  {
    name: 'Trenuj Indywidualnie',
    price: 'Zapytaj o cenę',
    period: '',
    features: [
      { text: 'Indywidualny plan treningowy' },
      { text: 'Prywatne zajęcia z instruktorem' },
      { text: 'Elastyczny grafik' },
      { text: 'Pełna personalizacja' },
    ],
    ctaText: 'Skontaktuj się',
    ctaUrl: '/kontakt',
    featured: false,
  },
  {
    name: 'Pakiet „Solidny Fundament"',
    price: '250 zł',
    period: '/ mies. *',
    features: [
      { text: 'Nielimitowane zajęcia grupowe' },
      { text: 'Dostęp do wszystkich grup wiekowych' },
      { text: 'Krav Maga + Karate' },
      { text: 'Społeczność Pantery' },
    ],
    ctaText: 'Zapisz się',
    ctaUrl: '/kontakt',
    featured: true,
  },
  {
    name: 'Pakiet „Nieograniczony"',
    price: '300 zł',
    period: '/ mies. *',
    features: [
      { text: 'Wszystko z pakietu Fundament' },
      { text: 'Tai Chi + zajęcia premium' },
      { text: 'Priorytetowy dostęp do wydarzeń' },
      { text: 'Indywidualne konsultacje' },
    ],
    ctaText: 'Zapisz się',
    ctaUrl: '/kontakt',
    featured: false,
  },
]

export default function PricingSection({ data }: { data?: PricingData | null }) {
  const label = data?.sectionLabel ?? 'CENNIK'
  const title = data?.sectionTitle ?? 'Cennik dopasowany do twoich potrzeb'
  const note = data?.note ?? '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.'
  const plans = data?.plans?.length ? data.plans : staticPlans

  return (
    <section className="pricing">
      <div className="section-container">
        <SectionHeader label={label} title={title} />
        <div className="pricing__grid">
          {plans.map((plan, i) => {
            const accent = plan.featured ? FEATURED_ACCENT : SECONDARY_ACCENT
            return (
              <div
                key={i}
                className={`pricing__card ${plan.featured ? 'pricing__card--featured' : 'pricing__card--secondary'}`}
                style={{ '--accent': accent } as React.CSSProperties}
              >
                {plan.featured && (
                  <span className="pricing__badge">Polecany</span>
                )}
                <div className="pricing__accent-bar" />
                <h3 className="pricing__name">{plan.name}</h3>
                <div className="pricing__price">
                  <span className="pricing__amount">{plan.price}</span>
                  {plan.period && <span className="pricing__period">{plan.period}</span>}
                </div>
                <ul className="pricing__features">
                  {plan.features?.map((f, j) => (
                    <li key={j}>
                      <Icon name="check" className="pricing__check-icon" />
                      {typeof f === 'string' ? f : f.text}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaUrl ?? '/kontakt'}
                  className="pricing__cta"
                >
                  {plan.ctaText ?? 'Zapisz się'}
                </a>
              </div>
            )
          })}
        </div>
        {note && <p className="pricing__note">{note}</p>}
      </div>
    </section>
  )
}
