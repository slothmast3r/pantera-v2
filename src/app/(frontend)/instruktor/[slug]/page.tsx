export const revalidate = 300

import type { Metadata } from 'next'
import { getPayload as getPayloadInstance } from 'payload'
import payloadConfig from '@payload-config'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadInstance({ config: payloadConfig })
    const res = await payload.find({ collection: 'instructors', where: { slug: { equals: slug } }, limit: 1 })
    const doc = res.docs[0]
    if (doc?.seo?.metaTitle || doc?.seo?.metaDescription) {
      return {
        title: doc.seo.metaTitle ?? undefined,
        description: doc.seo.metaDescription ?? undefined,
        openGraph: doc.seo.ogImage ? {
          images: [
            {
              url: (doc.seo.ogImage as any).url || '',
            },
          ],
        } : undefined,
      }
    }
  } catch {}
  return {
    title: 'Instruktor – Pantera Family & Sport Club',
  }
}

import Link from 'next/link'
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
          <Link href="/o-nas">O nas</Link>
          <span>›</span>
          <Link href="/o-nas#instruktorzy">Instruktorzy</Link>
          <span>›</span>
          <span>{instructor.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="instr-hero">
        <div className="instr-hero__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
                <h2 className="instr-section__title">O instruktorze</h2>
                <p className="instr-bio">{instructor.bio}</p>
              </div>
            )}

            {classes.length > 0 && (
              <div className="instr-section">
                <h2 className="instr-section__title">Prowadzone zajęcia</h2>
                <div className="instr-classes__grid">
                  {classes.map((cls) => (
                    <Link
                      key={cls.id}
                      href={`/zajecia/${cls.slug}` as any}
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
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="instr-sidebar">

            {instructor.achievements && instructor.achievements.length > 0 && (
              <div className="instr-achievements">
                <h2 className="instr-achievements__title">Osiągnięcia</h2>
                <ul className="instr-achievements__list">
                  {instructor.achievements.map((a, i) => (
                    <li key={i}>{a.text}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="instr-cta">
              <h2 className="instr-cta__title">Chcesz trenować?</h2>
              <p className="instr-cta__text">
                Pierwsze zajęcia są bezpłatne. Umów się już dziś.
              </p>
              <Link href="/kontakt" className="instr-cta__btn">
                Zapisz się na próbny trening
              </Link>
            </div>

          </div>
        </div>
      </section>

      <Footer data={footerData} />
    </>
  )
}
