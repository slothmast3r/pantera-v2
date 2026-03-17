import { getPayload } from 'payload'

export async function seedSchedule(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding schedule global...')

  // Fetch all seeded classes to get their IDs
  const all = await payload.find({ collection: 'classes', limit: 50, depth: 0 })
  const bySlug = Object.fromEntries(all.docs.map((c: any) => [c.slug, c]))

  const id = (slug: string) => bySlug[slug]?.id
  type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  const e = (cls: string, day: Day, startTime: string, endTime: string, extra?: { ageRange?: string; notes?: string }) => ({
    class: id(cls), day, startTime, endTime, ...extra,
  })

  await payload.updateGlobal({
    slug: 'schedule',
    data: {
      title: 'Grafik Zajęć',
      subtitle: 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.',
      entries: [
        // ── Poniedziałek ──────────────────────────────
        e('krav-maga-dzieci', 'monday',    '17:00', '18:00', { ageRange: '7–10 lat' }),
        e('krav-maga',        'monday',    '18:00', '19:30'),
        e('karate',           'monday',    '19:30', '21:00'),

        // ── Wtorek ────────────────────────────────────
        e('karate-dzieci',    'tuesday',   '16:30', '17:30', { ageRange: '7–12 lat' }),
        e('power-training',   'tuesday',   '18:00', '19:30'),

        // ── Środa ─────────────────────────────────────
        e('krav-maga-dzieci', 'wednesday', '16:00', '17:00', { ageRange: '4–6 lat' }),
        e('krav-maga-dzieci', 'wednesday', '17:00', '18:00', { ageRange: '11–14 lat' }),
        e('krav-maga',        'wednesday', '18:00', '19:30'),

        // ── Czwartek ──────────────────────────────────
        e('karate-dzieci',    'thursday',  '17:00', '18:00', { ageRange: '7–12 lat' }),
        e('tai-chi',          'thursday',  '18:30', '20:00'),
        e('power-training',   'thursday',  '20:00', '21:00'),

        // ── Piątek ────────────────────────────────────
        e('krav-maga',        'friday',    '17:00', '18:30'),
        e('asg',              'friday',    '18:30', '19:30', { notes: 'po wcześniejszej rezerwacji' }),

        // ── Sobota ────────────────────────────────────
        e('karate-dzieci',    'saturday',  '10:00', '11:30', { ageRange: '7–12 lat' }),
        e('karate',           'saturday',  '11:30', '13:00'),
        e('krav-maga',        'saturday',  '13:00', '14:30'),
        e('tai-chi',          'saturday',  '14:30', '15:30'),
      ].filter((entry) => entry.class != null), // skip entries where class wasn't found
    },
  })

  console.log('Updated schedule global')
}
