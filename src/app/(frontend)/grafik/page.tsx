export const revalidate = 300

export const metadata = {
  title: 'Grafik zajęć – Pantera Family & Sport Club Warszawa',
  description: 'Sprawdź aktualny grafik zajęć Krav Maga, Karate, Tai Chi i Power Training w Panterze na Mokotowie. Znajdź termin dla siebie!',
}

import Link from 'next/link'
import './grafik.css'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class } from '@/payload-types'
import GrafikClient, { type DisplayEntry } from './GrafikClient'

type DayValue = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

const TYPE_COLORS: Record<string, string> = {
  'krav-maga': '#c0392b',
  karate: '#1a237e',
  'tai-chi': '#2e7d32',
  individual: '#6a1b9a',
  asg: '#37474f',
  'power-training': '#e65100',
  other: '#455a64',
}

const STATIC_FALLBACK: DisplayEntry[] = [
  // Poniedziałek
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '7–9 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '10–13 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'monday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '14–16 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'monday',
    startTime: '18:45',
    endTime: '19:45',
    ageRange: null,
    notes: 'grupa początkująca',
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'monday',
    startTime: '19:45',
    endTime: '20:45',
    ageRange: null,
    notes: 'grupa zaawansowana',
  },
  // Wtorek
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '6–7 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '6–7 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '8–14 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'tuesday',
    startTime: '18:45',
    endTime: '19:30',
    ageRange: '8–14 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'tuesday',
    startTime: '19:30',
    endTime: '20:30',
    ageRange: null,
    notes: null,
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'tuesday',
    startTime: '20:30',
    endTime: '21:30',
    ageRange: null,
    notes: null,
  },
  // Środa (jak Poniedziałek)
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '7–9 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '10–13 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '14–16 lat',
    notes: null,
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '18:45',
    endTime: '19:45',
    ageRange: null,
    notes: 'grupa początkująca',
  },
  {
    cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' },
    day: 'wednesday',
    startTime: '19:45',
    endTime: '20:45',
    ageRange: null,
    notes: 'grupa zaawansowana',
  },
  // Czwartek (jak Wtorek)
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '16:30',
    endTime: '17:15',
    ageRange: '6–7 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '17:15',
    endTime: '18:00',
    ageRange: '6–7 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '18:00',
    endTime: '18:45',
    ageRange: '8–14 lat',
    notes: 'początkujący',
  },
  {
    cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' },
    day: 'thursday',
    startTime: '18:45',
    endTime: '19:30',
    ageRange: '8–14 lat',
    notes: 'zaawansowani',
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'thursday',
    startTime: '19:30',
    endTime: '20:30',
    ageRange: null,
    notes: null,
  },
  {
    cls: { title: 'Karate', slug: 'karate', type: 'karate' },
    day: 'thursday',
    startTime: '20:30',
    endTime: '21:30',
    ageRange: null,
    notes: null,
  },
  // Piątek
  {
    cls: { title: 'Dynamiczne Strzelectwo ASG', slug: 'asg', type: 'asg' },
    day: 'friday',
    startTime: '18:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Dla uczestników którzy zaliczyli lekcje INTRO',
  },
  {
    cls: { title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi' },
    day: 'friday',
    startTime: '20:00',
    endTime: '21:00',
    ageRange: null,
    notes: 'dorośli',
  },
  // Sobota
  {
    cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' },
    day: 'saturday',
    startTime: '14:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Informacje: tel. 508 689 718',
  },
  // Niedziela
  {
    cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' },
    day: 'sunday',
    startTime: '14:00',
    endTime: '20:00',
    ageRange: null,
    notes: 'Informacje: tel. 508 689 718',
  },
]

function isClass(val: number | Class): val is Class {
  return typeof val === 'object' && 'slug' in val
}

export default async function GrafikPage() {
  let title = 'Grafik Zajęć'
  let subtitle = 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.'
  let displayEntries: DisplayEntry[] = STATIC_FALLBACK
  let navData = null
  let footerData = null

  try {
    const payload = await getPayload({ config })
    const [schedule, nav, footer] = await Promise.all([
      payload.findGlobal({ slug: 'schedule', depth: 2 }),
      payload.findGlobal({ slug: 'navigation', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
    ])
    navData = nav
    footerData = footer
    if (schedule.title) title = schedule.title
    if (schedule.subtitle) subtitle = schedule.subtitle
    const populated = (schedule.entries ?? []).filter((e) => isClass(e.class))
    if (populated.length > 0) {
      displayEntries = populated.map((e) => ({
        cls: e.class as Class,
        day: e.day as DayValue,
        startTime: e.startTime,
        endTime: e.endTime,
        ageRange: e.ageRange ?? null,
        notes: e.notes ?? null,
      }))
    }
  } catch {
    // use static fallback
  }

  const presentTypes = [...new Set(displayEntries.map((e) => e.cls.type))].filter(
    (t) => t != null && t in TYPE_COLORS,
  ) as string[]

  return (
    <>
      <Navbar data={navData} />
      <main>
        {/* HERO */}
        <section className="grafik-hero">
          <p className="grafik-hero__eyebrow">Plan tygodnia</p>
          <h1 className="grafik-hero__title">{title}</h1>
          <p className="grafik-hero__subtitle">{subtitle}</p>
        </section>

        <GrafikClient entries={displayEntries} presentTypes={presentTypes} />

        {/* CTA */}
        <section className="grafik-cta">
          <h2 className="grafik-cta__title">Pierwsze zajęcia bezpłatnie</h2>
          <p className="grafik-cta__text">
            Wybierz termin, który Ci odpowiada i umów się na próbny trening.
          </p>
          <Link href="/kontakt" className="grafik-cta__btn">
            Zapisz się teraz
          </Link>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
