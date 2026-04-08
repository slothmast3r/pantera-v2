import { getPayload } from 'payload'
import fs from 'fs'
import path from 'path'

async function uploadPhoto(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  alt: string,
) {
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
        specialization: 'KRAV MAGA / AIKIDO / ZAŁOŻYCIEL',
        excerpt: 'Założyciel Pantery, instruktor United Krav Maga i czarny pas Aikido (1997). Od 1991 roku uczy, jak bezpiecznie wrócić do domu – dla dorosłych, dzieci i rodzin.',
        seo: {
          metaTitle: 'Michał Jaworski – Założyciel Pantera, Instruktor Krav Maga | Warszawa',
          metaDescription:
            'Michał Jaworski – założyciel Pantera Family & Sport Club, instruktor United Krav Maga i czarny pas Aikido od 1997 r. Zajęcia dla dorosłych, dzieci i rodzin na Mokotowie.',
        },
        bio: 'Założyciel Pantera Family & Sport Club i instruktor United Krav Maga World Organization. Sztuki walki zgłębia od 1991 roku – czarny pas Aikido uzyskał w 1997 roku, co daje mu unikalne spojrzenie na kontrolę i dźwignie w samoobronie. Od ponad dwóch dekad uczy, jak dbać o bezpieczeństwo siebie i bliskich, a od 2004 roku prowadzi autorskie zajęcia dla dzieci oparte na mocie „Bystry i Dzielny". Wierzy, że najlepszą obroną jest unikanie konfliktu – ale gdy dyplomacja zawiedzie, uczy reagować bez kompromisów.',
        achievements: [
          { text: 'Założyciel Pantera Family & Sport Club (Sadyba, Warszawa)' },
          { text: 'Certyfikowany instruktor United Krav Maga World Organization' },
          { text: 'Czarny pas Aikido (od 1997 roku)' },
          { text: 'Praktyk sztuk walki od 1991 roku' },
          { text: 'Prowadzenie zajęć dla dzieci i młodzieży od 2004 roku' },
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
        specialization: 'KARATE KYOKUSHIN / 3 DAN',
        excerpt: 'Sensei 3 DAN, sędzia międzynarodowy i trener karate od 1999 roku. Wychowuje charaktery przez dyscyplinę, precyzję i uczciwą rywalizację.',
        seo: {
          metaTitle: 'Tomasz Lewkowicz – 3 DAN, Sędzia Międzynarodowy Karate | Pantera Warszawa',
          metaDescription:
            'Tomasz Lewkowicz – 3 DAN Karate Kyokushin, sędzia międzynarodowy, trener dzieci i dorosłych od 2010 roku. Karate w Panterze na Sadybie, Warszawa.',
        },
        bio: 'Rocznik 1987. Karate trenuje od 1999 roku – zaczynał w Suwalskim Klubie Karate Kyokushin pod okiem Sensei Dariusza Anuszkiewicza, a następnie Shihan Marka Krejpcio. Wielokrotny medalista turniejów ogólnopolskich w kata i kumite w kategoriach młodzieżowych i seniorskich. Od 2010 roku prowadzi zajęcia dla dzieci, młodzieży i dorosłych na wszystkich poziomach zaawansowania. W 2014 roku przeniósł się do Warszawy, gdzie kontynuuje drogę trenerską. Stawia na ciągłe doskonalenie, równowagę ciała i umysłu oraz uczciwą rywalizację.',
        achievements: [
          { text: '3 DAN Karate Kyokushin' },
          { text: 'Wielokrotny medalista turniejów ogólnopolskich (kata i kumite)' },
          { text: 'Sędzia Międzynarodowy w karate' },
          { text: 'Przewodniczący Komisji Sędziowskiej OZK Województwa Mazowieckiego (od 2019)' },
          { text: 'Trener dzieci, młodzieży i dorosłych od 2010 roku' },
          { text: 'Absolwent Wyższej Szkoły Wychowania Fizycznego i Turystyki w Białymstoku' },
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
        specialization: 'TAI CHI CHUAN',
        excerpt: 'Instruktor Tai Chi Chuan prowadzący zajęcia w małych grupach (do 8 osób). Łączy tradycję z pracą nad kręgosłupem, oddechem i redukcją stresu.',
        seo: {
          metaTitle: 'Janusz Żuchowski – Instruktor Tai Chi | Pantera Warszawa Mokotów',
          metaDescription:
            'Janusz Żuchowski – instruktor Tai Chi Chuan w Panterze na Sadybie. Zajęcia dla dorosłych i seniorów: świadomość ciała, oddech, redukcja stresu. Grupy do 8 osób.',
        },
        bio: 'Instruktor Tai Chi Chuan – stylu wewnętrznego łączącego elementy sztuk walki (uderzenia i bloki) z pracą nad zdrowiem i świadomością ciała. Prowadzi zajęcia w małych grupach (do 8 osób), skupiając się na poprawnej postawie, świadomym oddechu, koncentracji i płynności ruchu. Jego treningi pomagają odejść od nawykowego pośpiechu i odnaleźć równowagę ciała z umysłem – dostępne dla dorosłych na każdym poziomie, niezależnie od kondycji wyjściowej.',
        achievements: [
          { text: 'Instruktor Tai Chi Chuan – styl wewnętrzny' },
          { text: 'Zajęcia w małych grupach (limit 8 osób)' },
          { text: 'Specjalista wzmacniania mięśni, ścięgien i mobilności stawów' },
          { text: 'Praca z dorosłymi i seniorami na każdym poziomie zaawansowania' },
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
