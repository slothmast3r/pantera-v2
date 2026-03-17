'use client'

import React, { useState } from 'react'

const DAYS = [
  { value: 'monday', short: 'Pon', label: 'Poniedziałek' },
  { value: 'tuesday', short: 'Wt', label: 'Wtorek' },
  { value: 'wednesday', short: 'Śr', label: 'Środa' },
  { value: 'thursday', short: 'Czw', label: 'Czwartek' },
  { value: 'friday', short: 'Pt', label: 'Piątek' },
  { value: 'saturday', short: 'Sob', label: 'Sobota' },
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

type Props = {
  entries: DisplayEntry[]
  presentTypes: string[]
}

export default function GrafikClient({ entries, presentTypes }: Props) {
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

  const filteredEntries = entries.filter((e) => {
    if (activeType !== 'all' && e.cls.type !== activeType) return false
    return true
  })

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
      {/* ── Filters ── */}
      <div className="grafik-filters">
        <div className="grafik-container">
          <div className="grafik-filters__row">
            {/* Day filter */}
            <div className="grafik-filters__group">
              <span className="grafik-filters__label">Dzień</span>
              <div className="grafik-filters__pills">
                <button
                  className={`grafik-pill${selectedDays.size === 0 ? ' grafik-pill--active' : ''}`}
                  onClick={() => setSelectedDays(new Set())}
                >
                  Wszystkie
                </button>
                {DAYS.map((d) => (
                  <button
                    key={d.value}
                    className={`grafik-pill${selectedDays.has(d.value) ? ' grafik-pill--active' : ''}`}
                    onClick={() => toggleDay(d.value)}
                  >
                    {d.short}
                  </button>
                ))}
              </div>
            </div>

            {/* Type filter */}
            {presentTypes.length > 1 && (
              <div className="grafik-filters__group">
                <span className="grafik-filters__label">Zajęcia</span>
                <div className="grafik-filters__pills">
                  <button
                    className={`grafik-pill${activeType === 'all' ? ' grafik-pill--active' : ''}`}
                    onClick={() => setActiveType('all')}
                  >
                    Wszystkie
                  </button>
                  {presentTypes.map((type) => (
                    <button
                      key={type}
                      className={`grafik-pill grafik-pill--type${activeType === type ? ' grafik-pill--active' : ''}`}
                      style={
                        activeType === type
                          ? { background: TYPE_COLORS[type], borderColor: TYPE_COLORS[type] }
                          : { borderColor: TYPE_COLORS[type], color: TYPE_COLORS[type] }
                      }
                      onClick={() => setActiveType(activeType === type ? 'all' : type)}
                    >
                      {TYPE_LABELS[type] ?? type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {totalVisible === 0 && (
            <p className="grafik-filters__empty">Brak zajęć dla wybranych filtrów.</p>
          )}
        </div>
      </div>

      {/* ── Grid ── */}
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
                    {dayEntries.length === 0 ? (
                      <p className="grafik-day__empty">–</p>
                    ) : (
                      dayEntries.map((entry, i) => (
                        <a
                          key={i}
                          href={`/zajecia/${entry.cls.slug}`}
                          className="grafik-card"
                          style={{ '--card-color': TYPE_COLORS[entry.cls.type ?? ''] ?? '#ccc' } as React.CSSProperties}
                        >
                          <p className="grafik-card__time">
                            {entry.startTime} – {entry.endTime}
                          </p>
                          <h3 className="grafik-card__title">{entry.cls.title}</h3>
                          {entry.ageRange && (
                            <span className="grafik-card__age">🧒 {entry.ageRange}</span>
                          )}
                          {entry.notes && <p className="grafik-card__notes">{entry.notes}</p>}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Legend ── */}
      {presentTypes.length > 0 && (
        <section className="grafik-legend">
          <div className="grafik-legend__inner">
            <span className="grafik-legend__label">Legenda</span>
            <div className="grafik-legend__list">
              {presentTypes.map((type) => (
                <div key={type} className="grafik-legend__item">
                  <span className="grafik-legend__dot" style={{ background: TYPE_COLORS[type] }} />
                  {TYPE_LABELS[type] ?? type}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
