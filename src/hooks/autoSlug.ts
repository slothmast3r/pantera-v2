import type { CollectionBeforeChangeHook } from 'payload'

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Auto-generates slug from a source field (e.g. 'title' or 'name') if slug is empty.
 */
export function autoSlug(sourceField: string): CollectionBeforeChangeHook {
  return ({ data, operation }) => {
    if (data && !data.slug && data[sourceField] && operation === 'create') {
      data.slug = slugify(data[sourceField])
    }
    return data
  }
}
