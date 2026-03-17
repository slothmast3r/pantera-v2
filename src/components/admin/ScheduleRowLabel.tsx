'use client'
import React, { useEffect, useState } from 'react'
import { useRowLabel } from '@payloadcms/ui'

const DAY_LABELS: Record<string, string> = {
  monday: 'Poniedziałek',
  tuesday: 'Wtorek',
  wednesday: 'Środa',
  thursday: 'Czwartek',
  friday: 'Piątek',
  saturday: 'Sobota',
  sunday: 'Niedziela',
}

type RowData = {
  day?: string
  startTime?: string
  endTime?: string
  class?: number | string | { title?: string }
}

export default function ScheduleRowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>()
  const [classTitle, setClassTitle] = useState<string | null>(null)

  const classId = data?.class && typeof data.class !== 'object' ? data.class : null

  useEffect(() => {
    if (!classId) return
    fetch(`/api/classes/${classId}?depth=0`)
      .then((r) => r.json())
      .then((doc) => setClassTitle(doc?.title ?? null))
      .catch(() => {})
  }, [classId])

  const resolvedTitle =
    classTitle ??
    (data?.class && typeof data.class === 'object' ? (data.class.title ?? null) : null)

  const dayLabel = data?.day ? (DAY_LABELS[data.day] ?? data.day) : null
  const time =
    data?.startTime && data?.endTime
      ? `${data.startTime}–${data.endTime}`
      : (data?.startTime ?? '')

  if (!resolvedTitle && !dayLabel && !time) return <span>Wpis {(rowNumber ?? 0) + 1}</span>
  return <span>{[dayLabel, time, resolvedTitle].filter(Boolean).join(' · ')}</span>
}
