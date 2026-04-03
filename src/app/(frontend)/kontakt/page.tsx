import React from 'react'
import Icon from '@/components/ui/Icon'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Navigation, Footer as FooterType, ContactInfo } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import KontaktForm from './KontaktForm'
import './kontakt.css'

const staticFaq = [
  {
    id: 1,
    question: 'Jak zapisać się na zajęcia?',
    answer: 'Wyślij wiadomość przez formularz kontaktowy, zadzwoń lub napisz na e-mail. Odpiszemy w ciągu 24 godzin i umówimy termin pierwszych bezpłatnych zajęć próbnych.',
  },
  {
    id: 2,
    question: 'Czy pierwsze zajęcia są bezpłatne?',
    answer: 'Tak! Pierwsze zajęcia próbne są całkowicie bezpłatne i do niczego nie zobowiązują. To najlepszy sposób, żeby sprawdzić, czy dana dyscyplina jest dla Ciebie.',
  },
  {
    id: 3,
    question: 'Od jakiego wieku można uczęszczać na zajęcia?',
    answer: 'Prowadzimy zajęcia dla dzieci już od 4. roku życia (Karate Kids). Dla starszych dzieci (7–14 lat) polecamy Krav Maga Kids lub Karate Dzieci. Dorośli mogą wybrać spośród wszystkich oferowanych przez nas dyscyplin.',
  },
  {
    id: 4,
    question: 'Czy potrzebuję specjalnego stroju lub sprzętu?',
    answer: 'Na pierwszych zajęciach wystarczy wygodny strój sportowy i zmienne obuwie. Wszelki sprzęt (ochraniacze, rękawice) możesz przetestować u nas przed zakupem.',
  },
  {
    id: 5,
    question: 'Jak wygląda system płatności?',
    answer: 'Oferujemy karnety miesięczne na wybrane zajęcia. Płatności można dokonać gotówką na miejscu lub przelewem online przez naszą stronę w zakładce Płatność.',
  },
  {
    id: 6,
    question: 'Czy organizujecie zajęcia dla firm i grup?',
    answer: 'Tak, prowadzimy warsztaty i treningi firmowe — samoobrona, Krav Maga, integracja przez sport. Napisz do nas, a przygotujemy indywidualną ofertę.',
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
    if (faqRes.docs.length > 0) faqItems = faqRes.docs as typeof staticFaq
    if (contactRes) contactInfo = contactRes
  } catch {
    // DB unavailable — fall back to static data
  }

  return (
    <>
      <Navbar data={nav} />

      {/* HERO */}
      <section className="kontakt-hero">
        <div className="kontakt-hero__inner">
          <div className="kontakt-hero__label">KONTAKT</div>
          <h1>Masz pytania?<br /><span>Chętnie odpowiemy.</span></h1>
          <p>Napisz, zadzwoń lub wpadnij do nas. Pierwsze zajęcia są bezpłatne.</p>
        </div>
      </section>

      {/* MAIN GRID: form + info */}
      <section className="kontakt-section">
        <div className="kontakt-container">

          {/* FORM */}
          <div className="kontakt-form-wrap">
            <h2 className="kontakt-section-title">Wyślij wiadomość</h2>
            <KontaktForm />
          </div>

          {/* INFO */}
          <aside className="kontakt-info">
            {contactInfo.address && (
              <div className="kontakt-info__card">
                <div className="kontakt-info__icon"><Icon name="location_on" /></div>
                <div>
                  <div className="kontakt-info__label">Adres</div>
                  {contactInfo.addressLink
                    ? <a href={contactInfo.addressLink} target="_blank" rel="noopener noreferrer" className="kontakt-info__value kontakt-info__link">{contactInfo.address}</a>
                    : <div className="kontakt-info__value">{contactInfo.address}</div>
                  }
                </div>
              </div>
            )}
            {contactInfo.phone && (
              <div className="kontakt-info__card">
                <div className="kontakt-info__icon"><Icon name="phone" /></div>
                <div>
                  <div className="kontakt-info__label">Telefon</div>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="kontakt-info__value kontakt-info__link">{contactInfo.phone}</a>
                </div>
              </div>
            )}
            {contactInfo.email && (
              <div className="kontakt-info__card">
                <div className="kontakt-info__icon"><Icon name="mail" /></div>
                <div>
                  <div className="kontakt-info__label">E-mail</div>
                  <a href={`mailto:${contactInfo.email}`} className="kontakt-info__value kontakt-info__link">{contactInfo.email}</a>
                </div>
              </div>
            )}
            {contactInfo.hours && (
              <div className="kontakt-info__card">
                <div className="kontakt-info__icon"><Icon name="schedule" /></div>
                <div>
                  <div className="kontakt-info__label">Godziny otwarcia</div>
                  <div className="kontakt-info__value" style={{ whiteSpace: 'pre-line' }}>{contactInfo.hours}</div>
                </div>
              </div>
            )}
            {contactInfo.mapEmbedUrl && (
              <div className="kontakt-info__map">
                <iframe
                  src={contactInfo.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokalizacja Pantera"
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
            <div className="kontakt-faq__label">FAQ</div>
            <h2>Najczęstsze pytania</h2>
            <p>Nie znalazłeś odpowiedzi? Napisz do nas — odpiszemy w ciągu 24h.</p>
          </div>
          <div className="kontakt-faq__list">
            {faqItems.map((item) => (
              <details key={item.id} className="faq-item">
                <summary className="faq-item__question">{item.question}</summary>
                <div className="faq-item__answer">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}
