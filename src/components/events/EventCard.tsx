import Link from 'next/link'
import type { Event } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/events'
import { computeStatus, formatDateRange } from '@/lib/eventUtils'
import { isThisWeek } from '@/lib/scheduleUtils'

interface EventCardProps {
  event: Event
  showWeekBadge?: boolean
}

export function EventCard({ event, showWeekBadge = false }: EventCardProps) {
  const status = computeStatus(event)
  const isCancelled = status === 'cancelled'
  const thisWeek = showWeekBadge && !isCancelled && isThisWeek(event.startDate, event.endDate)

  return (
    <div
      className={`event-card${isCancelled ? ' event-card--cancelled' : ''}${thisWeek ? ' event-card--this-week' : ''}`}
    >
      <div className="event-card__date">
        <span className="event-card__day">{new Date(event.startDate).getDate()}</span>
        <span className="event-card__month">
          {new Date(event.startDate).toLocaleDateString('pl-PL', { month: 'short' })}
        </span>
      </div>
      <div className="event-card__body">
        <div className="event-card__meta">
          {thisWeek && <span className="event-card__badge--week">W tym tygodniu</span>}
          <span className="event-card__status" style={{ color: STATUS_COLORS[status] }}>
            {STATUS_LABELS[status]}
          </span>
          {event.location && (
            <span className="event-card__location">
              <span className="material-symbols-outlined icon-sm">location_on</span>
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
            {formatDateRange(event.startDate, event.endDate)}
            {(event as any).time ? `, godz. ${(event as any).time}` : ''}
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
}
