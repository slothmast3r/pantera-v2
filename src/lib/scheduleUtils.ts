import type { Event } from '@/payload-types'
import { DAY_VALUES } from '@/constants/events'
import type { DayValue } from '@/constants/events'

export type DisplayEntry = {
  cls: { title: string; slug: string | null | undefined; type: string | null | undefined }
  day: DayValue
  startTime: string
  endTime: string
  ageRange: string | null
  notes: string | null
}

export type WeekEvent = {
  title: string
  time?: string | null
  registrationLink?: string | null
  cancelled: boolean
}

export function getWeekBounds() {
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setHours(0, 0, 0, 0)
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7))
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)
  return { weekStart, weekEnd }
}

export function isThisWeek(startStr: string, endStr?: string | null): boolean {
  const { weekStart, weekEnd } = getWeekBounds()
  const start = new Date(startStr)
  const end = endStr ? new Date(endStr) : start
  return start <= weekEnd && end >= weekStart
}

export function buildEventsByDay(events: Event[]): Record<DayValue, WeekEvent[]> {
  const result = DAY_VALUES.reduce((acc, d) => {
    acc[d] = []
    return acc
  }, {} as Record<DayValue, WeekEvent[]>)
  const { weekStart, weekEnd } = getWeekBounds()
  for (const event of events) {
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate)
    if (start > weekEnd || end < weekStart) continue
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
