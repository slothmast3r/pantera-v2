import type { Media } from '@/payload-types'

type ImageSize = 'thumbnail' | 'card' | 'hero'

/**
 * Returns the URL for a specific pre-generated image size.
 * Falls back to the original URL if the requested size isn't available.
 */
export function getImageUrl(
  img: (number | null | undefined) | Media,
  size: ImageSize = 'card',
): string | null {
  if (!img || typeof img === 'number') return null
  const media = img as Media
  return media.sizes?.[size]?.url ?? media.url ?? null
}
