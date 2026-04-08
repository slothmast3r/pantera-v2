export const metadata = {
  title: 'Regulamin – Pantera Family & Sport Club',
  description: 'Regulamin Pantera Family & Sport Club. Zasady uczestnictwa w zajęciach, polityka bezpieczeństwa i warunki korzystania z usług klubu.',
}

import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import { getPayload } from 'payload'
import config from '@payload-config'
import './regulamin.css'

export default async function RegulaminPage() {
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
    // static fallback
  }

  return (
    <>
      <Navbar data={navData} />
      <main>

        {/* ── Hero ── */}
        <section className="reg-hero">
          <p className="reg-hero__eyebrow">Pantera Family &amp; Sport Club</p>
          <h1 className="reg-hero__title">Regulamin Klubu</h1>
          <p className="reg-hero__meta">Obowiązuje od: 1 września 2024 r.</p>
        </section>

        {/* ── Content ── */}
        <section className="reg-body">
          <div className="reg-container">

            <div className="reg-intro">
              <p>
                Niniejszy regulamin określa zasady korzystania z zajęć i obiektu Pantera Family &amp; Sport Club
                z siedzibą przy ul. Powsińskiej 25, Warszawa (Sadyba). Każdy uczestnik zajęć zobowiązany jest
                do zapoznania się z regulaminem i jego przestrzegania.
              </p>
            </div>

            <section className="reg-section">
              <h2><span className="reg-section__num">§1</span> Postanowienia ogólne</h2>
              <ol>
                <li>Klub Pantera Family &amp; Sport Club, zwany dalej „Klubem", prowadzi zajęcia sportowe i rekreacyjne w zakresie sztuk walki, samoobrony oraz innych form aktywności fizycznej.</li>
                <li>Uczestnikiem zajęć może być każda osoba, która ukończyła 4. rok życia. Osoby niepełnoletnie mogą uczestniczyć w zajęciach wyłącznie za pisemną zgodą rodzica lub opiekuna prawnego.</li>
                <li>Przystąpienie do zajęć jest równoznaczne z akceptacją niniejszego regulaminu.</li>
                <li>Klub zastrzega sobie prawo do zmiany regulaminu. O zmianach uczestnicy informowani są z co najmniej 14-dniowym wyprzedzeniem.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§2</span> Zapisy i płatności</h2>
              <ol>
                <li>Zapisy na zajęcia odbywają się telefonicznie, mailowo lub przez formularz kontaktowy dostępny na stronie internetowej.</li>
                <li>Pierwsze zajęcia próbne są bezpłatne. Dalsze uczestnictwo wymaga opłacenia karnetu lub jednorazowego wejścia zgodnie z aktualnym cennikiem.</li>
                <li>Opłaty za zajęcia należy uiszczać z góry – przed rozpoczęciem danego miesiąca lub okresu rozliczeniowego.</li>
                <li>Karnet miesięczny jest imienny i nie podlega przekazaniu osobom trzecim.</li>
                <li>Nieobecność uczestnika na zajęciach nie stanowi podstawy do zwrotu opłaty, chyba że nieobecność wynika z długotrwałej choroby potwierdzonej zaświadczeniem lekarskim.</li>
                <li>Klub nie zwraca opłat za zajęcia odwołane z winy uczestnika.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§3</span> Zasady uczestnictwa w zajęciach</h2>
              <ol>
                <li>Uczestnik zobowiązany jest do punktualnego stawiania się na zajęcia. Spóźnienia powyżej 10 minut mogą skutkować niedopuszczeniem do ćwiczeń.</li>
                <li>Przed przystąpieniem do zajęć uczestnik obowiązany jest poinformować instruktora o wszelkich urazach, chorobach lub ograniczeniach zdrowotnych.</li>
                <li>Udział w zajęciach jest dobrowolny i odbywa się na własną odpowiedzialność uczestnika (lub rodzica/opiekuna w przypadku osób niepełnoletnich).</li>
                <li>Zabrania się uczestnictwa w zajęciach pod wpływem alkoholu, narkotyków lub innych środków odurzających.</li>
                <li>Na sali ćwiczeń obowiązuje zmienne obuwie sportowe lub brak obuwia (zależnie od rodzaju zajęć).</li>
                <li>Uczestnik jest zobowiązany do noszenia czystego i odpowiedniego do danej dyscypliny stroju sportowego.</li>
                <li>Biżuteria (łańcuszki, kolczyki, pierścionki, zegarki) powinna być zdejmowana przed zajęciami ze względów bezpieczeństwa.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§4</span> Zasady zachowania i bezpieczeństwo</h2>
              <ol>
                <li>Na terenie Klubu obowiązuje wzajemny szacunek wobec instruktorów, pracowników i innych uczestników.</li>
                <li>Wszelkie ćwiczenia i techniki opanowane na zajęciach wolno stosować wyłącznie w celach sportowych i obronnych — nigdy w celach agresji.</li>
                <li>Polecenia instruktora są wiążące. W przypadku niezastosowania się do poleceń dotyczących bezpieczeństwa instruktor ma prawo wykluczyć uczestnika z zajęć.</li>
                <li>Uczestnicy zobowiązani są do dbania o sprzęt i wyposażenie sali ćwiczeń. Ewentualne uszkodzenia sprzętu z winy uczestnika będą podlegały naprawieniu na jego koszt.</li>
                <li>Klub nie ponosi odpowiedzialności za kontuzje i urazy powstałe wskutek niestosowania się do instrukcji prowadzącego.</li>
                <li>Na terenie Klubu obowiązuje zakaz palenia tytoniu, spożywania alkoholu i używania substancji odurzających.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§5</span> Odwoływanie zajęć i zmiany grafiku</h2>
              <ol>
                <li>Klub zastrzega sobie prawo do odwołania zajęć z przyczyn niezależnych (choroba instruktora, awaria obiektu, siła wyższa). O odwołaniu uczestnicy informowani są możliwie najszybciej, telefonicznie lub przez media społecznościowe.</li>
                <li>Zajęcia odwołane z inicjatywy Klubu będą zaliczone na poczet kolejnego okresu karnetowego.</li>
                <li>Klub ma prawo do zmiany instruktora prowadzącego dane zajęcia bez wcześniejszego powiadamiania uczestników.</li>
                <li>W okresach świątecznych i wakacyjnych grafik zajęć może ulec zmianie — aktualne informacje dostępne są na stronie internetowej i w mediach społecznościowych Klubu.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§6</span> Ochrona danych osobowych (RODO)</h2>
              <ol>
                <li>Administratorem danych osobowych uczestników jest Pantera Family &amp; Sport Club, ul. Powsińska 25, Warszawa.</li>
                <li>Dane osobowe przetwarzane są w celu realizacji usług sportowych, kontaktu z uczestnikiem oraz — za odrębną zgodą — w celach marketingowych.</li>
                <li>Uczestnik ma prawo do dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania.</li>
                <li>Dane nie są udostępniane podmiotom trzecim bez zgody uczestnika, z wyjątkiem przypadków przewidzianych prawem.</li>
                <li>Szczegółowa polityka prywatności dostępna jest na prośbę uczestnika lub w siedzibie Klubu.</li>
              </ol>
            </section>

            <section className="reg-section">
              <h2><span className="reg-section__num">§7</span> Postanowienia końcowe</h2>
              <ol>
                <li>W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego.</li>
                <li>Wszelkie spory wynikłe z uczestnictwa w zajęciach strony będą starały się rozwiązać polubownie.</li>
                <li>Regulamin dostępny jest w recepcji Klubu oraz na stronie internetowej pantera.waw.pl.</li>
              </ol>
            </section>

            <div className="reg-contact">
              <p>Pytania dotyczące regulaminu kieruj na: <a href="mailto:kontakt@pantera.waw.pl">kontakt@pantera.waw.pl</a></p>
            </div>

          </div>
        </section>

      </main>
      <Footer data={footerData} />
    </>
  )
}
