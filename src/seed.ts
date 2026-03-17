import 'dotenv/config'
import { seed } from './seed/index'

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
