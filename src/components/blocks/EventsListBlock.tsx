import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Event } from '@/payload-types'
import { EventCard } from '@/components/events/EventCard'
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
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
