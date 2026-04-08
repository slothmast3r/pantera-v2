import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      links: [
        {
          label: 'O nas',
          href: '/o-nas',
          subLinks: [
            { label: 'O nas', href: '/o-nas' },
            { label: 'Instruktorzy', href: '/o-nas#instruktorzy' },
            { label: 'Regulamin', href: '/regulamin' },
          ],
        },
        {
          label: 'Zajęcia',
          href: '/zajecia',
          subLinks: [
            { label: 'Krav Maga', href: '/zajecia/krav-maga' },
            { label: 'Karate', href: '/zajecia/karate' },
            { label: 'Power Training', href: '/zajecia/power-training' },
            { label: 'Tai Chi', href: '/zajecia/tai-chi' },
            { label: 'Indywidualne', href: '/zajecia/indywidualne' },
            { label: 'Strzelectwo ASG', href: '/zajecia/asg' },
            { label: 'Krav Maga Kids', href: '/zajecia/krav-maga-dzieci' },
            { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
          ],
        },
        {
          label: 'Oferta',
          href: '/oferta',
          subLinks: [
            { label: 'Dla Firm', href: '/oferta/dla-firm' },
            { label: 'Dla Szkół', href: '/oferta/dla-szkol' },
            { label: 'Warsztaty Rodzinne', href: '/oferta/warsztaty-rodzinne' },
            { label: 'Urodziny na Sportowo', href: '/oferta/urodziny' },
          ],
        },
        { label: 'Grafik', href: '/grafik' },
        { label: 'Płatność', href: '/platnosc' },
      ],
    },
  })
  console.log('Navigation updated')

  const footerGlobal = await payload.findGlobal({ slug: 'footer', depth: 0 })
  const cols: any[] = (footerGlobal.columns as any[]) ?? []
  const klubCol = cols.find((c) => c.heading === 'Klub')
  if (klubCol && !klubCol.links?.some((l: any) => l.href === '/platnosc')) {
    const grafIdx = klubCol.links?.findIndex((l: any) => l.href === '/grafik') ?? -1
    if (grafIdx >= 0) {
      klubCol.links.splice(grafIdx + 1, 0, { label: 'Płatność online', href: '/platnosc' })
    }
    await payload.updateGlobal({ slug: 'footer', data: { columns: cols } })
    console.log('Footer updated')
  } else {
    console.log('Footer: already up to date')
  }

  process.exit(0)
}

main().catch((err) => { console.error(err); process.exit(1) })
