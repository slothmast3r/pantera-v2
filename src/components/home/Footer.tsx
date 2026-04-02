import React from 'react'
import Link from 'next/link'
import type { Footer as FooterType } from '@/payload-types'

type ContactItem = {
  icon: string
  customIcon?: string | null
  label: string
  href?: string | null
}

type SocialLinkExtra = {
  customIcon?: string
  label?: string
}

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
]

const staticContactItems = [
  { icon: 'location_on', label: 'ul. Powsińska 25, Warszawa', href: 'https://maps.google.com/?q=Powsinska+25+Warszawa' },
  { icon: 'phone', label: '+48 508 689 718', href: 'tel:+48508689718' },
  { icon: 'mail', label: 'kontakt@pantera.waw.pl', href: 'mailto:kontakt@pantera.waw.pl' },
  { icon: 'schedule', label: 'Pon–Pt: 15:00–21:00 | Sob: 9:00–14:00', href: null },
]

// Font Awesome 6 Brands — klasy per platforma
const faBrandIcons: Record<string, string> = {
  facebook: 'fa-facebook',
  instagram: 'fa-instagram',
  youtube: 'fa-youtube',
  tiktok: 'fa-tiktok',
  linkedin: 'fa-linkedin',
  twitter: 'fa-x-twitter',
  snapchat: 'fa-snapchat',
  pinterest: 'fa-pinterest',
  whatsapp: 'fa-whatsapp',
  telegram: 'fa-telegram',
}

export default function Footer({ data }: { data?: FooterType | null }) {
  const columns = data?.columns ?? staticColumns
  const description = data?.description ?? 'Rodzinny klub sportowy na Mokotowie. Krav Maga, Karate, Tai Chi.'
  const bottomText = data?.bottomText ?? '© 2024 Pantera Family & Sport Club. Wszelkie prawa zastrzeżone.'
  const socialLinks = data?.socialLinks ?? [
    { platform: 'facebook' as const, url: 'https://facebook.com', id: 'fb' },
    { platform: 'instagram' as const, url: 'https://instagram.com', id: 'ig' },
  ]
  const contactItems = (data as FooterType & { contactItems?: ContactItem[] })?.contactItems ?? staticContactItems

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Pantera Family & Sport Club" className="footer__logo-img" />
          </div>
          <p>{description}</p>
          <div className="footer__social">
            {socialLinks.map((s) => {
              const s2 = s as typeof s & SocialLinkExtra
              const faClass = s.platform === 'other'
                ? `fa-${s2.customIcon ?? 'link'}`
                : (faBrandIcons[s.platform] ?? 'fa-link')
              const ariaLabel = s2.label || s.platform
              return (
                <a key={s.id ?? s.platform} href={s.url} aria-label={ariaLabel} title={ariaLabel}>
                  <i className={`fa-brands ${faClass}`} aria-hidden="true" />
                </a>
              )
            })}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="footer__col">
            <h4>{col.heading}</h4>
            <ul>
              {col.links?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__col">
          <h4>Kontakt</h4>
          <ul className="footer__contact-list">
            {contactItems.map((item: ContactItem, i: number) => {
              const iconName = item.icon === 'other' ? (item.customIcon ?? 'link') : item.icon
              const content = (
                <>
                  <span className="material-symbols-outlined footer__contact-icon">{iconName}</span>
                  <span>{item.label}</span>
                </>
              )
              return (
                <li key={i} className="footer__contact-item">
                  {item.href
                    ? <a href={item.href} className="footer__contact-link">{content}</a>
                    : <span className="footer__contact-link">{content}</span>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>{bottomText}</p>
      </div>
    </footer>
  )
}
