import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

// Revalidate the entire site layout (all pages)
function revalidateAll() {
  revalidatePath('/', 'layout')
}

// ── Collections ──────────────────────────────────────────────

export const revalidateClasses: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/zajecia', 'layout')
  if (doc?.slug) revalidatePath(`/zajecia/${doc.slug}`)
  return doc
}

export const revalidateClassesOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/zajecia', 'layout')
  return doc
}

export const revalidateOffers: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/oferta', 'layout')
  if (doc?.slug) revalidatePath(`/oferta/${doc.slug}`)
  return doc
}

export const revalidateOffersOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/oferta', 'layout')
  return doc
}

export const revalidateInstructors: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/')
  revalidatePath('/o-nas')
  if (doc?.slug) revalidatePath(`/kadra/${doc.slug}`)
  return doc
}

export const revalidateInstructorsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/')
  revalidatePath('/o-nas')
  return doc
}

export const revalidateTestimonials: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/')
  return doc
}

export const revalidateTestimonialsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/')
  return doc
}

export const revalidateEvents: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath('/grafik')
  return doc
}

export const revalidateEventsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/grafik')
  return doc
}

export const revalidatePages: CollectionAfterChangeHook = ({ doc }) => {
  if (doc?.slug === 'home') revalidatePath('/')
  else if (doc?.slug) revalidatePath(`/${doc.slug}`)
  return doc
}

// ── Globals ───────────────────────────────────────────────────

export const revalidateGlobalAll: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateHomepage: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/')
  return doc
}

export const revalidateContact: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/kontakt')
  return doc
}

export const revalidateSchedule: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/grafik')
  return doc
}

export const revalidateAbout: GlobalAfterChangeHook = ({ doc }) => {
  revalidatePath('/o-nas')
  return doc
}
