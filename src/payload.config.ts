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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Classes, Instructors, Testimonials, Events, FAQ, Offers],
  globals: [Navigation, Footer, Schedule, HomepageServices, HomepagePricing, ContactInfo],
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
