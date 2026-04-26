import type { DisplayEntry } from '@/lib/scheduleUtils'

export const STATIC_SCHEDULE_FALLBACK: DisplayEntry[] = [
  // Poniedziałek
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'monday', startTime: '16:30', endTime: '17:15', ageRange: '7–9 lat', notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'monday', startTime: '17:15', endTime: '18:00', ageRange: '10–13 lat', notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'monday', startTime: '18:00', endTime: '18:45', ageRange: '14–16 lat', notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'monday', startTime: '18:45', endTime: '19:45', ageRange: null, notes: 'grupa początkująca' },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'monday', startTime: '19:45', endTime: '20:45', ageRange: null, notes: 'grupa zaawansowana' },
  // Wtorek
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'tuesday', startTime: '16:30', endTime: '17:15', ageRange: '6–7 lat', notes: 'początkujący' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'tuesday', startTime: '17:15', endTime: '18:00', ageRange: '6–7 lat', notes: 'zaawansowani' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'tuesday', startTime: '18:00', endTime: '18:45', ageRange: '8–14 lat', notes: 'początkujący' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'tuesday', startTime: '18:45', endTime: '19:30', ageRange: '8–14 lat', notes: 'zaawansowani' },
  { cls: { title: 'Karate', slug: 'karate', type: 'karate' }, day: 'tuesday', startTime: '19:30', endTime: '20:30', ageRange: null, notes: null },
  { cls: { title: 'Karate', slug: 'karate', type: 'karate' }, day: 'tuesday', startTime: '20:30', endTime: '21:30', ageRange: null, notes: null },
  // Środa
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'wednesday', startTime: '16:30', endTime: '17:15', ageRange: '7–9 lat', notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'wednesday', startTime: '17:15', endTime: '18:00', ageRange: '10–13 lat', notes: null },
  { cls: { title: 'Krav Maga Kids', slug: 'krav-maga-dzieci', type: 'krav-maga' }, day: 'wednesday', startTime: '18:00', endTime: '18:45', ageRange: '14–16 lat', notes: null },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'wednesday', startTime: '18:45', endTime: '19:45', ageRange: null, notes: 'grupa początkująca' },
  { cls: { title: 'Krav Maga', slug: 'krav-maga', type: 'krav-maga' }, day: 'wednesday', startTime: '19:45', endTime: '20:45', ageRange: null, notes: 'grupa zaawansowana' },
  // Czwartek
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'thursday', startTime: '16:30', endTime: '17:15', ageRange: '6–7 lat', notes: 'początkujący' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'krav-maga' }, day: 'thursday', startTime: '17:15', endTime: '18:00', ageRange: '6–7 lat', notes: 'zaawansowani' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'thursday', startTime: '18:00', endTime: '18:45', ageRange: '8–14 lat', notes: 'początkujący' },
  { cls: { title: 'Karate Dzieci', slug: 'karate-dzieci', type: 'karate' }, day: 'thursday', startTime: '18:45', endTime: '19:30', ageRange: '8–14 lat', notes: 'zaawansowani' },
  { cls: { title: 'Karate', slug: 'karate', type: 'karate' }, day: 'thursday', startTime: '19:30', endTime: '20:30', ageRange: null, notes: null },
  { cls: { title: 'Karate', slug: 'karate', type: 'karate' }, day: 'thursday', startTime: '20:30', endTime: '21:30', ageRange: null, notes: null },
  // Piątek
  { cls: { title: 'Dynamiczne Strzelectwo ASG', slug: 'asg', type: 'asg' }, day: 'friday', startTime: '18:00', endTime: '20:00', ageRange: null, notes: 'Dla uczestników którzy zaliczyli lekcje INTRO' },
  { cls: { title: 'Tai Chi', slug: 'tai-chi', type: 'tai-chi' }, day: 'friday', startTime: '20:00', endTime: '21:00', ageRange: null, notes: 'dorośli' },
  // Sobota
  { cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' }, day: 'saturday', startTime: '14:00', endTime: '20:00', ageRange: null, notes: 'Informacje: tel. 508 689 718' },
  // Niedziela
  { cls: { title: 'Treningi Indywidualne', slug: 'indywidualne', type: 'individual' }, day: 'sunday', startTime: '14:00', endTime: '20:00', ageRange: null, notes: 'Informacje: tel. 508 689 718' },
]
