export const revalidate = 300

import Link from 'next/link'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import '../platnosc.css'

export default async function PlatnoscBladPage() {
  let navData = null
  let footerData = null
  try {
    const payload = await getPayload({ config })
    const [nav, footer] = await Promise.all([
      payload.findGlobal({ slug: 'navigation', depth: 1 }),
      payload.findGlobal({ slug: 'footer', depth: 1 }),
    ])
    navData = nav
    footerData = footer
  } catch {}

  return (
    <>
      <Navbar data={navData} />
      <main>
        <section className="platnosc-status">
          <div className="platnosc-status__icon platnosc-status__icon--error">
            <span className="material-symbols-outlined">cancel</span>
          </div>
          <h1 className="platnosc-status__title">Płatność nieudana</h1>
          <p className="platnosc-status__text">
            Coś poszło nie tak. Możesz spróbować ponownie lub skontaktować się z nami.
          </p>
          <div className="platnosc-status__actions">
            <Link href="/platnosc" className="platnosc-status__btn">
              Spróbuj ponownie
            </Link>
            <Link href="/kontakt" className="platnosc-status__btn platnosc-status__btn--outline">
              Kontakt
            </Link>
          </div>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
