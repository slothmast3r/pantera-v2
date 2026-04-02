import React from 'react'
import Icon from '@/components/ui/Icon'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Navigation, Footer as FooterType } from '@/payload-types'
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

export default async function KontaktPage() {
  let nav: Navigation | null = null
  let footer: FooterType | null = null
  let faqItems = staticFaq

  try {
    const payload = await getPayload({ config })
    const [navRes, footerRes, faqRes] = await Promise.all([
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
      payload.find({ collection: 'faq', limit: 20, sort: 'order' }),
    ])
    nav = navRes
    footer = footerRes
    if (faqRes.docs.length > 0) faqItems = faqRes.docs as typeof staticFaq
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
            <div className="kontakt-info__card">
              <div className="kontakt-info__icon"><Icon name="location_on" /></div>
              <div>
                <div className="kontakt-info__label">Adres</div>
                <div className="kontakt-info__value">ul. Powsińska 25<br />Warszawa, Mokotów (Sadyba)</div>
              </div>
            </div>
            <div className="kontakt-info__card">
              <div className="kontakt-info__icon"><Icon name="phone" /></div>
              <div>
                <div className="kontakt-info__label">Telefon</div>
                <a href="tel:+48508689718" className="kontakt-info__value kontakt-info__link">508 689 718</a>
              </div>
            </div>
            <div className="kontakt-info__card">
              <div className="kontakt-info__icon"><Icon name="mail" /></div>
              <div>
                <div className="kontakt-info__label">E-mail</div>
                <a href="mailto:kontakt@pantera.waw.pl" className="kontakt-info__value kontakt-info__link">kontakt@pantera.waw.pl</a>
              </div>
            </div>
            <div className="kontakt-info__card">
              <div className="kontakt-info__icon"><Icon name="schedule" /></div>
              <div>
                <div className="kontakt-info__label">Godziny otwarcia</div>
                <div className="kontakt-info__value">Pon–Pt: 15:00–21:00<br />Sob: 9:00–14:00</div>
              </div>
            </div>
            <div className="kontakt-info__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.9!2d21.048!3d52.192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDExJzMxLjIiTiAyMcKwMDInNTIuOCJF!5e0!3m2!1spl!2spl!4v1234567890"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja Pantera"
              />
            </div>
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
