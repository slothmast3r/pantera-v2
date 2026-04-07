export const revalidate = 300

import Link from 'next/link'
import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import PlatnoscForm from './PlatnoscForm'
import { Button } from '@/components/ui/Button'
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
        {/* HERO */}
        <section className="platnosc-hero">
          <div className="platnosc-hero__blob" />
          <div className="platnosc-hero__inner">
            <p className="platnosc-hero__eyebrow">Pantera FSC</p>
            <h1 className="platnosc-hero__title">Płatność online</h1>
            <p className="platnosc-hero__subtitle">
              Opłać karnet, zajęcia lub inne zobowiązanie wygodnie przez internet.
            </p>
          </div>
        </section>

        {/* MAIN */}
        <section className="platnosc-main">
          <div className="platnosc-grid">
            <PlatnoscForm />

            {/* SIDEBAR */}
            <aside className="platnosc-sidebar">
              <div className="platnosc-sidebar-card">
                <p className="platnosc-sidebar-card__title">Jak to działa?</p>
                <ol className="platnosc-sidebar-card__list">
                  {[
                    'Wpisz kwotę i opisz za co płacisz',
                    'Podaj swoje dane kontaktowe',
                    'Zostaniesz przekierowany do bezpiecznej bramki tpay',
                    'Po płatności otrzymasz potwierdzenie na e-mail',
                  ].map((step) => (
                    <li key={step} className="platnosc-sidebar-card__step">{step}</li>
                  ))}
                </ol>
              </div>

              <div className="platnosc-sidebar-card">
                <p className="platnosc-sidebar-card__title">Masz pytania?</p>
                <p className="platnosc-sidebar-card__step mb-2.5">
                  Zadzwoń lub napisz do nas, a chętnie pomożemy ustalić właściwą kwotę.
                </p>
                <Button asChild variant="outline" className="w-full text-primary border-primary/20 hover:bg-primary/5 hover:text-primary-hover">
                  <Link href="/kontakt">
                    Skontaktuj się →
                  </Link>
                </Button>
              </div>

              <div className="platnosc-sidebar-secure">
                <span className="material-symbols-outlined text-[1.2rem] shrink-0">lock</span>
                <span>
                  Płatność obsługiwana przez <strong>tpay.com</strong> — certyfikowane centrum
                  płatności
                </span>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer data={footerData} />
    </>
  )
}
