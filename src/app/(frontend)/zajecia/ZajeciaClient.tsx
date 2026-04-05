'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Class, Media } from '@/payload-types'
import { Button } from '@/components/ui/Button'

const typeLabels: Record<string, string> = {
  'krav-maga': 'Krav Maga',
  karate: 'Karate',
  'tai-chi': 'Tai Chi',
  individual: 'Indywidualne',
  asg: 'ASG',
  'power-training': 'Power Training',
  other: 'Inne',
}

const ageLabels: Record<string, string> = {
  adults: 'Dorośli',
  children: 'Dzieci',
  all: 'Wszyscy',
}

const typeIcons: Record<string, string> = {
  'krav-maga': '🥊',
  karate: '🥋',
  'tai-chi': '☯️',
  individual: '👤',
  asg: '🎯',
  'power-training': '💪',
  other: '⭐',
}

type Filter = 'all' | 'adults' | 'children'

function getCoverUrl(coverImage: Class['coverImage']): string | null {
  if (!coverImage || typeof coverImage === 'number') return null
  return (coverImage as Media).url ?? null
}

export default function ZajeciaClient({ items }: { items: Partial<Class>[] }) {
  const searchParams = useSearchParams()
  const initialFilter = (searchParams.get('filter') as Filter | null) ?? 'all'
  const [filter, setFilter] = useState<Filter>(initialFilter)

  useEffect(() => {
    const f = searchParams.get('filter') as Filter | null
    if (f && ['all', 'adults', 'children'].includes(f)) setFilter(f)
  }, [searchParams])

  const filtered = items.filter((cls) => {
    if (filter === 'all') return true
    if (filter === 'adults') return cls.ageGroup === 'adults' || cls.ageGroup === 'all'
    if (filter === 'children') return cls.ageGroup === 'children' || cls.ageGroup === 'all'
    return true
  })

  return (
    <>
      <div className="zajecia-filters flex flex-wrap gap-2.5 mb-10">
        {(['all', 'adults', 'children'] as Filter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className="rounded-full px-6"
          >
            {f === 'all' ? 'Wszyscy' : f === 'adults' ? 'Dorośli' : 'Dzieci'}
          </Button>
        ))}
      </div>

      <div className="zajecia-grid">
        {filtered.map((cls) => {
          const coverUrl = getCoverUrl(cls.coverImage)
          const icon = typeIcons[cls.type ?? ''] ?? '⭐'
          return (
            <a key={cls.id} href={`/zajecia/${cls.slug}`} className="zajecia-card" style={{ textDecoration: 'none' }}>
              {coverUrl ? (
                <img src={coverUrl} alt={cls.title} className="zajecia-card__image" />
              ) : (
                <div className="zajecia-card__image--placeholder">{icon}</div>
              )}
              <div className="zajecia-card__body">
                <div className="zajecia-card__badges">
                  {cls.type && (
                    <span className="zajecia-card__badge zajecia-card__badge--type">
                      {typeLabels[cls.type] ?? cls.type}
                    </span>
                  )}
                  {cls.ageGroup && (
                    <span className={`zajecia-card__badge ${cls.ageGroup === 'children' ? 'zajecia-card__badge--age-children' : 'zajecia-card__badge--age-adults'}`}>
                      {cls.ageGroup === 'children' ? '🧒 ' : '👤 '}{ageLabels[cls.ageGroup] ?? cls.ageGroup}
                    </span>
                  )}
                </div>
                <h3>{cls.title}</h3>
                {cls.heading?.subtitle && (
                  <p className="zajecia-card__subtitle">{cls.heading.subtitle}</p>
                )}
                {!cls.heading?.subtitle && cls.heading?.title && (
                  <p className="zajecia-card__subtitle">{cls.heading.title}</p>
                )}
                <span className="zajecia-card__link">Sprawdź ofertę →</span>
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
