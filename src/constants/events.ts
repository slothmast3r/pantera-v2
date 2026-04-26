export const STATUS_LABELS: Record<string, string> = {
  upcoming: 'Nadchodzące',
  ongoing: 'W trakcie',
  past: 'Zakończone',
  cancelled: 'Anulowane',
}

export const STATUS_COLORS: Record<string, string> = {
  upcoming: '#16a34a',
  ongoing: '#F57C28',
  past: '#888',
  cancelled: '#e63946',
}

export const DAYS = [
  { value: 'monday', short: 'Pon', label: 'Poniedziałek' },
  { value: 'tuesday', short: 'Wt', label: 'Wtorek' },
  { value: 'wednesday', short: 'Śr', label: 'Środa' },
  { value: 'thursday', short: 'Czw', label: 'Czwartek' },
  { value: 'friday', short: 'Pt', label: 'Piątek' },
  { value: 'saturday', short: 'Sob', label: 'Sobota' },
  { value: 'sunday', short: 'Nd', label: 'Niedziela' },
] as const

export type DayValue = (typeof DAYS)[number]['value']

export const DAY_VALUES: DayValue[] = DAYS.map((d) => d.value)

export const TYPE_COLORS: Record<string, string> = {
  'krav-maga': '#c0392b',
  karate: '#1a237e',
  'tai-chi': '#2e7d32',
  individual: '#6a1b9a',
  asg: '#37474f',
  'power-training': '#e65100',
  other: '#455a64',
}

export const TYPE_LABELS: Record<string, string> = {
  'krav-maga': 'Krav Maga',
  karate: 'Karate',
  'tai-chi': 'Tai Chi',
  individual: 'Treningi Ind.',
  asg: 'ASG',
  'power-training': 'Power Training',
  other: 'Inne',
}
