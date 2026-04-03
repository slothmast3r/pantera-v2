import { getPayload } from 'payload'

export async function seedGlobals(payload: Awaited<ReturnType<typeof getPayload>>) {
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
      mapEmbedUrl: 'https://maps.google.com/maps?q=Powsi%C5%84ska+25+Warszawa&output=embed&hl=pl&z=16',
    },
  })
  console.log('Updated contact-info global')

  // ===== HOME PAGE =====
  console.log('Seeding home page...')
  await payload.create({
    collection: 'pages',
    data: {
      title: 'Strona główna',
      slug: 'home',
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
}
