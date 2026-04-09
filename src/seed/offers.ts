import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'
import { richText } from './helpers'

async function uploadImage(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  alt: string,
) {
  const resolved = path.resolve(filePath)
  if (!fs.existsSync(resolved)) {
    console.warn(`  Image not found, skipping: ${resolved}`)
    return null
  }
  const data = fs.readFileSync(resolved)
  const ext = path.extname(resolved).toLowerCase()
  const mimetype = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype, name: path.basename(resolved), size: data.length },
  })
  return media.id as number
}

export async function seedOffers(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding offers...')

  const [imgFirmy, imgUrodziny, imgSamoobrona] = await Promise.all([
    uploadImage(payload, 'src/seed/images/zajecia-dla-firm.jpeg', 'Zajęcia dla firm – Pantera'),
    uploadImage(payload, 'src/seed/images/urodziny-na-sportowo.jpg', 'Urodziny na sportowo – Pantera'),
    uploadImage(payload, 'src/seed/images/samoobrona-dla-kobiet.jpg', 'Samoobrona dla kobiet – Pantera'),
  ])

  // Create offers sequentially so we can reference IDs for relatedOffers
  const [firmyOffer, szkolyOffer, urodzinyOffer, samoobOffer, rodzinneOffer] = await Promise.all([
    // ---- Dla Firm ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Dla Firm i Korporacji',
        slug: 'dla-firm',
        category: 'company',
        icon: 'company',
        seo: {
          metaTitle: 'Zajęcia dla Firm – Integracja i samoobrona Warszawa | Pantera',
          metaDescription: 'Warsztaty samoobrony i integracji dla firm w Warszawie. Krav Maga, Tai Chi, team building. Dopasujemy program do potrzeb Twojej organizacji.',
        },
        ...(imgFirmy ? { coverImage: imgFirmy } : {}),
        heading: {
          title: 'Bezpieczeństwo i Integracja – Warsztaty dla Firm',
          ...(imgFirmy ? { backgroundImage: imgFirmy } : {}),
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
              { icon: 'shield', title: 'Samoobrona / Krav Maga', description: 'Warsztaty budujące pewność siebie i uczące reakcji w sytuacjach stresowych.' },
              { icon: 'lotus', title: 'Tai Chi / Zdrowy Kręgosłup', description: 'Zajęcia relaksacyjne, idealne jako przerywnik w pracy siedzącej (wellbeing).' },
              { icon: 'handshake', title: 'Integracja Teamowa', description: 'Wspólny trening, który uczy współpracy i zaufania w zespole.' },
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
        icon: 'schools',
        seo: {
          metaTitle: 'Zajęcia dla Szkół i Przedszkoli – Pantera Warszawa',
          metaDescription: 'Warsztaty samoobrony i edukacji bezpieczeństwa dla dzieci i młodzieży w szkołach i przedszkolach. Pantera Family & Sport Club, Warszawa.',
        },
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
              { icon: 'running', title: 'Aktywność fizyczna', description: 'Promocja zdrowego stylu życia i regularnego ruchu wśród dzieci i młodzieży.' },
              { icon: 'shield-check', title: 'Edukacja bezpieczeństwa', description: 'Jak unikać zagrożeń, asertywność i procedury bezpieczeństwa.' },
              { icon: 'speech', title: 'Pogadanki prozdrowotne', description: 'Możliwość połączenia zajęć ruchowych z prelekcjami o zdrowiu.' },
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
        icon: 'birthday',
        seo: {
          metaTitle: 'Urodziny na Sportowo – Aktywne urodziny dla dzieci | Pantera',
          metaDescription: 'Niezapomniane urodziny dla dziecka w Panterze! Sala 115 m², tory przeszkód, elementy karate. Sadyba, Mokotów. Zarezerwuj termin!',
        },
        ...(imgUrodziny ? { coverImage: imgUrodziny } : {}),
        heading: {
          title: 'Urodziny na Sportowo – Aktywna impreza dla dzieci',
          ...(imgUrodziny ? { backgroundImage: imgUrodziny } : {}),
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
              { icon: 'target', title: 'Gry i zabawy ruchowe', description: 'Tory przeszkód, zawody i konkursy sportowe dla całej grupy.' },
              { icon: 'fist', title: 'Elementy karate i samoobrony', description: 'Bezpieczna nauka ciosów i bloków — dzieci uwielbiają!' },
              { icon: 'gym', title: 'Sala 115 m²', description: 'Bezpieczne materace, sprzęt sportowy i odpowiednia przestrzeń do zabawy.' },
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

    // ---- Samoobrona dla Kobiet ----
    payload.create({
      collection: 'offers',
      data: {
        title: 'Samoobrona dla kobiet',
        slug: 'samoobrona-dla-kobiet',
        category: 'workshop',
        icon: 'samoobrona',
        seo: {
          metaTitle: 'Samoobrona dla kobiet – Warsztaty Warszawa Mokotów | Pantera',
          metaDescription: 'Warsztaty samoobrony dla kobiet oparte na Krav Maga. Pewność siebie i skuteczne techniki reagowania w zagrożeniu. Sadyba, Mokotów. Zapisz się!',
        },
        ...(imgSamoobrona ? { coverImage: imgSamoobrona } : {}),
        heading: {
          title: '„Bezpieczna i pewna siebie" – Warsztaty na Mokotowie',
          ...(imgSamoobrona ? { backgroundImage: imgSamoobrona } : {}),
          subtitle: 'Zyskaj pewność siebie i naucz się skutecznych technik reagowania w sytuacjach zagrożenia. Warsztaty oparte na systemie Krav Maga, dostosowane do wyzwań współczesnych kobiet.',
          ctaText: 'Zapisz się na warsztat',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'Jesteśmy częścią społeczności Sadyby i Mokotowa. W Pantera Family & Sport Club stawiamy na relacje, bezpieczeństwo i realne umiejętności. Nasze warsztaty to nie tylko nauka ciosów i kopnięć – to trening uważności, asertywności i rozpoznawania zagrożeń.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'DLACZEGO NASZE WARSZTATY?',
            heading: 'Kluczowe umiejętności',
            items: [
              { icon: 'wind', title: 'Opanowanie stresu', description: 'Techniki oddechowe pozwalające zachować zimną krew w sytuacjach kryzysowych.' },
              { icon: 'megaphone', title: 'Asertywność i głos', description: 'Twoje pierwsze i najważniejsze narzędzie obrony przed agresorem.' },
              { icon: 'lightning', title: 'Skuteczne techniki', description: 'Uwolnienia z chwytów, obrona przed uderzeniami i wykorzystanie punktów witalnych.' },
            ],
          },
          {
            blockType: 'forWho' as const,
            label: 'DLA KOGO',
            title: 'Zapraszamy mieszkanki Mokotowa',
            content: 'Zapraszamy kobiety od 15. roku życia. Nie wymagamy wcześniejszego przygotowania kondycyjnego. Ćwiczymy w bezpiecznej, kameralnej grupie.',
            bullets: [
              { text: 'Kobiety od 15 lat' },
              { text: 'Brak wymagań kondycyjnych' },
              { text: 'Wygodny strój sportowy, woda' },
              { text: 'Lokalizacja: Sadyba (ul. Powsińska 25)' },
            ],
          },
          {
            blockType: 'richText' as const,
            content: richText(
              'Zajęcia prowadzi Michał Jaworski – licencjonowany trener z ponad 30-letnim doświadczeniem, ekspert United Krav Maga i tata trzech córek.',
            ),
          },
          {
            blockType: 'cta' as const,
            heading: 'Może zainteresują Cię również Warsztaty Rodzinne?',
            description: 'Spędź czas z dzieckiem na wspólnej nauce bezpieczeństwa i zabawie.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zobacz Warsztaty Rodzinne', link: '/oferta/warsztaty-rodzinne' },
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Zapisz się na najbliższy termin',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 689 718',
          },
          {
            blockType: 'cta' as const,
            heading: 'Zadbaj o swoje bezpieczeństwo',
            description: 'Zapisz się już dziś i poczuj różnicę w swojej pewności siebie.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zarezerwuj miejsce', link: '/kontakt' },
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
        icon: 'parent-child',
        seo: {
          metaTitle: 'Warsztaty Rodzinne – Matki i dzieci | Pantera Mokotów',
          metaDescription: 'Aktywne warsztaty dla matek z dziećmi (7–12 lat) na Mokotowie. Wspólna nauka samoobrony i zabawa sportowa. Cyklicznie w sobotnie południa.',
        },
        heading: {
          title: 'Wspólna przygoda, zabawa i nauka bezpieczeństwa',
          subtitle: 'Mamy z Mokotowa, to propozycja dla Was! Spędźcie sobotnie południe z dzieckiem na sportowej zabawie, która uczy pożytecznych rzeczy.',
          ctaText: 'Zarezerwuj miejsce',
          ctaLink: '/kontakt',
        },
        layout: [
          {
            blockType: 'richText' as const,
            content: richText(
              'Wspólna sportowa przygoda dla Matek i Dzieci. Zamiast siedzieć na ławce, aktywnie trenujesz razem z dzieckiem. To Wasz nowy, wspólny rytuał, który buduje relację i uczy wzajemnego wsparcia.',
            ),
          },
          {
            blockType: 'offerCards' as const,
            label: 'CO ZYSKACIE?',
            heading: 'Program warsztatów',
            items: [
              { icon: 'parent-child', title: 'Wspólny czas', description: 'Aktywny trening razem z dzieckiem zamiast czekania na korytarzu.' },
              { icon: 'shield', title: 'Praktyczna wiedza', description: 'Obrony przed uderzeniami, chwytami oraz bezpieczne upadanie.' },
              { icon: 'trophy', title: 'Wychowanie przez sport', description: 'Zabawy, które pomagają dzieciom stać się dzielnymi i pewnymi siebie.' },
            ],
          },
          {
            blockType: 'forWho' as const,
            label: 'SZCZEGÓŁY',
            title: 'Informacje organizacyjne',
            content: 'Spotykamy się co miesiąc w naszej sali na Sadybie wyposażonej w profesjonalne maty i sprzęt.',
            variant: 'dark' as const,
            bullets: [
              { text: 'Dla kogo: Matki z dziećmi w wieku 7–12 lat' },
              { text: 'Czas: Sobotnie południa (cyklicznie co miesiąc)' },
              { text: 'Strój: Wygodny dres, t-shirt, ćwiczymy boso' },
              { text: 'Miejsce: ul. Powsińska 25, Sadyba' },
              { text: 'Zachęcamy do zabrania notatnika' },
            ],
          },
          {
            blockType: 'cta' as const,
            heading: 'Szukasz samoobrony tylko dla siebie?',
            description: 'Sprawdź nasze warsztaty "Bezpieczna i pewna siebie" dedykowane wyłącznie kobietom.',
            variant: 'dark' as const,
            primaryButton: { text: 'Samoobrona dla Kobiet', link: '/oferta/samoobrona-dla-kobiet' },
          },
          {
            blockType: 'contactCard' as const,
            heading: 'Zarezerwuj miejsce dla Was',
            email: 'kontakt@pantera.waw.pl',
            phone: '508 689 718',
            note: 'Trochę ruchu w sobotę przyda się każdemu!',
          },
          {
            blockType: 'cta' as const,
            heading: 'Spędźcie aktywnie sobotę',
            description: 'Zapisz się na najbliższe warsztaty rodzinne i buduj relację przez sport.',
            variant: 'dark' as const,
            primaryButton: { text: 'Zapisz nas', link: '/kontakt' },
            secondaryButton: { text: '← Wszystkie oferty', link: '/oferta' },
          },
        ],
      },
    }),
  ])

  // Patch cross-references now that we have IDs
  // Samoobrona → Warsztaty Rodzinne
  await payload.update({
    collection: 'offers',
    id: samoobOffer.id,
    data: {
      layout: samoobOffer.layout?.map((block: any) =>
        block.blockType === 'cta' && block.heading?.includes('Warsztaty Rodzinne')
          ? { blockType: 'relatedOffers', heading: 'Może Cię zainteresować', offers: [rodzinneOffer.id] }
          : block,
      ),
    },
  })

  // Warsztaty Rodzinne → Samoobrona dla kobiet
  await payload.update({
    collection: 'offers',
    id: rodzinneOffer.id,
    data: {
      layout: rodzinneOffer.layout?.map((block: any) =>
        block.blockType === 'cta' && block.heading?.includes('samoobrony tylko dla siebie')
          ? { blockType: 'relatedOffers', heading: 'Może Cię zainteresować', offers: [samoobOffer.id] }
          : block,
      ),
    },
  })

  console.log('Created 5 offers')
  return { imgFirmy, imgUrodziny, imgSamoobrona }
}
