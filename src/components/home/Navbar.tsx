'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Navigation } from '@/payload-types'
import Icon from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

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

function GroupedDropdown({ subLinks, pathname, onLinkClick }: { subLinks: { label: string; href: string }[], pathname: string, onLinkClick?: () => void }) {
  const adults = subLinks.filter((s) => !isChildrenLink(s.href, s.label))
  const children = subLinks.filter((s) => isChildrenLink(s.href, s.label))

  return (
    <div className="navbar__dropdown-menu navbar__dropdown-menu--grouped">
      {adults.length > 0 && (
        <div className="navbar__dropdown-group">
          <span className="navbar__dropdown-group-label"><Icon name="person" /> Dorośli</span>
          {adults.map((sub) => (
            <Link key={sub.href} href={sub.href} className={pathname === sub.href ? 'navbar__link--active' : undefined} onClick={onLinkClick}>{sub.label}</Link>
          ))}
        </div>
      )}
      {children.length > 0 && (
        <div className="navbar__dropdown-group">
          <span className="navbar__dropdown-group-label"><Icon name="child_care" /> Dzieci</span>
          {children.map((sub) => (
            <Link key={sub.href} href={sub.href} className={pathname === sub.href ? 'navbar__link--active' : undefined} onClick={onLinkClick}>{sub.label}</Link>
          ))}
        </div>
      )}
      <div className="navbar__dropdown-footer">
        <Link href="/zajecia">Zobacz wszystkie zajęcia →</Link>
      </div>
    </div>
  )
}

export default function Navbar({ data }: { data?: Navigation | null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const links = data?.links ?? staticLinks
  const cta = data?.ctaButton ?? { text: 'Zapisz się na zajęcia', href: '/kontakt' }

  function toggleDropdown(href: string) {
    setOpenDropdown((prev) => (prev === href ? null : href))
  }

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="navbar__overlay"
            onClick={() => { setMenuOpen(false); setOpenDropdown(null) }}
          />
        )}
      </AnimatePresence>
      <nav className="navbar">
      <div className="navbar__container">
        <Link href="/" className="navbar__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Pantera Family & Sport Club" className="navbar__logo-img" />
        </Link>
        <div className="navbar__right">
          <ul className={`navbar__links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => {
              const subs = link.subLinks ?? []
              const hasChildren = subs.some((s) => isChildrenLink(s.href, s.label))
              const hasAdults = subs.some((s) => !isChildrenLink(s.href, s.label))
              const useGrouped = hasChildren && hasAdults
              const isOpen = openDropdown === link.href
              const isActive = link.href !== '/' && (pathname === link.href || pathname.startsWith(link.href + '/'))

              return (
                <li
                  key={link.href}
                  className={`${subs.length ? 'navbar__dropdown' : ''} ${isOpen ? 'navbar__dropdown--open' : ''} relative`}
                >
                  <Link
                    href={link.href}
                    className={isActive ? 'navbar__link--active' : undefined}
                    onClick={
                      subs.length && menuOpen
                        ? (e) => {
                            e.preventDefault()
                            toggleDropdown(link.href)
                          }
                        : menuOpen
                          ? () => setMenuOpen(false)
                          : undefined
                    }
                  >
                    {link.label}{subs.length ? <Icon name="keyboard_arrow_down" className="navbar__chevron" /> : ''}
                  </Link>
                  {isActive && !menuOpen && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded hidden lg:block"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {subs.length ? (
                    useGrouped ? (
                      <GroupedDropdown subLinks={subs} pathname={pathname} onLinkClick={() => setMenuOpen(false)} />
                    ) : (
                      <ul className="navbar__dropdown-menu">
                        {subs.map((sub) => (
                          <li key={sub.href}>
                            <Link href={sub.href} className={pathname === sub.href ? 'navbar__link--active' : undefined} onClick={() => setMenuOpen(false)}>{sub.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )
                  ) : null}
                </li>
              )
            })}
            <li className="navbar__mobile-cta">
              <Button asChild className="w-full">
                <Link href={cta.href ?? '/kontakt'}>
                  {cta.text ?? 'Zapisz się na zajęcia'}
                </Link>
              </Button>
            </li>
          </ul>
          <Button asChild className="navbar__cta--desktop">
            <Link href={cta.href ?? '/kontakt'}>
              {cta.text ?? 'Zapisz się na zajęcia'}
            </Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''} p-0 h-10 w-10 flex flex-col gap-1.5 hover:bg-bg-hover`}
          onClick={() => {
            setMenuOpen(!menuOpen)
            setOpenDropdown(null)
          }}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </Button>
      </div>
    </nav>
    </>
  )
}
