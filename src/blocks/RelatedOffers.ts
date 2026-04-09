import type { Block } from 'payload'

export const RelatedOffersBlock: Block = {
  slug: 'relatedOffers',
  labels: { singular: 'Powiązane oferty', plural: 'Powiązane oferty' },
  fields: [
    {
      name: 'heading',
      label: 'Nagłówek sekcji',
      type: 'text',
      defaultValue: 'Może Cię zainteresować',
    },
    {
      name: 'offers',
      label: 'Oferty',
      type: 'relationship',
      relationTo: 'offers',
      hasMany: true,
      maxRows: 3,
      required: true,
    },
  ],
}
