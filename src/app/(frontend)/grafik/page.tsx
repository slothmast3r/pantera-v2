import Link from 'next/link'
import './grafik.css'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class } from '@/payload-types'
import GrafikClient, { type DisplayEntry } from './GrafikClient'

type DayValue = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

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
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'monday', startTime: '17:00', endTime: '18:00', ageRange: '7–10 lat', notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'monday', startTime: '18:00', endTime: '19:30', ageRange: null, notes: null },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'tuesday', startTime: '16:30', endTime: '17:30', ageRange: '7–12 lat', notes: null },
  { cls: { title: 'Power Training', slug: 'power-training', type: 'power-training' }, day: 'tuesday', startTime: '18:00', endTime: '19:30', ageRange: null, notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'wednesday', startTime: '16:00', endTime: '17:00', ageRange: '4–6 lat', notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'wednesday', startTime: '17:00', endTime: '18:00', ageRange: '11–14 lat', notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'wednesday', startTime: '18:00', endTime: '19:30', ageRange: null, notes: null },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'thursday', startTime: '17:00', endTime: '18:00', ageRange: '7–12 lat', notes: null },
  { cls: { title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi' }, day: 'thursday', startTime: '18:30', endTime: '20:00', ageRange: null, notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'friday', startTime: '17:00', endTime: '18:30', ageRange: null, notes: null },
  { cls: { title: 'Strzelectwo ASG', slug: 'asg', type: 'asg' }, day: 'friday', startTime: '18:30', endTime: '19:30', ageRange: null, notes: 'po wcześniejszej rezerwacji' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'saturday', startTime: '10:00', endTime: '11:30', ageRange: '7–12 lat', notes: null },
  { cls: { title: 'Karate', slug: 'karate', type: 'karate' }, day: 'saturday', startTime: '11:30', endTime: '13:00', ageRange: null, notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'saturday', startTime: '13:00', endTime: '14:30', ageRange: null, notes: null },
  { cls: { title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi' }, day: 'saturday', startTime: '14:30', endTime: '15:30', ageRange: null, notes: null },
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
        {/* ── Hero ── */}
        <section className="grafik-hero">
          <p className="grafik-hero__eyebrow">Plan tygodnia</p>
          <h1 className="grafik-hero__title">{title}</h1>
          <p className="grafik-hero__subtitle">{subtitle}</p>
        </section>

        <GrafikClient entries={displayEntries} presentTypes={presentTypes} />

        {/* ── CTA ── */}
        <section className="grafik-cta">
          <h2 className="grafik-cta__title">Pierwsze zajęcia bezpłatnie</h2>
          <p className="grafik-cta__subtitle">
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
