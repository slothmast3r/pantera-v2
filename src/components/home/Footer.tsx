import React from 'react'
import type { Footer as FooterType } from '@/payload-types'

const staticColumns = [
  {
    heading: 'Zajęcia',
    links: [
      { label: 'Krav Maga', href: '/zajecia/krav-maga' },
      { label: 'Karate', href: '/zajecia/karate' },
      { label: 'Tai Chi', href: '/zajecia/tai-chi' },
      { label: 'Krav Maga Dzieci', href: '/zajecia/krav-maga-dzieci' },
      { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
    ],
  },
  {
    heading: 'Klub',
    links: [
      { label: 'O nas', href: '/o-nas' },
      { label: 'Dla Firm', href: '/dla-firm' },
      { label: 'Grafik', href: '/grafik' },
      { label: 'Płatność online', href: '/platnosc' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Regulamin', href: '/regulamin' },
    ],
  },
  {
    heading: 'Kontakt',
    links: [
      { label: '📍 Mokotów, Warszawa', href: '#' },
      { label: '📞 +48 XXX XXX XXX', href: 'tel:+48000000000' },
      { label: '✉️ kontakt@pantera.pl', href: 'mailto:kontakt@pantera.pl' },
    ],
  },
]

const socialIcons: Record<string, string> = {
  facebook: 'f',
  instagram: 'ig',
  youtube: 'yt',
  tiktok: 'tt',
}

export default function Footer({ data }: { data?: FooterType | null }) {
  const columns = data?.columns ?? staticColumns
  const description = data?.description ?? 'Rodzinny klub sportowy na Mokotowie. Krav Maga, Karate, Tai Chi.'
  const bottomText = data?.bottomText ?? '© 2024 Pantera Family & Sport Club. Wszelkie prawa zastrzeżone.'
  const socialLinks = data?.socialLinks ?? [
    { platform: 'facebook' as const, url: 'https://facebook.com', id: 'fb' },
    { platform: 'instagram' as const, url: 'https://instagram.com', id: 'ig' },
  ]

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>🐾 PANTERA</span>
            <small>FAMILY &amp; SPORT CLUB</small>
          </div>
          <p>{description}</p>
          <div className="footer__social">
            {socialLinks.map((s) => (
              <a key={s.id ?? s.platform} href={s.url} aria-label={s.platform}>
                {socialIcons[s.platform] ?? s.platform}
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="footer__col">
            <h4>{col.heading}</h4>
            <ul>
              {col.links?.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer__bottom">
        <p>{bottomText}</p>
      </div>
    </footer>
  )
}
