import { getPayload } from 'payload'
import { richText } from './helpers'

export async function seedOffers(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding offers...')

  await Promise.all([
    // ---- Dla Firm ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Dla Firm i Korporacji',
        slug: 'dla-firm',
        category: 'company',
        heading: {
          title: 'Bezpieczeństwo i Integracja – Warsztaty dla Firm',
          subtitle: 'Oferujemy zajęcia i warsztaty ruchowe, które wspierają cele HR w Twojej organizacji. Nasze programy to doskonały sposób na integrację zespołu, redukcję stresu biurowego oraz budowanie postaw liderskich.',
          ctaText: 'Zapytaj o ofertę',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'Forma współpracy jest elastyczna: jednorazowe eventy integracyjne, cykliczne benefity dla pracowników lub programy "szyte na miarę" dopasowane do potrzeb Twojej firmy.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'CO PROPONUJEMY',
            heading: 'W ramach tej oferty',
            subheading: 'Elastyczny program dostosowany do Twoich potrzeb.',
            items: [
              { icon: '🛡️', title: 'Samoobrona / Krav Maga', description: 'Warsztaty budujące pewność siebie i uczące reakcji w sytuacjach stresowych.' },
              { icon: '☯️', title: 'Tai Chi / Zdrowy Kręgosłup', description: 'Zajęcia relaksacyjne, idealne jako przerywnik w pracy siedzącej (wellbeing).' },
              { icon: '🤝', title: 'Integracja Teamowa', description: 'Wspólny trening, który uczy współpracy i zaufania w zespole.' },
            ],
          },
          {
            blockType: 'offerCards' as const,
            heading: 'Forma współpracy',
            items: [
              { icon: '📅', title: 'Event jednorazowy', description: 'Idealne na Dzień Pracownika, team-building lub firmowy piknik sportowy.' },
              { icon: '🔄', title: 'Cykliczne benefity', description: 'Zajęcia tygodniowe lub miesięczne w siedzibie firmy lub u nas.' },
              { icon: '🎯', title: 'Program na miarę', description: 'Konsultacja + projekt programu dostosowany do profilu Twojej organizacji.' },
            ],
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Kontakt w sprawie oferty',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 966 877',
          },
          {
            blockType: 'cta' as const,
            heading: 'Zapytaj o ofertę dla firm',
            description: 'Skontaktuj się z nami, a przygotujemy indywidualną propozycję dla Twojej organizacji.',
            variant: 'dark' as const,
            primaryButton: { text: 'Wyślij zapytanie', link: '/kontakt' },
            secondaryButton: { text: '← Wszystkie oferty', link: '/oferta' },
          },
        ],
      },
    }),

    // ---- Dla Szkół ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Dla Szkół i Przedszkoli',
        slug: 'dla-szkol',
        category: 'schools',
        heading: {
          title: 'Edukacja poprzez Ruch',
          subtitle: 'Wspieramy placówki edukacyjne w promowaniu zdrowego stylu życia i bezpieczeństwa. Organizujemy warsztaty i pokazy samoobrony oraz sztuk walki, dostosowane do wieku uczniów.',
          ctaText: 'Zapytaj o warsztat',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'Uczymy dzieci i młodzież jak dbać o siebie, unikać zagrożeń i żyć aktywnie. Każdy warsztat jest dostosowany do grupy wiekowej i możliwości placówki.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'CO OFERUJEMY',
            heading: 'Program warsztatów',
            items: [
              { icon: '🏃', title: 'Aktywność fizyczna', description: 'Promocja zdrowego stylu życia i regularnego ruchu wśród dzieci i młodzieży.' },
              { icon: '🛡️', title: 'Edukacja bezpieczeństwa', description: 'Jak unikać zagrożeń, asertywność i procedury bezpieczeństwa.' },
              { icon: '💬', title: 'Pogadanki prozdrowotne', description: 'Możliwość połączenia zajęć ruchowych z prelekcjami o zdrowiu.' },
            ],
          },
          {
            blockType: 'forWho' as const,
            label: 'UCZESTNICY',
            title: 'Dla kogo?',
            content: 'Warsztaty dla dzieci i młodzieży w wieku szkolnym i przedszkolnym.',
            variant: 'dark' as const,
            bullets: [
              { text: 'Przedszkola i szkoły podstawowe' },
              { text: 'Grupy od 10 do 30 osób' },
              { text: 'Dostosowane do grupy wiekowej' },
              { text: 'Możliwość realizacji w placówce lub u nas' },
            ],
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Kontakt w sprawie warsztatów szkolnych',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 966 877',
          },
          {
            blockType: 'cta' as const,
            heading: 'Skontaktuj się z nami',
            description: 'Chętnie odwiedzimy Twoją placówkę lub zaprosimy uczniów do naszej sali.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zapytaj o warsztat dla szkoły', link: '/kontakt' },
            secondaryButton: { text: '← Wszystkie oferty', link: '/oferta' },
          },
        ],
      },
    }),

    // ---- Urodziny ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Urodziny na Sportowo',
        slug: 'urodziny',
        category: 'birthday',
        heading: {
          title: 'Urodziny na Sportowo – Aktywna impreza dla dzieci',
          subtitle: 'Zorganizuj aktywne urodziny dla swojego dziecka w naszym klubie! Gwarantujemy bezpieczną zabawę i niezapomniane emocje.',
          ctaText: 'Zarezerwuj termin',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'Do dyspozycji sala 115 m², bezpieczne materace i sprzęt sportowy. Zapewniamy scenariusz pełen gier, torów przeszkód oraz elementów karate i samoobrony, prowadzony przez doświadczonych instruktorów.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'CO WCHODZI W SKŁAD',
            heading: 'Program urodzin',
            subheading: 'Każde urodziny to niepowtarzalna przygoda!',
            items: [
              { icon: '🎮', title: 'Gry i zabawy ruchowe', description: 'Tory przeszkód, zawody i konkursy sportowe dla całej grupy.' },
              { icon: '🥋', title: 'Elementy karate i samoobrony', description: 'Bezpieczna nauka ciosów i bloków — dzieci uwielbiają!' },
              { icon: '🏟️', title: 'Sala 115 m²', description: 'Bezpieczne materace, sprzęt sportowy i odpowiednia przestrzeń do zabawy.' },
            ],
          },
          {
            blockType: 'forWho' as const,
            label: 'UCZESTNICY',
            title: 'Dla kogo?',
            content: 'Urodziny dla dzieci w różnym wieku — dostosowujemy program do grupy.',
            variant: 'dark' as const,
            bullets: [
              { text: 'Dzieci 5–14 lat' },
              { text: 'Grupy do 20 osób' },
              { text: 'Czas trwania: ~2 godziny' },
              { text: 'Rezerwacja z wyprzedzeniem minimum 2 tygodnie' },
            ],
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Rezerwacja urodzin',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 689 718',
            note: 'Rezerwacje z wyprzedzeniem minimum 2 tygodnie.',
          },
          {
            blockType: 'cta' as const,
            heading: 'Zarezerwuj termin urodzin',
            description: 'Napisz do nas i wspólnie zaplanujemy niezapomnianą imprezę dla Twojego dziecka.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zarezerwuj termin', link: '/kontakt' },
            secondaryButton: { text: '← Wszystkie oferty', link: '/oferta' },
          },
        ],
      },
    }),

    // ---- Warsztaty Rodzinne ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Warsztaty Rodzinne',
        slug: 'warsztaty-rodzinne',
        category: 'workshop',
        heading: {
          title: 'Warsztaty Rodzinne – Rodzic + Dziecko',
          subtitle: 'Wspólna sportowa przygoda! Zapraszamy rodziców z dziećmi (od 7 lat) na zajęcia, które budują więź i uczą współpracy.',
          ctaText: 'Zapytaj o termin',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'W programie: podstawy samoobrony, bezpieczne przewroty, asekuracja oraz mnóstwo zabaw ruchowych. To świetna okazja, by stworzyć domowe rytuały treningowe i spędzić czas razem.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'PROGRAM',
            heading: 'Co czeka na uczestników',
            items: [
              { icon: '🛡️', title: 'Podstawy samoobrony', description: 'Proste techniki, które rodzic i dziecko ćwiczą razem.' },
              { icon: '🤸', title: 'Bezpieczne przewroty', description: 'Nauka padów i asekuracji — bezpieczeństwo na co dzień.' },
              { icon: '🎯', title: 'Zabawy ruchowe', description: 'Gry i ćwiczenia wzmacniające więź rodzic-dziecko.' },
            ],
          },
          {
            blockType: 'forWho' as const,
            label: 'UCZESTNICY',
            title: 'Dla kogo?',
            content: 'Dla rodziców z dziećmi od 7. roku życia. Brak wymagań co do wcześniejszego doświadczenia.',
            variant: 'dark' as const,
            bullets: [
              { text: 'Dzieci od 7 lat z rodzicem lub opiekunem' },
              { text: 'Bez wcześniejszego doświadczenia' },
              { text: 'Cykliczne spotkania — sprawdź aktualny grafik' },
            ],
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Kontakt',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 689 718',
          },
          {
            blockType: 'cta' as const,
            heading: 'Dołącz do warsztatów rodzinnych',
            description: 'Sprawdź najbliższy termin i zapisz się razem z dzieckiem.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zapytaj o termin', link: '/kontakt' },
            secondaryButton: { text: '← Wszystkie oferty', link: '/oferta' },
          },
        ],
      },
    }),
  ])

  console.log('Created 4 offers')
}
