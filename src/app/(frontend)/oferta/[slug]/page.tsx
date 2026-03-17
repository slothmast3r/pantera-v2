import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Offer, Media, Navigation, Footer as FooterType } from '@/payload-types'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import '../oferta.css'

const categoryLabels: Record<string, string> = {
  company: 'Dla Firm',
  schools: 'Dla Szkół',
  workshop: 'Warsztaty',
  birthday: 'Urodziny',
  other: 'Oferta specjalna',
}

const offerIcons: Record<string, string> = {
  company: '🏢',
  schools: '🏫',
  workshop: '🥋',
  birthday: '🎂',
  other: '⭐',
}

function getBgUrl(img: Offer['coverImage'] | Offer['heading']['backgroundImage']): string | null {
  if (!img || typeof img === 'number') return null
  return (img as Media).url ?? null
}

// Static fallbacks
const staticOffers: Record<string, Partial<Offer>> = {
  'dla-firm': {
    id: -1,
    slug: 'dla-firm',
    title: 'Dla Firm i Korporacji',
    category: 'company',
    heading: {
      title: 'Bezpieczeństwo i Integracja – Warsztaty dla Firm',
      subtitle: 'Oferujemy zajęcia i warsztaty ruchowe, które wspierają cele HR w Twojej organizacji. Nasze programy to doskonały sposób na integrację zespołu, redukcję stresu biurowego oraz budowanie postaw liderskich.',
    },
    intro: {
      title: 'Co proponujemy?',
      content: 'Forma współpracy jest elastyczna: jednorazowe eventy integracyjne, cykliczne benefity dla pracowników lub programy "szyte na miarę" dopasowane do potrzeb Twojej firmy.',
    },
    offerings: [
      { title: 'Samoobrona / Krav Maga', description: 'Warsztaty budujące pewność siebie i uczące reakcji w sytuacjach stresowych.', icon: '🛡️', id: '1' },
      { title: 'Tai Chi / Zdrowy Kręgosłup', description: 'Zajęcia relaksacyjne, idealne jako przerywnik w pracy siedzącej (wellbeing).', icon: '☯️', id: '2' },
      { title: 'Integracja Teamowa', description: 'Wspólny trening, który uczy współpracy i zaufania w zespole.', icon: '🤝', id: '3' },
    ],
    formats: [
      { title: 'Event jednorazowy', description: 'Idealne na Dzień Pracownika, team-building lub firmowy piknik sportowy.', id: '1' },
      { title: 'Cykliczne benefity', description: 'Zajęcia tygodniowe lub miesięczne w siedzibie firmy lub u nas.', id: '2' },
      { title: 'Program na miarę', description: 'Konsultacja + projekt programu dostosowany do profilu Twojej organizacji.', id: '3' },
    ],
    contact: { email: 'kontakt@pantera.waw.pl', phone: '508 966 877' },
    cta: {
      heading: 'Zapytaj o ofertę dla firm',
      description: 'Skontaktuj się z nami, a przygotujemy indywidualną propozycję dla Twojej organizacji.',
      buttonText: 'Wyślij zapytanie',
      buttonLink: '/kontakt',
    },
  },
  'dla-szkol': {
    id: -2,
    slug: 'dla-szkol',
    title: 'Dla Szkół i Przedszkoli',
    category: 'schools',
    heading: {
      title: 'Edukacja poprzez Ruch',
      subtitle: 'Wspieramy placówki edukacyjne w promowaniu zdrowego stylu życia i bezpieczeństwa. Organizujemy warsztaty i pokazy samoobrony oraz sztuk walki, dostosowane do wieku uczniów.',
    },
    intro: { title: 'Nasza misja', content: 'Uczymy dzieci i młodzież jak dbać o siebie, unikać zagrożeń i żyć aktywnie. Każdy warsztat jest dostosowany do grupy wiekowej i możliwości placówki.' },
    offerings: [
      { title: 'Aktywność fizyczna', description: 'Promocja zdrowego stylu życia i regularnego ruchu wśród dzieci i młodzieży.', icon: '🏃', id: '1' },
      { title: 'Edukacja bezpieczeństwa', description: 'Jak unikać zagrożeń, asertywność i procedury bezpieczeństwa.', icon: '🛡️', id: '2' },
      { title: 'Pogadanki prozdrowotne', description: 'Możliwość połączenia zajęć ruchowych z prelekcjami o zdrowiu.', icon: '💬', id: '3' },
    ],
    contact: { email: 'kontakt@pantera.waw.pl', phone: '508 966 877' },
    cta: {
      heading: 'Skontaktuj się z nami',
      description: 'Chętnie odwiedzimy Twoją placówkę lub zaprosimy uczniów do naszej sali.',
      buttonText: 'Zapytaj o warsztat dla szkoły',
      buttonLink: '/kontakt',
    },
  },
  'urodziny': {
    id: -3,
    slug: 'urodziny',
    title: 'Urodziny na Sportowo',
    category: 'birthday',
    heading: {
      title: 'Urodziny na Sportowo – Aktywna impreza dla dzieci',
      subtitle: 'Zorganizuj aktywne urodziny dla swojego dziecka w naszym klubie! Gwarantujemy bezpieczną zabawę i niezapomniane emocje.',
    },
    intro: {
      title: 'Co wchodzi w skład imprezy?',
      content: 'Do dyspozycji sala 115 m², bezpieczne materace i sprzęt sportowy. Zapewniamy scenariusz pełen gier, torów przeszkód oraz elementów karate i samoobrony, prowadzony przez doświadczonych instruktorów.',
    },
    offerings: [
      { title: 'Gry i zabawy ruchowe', description: 'Tory przeszkód, zawody i konkursy sportowe dla całej grupy.', icon: '🎮', id: '1' },
      { title: 'Elementy karate i samoobrony', description: 'Bezpieczna nauka ciosów i bloków — dzieci uwielbiają!', icon: '🥋', id: '2' },
      { title: 'Sala 115 m²', description: 'Bezpieczne materace, sprzęt sportowy i odpowiednia przestrzeń do zabawy.', icon: '🏟️', id: '3' },
    ],
    forWho: {
      title: 'Dla kogo?',
      content: 'Urodziny dla dzieci w różnym wieku — dostosowujemy program do grupy.',
      bullets: [
        { text: 'Dzieci 5–14 lat', id: '1' },
        { text: 'Grupy do 20 osób', id: '2' },
        { text: 'Czas trwania: ~2 godziny', id: '3' },
        { text: 'Rezerwacja: kontakt@pantera.waw.pl', id: '4' },
      ],
    },
    contact: { email: 'kontakt@pantera.waw.pl', phone: '508 689 718', note: 'Rezerwacje z wyprzedzeniem minimum 2 tygodnie.' },
    cta: {
      heading: 'Zarezerwuj termin urodzin',
      description: 'Napisz do nas i wspólnie zaplanujemy niezapomnianą imprezę dla Twojego dziecka.',
      buttonText: 'Zarezerwuj termin',
      buttonLink: '/kontakt',
    },
  },
  'warsztaty-rodzinne': {
    id: -4,
    slug: 'warsztaty-rodzinne',
    title: 'Warsztaty Rodzinne',
    category: 'workshop',
    heading: {
      title: 'Warsztaty Rodzinne – Rodzic + Dziecko',
      subtitle: 'Wspólna sportowa przygoda! Zapraszamy rodziców z dziećmi (od 7 lat) na zajęcia, które budują więź i uczą współpracy.',
    },
    intro: {
      title: 'O warsztatach',
      content: 'W programie: podstawy samoobrony, bezpieczne przewroty, asekuracja oraz mnóstwo zabaw ruchowych. To świetna okazja, by stworzyć domowe rytuały treningowe i spędzić czas razem.',
    },
    offerings: [
      { title: 'Podstawy samoobrony', description: 'Proste techniki, które rodzic i dziecko ćwiczą razem.', icon: '🛡️', id: '1' },
      { title: 'Bezpieczne przewroty', description: 'Nauka padów i asekuracji — bezpieczeństwo na co dzień.', icon: '🤸', id: '2' },
      { title: 'Zabawy ruchowe', description: 'Gry i ćwiczenia wzmacniające więź rodzic-dziecko.', icon: '🎯', id: '3' },
    ],
    forWho: {
      title: 'Dla kogo?',
      content: 'Dla rodziców z dziećmi od 7. roku życia. Brak wymagań co do wcześniejszego doświadczenia.',
      bullets: [
        { text: 'Dzieci od 7 lat z rodzicem lub opiekunem', id: '1' },
        { text: 'Bez wcześniejszego doświadczenia', id: '2' },
        { text: 'Cykliczne spotkania — sprawdź aktualny grafik', id: '3' },
      ],
    },
    contact: { email: 'kontakt@pantera.waw.pl', phone: '508 689 718' },
    cta: {
      heading: 'Dołącz do warsztatów rodzinnych',
      description: 'Sprawdź najbliższy termin i zapisz się razem z dzieckiem.',
      buttonText: 'Zapytaj o termin',
      buttonLink: '/kontakt',
    },
  },
}

export default async function OfferPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let offer: Partial<Offer> | null = null
  let nav: Navigation | null = null
  let footer: FooterType | null = null

  try {
    const payload = await getPayload({ config })
    const [offerRes, navRes, footerRes] = await Promise.all([
      payload.find({ collection: 'offers', where: { slug: { equals: slug } }, limit: 1, depth: 1 }),
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    nav = navRes
    footer = footerRes
    if (offerRes.docs[0]) offer = offerRes.docs[0]
  } catch {
    // DB unavailable
  }

  if (!offer) {
    offer = staticOffers[slug] ?? null
    if (!offer) notFound()
  }

  const bgUrl = getBgUrl(offer.heading?.backgroundImage) ?? getBgUrl(offer.coverImage)
  const icon = offerIcons[offer.category ?? ''] ?? '⭐'
  const categoryLabel = categoryLabels[offer.category ?? ''] ?? 'Oferta'

  return (
    <>
      <Navbar data={nav} />

      {/* HEADER */}
      <section className="offer-header">
        {bgUrl && <div className="offer-header__bg" style={{ backgroundImage: `url(${bgUrl})` }} />}
        <div className="offer-header__overlay" />
        <div className="container">
          <nav className="offer-header__breadcrumb" aria-label="Breadcrumb">
            <a href="/">Strona główna</a>
            <span>›</span>
            <a href="/oferta">Oferta</a>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{offer.title}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div className="label label--white" style={{ margin: 0 }}>{icon} {categoryLabel.toUpperCase()}</div>
          </div>
          <h1>{offer.heading?.title ?? offer.title}</h1>
          {offer.heading?.subtitle && (
            <p className="offer-header__lead">{offer.heading.subtitle}</p>
          )}
          <a href={offer.cta?.buttonLink ?? '/kontakt'} className="btn btn--orange">
            {offer.cta?.buttonText ?? 'Zapytaj o ofertę'}
          </a>
        </div>
      </section>

      {/* INTRO + CONTACT */}
      {(offer.intro?.title || offer.intro?.content || offer.contact?.email) && (
        <section className="offer-intro">
          <div className="container">
            <div className="offer-intro__grid">
              <div className="offer-intro__text">
                <div className="label">O OFERCIE</div>
                <h2>{offer.intro?.title ?? 'Szczegóły oferty'}</h2>
                {offer.intro?.content && <p>{offer.intro.content}</p>}
              </div>
              {(offer.contact?.email || offer.contact?.phone) && (
                <div className="offer-contact-card">
                  <h4>Kontakt w sprawie oferty</h4>
                  {offer.contact.email && (
                    <div className="offer-contact-card__line">
                      <span>📧</span>
                      <a href={`mailto:${offer.contact.email}`}>{offer.contact.email}</a>
                    </div>
                  )}
                  {offer.contact.phone && (
                    <div className="offer-contact-card__line">
                      <span>📞</span>
                      <a href={`tel:${offer.contact.phone.replace(/\s/g, '')}`}>{offer.contact.phone}</a>
                    </div>
                  )}
                  {offer.contact.note && (
                    <p className="offer-contact-card__note">{offer.contact.note}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* OFFERINGS */}
      {offer.offerings && offer.offerings.length > 0 && (
        <section className="offer-offerings">
          <div className="container">
            <div className="label">CO PROPONUJEMY</div>
            <h2>W ramach tej oferty</h2>
            <p className="offer-offerings__subtitle">Elastyczny program dostosowany do Twoich potrzeb.</p>
            <div className="offer-cards-grid">
              {offer.offerings.map((o, i) => (
                <div key={o.id ?? i} className="offer-card-item">
                  <span className="offer-card-item__icon">{o.icon ?? '✅'}</span>
                  <h3>{o.title}</h3>
                  {o.description && <p>{o.description}</p>}
                </div>
              ))}
            </div>

            {/* FORMATS */}
            {offer.formats && offer.formats.length > 0 && (
              <div className="offer-formats-section">
                <h3>Forma współpracy</h3>
                <div className="offer-formats-grid">
                  {offer.formats.map((f, i) => (
                    <div key={f.id ?? i} className="offer-format-item">
                      <div className="offer-format-item__title">{f.title}</div>
                      {f.description && <div className="offer-format-item__desc">{f.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOR WHO */}
      {(offer.forWho?.content || offer.forWho?.bullets?.length) && (
        <section className="offer-for-who">
          <div className="container">
            <div className="offer-for-who__inner">
              <div className="label label--white">UCZESTNICY</div>
              <h2>{offer.forWho.title ?? 'Dla kogo?'}</h2>
              {offer.forWho.content && <p>{offer.forWho.content}</p>}
              {offer.forWho.bullets && offer.forWho.bullets.length > 0 && (
                <ul className="offer-bullets">
                  {offer.forWho.bullets.map((b, i) => (
                    <li key={b.id ?? i}>{b.text}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="offer-cta">
        <div className="container">
          <h2>{offer.cta?.heading ?? 'Zapytaj o ofertę'}</h2>
          <p>{offer.cta?.description ?? 'Skontaktuj się z nami i wspólnie ustalimy szczegóły.'}</p>
          <div className="offer-cta__buttons">
            <a href={offer.cta?.buttonLink ?? '/kontakt'} className="btn btn--orange">
              {offer.cta?.buttonText ?? 'Wyślij zapytanie'}
            </a>
            <a href="/oferta" className="btn btn--outline-white">
              ← Wszystkie oferty
            </a>
          </div>
        </div>
      </section>

      <Footer data={footer} />
    </>
  )
}
