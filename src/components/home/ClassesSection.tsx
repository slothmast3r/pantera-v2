import React from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Homepage, Media } from '@/payload-types'

type ClassesData = Homepage['classes']
type ClassItem = NonNullable<NonNullable<ClassesData>['items']>[number]

const staticClasses: ClassItem[] = [
  { title: 'Dla Dzieci', description: 'Budujemy pewność siebie i formy ruchowe u dzieci w bezpiecznym, rodzinnym środowisku.', href: '/zajecia?filter=children', color: '#2a5298', image: null },
  { title: 'Dla Dorosłych', description: 'Krav Maga, Karate i sztuki walki dla dorosłych. Naucz się jak się bronić i ćwicz efektywnie.', href: '/zajecia?filter=adults', color: '#8b0000', image: null },
  { title: 'Tai Chi', description: 'Tai Chi i zajęcia skupiające się na harmonii ciała i umysłu, dobre dla każdego wieku.', href: '/zajecia/tai-chi', color: '#1a6b3c', image: null },
]

const staticImageUrls: Record<string, string> = {
  '/zajecia?filter=children': '/classes-dzieci.webp',
  '/zajecia?filter=adults': '/classes-dorosli.webp',
  '/zajecia/tai-chi': '/classes-taichi.webp',
}

export default function ClassesSection({ data }: { data?: ClassesData | null }) {
  const classes = data?.items?.length ? data.items : staticClasses

  return (
    <section className="classes">
      <div className="section-container">
        <SectionHeader
          label="ZAJĘCIA"
          title="Wybierz swoją drogę"
          subtitle="Znajdź zajęcia idealne dla swojego wieku i celu treningowego"
        />
        <div className="classes__grid">
          {classes.map((cls) => {
            const mediaUrl = typeof cls.image === 'object' && cls.image ? (cls.image as Media).url : null
            const imageUrl = mediaUrl ?? staticImageUrls[cls.href] ?? null
            return (
              <a
                key={cls.href}
                href={cls.href}
                className="classes__card"
                style={{
                  background: cls.color ?? '#2a5298',
                  backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="classes__card-overlay" />
                <div className="classes__card-content">
                  <div className="classes__card-title-row">
                    <h3>{cls.title}</h3>
                    <span className="classes__card-arrow">→</span>
                  </div>
                  <div className="classes__card-hover">
                    <div>
                      <p>{cls.description}</p>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
