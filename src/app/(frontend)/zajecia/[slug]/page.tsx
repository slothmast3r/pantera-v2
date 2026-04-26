export const revalidate = 300

import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class, Media, Instructor, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { offerIconMap, type OfferIconKey } from '@/components/icons/offerIcons'
import { DAY_VALUES, DAY_LABELS } from '@/constants/events'
import { INTENSITY_LABELS, HIGHLIGHT_ICONS, TYPE_ICONS } from '@/constants/classes'
import '../zajecia.css'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({ collection: 'classes', where: { slug: { equals: slug } }, limit: 1 })
    const doc = res.docs[0]
    if (doc?.seo?.metaTitle || doc?.seo?.metaDescription) {
      const ogImages = doc.seo.ogImage ? [{ url: (doc.seo.ogImage as any).url || '' }] : undefined
      return {
        title: doc.seo.metaTitle ?? undefined,
        description: doc.seo.metaDescription ?? undefined,
        alternates: { canonical: `/zajecia/${slug}` },
        openGraph: { images: ogImages },
        twitter: { card: 'summary_large_image', images: ogImages?.map((i) => i.url) },
      }
    }
  } catch {}
  return {
    title: 'Zajęcia – Pantera Family & Sport Club',
    alternates: { canonical: `/zajecia/${slug}` },
  }
}

function getCoverUrl(img: Class['coverImage'] | Class['heading']['backgroundImage']): string | null {
  if (!img || typeof img === 'number') return null
  return (img as Media).url ?? null
}

function getInstructor(rel: Class['instructor']): Instructor | null {
  if (!rel || typeof rel === 'number') return null
  return rel as Instructor
}

// Static fallback for Krav Maga
const staticKravMaga: Partial<Class> = {
  id: -1,
  title: 'Krav Maga',
  slug: 'krav-maga',
  type: 'krav-maga',
  ageGroup: 'adults',
  heading: {
    title: 'Krav Maga – Skuteczna samoobrona i trening dla ciała',
    subtitle: 'Poczuj się pewniej w każdej sytuacji. Naucz się reagować na zagrożenia, popraw kondycję i zredukuj stres w bezpiecznej, kameralnej atmosferze.',
  },
  introduction: {
    title: 'O zajęciach',
    content: null,
  },
  highlights: [
    { title: 'Realna samoobrona', description: 'Obrona przed uderzeniami, kopnięciami i chwytami.', icon: 'shield', id: '1' },
    { title: 'Procedury bezpieczeństwa', description: 'Jak unikać zagrożeń i radzić sobie w stresie.', icon: 'check', id: '2' },
    { title: 'Lepsza forma', description: 'Poprawisz siłę, dynamikę i wydolność organizmu.', icon: 'dumbbell', id: '3' },
  ],
  targetAudience: {
    forWhoTitle: 'Dla kogo?',
    forWhoContent: 'Zajęcia dla kobiet i mężczyzn w wieku 20–45+ lat. Niezależnie od tego, czy pracujesz w biurze, czy szukasz ruchu po godzinach – to miejsce dla Ciebie. Nie musisz mieć wcześniejszego doświadczenia.',
  },
  logistics: {
    intensity: 'medium-high',
    whatToBring: 'Długie spodnie sportowe, koszulka, woda',
  },
  cta: {
    heading: 'Zapisz się na pierwszy trening',
    description: 'Pierwsze zajęcia są bezpłatne. Przekonaj się sam.',
    buttonText: 'Zapisz się na pierwszy trening',
    buttonLink: '/kontakt',
  },
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let cls: Partial<Class> | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  let scheduleEntries: { day: string; startTime: string; endTime: string; ageRange?: string | null; notes?: string | null }[] = []

  try {
    const payload = await getPayload({ config })
    const [classRes, navRes, footerRes, scheduleRes] = await Promise.all([
      payload.find({
        collection: 'classes',
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 1,
      }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
      payload.findGlobal({ slug: 'schedule', depth: 1 }),
    ])
    nav = navRes
    footer = footerRes
    if (classRes.docs[0]) {
      cls = classRes.docs[0]
      scheduleEntries = (scheduleRes.entries ?? [])
        .filter((e) => {
          const rel = e.class
          return typeof rel === 'object' && rel !== null && (rel as Class).id === cls!.id
        })
        .map((e) => ({
          day: e.day,
          startTime: e.startTime,
          endTime: e.endTime,
          ageRange: e.ageRange ?? null,
          notes: e.notes ?? null,
        }))
    }
  } catch {
    // DB unavailable — use static fallback if slug matches
  }

  // If DB returned nothing, use static fallback if slug matches, else 404
  if (!cls) {
    if (slug === 'krav-maga') {
      cls = staticKravMaga
    } else {
      notFound()
    }
  }

  const instructor = getInstructor(cls.instructor as Class['instructor'])
  const bgUrl = getCoverUrl(cls.heading?.backgroundImage) ?? getCoverUrl(cls.coverImage)

  return (
    <>
      <Navbar data={nav} />

      {/* HEADER */}
      <section className="class-header">
        {bgUrl && <div className="class-header__bg" style={{ backgroundImage: `url(${bgUrl})` }} />}
        <div className="class-header__overlay" />
        <div className="container">
          <nav className="class-header__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Strona główna</Link>
            <span>›</span>
            <Link href="/zajecia">Zajęcia</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{cls.title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div className="label label--white" style={{ margin: 0 }}>{cls.type?.toUpperCase().replace(/-/g, ' ')}</div>
            {cls.ageGroup && (
              <span style={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '3px 10px', borderRadius: '4px',
                background: cls.ageGroup === 'children' ? 'rgba(22,130,60,0.25)' : 'rgba(255,255,255,0.15)',
                color: cls.ageGroup === 'children' ? '#7dffb2' : 'rgba(255,255,255,0.85)',
              }}>
                {cls.ageGroup === 'children' ? '🧒 Dzieci' : cls.ageGroup === 'adults' ? '👤 Dorośli' : '👥 Wszyscy'}
              </span>
            )}
          </div>
          <h1>{cls.heading?.title ?? cls.title}</h1>
          {cls.heading?.subtitle && (
            <p className="class-header__lead">{cls.heading.subtitle}</p>
          )}
          <Link
            href={(cls.cta?.buttonLink ?? '/kontakt') as any}
            className="btn btn--orange"
          >
            {cls.cta?.buttonText ?? 'Zapisz się na zajęcia'}
          </Link>
        </div>
      </section>

      {/* INTRO */}
      {(cls.introduction?.title || cls.introduction?.content) && (
        <section className="class-intro">
          <div className="container">
            <div className="class-intro__grid">
              <div className="class-intro__text">
                <div className="label">O ZAJĘCIACH</div>
                <h2>{cls.introduction.title ?? 'Czym są te zajęcia?'}</h2>
                {/* Richtext content rendered as plain paragraphs when no renderer available */}
                {!cls.introduction.content && (
                  <p>Szczegółowy opis zajęć dostępny w panelu administracyjnym.</p>
                )}
                {cls.introduction.content && (
                  <div className="rich-text">
                    {(cls.introduction.content as { root?: { children?: { children?: { text?: string }[] }[] } })?.root?.children?.map((node, i: number) => {
                      const text = node.children?.map((c) => c.text ?? '').join('') ?? ''
                      if (!text) return null
                      return <p key={i}>{text}</p>
                    })}
                  </div>
                )}
              </div>
              <div className="class-intro__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {getCoverUrl(cls.introduction.image) ? (
                  <img src={getCoverUrl(cls.introduction.image)!} alt={cls.title} />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HIGHLIGHTS — czego się nauczysz */}
      {cls.highlights && cls.highlights.length > 0 && (
        <section className="class-highlights">
          <div className="container">
            <div className="label">PROGRAM</div>
            <h2>Czego się nauczysz?</h2>
            <p className="class-highlights__subtitle">
              Konkretne umiejętności, które wyniesiesz z treningów.
            </p>
            <div className="class-highlights__grid">
              {cls.highlights.map((h, i) => {
                const IconKey = (h.icon as OfferIconKey) || HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
                const iconData = offerIconMap[IconKey] || offerIconMap.star

                return (
                  <div key={h.id ?? i} className="highlight-card">
                    <span className="highlight-card__icon">
                      {iconData.svg}
                    </span>
                    <h3>{h.title}</h3>
                    {h.description && <p>{h.description}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* FOR WHO */}
      {cls.targetAudience?.forWhoContent && (
        <section className="class-for-who">
          <div className="container">
            <div className="class-for-who__inner">
              <div>
                <div className="label label--white">UCZESTNICY</div>
                <h2>{cls.targetAudience.forWhoTitle ?? 'Dla kogo są te zajęcia?'}</h2>
                <p>{cls.targetAudience.forWhoContent}</p>
              </div>
              {cls.targetAudience.expectContent && (
                <div>
                  <div className="label label--white">CZEGO OCZEKIWAĆ</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.25 }}>
                    {cls.targetAudience.expectTitle ?? 'Czego możesz się spodziewać'}
                  </h3>
                  <p>{cls.targetAudience.expectContent}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* LOGISTICS */}
      {(instructor || cls.logistics?.intensity || cls.logistics?.whatToBring) && (
        <section className="class-logistics">
          <div className="container">
            <div className="label">SZCZEGÓŁY</div>
            <h2>Informacje organizacyjne</h2>
            <p className="class-logistics__subtitle">Wszystko, co musisz wiedzieć przed pierwszym treningiem.</p>
            <div className="class-logistics__grid">
              {instructor && (
                <Link href={`/instruktor/${instructor.slug}`} className="logistics-card logistics-card--clickable" style={{ textDecoration: 'none' }}>
                  <span className="logistics-card__label">Prowadzący</span>
                  <div className="logistics-card__value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {instructor.name}
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>➔</span>
                  </div>
                  {instructor.specialization && (
                    <div className="logistics-card__sub">{instructor.specialization}</div>
                  )}
                </Link>
              )}
              {cls.logistics?.intensity && (
                <div className="logistics-card">
                  <span className="logistics-card__label">Intensywność</span>
                  <div className="logistics-card__value">
                    {INTENSITY_LABELS[cls.logistics.intensity] ?? cls.logistics.intensity}
                  </div>
                </div>
              )}
              {cls.logistics?.whatToBring && (
                <div className="logistics-card">
                  <span className="logistics-card__label">Co zabrać</span>
                  <div className="logistics-card__value">{cls.logistics.whatToBring}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* RELATED CLASSES */}
      {cls.relatedClasses && (cls.relatedClasses as Class[]).length > 0 && (
        <section className="class-related" style={{ padding: '80px 20px', background: '#fcfcfc', borderTop: '1px solid #eee' }}>
          <div className="container">
            <div className="label">OFERTA</div>
            <h2>Może Cię zainteresować</h2>
            <p style={{ color: '#666', marginBottom: '40px' }}>Inne zajęcia, które mogą uzupełnić Twój trening lub zainteresować Twoich bliskich.</p>
            <div className="zajecia-grid">
              {(cls.relatedClasses as Class[]).map((rel) => {
                const coverUrl = getCoverUrl(rel.coverImage)
                const iconKey: OfferIconKey = TYPE_ICONS[rel.type ?? ''] ?? 'star'
                const iconData = offerIconMap[iconKey] || offerIconMap.star

                return (
                  <Link key={rel.id} href={`/zajecia/${rel.slug}`} className="zajecia-card" style={{ textDecoration: 'none' }}>
                    {coverUrl ? (
                      <img src={coverUrl} alt={rel.title} className="zajecia-card__image" />
                    ) : (
                      <div className="zajecia-card__image--placeholder">
                        <div style={{ width: '50px', height: '50px', color: 'rgba(255,255,255,0.4)' }}>
                          {iconData.svg}
                        </div>
                      </div>
                    )}
                    <div className="zajecia-card__body">
                      <div className="zajecia-card__badges">
                        {rel.type && (
                          <span className="zajecia-card__badge zajecia-card__badge--type">
                            {rel.type.toUpperCase().replace(/-/g, ' ')}
                          </span>
                        )}
                      </div>
                      <h3>{rel.title}</h3>
                      <p className="zajecia-card__subtitle">{rel.heading?.subtitle || rel.heading?.title}</p>
                      <span className="zajecia-card__link">Sprawdź ofertę →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* SCHEDULE */}
      {scheduleEntries.length > 0 && (
        <section className="class-schedule">
          <div className="container">
            <div className="class-schedule__header">
              <div>
                <div className="label">GRAFIK</div>
                <h2>Kiedy odbywają się zajęcia?</h2>
              </div>
              <Link href="/grafik" className="class-schedule__full-link">
                Pełny grafik →
              </Link>
            </div>
            <div className="class-schedule__days">
              {DAY_VALUES.filter((d) => scheduleEntries.some((e) => e.day === d)).map((day) => {
                const entries = scheduleEntries.filter((e) => e.day === day)
                return (
                  <div key={day} className="class-schedule__day-card">
                    <div className="class-schedule__day-header">{DAY_LABELS[day]}</div>
                    <div className="class-schedule__slots">
                      {entries.map((e, i) => (
                        <div key={i} className="class-schedule__slot">
                          <span className="class-schedule__time">{e.startTime}–{e.endTime}</span>
                          <div className="class-schedule__meta">
                            {e.ageRange && <span className="class-schedule__age">{e.ageRange}</span>}
                            {e.notes && <span className="class-schedule__notes">{e.notes}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="class-cta">
        <div className="container">
          <h2>{cls.cta?.heading ?? 'Dołącz do nas już dziś'}</h2>
          <p>{cls.cta?.description ?? 'Pierwsze zajęcia są bezpłatne. Przekonaj się, dlaczego nam ufają setki rodzin z Mokotowa.'}</p>
          <div className="class-cta__buttons">
            <Link href={(cls.cta?.buttonLink ?? '/kontakt') as any} className="btn btn--orange">
              {cls.cta?.buttonText ?? 'Zapisz się na zajęcia'}
            </Link>
            <Link href="/zajecia" className="btn btn--outline-white">
              ← Wszystkie zajęcia
            </Link>
          </div>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}
