import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Event } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/events'
import { computeStatus, formatDateRange } from '@/lib/eventUtils'
import '@/app/(frontend)/wydarzenia/wydarzenia.css'

interface Props {
  heading?: string | null
  variant?: 'upcoming' | 'past' | 'all'
  limit?: number | null
  manualSelection?: (number | Event)[] | null
}

export default async function EventsListBlock({ heading, variant = 'upcoming', limit = 6, manualSelection }: Props) {
  const payload = await getPayload({ config })

  let events: Event[] = []

  if (manualSelection?.length) {
    events = manualSelection.filter((e): e is Event => typeof e !== 'number')
  } else {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString()

    let where: Record<string, unknown>
    if (variant === 'all') {
      where = { cancelled: { not_equals: true } }
    } else if (variant === 'past') {
      where = {
        and: [
          { cancelled: { not_equals: true } },
          { startDate: { less_than: todayStr } },
        ],
      }
    } else {
      where = {
        and: [
          { cancelled: { not_equals: true } },
          {
            or: [
              { startDate: { greater_than_equal: todayStr } },
              { endDate: { greater_than_equal: todayStr } },
            ],
          },
        ],
      }
    }

    const res = await payload.find({
      collection: 'events',
      where: where as any,
      limit: limit ?? 6,
      sort: variant === 'past' ? '-startDate' : 'startDate',
    })
    events = res.docs as Event[]
  }

  if (!events.length) return null

  return (
    <section className="events-list">
      <div className="container">
        {heading && <h2 className="events-list__heading">{heading}</h2>}
        <div className="events-grid">
          {events.map((event) => {
            const status = computeStatus(event)
            return (
              <div key={event.id} className="event-card">
                <div className="event-card__date">
                  <span className="event-card__day">
                    {new Date(event.startDate).getDate()}
                  </span>
                  <span className="event-card__month">
                    {new Date(event.startDate).toLocaleDateString('pl-PL', { month: 'short' })}
                  </span>
                </div>
                <div className="event-card__body">
                  <div className="event-card__meta">
                    <span
                      className="event-card__status"
                      style={{ color: STATUS_COLORS[status] }}
                    >
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
                    {event.registrationLink && (
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
  )
}
