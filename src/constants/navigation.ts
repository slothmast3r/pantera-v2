export interface NavSubLink {
  label: string
  href: string
}

export interface NavLink {
  label: string
  href: string
  subLinks: NavSubLink[] | null
}

export const STATIC_NAV_LINKS: NavLink[] = [
  {
    label: 'O nas',
    href: '/o-nas',
    subLinks: [
      { label: 'O nas', href: '/o-nas' },
      { label: 'Instruktorzy', href: '/o-nas#instruktorzy' },
      { label: 'Regulamin', href: '/regulamin' },
    ],
  },
  {
    label: 'Zajęcia',
    href: '/zajecia',
    subLinks: [
      { label: 'Krav Maga', href: '/zajecia/krav-maga' },
      { label: 'Karate', href: '/zajecia/karate' },
      { label: 'Power Training', href: '/zajecia/power-training' },
      { label: 'Tai Chi', href: '/zajecia/tai-chi' },
      { label: 'Indywidualne', href: '/zajecia/indywidualne' },
      { label: 'Strzelectwo ASG', href: '/zajecia/asg' },
      { label: 'Krav Maga Kids', href: '/zajecia/krav-maga-dzieci' },
      { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
    ],
  },
  {
    label: 'Oferta',
    href: '/oferta',
    subLinks: [
      { label: 'Dla Firm', href: '/oferta/dla-firm' },
      { label: 'Dla Szkół', href: '/oferta/dla-szkol' },
      { label: 'Warsztaty Rodzinne', href: '/oferta/warsztaty-rodzinne' },
      { label: 'Urodziny na Sportowo', href: '/oferta/urodziny' },
    ],
  },
  { label: 'Grafik', href: '/grafik', subLinks: null },
  { label: 'Płatność', href: '/platnosc', subLinks: null },
  { label: 'Kontakt', href: '/kontakt', subLinks: null },
]
