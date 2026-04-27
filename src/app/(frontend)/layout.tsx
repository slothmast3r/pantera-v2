import type { Metadata } from 'next'
import React from 'react'
import './variables.css'
import './styles.css'
import { Toaster } from '@/components/ui/Toaster'
import { Montserrat } from 'next/font/google'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
