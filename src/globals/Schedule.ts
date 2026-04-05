import type { GlobalConfig } from 'payload'

function validateTime(value: unknown) {
  if (typeof value !== 'string' || value === '') return true
  return /^\d{2}:\d{2}$/.test(value) || 'Format: GG:MM (np. 17:30)'
}

export const Schedule: GlobalConfig = {
  slug: 'schedule',
  label: 'Grafik zajęć',
  admin: { group: 'Strona główna' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Tytuł sekcji',
      type: 'text',
      defaultValue: 'Grafik Zajęć',
    },
    {
      name: 'subtitle',
      label: 'Podtytuł',
      type: 'text',
      defaultValue: 'Sprawdź aktualne godziny zajęć i znajdź termin dla siebie.',
    },
    {
      name: 'entries',
      label: 'Wpisy w grafiku',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/components/admin/ScheduleRowLabel',
        },
      },
      fields: [
        {
          name: 'class',
          label: 'Zajęcia',
          type: 'relationship',
          relationTo: 'classes',
          required: true,
        },
        {
          name: 'day',
          label: 'Dzień tygodnia',
          type: 'select',
          required: true,
          options: [
            { label: 'Poniedziałek', value: 'monday' },
            { label: 'Wtorek', value: 'tuesday' },
            { label: 'Środa', value: 'wednesday' },
            { label: 'Czwartek', value: 'thursday' },
            { label: 'Piątek', value: 'friday' },
            { label: 'Sobota', value: 'saturday' },
            { label: 'Niedziela', value: 'sunday' },
          ],
        },
        {
          name: 'startTime',
          label: 'Godzina rozpoczęcia',
          type: 'text',
          required: true,
          validate: validateTime,
          admin: {
            placeholder: '17:30',
            description: 'Format: GG:MM',
          },
        },
        {
          name: 'endTime',
          label: 'Godzina zakończenia',
          type: 'text',
          required: true,
          validate: validateTime,
          admin: {
            placeholder: '19:00',
            description: 'Format: GG:MM',
          },
        },
        {
          name: 'ageRange',
          label: 'Przedział wiekowy',
          type: 'text',
          admin: {
            description: 'Np. "4–6 lat", "7–10 lat", "11–14 lat". Wypełnij dla zajęć dla dzieci i młodzieży (poniżej 18 lat).',
            placeholder: '7–10 lat',
          },
        },
        {
          name: 'notes',
          label: 'Uwagi',
          type: 'text',
          admin: {
            placeholder: 'Np. "po wcześniejszej rezerwacji"',
          },
        },
      ],
    },
  ],
}
