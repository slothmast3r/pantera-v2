/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
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
      subtitle: 'Sprawdź aktualne godziny zajęć. Zajęcia indywidualne (Boks, Samoobrona, Krav Maga, Aikido): tel. 508 689 718.',
      entries: [
        // ── Poniedziałek ──────────────────────────────
        e('krav-maga-dzieci', 'monday',    '16:30', '17:15', { ageRange: '7–9 lat' }),
        e('krav-maga-dzieci', 'monday',    '17:15', '18:00', { ageRange: '10–13 lat' }),
        e('krav-maga-dzieci', 'monday',    '18:00', '18:45', { ageRange: '14–16 lat' }),
        e('krav-maga',        'monday',    '18:45', '19:45', { notes: 'grupa początkująca' }),
        e('krav-maga',        'monday',    '19:45', '20:45', { notes: 'grupa zaawansowana' }),

        // ── Wtorek ────────────────────────────────────
        e('karate-dzieci',    'tuesday',   '16:30', '17:15', { ageRange: '6–7 lat', notes: 'początkujący' }),
        e('karate-dzieci',    'tuesday',   '17:15', '18:00', { ageRange: '6–7 lat', notes: 'zaawansowani' }),
        e('karate-dzieci',    'tuesday',   '18:00', '18:45', { ageRange: '8–14 lat', notes: 'początkujący' }),
        e('karate-dzieci',    'tuesday',   '18:45', '19:30', { ageRange: '8–14 lat', notes: 'zaawansowani' }),
        e('karate',           'tuesday',   '19:30', '20:30'),
        e('karate',           'tuesday',   '20:30', '21:30'),

        // ── Środa ─────────────────────────────────────
        e('krav-maga-dzieci', 'wednesday', '16:30', '17:15', { ageRange: '7–9 lat' }),
        e('krav-maga-dzieci', 'wednesday', '17:15', '18:00', { ageRange: '10–13 lat' }),
        e('krav-maga-dzieci', 'wednesday', '18:00', '18:45', { ageRange: '14–16 lat' }),
        e('krav-maga',        'wednesday', '18:45', '19:45', { notes: 'grupa początkująca' }),
        e('krav-maga',        'wednesday', '19:45', '20:45', { notes: 'grupa zaawansowana' }),

        // ── Czwartek ──────────────────────────────────
        e('karate-dzieci',    'thursday',  '16:30', '17:15', { ageRange: '6–7 lat', notes: 'początkujący' }),
        e('karate-dzieci',    'thursday',  '17:15', '18:00', { ageRange: '6–7 lat', notes: 'zaawansowani' }),
        e('karate-dzieci',    'thursday',  '18:00', '18:45', { ageRange: '8–14 lat', notes: 'początkujący' }),
        e('karate-dzieci',    'thursday',  '18:45', '19:30', { ageRange: '8–14 lat', notes: 'zaawansowani' }),
        e('karate',           'thursday',  '19:30', '20:30'),
        e('karate',           'thursday',  '20:30', '21:30'),

        // ── Piątek ────────────────────────────────────
        e('asg',              'friday',    '18:00', '20:00', { notes: 'Dla uczestników którzy zaliczyli lekcje INTRO' }),
        e('tai-chi',          'friday',    '20:00', '21:00', { notes: 'dorośli' }),

        // ── Sobota ────────────────────────────────────
        e('indywidualne',     'saturday',  '14:00', '20:00', { notes: 'Informacje: tel. 508 689 718' }),

        // ── Niedziela ──────────────────────────────────
        e('indywidualne',     'sunday',    '14:00', '20:00', { notes: 'Informacje: tel. 508 689 718' }),
      ].filter((entry) => entry.class != null), // skip entries where class wasn't found
    },
  })

  console.log('Updated schedule global')
}
