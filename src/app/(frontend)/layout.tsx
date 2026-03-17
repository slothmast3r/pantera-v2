import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Pantera Family & Sport Club – Krav Maga, Karate, Tai Chi w Warszawie.',
  title: 'Pantera Family & Sport Club',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
