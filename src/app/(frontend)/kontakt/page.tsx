export const revalidate = 300

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt – Pantera Family & Sport Club Warszawa',
  description: 'Skontaktuj się z Panterą. Adres: ul. Powsińska 25, Mokotów, Warszawa. Tel: 508 689 718. Pierwsze zajęcia bezpłatne – umów się już dziś!',
  alternates: { canonical: '/kontakt' },
  openGraph: {
    title: 'Kontakt – Pantera Family & Sport Club',
    description: 'Skontaktuj się z Panterą. Adres: ul. Powsińska 25, Mokotów, Warszawa. Pierwsze zajęcia bezpłatne!',
  },
}

import React from 'react'
import Icon from '@/components/ui/Icon'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Navigation, Footer as FooterType, ContactInfo } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import KontaktForm from './KontaktForm'
import FaqItem from './FaqItem'
import JsonLd from '@/components/seo/JsonLd'
import './kontakt.css'

const staticFaq = [
  {
    id: 1,
    question: 'Jak zapisać się na zajęcia?',
    answer:
      'Wyślij wiadomość przez formularz kontaktowy, zadzwoń lub napisz na e-mail. Odpiszemy w ciągu 24 godzin i umówimy termin pierwszych bezpłatnych zajęć próbnych.',
  },
  {
    id: 2,
    question: 'Czy pierwsze zajęcia są bezpłatne?',
    answer:
      'Tak! Pierwsze zajęcia próbne są całkowicie bezpłatne i do niczego nie zobowiązują. To najlepszy sposób, żeby sprawdzić, czy dana dyscyplina jest dla Ciebie.',
  },
  {
    id: 3,
    question: 'Od jakiego wieku można uczęszczać na zajęcia?',
    answer:
      'Prowadzimy zajęcia dla dzieci już od 4. roku życia (Karate Kids). Dla starszych dzieci (7–14 lat) polecamy Krav Maga Kids lub Karate Dzieci. Dorośli mogą wybrać spośród wszystkich oferowanych przez nas dyscyplin.',
  },
  {
    id: 4,
    question: 'Czy potrzebuję specjalnego stroju lub sprzętu?',
    answer:
      'Na pierwszych zajęciach wystarczy wygodny strój sportowy i zmienne obuwie. Wszelki sprzęt (ochraniacze, rękawice) możesz przetestować u nas przed zakupem.',
  },
  {
    id: 5,
    question: 'Jak wygląda system płatności?',
    answer:
      'Oferujemy karnety miesięczne na wybrane zajęcia. Płatności można dokonać gotówką na miejscu lub przelewem online przez naszą stronę v zakładce Płatność.',
  },
  {
    id: 6,
    question: 'Czy organizujecie zajęcia dla firm i grup?',
    answer:
      'Tak, prowadzimy warsztaty i treningi firmowe — samoobrona, Krav Maga, integracja przez sport. Napisz do nas, a przygotujemy indywidualną ofertę.',
  },
]

const staticContactInfo = {
  address: 'ul. Powsińska 25',
  addressSub: 'Warszawa, Mokotów (Sadyba)',
  addressLink: 'https://maps.google.com/?q=Powsinska+25+Warszawa',
  phone: '508 689 718',
  email: 'kontakt@pantera.waw.pl',
  hours: 'Pon–Pt: 15:00–21:00\nSob: 9:00–14:00',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Powsi%C5%84ska+25+Warszawa&output=embed&hl=pl&z=16',
}

export default async function KontaktPage() {
  let nav: Navigation | null = null
  let footer: FooterType | null = null
  let faqItems = staticFaq
  let contactInfo: ContactInfo | typeof staticContactInfo = staticContactInfo

  try {
    const payload = await getPayload({ config })
    const [navRes, footerRes, faqRes, contactRes] = await Promise.all([
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
      payload.find({ collection: 'faq', limit: 20, sort: 'order' }),
      payload.findGlobal({ slug: 'contact-info' }),
    ])
    nav = navRes
    footer = footerRes
    if (faqRes.docs.length > 0) faqItems = faqRes.docs as any[]
    if (contactRes) contactInfo = contactRes
  } catch {
    // DB unavailable — fall back to static data
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pantera.waw.pl'

  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Pantera Family & Sport Club',
          url: siteUrl,
          telephone: `+48${(contactInfo.phone ?? '508689718').replace(/\s/g, '')}`,
          email: contactInfo.email ?? 'kontakt@pantera.waw.pl',
          address: {
            '@type': 'PostalAddress',
            streetAddress: contactInfo.address ?? 'ul. Powsińska 25',
            addressLocality: 'Warszawa',
            addressRegion: 'Mazowieckie',
            postalCode: '02-903',
            addressCountry: 'PL',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
      ]} />
      <Navbar data={nav} />

      {/* HERO */}
      <section className="kontakt-hero">
        <div className="kontakt-hero__blob" />
        <div className="kontakt-hero__inner">
          <p className="kontakt-hero__eyebrow">KONTAKT</p>
          <h1 className="kontakt-hero__title">
            Masz pytania?
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Chętnie odpowiemy.</span>
          </h1>
          <p className="kontakt-hero__subtitle">
            Napisz, zadzwoń lub wpadnij do nas. Pierwsze zajęcia są bezpłatne.
          </p>
        </div>
      </section>

      {/* MAIN GRID: form + info */}
      <section className="kontakt-main">
        <div className="kontakt-grid">
          {/* FORM */}
          <div className="kontakt-form-card">
            <h2 className="kontakt-form-card__title">Wyślij wiadomość</h2>
            <KontaktForm />
          </div>

          {/* INFO */}
          <aside className="kontakt-info">
            {contactInfo.address && (
              <InfoCard icon="location_on" label="Adres">
                {contactInfo.addressLink ? (
                  <a
                    href={contactInfo.addressLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                    style={{ color: 'var(--color-navy)' }}
                  >
                    {contactInfo.address}
                  </a>
                ) : (
                  <span>{contactInfo.address}</span>
                )}
              </InfoCard>
            )}
            {contactInfo.phone && (
              <InfoCard icon="phone" label="Telefon">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="font-semibold hover:underline"
                  style={{ color: 'var(--color-navy)' }}
                >
                  {contactInfo.phone}
                </a>
              </InfoCard>
            )}
            {contactInfo.email && (
              <InfoCard icon="mail" label="E-mail">
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-semibold hover:underline"
                  style={{ color: 'var(--color-navy)' }}
                >
                  {contactInfo.email}
                </a>
              </InfoCard>
            )}
            {contactInfo.hours && (
              <InfoCard icon="schedule" label="Godziny otwarcia">
                <span style={{ whiteSpace: 'pre-line' }}>{contactInfo.hours}</span>
              </InfoCard>
            )}
            {contactInfo.mapEmbedUrl && (
              <div className="kontakt-map sm:col-span-2 lg:col-span-1">
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja Pantera"
                  className="w-full h-50 border-0 block"
                />
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="kontakt-faq">
        <div className="kontakt-faq__inner">
          <div className="kontakt-faq__header">
            <p className="kontakt-faq__eyebrow">FAQ</p>
            <h2 className="kontakt-faq__title">Najczęstsze pytania</h2>
            <p className="kontakt-faq__subtitle">
              Nie znalazłeś odpowiedzi? Napisz do nas — odpiszemy w ciągu 24h.
            </p>
          </div>
          <div className="kontakt-faq__list">
            {faqItems.map((item) => (
              <FaqItem key={item.id} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="kontakt-info-card">
      <div className="kontakt-info-card__icon">
        <Icon name={icon} />
      </div>
      <div>
        <p className="kontakt-info-card__label">{label}</p>
        <div className="kontakt-info-card__value">{children}</div>
      </div>
    </div>
  )
}
