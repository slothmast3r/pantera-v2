export const revalidate = 300

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grafik zajęć – Pantera Family & Sport Club Warszawa',
  description: 'Sprawdź aktualny grafik zajęć Krav Maga, Karate, Tai Chi i Power Training w Panterze na Mokotowie. Znajdź termin dla siebie!',
  alternates: {
    canonical: '/grafik',
  },
}

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { STATUS_LABELS, STATUS_COLORS, DAY_VALUES, TYPE_COLORS } from '@/constants/events'
import type { DayValue } from '@/constants/events'
import { computeStatus, formatDateRange } from '@/lib/eventUtils'
import './grafik.css'
import '@/app/(frontend)/wydarzenia/wydarzenia.css'

function getWeekBounds() {
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)
  return { weekStart, weekEnd }
}

function isThisWeek(startStr: string, endStr?: string | null): boolean {
  const { weekStart, weekEnd } = getWeekBounds()
  const start = new Date(startStr)
  const end = endStr ? new Date(endStr) : start
  return start <= weekEnd && end >= weekStart
}

type WeekEvent = { title: string; time?: string | null; registrationLink?: string | null; cancelled: boolean }

function buildEventsByDay(events: Event[]): Record<DayValue, WeekEvent[]> {
  const result = DAY_VALUES.reduce((acc, d) => {
    acc[d] = []
    return acc
  }, {} as Record<DayValue, WeekEvent[]>)
  const { weekStart, weekEnd } = getWeekBounds()
  for (const event of events) {
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate)
    if (start > weekEnd || end < weekStart) continue
    // iterate days of the week this event covers
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      const dayEnd = new Date(day)
      dayEnd.setHours(23, 59, 59, 999)
      if (start <= dayEnd && end >= day) {
        result[DAY_VALUES[i]].push({
          title: event.title,
          time: (event as any).time ?? null,
          registrationLink: event.registrationLink ?? null,
          cancelled: !!(event as any).cancelled,
        })
      }
    }
  }
  return result
}


import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class, Event } from '@/payload-types'
import GrafikClient, { type DisplayEntry } from './GrafikClient'


const STATIC_FALLBACK: DisplayEntry[] = [
  // Poniedziałek
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '7–9 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '10–13 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '14–16 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'monday',
    startTime: '18:45',
    endTime: '19:45',
    ageRange: null,
    notes: 'grupa początkująca',
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'monday',
    startTime: '19:45',
    endTime: '20:45',
    ageRange: null,
    notes: 'grupa zaawansowana',
  },
  // Wtorek
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '6–7 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '6–7 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '8–14 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '18:45',
    endTime: '19:30',
    ageRange: '8–14 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'tuesday',
    startTime: '19:30',
    endTime: '20:30',
    ageRange: null,
    notes: null,
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'tuesday',
    startTime: '20:30',
    endTime: '21:30',
    ageRange: null,
    notes: null,
  },
  // Środa (jak Poniedziałek)
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '7–9 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '10–13 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '14–16 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '18:45',
    endTime: '19:45',
    ageRange: null,
    notes: 'grupa początkująca',
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '19:45',
    endTime: '20:45',
    ageRange: null,
    notes: 'grupa zaawansowana',
  },
  // Czwartek (jak Wtorek)
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '6–7 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '6–7 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '8–14 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '18:45',
    endTime: '19:30',
    ageRange: '8–14 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'thursday',
    startTime: '19:30',
    endTime: '20:30',
    ageRange: null,
    notes: null,
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'thursday',
    startTime: '20:30',
    endTime: '21:30',
    ageRange: null,
    notes: null,
  },
  // Piątek
  {
    cls: { title: 'Dynamiczne Strzelectwo ASG', slug: 'asg', type: 'asg' },
    day: 'friday',
    startTime: '18:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Dla uczestników którzy zaliczyli lekcje INTRO',
  },
  {
    cls: { title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi' },
    day: 'friday',
    startTime: '20:00',
    endTime: '21:00',
    ageRange: null,
    notes: 'dorośli',
  },
  // Sobota
  {
    cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' },
    day: 'saturday',
    startTime: '14:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Informacje: tel. 508 689 718',
  },
  // Niedziela
  {
    cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' },
    day: 'sunday',
    startTime: '14:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Informacje: tel. 508 689 718',
  },
]

function isClass(val: number | Class): val is Class {
  return typeof val === 'object' && 'slug' in val
}

export default async function GrafikPage() {
  let title = 'Grafik Zajęć'
  let subtitle = 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.'
  let displayEntries: DisplayEntry[] = STATIC_FALLBACK
  let navData = null
  let footerData = null
  let upcomingEvents: Event[] = []

  try {
    const payload = await getPayload({ config })
    const [schedule, nav, footer, eventsRes] = await Promise.all([
      payload.findGlobal({ slug: 'schedule', depth: 2 }),
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
                {upcomingEvents.map((event) => {
                  const status = computeStatus(event)
                  const isCancelled = status === 'cancelled'
                  const thisWeek = !isCancelled && isThisWeek(event.startDate, event.endDate)
                  return (
                  <div key={event.id} className={`event-card${isCancelled ? ' event-card--cancelled' : ''}${thisWeek ? ' event-card--this-week' : ''}`}>
                    <div className="event-card__date">
                      <span className="event-card__day">{new Date(event.startDate).getDate()}</span>
                      <span className="event-card__month">
                        {new Date(event.startDate).toLocaleDateString('pl-PL', { month: 'short' })}
                      </span>
                    </div>
                    <div className="event-card__body">
                      <div className="event-card__meta">
                        {thisWeek && (
                          <span className="event-card__badge--week">W tym tygodniu</span>
                        )}
                        <span className="event-card__status" style={{ color: STATUS_COLORS[status] }}>
                          {STATUS_LABELS[status]}
                        </span>
                        {event.location && (
                          <span className="event-card__location">
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>location_on</span>
                            {event.location}
                          </span>
                        )}
                      </div>
                      <h3 className="event-card__title">{event.title}</h3>
                      {event.shortDescription && (
                        <p className="event-card__desc">{event.shortDescription}</p>
                      )}
                      <div className="event-card__footer">
                        <span className="event-card__full-date">
                          {formatDateRange(event.startDate, event.endDate)}{(event as any).time ? `, godz. ${(event as any).time}` : ''}
                        </span>
                        {event.registrationLink && !isCancelled && (
                          <Button asChild size="sm">
                            <Link href={event.registrationLink as any}>Zapisz się</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  )
                })}
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
