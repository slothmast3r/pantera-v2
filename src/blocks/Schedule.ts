import type { Block } from 'payload'

export const ScheduleBlock: Block = {
  slug: 'schedule',
  labels: { singular: 'Grafik', plural: 'Grafiki' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'embedCode',
      label: 'Kod osadzenia (np. z BookingSystem / Timify)',
      type: 'textarea',
    },
    {
      name: 'entries',
      label: 'Wpisy grafiku',
      type: 'array',
      fields: [
        {
          name: 'dayOfWeek',
          label: 'Dzień tygodnia',
          type: 'select',
          options: [
            { label: 'Poniedziałek', value: 'monday' },
            { label: 'Wtorek', value: 'tuesday' },
            { label: 'Środa', value: 'wednesday' },
            { label: 'Czwartek', value: 'thursday' },
            { label: 'Piątek', value: 'friday' },
            { label: 'Sobota', value: 'saturday' },
            { label: 'Niedziela', value: 'sunday' },
          ],
          required: true,
        },
        { name: 'time', label: 'Godzina (np. "18:00–19:30")', type: 'text', required: true },
        {
          name: 'className',
          label: 'Zajęcia',
          type: 'relationship',
          relationTo: 'classes',
        },
        {
          name: 'instructor',
          label: 'Instruktor',
          type: 'relationship',
          relationTo: 'instructors',
        },
        { name: 'location', label: 'Sala / Lokalizacja', type: 'text' },
      ],
    },
  ],
}
