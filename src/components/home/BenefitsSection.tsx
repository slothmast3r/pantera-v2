import React from 'react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Homepage } from '@/payload-types'

type BenefitsData = Homepage['benefits']
type BenefitItem = NonNullable<NonNullable<BenefitsData>['items']>[number]

const staticBenefits: BenefitItem[] = [
  { icon: '/icons/shield.svg', title: 'Bezpieczeństwo', description: 'Bezpieczeństwo w całej naszej szkole i metody nauczania są najwyższym priorytetem.' },
  { icon: '/icons/family.svg', title: 'Kameralność', description: 'Małe grupy, bliskie relacje, przyjazna i motywująca atmosfera.' },
  { icon: '/icons/diploma.svg', title: 'Profesjonalne kadry', description: 'Nasi instruktorzy posiadają wieloletnie doświadczenie i certyfikacje.' },
  { icon: '/icons/heart-infinity.svg', title: 'Rodzinna społeczność', description: 'Dołącz do Pantery i stań się częścią bezpiecznej rodzinnej społeczności.' },
]

export default function BenefitsSection({ data }: { data?: BenefitsData | null }) {
  const benefits = data?.items?.length ? data.items : staticBenefits

  return (
    <section className="benefits">
      <div className="benefits__container">
        <div className="benefits__image">
          <div className="benefits__image-placeholder" />
        </div>
        <div className="benefits__content">
          <SectionHeader label="DLACZEGO PANTERA?" title="Więcej niż tylko trening" titleClassName="section-title--left" />
          <ul className="benefits__list">
            {benefits.map((b) => (
              <li key={b.title} className="benefits__item">
                <span className="benefits__icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.icon} alt="" aria-hidden="true" className="benefits__icon-img" />
                </span>
                <div>
                  <strong>{b.title}</strong>
                  <p>{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/o-nas" className="btn btn--orange">Więcej o nas →</Link>
        </div>
      </div>
    </section>
  )
}
