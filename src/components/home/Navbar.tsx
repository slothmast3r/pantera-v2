'use client'
import React, { useState } from 'react'
import type { Navigation } from '@/payload-types'

const staticLinks = [
  {
    label: 'O nas',
    href: '/o-nas',
    subLinks: [
      { label: 'O nas', href: '/o-nas' },
      { label: 'Kadra', href: '/o-nas#kadra' },
      { label: 'Regulamin', href: '/regulamin' },
    ],
  },
  {
    label: 'Zajęcia',
    href: '/zajecia',
    subLinks: [
      { label: 'Krav Maga', href: '/zajecia/krav-maga' },
      { label: 'Karate', href: '/zajecia/karate' },
      { label: 'Power Training', href: '/zajecia/power-training' },
      { label: 'Tai Chi', href: '/zajecia/tai-chi' },
      { label: 'Indywidualne', href: '/zajecia/indywidualne' },
      { label: 'Strzelectwo ASG', href: '/zajecia/asg' },
      { label: 'Krav Maga Kids', href: '/zajecia/krav-maga-dzieci' },
      { label: 'Karate Dzieci', href: '/zajecia/karate-dzieci' },
    ],
  },
  {
    label: 'Oferta',
    href: '/oferta',
    subLinks: [
      { label: 'Dla Firm', href: '/oferta/dla-firm' },
      { label: 'Dla Szkół', href: '/oferta/dla-szkol' },
      { label: 'Warsztaty Rodzinne', href: '/oferta/warsztaty-rodzinne' },
      { label: 'Urodziny na Sportowo', href: '/oferta/urodziny' },
    ],
  },
  { label: 'Grafik', href: '/grafik', subLinks: null as null | { label: string; href: string }[] },
  { label: 'Płatność', href: '/platnosc', subLinks: null as null | { label: string; href: string }[] },
  { label: 'Kontakt', href: '/kontakt', subLinks: null as null | { label: string; href: string }[] },
]

function isChildrenLink(href: string, label: string) {
  const h = href.toLowerCase()
  const l = label.toLowerCase()
  return h.includes('dzieci') || h.includes('kids') || l.includes('dzieci') || l.includes('kids')
}

function GroupedDropdown({ subLinks }: { subLinks: { label: string; href: string }[] }) {
  const adults = subLinks.filter((s) => !isChildrenLink(s.href, s.label))
  const children = subLinks.filter((s) => isChildrenLink(s.href, s.label))

  return (
    <div className="navbar__dropdown-menu navbar__dropdown-menu--grouped">
      {adults.length > 0 && (
        <div className="navbar__dropdown-group">
          <span className="navbar__dropdown-group-label">👤 Dorośli</span>
          {adults.map((sub) => (
            <a key={sub.href} href={sub.href}>{sub.label}</a>
          ))}
        </div>
      )}
      {children.length > 0 && (
        <div className="navbar__dropdown-group">
          <span className="navbar__dropdown-group-label">🧒 Dzieci</span>
          {children.map((sub) => (
            <a key={sub.href} href={sub.href}>{sub.label}</a>
          ))}
        </div>
      )}
      <div className="navbar__dropdown-footer">
        <a href="/zajecia">Zobacz wszystkie zajęcia →</a>
      </div>
    </div>
  )
}

export default function Navbar({ data }: { data?: Navigation | null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const links = data?.links ?? staticLinks
  const cta = data?.ctaButton ?? { text: 'Zapisz się na zajęcia', href: '/kontakt' }
  const logoText = data?.logoText ?? 'PANTERA'

  function toggleDropdown(href: string) {
    setOpenDropdown((prev) => (prev === href ? null : href))
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">
          <span className="navbar__logo-icon">🐾</span>
          <span className="navbar__logo-text">
            {logoText}<br />
            <small>FAMILY &amp; SPORT CLUB</small>
          </span>
        </a>
        <button
          className="navbar__hamburger"
          onClick={() => {
            setMenuOpen(!menuOpen)
            setOpenDropdown(null)
          }}
        >
          ☰
        </button>
        <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => {
            const subs = link.subLinks ?? []
            const hasChildren = subs.some((s) => isChildrenLink(s.href, s.label))
            const hasAdults = subs.some((s) => !isChildrenLink(s.href, s.label))
            const useGrouped = hasChildren && hasAdults
            const isOpen = openDropdown === link.href

            return (
              <li
                key={link.href}
                className={`${subs.length ? 'navbar__dropdown' : ''} ${isOpen ? 'navbar__dropdown--open' : ''}`}
              >
                <a
                  href={link.href}
                  onClick={
                    subs.length && menuOpen
                      ? (e) => {
                          e.preventDefault()
                          toggleDropdown(link.href)
                        }
                      : undefined
                  }
                >
                  {link.label}{subs.length ? ' ▾' : ''}
                </a>
                {subs.length ? (
                  useGrouped ? (
                    <GroupedDropdown subLinks={subs} />
                  ) : (
                    <ul className="navbar__dropdown-menu">
                      {subs.map((sub) => (
                        <li key={sub.href}><a href={sub.href}>{sub.label}</a></li>
                      ))}
                    </ul>
                  )
                ) : null}
              </li>
            )
          })}
          <li className="navbar__mobile-cta">
            <a href={cta.href ?? '/kontakt'} className="navbar__cta">
              {cta.text ?? 'Zapisz się na zajęcia'}
            </a>
          </li>
        </ul>
        <a href={cta.href ?? '/kontakt'} className="navbar__cta">
          {cta.text ?? 'Zapisz się na zajęcia'}
        </a>
      </div>
    </nav>
  )
}
