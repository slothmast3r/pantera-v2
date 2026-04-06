import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Classes } from './collections/Classes'
import { Instructors } from './collections/Instructors'
import { Testimonials } from './collections/Testimonials'
import { Events } from './collections/Events'
import { FAQ } from './collections/FAQ'
import { Offers } from './collections/Offers'

import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'
import { Schedule } from './globals/Schedule'
import { HomepageServices } from './globals/HomepageServices'
import { HomepagePricing } from './globals/HomepagePricing'
import { ContactInfo } from './globals/ContactInfo'
import { AnalyticsSettings } from './globals/AnalyticsSettings'
import { AboutGallery } from './globals/AboutGallery'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/admin/DashboardStats'],
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        switch (collectionConfig?.slug) {
          case 'offers': return `${SITE_URL}/oferta/${data.slug}`
          case 'classes': return `${SITE_URL}/zajecia/${data.slug}`
          case 'pages': return data.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${data.slug}`
          default: return SITE_URL
        }
      },
      collections: ['offers', 'pages', 'classes'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, Pages, Classes, Instructors, Testimonials, Events, FAQ, Offers],
  globals: [
    Navigation,
    Footer,
    Schedule,
    HomepageServices,
    HomepagePricing,
    ContactInfo,
    AnalyticsSettings,
    AboutGallery,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
