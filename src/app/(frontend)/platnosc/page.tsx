import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import PlatnoscForm from './PlatnoscForm'
import './platnosc.css'

export default async function PlatnoscPage() {
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
  } catch {
    // fallback
  }

  return (
    <>
      <Navbar data={navData} />
      <main>
        <section className="pay-hero">
          <p className="pay-hero__eyebrow">Pantera FSC</p>
          <h1 className="pay-hero__title">Płatność online</h1>
          <p className="pay-hero__subtitle">
            Opłać karnet, zajęcia lub inne zobowiązanie wygodnie przez internet.
          </p>
        </section>

        <section className="pay-section">
          <div className="pay-container">
            <PlatnoscForm />

            <div className="pay-info">
              <div className="pay-info__card">
                <p className="pay-info__title">Jak to działa?</p>
                <ol className="pay-info__steps">
                  <li>Wpisz kwotę i opisz za co płacisz</li>
                  <li>Podaj swoje dane kontaktowe</li>
                  <li>Zostaniesz przekierowany do bezpiecznej bramki tpay</li>
                  <li>Po płatności otrzymasz potwierdzenie na e-mail</li>
                </ol>
              </div>
              <div className="pay-info__card">
                <p className="pay-info__title">Masz pytania?</p>
                <p className="pay-info__text">
                  Zadzwoń lub napisz do nas, a chętnie pomożemy ustalić właściwą kwotę.
                </p>
                <a href="/kontakt" className="pay-info__link">Skontaktuj się →</a>
              </div>
              <div className="pay-info__secure">
                <span className="pay-info__secure-icon material-symbols-outlined">lock</span>
                <span>Płatność obsługiwana przez <strong>tpay.com</strong> — certyfikowane centrum płatności</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
