import type { Block } from 'payload'

export const ContactCardBlock: Block = {
  slug: 'contactCard',
  labels: { singular: 'Karta kontaktowa', plural: 'Karty kontaktowe' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek karty',
      type: 'text',
      defaultValue: 'Kontakt w sprawie oferty',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'note',
      label: 'Dodatkowa notatka',
      type: 'text',
      admin: { description: 'Np. "Rezerwacje z wyprzedzeniem minimum 2 tygodnie."' },
    },
  ],
}
