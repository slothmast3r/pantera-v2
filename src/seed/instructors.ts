import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

async function uploadPhoto(payload: Awaited<ReturnType<typeof getPayload>>, filename: string, alt: string) {
  const filePath = path.resolve(process.cwd(), 'public/instructors', filename)
  if (!fs.existsSync(filePath)) return null
  const data = fs.readFileSync(filePath)
  const media = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data,
      mimetype: 'image/png',
      name: filename,
      size: data.length,
    },
  })
  return media.id as number
}

export async function seedInstructors(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding instructors...')

  const [photo1, photo2, photo3] = await Promise.all([
    uploadPhoto(payload, 'michal-jaworski.png', 'Michał Jaworski'),
    uploadPhoto(payload, 'tomasz-lewkowicz.png', 'Tomasz Lewkowicz'),
    uploadPhoto(payload, 'janusz-zuchowski.png', 'Janusz Żuchowski'),
  ])

  const [instructor1, instructor2, instructor3] = await Promise.all([
    payload.create({
      collection: 'instructors',
      data: {
        name: 'Michał Jaworski',
        slug: 'michal-jaworski',
        ...(photo1 ? { photo: photo1 } : {}),
        specialization: 'KRAV MAGA / SAMOOBRONA',
        seo: {
          metaTitle: 'Michał Jaworski – Instruktor Krav Maga | Pantera Warszawa',
          metaDescription: 'Michał Jaworski – certyfikowany instruktor Krav Maga i samoobrony z ponad 20-letnim doświadczeniem. Pantera Family & Sport Club, Mokotów.',
        },
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
        ...(photo2 ? { photo: photo2 } : {}),
        specialization: 'KARATE / POWER TRAINING',
        seo: {
          metaTitle: 'Tomasz Lewkowicz – Instruktor Karate | Pantera Warszawa',
          metaDescription: 'Tomasz Lewkowicz – sędzia międzynarodowy i trener karate z 25+ letnim doświadczeniem. Pantera Family & Sport Club, Mokotów.',
        },
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
        name: 'Janusz Żuchowski',
        slug: 'janusz-zuchowski',
        ...(photo3 ? { photo: photo3 } : {}),
        specialization: 'TAI CHI / MASTER',
        seo: {
          metaTitle: 'Janusz Żuchowski – Instruktor Tai Chi | Pantera Warszawa',
          metaDescription: 'Janusz Żuchowski – certyfikowany instruktor Tai Chi i Qigong z wieloletnim doświadczeniem w pracy z każdą grupą wiekową. Pantera, Mokotów.',
        },
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
