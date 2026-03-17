import { getPayload } from 'payload'

export async function seedInstructors(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding instructors...')
  const [instructor1, instructor2, instructor3] = await Promise.all([
    payload.create({
      collection: 'instructors',
      data: {
        name: 'Michał Jaworski',
        slug: 'michal-jaworski',
        specialization: 'KRAV MAGA / SAMOOBRONA',
        bio: 'Instruktor z ponad 20-letnim doświadczeniem w Krav Maga i samoobronie. Certyfikat United Krav Maga. Prowadzi treningi z dziećmi od 2004 roku.',
        achievements: [
          { text: 'Certyfikat United Krav Maga – poziom instruktorski' },
          { text: 'Ponad 20 lat praktyki i nauczania Krav Maga' },
          { text: 'Prowadzenie grupy dziecięcej od 2004 roku' },
        ],
        order: 1,
      },
    }),
    payload.create({
      collection: 'instructors',
      data: {
        name: 'Tomasz Lewkowicz',
        slug: 'tomasz-lewkowicz',
        specialization: 'KARATE / POWER TRAINING',
        bio: 'Trener z 25+ letnim doświadczeniem w karate. Sędzia międzynarodowy. Pasja do kształtowania charakteru przez sport.',
        achievements: [
          { text: 'Sędzia międzynarodowy w karate' },
          { text: 'Ponad 25 lat doświadczenia trenerskiego' },
          { text: 'Wychowanek wielokrotnych mistrzów Polski' },
        ],
        order: 2,
      },
    }),
    payload.create({
      collection: 'instructors',
      data: {
        name: 'Janusz Dąbrowski',
        slug: 'janusz-dabrowski',
        specialization: 'TAI CHI / MASTER',
        bio: 'Mistrz Tai Chi z wieloletnim doświadczeniem w pracy z każdym wiekiem.',
        achievements: [
          { text: 'Wieloletnia praktyka Tai Chi i Qigong' },
          { text: 'Certyfikowany instruktor Tai Chi dla seniorów' },
          { text: 'Prowadzenie zajęć dla wszystkich grup wiekowych' },
        ],
        order: 3,
      },
    }),
  ])
  console.log(`Created instructors: ${instructor1.name}, ${instructor2.name}, ${instructor3.name}`)
  return {
    instructor1: { ...instructor1, id: instructor1.id as number },
    instructor2: { ...instructor2, id: instructor2.id as number },
    instructor3: { ...instructor3, id: instructor3.id as number },
  }
}
