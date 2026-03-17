import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'map',
  labels: { singular: 'Mapa', plural: 'Mapy' },
  fields: [
    {
      name: 'embedUrl',
      label: 'URL osadzenia Google Maps',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      label: 'Adres (wyświetlany pod mapą)',
      type: 'text',
    },
  ],
}
