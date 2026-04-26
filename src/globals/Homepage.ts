import type { GlobalConfig } from 'payload'
import { revalidateHomepage } from '../hooks/revalidate'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Strona główna',
  admin: { group: 'Komponenty' },
  hooks: { afterChange: [revalidateHomepage] },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Zalety',
          fields: [
            {
              name: 'benefits',
              type: 'group',
              label: 'Sekcja „Dlaczego Pantera?"',
              fields: [
                {
                  name: 'items',
                  label: 'Zalety',
                  type: 'array',
                  minRows: 1,
                  maxRows: 8,
                  fields: [
                    {
                      name: 'icon',
                      label: 'Ścieżka ikony (np. /icons/shield.svg)',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'title',
                      label: 'Tytuł',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'Opis',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Zajęcia',
          fields: [
            {
              name: 'classes',
              type: 'group',
              label: 'Karty kategorii zajęć',
              fields: [
                {
                  name: 'items',
                  label: 'Karty zajęć',
                  type: 'array',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    {
                      name: 'title',
                      label: 'Tytuł',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'Opis',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'href',
                      label: 'Link',
                      type: 'text',
                      required: true,
                      admin: { description: 'Np. /zajecia?filter=children' },
                    },
                    {
                      name: 'color',
                      label: 'Kolor tła (hex)',
                      type: 'text',
                      defaultValue: '#2a5298',
                      admin: { description: 'Używany gdy zdjęcie nie jest dostępne' },
                    },
                    {
                      name: 'image',
                      label: 'Zdjęcie tła',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'CTA',
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: 'Sekcja wezwania do działania',
              fields: [
                {
                  name: 'heading',
                  label: 'Nagłówek',
                  type: 'text',
                  defaultValue: 'Gotowy na pierwszy krok?',
                },
                {
                  name: 'subheading',
                  label: 'Podtytuł',
                  type: 'text',
                  defaultValue: 'Dołącz do setek zadowolonych klubowiczów. Pierwsze zajęcia są na nas!',
                },
                {
                  name: 'buttonLabel',
                  label: 'Tekst przycisku',
                  type: 'text',
                  defaultValue: 'Umów się na pierwsze zajęcia',
                },
                {
                  name: 'buttonHref',
                  label: 'Link przycisku',
                  type: 'text',
                  defaultValue: '/kontakt',
                },
                {
                  name: 'backgroundImage',
                  label: 'Zdjęcie tła',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
        {
          label: 'Usługi',
          fields: [
            {
              name: 'services',
              type: 'group',
              label: 'Usługi dodatkowe',
              fields: [
                {
                  name: 'sectionLabel',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  defaultValue: 'USŁUGI DODATKOWE',
                },
                {
                  name: 'sectionTitle',
                  label: 'Tytuł sekcji',
                  type: 'text',
                  defaultValue: 'Pantera to także:',
                },
                {
                  name: 'columns',
                  label: 'Liczba kart w rzędzie',
                  type: 'select',
                  defaultValue: '2',
                  options: [
                    { label: '2 karty', value: '2' },
                    { label: '3 karty', value: '3' },
                    { label: '4 karty', value: '4' },
                  ],
                },
                {
                  name: 'cards',
                  label: 'Karty',
                  type: 'array',
                  minRows: 1,
                  maxRows: 12,
                  fields: [
                    {
                      name: 'tag',
                      label: 'Tag / kategoria',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'title',
                      label: 'Tytuł',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'Opis',
                      type: 'textarea',
                      required: true,
                    },
                    {
                      name: 'ctaText',
                      label: 'Tekst przycisku',
                      type: 'text',
                      defaultValue: 'Sprawdź ofertę',
                    },
                    {
                      name: 'ctaUrl',
                      label: 'Link przycisku',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'color',
                      label: 'Kolor tła karty (hex)',
                      type: 'text',
                      defaultValue: '#2a5298',
                      admin: { description: 'Np. #2a5298, #8b0000, #1a6b3c' },
                    },
                    {
                      name: 'image',
                      label: 'Zdjęcie tła (opcjonalne)',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Cennik',
          fields: [
            {
              name: 'pricing',
              type: 'group',
              label: 'Cennik',
              fields: [
                {
                  name: 'sectionLabel',
                  label: 'Etykieta sekcji',
                  type: 'text',
                  defaultValue: 'CENNIK',
                },
                {
                  name: 'sectionTitle',
                  label: 'Tytuł sekcji',
                  type: 'text',
                  defaultValue: 'Cennik dopasowany do twoich potrzeb',
                },
                {
                  name: 'note',
                  label: 'Przypis pod cennikiem',
                  type: 'text',
                  defaultValue: '* Ceny mogą ulec zmianie. Skontaktuj się z nami po szczegóły.',
                },
                {
                  name: 'plans',
                  label: 'Plany cenowe',
                  type: 'array',
                  minRows: 1,
                  maxRows: 6,
                  fields: [
                    {
                      name: 'name',
                      label: 'Nazwa planu',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'price',
                      label: 'Cena (np. "250 zł" lub "Zapytaj o cenę")',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'period',
                      label: 'Okres (np. "/ mies. *")',
                      type: 'text',
                      admin: { description: 'Zostaw puste jeśli nie dotyczy' },
                    },
                    {
                      name: 'features',
                      label: 'Lista benefitów',
                      type: 'array',
                      minRows: 1,
                      fields: [
                        {
                          name: 'text',
                          label: 'Benefit',
                          type: 'text',
                          required: true,
                        },
                      ],
                    },
                    {
                      name: 'ctaText',
                      label: 'Tekst przycisku',
                      type: 'text',
                      defaultValue: 'Zapisz się',
                    },
                    {
                      name: 'ctaUrl',
                      label: 'Link przycisku',
                      type: 'text',
                      defaultValue: '/kontakt',
                    },
                    {
                      name: 'featured',
                      label: 'Wyróżniony plan (ciemne tło)',
                      type: 'checkbox',
                      defaultValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
