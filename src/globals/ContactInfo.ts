import { revalidateContact } from '../hooks/revalidate'
import type { GlobalConfig } from 'payload'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'Dane kontaktowe',
  admin: { group: 'Wygląd' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'address',
      label: 'Adres',
      type: 'text',
      admin: { placeholder: 'ul. Powsińska 25, Warszawa, Mokotów (Sadyba)' },
    },
    {
      name: 'addressLink',
      label: 'Link do mapy (Google Maps)',
      type: 'text',
      admin: {
        description: 'Link otwierający Google Maps w nowej karcie.',
        placeholder: 'https://maps.google.com/?q=Powsinska+25+Warszawa',
      },
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
      admin: { placeholder: '508 689 718' },
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
      admin: { placeholder: 'kontakt@pantera.waw.pl' },
    },
    {
      name: 'hours',
      label: 'Godziny otwarcia',
      type: 'text',
      admin: { placeholder: 'Pon–Pt: 15:00–21:00 | Sob: 9:00–14:00' },
    },
    {
      name: 'mapEmbedUrl',
      label: 'URL mapy (iframe embed)',
      type: 'text',
      admin: {
        description: 'URL do osadzenia mapy Google Maps jako iframe na stronie Kontakt.',
        placeholder: 'https://maps.google.com/maps?q=Powsi%C5%84ska+25+Warszawa&output=embed&hl=pl&z=16',
      },
    },
  ],
}
