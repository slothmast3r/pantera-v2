import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Tekst sformatowany', plural: 'Teksty sformatowane' },
  fields: [
    {
      name: 'content',
      label: 'Treść',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
  ],
}
