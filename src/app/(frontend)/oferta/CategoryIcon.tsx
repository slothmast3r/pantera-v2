import React from 'react'
import { offerIconMap, type OfferIconKey } from '@/components/icons/offerIcons'

export default function CategoryIcon({
  icon,
  category,
  size = 40,
}: {
  icon?: string | null
  category?: string | null
  size?: number
}) {
  const key = (icon || category || 'other') as OfferIconKey
  const entry = offerIconMap[key] ?? offerIconMap.other
  return (
    <span style={{ display: 'inline-flex', width: size, height: size }}>
      {entry.svg}
    </span>
  )
}
