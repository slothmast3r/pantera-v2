import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pantera.waw.pl'

  let offersRes = { docs: [] as any[] }
  let classesRes = { docs: [] as any[] }
  let instructorsRes = { docs: [] as any[] }

  try {
    const payload = await getPayload({ config })
    ;[offersRes, classesRes, instructorsRes] = await Promise.all([
      payload.find({ collection: 'offers', limit: 1000, select: { slug: true, updatedAt: true }, pagination: false }),
      payload.find({ collection: 'classes', limit: 1000, select: { slug: true, updatedAt: true }, pagination: false }),
      payload.find({ collection: 'instructors', limit: 1000, select: { slug: true, updatedAt: true }, pagination: false }),
    ])
  } catch {
    // DB unavailable during build — return static routes only
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${SITE_URL}/o-nas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/kontakt`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/grafik`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/oferta`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/zajecia`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/platnosc`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/regulamin`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const dynamicOffers: MetadataRoute.Sitemap = (offersRes.docs || []).map((doc) => ({
    url: `${SITE_URL}/oferta/${doc.slug}`,
    lastModified: new Date(doc.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const dynamicClasses: MetadataRoute.Sitemap = (classesRes.docs || []).map((doc) => ({
    url: `${SITE_URL}/zajecia/${doc.slug}`,
    lastModified: new Date(doc.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const dynamicInstructors: MetadataRoute.Sitemap = (instructorsRes.docs || [])
    .filter((doc) => doc.slug)
    .map((doc) => ({
      url: `${SITE_URL}/instruktor/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  return [...staticRoutes, ...dynamicOffers, ...dynamicClasses, ...dynamicInstructors]
}
