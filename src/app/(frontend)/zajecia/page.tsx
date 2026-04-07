export const revalidate = 300

import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Class, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import ZajeciaClient from './ZajeciaClient'
import './zajecia.css'

const staticClasses: Partial<Class>[] = [
  { id: -1, title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga', ageGroup: 'adults', heading: { title: 'Skuteczna samoobrona dla dorosłych' } },
  { id: -2, title: 'Karate', slug: 'karate', type: 'karate', ageGroup: 'adults', heading: { title: 'Dyscyplina, siła i technika' } },
  { id: -3, title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi', ageGroup: 'all', heading: { title: 'Harmonia ciała i umysłu' } },
  { id: -4, title: 'Krav Maga Dzieci', slug: 'krav-maga-dzieci', type: 'krav-maga', ageGroup: 'children', heading: { title: 'Samoobrona i pewność siebie dla dzieci' } },
  { id: -5, title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate', ageGroup: 'children', heading: { title: 'Karate dla dzieci w bezpiecznym środowisku' } },
  { id: -6, title: 'Zajęcia Indywidualne', slug: 'indywidualne', type: 'individual', ageGroup: 'all', heading: { title: 'Trening dopasowany do Ciebie' } },
]

export default async function ZajeciaPage() {
  let classes: Partial<Class>[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  try {
    const payload = await getPayload({ config })
    const [classesRes, navRes, footerRes] = await Promise.all([
      payload.find({ collection: 'classes', limit: 20, sort: 'title', depth: 1 }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    classes = classesRes.docs
    nav = navRes
    footer = footerRes
  } catch {
    // DB unavailable — fall back to static data
  }

  const items = classes?.length ? classes : staticClasses

  return (
    <>
      <Navbar data={nav} />

      <section className="zajecia-header">
        <div className="container">
          <div className="label label--white">OFERTA</div>
          <h1>
            Nasze <span>Zajęcia</span>
          </h1>
          <p className="zajecia-header__lead">
            Krav Maga, Karate, Tai Chi i więcej. Znajdź zajęcia dopasowane do swojego wieku,
            celu i poziomu zaawansowania.
          </p>
        </div>
      </section>

      <section className="zajecia-list">
        <div className="container">
          <div className="label">WSZYSTKIE ZAJĘCIA</div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1C1C1C', marginBottom: '8px' }}>
            Wybierz swoją drogę
          </h2>
          <p style={{ color: '#666', marginBottom: '0' }}>
            {items.length} {items.length === 1 ? 'propozycja' : items.length < 5 ? 'propozycje' : 'propozycji'} dla Ciebie i Twojej rodziny
          </p>

          <Suspense fallback={<div className="zajecia-grid" />}>
            <ZajeciaClient items={items} />
          </Suspense>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}
