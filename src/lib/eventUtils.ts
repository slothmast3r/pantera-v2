import type { Event } from '@/payload-types'

export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled'

export function computeStatus(event: Event): EventStatus {
  if ((event as any).cancelled) return 'cancelled'
  const now = Date.now()
  const start = new Date(event.startDate).getTime()
  const end = event.endDate ? new Date(event.endDate).getTime() : null
  if (now < start) return 'upcoming'
  if (end !== null && now <= end) return 'ongoing'
  return 'past'
}

export function formatDateRange(startStr: string, endStr?: string | null): string {
  const start = new Date(startStr)
  const end = endStr ? new Date(endStr) : null
  const sameDay = end && start.toDateString() === end.toDateString()
  if (!end || sameDay) {
    return start.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  const startFmt = start.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })
  const endFmt = end.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
  return `${startFmt} – ${endFmt}`
}
