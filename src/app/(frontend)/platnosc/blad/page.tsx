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
        <section className="pay-result pay-result--error">
          <div className="pay-result__icon"><span className="material-symbols-outlined">cancel</span></div>
          <h1 className="pay-result__title">Płatność nieudana</h1>
          <p className="pay-result__text">
            Coś poszło nie tak. Możesz spróbować ponownie lub skontaktować się z nami.
          </p>
          <div className="pay-result__actions">
            <a href="/platnosc" className="pay-result__btn">Spróbuj ponownie</a>
            <a href="/kontakt" className="pay-result__btn pay-result__btn--outline">Kontakt</a>
          </div>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
