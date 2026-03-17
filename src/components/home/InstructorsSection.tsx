import React from 'react'
import type { Instructor, Media } from '@/payload-types'

const staticInstructors = [
  {
    id: -1,
    name: 'Michał Jawarski',
    specialization: 'KRAV MAGA / SAMOOBRONA',
    bio: 'Doświadczony instruktor z wieloletnim stażem w sztukach walki.',
    photo: null,
  },
  {
    id: -2,
    name: 'Tomasz Łubikowski',
    specialization: 'KARATE / POWER TRAINING',
    bio: 'Mistrz karate i trener personalny z pasją do nauczania.',
    photo: null,
  },
  {
    id: -3,
    name: 'Janusz Dąbrowski',
    specialization: 'TAI CHI / MASTER',
    bio: 'Mistrz Tai Chi z wieloletnim doświadczeniem w pracy z każdym wiekiem.',
    photo: null,
  },
]

function getPhotoUrl(photo: Instructor['photo']): string | null {
  if (!photo || typeof photo === 'number') return null
  return (photo as Media).url ?? null
}

export default function InstructorsSection({ instructors }: { instructors?: Instructor[] | null }) {
  const items = instructors?.length ? instructors : staticInstructors

  return (
    <section className="instructors">
      <div className="section-container">
        <div className="section-label">KADRA</div>
        <h2 className="section-title">Twoi Mentorzy w sztuce walki</h2>
        <p className="section-subtitle">
          Poznaj naszych instruktorów – ekspertów w swoich dziedzinach, z pasją do przekazywania wiedzy.
        </p>
        <div className="instructors__grid">
          {items.map((i) => {
            const photoUrl = getPhotoUrl(i.photo)
            return (
              <div key={i.id} className="instructors__card">
                {photoUrl ? (
                  <img src={photoUrl} alt={i.name} className="instructors__photo" />
                ) : (
                  <div className="instructors__photo" />
                )}
                <div className="instructors__info">
                  <h3>{i.name}</h3>
                  <span className="instructors__spec">{i.specialization}</span>
                  <p>{i.bio}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
