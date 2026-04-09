import { getPayload } from 'payload'

export async function seedEvents(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding events...')

  await Promise.all([
    payload.create({
      collection: 'events',
      data: {
        title: 'Warsztaty Samoobrony dla Kobiet – edycja wiosenna',
        slug: 'warsztaty-samoobrony-kobiet-wiosna',
        startDate: '2026-05-10',
        endDate: '2026-05-10',
        location: 'ul. Powsińska 25, Warszawa (Sadyba)',
        shortDescription: 'Praktyczne warsztaty samoobrony oparte na systemie Krav Maga. Dla kobiet od 15. roku życia, bez wymagań kondycyjnych. Prowadzi Michał Jaworski.',
        cancelled: false,
        registrationLink: '/kontakt',
      },
    }),

    payload.create({
      collection: 'events',
      data: {
        title: 'Warsztaty Rodzinne – maj 2026',
        slug: 'warsztaty-rodzinne-maj-2026',
        startDate: '2026-05-17',
        endDate: '2026-05-17',
        location: 'ul. Powsińska 25, Warszawa (Sadyba)',
        shortDescription: 'Aktywne warsztaty dla matek z dziećmi (7–12 lat). Wspólna nauka samoobrony, tory przeszkód i dobra zabawa sportowa w sobotnie południe.',
        cancelled: false,
        registrationLink: '/kontakt',
      },
    }),

    payload.create({
      collection: 'events',
      data: {
        title: 'Egzaminy na pasy – Krav Maga Dzieci',
        slug: 'egzaminy-pasy-krav-maga-dzieci-2026',
        startDate: '2026-06-07',
        endDate: '2026-06-07',
        location: 'ul. Powsińska 25, Warszawa (Sadyba)',
        shortDescription: 'Egzaminy na kolejne stopnie (pasy) dla grup dziecięcych Krav Maga. Wstęp wolny dla rodziców i kibiców. Szczegóły u instruktora.',
        cancelled: false,
        registrationLink: '/kontakt',
      },
    }),
  ])

  console.log('Created 3 events')
}
