import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Safely calls revalidatePath, catching errors if called outside of a Next.js context
 * (e.g., during database seeding or standalone scripts).
 */
function safeRevalidate(path: string, type?: 'page' | 'layout') {
  try {
    revalidatePath(path, type)
  } catch (error) {
    // Silently ignore errors during seeding/standalone runs
    // Invariant: static generation store missing is expected here
  }
}

// Revalidate the entire site layout (all pages)
function revalidateAll() {
  safeRevalidate('/', 'layout')
}

// ── Collections ──────────────────────────────────────────────

export const revalidateClasses: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/zajecia', 'layout')
  if (doc?.slug) safeRevalidate(`/zajecia/${doc.slug}`)
  return doc
}

export const revalidateClassesOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/zajecia', 'layout')
  return doc
}

export const revalidateOffers: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/oferta', 'layout')
  if (doc?.slug) safeRevalidate(`/oferta/${doc.slug}`)
  return doc
}

export const revalidateOffersOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/oferta', 'layout')
  return doc
}

export const revalidateInstructors: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/')
  safeRevalidate('/o-nas')
  if (doc?.slug) safeRevalidate(`/instruktor/${doc.slug}`)
  return doc
}

export const revalidateInstructorsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/')
  safeRevalidate('/o-nas')
  return doc
}

export const revalidateTestimonials: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}

export const revalidateTestimonialsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}

export const revalidateEvents: CollectionAfterChangeHook = ({ doc }) => {
  safeRevalidate('/grafik')
  return doc
}

export const revalidateEventsOnDelete: CollectionAfterDeleteHook = ({ doc }) => {
  safeRevalidate('/grafik')
  return doc
}

export const revalidatePages: CollectionAfterChangeHook = ({ doc }) => {
  if (doc?.slug === 'home') safeRevalidate('/')
  else if (doc?.slug) safeRevalidate(`/${doc.slug}`)
  return doc
}

// ── Globals ───────────────────────────────────────────────────

export const revalidateGlobalAll: GlobalAfterChangeHook = ({ doc }) => {
  revalidateAll()
  return doc
}

export const revalidateHomepage: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate('/')
  return doc
}

export const revalidateContact: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate('/kontakt')
  return doc
}

export const revalidateSchedule: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate('/grafik')
  return doc
}

export const revalidateAbout: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate('/o-nas')
  return doc
}
