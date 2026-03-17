import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Instructor, Class, Media } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import './instructor.css'

const CLASS_COLORS: Record<string, string> = {
  'krav-maga': '#c0392b',
  karate: '#1a237e',
  'tai-chi': '#2e7d32',
  individual: '#6a1b9a',
  asg: '#37474f',
  'power-training': '#e65100',
  other: '#455a64',
}

const AGE_GROUP_LABELS: Record<string, string> = {
  adults: 'Dorośli',
  children: 'Dzieci i młodzież',
  all: 'Wszyscy',
}

function getPhotoUrl(photo: Instructor['photo']): string | null {
  if (!photo || typeof photo === 'number') return null
  return (photo as Media).url ?? null
}

function isClass(val: number | Class): val is Class {
  return typeof val === 'object' && 'slug' in val
}

export default async function InstructorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let instructor: Instructor | null = null
  let classes: Class[] = []
  let navData = null
  let footerData = null

  try {
    const payload = await getPayload({ config })

    const [instrRes, navRes, footerRes] = await Promise.all([
      payload.find({
        collection: 'instructors',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      }),
      payload.findGlobal({ slug: 'navigation', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
    ])

    navData = navRes
    footerData = footerRes

    if (instrRes.docs.length === 0) return notFound()
    instructor = instrRes.docs[0] as Instructor

    // Fetch classes taught by this instructor
    const classesRes = await payload.find({
      collection: 'classes',
      where: { instructor: { equals: instructor.id } },
      depth: 0,
      limit: 20,
    })
    classes = classesRes.docs as Class[]
  } catch {
    return notFound()
  }

  if (!instructor) return notFound()

  const photoUrl = getPhotoUrl(instructor.photo)

  return (
    <>
      <Navbar data={navData} />

      {/* Breadcrumb */}
      <div className="instr-breadcrumb">
        <div className="instr-breadcrumb__inner">
          <a href="/o-nas">O nas</a>
          <span>›</span>
          <a href="/o-nas#kadra">Kadra</a>
          <span>›</span>
          <span>{instructor.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="instr-hero">
        <div className="instr-hero__inner">
          {photoUrl ? (
            <img src={photoUrl} alt={instructor.name} className="instr-hero__photo" />
          ) : (
            <div className="instr-hero__photo--placeholder">🥋</div>
          )}
          <div>
            <p className="instr-hero__eyebrow">Instruktor Pantera FSC</p>
            <h1 className="instr-hero__name">{instructor.name}</h1>
            {instructor.specialization && (
              <span className="instr-hero__spec">{instructor.specialization}</span>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="instr-body">
        <div className="instr-container">

          {/* Main column */}
          <div className="instr-main">

            {instructor.bio && (
              <div className="instr-section">
                <p className="instr-section__title">O instruktorze</p>
                <p className="instr-bio">{instructor.bio}</p>
              </div>
            )}

            {classes.length > 0 && (
              <div className="instr-section">
                <p className="instr-section__title">Prowadzone zajęcia</p>
                <div className="instr-classes__grid">
                  {classes.map((cls) => (
                    <a
                      key={cls.id}
                      href={`/zajecia/${cls.slug}`}
                      className="instr-class-card"
                      style={{ '--class-color': CLASS_COLORS[cls.type] ?? '#0f3460' } as React.CSSProperties}
                    >
                      <div className="instr-class-card__info">
                        <p className="instr-class-card__title">{cls.title}</p>
                        {cls.ageGroup && (
                          <span className="instr-class-card__age">
                            {AGE_GROUP_LABELS[cls.ageGroup] ?? cls.ageGroup}
                          </span>
                        )}
                      </div>
                      <span className="instr-class-card__arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="instr-sidebar">

            {instructor.achievements && instructor.achievements.length > 0 && (
              <div className="instr-achievements">
                <p className="instr-achievements__title">Osiągnięcia</p>
                <ul className="instr-achievements__list">
                  {instructor.achievements.map((a, i) => (
                    <li key={i}>{a.text}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="instr-cta">
              <p className="instr-cta__title">Chcesz trenować?</p>
              <p className="instr-cta__text">
                Pierwsze zajęcia są bezpłatne. Umów się już dziś.
              </p>
              <a href="/kontakt" className="instr-cta__btn">
                Zapisz się na próbny trening
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </>
  )
}
