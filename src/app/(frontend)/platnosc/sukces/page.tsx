import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import '../platnosc.css'

export default async function PlatnoscSukcesPage() {
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
        <section className="pay-result pay-result--success">
          <div className="pay-result__icon"><span className="material-symbols-outlined">check_circle</span></div>
          <h1 className="pay-result__title">Płatność zakończona sukcesem!</h1>
          <p className="pay-result__text">
            Dziękujemy za wpłatę. Potwierdzenie zostało wysłane na podany adres e-mail.
          </p>
          <a href="/" className="pay-result__btn">Wróć na stronę główną</a>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
