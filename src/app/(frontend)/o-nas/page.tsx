export const revalidate = 300

import type { Metadata } from 'next'
import { getPayload as getPayloadInstance } from 'payload'
import payloadConfig from '@payload-config'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayloadInstance({ config: payloadConfig })
    const res = await payload.find({ collection: 'pages', where: { slug: { equals: 'o-nas' } }, limit: 1 })
    const page = res.docs[0]
    if (page?.seo?.metaTitle || page?.seo?.metaDescription) {
      return {
        title: page.seo.metaTitle ?? undefined,
        description: page.seo.metaDescription ?? undefined,
      }
    }
  } catch {}
  return {
    title: 'O nas – Pantera Family & Sport Club | Klub sportowy Mokotów',
    description: 'Poznaj historię i filozofię Pantery. Rodzinny klub sportowy na Mokotowie od 2011 roku. Certyfikowani instruktorzy, małe grupy, bezpieczna atmosfera.',
  }
}

import React from 'react'
import NextImage from 'next/image'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Instructor, Media, Navigation, Footer as FooterType, Page } from '@/payload-types'
import { getImageUrl } from '@/lib/media'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import GalleryBlock from '@/components/blocks/GalleryBlock'
import './about.css'

function getPhotoUrl(photo: Instructor['photo']): string | null {
  return getImageUrl(photo, 'thumbnail')
}

const staticInstructors = [
  { id: -1, name: 'Michał Jawarski', specialization: 'KRAV MAGA / SAMOOBRONA', bio: 'Doświadczony instruktor z wieloletnim stażem w sztukach walki i samoobronie.', photo: null },
  { id: -2, name: 'Tomasz Łubikowski', specialization: 'KARATE / POWER TRAINING', bio: 'Mistrz karate i trener personalny z pasją do nauczania.', photo: null },
  { id: -3, name: 'Janusz Dąbrowski', specialization: 'TAI CHI / MASTER', bio: 'Mistrz Tai Chi z wieloletnim doświadczeniem w pracy z każdym wiekiem.', photo: null },
]

export default async function AboutPage() {
  let instructors: Instructor[] | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null
  let pageData: Page | null = null
  let aboutGallery: any = null

  try {
    const payload = await getPayload({ config })
    const [instructorsRes, navRes, footerRes, pageRes, aboutGalleryRes] = await Promise.all([
      payload.find({ collection: 'instructors', limit: 10, sort: 'order' }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'o-nas' } },
        limit: 1,
      }),
      payload.findGlobal({ slug: 'about-gallery' }),
    ])
    instructors = instructorsRes.docs
    nav = navRes
    footer = footerRes
    pageData = pageRes.docs[0] ?? null
    aboutGallery = aboutGalleryRes
  } catch {
    // DB unavailable — fall back to static data
  }

  const teamItems = instructors?.length ? instructors : staticInstructors

  // We now use the global aboutGallery instead of filtering blocks
  // but we still keep the galleryBlocks logic if we want to allow BOTH or just use global

  return (
    <>
      <Navbar data={nav} />

      {/* HEADER */}
      <section className="about-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <NextImage src="/about/cover.jpg" className="about-header__photo" alt="" width={1920} height={1080} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} priority />
        <div className="container">
          <div className="label label--white">O PANTERZE</div>
          <h1>
            Więcej niż klub.<br />
            <span>Rodzina w ruchu.</span>
          </h1>
          <p className="about-header__lead">
            Pantera Family &amp; Sport Club to miejsce, gdzie każdy – dziecko, dorosły, senior – odnajduje swój rytm.
            Od 2011 roku budujemy społeczność opartą na szacunku, dyscyplinie i radości z aktywności.
          </p>
        </div>
      </section>

      {/* KIM JESTEŚMY */}
      <section className="about-who">
        <div className="container">
          <div className="about-who__grid">
            <div className="about-who__text">
              <div className="label">KIM JESTEŚMY</div>
              <h2>Rodzinny klub sportowy na Mokotowie</h2>
              <p>
                Jesteśmy lokalnym klubem sportowym z sercem. Działamy w Warszawie na Mokotowie i od ponad dekady
                tworzymy przestrzeń, w której sztuki walki spotykają się z wartościami – odpowiedzialnością,
                wzajemnym szacunkiem i pasją do rozwoju.
              </p>
              <p>
                Nasze zajęcia prowadzą certyfikowani instruktorzy z wieloletnim doświadczeniem. Pracujemy w małych
                grupach, bo wierzymy, że tylko tak można naprawdę zadbać o każdego uczestnika.
              </p>
              <div className="about-who__stats">
                <div className="about-who__stat">
                  <div className="about-who__stat-number">13+</div>
                  <div className="about-who__stat-label">lat doświadczenia</div>
                </div>
                <div className="about-who__stat">
                  <div className="about-who__stat-number">4</div>
                  <div className="about-who__stat-label">sekcje sportowe</div>
                </div>
                <div className="about-who__stat">
                  <div className="about-who__stat-number">200+</div>
                  <div className="about-who__stat-label">aktywnych uczestników</div>
                </div>
                <div className="about-who__stat">
                  <div className="about-who__stat-number">3</div>
                  <div className="about-who__stat-label">certyfikowanych instruktorów</div>
                </div>
              </div>
            </div>
            <div className="about-who__photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <NextImage src="/about/sala.jpeg" alt="Sala treningowa Pantera" width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FILOZOFIA */}
      <section className="about-philosophy">
        <div className="container">
          <div className="label">NASZE PODEJŚCIE</div>
          <h2>Filozofia Pantery</h2>
          <p className="about-philosophy__subtitle">
            Cztery filary, które wyróżniają nas spośród innych klubów.
          </p>
          <div className="about-philosophy__grid">
            <div className="pillar">
              <span className="pillar__icon"><Icon name="shield" size={36} /></span>
              <h3>Bezpieczeństwo przede wszystkim</h3>
              <p>Każde zajęcia są prowadzone z dbałością o bezpieczeństwo uczestników. Uczymy technik obronnych, nie agresji.</p>
            </div>
            <div className="pillar">
              <span className="pillar__icon"><Icon name="group" size={36} /></span>
              <h3>Małe grupy, duże efekty</h3>
              <p>Pracujemy w grupach do 12 osób, by instruktor mógł poświęcić czas każdemu z uczestników indywidualnie.</p>
            </div>
            <div className="pillar">
              <span className="pillar__icon"><Icon name="handshake" size={36} /></span>
              <h3>Odpowiedzialność i szacunek</h3>
              <p>Sztuki walki uczą pokory. W Panterze kształtujemy charakter równie mocno, co sprawność fizyczną.</p>
            </div>
            <div className="pillar">
              <span className="pillar__icon"><Icon name="sports_martial_arts" size={36} /></span>
              <h3>Praktyka, nie teoria</h3>
              <p>Nasze metody są sprawdzone w realnych sytuacjach. Uczymy tego, co działa – zarówno w sporcie, jak i życiu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MISJA */}
      <section className="about-mission">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/claw.svg" alt="" className="about-mission__claw" />
        <div className="container">
          <div className="about-mission__inner">
            <div className="about-mission__photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <NextImage src="/about/trening.jpg" alt="Trening Pantera" width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div>
              <div className="label label--white">NASZA MISJA</div>
              <h2>Budujemy pewnych siebie, odpowiedzialnych ludzi</h2>
              <p className="about-mission__lead">
                Wierzymy, że sport – a zwłaszcza sztuki walki – to jedno z najskuteczniejszych narzędzi
                wychowawczych i rozwojowych. Misją Pantery jest dostarczenie każdemu uczestnikowi
                narzędzi do budowania lepszej wersji siebie.
              </p>
              <ul className="mission-list">
                <li>Rozwijamy pewność siebie u dzieci i dorosłych poprzez systematyczny trening</li>
                <li>Uczymy jak zachować się w sytuacji zagrożenia – realnie i skutecznie</li>
                <li>Tworzymy środowisko wzajemnego wsparcia i motywacji</li>
                <li>Dbamy o zdrowie fizyczne i psychiczne naszych uczestników</li>
                <li>Integrujemy społeczność lokalną poprzez sport i wspólne wartości</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDACJA */}
      <section className="about-foundation">
        <div className="container">
          <div className="about-foundation__card">
            <div className="about-foundation__badge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/partners/zawsze-w-formie.svg" alt="Fundacja Zawsze w Formie" className="about-foundation__logo" />
            </div>
            <div>
              <div className="label">DZIAŁALNOŚĆ SPOŁECZNA</div>
              <h2>Fundacja „Zawsze w Formie"</h2>
              <p>
                Pantera prowadzi działalność charytatywną poprzez Fundację „Zawsze w Formie". Organizujemy
                bezpłatne zajęcia dla dzieci z rodzin w trudnej sytuacji materialnej, warsztaty samoobrony
                dla kobiet oraz programy aktywizacji seniorów. Sport jest dla wszystkich – bez względu na
                portfel czy wiek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HISTORIA + CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta__inner">
            <div className="about-cta__history">
              <div className="label label--white">HISTORIA</div>
              <h2>Ponad dekada tradycji</h2>
              <p>
                Pantera powstała w 2011 roku z inicjatywy grupy pasjonatów sztuk walki, którzy chcieli stworzyć
                miejsce inne niż wszystkie – przyjazne rodzinom, skoncentrowane na wartościach i dostępne dla
                każdego. Dziś jesteśmy jednym z najbardziej rozpoznawalnych klubów na Mokotowie, a nasi absolwenci
                odnoszą sukcesy zarówno w sporcie, jak i w życiu codziennym.
              </p>
            </div>
            <div className="about-cta__action">
              <div className="label label--white">DOŁĄCZ DO NAS</div>
              <h3>Zacznij swoją przygodę z Panterą</h3>
              <p>Pierwsze zajęcia są bezpłatne. Przekonaj się sam, dlaczego nam ufają setki rodzin z Mokotowa.</p>
              <div className="about-cta__buttons">
                <Link href="/kontakt" className="btn btn--orange">Umów bezpłatne zajęcia</Link>
                <Link href="/grafik" className="btn btn--outline-white">Zobacz grafik</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="kadra" className="about-team">
        <div className="container">
          <div className="label">KADRA</div>
          <h2>Poznaj naszych instruktorów</h2>
          <p className="about-team__subtitle">
            Eksperci w swoich dziedzinach, z pasją do przekazywania wiedzy.
          </p>
          <div className="about-team__grid">
            {teamItems.map((instructor) => {
              const photoUrl = getPhotoUrl(instructor.photo)
              const slug = (instructor as Instructor).slug
              const cardInner = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {photoUrl ? (
                    <img src={photoUrl} alt={instructor.name} className="team-card__photo" />
                  ) : (
                    <div className="team-card__photo" />
                  )}
                  <div className="team-card__body">
                    <h3>{instructor.name}</h3>
                    <span className="team-card__spec">{instructor.specialization}</span>
                    <p className="team-card__bio">{instructor.bio}</p>
                    {slug && <span className="team-card__more">Zobacz profil →</span>}
                  </div>
                </>
              )
              return slug ? (
                <Link key={instructor.id} href={`/kadra/${slug}` as any} className="team-card team-card--link">
                  {cardInner}
                </Link>
              ) : (
                <div key={instructor.id} className="team-card">
                  {cardInner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* GALLERY BLOCK (Global) */}
      {aboutGallery && (
        <GalleryBlock block={{ ...aboutGallery, blockType: 'gallery' }} />
      )}

      <Footer data={footer} />
    </>
  )
}
