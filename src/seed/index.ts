import { getPayload } from 'payload'
import config from '../payload.config'
import { deleteAll } from './helpers'
import { seedInstructors } from './instructors'
import { seedTestimonials } from './testimonials'
import { seedClasses } from './classes'
import { seedOffers } from './offers'
import { seedGlobals } from './globals'
import { seedSchedule } from './schedule'

export async function seed() {
  const payload = await getPayload({ config })

  console.log('Cleaning up existing data...')
  // Clear schedule entries first — they reference classes via a NOT NULL FK
  await payload.updateGlobal({ slug: 'schedule', data: { entries: [] } })
  await deleteAll(payload, 'classes')
  await deleteAll(payload, 'offers')
  await deleteAll(payload, 'pages')
  await deleteAll(payload, 'instructors')
  await deleteAll(payload, 'testimonials')

  const instructors = await seedInstructors(payload)
  await seedTestimonials(payload)
  await seedClasses(payload, instructors)
  await seedOffers(payload)
  await seedGlobals(payload)
  await seedSchedule(payload)

  console.log('\nSeed complete!')
  process.exit(0)
}
