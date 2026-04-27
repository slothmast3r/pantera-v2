import { getPayload } from 'payload'

export async function seedTestimonials(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding testimonials...')
  await Promise.all([
    payload.create({
      collection: 'testimonials',
      data: { author: 'Bazyli Holewa', rating: 5, isFeatured: true, content: 'Trenuję Krav Mage od kilku lat w Pantera. Treningi są ciekawe i pozwalają utrzymać się w bardzo dobrej formie. Polecam zajęcia na pierwszy trening, potem ciężko przestać.' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Maciej Kuczera', rating: 5, isFeatured: true, content: 'Zajęcia z Krav Maga prowadzone tak, że w każdej chwili można dołączyć, a jednocześnie nie są nudne dla bardziej doświadczonych. Trener wszystko pokazuje krok po kroku, poprawia w trakcie i dba, żeby zajęcia były maksymalnie bezpieczne. Poza techniką walki, jest też sporo ruchu. Dla mnie perfekcyjnie prowadzone. Polecam :)' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Kamil Pietrowicz', rating: 5, isFeatured: true, content: 'Trafiłem do klubu przez przypadek. Wstępnie przyszedłem na pierwszy darmowy trening. I tak właśnie wpadłem :) W czerwcu minął mi 10 miesięcy jak trenuję…' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Karolina', rating: 5, isFeatured: true, content: 'Do Pantery chodzę na zajęcia tai-chi. Super prowadzący i atmosfera na zajęciach. Atrakcyjne ceny zajęć. Polecam.' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Paweł Osiecki', rating: 5, isFeatured: true, content: 'Genialna szkoła walki. Trenerzy sympatyczni, bardzo pomocni. Atmosfera na zajęciach swobodna. Idealny sposób na oderwanie się od codzienności i wyładowanie emocji.' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Michał Kulesza', rating: 3, isFeatured: true, content: 'Ludzie z pasją i doskonałym podejściem zarówno do początkujących jak i średnio zaawansowanych. Zajęcia dla dzieci są wyjątkowe. Trochę zbyt mała sala… trudno ponieść cały entuzjazm :)' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Piotr Zaręba', rating: 5, isFeatured: true, content: 'Polecam, zwłaszcza dla dzieci i rodziców (również razem na jednych zajęciach ze starszymi dziećmi).' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Emilia Zwolińska', rating: 5, isFeatured: true, content: 'Super zajęcia z samoobrony Krav maga. Rzetelni i wymagający instruktorzy z mega doświadczeniem. Polecam…' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Marios Maragos', rating: 5, isFeatured: true, content: '2nd year training KM at PANTERA. Trainer is professional and genuinely cares about motivating his students and transmitting his knowledge. Superb job.' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Darek Ulejczyk', rating: 5, isFeatured: true, content: 'Wszystko się zgadza – trener, ekipa, miejsce. Polecam!' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Al Pacino', rating: 5, isFeatured: true, content: 'nic więcej nie powiem bo dentysta drogi' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Lord Fris', rating: 5, isFeatured: true, content: 'Bardzo fajne lekcje i można się dużo nauczyć. Polecam! 👊' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Marcin M', rating: 4, isFeatured: true, content: 'Zaangażowani trenerzy, świetne zajęcia, kameralna atmosfera :)' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Maciek Goszcząński', rating: 5, isFeatured: true, content: 'Super sala treningowa z szatnią' },
    }),
    payload.create({
      collection: 'testimonials',
      data: { author: 'Aneta Czaus', rating: 5, isFeatured: true, content: 'Mój syn jest zachwycony zajęciami Krav Magi dla dzieci.' },
    }),
  ])
  console.log('Created 15 testimonials')
}
