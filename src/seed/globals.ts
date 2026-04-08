import { getPayload } from 'payload'

type OfferImages = { imgFirmy: number | null; imgUrodziny: number | null; imgSamoobrona: number | null }

export async function seedGlobals(payload: Awaited<ReturnType<typeof getPayload>>, offerImages?: OfferImages) {
  const { imgFirmy = null, imgUrodziny = null, imgSamoobrona = null } = offerImages ?? {}
  // ===== NAVIGATION =====
  console.log('Seeding navigation global...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      logoText: 'PANTERA',
      links: [
        {
          label: 'O nas',
          href: '/o-nas',
          subLinks: [
            { label: 'O nas', href: '/o-nas' },
            { label: 'Kadra', href: '/o-nas#kadra' },
            { label: 'Regulamin', href: '/regulamin' },
          ],
        },
        {
          label: 'Zajęcia',
          href: '/zajecia',
          subLinks: [
            { label: 'Krav Maga', href: '/zajecia/krav-maga' },
            { label: 'Karate', href: '/zajecia/karate' },
            { label: 'Power Training', href: '/zajecia/power-training' },
            { label: 'Tai Chi', href: '/zajecia/tai-chi' },
            { label: 'Indywidualne', href: '/zajecia/indywidualne' },
            { label: 'Strzelectwo ASG', href: '/zajecia/asg' },
            { label: 'Krav Maga Kids', href: '/zajecia/krav-maga-dzieci' },
            { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
          ],
        },
        {
          label: 'Oferta',
          href: '/oferta',
          subLinks: [
            { label: 'Dla Firm', href: '/oferta/dla-firm' },
            { label: 'Dla Szkół', href: '/oferta/dla-szkol' },
            { label: 'Samoobrona dla kobiet', href: '/oferta/samoobrona-dla-kobiet' },
            { label: 'Warsztaty Rodzinne', href: '/oferta/warsztaty-rodzinne' },
            { label: 'Urodziny na Sportowo', href: '/oferta/urodziny' },
          ],
        },
        { label: 'Grafik', href: '/grafik' },
        { label: 'Płatność', href: '/platnosc' },
        { label: 'Kontakt', href: '/kontakt' },
      ],
      ctaButton: {
        text: 'Zapisz się na zajęcia',
        href: '/kontakt',
      },
    },
  })
  console.log('Updated navigation global')

  // ===== FOOTER =====
  console.log('Seeding footer global...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: 'Rodzinny klub sportowy na Mokotowie. Krav Maga, Karate, Tai Chi.',
      columns: [
        {
          heading: 'Zajęcia',
          links: [
            { label: 'Krav Maga', href: '/zajecia/krav-maga' },
            { label: 'Karate', href: '/zajecia/karate' },
            { label: 'Tai Chi', href: '/zajecia/tai-chi' },
            { label: 'Krav Maga Dzieci', href: '/zajecia/krav-maga-dzieci' },
            { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
            { label: 'Indywidualne', href: '/zajecia/indywidualne' },
          ],
        },
        {
          heading: 'Klub',
          links: [
            { label: 'O nas', href: '/o-nas' },
            { label: 'Dla Firm', href: '/oferta/dla-firm' },
            { label: 'Samoobrona dla kobiet', href: '/oferta/samoobrona-dla-kobiet' },
            { label: 'Grafik', href: '/grafik' },
            { label: 'Płatność online', href: '/platnosc' },
            { label: 'Kontakt', href: '/kontakt' },
            { label: 'Regulamin', href: '/regulamin' },
          ],
        },
      ],
      socialLinks: [
        { platform: 'facebook', url: 'https://facebook.com/panterafamilysportclub' },
        { platform: 'instagram', url: 'https://instagram.com/panterafsc' },
      ],
      bottomText: `© ${new Date().getFullYear()} Pantera Family & Sport Club. Wszelkie prawa zastrzeżone.`,
    },
  })
  console.log('Updated footer global')

  // ===== CONTACT INFO =====
  console.log('Seeding contact-info global...')
  await payload.updateGlobal({
    slug: 'contact-info',
    data: {
      address: 'ul. Powsińska 25, Warszawa, Mokotów (Sadyba)',
      addressLink: 'https://maps.google.com/?q=Powsinska+25+Warszawa',
      phone: '508 689 718',
      email: 'kontakt@pantera.waw.pl',
      hours: 'Pon–Pt: 15:00–21:00 | Sob: 9:00–14:00',
      mapEmbedUrl:
        'https://maps.google.com/maps?q=Powsi%C5%84ska+25+Warszawa&output=embed&hl=pl&z=16',
    },
  })
  console.log('Updated contact-info global')

  // ===== HOMEPAGE PRICING =====
  console.log('Seeding homepage-pricing global...')
  await payload.updateGlobal({
    slug: 'homepage-pricing',
    data: {
      sectionLabel: 'CENNIK',
      sectionTitle: 'Wybierz plan dla siebie',
      note: '* 10% zniżki dla rodziny.',
      plans: [
        {
          name: 'Treningi Indywidualne',
          price: 'Zapytaj o cenę',
          features: [
            {
              text: '100% uwagi trenera: Osiągaj wyniki szybciej dzięki pracy „jeden na jeden”.  ',
            },
          ],
          ctaText: 'Skontaktuj się',
          ctaUrl: '/kontakt',
          featured: false,
        },
        {
          name: 'Pakiet „Solidny Fundament”',
          price: '250 zł',
          period: '/ mies. *',
          features: [
            {
              text: 'Wybór jednej dyscypliny: Krav Maga lub Karate.  ',
            },
          ],
          ctaText: 'Zapisz się',
          ctaUrl: '/kontakt',
          featured: true,
        },
        {
          name: 'Pakiet „Wszechstronny Rozwój”',
          price: '300 zł ',
          period: '/ mo. *',
          features: [
            {
              text: 'Łączymy techniki: ucz się skutecznej samoobrony Krav Maga oraz tradycyjnej dyscypliny Karate jednocześnie.  ',
            },
          ],
          ctaText: 'Umów trening',
          ctaUrl: '/kontakt',
          featured: false,
        },
      ],
    },
  })
  console.log('Updated homepage-pricing global')

  // ===== HOMEPAGE SERVICES =====
  console.log('Seeding homepage-services global...')
  await payload.updateGlobal({
    slug: 'homepage-services',
    data: {
      sectionLabel: 'USŁUGI DODATKOWE',
      sectionTitle: 'Pantera to także:',
      columns: '3',
      cards: [
        {
          tag: 'DLA FIRM',
          title: 'Zajęcia dla firm',
          description:
            'Buduj zespół poprzez sport i naukę samoobrony. Programy dopasowane do potrzeb Twojej firmy.',
          ctaText: 'Sprawdź ofertę',
          ctaUrl: '/oferta/dla-firm',
          color: '#1e3a8a',
          ...(imgFirmy ? { image: imgFirmy } : {}),
        },
        {
          tag: 'KOBIETY',
          title: 'Samoobrona dla kobiet',
          description:
            'Specjalistyczne kursy zwiększające poczucie bezpieczeństwa i pewność siebie w każdej sytuacji.',
          ctaText: 'Sprawdź ofertę',
          ctaUrl: '/oferta/samoobrona-dla-kobiet',
          color: '#8b0000',
          ...(imgSamoobrona ? { image: imgSamoobrona } : {}),
        },
        {
          tag: 'DZIECI',
          title: 'Urodziny na sportowo',
          description:
            'Niezapomniane przyjęcia urodzinowe dla dzieci pełne ruchu, zabawy i wyzwań sportowych.',
          ctaText: 'Sprawdź ofertę',
          ctaUrl: '/oferta/urodziny',
          color: '#d97706',
          ...(imgUrodziny ? { image: imgUrodziny } : {}),
        },
      ],
    },
  })
  console.log('Updated homepage-services global')

  // ===== ABOUT GALLERY =====
  console.log('Seeding about-gallery global...')
  await payload.updateGlobal({
    slug: 'about-gallery',
    data: {
      title: 'Nasza Galeria',
      columns: 3,
      images: [],
    },
  })
  console.log('Updated about-gallery global')

  // ===== HOME PAGE =====
  console.log('Seeding home page...')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Strona główna',
      slug: 'home',
      seo: {
        metaTitle: 'Pantera Family & Sport Club – Krav Maga, Karate, Tai Chi Warszawa',
        metaDescription: 'Rodzinny klub sportowy na Mokotowie. Krav Maga, Karate, Tai Chi i Power Training dla dzieci i dorosłych. Pierwsze zajęcia gratis!',
      },
      layout: [
        {
          blockType: 'hero',
          title: 'Sztuki walki i rozwój. Mądrze. Bezpiecznie. Lokalnie.',
          description:
            'Rodzinny klub sportowy na Mokotowie. Budujemy pewność siebie i formy ruchowe w bezpiecznym środowisku.',
          primaryCta: {
            text: 'Umówione zajęcia za darmo',
            link: '/kontakt',
          },
          socialProof: {
            googleReviewsText: 'Google Reviews',
          },
        },
      ],
    },
  })
  console.log('Created home page')

  // ===== O-NAS PAGE =====
  console.log('Seeding o-nas page...')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'O nas',
      slug: 'o-nas',
      _status: 'published',
      seo: {
        metaTitle: 'O nas – Pantera Family & Sport Club | Klub sportowy Mokotów',
        metaDescription: 'Poznaj historię i filozofię Pantery. Rodzinny klub sportowy na Mokotowie od 2011 roku. Certyfikowani instruktorzy, małe grupy, bezpieczna atmosfera.',
      },
      layout: [],
    },
  })
  console.log('Created o-nas page')
}
