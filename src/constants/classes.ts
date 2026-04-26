import type { OfferIconKey } from '@/components/icons/offerIcons'

export const INTENSITY_LABELS: Record<string, string> = {
  low: 'Mała',
  medium: 'Średnia',
  'medium-high': 'Średnia / Duża',
  high: 'Duża',
}

export const HIGHLIGHT_ICONS: OfferIconKey[] = [
  'shield',
  'check',
  'dumbbell',
  'target',
  'lightning',
  'handshake',
]

export const TYPE_ICONS: Record<string, OfferIconKey> = {
  'krav-maga': 'shield',
  karate: 'martial',
  'tai-chi': 'lotus',
  individual: 'users',
  asg: 'target',
  'power-training': 'dumbbell',
  other: 'star',
}
