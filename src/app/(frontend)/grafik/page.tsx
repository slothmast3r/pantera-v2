export const revalidate = 300

import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class, Event } from '@/payload-types'
import { TYPE_COLORS } from '@/constants/events'
import type { DayValue } from '@/constants/events'
import { buildEventsByDay } from '@/lib/scheduleUtils'
import { EventCard } from '@/components/events/EventCard'
import { STATIC_SCHEDULE_FALLBACK } from '@/constants/scheduleData'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import GrafikClient from './GrafikClient'
import type { DisplayEntry } from '@/lib/scheduleUtils'
import './grafik.css'
import '@/app/(frontend)/wydarzenia/wydarzenia.css'

export const metadata: Metadata = {
  title: 'Grafik zajęć – Pantera Family & Sport Club Warszawa',
  description: 'Sprawdź aktualny grafik zajęć Krav Maga, Karate, Tai Chi i Power Training w Panterze na Mokotowie. Znajdź termin dla siebie!',
  alternates: { canonical: '/grafik' },
  openGraph: {
    title: 'Grafik zajęć – Pantera Family & Sport Club',
    description: 'Aktualny grafik zajęć Krav Maga, Karate, Tai Chi i Power Training w Panterze na Mokotowie.',
  },
}

function isClass(val: number | Class): val is Class {
  return typeof val === 'object' && 'slug' in val
}

export default async function GrafikPage() {
  let title = 'Grafik Zajęć'
  let subtitle = 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.'
  let displayEntries: DisplayEntry[] = STATIC_SCHEDULE_FALLBACK
  let navData = null
  let footerData = null
  let upcomingEvents: Event[] = []

  try {
    const payload = await getPayload({ config })
    const [schedule, nav, footer, eventsRes] = await Promise.all([
      payload.findGlobal({ slug: 'schedule', depth: 1 }),
      payload.findGlobal({ slug: 'navigation', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
      payload.find({
        collection: 'events',
        where: (() => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const todayStr = today.toISOString()
          return {
            or: [
              { startDate: { greater_than_equal: todayStr } },
              { endDate: { greater_than_equal: todayStr } },
            ],
          } as any
        })(),
        sort: 'startDate',
        limit: 5,
      }),
    ])
    navData = nav
    footerData = footer
    upcomingEvents = eventsRes.docs as Event[]
    if (schedule.title) title = schedule.title
    if (schedule.subtitle) subtitle = schedule.subtitle
    const populated = (schedule.entries ?? []).filter((e) => isClass(e.class))
    if (populated.length > 0) {
      displayEntries = populated.map((e) => ({
        cls: e.class as Class,
        day: e.day as DayValue,
        startTime: e.startTime,
        endTime: e.endTime,
        ageRange: e.ageRange ?? null,
        notes: e.notes ?? null,
      }))
    }
  } catch {
    // use static fallback
  }

  const presentTypes = [...new Set(displayEntries.map((e) => e.cls.type))].filter(
    (t) => t != null && t in TYPE_COLORS,
  ) as string[]

  return (
    <>
      <Navbar data={navData} />
      <main>
        {/* HERO */}
        <section className="grafik-hero">
          <p className="grafik-hero__eyebrow">Plan tygodnia</p>
          <h1 className="grafik-hero__title">{title}</h1>
          <p className="grafik-hero__subtitle">{subtitle}</p>
        </section>

        <GrafikClient entries={displayEntries} presentTypes={presentTypes} eventsByDay={buildEventsByDay(upcomingEvents)} />

        {/* EVENTS */}
        {upcomingEvents.length > 0 && (
          <section className="events-list">
            <div className="container">
              <h2 className="events-list__heading">Nadchodzące wydarzenia</h2>
              <div className="events-grid">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} showWeekBadge />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="grafik-cta">
          <h2 className="grafik-cta__title">Pierwsze zajęcia bezpłatnie</h2>
          <p className="grafik-cta__text">
            Wybierz termin, który Ci odpowiada i umów się na próbny trening.
          </p>
          <Link href="/kontakt" className="grafik-cta__btn">
            Zapisz się teraz
          </Link>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
