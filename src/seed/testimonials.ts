import { getPayload } from 'payload'

export async function seedTestimonials(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding testimonials...')
  await Promise.all([
    payload.create({
      collection: 'testimonials',
      data: {
        author: 'Maciej Brunner',
        content:
          'Świetne zajęcia, polecam każdemu! Instruktorzy są bardzo profesjonalni i pomocni. Dzieci uwielbiają te zajęcia.',
        rating: 5,
        isFeatured: true,
      },
    }),
    payload.create({
      collection: 'testimonials',
      data: {
        author: 'Tomasz Thompson',
        content:
          'Jeden z najlepszych klubów sportowych w Warszawie. Zajęcia są na wysokim poziomie. Atmosfera super. Polecam.',
        rating: 5,
        isFeatured: true,
      },
    }),
    payload.create({
      collection: 'testimonials',
      data: {
        author: 'Sandra',
        content:
          'Polecam Panterę jeśli szukasz czegoś więcej niż tylko treningu. Tu naprawdę dbają o każdego uczestnika.',
        rating: 5,
        isFeatured: true,
      },
    }),
  ])
  console.log('Created 3 testimonials')
}
