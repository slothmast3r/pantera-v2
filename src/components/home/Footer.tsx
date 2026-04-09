import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Footer as FooterType, ContactInfo } from '@/payload-types'

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
      { label: 'Dla Firm', href: '/oferta/dla-firm' },
      { label: 'Grafik', href: '/grafik' },
      { label: 'Płatność online', href: '/platnosc' },
      { label: 'Kontakt', href: '/kontakt' },
      { label: 'Regulamin', href: '/regulamin' },
    ],
  },
]

const staticContactInfo = {
  address: 'ul. Powsińska 25, Warszawa, Mokotów (Sadyba)',
  addressLink: 'https://maps.google.com/?q=Powsinska+25+Warszawa',
  phone: '508 689 718',
  email: 'kontakt@pantera.waw.pl',
  hours: 'Pon–Pt: 15:00–21:00 | Sob: 9:00–14:00',
  mapEmbedUrl: null,
}

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

export default async function Footer({ data }: { data?: FooterType | null }) {
  let contactInfo: ContactInfo | typeof staticContactInfo = staticContactInfo

  try {
    const payload = await getPayload({ config })
    const ci = await payload.findGlobal({ slug: 'contact-info' })
    if (ci) contactInfo = ci
  } catch {
    // DB unavailable — fall back to static
  }

  const columns = data?.columns ?? staticColumns
  const description = data?.description ?? 'Rodzinny klub sportowy na Mokotowie. Krav Maga, Karate, Tai Chi.'
  const bottomText = data?.bottomText ?? '© 2024 Pantera Family & Sport Club. Wszelkie prawa zastrzeżone.'
  const socialLinks = data?.socialLinks ?? [
    { platform: 'facebook' as const, url: 'https://facebook.com', id: 'fb' },
    { platform: 'instagram' as const, url: 'https://instagram.com', id: 'ig' },
  ]

  const contactItems = [
    contactInfo.address && {
      icon: 'location_on',
      label: contactInfo.address,
      href: contactInfo.addressLink ?? null,
    },
    contactInfo.phone && {
      icon: 'phone',
      label: contactInfo.phone,
      href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    },
    contactInfo.email && {
      icon: 'mail',
      label: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    contactInfo.hours && {
      icon: 'schedule',
      label: contactInfo.hours,
      href: null,
    },
  ].filter(Boolean) as { icon: string; label: string; href: string | null }[]

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
            <h3>{col.heading}</h3>
            <ul>
              {col.links?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href as any}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__col">
          <h3>Kontakt</h3>
          <ul className="footer__contact-list">
            {contactItems.map((item, i) => {
              const content = (
                <>
                  <span className="material-symbols-outlined footer__contact-icon">{item.icon}</span>
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
        <p className="footer__credit">
          Design by{' '}
          <a href="https://ezytra.com" target="_blank" rel="noopener noreferrer">
            Oskar Straszyński
          </a>
        </p>
      </div>
    </footer>
  )
}
