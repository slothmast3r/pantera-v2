import type { Metadata } from 'next'
import React from 'react'
import './variables.css'
import './styles.css'
import { Toaster } from '@/components/ui/Toaster'
import { Montserrat } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pantera.waw.pl'),
  description: 'Pantera Family & Sport Club – Krav Maga, samoobrona, Karate, Tai Chi w Warszawie.',
  title: 'Pantera Family & Sport Club',
  openGraph: {
    siteName: 'Pantera Family & Sport Club',
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

const iconFonts = [
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/fontawesome.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/brands.min.css',
]

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let telephone = '508 689 718'
  let email = 'kontakt@pantera.waw.pl'

  try {
    const payload = await getPayload({ config })
    const contact = await payload.findGlobal({ slug: 'contact-info', depth: 0 })
    if (contact.phone) telephone = contact.phone
    if (contact.email) email = contact.email
  } catch {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pantera.waw.pl'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SportsClub',
    name: 'Pantera Family & Sport Club',
    url: siteUrl,
    telephone,
    email,
    image: `${siteUrl}/og-image.jpg`,
    description:
      'Rodzinny klub sportowy na Mokotowie. Krav Maga, samoobrona, Karate, Tai Chi i Power Training dla dzieci i dorosłych.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Powsińska 25',
      addressLocality: 'Warszawa',
      addressRegion: 'Mazowieckie',
      postalCode: '02-903',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.1765,
      longitude: 21.0614,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/panteraklub',
      'https://instagram.com/panterafsc',
    ],
  }

  return (
    <html lang="pl" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {iconFonts.map((href) => (
          <link key={href} rel="preload" as="style" href={href} />
        ))}
        {/* Load icon fonts non-blocking after page is interactive */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var f=${JSON.stringify(iconFonts)};f.forEach(function(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l);});})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
