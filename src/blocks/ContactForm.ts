import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  labels: { singular: 'Formularz Kontaktowy', plural: 'Formularze Kontaktowe' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Opis',
      type: 'textarea',
    },
    {
      name: 'successMessage',
      label: 'Wiadomość po wysłaniu',
      type: 'text',
      defaultValue: 'Dziękujemy! Skontaktujemy się wkrótce.',
    },
    {
      name: 'recipientEmail',
      label: 'Email odbiorcy',
      type: 'email',
    },
  ],
}
