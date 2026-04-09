'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/components/ui/utils'

const DAYS = [
  { value: 'monday', short: 'Pon', label: 'Poniedziałek' },
  { value: 'tuesday', short: 'Wt', label: 'Wtorek' },
  { value: 'wednesday', short: 'Śr', label: 'Środa' },
  { value: 'thursday', short: 'Czw', label: 'Czwartek' },
  { value: 'friday', short: 'Pt', label: 'Piątek' },
  { value: 'saturday', short: 'Sob', label: 'Sobota' },
  { value: 'sunday', short: 'Nd', label: 'Niedziela' },
] as const

type DayValue = (typeof DAYS)[number]['value']

const TYPE_COLORS: Record<string, string> = {
  'krav-maga': '#c0392b',
  karate: '#1a237e',
  'tai-chi': '#2e7d32',
  individual: '#6a1b9a',
  asg: '#37474f',
  'power-training': '#e65100',
  other: '#455a64',
}

const TYPE_LABELS: Record<string, string> = {
  'krav-maga': 'Krav Maga',
  karate: 'Karate',
  'tai-chi': 'Tai Chi',
  individual: 'Treningi Ind.',
  asg: 'ASG',
  'power-training': 'Power Training',
  other: 'Inne',
}

export type DisplayEntry = {
  cls: { title: string; slug: string | null | undefined; type: string | null | undefined }
  day: DayValue
  startTime: string
  endTime: string
  ageRange: string | null
  notes: string | null
}

type WeekEvent = { title: string; time?: string | null; registrationLink?: string | null; cancelled: boolean }

type Props = {
  entries: DisplayEntry[]
  presentTypes: string[]
  eventsByDay?: Partial<Record<DayValue, WeekEvent[]>>
}

export default function GrafikClient({ entries, presentTypes, eventsByDay = {} }: Props) {
  const [selectedDays, setSelectedDays] = useState<Set<DayValue>>(new Set())
  const [activeType, setActiveType] = useState<string>('all')

  function toggleDay(day: DayValue) {
    setSelectedDays((prev) => {
      const next = new Set(prev)
      if (next.has(day)) next.delete(day)
      else next.add(day)
      return next
    })
  }

  const visibleDays = selectedDays.size === 0 ? DAYS : DAYS.filter((d) => selectedDays.has(d.value))

  const filteredEntries = entries.filter((e) => activeType === 'all' || e.cls.type === activeType)

  const entriesByDay = Object.fromEntries(
    DAYS.map((d) => [
      d.value,
      filteredEntries
        .filter((e) => e.day === d.value)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    ]),
  ) as Record<DayValue, DisplayEntry[]>

  const totalVisible = filteredEntries.length

  return (
    <>
      {/* FILTERS */}
      <div className="grafik-filters">
        <div className="grafik-filters__inner">
          {/* Day filter */}
          <div className="grafik-filter-group">
            <span className="grafik-filter-label">Dzień</span>
            <div className="grafik-pill-group flex flex-wrap gap-2">
              <Button
                variant={selectedDays.size === 0 ? 'default' : 'outline'}
                size="sm"
                className="rounded-full px-5"
                onClick={() => setSelectedDays(new Set())}
              >
                Wszystkie
              </Button>
              {DAYS.map((d) => (
                <Button
                  key={d.value}
                  variant={selectedDays.has(d.value) ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full px-4"
                  onClick={() => toggleDay(d.value)}
                >
                  {d.short}
                </Button>
              ))}
            </div>
          </div>

          {/* Type filter */}
          {presentTypes.length > 1 && (
            <div className="grafik-filter-group">
              <span className="grafik-filter-label">Zajęcia</span>
              <div className="grafik-pill-group flex flex-wrap gap-2">
                <Button
                  variant={activeType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full px-5"
                  onClick={() => setActiveType('all')}
                >
                  Wszystkie
                </Button>
                {presentTypes.map((type) => {
                  const isActive = activeType === type
                  return (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "rounded-full px-4 transition-all duration-200",
                        isActive && "text-white"
                      )}
                      style={
                        isActive
                          ? { background: TYPE_COLORS[type], borderColor: TYPE_COLORS[type] }
                          : { borderColor: TYPE_COLORS[type], color: TYPE_COLORS[type] }
                      }
                      onClick={() => setActiveType(activeType === type ? 'all' : type)}
                    >
                      {TYPE_LABELS[type] ?? type}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {totalVisible === 0 && (
          <p className="grafik-filters__empty">Brak zajęć dla wybranych filtrów.</p>
        )}
      </div>

      {/* GRID */}
      <section className="grafik-section">
        <div className="grafik-container">
          <p className="grafik-scroll-hint">← Przesuń, aby zobaczyć wszystkie dni →</p>
          <div className={`grafik-grid grafik-grid--cols-${visibleDays.length}`}>
            {visibleDays.map((day) => {
              const dayEntries = entriesByDay[day.value] ?? []
              return (
                <div className="grafik-day" key={day.value}>
                  <div className="grafik-day__header">
                    <span className="grafik-day__short">{day.short}</span>
                    <span className="grafik-day__full">{day.label}</span>
                  </div>
                  <div className="grafik-day__cards">
                    {dayEntries.length === 0 && (eventsByDay[day.value] ?? []).length === 0 ? (
                      <p className="grafik-day__empty">–</p>
                    ) : (
                      dayEntries.map((entry, i) => (
                        <a
                          key={i}
                          href={`/zajecia/${entry.cls.slug}`}
                          className="grafik-card"
                          style={
                            {
                              '--card-color': TYPE_COLORS[entry.cls.type ?? ''] ?? '#ccc',
                            } as React.CSSProperties
                          }
                        >
                          <p className="grafik-card__time">
                            {entry.startTime} – {entry.endTime}
                          </p>
                          <h3 className="grafik-card__title">{entry.cls.title}</h3>
                          {entry.ageRange && (
                            <span className="grafik-card__age">
                              <span
                                className="material-symbols-outlined"
                                style={{
                                  fontSize: '13px',
                                  verticalAlign: 'middle',
                                  marginRight: '3px',
                                }}
                              >
                                child_care
                              </span>
                              {entry.ageRange}
                            </span>
                          )}
                          {entry.notes && <p className="grafik-card__notes">{entry.notes}</p>}
                        </a>
                      ))
                    )}
                    {(eventsByDay[day.value] ?? []).map((ev, i) => (
                      <div key={`ev-${i}`} className={`grafik-event-card${ev.cancelled ? ' grafik-event-card--cancelled' : ''}`}>
                        <span className="grafik-event-card__label">Wydarzenie</span>
                        <p className="grafik-event-card__title">{ev.title}</p>
                        {ev.time && <p className="grafik-event-card__time">{ev.time}</p>}
                        {ev.registrationLink && !ev.cancelled && (
                          <Link href={ev.registrationLink} className="grafik-event-card__link">Zapisz się →</Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* LEGEND */}
      {presentTypes.length > 0 && (
        <div className="grafik-legend">
          <div className="grafik-legend__inner">
            <span className="grafik-legend__title">Legenda</span>
            <div className="grafik-legend__items">
              {presentTypes.map((type) => (
                <div key={type} className="grafik-legend__item">
                  <span
                    className="grafik-legend__dot"
                    style={{ background: TYPE_COLORS[type] }}
                  />
                  {TYPE_LABELS[type] ?? type}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
